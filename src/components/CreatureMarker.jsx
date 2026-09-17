export default function CreatureMarker({ critter, caught, highlighted, onSelect }) {
  return (
    <button
      className={`creature-marker ${caught ? 'is-caught' : ''} ${highlighted ? 'is-highlighted' : ''}`}
      style={{ '--x': `${critter.position.x}%`, '--y': `${critter.position.y}%`, '--marker': critter.color }}
      onClick={() => onSelect(critter)}
      aria-label={`${caught ? 'Visit' : 'Discover'} ${critter.name}`}
    >
      <span className="marker-pin" aria-hidden="true"><span /></span>
      <span className="marker-name">{critter.name}</span>
      <img src={critter.image} alt="" draggable="false" />
      {caught && <span className="caught-check" aria-label="Caught">✓</span>}
    </button>
  );
}
