import StatusBar from '../components/common/StatusBar.jsx';

export default function LandingSection() {
  const goNext = () => document.getElementById('scan')?.scrollIntoView({ behavior: 'smooth' });
  return (
    <section id="landing" className="section">
      <div className="section__inner rise">
        <StatusBar right="STATUS: COMPROMISED" dot />
        <p className="kicker">SECURITY ALERT</p>
        <h1 className="title">YOU'VE BEEN CAUGHT.</h1>
        <p className="text">
          Your data has been compromised!
        </p>
        <p className="text">Scroll down to protect your data.</p>
      </div>
      <button type="button" className="scroll-hint" onClick={goNext} aria-label="Scroll to next section">
        SCROLL DOWN<span className="chev" aria-hidden="true">⌄</span>
      </button>
    </section>
  );
}
