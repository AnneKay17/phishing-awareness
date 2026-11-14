import StatusBar from '../components/common/StatusBar.jsx';

export default function LandingSection() {
  const goNext = () => document.getElementById('scan')?.scrollIntoView({ behavior: 'smooth' });
  return (
    <section id="landing" className="section">
      <div className="section__inner rise">
        <StatusBar left="SEC://ALERT" right="STATUS: COMPROMISED" dot />
        <p className="kicker">SECURITY ALERT</p>
        <h1 className="title">YOU'VE BEEN CAUGHT.</h1>
        <p className="text">
          Do you know how easy it is to get scammed?<br />
          You clicked a link without even checking the URL.<br />
          And you trusted me? Interesting.
        </p>
        <p className="text">Scroll down. We need to talk.</p>
      </div>
      <button type="button" className="scroll-hint" onClick={goNext} aria-label="Scroll to next section">
        SCROLL DOWN<span className="chev" aria-hidden="true">⌄</span>
      </button>
    </section>
  );
}
