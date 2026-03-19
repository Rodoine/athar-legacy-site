import { useState, useEffect, useRef } from "react";

const C = {
  void: "#030816", deep: "#0A1628", navy: "#0F2847", accent: "#1E90FF",
  gold: "#C9A84C", goldLt: "#E8D5A0", holo: "#00E5FF", white: "#F0F4FF",
  muted: "#8899AA", glass: "rgba(15,40,71,0.55)", glassBd: "rgba(30,144,255,0.18)",
};

const css = `
  *{margin:0;padding:0;box-sizing:border-box}html{scroll-behavior:smooth}body{background:${C.void}}
  ::selection{background:${C.accent}40}
  @keyframes pulse2{0%,100%{opacity:.3}50%{opacity:1}}
  .glass-card{background:${C.glass};border:1px solid ${C.glassBd};border-radius:16px;padding:32px 28px;backdrop-filter:blur(20px);transition:all .4s;box-shadow:0 4px 30px rgba(0,0,0,.3)}
  .glass-card:hover{border-color:${C.accent}60;box-shadow:0 0 40px ${C.accent}15;transform:translateY(-4px)}
  .btn-primary{display:inline-block;padding:14px 36px;background:linear-gradient(135deg,${C.accent},#0066CC);border-radius:8px;color:${C.white};text-decoration:none;font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;font-family:'JetBrains Mono',monospace;box-shadow:0 0 40px ${C.accent}30;border:none;cursor:pointer;transition:all .3s}
  .btn-primary:hover{transform:translateY(-2px);box-shadow:0 0 60px ${C.accent}40}
  .btn-outline{display:inline-block;padding:14px 36px;border:1px solid ${C.gold};border-radius:8px;color:${C.gold};text-decoration:none;font-size:12px;font-weight:700;letter-spacing:2px;text-transform:uppercase;font-family:'JetBrains Mono',monospace;background:transparent;cursor:pointer;transition:all .3s}
  .btn-outline:hover{background:${C.gold};color:${C.void}}
  .section{position:relative;padding:100px 24px;max-width:1200px;margin:0 auto}
  .label{font-size:11px;font-weight:700;letter-spacing:4px;text-transform:uppercase;color:${C.gold};font-family:'JetBrains Mono',monospace}
  .grid2{display:grid;grid-template-columns:repeat(auto-fit,minmax(300px,1fr));gap:24px}
  .grid3{display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:24px}
  input,textarea{width:100%;padding:14px 18px;background:rgba(10,22,40,0.8);border:1px solid ${C.glassBd};border-radius:8px;color:${C.white};font-size:15px;outline:none;font-family:inherit;transition:border .3s}
  input:focus,textarea:focus{border-color:${C.accent}}
  textarea{resize:vertical}
  @media(max-width:768px){.hide-mobile{display:none!important}.grid2,.grid3{grid-template-columns:1fr}.two-col{grid-template-columns:1fr!important}}
`;

function ScrollReveal({ children, delay = 0, className = "" }) {
  const ref = useRef(null);
  const [vis, setVis] = useState(false);
  useEffect(() => {
    const el = ref.current; if (!el) return;
    const obs = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setVis(true); obs.disconnect(); } }, { threshold: 0.1 });
    obs.observe(el); return () => obs.disconnect();
  }, []);
  return <div ref={ref} className={className} style={{ opacity: vis ? 1 : 0, transform: vis ? "translateY(0)" : "translateY(35px)", transition: `opacity .7s ${delay}s ease, transform .7s ${delay}s ease` }}>{children}</div>;
}

function SectionTitle({ label, title, sub }) {
  return <ScrollReveal><div style={{ marginBottom: 56, textAlign: "center" }}>
    {label && <div className="label" style={{ marginBottom: 14 }}>{label}</div>}
    <h2 style={{ fontSize: "clamp(28px,4.5vw,46px)", fontWeight: 300, color: C.white, lineHeight: 1.2, fontFamily: "'Cormorant Garamond',serif" }}>{title}</h2>
    {sub && <p style={{ fontSize: 16, color: C.muted, marginTop: 14, maxWidth: 580, marginLeft: "auto", marginRight: "auto", lineHeight: 1.7 }}>{sub}</p>}
  </div></ScrollReveal>;
}

