import { useState, useEffect, useRef } from "react";

const IconMicroscope = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="1.8rem" height="1.8rem">
    <path d="M9.5 2a.5.5 0 0 0-.5.5v1H7.5A1.5 1.5 0 0 0 6 5v6a1.5 1.5 0 0 0 1.5 1.5H9v1H7a1 1 0 0 0 0 2h.126A6.002 6.002 0 0 0 12 21a6 6 0 0 0 4.874-2.5H18a1 1 0 0 0 0-2h-2v-1h1.5A1.5 1.5 0 0 0 19 11V5a1.5 1.5 0 0 0-1.5-1.5H16v-1a.5.5 0 0 0-.5-.5h-6zm.5 3h4v5h-4V5zm2 9a4 4 0 1 1 0 8 4 4 0 0 1 0-8z"/>
  </svg>
);
const IconArchway = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="1.8rem" height="1.8rem">
    <path d="M3 21V9.75A9 9 0 0 1 12 3a9 9 0 0 1 9 6.75V21h-4v-7a5 5 0 0 0-10 0v7H3zm2 0h2v-7a7 7 0 0 1 14 0v7h2V9.938A7 7 0 0 0 12 5a7 7 0 0 0-7 4.938V21z"/>
  </svg>
);
const IconRocket = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="1.8rem" height="1.8rem">
    <path d="M13.13 22.19L11.5 18.36c1.12-.31 2.18-.75 3.19-1.34l-1.56 5.17zM5.64 12.5l-3.83-1.63 5.17-1.56c-.59 1.01-1.03 2.07-1.34 3.19zM21.61 2.39A10.975 10.975 0 0 0 12 5c-2.7 0-5.17 1.01-7.07 2.66L2 10.59 7.41 16l2.93-2.93 1.41 1.41L8.82 17.4 14.18 21l2.66-2.66C18.6 16.37 20 13.45 20 10.5c0-3.31-1.76-6.21-4.39-7.89L21.61 2.39z"/>
  </svg>
);
const IconGear = () => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="1.8rem" height="1.8rem">
    <path d="M19.14 12.94c.04-.3.06-.61.06-.94s-.02-.64-.07-.94l2.03-1.58a.49.49 0 0 0 .12-.61l-1.92-3.32a.49.49 0 0 0-.59-.22l-2.39.96a6.964 6.964 0 0 0-1.62-.94l-.36-2.54a.484.484 0 0 0-.48-.41h-3.84c-.24 0-.43.17-.47.41l-.36 2.54c-.59.24-1.13.57-1.62.94l-2.39-.96a.48.48 0 0 0-.59.22L2.74 8.87a.47.47 0 0 0 .12.61l2.03 1.58c-.05.3-.09.63-.09.94s.02.64.07.94l-2.03 1.58a.49.49 0 0 0-.12.61l1.92 3.32c.12.22.37.29.59.22l2.39-.96c.5.38 1.03.7 1.62.94l.36 2.54c.05.24.24.41.48.41h3.84c.24 0 .44-.17.47-.41l.36-2.54c.59-.24 1.13-.56 1.62-.94l2.39.96c.22.08.47 0 .59-.22l1.92-3.32a.47.47 0 0 0-.12-.61l-2.01-1.58zM12 15.6c-1.98 0-3.6-1.62-3.6-3.6s1.62-3.6 3.6-3.6 3.6 1.62 3.6 3.6-1.62 3.6-3.6 3.6z"/>
  </svg>
);

const LOGO_B64 = "/9j/4AAQSkZJRgABAQAAAQABAAD/4gHYSUNDX1BST0ZJTEUAAQEAAAHIAAAAAAQwAABtbnRyUkdCIFhZWiAH4AABAAEAAAAAAABhY3NwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAQAA9tYAAQAAAADTLQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAlkZXNjAAAA8AAAACRyWFlaAAABFAAAABRnWFlaAAABKAAAABRiWFlaAAABPAAAABR3dHB0AAABUAAAABRyVFJDAAABZAAAAChnVFJDAAABZAAAAChiVFJDAAABZAAAAChjcHJ0AAABjAAAADxtbHVjAAAAAAAAAAEAAAAMZW5VUwAAAAgAAAAcAHMAUgBHAEJYWVogAAAAAAAAb6IAADj1AAADkFhZWiAAAAAAAABimQAAt4UAABjaWFlaIAAAAAAAACSgAAAPhAAAts9YWVogAAAAAAAA9tYAAQAAAADTLXBhcmEAAAAAAAQAAAACZmYAAPKnAAANWQAAE9AAAApbAAAAAAAAAABtbHVjAAAAAAAAAAEAAAAMZW5VUwAAACAAAAAcAEcAbwBvAGcAbABlACAASQBuAGMALgAgADIAMAAxADb/2wBDAAUDBAQEAwUEBAQFBQUGBwwIBwcHBw8LCwkMEQ8SEhEPERETFhwXExQaFRERGCEYGh0dHx8fExciJCIeJBweHx7/2wBDAQUFBQcGBw4ICA4eFBEUHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh4eHh7/wAARCAVGBDgDASIAAhEBAxEB/8QAHQABAAICAwEBAAAAAAAAAAAAAAcIBgkBBAUDAv/EAGMQAAEDAwEEBQUGEAYQBAYDAQABAgMEBREGBwgSIRMxQVFhFCJxgZEJFTJCcqEWGCM3UlZidYKSpbGzwcLTMzhDorTRFyRTVWNnc3SDk5SjstLU5FeV4fAmNERUpMMlJ/E1/8QAHAEBAAIDAQEBAAAAAAAAAAAAAAMEAgUGAQcI/8QAPxEBAAIBAgMEBwYEBgMAAgMAAAECAwQRBSExBhJBURNhcZGhsdEiMoHB4fAUFVJTIyQzQnKSFjTxQ2IHRKL/2gAMAwEAAhEDEQA/AKZAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAD";

