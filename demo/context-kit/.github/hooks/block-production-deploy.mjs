let input = '';
for await (const chunk of process.stdin) input += chunk;

function commandFrom(payload) {
  const rawToolArgs = payload?.toolArgs ?? payload?.tool_args;
  let parsedToolArgs = rawToolArgs;
  if (typeof rawToolArgs === 'string') {
    try {
      parsedToolArgs = JSON.parse(rawToolArgs);
    } catch {
      parsedToolArgs = undefined;
    }
  }
  const candidates = [
    parsedToolArgs?.command,
    payload?.tool_input?.command,
    payload?.toolInput?.command,
    payload?.input?.command,
    payload?.command,
  ];
  const command = candidates.find((value) => typeof value === 'string');
  return command ?? '';
}

function isProductionPublish(command) {
  const normalized = command
    .toLowerCase()
    .replace(/["'`]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  const patterns = [
    /\bvercel\b/,
    /\bfirebase\b[^;&|]*\bdeploy\b/,
    /\bdeploy:prod\b/,
    /\b(?:npm|pnpm|yarn)\b[^;&|]*\bpublish\b/,
  ];
  return patterns.some((pattern) => pattern.test(normalized));
}

let result;
try {
  const payload = JSON.parse(input);
  const command = commandFrom(payload);
  const toolName = String(payload?.toolName ?? payload?.tool_name ?? '').toLowerCase();
  const shellTool = ['bash', 'powershell', 'shell', 'execute'].includes(toolName);
  if (shellTool && command.trim() === '') {
    result = {
      permissionDecision: 'deny',
      permissionDecisionReason: 'Shell command payload is missing; refusing a command that cannot be inspected safely.',
    };
  } else {
    result = isProductionPublish(command)
      ? {
          permissionDecision: 'deny',
          permissionDecisionReason:
            'Direct production publishing is blocked. Use the approved CI/CD pipeline and required approval.',
        }
      : { permissionDecision: 'allow' };
  }
} catch {
  result = {
    permissionDecision: 'deny',
    permissionDecisionReason: 'Malformed hook payload; refusing a command that cannot be inspected safely.',
  };
}

process.stdout.write(JSON.stringify(result));