function Nav() {
  const [sc, setSc] = useState(false);
  useEffect(() => { const fn = () => setSc(window.scrollY > 50); window.addEventListener("scroll", fn); return () => window.removeEventListener("scroll", fn); }, []);
  const links = [["Vision","#vision"],["Platform","#tech"],["Security","#security"],["Directed Legacy","#directed"],["Pricing","#pricing"],["Contact","#contact"]];
  return <nav style={{ position:"fixed",top:0,left:0,right:0,zIndex:100,padding:"0 28px",height:68,display:"flex",alignItems:"center",justifyContent:"space-between",background:sc?"rgba(3,8,22,0.92)":"transparent",backdropFilter:sc?"blur(20px)":"none",borderBottom:sc?`1px solid ${C.glassBd}`:"none",transition:"all .4s" }}>
    <div style={{ display:"flex",alignItems:"center",gap:10 }}>
      <span style={{ fontSize:24,color:C.gold }}>{"\u221E"}</span>
      <span style={{ fontSize:17,fontWeight:600,letterSpacing:3,color:C.white,fontFamily:"'Cormorant Garamond',serif" }}>ATHAR LEGACY</span>
    </div>
    <div className="hide-mobile" style={{ display:"flex",gap:24,alignItems:"center" }}>
      {links.map(([l,h]) => <a key={l} href={h} style={{ color:C.muted,textDecoration:"none",fontSize:11,fontWeight:600,letterSpacing:1.5,textTransform:"uppercase",fontFamily:"'JetBrains Mono',monospace" }}>{l}</a>)}
      <a href="#contact" className="btn-outline" style={{ padding:"8px 20px",fontSize:10 }}>Request Access</a>
    </div>
  </nav>;
}

function Hero() {
  const [show, setShow] = useState(false);
  useEffect(() => { setTimeout(() => setShow(true), 100); }, []);
  return <section style={{ minHeight:"100vh",display:"flex",flexDirection:"column",justifyContent:"center",alignItems:"center",textAlign:"center",padding:"120px 24px 80px",position:"relative",opacity:show?1:0,transition:"opacity 1.2s" }}>
    <div style={{ position:"absolute",top:"25%",left:"50%",transform:"translate(-50%,-50%)",width:500,height:500,borderRadius:"50%",background:`radial-gradient(circle,${C.accent}10 0%,transparent 70%)`,pointerEvents:"none" }} />
    <div className="label" style={{ marginBottom:28,letterSpacing:6 }}>Intergenerational Legacy Technology</div>
    <h1 style={{ fontSize:"clamp(44px,8vw,86px)",fontWeight:300,color:C.white,lineHeight:1.05,fontFamily:"'Cormorant Garamond',serif",maxWidth:880 }}>
      Preserve What<br/><span style={{ color:C.gold,fontStyle:"italic" }}>Matters Most</span>
    </h1>
    <p style={{ fontSize:40,color:C.goldLt,marginTop:24,fontWeight:300 }}>{"\u0623\u062B\u0631 \u0627\u0644\u0623\u062B\u0631"}</p>
    <p style={{ fontSize:17,color:C.muted,marginTop:8,fontStyle:"italic",fontFamily:"'Cormorant Garamond',serif",letterSpacing:1 }}>The Trace of the Trace</p>
    <p style={{ fontSize:16,color:C.muted,marginTop:28,maxWidth:560,lineHeight:1.8 }}>
      AI-powered cognitive preservation, century-scale encrypted storage, physical crystal archiving, and personalized inheritance control. Aligned with Dubai Economic Agenda D33.
    </p>
    <div style={{ display:"flex",gap:16,marginTop:44,flexWrap:"wrap",justifyContent:"center" }}>
      <a href="#tech" className="btn-primary">Explore</a>
      <a href="#contact" className="btn-outline">Request Access</a>
    </div>
    <div style={{ position:"absolute",bottom:36,left:"50%",transform:"translateX(-50%)",animation:"pulse2 2s infinite" }}>
      <div style={{ width:1,height:36,background:`linear-gradient(to bottom,${C.gold},transparent)` }} />
    </div>
  </section>;
}

