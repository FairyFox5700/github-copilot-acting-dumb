import { readFileSync, rmSync } from 'node:fs';
import { resolve } from 'node:path';
import { spawnSync } from 'node:child_process';

const demo = resolve(import.meta.dirname, '..');
const resultFile = resolve(demo, `.baseline-results-${process.pid}.json`);
const vitestBin = resolve(demo, 'node_modules/vitest/vitest.mjs');

function runVitest(args, options = {}) {
  return spawnSync(process.execPath, [vitestBin, ...args], {
    cwd: demo,
    encoding: 'utf8',
    ...options,
  });
}

const focused = runVitest(
  ['run', 'tests/discountPolicy.test.ts', '-t', 'discounts an eligible beans order'],
  { stdio: 'inherit' },
);
if (focused.status !== 0) {
  console.error('BASELINE INVALID: the documented beans-only focused test must pass.');
  process.exit(1);
}

try {
  const complete = runVitest([
    'run',
    '--reporter=json',
    `--outputFile=${resultFile}`,
  ]);

  if (complete.stdout) process.stdout.write(complete.stdout);
  if (complete.stderr) process.stderr.write(complete.stderr);
  if (complete.status === 0) {
    console.error('BASELINE INVALID: the complete suite unexpectedly passed.');
    process.exit(1);
  }

  const report = JSON.parse(readFileSync(resultFile, 'utf8'));
  const expectedFailures = [
    'does not discount a gift card mixed with eligible coffee',
    'does not discount a gift-card-only order',
    'shows the correct BEANS25 discount and final total',
  ];
  const expectedPasses = [
    'embeds the agent best-practice notes in the app',
    'discounts an eligible beans order',
    'does not discount delivery',
    'denies a shell payload whose command cannot be inspected',
    'parses Copilot CLI string toolArgs before denying a publish',
    'parses Copilot CLI string toolArgs before allowing a local command',
    'denies malformed JSON',
    ...[
      'vercel --prod',
      'vercel deploy',
      'vercel deploy --prod',
      'vercel "--prod"',
      'vercel --prod; echo done',
      'npm exec vercel -- --prod',
      'npx vercel deploy --prod',
      'VERCEL=vercel; $VERCEL --prod',
      'firebase deploy',
      'firebase   deploy   --only hosting',
      'npm run deploy:prod',
      'npm   run   deploy:prod',
      'npm publish',
      'npm --silent publish',
      'pnpm publish',
      'pnpm --filter brewcart publish',
      'yarn npm publish',
    ].map((command) => `denies a production publishing command: ${command}`),
    ...[
      'npm run build',
      'npm run test:run',
      'npm run dev',
      'firebase emulators:start',
    ].map((command) => `allows a local command: ${command}`),
  ];

  const actualAssertions = report.testResults.flatMap((suite) =>
    suite.assertionResults.map((assertion) => `${assertion.status}:${assertion.title}`),
  );
  const expectedAssertions = [
    ...expectedFailures.map((title) => `failed:${title}`),
    ...expectedPasses.map((title) => `passed:${title}`),
  ];
  const exactManifest =
    actualAssertions.length === expectedAssertions.length &&
    [...actualAssertions].sort().join('\n') === [...expectedAssertions].sort().join('\n');
  const exactStatistics =
    report.success === false &&
    report.numTotalTestSuites === 8 &&
    report.numPassedTestSuites === 4 &&
    report.numFailedTestSuites === 4 &&
    report.numPendingTestSuites === 0 &&
    report.numTotalTests === 31 &&
    report.numPassedTests === 28 &&
    report.numFailedTests === 3 &&
    report.numPendingTests === 0 &&
    report.numTodoTests === 0;

  if (!exactManifest || !exactStatistics) {
    console.error('BASELINE INVALID: test manifest or suite statistics changed.');
    console.error('Expected statistics: 8 suites (4 passed, 4 failed), 31 tests (28 passed, 3 failed).');
    console.error(`Observed statistics: ${JSON.stringify({
      totalSuites: report.numTotalTestSuites,
      passedSuites: report.numPassedTestSuites,
      failedSuites: report.numFailedTestSuites,
      pendingSuites: report.numPendingTestSuites,
      totalTests: report.numTotalTests,
      passedTests: report.numPassedTests,
      failedTests: report.numFailedTests,
      pendingTests: report.numPendingTests,
      todoTests: report.numTodoTests,
    })}`);
    const unexpected = actualAssertions.filter((entry) => !expectedAssertions.includes(entry));
    const missing = expectedAssertions.filter((entry) => !actualAssertions.includes(entry));
    for (const entry of unexpected) console.error(`Unexpected: ${entry}`);
    for (const entry of missing) console.error(`Missing: ${entry}`);
    process.exit(1);
  }

  console.log('EXPECTED RED: beans-only check passes; exactly three gift-card pricing checks fail.');
} finally {
  rmSync(resultFile, { force: true });
}
