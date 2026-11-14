import StatusBar from '../components/common/StatusBar.jsx';
import useInView from '../hooks/useInView.js';
import { mockAccount } from '../data/mockAccountData.js';

export default function AccountDetailsSection() {
  const [ref, seen] = useInView(0.4);
  const rows = [
    ['Full name', mockAccount.fullName],
    ['Google account', mockAccount.email],
    ['Password', mockAccount.password],
  ];
  return (
    <section id="account" className="section" ref={ref}>
      <div className={`section__inner fade ${seen ? 'in' : ''}`}>
        <StatusBar left="SECURITY REPORT" right="DATA" />
        {rows.map(([label, value]) => (
          <div className="row" key={label}><span>{label}</span><span>{value}</span></div>
        ))}
        <p className="note"></p>
      </div>
    </section>
  );
}