const STATS = [
  { num: "100+", label: "Clients", sub: "Global portfolio across USA, UK & UAE", bgGradient: "radial-gradient(ellipse at 60% 40%, #1a2a4a 0%, #0d1420 100%)", icon: "🌐", reveal: "Global network of visionary clients across three continents." },
  { num: "10+", label: "Years", sub: "A decade of market dominance", bgGradient: "radial-gradient(ellipse at 40% 60%, #2a1a0d 0%, #140d06 100%)", icon: "🕰", reveal: "Over a decade forged in the world's most competitive markets." },
  { num: "∞", label: "Potential", sub: "Unlimited agency capacity", bgGradient: "radial-gradient(ellipse at 50% 30%, #0d2a1a 0%, #071410 100%)", icon: "📈", reveal: "No cap on growth. We scale with your ambition." },
];

const TABLE = [
  ["Long-Term Contract Traps", "Performance-Based Retention"],
  ["Focus on 'Impressions'", "Focus on Pipeline Velocity"],
  ["Generalist Staff", "Senior-Level Revenue Architects"],
  ["Opaque Reporting", "Real-Time Data Transparency"],
];

const CYCLE = [
  { step: "01", title: "Diagnostic", desc: "Identifying revenue leaks in your current funnel — from traffic sources to conversion points — with forensic precision.", Icon: IconMicroscope },
  { step: "02", title: "Architecture", desc: "Building a high-conversion digital flagship. Every page, every touchpoint, every message engineered to close.", Icon: IconArchway },
  { step: "03", title: "Deployment", desc: "Omnichannel promotion across global markets — paid, organic, earned, and owned — in perfect strategic alignment.", Icon: IconRocket },
  { step: "04", title: "Optimization", desc: "Continuous data-looping to increase Customer Lifetime Loyalty. We compound your growth every single month.", Icon: IconGear },
];

const TESTIMONIALS = [
  { quote: "We run an investment and seed-funding company in California. The team from the Philippines has assisted us, and I'm extremely happy with their work and quickness.", name: "James T.", role: "Venture Capitalist", market: "UAE", img: "/src/assets/a1.jpg" },
  { quote: "Sun Arabia has helped us with our targets in MENA. I would recommend their services with full confidence.", name: "G. Jan. W.", role: "Pharmaceutical Director", market: "UK", img: "/src/assets/a2.jpg" },
  { quote: "Working with Carlo and the team has been great. Everything on time, completed to a high standard. Good communication and knowledge to meet all business needs.", name: "Charlie M", role: "Lotu Education", market: "USA", img: "/src/assets/a3.jpg" },
  { quote: "I enjoyed working with them on one of my start ups. It was very fun.", name: "Matt. K.M", role: "UK and UAE Real Estate Developer", market: "UAE / USA", img: "/src/assets/a4.jpg" },
  { quote: "Sun Arabia brought clarity, commercial focus, and the kind of execution that turns strategy into measurable growth. The process was sharp, fast, and highly effective.", name: "Steve Moore", role: "Business Leader", market: "USA", img: "/src/assets/a1.jpg" },
];

