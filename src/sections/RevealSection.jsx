import { useState } from 'react';

export default function RevealSection() {
  const [fell, setFell] = useState(false); // local only: nothing is stored or sent
  return (
    <section className="reveal">
      <div className="reveal__inner pop">
        <h1 className="gotcha">GOTCHA! 😭</h1>
        <h2 className="kidding">GUYS, I'M KIDDING!</h2>
        <p>Nobody has your information. Nobody has your password. Nobody is selling your data.</p>
        <h3>But seriously...</h3>
        <p>
          Just because you know someone doesn't mean every link they send you is safe.
          Always check the URL. Think before you click. And never enter your credentials on suspicious websites.
        </p>
        <h3>Stay safe on the internet. ❤️</h3>
        <p className="sign">— AnneKay 💜</p>

        <div className="why">
          <h4>WHY DID I DO THIS?</h4>
          <h5>Because why not? I had a laptop, an idea, AI, and way too much free time 😭😂.</h5>
          <p>The festive season is here, and unfortunately, scammers are also getting busy😭💀.</p>
          <p>
            Between exciting promotions, giveaways, competitions, delivery notifications and seemingly harmless
            offers, it is easy to get carried away and click on links without thinking twice. Sometimes, we trust
            a link simply because it came from someone we know. But that doesn't automatically make it safe.
          </p>
          <p>
            This little prank is a reminder to slow down, inspect links before opening them, verify suspicious
            offers and never share passwords or sensitive information on unfamiliar websites.
            A moment of caution could save you from a very unpleasant experience.
          </p>
          <h4>Feel free to send this to that one family member who clicks on EVERYTHINGGGG. Heiiii😭😭💀</h4>
        </div>

        {fell
          ? <p className="thanks">Honesty noted 💜 Stay Safe.</p>
          : <button type="button" className="btn-fun" onClick={() => setFell(true)}>OKAY, I FELL FOR IT 😂</button>}
      </div>
    </section>
  );
}
