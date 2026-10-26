import { existsSync, readdirSync, rmSync, rmdirSync } from 'node:fs';
import { resolve } from 'node:path';

const demo = resolve(import.meta.dirname, '..');
const managed = [
  '.github/copilot-instructions.md',
  '.github/instructions/pricing.instructions.md',
  '.github/instructions/react-ui.instructions.md',
  '.github/prompts/fix-checkout-context.prompt.md',
  '.github/agents/brewcart-debugger.agent.md',
  '.github/agents/brewcart-reviewer.agent.md',
  '.github/agents/brewcart-workshop-coach.agent.md',
  '.github/skills/brewcart-release',
  '.github/hooks/production-safety.json',
  '.github/hooks/block-production-deploy.mjs',
];

for (const relativePath of managed) {
  rmSync(resolve(demo, relativePath), { recursive: true, force: true });
}

const candidates = [
  '.github/instructions',
  '.github/prompts',
  '.github/agents',
  '.github/skills',
  '.github/hooks',
  '.github',
];

for (const relativePath of candidates) {
  const directory = resolve(demo, relativePath);
  if (existsSync(directory) && readdirSync(directory).length === 0) {
    rmdirSync(directory);
  }
}
