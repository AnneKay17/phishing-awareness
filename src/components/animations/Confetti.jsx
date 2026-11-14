import { useEffect, useMemo, useState } from 'react';

const COLORS = ['#fde047', '#67e8f9', '#f0abfc', '#c4b5fd', '#ffffff'];

// Pure pseudo-random spread: the same index always gives the same value (no Math.random in render).
const frac = (n) => n - Math.floor(n);

// CSS-only confetti: pieces fall once, then the whole layer unmounts.
export default function Confetti({ count = 70 }) {
  const [alive, setAlive] = useState(true);
  const pieces = useMemo(() => Array.from({ length: count }, (_, i) => ({
    id: i,
    left: frac(i * 0.6180339) * 100,
    delay: frac(i * 0.7548777) * 0.8,
    dur: 2.8 + frac(i * 0.5698403) * 2,
    size: 7 + frac(i * 0.8191725) * 7,
    rot: frac(i * 0.3247179) * 360,
    color: COLORS[i % COLORS.length],
  })), [count]);

  useEffect(() => {
    const t = setTimeout(() => setAlive(false), 6500);
    return () => clearTimeout(t);
  }, []);

  if (!alive) return null;
  return (
    <div className="confetti" aria-hidden="true">
      {pieces.map((p) => (
        <i key={p.id} style={{
          left: `${p.left}%`, width: p.size, height: p.size * 0.6, background: p.color,
          animationDelay: `${p.delay}s`, animationDuration: `${p.dur}s`, '--rot': `${p.rot}deg`,
        }} />
      ))}
    </div>
  );
}
