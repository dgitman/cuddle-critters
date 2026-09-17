export default function Pod({ name, podsLeft, onThrow, phase, dragY, onPointerDown, onPointerMove, onPointerUp }) {
  return (
    <div className="pod-wrap">
      <div className={`throw-guide ${phase !== 'ready' ? 'is-hidden' : ''}`} aria-hidden="true">
        <span className="throw-arrow">↑</span>
        <span>Swipe up to cuddle-catch!</span>
      </div>
      <button
        className={`capture-pod phase-${phase}`}
        style={{ '--drag-y': `${dragY}px` }}
        onClick={() => phase === 'ready' && onThrow()}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        aria-label={`Throw a gold-and-silver pod at ${name}. ${podsLeft} pods left.`}
      >
        <img src="/assets/capture-pod.png" alt="" draggable="false" />
        <span className="pod-screen">{name}</span>
      </button>
    </div>
  );
}