function Vision() {
  const cards = [
    { icon: "\uD83E\uDDE0", title: "Cognitive Inheritance", text: "Preserve decision frameworks, life philosophy, and emotional guidance that defines a person." },
    { icon: "\uD83D\uDD4C", title: "Ethically Grounded", text: "Built within Islamic ethical boundaries and Emirati cultural values. The AI reflects reasoning, never simulates resurrection." },
    { icon: "\uD83C\uDFD9\uFE0F", title: "Dubai D33 Aligned", text: "Aligned with the Dubai Economic Agenda D33. Designed so descendants can access ancestral wisdom for generations." },
  ];
  return <div id="vision" className="section">
    <SectionTitle label="The Vision" title="Human Wisdom Deserves Immortality" sub="Families transmit wealth but rarely transmit the thinking that created it. Athar Legacy bridges this gap." />
    <div className="grid2">
      {cards.map((c, i) => <ScrollReveal key={i} delay={i * 0.12}>
        <div className="glass-card" style={{ height:"100%" }}>
          <div style={{ fontSize:38,marginBottom:14 }}>{c.icon}</div>
          <h3 style={{ fontSize:20,fontWeight:600,color:C.white,marginBottom:10,fontFamily:"'Cormorant Garamond',serif" }}>{c.title}</h3>
          <p style={{ fontSize:14,color:C.muted,lineHeight:1.7 }}>{c.text}</p>
        </div>
      </ScrollReveal>)}
    </div>
    <ScrollReveal delay={0.3}><div style={{ marginTop:56,padding:"36px 32px",background:`linear-gradient(135deg,${C.gold}0A,${C.accent}08)`,border:`1px solid ${C.gold}30`,borderRadius:16,textAlign:"center" }}>
      <p style={{ fontSize:21,fontStyle:"italic",color:C.goldLt,lineHeight:1.7,fontFamily:"'Cormorant Garamond',serif" }}>"Grandfather, what was your vision of life?"</p>
      <p style={{ fontSize:14,color:C.muted,marginTop:14 }}>A grandson, twenty years from now, accessing the preserved reasoning of a man he never met.</p>
    </div></ScrollReveal>
  </div>;
}

function Technology() {
  const mods = [
    { name: "Legacy Will\u2122", tag: "Recorded Testament", desc: "The authoritative voice of the person. A professionally guided testament recording preserving final wishes, values, and guidance.", color: C.gold },
    { name: "Legacy Avatar\u2122", tag: "AI Reasoning Mirror", desc: "AI trained on interviews and life decisions. Reflects how the person thought. Never simulates presence or resurrection.", color: C.accent },
    { name: "Essence Capture\u2122", tag: "Cognitive DNA", desc: "Guided deep-interview process with AI follow-ups, extracting worldview, values and priorities across multiple sessions.", color: C.holo },
    { name: "Legacy Vault\u2122", tag: "Century Storage", desc: "Post-quantum encrypted, distributed across 3+ geographic zones. Zero-trust architecture. Built to survive 100+ years.", color: "#A78BFA" },
    { name: "Legacy Crystal\u2122", tag: "Physical Archive", desc: "5D optical crystal storage on nanostructured quartz glass. Resists 1000\u00B0C, lasts millennia. VIP Dynasty exclusive.", color: "#F472B6" },
    { name: "Memoria\u2122 Assurance", tag: "Insurance Program", desc: "Insurance-style protection guaranteeing data integrity, technology migration, and restoration in case of loss.", color: "#34D399" },
    { name: "Directed Legacy\u2122", tag: "Granular Inheritance", desc: "Define who inherits what: business wisdom for a son, life guidance for a daughter, family vision for grandchildren. Time-locked messages.", color: "#F59E0B" },
  ];
  return <div id="tech" className="section">
    <SectionTitle label="The Platform" title="Seven Pillars of Legacy Preservation" sub="Each module serves a distinct function in capturing, preserving, insuring, and transmitting the essence of an individual." />
    <div className="grid3">
      {mods.map((m, i) => <ScrollReveal key={i} delay={i * 0.08}>
        <div className="glass-card">
          <div style={{ width:44,height:3,background:m.color,borderRadius:2,marginBottom:18,boxShadow:`0 0 20px ${m.color}40` }} />
          <div className="label" style={{ color:m.color,marginBottom:8,fontSize:10,letterSpacing:2 }}>{m.tag}</div>
          <h3 style={{ fontSize:21,fontWeight:600,color:C.white,marginBottom:10,fontFamily:"'Cormorant Garamond',serif" }}>{m.name}</h3>
          <p style={{ fontSize:14,color:C.muted,lineHeight:1.7 }}>{m.desc}</p>
        </div>
      </ScrollReveal>)}
    </div>
  </div>;
}

