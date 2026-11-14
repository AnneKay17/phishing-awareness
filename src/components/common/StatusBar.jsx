// Terminal-style top bar shared by sections 1-4.
export default function StatusBar({ left, right, dot = false }) {
  return (
    <div className="statusbar">
      <span>{dot && <span className="dot" aria-hidden="true" />}{left}</span>
      <span className="red">{right}</span>
    </div>
  );
}