function GoldDust() {
  const ref = useRef(null);
  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    let W, H, particles = [], raf;
    function resize() { W = canvas.width = canvas.offsetWidth; H = canvas.height = canvas.offsetHeight; }
    resize();
    window.addEventListener("resize", resize);
    for (let i = 0; i < 80; i++) particles.push({ x: Math.random() * 2000, y: Math.random() * 1200, r: Math.random() * 1.6 + 0.2, vx: (Math.random() - 0.5) * 0.18, vy: -Math.random() * 0.22 - 0.04, a: Math.random() * 0.7 + 0.1, t: Math.random() * Math.PI * 2 });
    function draw() {
      ctx.clearRect(0, 0, W, H);
      particles.forEach(p => {
        p.x += p.vx; p.y += p.vy; p.t += 0.016;
        if (p.y < -5) { p.y = H + 5; p.x = Math.random() * W; }
        if (p.x < -5 || p.x > W + 5) { p.x = Math.random() * W; p.y = H + 5; }
        const a = p.a * (0.55 + 0.45 * Math.sin(p.t));
        ctx.beginPath(); ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(197,160,89,${a})`; ctx.fill();
      });
      raf = requestAnimationFrame(draw);
    }
    draw();
    return () => { cancelAnimationFrame(raf); window.removeEventListener("resize", resize); };
  }, []);
  return <canvas ref={ref} style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none", opacity: 0.55 }} />;
}

function GoldLine() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "1.2rem", padding: "0 6vw", maxWidth: 400, margin: "0 auto" }}>
      <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, transparent, var(--gold-dim))" }} />
      <span style={{ color: "var(--gold)", fontSize: ".7rem" }}>◆</span>
      <div style={{ flex: 1, height: 1, background: "linear-gradient(90deg, var(--gold-dim), transparent)" }} />
    </div>
  );
}

function RevealBlock({ children, delay = 0 }) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(28px)";
    el.style.transition = `opacity .75s ${delay}ms ease, transform .75s ${delay}ms ease`;
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) { el.style.opacity = "1"; el.style.transform = "none"; obs.unobserve(el); }
    }, { threshold: 0.1 });
    obs.observe(el);
    return () => obs.disconnect();
  }, [delay]);
  return <div ref={ref}>{children}</div>;
}

function Cursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const pos = useRef({ x: 0, y: 0, rx: 0, ry: 0 });
  useEffect(() => {
    const move = e => {
      pos.current.x = e.clientX; pos.current.y = e.clientY;
      if (dotRef.current) { dotRef.current.style.left = e.clientX + "px"; dotRef.current.style.top = e.clientY + "px"; }
    };
    document.addEventListener("mousemove", move);
    let raf;
    function loop() {
      pos.current.rx += (pos.current.x - pos.current.rx) * 0.12;
      pos.current.ry += (pos.current.y - pos.current.ry) * 0.12;
      if (ringRef.current) { ringRef.current.style.left = pos.current.rx + "px"; ringRef.current.style.top = pos.current.ry + "px"; }
      raf = requestAnimationFrame(loop);
    }
    loop();
    return () => { document.removeEventListener("mousemove", move); cancelAnimationFrame(raf); };
  }, []);
  return <>
    <div ref={dotRef} style={{ position: "fixed", width: 8, height: 8, borderRadius: "50%", background: "var(--gold)", pointerEvents: "none", zIndex: 9999, transform: "translate(-50%,-50%)", mixBlendMode: "screen" }} />
    <div ref={ringRef} style={{ position: "fixed", width: 32, height: 32, borderRadius: "50%", border: "1px solid rgba(197,160,89,.5)", pointerEvents: "none", zIndex: 9998, transform: "translate(-50%,-50%)" }} />
  </>;
}

export default function SunArabia() {
  const [activeHover, setActiveHover] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [formState, setFormState] = useState({ name: "", email: "", company: "", msg: "" });
  const [submitted, setSubmitted] = useState(false);
  const [activeTestimonial, setActiveTestimonial] = useState(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const logoSrc = `data:image/jpeg;base64,${LOGO_B64}`;

  const scrollTo = (id) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div style={{ fontFamily: "'Inter', sans-serif", background: "#1A1A1B", color: "#F7F7F7", minHeight: "100vh", overflowX: "hidden", position: "relative" }}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600;1,700&family=Montserrat:wght@300;400;500&family=Inter:wght@300;400;500&display=swap');
        * { box-sizing: border-box; margin: 0; padding: 0; }
        :root { --gold: #C5A059; --gold-light: #E8CA8A; --gold-dim: #7A6030; --obsidian: #1A1A1B; --flint: #4A4E51; --alabaster: #F7F7F7; }
        html { scroll-behavior: smooth; }
        body { background: #1A1A1B; cursor: none; }
        .serif { font-family: 'Cormorant Garamond', serif; }
        .mono { font-family: 'Montserrat', sans-serif; }
        section { position: relative; overflow: hidden; }
        input, textarea { outline: none; }
        ::-webkit-scrollbar { width: 6px; }
        ::-webkit-scrollbar-track { background: #111; }
        ::-webkit-scrollbar-thumb { background: var(--gold-dim); border-radius: 3px; }
        .stat-card { position: relative; overflow: hidden; cursor: default; }
        .stat-reveal { position: absolute; inset: 0; display: flex; align-items: center; justify-content: center; flex-direction: column; gap: 8px; padding: 28px; opacity: 0; transition: opacity .4s ease; pointer-events: none; }
        .stat-card:hover .stat-reveal { opacity: 1; }
        .stat-card:hover .stat-main { opacity: 0; }
        .stat-main { transition: opacity .3s ease; }
        @keyframes fadeUp { from { opacity:0; transform:translateY(20px); } to { opacity:1; transform:none; } }
        @keyframes shimmer { 0%,100%{background-position:0% 50%} 50%{background-position:100% 50%} }
        @keyframes pulse-ring { 0%{transform:translate(-50%,-50%) scale(1);opacity:.7} 100%{transform:translate(-50%,-50%) scale(2.4);opacity:0} }
        .shimmer-text { background: linear-gradient(90deg, #C5A059, #E8CA8A, #C5A059); background-size: 200%; -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text; animation: shimmer 3s ease infinite; }
        .btn-gold { background: linear-gradient(135deg, #C5A059, #E8CA8A); color: #1A1A1B; border: none; padding: 14px 32px; font-family: 'Montserrat', sans-serif; font-weight: 500; font-size: 11px; letter-spacing: 3px; text-transform: uppercase; cursor: pointer; transition: transform .2s, box-shadow .2s, filter .2s; position: relative; overflow: hidden; }
        .btn-gold:hover { transform: translateY(-2px); box-shadow: 0 12px 40px rgba(197,160,89,.45); filter: brightness(1.08); }
        .btn-outline-gold { background: transparent; border: 1px solid var(--gold); color: var(--gold); padding: 13px 28px; font-family: 'Montserrat', sans-serif; font-weight: 300; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; cursor: pointer; transition: all .25s; }
        .btn-outline-gold:hover { background: rgba(197,160,89,.1); }
        .nav-link { font-family:'Montserrat',sans-serif; font-weight:300; font-size:11px; letter-spacing:2.5px; text-transform:uppercase; color:rgba(247,247,247,.7); text-decoration:none; cursor:pointer; transition:color .25s; position:relative; }
        .nav-link::after { content:''; position:absolute; bottom:-4px; left:0; width:0; height:1px; background:var(--gold); transition:width .3s; }
        .nav-link:hover { color:var(--gold); }
        .nav-link:hover::after { width:100%; }
        .process-step { position: relative; }
        .process-step::before { content: ''; position: absolute; top: 50%; right: -1px; width: 1px; height: 60%; background: linear-gradient(180deg, transparent, var(--gold-dim), transparent); transform: translateY(-50%); }
        .process-step:last-child::before { display: none; }
        .tcard { border: 1px solid rgba(197,160,89,.18); padding: 2.8rem; background: linear-gradient(145deg, rgba(197,160,89,.035), rgba(10,10,11,0.6)); position: relative; height: 100%; transition: border-color .35s ease, transform .35s ease, box-shadow .35s ease; cursor: default; }
        .tcard:hover { border-color: rgba(197,160,89,.5); transform: translateY(-5px); box-shadow: 0 28px 70px rgba(0,0,0,.55), 0 0 40px rgba(197,160,89,.06); }
        .tcard-top-line { position:absolute; top:0; left:10%; right:10%; height:1px; background: linear-gradient(90deg, transparent, rgba(197,160,89,.4), transparent); transition: opacity .35s; }
        .tcard:hover .tcard-top-line { opacity: 1; background: linear-gradient(90deg, transparent, var(--gold), transparent); }
        .tcard-qmark { font-family:'Cormorant Garamond',serif; font-size:7rem; line-height:.65; color:var(--gold); opacity:.1; position:absolute; top:1.5rem; left:2rem; pointer-events:none; transition: opacity .35s; user-select:none; }
        .tcard:hover .tcard-qmark { opacity:.2; }
        @media (max-width: 768px) {
          .process-step::before { display: none; }
          .hide-mobile { display: none !important; }
          .two-col { grid-template-columns: 1fr !important; }
        }
      `}</style>

      <Cursor />

      <nav style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 500, background: scrolled ? "rgba(16,16,17,0.94)" : "transparent", borderBottom: scrolled ? "1px solid rgba(197,160,89,.1)" : "none", backdropFilter: scrolled ? "blur(24px)" : "none", transition: "all .4s ease", padding: "0 6vw", height: 72, display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <button onClick={() => scrollTo("hero")} style={{ background: "none", border: "none", cursor: "pointer", padding: 0 }}>
          <img src={logoSrc} alt="Sun Arabia" style={{ height: 44, objectFit: "contain" }} />
        </button>
        <div className="hide-mobile" style={{ display: "flex", alignItems: "center", gap: "2.8rem" }}>
          {["about", "pricing", "contact"].map(id => (
            <span key={id} className="nav-link" onClick={() => scrollTo(id)}>
              {id === "about" ? "About Us" : id === "pricing" ? "Pricing" : "Contact"}
            </span>
          ))}
          <button className="btn-gold" onClick={() => scrollTo("contact")} style={{ padding: "11px 22px", fontSize: "10px", letterSpacing: "2.5px" }}>Get a Consultation</button>
        </div>
        <button onClick={() => setMenuOpen(m => !m)} style={{ display: "none", background: "none", border: "none", cursor: "pointer", flexDirection: "column", gap: 5, padding: 8 }} className="hamburger-btn">
          {[0,1,2].map(i => <span key={i} style={{ display: "block", width: 22, height: 1.5, background: "var(--gold)" }} />)}
        </button>
      </nav>

      <section id="hero" style={{ minHeight: "100vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "120px 6vw 80px", position: "relative", background: "radial-gradient(ellipse at 30% 20%, rgba(197,160,89,.07) 0%, transparent 65%), #1A1A1B" }}>
        <GoldDust />
        <svg style={{ position: "absolute", inset: 0, width: "100%", height: "100%", pointerEvents: "none" }} xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="lg1" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#C5A059" stopOpacity="0" />
              <stop offset="50%" stopColor="#C5A059" stopOpacity="0.18" />
              <stop offset="100%" stopColor="#C5A059" stopOpacity="0" />
            </linearGradient>
          </defs>
          <line x1="0" y1="200" x2="1440" y2="200" stroke="url(#lg1)" strokeWidth="1" />
          <line x1="0" y1="600" x2="1440" y2="600" stroke="url(#lg1)" strokeWidth=".6" />
          <polygon points="72,60 88,80 72,100 56,80" fill="none" stroke="#C5A059" strokeWidth=".7" opacity=".35" />
          <polygon points="1368,400 1384,420 1368,440 1352,420" fill="none" stroke="#C5A059" strokeWidth=".5" opacity=".25" />
        </svg>

        <div style={{ maxWidth: 900, textAlign: "center", position: "relative", zIndex: 2, animation: "fadeUp .9s ease both" }}>
          <div className="mono" style={{ fontSize: "10px", letterSpacing: "4px", color: "var(--gold)", marginBottom: "1.8rem", display: "flex", alignItems: "center", justifyContent: "center", gap: "1rem" }}>
            <span style={{ display: "inline-block", width: 30, height: 1, background: "var(--gold-dim)" }} />
            EST. 2014 · USA · UK · UAE
            <span style={{ display: "inline-block", width: 30, height: 1, background: "var(--gold-dim)" }} />
          </div>
          <h1 className="serif" style={{ fontSize: "clamp(2.8rem, 7.5vw, 6.5rem)", fontWeight: 700, lineHeight: 1.06, letterSpacing: "-.02em", marginBottom: "2rem" }}>
            Architecting Market Dominance<br />
            <em className="shimmer-text" style={{ fontStyle: "italic" }}>for the Best in the World.</em>
          </h1>
          <p style={{ fontSize: "clamp(.9rem, 1.8vw, 1.1rem)", color: "rgba(247,247,247,.6)", maxWidth: 620, margin: "0 auto 3rem", lineHeight: 1.75, fontWeight: 300 }}>
            We don't manage budgets. We deploy capital. Sun Arabia is the strategic revenue partner for B2B enterprises that demand a seat at the head of the table.
          </p>
          <div style={{ display: "flex", gap: "1rem", justifyContent: "center", flexWrap: "wrap", marginBottom: "5rem" }}>
            <button className="btn-gold" onClick={() => scrollTo("contact")}>Book the $5,000 Clarity Workshop</button>
            <button className="btn-outline-gold" onClick={() => scrollTo("about")}>Explore Our Work</button>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: "1px", background: "rgba(197,160,89,.15)", border: "1px solid rgba(197,160,89,.15)", maxWidth: 820, margin: "0 auto" }}>
            {STATS.map((s, i) => (
              <div key={i} className="stat-card" onMouseEnter={() => setActiveHover(i)} onMouseLeave={() => setActiveHover(null)} style={{ background: activeHover === i ? s.bgGradient : "#1A1A1B", padding: "2.5rem 1.5rem", transition: "background .4s ease" }}>
                <div className="stat-main">
                  <div className="serif shimmer-text" style={{ fontSize: "clamp(2.2rem,4vw,3.2rem)", fontWeight: 700, lineHeight: 1, display: activeHover === i ? "none" : "block" }}>{s.num}</div>
                  <div className="mono" style={{ fontSize: "10px", letterSpacing: "3px", color: "var(--gold)", textTransform: "uppercase", marginTop: ".5rem", display: activeHover === i ? "none" : "block" }}>{s.label}</div>
                  <div style={{ fontSize: ".78rem", color: "rgba(247,247,247,.4)", marginTop: ".3rem", display: activeHover === i ? "none" : "block" }}>{s.sub}</div>
                </div>
                <div className="stat-reveal" style={{ background: s.bgGradient, opacity: activeHover === i ? 1 : 0, display: "flex" }}>
                  <div style={{ fontSize: "2rem" }}>{s.icon}</div>
                  <div className="serif" style={{ fontSize: "1.3rem", fontStyle: "italic", color: "var(--gold-light)", lineHeight: 1.4, textAlign: "center" }}>{s.reveal}</div>
                  <div className="serif shimmer-text" style={{ fontSize: "2.4rem", fontWeight: 700 }}>{s.num}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <GoldLine />

      <section style={{ padding: "9rem 6vw", background: "linear-gradient(180deg, #1A1A1B 0%, #0d0d0e 50%, #1A1A1B 100%)", position: "relative", overflow: "hidden" }}>
        <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 15% 50%, rgba(197,160,89,.05) 0%, transparent 45%), radial-gradient(circle at 85% 50%, rgba(197,160,89,.04) 0%, transparent 45%)", pointerEvents: "none" }} />
        <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
          <RevealBlock>
            <div style={{ textAlign: "center", marginBottom: "5.5rem" }}>
              <div className="mono" style={{ fontSize: "10px", letterSpacing: "4px", color: "var(--gold)", marginBottom: "1.2rem" }}>Client Voices</div>
              <h2 className="serif" style={{ fontSize: "clamp(1.8rem,4vw,3.2rem)", fontWeight: 700, lineHeight: 1.1 }}>
                Results That <em style={{ fontStyle: "italic", color: "var(--gold-light)" }}>Speak for Themselves.</em>
              </h2>
              <p style={{ color: "rgba(247,247,247,.38)", marginTop: ".9rem", fontSize: ".88rem", maxWidth: 460, margin: ".9rem auto 0", fontWeight: 300, lineHeight: 1.7 }}>
                Trusted by visionary leaders across three of the world's most competitive markets.
              </p>
            </div>
          </RevealBlock>

          <div className="two-col" style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "1.6rem" }}>
            {TESTIMONIALS.map((t, i) => (
              <RevealBlock key={i} delay={i * 110}>
                <div className="tcard" onMouseEnter={() => setActiveTestimonial(i)} onMouseLeave={() => setActiveTestimonial(null)} style={{ padding: 0, overflow: "hidden" }}>
                  <div className="tcard-top-line" />
                  {/* Large photo banner */}
                  <div style={{ position: "relative", width: "100%", height: 340, overflow: "hidden", background: "#111" }}>
                    <img
                      src={t.img}
                      alt={t.name}
                      style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "center top", display: "block", transition: "transform .5s ease", transform: activeTestimonial === i ? "scale(1.04)" : "scale(1)" }}
                    />
                    {/* Gold gradient overlay at bottom */}
                    <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to bottom, transparent 40%, rgba(10,10,11,0.85) 100%)" }} />
                    {/* Market badge */}
                    <div style={{ position: "absolute", top: 14, right: 14 }}>
                      <div className="mono" style={{ fontSize: "8px", letterSpacing: "2px", color: activeTestimonial === i ? "var(--gold)" : "rgba(197,160,89,.8)", border: `1px solid ${activeTestimonial === i ? "rgba(197,160,89,.55)" : "rgba(197,160,89,.25)"}`, padding: "5px 12px", background: "rgba(10,10,11,0.7)", backdropFilter: "blur(6px)", transition: "all .3s" }}>{t.market}</div>
                    </div>
                    {/* Name overlay at bottom of image */}
                    <div style={{ position: "absolute", bottom: 16, left: 20, right: 20 }}>
                      <div className="mono" style={{ fontSize: "11px", letterSpacing: "2px", color: "var(--gold-light)", textTransform: "uppercase", fontWeight: 500 }}>{t.name}</div>
                      <div style={{ fontSize: ".74rem", color: "rgba(247,247,247,.6)", marginTop: ".2rem", fontWeight: 300 }}>{t.role}</div>
                    </div>
                  </div>
                  {/* Quote body */}
                  <div style={{ padding: "1.8rem 2.2rem 2rem", position: "relative" }}>
                    <div className="tcard-qmark">"</div>
                    <div style={{ display: "flex", gap: ".4rem", marginBottom: "1rem", position: "relative", zIndex: 1 }}>
                      {[...Array(5)].map((_, si) => (
                        <span key={si} style={{ color: "var(--gold)", fontSize: ".72rem", opacity: activeTestimonial === i ? 1 : 0.5, transition: `opacity .25s ${si * 40}ms ease` }}>★</span>
                      ))}
                    </div>
                    <p className="serif" style={{ fontSize: "clamp(.95rem,1.7vw,1.05rem)", fontStyle: "italic", color: "rgba(247,247,247,.83)", lineHeight: 1.85, position: "relative", zIndex: 1 }}>
                      {t.quote}
                    </p>
                  </div>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      <GoldLine />

      <section id="about" style={{ padding: "8rem 6vw", background: "#1A1A1B" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "6rem", alignItems: "center" }}>
          <RevealBlock>
            <div className="mono" style={{ fontSize: "10px", letterSpacing: "4px", color: "var(--gold)", marginBottom: "1.2rem" }}>Our Philosophy</div>
            <h2 className="serif" style={{ fontSize: "clamp(2rem,4vw,3.4rem)", fontWeight: 700, lineHeight: 1.1, marginBottom: "2rem" }}>
              The Antithesis of the<br /><em style={{ fontStyle: "italic", color: "var(--gold-light)" }}>Traditional Agency.</em>
            </h2>
            <p style={{ color: "rgba(247,247,247,.65)", lineHeight: 1.9, fontSize: ".95rem", marginBottom: "1.2rem", fontWeight: 300 }}>
              Sun Arabia operates at the intersection of <strong style={{ color: "var(--gold-light)", fontWeight: 500 }}>Institutional-Grade Strategy</strong> and High-End Brand Sovereignty. Having navigated the world's most competitive landscapes for over a decade, we understand that true growth is not found in vanity metrics, but in the compounding value of Customer Lifetime Loyalty.
            </p>
            <p style={{ color: "rgba(247,247,247,.65)", lineHeight: 1.9, fontSize: ".95rem", marginBottom: "1.2rem", fontWeight: 300 }}>
              We are a high-conviction partner for B2B enterprises that prioritize revenue over "reach." We serve a global portfolio of visionaries who demand more than just deliverables — they demand <strong style={{ color: "var(--gold-light)", fontWeight: 500 }}>a seat at the head of the table.</strong>
            </p>
            <p style={{ color: "rgba(247,247,247,.65)", lineHeight: 1.9, fontSize: ".95rem", fontWeight: 300 }}>
              We don't manage budgets; we deploy capital to ensure your brand doesn't just participate in the market, <strong style={{ color: "var(--gold-light)", fontWeight: 500 }}>but dictates it.</strong>
            </p>
          </RevealBlock>
          <RevealBlock delay={200}>
            <div style={{ position: "relative" }}>
              <div style={{ border: "1px solid rgba(197,160,89,.25)", padding: "3rem 2.5rem", background: "linear-gradient(145deg, rgba(197,160,89,.04), rgba(197,160,89,.02))", position: "relative" }}>
                <div style={{ position: "absolute", top: -1, left: "10%", right: "10%", height: 2, background: "linear-gradient(90deg, transparent, var(--gold), transparent)" }} />
                <div className="serif" style={{ fontSize: "clamp(1.2rem,2.5vw,1.6rem)", fontStyle: "italic", color: "var(--gold-light)", lineHeight: 1.6, marginBottom: "2rem", textAlign: "center" }}>
                  "Growth is not a campaign. It is a culture — compounded, daily, deliberately."
                </div>
                <div className="mono" style={{ fontSize: "9px", letterSpacing: "3px", color: "var(--flint)", textAlign: "center", textTransform: "uppercase" }}>— Sun Arabia Operating Principle</div>
                <div style={{ marginTop: "2.5rem", display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                  {["50M+ Engagements", "10+ Years", "3 Markets", "98% Retention"].map(m => (
                    <div key={m} style={{ border: "1px solid rgba(197,160,89,.15)", padding: "1rem", textAlign: "center" }}>
                      <div className="serif" style={{ fontSize: "1rem", color: "var(--gold)", fontWeight: 600 }}>{m.split(" ")[0]}</div>
                      <div style={{ fontSize: ".72rem", color: "var(--flint)", marginTop: ".2rem" }}>{m.split(" ").slice(1).join(" ")}</div>
                    </div>
                  ))}
                </div>
              </div>
              <div style={{ position: "absolute", top: 10, left: 10, right: -10, bottom: -10, border: "1px solid rgba(197,160,89,.1)", pointerEvents: "none", zIndex: -1 }} />
            </div>
          </RevealBlock>
        </div>
      </section>

      <section style={{ padding: "8rem 6vw", background: "linear-gradient(180deg, #111213, #1A1A1B)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <RevealBlock>
            <div style={{ textAlign: "center", marginBottom: "5rem" }}>
              <div className="mono" style={{ fontSize: "10px", letterSpacing: "4px", color: "var(--gold)", marginBottom: "1.2rem" }}>Global Architecture</div>
              <h2 className="serif" style={{ fontSize: "clamp(1.8rem,4vw,3.2rem)", fontWeight: 700, lineHeight: 1.1 }}>
                Three Power Hubs.<br /><em style={{ fontStyle: "italic", color: "var(--gold-light)" }}>One Seamless Growth Engine.</em>
              </h2>
            </div>
          </RevealBlock>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1px", background: "rgba(197,160,89,.12)" }}>
            {[
              { flag: "🇺🇸🇬🇧", label: "The Western Perspective", sub: "USA / UK", desc: "We leverage high-velocity demand generation and aggressive scale-up tactics — turning market noise into qualified pipeline with relentless precision." },
              { flag: "🇦🇪", label: "The Eastern Ambition", sub: "UAE / MENA", desc: "We tap into the luxury-tier relationship building and rapid infrastructure growth of the MENA region — where trust is currency and positioning is everything." },
              { flag: "⚡", label: "The Synthesis", sub: "Sun Arabia Bridge", desc: "We act as your strategic bridge, allowing your brand to maintain a unified voice while executing localized dominance in the world's three most influential markets." },
            ].map((h, i) => (
              <RevealBlock key={i} delay={i * 120}>
                <div style={{ background: "#1A1A1B", padding: "3rem 2rem", borderTop: "2px solid var(--gold)", position: "relative" }}>
                  <div style={{ fontSize: "1.8rem", marginBottom: "1.2rem" }}>{h.flag}</div>
                  <div className="mono" style={{ fontSize: "9px", letterSpacing: "3px", color: "var(--gold)", marginBottom: ".5rem", textTransform: "uppercase" }}>{h.sub}</div>
                  <h3 className="serif" style={{ fontSize: "1.4rem", fontWeight: 600, marginBottom: "1rem", color: "var(--gold-light)" }}>{h.label}</h3>
                  <p style={{ fontSize: ".88rem", color: "rgba(247,247,247,.6)", lineHeight: 1.75, fontWeight: 300 }}>{h.desc}</p>
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      <section style={{ padding: "8rem 6vw", background: "#1A1A1B" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <RevealBlock>
            <div style={{ textAlign: "center", marginBottom: "4rem" }}>
              <div className="mono" style={{ fontSize: "10px", letterSpacing: "4px", color: "var(--gold)", marginBottom: "1.2rem" }}>The Anti-Agency Logic</div>
              <h2 className="serif" style={{ fontSize: "clamp(1.8rem,4vw,3rem)", fontWeight: 700, lineHeight: 1.1 }}>
                We Are <em style={{ fontStyle: "italic", color: "var(--gold-light)" }}>Categorically Different.</em>
              </h2>
            </div>
          </RevealBlock>
          <RevealBlock delay={150}>
            <div style={{ border: "1px solid rgba(197,160,89,.2)", overflow: "hidden" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", background: "rgba(197,160,89,.06)" }}>
                <div style={{ padding: "1.2rem 2rem", borderRight: "1px solid rgba(197,160,89,.15)" }}>
                  <div className="mono" style={{ fontSize: "10px", letterSpacing: "3px", color: "var(--flint)", textTransform: "uppercase" }}>Traditional Agencies</div>
                </div>
                <div style={{ padding: "1.2rem 2rem" }}>
                  <div className="mono" style={{ fontSize: "10px", letterSpacing: "3px", color: "var(--gold)", textTransform: "uppercase" }}>Sun Arabia Marketing Agency</div>
                </div>
              </div>
              {TABLE.map(([left, right], i) => (
                <div key={i} style={{ display: "grid", gridTemplateColumns: "1fr 1fr", borderTop: "1px solid rgba(197,160,89,.1)" }}>
                  <div style={{ padding: "1.3rem 2rem", borderRight: "1px solid rgba(197,160,89,.1)", display: "flex", alignItems: "center", gap: ".8rem" }}>
                    <span style={{ color: "#4A4E51", fontSize: ".85rem" }}>✕</span>
                    <span style={{ color: "rgba(247,247,247,.45)", fontSize: ".88rem", fontWeight: 300 }}>{left}</span>
                  </div>
                  <div style={{ padding: "1.3rem 2rem", display: "flex", alignItems: "center", gap: ".8rem" }}>
                    <span style={{ color: "var(--gold)", fontSize: ".85rem" }}>◆</span>
                    <span style={{ color: "var(--gold-light)", fontSize: ".88rem", fontWeight: 400 }}>{right}</span>
                  </div>
                </div>
              ))}
            </div>
          </RevealBlock>
        </div>
      </section>

      <section style={{ padding: "8rem 6vw", background: "linear-gradient(180deg, #111213, #1A1A1B)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <RevealBlock>
            <div style={{ textAlign: "center", marginBottom: "5rem" }}>
              <div className="mono" style={{ fontSize: "10px", letterSpacing: "4px", color: "var(--gold)", marginBottom: "1.2rem" }}>Proprietary Process</div>
              <h2 className="serif" style={{ fontSize: "clamp(1.8rem,4vw,3.2rem)", fontWeight: 700, lineHeight: 1.1 }}>
                The <em style={{ fontStyle: "italic", color: "var(--gold-light)" }}>Solar Cycle</em>
              </h2>
              <p style={{ color: "rgba(247,247,247,.45)", fontSize: ".88rem", maxWidth: 520, margin: ".8rem auto 0" }}>
                A four-phase proprietary framework engineered for compounding revenue growth.
              </p>
            </div>
          </RevealBlock>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "1px", background: "rgba(197,160,89,.12)" }}>
            {CYCLE.map((c, i) => (
              <RevealBlock key={i} delay={i * 100}>
                <div className="process-step" style={{ background: "#1A1A1B", padding: "3rem 1.8rem", position: "relative" }}>
                  <div className="serif" style={{ fontSize: "4rem", color: "rgba(197,160,89,.07)", fontWeight: 700, lineHeight: 1, marginBottom: ".5rem" }}>{c.step}</div>
                  <div style={{ fontSize: "1.8rem", marginBottom: "1rem", color: "var(--gold)" }}><c.Icon /></div>
                  <div className="mono" style={{ fontSize: "9px", letterSpacing: "3px", color: "var(--gold)", textTransform: "uppercase", marginBottom: ".5rem" }}>Phase {c.step}</div>
                  <h3 className="serif" style={{ fontSize: "1.4rem", fontWeight: 600, color: "var(--gold-light)", marginBottom: "1rem" }}>{c.title}</h3>
                  <p style={{ fontSize: ".85rem", color: "rgba(247,247,247,.55)", lineHeight: 1.75, fontWeight: 300 }}>{c.desc}</p>
                  {i < 3 && <div style={{ position: "absolute", top: "50%", right: -1, width: 1, height: "50%", background: "linear-gradient(180deg, transparent, var(--gold-dim), transparent)", transform: "translateY(-50%)" }} />}
                </div>
              </RevealBlock>
            ))}
          </div>
        </div>
      </section>

      <section id="pricing" style={{ padding: "8rem 6vw", background: "#1A1A1B" }}>
        <div style={{ maxWidth: 900, margin: "0 auto" }}>
          <RevealBlock>
            <div style={{ textAlign: "center", marginBottom: "3rem" }}>
              <div className="mono" style={{ fontSize: "10px", letterSpacing: "4px", color: "var(--gold)", marginBottom: "1.2rem" }}>Paid Diagnostic</div>
              <h2 className="serif" style={{ fontSize: "clamp(1.8rem,4vw,3.2rem)", fontWeight: 700, lineHeight: 1.1, marginBottom: "1.5rem" }}>
                The <em style={{ fontStyle: "italic" }} className="shimmer-text">$5,000 Clarity Workshop</em>
              </h2>
            </div>
          </RevealBlock>
          <RevealBlock delay={150}>
            <div style={{ position: "relative", border: "1px solid rgba(197,160,89,.3)", padding: "4rem 3rem", background: "linear-gradient(145deg, rgba(197,160,89,.04), transparent)" }}>
              <div style={{ position: "absolute", top: 0, left: "15%", right: "15%", height: 1, background: "linear-gradient(90deg, transparent, var(--gold), transparent)" }} />
              <div style={{ position: "absolute", top: -12, left: "50%", transform: "translateX(-50%)", background: "#1A1A1B", padding: "0 1.2rem" }}>
                <span style={{ color: "var(--gold)", fontSize: "1rem" }}>◆</span>
              </div>
              <p className="serif" style={{ fontSize: "clamp(1.1rem,2.2vw,1.4rem)", color: "rgba(247,247,247,.85)", lineHeight: 1.8, textAlign: "center", fontStyle: "italic", marginBottom: "2.5rem" }}>
                "Stop guessing. Start executing. Our Paid Strategy & Audit is a deep-tissue diagnostic of your Website, Social, and Revenue Architecture. We provide the roadmap; you decide if we are the ones to drive it. <strong style={{ color: "var(--gold-light)", fontStyle: "normal" }}>No long-term contracts. Just pure ROI.</strong>"
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: "1.5rem", marginBottom: "3rem" }}>
                {["Website Audit", "Social Audit", "Revenue Architecture"].map((item, i) => (
                  <div key={i} style={{ border: "1px solid rgba(197,160,89,.15)", padding: "1.2rem", textAlign: "center" }}>
                    <div style={{ color: "var(--gold)", marginBottom: ".4rem" }}>◆</div>
                    <div className="mono" style={{ fontSize: "10px", letterSpacing: "2px", color: "rgba(247,247,247,.6)", textTransform: "uppercase" }}>{item}</div>
                  </div>
                ))}
              </div>
              <div style={{ textAlign: "center" }}>
                <button className="btn-gold" onClick={() => scrollTo("contact")} style={{ fontSize: "11px", letterSpacing: "3px" }}>Book the $5,000 Clarity Workshop →</button>
                <p style={{ marginTop: "1rem", fontSize: ".78rem", color: "var(--flint)" }}>No long-term commitment. Fully refundable within 48h if not satisfied.</p>
              </div>
            </div>
          </RevealBlock>
        </div>
      </section>

      <section id="contact" style={{ padding: "8rem 6vw", background: "linear-gradient(180deg, #111213, #0D0D0E)" }}>
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <RevealBlock>
            <div style={{ textAlign: "center", marginBottom: "4rem" }}>
              <div className="mono" style={{ fontSize: "10px", letterSpacing: "4px", color: "var(--gold)", marginBottom: "1.2rem" }}>Begin the Conversation</div>
              <h2 className="serif" style={{ fontSize: "clamp(1.8rem,4vw,3rem)", fontWeight: 700, lineHeight: 1.1, marginBottom: "1rem" }}>
                Ready to <em style={{ fontStyle: "italic", color: "var(--gold-light)" }}>Dictate Your Market?</em>
              </h2>
              <p style={{ color: "rgba(247,247,247,.5)", fontSize: ".9rem", fontWeight: 300 }}>Share a few details. We'll respond within 24 hours.</p>
            </div>
          </RevealBlock>
          {submitted ? (
            <RevealBlock>
              <div style={{ textAlign: "center", border: "1px solid rgba(197,160,89,.3)", padding: "4rem", background: "rgba(197,160,89,.04)" }}>
                <div style={{ fontSize: "2rem", marginBottom: "1rem" }}>◆</div>
                <div className="serif" style={{ fontSize: "1.8rem", color: "var(--gold-light)", fontStyle: "italic", marginBottom: "1rem" }}>Message Received.</div>
                <p style={{ color: "rgba(247,247,247,.55)", fontSize: ".9rem" }}>Our team will reach out within 24 hours. Prepare for results.</p>
              </div>
            </RevealBlock>
          ) : (
            <RevealBlock delay={150}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem" }}>
                {[
                  { label: "Full Name", key: "name", type: "text", placeholder: "Khalid Al Mansouri", col: 1 },
                  { label: "Email Address", key: "email", type: "email", placeholder: "you@company.com", col: 1 },
                  { label: "Company / Brand", key: "company", type: "text", placeholder: "Your Company Name", col: 2 },
                ].map(f => (
                  <div key={f.key} style={{ gridColumn: f.col === 2 ? "1 / -1" : "auto" }}>
                    <label className="mono" style={{ display: "block", fontSize: "9px", letterSpacing: "3px", color: "var(--gold)", textTransform: "uppercase", marginBottom: ".5rem" }}>{f.label}</label>
                    <input
                      type={f.type}
                      placeholder={f.placeholder}
                      value={formState[f.key]}
                      onChange={e => setFormState(s => ({ ...s, [f.key]: e.target.value }))}
                      style={{ width: "100%", background: "rgba(247,247,247,.04)", border: "1px solid rgba(197,160,89,.2)", padding: "14px 16px", color: "#F7F7F7", fontSize: ".88rem", fontFamily: "'Inter', sans-serif", transition: "border-color .25s" }}
                      onFocus={e => e.target.style.borderColor = "var(--gold)"}
                      onBlur={e => e.target.style.borderColor = "rgba(197,160,89,.2)"}
                    />
                  </div>
                ))}
                <div style={{ gridColumn: "1 / -1" }}>
                  <label className="mono" style={{ display: "block", fontSize: "9px", letterSpacing: "3px", color: "var(--gold)", textTransform: "uppercase", marginBottom: ".5rem" }}>Your Goals</label>
                  <textarea
                    rows={5}
                    placeholder="Describe your business objectives and what you feel is holding your growth back..."
                    value={formState.msg}
                    onChange={e => setFormState(s => ({ ...s, msg: e.target.value }))}
                    style={{ width: "100%", background: "rgba(247,247,247,.04)", border: "1px solid rgba(197,160,89,.2)", padding: "14px 16px", color: "#F7F7F7", fontSize: ".88rem", fontFamily: "'Inter', sans-serif", resize: "vertical", transition: "border-color .25s" }}
                    onFocus={e => e.target.style.borderColor = "var(--gold)"}
                    onBlur={e => e.target.style.borderColor = "rgba(197,160,89,.2)"}
                  />
                </div>
                <div style={{ gridColumn: "1 / -1" }}>
                  <button className="btn-gold" style={{ width: "100%", fontSize: "11px", letterSpacing: "3px" }} onClick={() => { if (formState.name && formState.email) setSubmitted(true); }}>
                    Get a Consultation ◆
                  </button>
                </div>
              </div>
            </RevealBlock>
          )}
        </div>
      </section>

      <footer style={{ borderTop: "1px solid rgba(197,160,89,.12)", padding: "3rem 6vw", display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1.5rem", background: "#0D0D0E" }}>
        <img src={logoSrc} alt="Sun Arabia" style={{ height: 36, objectFit: "contain" }} />
        <div style={{ display: "flex", gap: "2rem", flexWrap: "wrap" }}>
          {["about", "pricing", "contact"].map(id => (
            <span key={id} className="nav-link" onClick={() => scrollTo(id)} style={{ fontSize: "10px" }}>
              {id === "about" ? "About" : id.charAt(0).toUpperCase() + id.slice(1)}
            </span>
          ))}
        </div>
        <div className="mono" style={{ fontSize: "9px", color: "var(--flint)", letterSpacing: "2px" }}>
          © {new Date().getFullYear()} SUN ARABIA MARKETING AGENCY
        </div>
      </footer>
    </div>
  );
}