function Security() {
  const items = [
    { icon: "\uD83D\uDD10", title: "Post-Quantum Cryptography", text: "Algorithms designed to withstand quantum computing. Future-proof by design." },
    { icon: "\uD83C\uDF10", title: "Geographic Redundancy", text: "Distributed across multiple secure data centers with continuous integrity verification." },
    { icon: "\uD83D\uDEE1\uFE0F", title: "Anti-Deepfake Protection", text: "Biometric markers, voice verification, and cryptographic signatures on every recording." },
    { icon: "\uD83D\uDCCB", title: "Compliance Framework", text: "UAE data sovereignty, GDPR principles, and Islamic ethics in data handling." },
    { icon: "\uD83D\uDD0D", title: "Transparency Reports", text: "Annual audits by an independent Ethics Board of Islamic scholars and AI ethicists." },
    { icon: "\uD83D\uDC8E", title: "Physical Permanence", text: "Legacy Crystal archiving on quartz glass. Immune to electromagnetic damage, fire, and obsolescence." },
  ];
  const stats = [
    { num: "256-bit+", label: "Encryption" },
    { num: "100+", label: "Year Preservation" },
    { num: "3+", label: "Geographic Zones" },
    { num: "3 Layers", label: "Digital \u00B7 Cold \u00B7 Crystal" },
  ];
  return <div id="security" className="section">
    <SectionTitle label="Trust Center" title="Security Without Compromise" sub="Protecting the most sensitive information a family can possess." />
    <div className="grid2">
      {items.map((it, i) => <ScrollReveal key={i} delay={i * 0.08}>
        <div className="glass-card">
          <div style={{ fontSize:30,marginBottom:14 }}>{it.icon}</div>
          <h3 style={{ fontSize:17,fontWeight:600,color:C.white,marginBottom:8,fontFamily:"'Cormorant Garamond',serif" }}>{it.title}</h3>
          <p style={{ fontSize:14,color:C.muted,lineHeight:1.7 }}>{it.text}</p>
        </div>
      </ScrollReveal>)}
    </div>
    <ScrollReveal delay={0.2}><div style={{ display:"grid",gridTemplateColumns:"repeat(auto-fit,minmax(140px,1fr))",gap:24,padding:"32px 0",borderTop:`1px solid ${C.glassBd}`,borderBottom:`1px solid ${C.glassBd}`,marginTop:48 }}>
      {stats.map((s, i) => <div key={i} style={{ textAlign:"center" }}>
        <div style={{ fontSize:26,fontWeight:700,color:C.holo,fontFamily:"'JetBrains Mono',monospace" }}>{s.num}</div>
        <div style={{ fontSize:11,color:C.muted,marginTop:4,letterSpacing:1,textTransform:"uppercase" }}>{s.label}</div>
      </div>)}
    </div></ScrollReveal>
  </div>;
}

