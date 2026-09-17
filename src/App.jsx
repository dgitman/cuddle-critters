import { useEffect, useMemo, useState } from 'react';
import { critters, evolution } from './data/critters';
import EncounterScreen from './components/EncounterScreen';
import FieldGuide from './components/FieldGuide';
import MapScreen from './components/MapScreen';

const STORAGE_KEY = 'adas-cuddle-critters-save-v2';

function loadSave() {
  try {
    const saved = JSON.parse(localStorage.getItem(STORAGE_KEY));
    return {
      caught: new Set(Array.isArray(saved?.caught) ? saved.caught : []),
      evolved: Boolean(saved?.evolved),
      podsLeft: Number.isFinite(saved?.podsLeft) ? saved.podsLeft : 12,
    };
  } catch {
    return { caught: new Set(), evolved: false, podsLeft: 12 };
  }
}

export default function App() {
  const initialSave = useMemo(loadSave, []);
  const [screen, setScreen] = useState('map');
  const [selected, setSelected] = useState(critters[0]);
  const [highlighted, setHighlighted] = useState('mico');
  const [caught, setCaught] = useState(initialSave.caught);
  const [evolved, setEvolved] = useState(initialSave.evolved);
  const [podsLeft, setPodsLeft] = useState(initialSave.podsLeft);
  const [toast, setToast] = useState('MiCo is splashing near the lagoon!');

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ caught: [...caught], evolved, podsLeft }));
  }, [caught, evolved, podsLeft]);

  const selectCritter = (critter) => {
    if (!critter) return;
    setSelected(critter);
    setHighlighted(critter.id);
    setScreen('encounter');
    setToast('');
  };

  const explore = () => {
    const remaining = critters.filter((critter) => !caught.has(critter.id));
    const pool = remaining.length ? remaining : critters;
    const next = pool[(pool.findIndex((critter) => critter.id === highlighted) + 1) % pool.length];
    setHighlighted(next.id);
    setToast(`${next.name} is nearby—tap the glowing marker!`);
  };

  const capture = (id) => {
    setCaught((current) => new Set([...current, id]));
    setPodsLeft((current) => Math.max(0, current - 1));
  };

  const visitFromGuide = (critter) => {
    setSelected(critter);
    setHighlighted(critter.id);
    setScreen(caught.has(critter.id) ? 'encounter' : 'map');
    if (!caught.has(critter.id)) setToast(`${critter.name} is marked on your island map!`);
  };

  return (
    <div className="app-shell">
      {screen === 'map' && (
        <MapScreen
          critters={critters}
          caught={caught}
          highlighted={highlighted}
          onExplore={explore}
          onSelect={selectCritter}
          onGuide={() => setScreen('guide')}
        />
      )}
      {screen === 'encounter' && (
        <EncounterScreen
          key={selected.id}
          critter={selected}
          podsLeft={podsLeft}
          alreadyCaught={caught.has(selected.id)}
          onBack={() => setScreen('map')}
          onCapture={capture}
          onEvolve={() => setEvolved(true)}
          evolved={evolved}
        />
      )}
      {screen === 'guide' && (
        <FieldGuide
          critters={critters}
          evolution={evolution}
          caught={caught}
          evolved={evolved}
          onClose={() => setScreen('map')}
          onVisit={visitFromGuide}
        />
      )}
      {toast && screen === 'map' && (
        <button className="toast" onClick={() => selectCritter(critters.find((c) => c.id === highlighted))}>
          <span className="toast-dot" /> {toast}
        </button>
      )}
    </div>
  );
}
