import { useEffect, useState } from 'react';
import StatusBar from '../components/common/StatusBar.jsx';
import useInView from '../hooks/useInView.js';

const MESSAGES = [
  'Initialising security scan...',
  'Analysing browser environment...',
  'Checking account exposure...',
  'Generating security report...',
];

export default function ScanSection({ onComplete }) {
  const [ref, started] = useInView(0.6); // scan only begins once the visitor sees it
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!started) return undefined;
    const id = setInterval(() => setProgress((p) => Math.min(100, p + 1)), 45); // ~4.5 s
    return () => clearInterval(id);
  }, [started]);

  useEffect(() => {
    if (progress < 100) return undefined;
    const t = setTimeout(onComplete, 900);
    return () => clearTimeout(t);
  }, [progress, onComplete]);

  return (
    <section id="scan" className="section" ref={ref}>
      <div className="section__inner">
        <StatusBar right={`SCAN ${progress}%`} />
        <h2 className="title">DON'T LEAVE YET.<br /><span className="red">I HAVE YOUR DETAILS.</span></h2>
        <div className="term" aria-live="polite">
          {MESSAGES.map((m, i) => progress >= i * 25 && (
            <p key={m}>&gt; {m} {progress >= (i + 1) * 25 ? <span className="ok">OK</span> : <span className="caret">█</span>}</p>
          ))}
        </div>
        <div className="bar" role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-valuenow={progress}>
          <div className="bar__fill" style={{ width: `${progress}%` }} />
        </div>
      </div>
    </section>
  );
}