function DirectedLegacy() {
  const examples = [
    { heir: "Eldest Son", icon: "\uD83D\uDCBC", items: "Business philosophy, wealth management, entrepreneurial lessons, leadership guidance", color: C.accent },
    { heir: "Daughter", icon: "\uD83C\uDF3A", items: "Life philosophy, emotional guidance, marriage advice, personal values, conflict resolution", color: "#F472B6" },
    { heir: "Grandchildren", icon: "\uD83C\uDF1F", items: "Family history, cultural heritage, stories and traditions to preserve", color: C.gold },
    { heir: "Great-Grandchildren", icon: "\uD83D\uDD2E", items: "Family vision, long-term values, identity and honor for the future", color: "#A78BFA" },
  ];
  return <div id="directed" className="section">
    <SectionTitle label={"Directed Legacy\u2122"} title="Choose Who Inherits What" sub="A revolutionary feature that transforms preservation into personalized inheritance orchestration. Each heir receives the wisdom meant specifically for them." />
    <div className="grid2">
      {examples.map((e, i) => <ScrollReveal key={i} delay={i * 0.1}>
        <div className="glass-card" style={{ borderLeft:`3px solid ${e.color}` }}>
          <div style={{ display:"flex",alignItems:"center",gap:12,marginBottom:14 }}>
            <span style={{ fontSize:28 }}>{e.icon}</span>
            <h3 style={{ fontSize:20,fontWeight:600,color:C.white,fontFamily:"'Cormorant Garamond',serif" }}>{e.heir}</h3>
          </div>
          <p style={{ fontSize:14,color:C.muted,lineHeight:1.7 }}>{e.items}</p>
        </div>
      </ScrollReveal>)}
    </div>
    <ScrollReveal delay={0.3}><div style={{ marginTop:48,padding:"32px 28px",background:`linear-gradient(135deg,${C.gold}0A,${C.accent}08)`,border:`1px solid ${C.gold}30`,borderRadius:16 }}>
      <div style={{ display:"flex",alignItems:"flex-start",gap:20,flexWrap:"wrap" }}>
        <div style={{ fontSize:42 }}>{"\u23F0"}</div>
        <div style={{ flex:1,minWidth:260 }}>
          <h3 style={{ fontSize:20,fontWeight:600,color:C.white,marginBottom:8,fontFamily:"'Cormorant Garamond',serif" }}>Time-Locked Messages</h3>
          <p style={{ fontSize:14,color:C.muted,lineHeight:1.8 }}>
            Set wisdom to unlock at key life moments: "Open when you turn 30", "Open when you get married", "Open when you become a parent." The right guidance, at the right time.
          </p>
        </div>
      </div>
    </div></ScrollReveal>
  </div>;
}

