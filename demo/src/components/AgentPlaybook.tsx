import { agentNotes } from '../content/agentNotes';

export function AgentPlaybook() {
  return (
    <aside className="playbook" aria-labelledby="agent-playbook-title">
      <div className="playbook__eyebrow">Working agreement</div>
      <h2 id="agent-playbook-title">Agent playbook</h2>
      <p className="playbook__intro">
        Keep these notes beside the demo. They explain how to collaborate with a
        coding agent without turning the interface into a wall of instructions.
      </p>
      <ol className="playbook__steps">
        {agentNotes.map((note) => (
          <li key={note.step} className="playbook__step">
            <span className="playbook__number">{note.step}</span>
            <div>
              <h3>{note.title}</h3>
              <p>{note.detail}</p>
            </div>
          </li>
        ))}
      </ol>
    </aside>
  );
}
