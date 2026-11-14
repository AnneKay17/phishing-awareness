import StatusBar from '../components/common/StatusBar.jsx';
import useInView from '../hooks/useInView.js';

export default function RansomSection({ onProtect, glitching }) {
  const [ref, seen] = useInView(0.4);
  return (
    <section id="ransom" className={`section ransom ${glitching ? 'glitch' : ''}`} ref={ref}>
      <div className={`section__inner center fade ${seen ? 'in' : ''}`}>
        <StatusBar right="RISK: HIGH" />
        <h2 className="title">YOUR DATA<br />IS AT RISK.</h2>
        <p className="text">
          Would you like to prevent your information from being shared across the internet?<br />
          Click below to discover your options.
        </p>
        <button type="button" className="btn-threat" onClick={onProtect} disabled={glitching}>
          PROTECT MY DATA
        </button>
      </div>
    </section>
  );
}
