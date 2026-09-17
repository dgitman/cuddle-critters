import CreatureMarker from './CreatureMarker';
import { BookIcon, FootIcon, PawIcon } from './Icons';

export default function MapScreen({ critters, caught, highlighted, onExplore, onSelect, onGuide }) {
  return (
    <main className="game-screen map-screen">
      <img className="map-background" src="/assets/island-map.png" alt="A bright tropical island with paths, a lagoon, trampoline clearing, and mysterious cove" />
      <header className="topbar">
        <h1><PawIcon /> <span>Cuddle Critters</span><small> Ada’s Game</small></h1>
        <button className="progress-button" onClick={onGuide} aria-label="Open field guide">
          <span>Critters discovered</span>
          <strong>{caught.size} / {critters.length}</strong>
          <BookIcon />
        </button>
      </header>

      <div className="map-stage">
        {critters.map((critter) => (
          <CreatureMarker
            key={critter.id}
            critter={critter}
            caught={caught.has(critter.id)}
            highlighted={highlighted === critter.id}
            onSelect={onSelect}
          />
        ))}
        <img className="explorer-avatar" src="/assets/explorer.png" alt="Ada's island explorer" draggable="false" />
      </div>

      <div className="map-actions">
        <button className="pod-mini" aria-label="Ready the gold-and-silver pod" onClick={() => onSelect(critters.find((c) => c.id === highlighted) || critters[0])}>
          <img src="/assets/capture-pod.png" alt="" />
          <span><strong>Gold–Silver Pod</strong><small>Target screen ready</small></span>
        </button>
        <button className="explore-button" onClick={onExplore}><FootIcon /> Explore</button>
        <button className="guide-button" aria-label="Field Guide" onClick={onGuide}><BookIcon size={36} /> <span>Field Guide</span></button>
      </div>
    </main>
  );
}