function Pricing() {
  const tiers = [
    { name:"Foundation", price:"$15,000", annual:"$2,000/yr", features:["Essence Capture\u2122 (Standard)","Legacy Will\u2122 Recorded Testament","Legacy Vault\u2122 Standard","Directed Legacy\u2122 (2 heirs)","Memoria\u2122 (Optional)"], color:C.accent, popular:false },
    { name:"Evolution", price:"$50,000", annual:"$5,000/yr", features:["Deep Essence Capture\u2122","Multi-session Legacy Will\u2122","Legacy Avatar\u2122 Included","Full Directed Legacy\u2122","Enhanced Legacy Vault\u2122","Memoria\u2122 Included"], color:C.gold, popular:true },
    { name:"VIP Dynasty", price:"$200,000+", annual:"$15,000/yr", features:["Comprehensive Essence Capture\u2122","Premium Legacy Will\u2122","Advanced Legacy Avatar\u2122","Directed Legacy\u2122 + Time-Locks","Maximum Legacy Vault\u2122","Legacy Crystal\u2122 Included","Memoria\u2122 Included"], color:"#F472B6", popular:false },
  ];
  return <div id="pricing" className="section">
    <SectionTitle label="Service Tiers" title="Choose Your Legacy Package" sub="Three levels of preservation, each designed for a different stage of legacy commitment." />
    <div className="grid3">
      {tiers.map((t, i) => <ScrollReveal key={i} delay={i * 0.12}>
        <div className="glass-card" style={{ position:"relative",borderTop:`3px solid ${t.color}`,textAlign:"center" }}>
          {t.popular && <div style={{ position:"absolute",top:-14,left:"50%",transform:"translateX(-50%)",padding:"4px 16px",background:C.gold,borderRadius:20,fontSize:10,fontWeight:700,letterSpacing:2,textTransform:"uppercase",color:C.void }}>Most Popular</div>}
          <h3 style={{ fontSize:22,fontWeight:600,color:C.white,fontFamily:"'Cormorant Garamond',serif",marginTop:t.popular?10:0 }}>{t.name}</h3>
          <div style={{ fontSize:32,fontWeight:300,color:t.color,marginTop:12,fontFamily:"'JetBrains Mono',monospace" }}>{t.price}</div>
          <div style={{ fontSize:12,color:C.muted,marginTop:4 }}>+ Memoria&#8482; {t.annual}</div>
          <div style={{ marginTop:20,textAlign:"left" }}>
            {t.features.map((f, fi) => <div key={fi} style={{ fontSize:13,color:C.muted,padding:"6px 0",borderBottom:`1px solid ${C.glassBd}` }}>
              <span style={{ color:t.color,marginRight:8 }}>{"\u2713"}</span>{f}
            </div>)}
          </div>
          <a href="#contact" className={t.popular?"btn-primary":"btn-outline"} style={{ marginTop:24,display:"block",padding:"12px 20px",fontSize:11 }}>Request Access</a>
        </div>
      </ScrollReveal>)}
    </div>
  </div>;
}

function UseCases() {
  const cases = [
    { title: "The Patriarch", sub: "HNWI Family Office \u2014 Dubai", quote: "My grandchildren will inherit my wealth, but I want them to inherit my thinking. The decisions I made, the values I held \u2014 that is the real inheritance.", tier: "VIP Dynasty" },
    { title: "The Founder", sub: "Tech Entrepreneur \u2014 Riyadh", quote: "I built this company from nothing. When I\u2019m gone, will my successors understand the philosophy behind every strategic choice? Athar Legacy preserves that.", tier: "Evolution" },
    { title: "The Cultural Guardian", sub: "Heritage Institution \u2014 Abu Dhabi", quote: "We preserve artifacts and documents, but we lose the reasoning of the people who created them. This technology preserves cognitive heritage.", tier: "Institutional" },
  ];
  return <div id="cases" className="section">
    <SectionTitle label="Use Cases" title="Who Is Athar Legacy For?" sub="Premium heritage preservation for those who understand that true legacy transcends material wealth." />
    <div style={{ display:"flex",flexDirection:"column",gap:24 }}>
      {cases.map((uc, i) => <ScrollReveal key={i} delay={i * 0.12}>
        <div className="glass-card">
          <div style={{ display:"flex",justifyContent:"space-between",alignItems:"flex-start",flexWrap:"wrap",gap:16 }}>
            <div style={{ flex:1,minWidth:250 }}>
              <div className="label" style={{ marginBottom:8 }}>{uc.sub}</div>
              <h3 style={{ fontSize:23,fontWeight:600,color:C.white,marginBottom:14,fontFamily:"'Cormorant Garamond',serif" }}>{uc.title}</h3>
              <p style={{ fontSize:15,color:C.muted,lineHeight:1.8,fontStyle:"italic" }}>{"\u201C"}{uc.quote}{"\u201D"}</p>
            </div>
            <div style={{ padding:"8px 16px",border:`1px solid ${C.glassBd}`,borderRadius:6,fontSize:10,fontWeight:700,letterSpacing:2,textTransform:"uppercase",color:C.accent,fontFamily:"'JetBrains Mono',monospace",whiteSpace:"nowrap",alignSelf:"flex-start" }}>{uc.tier}</div>
          </div>
        </div>
      </ScrollReveal>)}
    </div>
  </div>;
}

