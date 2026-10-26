import { AgentPlaybook } from './components/AgentPlaybook';
import { CheckoutPage } from './components/CheckoutPage';
import { EnterpriseBlueprint } from './components/EnterpriseBlueprint';
import './styles.css';

export function App() {
  return (
    <main className="app-shell">
      <header className="site-header">
        <a className="brand" href="#top" aria-label="BrewCart home">
          <span className="brand__mark" aria-hidden="true">B</span>
          <span>BrewCart</span>
        </a>
        <div className="site-header__meta">
          <span>Context-engineering workshop</span>
          <span className="site-header__dot" aria-hidden="true" />
          <span>React + TypeScript</span>
        </div>
      </header>

      <section id="top" className="hero">
        <div className="hero__copy">
          <span className="hero__eyebrow">From “Copilot is dumb” to a reliable agent</span>
          <h1>One checkout defect. Five better agent habits.</h1>
          <p>
            BrewCart makes context engineering visible: a promotion looks correct,
            one test passes, and the shop still loses €12.50 because the agent never
            received the authoritative eligibility rule.
          </p>
          <div className="hero__legend" aria-label="Workshop comparison">
            <span><i className="legend-dot legend-dot--bad" /> Weak context: €72.50</span>
            <span><i className="legend-dot legend-dot--good" /> Verified result: €85.00</span>
          </div>
        </div>
        <div className="hero__stamp" aria-label="Workshop duration">
          <strong>30</strong>
          <span>minutes</span>
        </div>
      </section>

      <div className="workspace">
        <CheckoutPage />
        <AgentPlaybook />
      </div>

      <EnterpriseBlueprint />

      <footer>
        <span>Relevant context beats more context.</span>
        <a href="https://github.com/FairyFox5700/github-copilot-acting-dumb">
          Workshop repository
        </a>
      </footer>
    </main>
  );
}
