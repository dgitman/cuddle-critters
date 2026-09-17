import { BackIcon, PawIcon } from './Icons';

export default function FieldGuide({ critters, evolution, caught, evolved, onClose, onVisit }) {
  const entries = [...critters, evolution];
  return (
    <main className="field-guide-screen">
      <header className="guide-header">
        <button className="cream-control back-button" onClick={onClose}><BackIcon /> Island</button>
        <h1><PawIcon /> Ada’s Field Guide</h1>
        <span>{caught.size + (evolved ? 1 : 0)} discovered</span>
      </header>
      <section className="guide-intro">
        <div>
          <h2>Every critter has a story.</h2>
          <p>Explore the island, cuddle-catch new friends, and fill Ada’s hand-drawn field guide.</p>
        </div>
        <div className="sketch-stack" aria-label="Ada's original creature sketches">
          {critters.filter((critter) => critter.sketch).map((critter) => (
            <img src={critter.sketch} alt={`Ada's original ${critter.name} sketch`} key={critter.id} />
          ))}
        </div>
      </section>
      <section className="guide-list">
        {entries.map((critter) => {
          const isEvolution = critter.id === evolution.id;
          const discovered = isEvolution ? evolved : caught.has(critter.id);
          return (
            <article className={`guide-entry ${discovered ? 'is-discovered' : 'is-mystery'}`} key={critter.id}>
              <div className="guide-art" style={{ '--entry-color': critter.color }}>
                <img className="guide-critter-image" src={critter.image} alt={discovered ? critter.name : ''} />
                {discovered && critter.sketch && (
                  <img className="guide-source-sketch" src={critter.sketch} alt={`Ada's original ${critter.name} drawing`} />
                )}
                {!discovered && <span aria-hidden="true">?</span>}
              </div>
              <div className="guide-copy">
                <span className="guide-number">{String(entries.indexOf(critter) + 1).padStart(2, '0')}</span>
                <h2>{discovered ? critter.name : isEvolution ? 'MiCo’s evolution' : 'Undiscovered critter'}</h2>
                <h3>{discovered ? critter.title : 'Keep exploring the island'}</h3>
                <p>{discovered ? critter.description : isEvolution ? 'Catch MiCo to reveal this powerful water guardian.' : 'A new friend is waiting somewhere on Ada’s island.'}</p>
                {discovered && <p className="ability"><strong>Special move:</strong> {critter.ability}</p>}
              </div>
              {!isEvolution && (
                <button onClick={() => onVisit(critter)}>{discovered ? 'Visit again' : 'Find on island'}</button>
              )}
            </article>
          );
        })}
      </section>
    </main>
  );
}
