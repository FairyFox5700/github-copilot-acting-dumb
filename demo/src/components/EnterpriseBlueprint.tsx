import { useEffect, useState } from 'react';
import { enterprisePractices } from '../content/enterprisePractices';

export function EnterpriseBlueprint() {
  const [isDesktop, setIsDesktop] = useState(() =>
    typeof window === 'undefined' || window.innerWidth > 850,
  );

  useEffect(() => {
    const updateLayout = () => setIsDesktop(window.innerWidth > 850);
    window.addEventListener('resize', updateLayout);
    return () => window.removeEventListener('resize', updateLayout);
  }, []);

  const [expandedLayers, setExpandedLayers] = useState<Set<string>>(() => new Set());

  const toggleLayer = (number: string) => {
    if (isDesktop) return;
    setExpandedLayers((current) => {
      const next = new Set(current);
      if (next.has(number)) next.delete(number);
      else next.add(number);
      return next;
    });
  };

  return (
    <section className="enterprise" aria-labelledby="enterprise-title">
      <div className="enterprise__header">
        <div>
          <span className="enterprise__eyebrow">Enterprise adoption</span>
          <h2 id="enterprise-title">Enterprise control stack</h2>
        </div>
        <p>
          A useful demo becomes an enterprise practice when context, workflows,
          identities, capabilities, and enforcement each have a clear owner.
        </p>
      </div>

      <div className="enterprise__columns" aria-hidden="true">
        <span>Control layer</span>
        <span>Operating practice</span>
        <span>Evidence to require</span>
      </div>

      <p className="enterprise__mobile-hint">Tap a layer to explore the control and its evidence.</p>
      <ol className="enterprise__layers">
        {enterprisePractices.map((practice) => {
          const isExpanded = isDesktop || expandedLayers.has(practice.number);
          const detailId = `enterprise-detail-${practice.number}`;
          return (
            <li
              key={practice.number}
              className={`enterprise__layer${isExpanded ? ' enterprise__layer--open' : ''}`}
              data-testid={practice.number === '05' ? 'enterprise-enforcement' : undefined}
            >
              <button
                className="enterprise__layer-heading"
                type="button"
                aria-expanded={isExpanded}
                aria-controls={detailId}
                onClick={() => toggleLayer(practice.number)}
              >
                <span>{practice.number}</span>
                <span>
                  <h3>{practice.title}</h3>
                  <strong>{practice.mechanism}</strong>
                  <em>{practice.status}</em>
                </span>
              </button>
              <p id={detailId}>{practice.detail}</p>
              <small>{practice.evidence}</small>
            </li>
          );
        })}
      </ol>

      <div className="enterprise__principle">
        <strong>Enterprise rule</strong>
        <span>Guidance shapes judgment; platform controls enforce policy.</span>
      </div>
    </section>
  );
}
