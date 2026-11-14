
import { useCallback, useEffect, useRef, useState } from 'react';

import LandingSection from './sections/LandingSection.jsx';
import RansomSection from './sections/RansomSection.jsx';
import RevealSection from './sections/RevealSection.jsx';

import Confetti from './components/animations/Confetti.jsx';
import useReducedMotion from './hooks/useReducedMotion.js';

const wait = (ms) =>
  new Promise((resolve) => setTimeout(resolve, ms));

export default function App() {
  const reduced = useReducedMotion();

  const [stage, setStage] = useState('idle');

  // Prevent duplicate scrolling and reveal transitions.
  const autoScrolled = useRef(false);
  const revealStarted = useRef(false);

  // LANDING -> RANSOM AUTOMATIC SCROLL
  useEffect(() => {
    if (stage !== 'idle') return;

    const landingTimer = setTimeout(() => {
      if (autoScrolled.current) return;

      const landing = document.getElementById('landing');
      const ransom = document.getElementById('ransom');

      if (!landing || !ransom) return;

      const rect = landing.getBoundingClientRect();

      const stillOnLanding =
        rect.top < window.innerHeight * 0.5 &&
        rect.bottom > window.innerHeight * 0.5;

      if (stillOnLanding) {
        autoScrolled.current = true;

        ransom.scrollIntoView({
          behavior: reduced ? 'auto' : 'smooth',
          block: 'start'
        });
      }
    }, 5000);

    return () => clearTimeout(landingTimer);
  }, [stage, reduced]);

  // REVEAL TRANSITION
  const handleProtect = useCallback(async () => {
    // Prevent the button and automatic timer from triggering twice.
    if (revealStarted.current) return;

    revealStarted.current = true;

    if (reduced) {
      window.scrollTo(0, 0);
      setStage('revealed');
      return;
    }

    // Glitch effect.
    setStage('glitch');

    await wait(300);

    // Dark transition.
    setStage('dark');

    await wait(1300);

    // Reveal AnneKay.
    window.scrollTo(0, 0);
    setStage('revealed');
  }, [reduced]);

  // RANSOM -> REVEAL AUTOMATICALLY
  useEffect(() => {
    if (stage !== 'idle') return;

    const ransom = document.getElementById('ransom');

    if (!ransom) return;

    let revealTimer;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !revealStarted.current) {
          // Start the countdown once the ransom screen is visible.
          revealTimer = setTimeout(() => {
            handleProtect();
          }, 5000);

          observer.disconnect();
        }
      },
      {
        threshold: 0.4
      }
    );

    observer.observe(ransom);

    return () => {
      observer.disconnect();
      clearTimeout(revealTimer);
    };
  }, [stage, handleProtect]);

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

          <RansomSection
            onProtect={handleProtect}
            glitching={stage === 'glitch'}
          />
        </main>
      )}

      <div
        className={`veil veil--${stage}`}
        aria-hidden="true"
      />
    </div>
  );
}
