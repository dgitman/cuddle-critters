import { useCallback, useEffect, useRef, useState } from 'react';
import { BackIcon } from './Icons';
import Pod from './Pod';

export default function EncounterScreen({ critter, podsLeft, alreadyCaught, onBack, onCapture, onEvolve, evolved }) {
  const [phase, setPhase] = useState('ready');
  const [dragY, setDragY] = useState(0);
  const startY = useRef(null);
  const throwing = useRef(false);

  const throwPod = useCallback(() => {
    if (phase !== 'ready' || throwing.current) return;
    throwing.current = true;
    setPhase('flying');
    window.setTimeout(() => setPhase('burst'), 650);
    window.setTimeout(() => {
      setPhase('caught');
      onCapture(critter.id);
    }, 1250);
  }, [critter.id, onCapture, phase]);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.code === 'Escape') onBack();
      if (event.code === 'Space' && phase === 'ready') {
        event.preventDefault();
        throwPod();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onBack, phase, throwPod]);

  const pointerDown = (event) => {
    if (phase !== 'ready') return;
    startY.current = event.clientY;
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const pointerMove = (event) => {
    if (startY.current === null || phase !== 'ready') return;
    setDragY(Math.min(0, Math.max(-120, event.clientY - startY.current)));
  };

  const pointerUp = () => {
    if (startY.current === null) return;
    const shouldThrow = dragY < -55;
    startY.current = null;
    setDragY(0);
    if (shouldThrow) throwPod();
  };

  const currentPhase = alreadyCaught && phase === 'ready' ? 'friend' : phase;
  const captured = currentPhase === 'caught' || currentPhase === 'friend';
  const isMico = critter.id === 'mico';

  return (
    <main className={`game-screen encounter-screen is-${currentPhase}`}>
      <img className="encounter-background" src="/assets/encounter-cove.png" alt="A sunny island cove with a sparkling cave" />
      <header className="encounter-header">
        <button className="cream-control back-button" onClick={onBack}><BackIcon /> Back</button>
        <div className="cream-control encounter-name"><strong>{critter.name}</strong><span>{critter.type}</span></div>
      </header>

      <aside className="critter-info">
        <span className="type-symbol" style={{ background: critter.color }}>{critter.icon === 'drop' ? '💧' : '✦'}</span>
        <h2>{critter.name}</h2>
        <h3>{critter.title}</h3>
        <p>{critter.description}</p>
        <div className="info-rule" />
        <strong>Special move</strong>
        <p>{critter.ability}</p>
      </aside>

      <section className="encounter-stage" aria-live="polite">
        <div className="ripple ripple-one" aria-hidden="true" />
        <div className="ripple ripple-two" aria-hidden="true" />
        <img className="encounter-critter" src={critter.image} alt={critter.name} draggable="false" />
        {captured && (
          <div className="capture-result">
            <span>{currentPhase === 'friend' ? 'Back for a cuddle!' : 'Cuddle-caught!'}</span>
            <strong>{critter.name}</strong>
            <p>{critter.ability}</p>
            {isMico && !evolved && (
              <button className="evolve-button" onClick={onEvolve}>Help MiCo evolve</button>
            )}
            {isMico && evolved && <p className="evolved-note">Mika Chu is now in your Field Guide!</p>}
            <button className="return-button" onClick={onBack}>Return to the island</button>
          </div>
        )}
      </section>

      {!captured && (
        <>
          <div className="pods-left"><img src="/assets/capture-pod.png" alt="" /><strong>{podsLeft}</strong><span>Pods left</span></div>
          <Pod
            name={critter.name}
            podsLeft={podsLeft}
            onThrow={throwPod}
            phase={phase}
            dragY={dragY}
            onPointerDown={pointerDown}
            onPointerMove={pointerMove}
            onPointerUp={pointerUp}
          />
          <p className="keyboard-tip">Swipe, click the pod, or press Space</p>
        </>
      )}
    </main>
  );
}