function Contact() {
  const [form, setForm] = useState({ name:"",email:"",org:"",msg:"" });
  const [sent, setSent] = useState(false);
  if (sent) return <div id="contact" className="section" style={{ textAlign:"center",padding:"120px 24px" }}>
    <ScrollReveal>
      <div style={{ fontSize:52,color:C.gold,marginBottom:20 }}>{"\u2713"}</div>
      <h2 style={{ fontSize:30,color:C.white,fontFamily:"'Cormorant Garamond',serif",fontWeight:300 }}>Thank you for your interest</h2>
      <p style={{ color:C.muted,marginTop:12 }}>Our team will contact you within 48 hours with a confidential briefing package.</p>
    </ScrollReveal>
  </div>;
  return <div id="contact" className="section">
    <SectionTitle label="Investor Access" title="Begin the Conversation" sub="Request a confidential briefing and discover how Athar Legacy is building the infrastructure for human memory preservation." />
    <ScrollReveal><div style={{ maxWidth:620,margin:"0 auto" }}>
      <div className="glass-card">
        <div style={{ display:"flex",flexDirection:"column",gap:18 }}>
          <div className="two-col" style={{ display:"grid",gridTemplateColumns:"1fr 1fr",gap:14 }}>
            <input placeholder="Full Name" value={form.name} onChange={e=>setForm({...form,name:e.target.value})} />
            <input type="email" placeholder="Email" value={form.email} onChange={e=>setForm({...form,email:e.target.value})} />
          </div>
          <input placeholder="Organization / Family Office" value={form.org} onChange={e=>setForm({...form,org:e.target.value})} />
          <textarea rows={4} placeholder="Tell us about your interest in legacy preservation..." value={form.msg} onChange={e=>setForm({...form,msg:e.target.value})} />
          <button onClick={()=>setSent(true)} style={{ padding:"16px 32px",background:`linear-gradient(135deg,${C.gold},#B8943A)`,border:"none",borderRadius:8,color:C.void,fontSize:13,fontWeight:700,letterSpacing:2,textTransform:"uppercase",fontFamily:"'JetBrains Mono',monospace",cursor:"pointer",boxShadow:`0 0 30px ${C.gold}30`,width:"100%",transition:"all .3s" }}>Request Confidential Briefing</button>
          <p style={{ fontSize:11,color:C.muted,textAlign:"center" }}>All communications are encrypted and handled under strict NDA protocols.</p>
        </div>
      </div>
    </div></ScrollReveal>
  </div>;
}

function Footer() {
  return <footer style={{ borderTop:`1px solid ${C.glassBd}`,padding:"56px 24px",textAlign:"center" }}>
    <span style={{ fontSize:32,color:C.gold }}>{"\u221E"}</span>
    <p style={{ fontSize:13,color:C.muted,marginTop:12,letterSpacing:3,fontFamily:"'JetBrains Mono',monospace" }}>ATHAR LEGACY</p>
    <p style={{ fontSize:12,color:C.muted,marginTop:6,opacity:0.6 }}>Dubai, United Arab Emirates</p>
    <p style={{ fontSize:11,color:C.muted,marginTop:20,opacity:0.4 }}>{"\u00A9"} 2026 Athar Legacy. All rights reserved. Confidential.</p>
  </footer>;
}

export default function AtharLegacy() {
  return <div style={{ minHeight:"100vh",background:`linear-gradient(180deg,${C.void} 0%,${C.deep} 50%,${C.void} 100%)`,color:C.white,fontFamily:"'DM Sans',-apple-system,BlinkMacSystemFont,sans-serif" }}>
    <style>{css}</style>
    <Nav />
    <Hero />
    <Vision />
    <Technology />
    <Security />
    <DirectedLegacy />
    <Pricing />
    <UseCases />
    <Contact />
    <Footer />
  </div>;
}
