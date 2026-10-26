import { resolve } from 'node:path';
import { spawnSync } from 'node:child_process';
import { describe, expect, it } from 'vitest';

const hookPath = resolve('context-kit/.github/hooks/block-production-deploy.mjs');

function runPayload(payload: unknown | string) {
  const result = spawnSync(process.execPath, [hookPath], {
    input: typeof payload === 'string' ? payload : JSON.stringify(payload),
    encoding: 'utf8',
  });

  expect(result.status).toBe(0);
  return JSON.parse(result.stdout) as { permissionDecision: 'allow' | 'deny' };
}

function runHook(command: string) {
  return runPayload({ toolName: 'bash', toolArgs: { command } });
}

describe('production deployment hook', () => {
  it.each([
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
  ])('denies a production publishing command: %s', (command) => {
    expect(runHook(command).permissionDecision).toBe('deny');
  });

  it.each([
    'npm run build',
    'npm run test:run',
    'npm run dev',
    'firebase emulators:start',
  ])('allows a local command: %s', (command) => {
    expect(runHook(command).permissionDecision).toBe('allow');
  });

  it('denies a shell payload whose command cannot be inspected', () => {
    expect(runPayload({ toolName: 'bash', toolArgs: {} }).permissionDecision).toBe('deny');
  });

  it('parses Copilot CLI string toolArgs before denying a publish', () => {
    const toolArgs = JSON.stringify({ command: 'vercel --prod' });
    expect(runPayload({ toolName: 'bash', toolArgs }).permissionDecision).toBe('deny');
  });

  it('parses Copilot CLI string toolArgs before allowing a local command', () => {
    const toolArgs = JSON.stringify({ command: 'npm run build' });
    expect(runPayload({ toolName: 'bash', toolArgs }).permissionDecision).toBe('allow');
  });

  it('denies malformed JSON', () => {
    expect(runPayload('{not-json').permissionDecision).toBe('deny');
  });
});
