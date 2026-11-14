import { useCallback, useRef, useState } from 'react';
import LandingSection from './sections/LandingSection.jsx';
import ScanSection from './sections/ScanSection.jsx';
//import AccountDetailsSection from './sections/AccountDetailsSection.jsx';
import RansomSection from './sections/RansomSection.jsx';
import RevealSection from './sections/RevealSection.jsx';
import Confetti from './components/animations/Confetti.jsx';
import useReducedMotion from './hooks/useReducedMotion.js';

const wait = (ms) => new Promise((r) => setTimeout(r, ms));

// stage: idle -> glitch (300ms) -> dark (400ms fade + 900ms pause) -> revealed
export default function App() {
  const reduced = useReducedMotion();
  const [stage, setStage] = useState('idle');
  const autoScrolled = useRef(false);

  // Auto-scroll once, and only if the visitor is still looking at the scan section.
  const handleScanComplete = useCallback(() => {
    if (autoScrolled.current) return;
    autoScrolled.current = true;
    const scan = document.getElementById('scan');
    const next = document.getElementById('account');
    if (!scan || !next) return;
    const r = scan.getBoundingClientRect();
    const stillHere = r.top < window.innerHeight * 0.5 && r.bottom > window.innerHeight * 0.5;
    if (stillHere) next.scrollIntoView({ behavior: reduced ? 'auto' : 'smooth' });
  }, [reduced]);

  const handleProtect = async () => {
    if (stage !== 'idle') return;
    if (reduced) { window.scrollTo(0, 0); setStage('revealed'); return; }
    setStage('glitch');
    await wait(300);
    setStage('dark');
    await wait(1300);
    window.scrollTo(0, 0);
    setStage('revealed');
  };

  const revealed = stage === 'revealed';
  return (
    <div className={`app ${revealed ? 'app--reveal' : ''}`}>
      {revealed ? (
        <>
          <RevealSection />
          {!reduced && <Confetti />}
        </>
      ) : (
        <main>
          <LandingSection />
          <ScanSection onComplete={handleScanComplete} />

          <RansomSection onProtect={handleProtect} glitching={stage === 'glitch'} />
        </main>
      )}
      <div className={`veil veil--${stage}`} aria-hidden="true" />
    </div>
  );
}
