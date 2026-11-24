import { useEffect, useRef, useState } from "react";
import jamesPhoto from "../assets/a1.jpg";
import janPhoto from "../assets/a2.jpg";
import charliePhoto from "../assets/a3.jpg";
import mattPhoto from "../assets/a4.jpg";
import stevePhoto from "../assets/a5.jpg";

const testimonials = [
  {
    quote:
      "We run an investment and seed-funding company in California. The team from the Philippines has assisted us, and I'm extremely happy with their work and quickness.",
    name: "James T.",
    role: "Venture Capitalist",
    market: "UAE",
    img: jamesPhoto,
  },
  {
    quote:
      "Sun Arabia has helped us with our targets in MENA. I would recommend their services with full confidence.",
    name: "G. Jan. W.",
    role: "Pharmaceutical Director",
    market: "UK",
    img: janPhoto,
  },
  {
    quote:
      "Working with Carlo and the team has been great. Everything on time, completed to a high standard. Good communication and knowledge to meet all business needs.",
    name: "Charlie M",
    role: "Lotu Education",
    market: "USA",
    img: charliePhoto,
  },
  {
    quote:
      "I enjoyed working with them on one of my start ups. It was very fun.",
    name: "Matt. K.M",
    role: "UK and UAE Real Estate Developer",
    market: "UAE / USA",
    img: mattPhoto,
  },
  {
    quote:
      "Sun Arabia brought clarity, commercial focus, and the kind of execution that turns strategy into measurable growth. The process was sharp, fast, and highly effective.",
    name: "Steve M.",
    role: "CEO of Xcite Entertainment",
    market: "USA",
    img: stevePhoto,
  },
];
const phases = [
  {
    title: "Diagnostic",
    desc: "Identifying revenue leaks in your current funnel — from traffic sources to conversion points — with forensic precision.",
  },
  {
    title: "Architecture",
    desc: "Building a high-conversion digital flagship. Every page, every touchpoint, every message engineered to close.",
  },
  {
    title: "Deployment",
    desc: "Omnichannel promotion across global markets — paid, organic, earned, and owned — in perfect strategic alignment.",
  },
  {
    title: "Optimization",
    desc: "Continuous data-looping to increase Customer Lifetime Loyalty. We compound your growth every single month.",
  },
];
const differences = [
  ["Long-Term Contract Traps", "Performance-Based Retention"],
  ["Focus on “Impressions”", "Focus on Pipeline Velocity"],
  ["Generalist Staff", "Senior-Level Revenue Architects"],
  ["Opaque Reporting", "Real-Time Data Transparency"],
];
const markets = [
  {
    region: "USA / UK",
    title: "The Western Perspective",
    desc: "We leverage high-velocity demand generation and aggressive scale-up tactics — turning market noise into qualified pipeline with relentless precision.",
  },
  {
    region: "UAE / MENA",
    title: "The Eastern Ambition",
    desc: "We tap into the luxury-tier relationship building and rapid infrastructure growth of the MENA region — where trust is currency and positioning is everything.",
  },
  {
    region: "Sun Arabia Bridge",
    title: "The Synthesis",
    desc: "We act as your strategic bridge, allowing your brand to maintain a unified voice while executing localized dominance in the world's three most influential markets.",
  },
];
const templateCategories = [
  "Retail & E-commerce",
  "Food & Hospitality",
  "Health & Wellness",
  "Professional Services",
  "Real Estate & Construction",
  "Education & Training",
  "Travel, Logistics & Auto",
  "Events & Community",
  "Home & Local Services",
];
const templates = [
  {
    name: "Online Store",
    category: "Retail & E-commerce",
    layout: "shop",
    solves: "Sell products around the clock without giving a marketplace a cut of every order.",
    features: ["Product catalogue & cart", "Secure checkout", "Inventory & order tracking"],
  },
  {
    name: "B2B Wholesale Portal",
    category: "Retail & E-commerce",
    layout: "dashboard",
    solves: "Replaces phone, email and spreadsheet orders from trade customers.",
    features: ["Tiered customer pricing", "Bulk reorder lists", "Invoices & credit terms"],
  },
  {
    name: "Grocery & Local Delivery",
    category: "Retail & E-commerce",
    layout: "shop",
    solves: "Takes neighbourhood orders online and schedules every delivery slot.",
    features: ["Delivery slot booking", "Substitution preferences", "Driver dispatch board"],
  },
  {
    name: "Pharmacy",
    category: "Retail & E-commerce",
    layout: "shop",
    solves: "Moves prescription refills and stock questions off the phone line.",
    features: ["Refill requests", "Click & collect", "Live stock lookup"],
  },
  {
    name: "Restaurant & Ordering",
    category: "Food & Hospitality",
    layout: "menu",
    solves: "Captures direct orders and table bookings without commission-heavy apps.",
    features: ["Online menu & ordering", "Table reservations", "Kitchen order screen"],
  },
  {
    name: "Hotel & Resort",
    category: "Food & Hospitality",
    layout: "booking",
    solves: "Drives direct bookings instead of paying travel-site commissions.",
    features: ["Room availability calendar", "Rates & packages", "Guest pre-arrival forms"],
  },
  {
    name: "Café Loyalty & Pre-order",
    category: "Food & Hospitality",
    layout: "menu",
    solves: "Turns one-off walk-ins into regulars who order ahead.",
    features: ["Order-ahead pickup", "Digital stamp card", "SMS & email promotions"],
  },
  {
    name: "Catering Company",
    category: "Food & Hospitality",
    layout: "menu",
    solves: "Turns slow back-and-forth quoting into instant, bookable packages.",
    features: ["Package builder", "Instant quotes", "Deposit payments"],
  },
  {
    name: "Medical Clinic",
    category: "Health & Wellness",
    layout: "booking",
    solves: "Cuts no-shows and front-desk phone time.",
    features: ["Online appointments", "Patient intake forms", "Automated reminders"],
  },
  {
    name: "Dental Practice",
    category: "Health & Wellness",
    layout: "booking",
    solves: "Keeps the chair calendar full and recalls patients on time.",
    features: ["Treatment pages", "Recall reminders", "Insurance pre-check"],
  },
  {
    name: "Gym & Fitness Studio",
    category: "Health & Wellness",
    layout: "booking",
    solves: "Sells memberships and class spots without a front-desk queue.",
    features: ["Class timetable & booking", "Recurring memberships", "Member portal"],
  },
  {
    name: "Salon & Spa",
    category: "Health & Wellness",
    layout: "booking",
    solves: "Lets clients book their stylist or therapist at any hour.",
    features: ["Staff-based scheduling", "No-show deposits", "Gift vouchers"],
  },
  {
    name: "Veterinary & Pet Care",
    category: "Health & Wellness",
    layout: "booking",
    solves: "Organises appointments, records and boarding in one place.",
    features: ["Appointment booking", "Pet health records", "Boarding reservations"],
  },
  {
    name: "Law Firm",
    category: "Professional Services",
    layout: "portal",
    solves: "Qualifies enquiries and shares case documents securely.",
    features: ["Practice-area pages", "Client intake & conflict check", "Secure document portal"],
  },
  {
    name: "Accounting & Tax",
    category: "Professional Services",
    layout: "portal",
    solves: "Collects client documents without the email chaos at deadline time.",
    features: ["Upload checklists", "E-signed engagement letters", "Deadline reminders"],
  },
  {
    name: "Consulting & Agency",
    category: "Professional Services",
    layout: "editorial",
    solves: "Proves expertise and turns readers into booked discovery calls.",
    features: ["Case study library", "Calendar booking", "Lead-scoring CRM"],
  },
  {
    name: "Recruitment & Job Board",
    category: "Professional Services",
    layout: "listing",
    solves: "Matches candidates to open roles in one searchable place.",
    features: ["Job listings & filters", "Candidate applications", "Employer dashboard"],
  },
  {
    name: "Insurance Broker",
    category: "Professional Services",
    layout: "portal",
    solves: "Generates quotes online and routes warm leads to the right agent.",
    features: ["Multi-step quote forms", "Policy document portal", "Renewal reminders"],
  },
  {
    name: "Property Listings",
    category: "Real Estate & Construction",
    layout: "listing",
    solves: "Showcases properties and captures viewing requests automatically.",
    features: ["Map search & filters", "Viewing scheduler", "Agent lead routing"],
  },
  {
    name: "Property Management",
    category: "Real Estate & Construction",
    layout: "dashboard",
    solves: "Gives tenants and owners self-service instead of endless calls.",
    features: ["Online rent payments", "Maintenance requests", "Owner statements"],
  },
  {
    name: "Construction & Contractors",
    category: "Real Estate & Construction",
    layout: "editorial",
    solves: "Wins bids with a credible portfolio and structured quote requests.",
    features: ["Project portfolio", "Quote requests with uploads", "Client progress updates"],
  },
  {
    name: "Interior Design Studio",
    category: "Real Estate & Construction",
    layout: "editorial",
    solves: "Pre-qualifies clients by style and budget before the first call.",
    features: ["Visual portfolio", "Style & budget quiz", "Consultation booking"],
  },
  {
    name: "School & Admissions",
    category: "Education & Training",
    layout: "portal",
    solves: "Moves paper applications and parent updates online.",
    features: ["Online applications", "Parent portal", "Events calendar"],
  },
  {
    name: "Online Course Platform",
    category: "Education & Training",
    layout: "dashboard",
    solves: "Packages expertise into courses that sell while you sleep.",
    features: ["Course player", "Paid enrolments", "Progress & certificates"],
  },
  {
    name: "Tutoring & Coaching",
    category: "Education & Training",
    layout: "booking",
    solves: "Fills session calendars and sells packages, not single hours.",
    features: ["Tutor profiles", "Session packages", "Video session links"],
  },
  {
    name: "Training Centre",
    category: "Education & Training",
    layout: "listing",
    solves: "Handles group registrations and certificate checks for employers.",
    features: ["Course schedule", "Group registrations", "Certificate verification"],
  },
  {
    name: "Travel Agency & Tours",
    category: "Travel, Logistics & Auto",
    layout: "listing",
    solves: "Sells packages online and collects deposits up front.",
    features: ["Package catalogue", "Itinerary builder", "Deposit payments"],
  },
  {
    name: "Courier & Logistics",
    category: "Travel, Logistics & Auto",
    layout: "dashboard",
    solves: "Lets customers price, book and track shipments themselves.",
    features: ["Shipment tracking", "Rate calculator", "Business accounts"],
  },
  {
    name: "Car Rental",
    category: "Travel, Logistics & Auto",
    layout: "booking",
    solves: "Shows live fleet availability and verifies drivers before pickup.",
    features: ["Fleet availability", "Pickup & return scheduling", "Document verification"],
  },
  {
    name: "Auto Repair & Service",
    category: "Travel, Logistics & Auto",
    layout: "booking",
    solves: "Books service slots and gets repair quotes approved faster.",
    features: ["Service booking", "Vehicle history", "Online quote approval"],
  },
  {
    name: "Car Dealership",
    category: "Travel, Logistics & Auto",
    layout: "listing",
    solves: "Turns inventory browsers into booked test drives and finance leads.",
    features: ["Inventory search", "Finance calculator", "Test drive booking"],
  },
  {
    name: "Event Ticketing",
    category: "Events & Community",
    layout: "listing",
    solves: "Sells tickets directly and checks guests in at the door.",
    features: ["Ticket tiers", "QR check-in", "Attendee emails"],
  },
  {
    name: "Wedding & Event Planner",
    category: "Events & Community",
    layout: "editorial",
    solves: "Keeps couples, vendors and timelines aligned in one place.",
    features: ["Package pages", "Planning checklist portal", "Vendor coordination"],
  },
  {
    name: "Nonprofit & Charity",
    category: "Events & Community",
    layout: "editorial",
    solves: "Grows recurring donations and volunteer sign-ups.",
    features: ["Online donations", "Campaign progress", "Volunteer sign-ups"],
  },
  {
    name: "Membership Association",
    category: "Events & Community",
    layout: "portal",
    solves: "Automates dues renewals and gives members gated resources.",
    features: ["Member directory", "Dues renewals", "Members-only resources"],
  },
  {
    name: "Home Services",
    category: "Home & Local Services",
    layout: "booking",
    solves: "Cleaning, plumbing, HVAC: instant quotes and dispatched jobs.",
    features: ["Instant quote & booking", "Technician dispatch", "Service-area pages"],
  },
  {
    name: "Moving & Storage",
    category: "Home & Local Services",
    layout: "dashboard",
    solves: "Estimates moves online and rents storage units without paperwork.",
    features: ["Move estimate calculator", "Storage unit rental", "Crew scheduling"],
  },
  {
    name: "Landscaping & Outdoor",
    category: "Home & Local Services",
    layout: "editorial",
    solves: "Converts seasonal demand into recurring maintenance contracts.",
    features: ["Before & after gallery", "Site visit booking", "Recurring service plans"],
  },
];
const TEMPLATE_PREVIEW_COUNT = 9;
const previewCells = {
  shop: 6,
  booking: 21,
  dashboard: 6,
  listing: 3,
  menu: 6,
  portal: 3,
  editorial: 3,
};
const fields = [
  {
    key: "name",
    label: "Full name",
    type: "text",
    autoComplete: "name",
    placeholder: "Your full name",
    required: true,
  },
  {
    key: "email",
    label: "Email address",
    type: "email",
    autoComplete: "email",
    placeholder: "you@company.com",
    required: true,
  },
  {
    key: "company",
    label: "Company / brand",
    type: "text",
    autoComplete: "organization",
    placeholder: "Your company name",
  },
];
function Arrow({ diagonal = false }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden="true"
    >
      <path d={diagonal ? "M6 18 18 6M6 6h12v12" : "M4 12h15m-6-6 6 6-6 6"} />
    </svg>
  );
}
function SunMark() {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      aria-hidden="true"
    >
      <circle cx="24" cy="24" r="10" />
      <circle
        cx="24"
        cy="24"
        r="18"
        strokeDasharray="1 6"
        strokeLinecap="round"
      />
      <path d="M24 0v8m0 32v8M0 24h8m32 0h8M7 7l6 6m22 22 6 6M7 41l6-6m22-22 6-6" />
    </svg>
  );
}
function Brand() {
  return (
    <a className="brand" href="#hero" aria-label="Sun Arabia home">
      <SunMark />
      <span>
        SUN ARABIA<small>MARKETING AGENCY</small>
      </span>
    </a>
  );
}
function Portrait({ client }) {
  return (
    <div className="client">
      <img src={client.img} alt="" width="48" height="48" loading="lazy" />
      <div>
        <strong>{client.name}</strong>
        <span>{client.role}</span>
      </div>
      <span className="client-market">{client.market}</span>
    </div>
  );
}

function TemplatePreview({ layout }) {
  return (
    <div className={`template-preview tp-${layout}`} aria-hidden="true">
      <div className="tp-chrome">
        <i />
        <i />
        <i />
      </div>
      <div className="tp-nav">
        <b />
        <span />
        <span />
        <span />
      </div>
      <div className="tp-hero">
        <b />
        <span />
      </div>
      <div className="tp-grid">
        {Array.from({ length: previewCells[layout] }, (_, i) => (
          <span key={i} />
        ))}
      </div>
    </div>
  );
}

function MarketBridge() {
  return (
    <div
      className="market-bridge"
      role="img"
      aria-label="Sun Arabia connects the USA and UK with the UAE and MENA markets"
    >
      <svg viewBox="0 0 1000 220" fill="none" aria-hidden="true">
        <path
          className="bridge-track"
          d="M130 90C300 90 330 170 500 170S700 90 870 90"
        />
        <path
          className="bridge-track bridge-track-secondary"
          d="M130 90C300 90 330 30 500 30S700 90 870 90"
        />
        <path
          className="bridge-connection"
          d="M130 90C300 90 330 170 500 170S700 90 870 90"
        />
        <circle cx="130" cy="90" r="6" />
        <circle cx="870" cy="90" r="6" />
        <path d="m487 162 13 8-13 8m26-156-13 8 13 8" />
      </svg>
      <span className="bridge-label bridge-west">USA / UK</span>
      <span className="bridge-brand">
        <SunMark />
        <span>Sun Arabia</span>
      </span>
      <span className="bridge-label bridge-east">UAE / MENA</span>
      <span className="bridge-caption">
        A global perspective. A unified voice.
      </span>
    </div>
  );
}

export default function LandingPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activePhase, setActivePhase] = useState(0);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );
  const [motionPaused, setMotionPaused] = useState(false);
  const motionDisabled = motionPaused || prefersReducedMotion;
  const pageRef = useRef(null);
  const [formState, setFormState] = useState({
    name: "",
    email: "",
    company: "",
    msg: "",
  });
  const [reviewing, setReviewing] = useState(false);
  const [templateFilter, setTemplateFilter] = useState("All");
  const [showAllTemplates, setShowAllTemplates] = useState(false);
  const filteredTemplates =
    templateFilter === "All"
      ? templates
      : templates.filter((template) => template.category === templateFilter);
  const visibleTemplates =
    showAllTemplates || templateFilter !== "All"
      ? filteredTemplates
      : filteredTemplates.slice(0, TEMPLATE_PREVIEW_COUNT);
  const requestTemplate = (template) => {
    setReviewing(false);
    setFormState((current) => ({
      ...current,
      msg: `I'm interested in the ${template.name} website template.`,
    }));
  };
  const menuButton = useRef(null);
  const firstMenuLink = useRef(null);
  const reviewHeading = useRef(null);
  useEffect(() => {
    const page = pageRef.current;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const onPreference = (event) => setPrefersReducedMotion(event.matches);
    preference.addEventListener("change", onPreference);
    const desktop = window.matchMedia("(min-width: 981px)");
    const onDesktop = (event) => {
      if (event.matches) setMenuOpen(false);
    };
    desktop.addEventListener("change", onDesktop);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(({ target, isIntersecting }) => {
          if (isIntersecting) target.dataset.inView = "true";
          if (target.classList.contains("solar-visual")) {
            target.dataset.running = String(isIntersecting && !document.hidden);
          }
        });
      },
      { threshold: 0.15 },
    );
    page
      .querySelectorAll(
        ".section-heading, .principle, .testimonial-featured, .solar-visual, .market-bridge",
      )
      .forEach((element) => observer.observe(element));

    const onVisibility = () => {
      const visual = page.querySelector(".solar-visual");
      const bounds = visual.getBoundingClientRect();
      visual.dataset.running = String(
        !document.hidden &&
          bounds.bottom > 0 &&
          bounds.top < window.innerHeight,
      );
    };
    const onScroll = () => {
      page.querySelector(".site-header").dataset.scrolled = String(
        window.scrollY > 24,
      );
    };
    const navigationObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach(({ target, isIntersecting }) => {
          if (!isIntersecting) return;
          page.querySelectorAll(".desktop-nav a").forEach((link) => {
            if (link.hash === `#${target.id}`)
              link.setAttribute("aria-current", "location");
            else link.removeAttribute("aria-current");
          });
        });
      },
      { rootMargin: "-15% 0px -65% 0px", threshold: 0 },
    );
    page
      .querySelectorAll("main section[id]")
      .forEach((section) => navigationObserver.observe(section));
    document.addEventListener("visibilitychange", onVisibility);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      observer.disconnect();
      navigationObserver.disconnect();
      preference.removeEventListener("change", onPreference);
      desktop.removeEventListener("change", onDesktop);
      document.removeEventListener("visibilitychange", onVisibility);
      window.removeEventListener("scroll", onScroll);
    };
  }, []);
  useEffect(() => {
    if (motionDisabled) return;
    const panel = document.getElementById(`phase-panel-${activePhase}`);
    const animation = panel.animate(
      [
        { opacity: 0.65, transform: "translateX(12px)", filter: "blur(2px)" },
        { opacity: 1, transform: "translateX(0)", filter: "blur(0)" },
      ],
      { duration: 320, easing: "cubic-bezier(0.16, 1, 0.3, 1)" },
    );
    return () => animation.cancel();
  }, [activePhase, motionDisabled]);
  useEffect(() => {
    if (!menuOpen) return;
    firstMenuLink.current?.focus();
    const onEscape = (event) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        menuButton.current?.focus();
      }
    };
    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, [menuOpen]);
  useEffect(() => {
    if (reviewing) reviewHeading.current?.focus();
  }, [reviewing]);
  const closeMenu = () => setMenuOpen(false);
  const navigatePhase = (event, i) => {
    let next;
    if (event.key === "ArrowDown") next = (i + 1) % phases.length;
    if (event.key === "ArrowUp") next = (i + phases.length - 1) % phases.length;
    if (event.key === "Home") next = 0;
    if (event.key === "End") next = phases.length - 1;
    if (next !== undefined) {
      event.preventDefault();
      setActivePhase(next);
      document.getElementById(`phase-tab-${next}`)?.focus();
    }
  };
  return (
    <div
      className="landing-page"
      ref={pageRef}
      data-motion={motionDisabled ? "paused" : "playing"}
    >
      <a className="skip-link" href="#main">
        Skip to content
      </a>
      <header className="site-header">
        <div className="container nav-inner">
          <Brand />
          <nav aria-label="Main navigation" className="desktop-nav">
            <a href="#about">Our approach</a>
            <a href="#process">The Solar Cycle</a>
            <a href="#templates">Templates</a>
            <a href="#voices">Client voices</a>
          </nav>
          <a className="button button-small header-cta" href="#contact">
            Let’s talk <Arrow diagonal />
          </a>
          <button
            className="menu-toggle"
            ref={menuButton}
            aria-label={menuOpen ? "Close navigation" : "Open navigation"}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            <span />
            <span className={menuOpen ? "is-open" : ""} />
          </button>
        </div>
        <nav
          id="mobile-nav"
          className="mobile-nav"
          aria-label="Mobile navigation"
          hidden={!menuOpen}
        >
          <a ref={firstMenuLink} onClick={closeMenu} href="#about">
            Our approach
          </a>
          <a onClick={closeMenu} href="#process">
            The Solar Cycle
          </a>
          <a onClick={closeMenu} href="#templates">
            Templates
          </a>
          <a onClick={closeMenu} href="#voices">
            Client voices
          </a>
          <a onClick={closeMenu} href="#pricing">
            The workshop
          </a>
          <a onClick={closeMenu} href="#contact">
            Let’s talk <Arrow diagonal />
          </a>
        </nav>
      </header>
      <main id="main">
        <section id="hero" className="hero-section container">
          <div className="hero-content">
            <h1>
              Architecting
              <br />
              market dominance.
              <br />
              <em>
                For the best
                <br className="desktop-break" /> in the world.
              </em>
            </h1>
            <p>
              We help B2B companies clarify their message, reach the right
              buyers, and generate demand across the USA, UK, and UAE.
            </p>
            <div className="hero-actions">
              <a className="button" href="#pricing">
                Explore the Clarity Workshop <Arrow diagonal />
              </a>
              <a className="text-link" href="#about">
                Our approach <Arrow />
              </a>
            </div>
          </div>
          <div
            className="solar-visual"
            aria-label="Explore the Solar Cycle phases"
            role="group"
            style={{ "--phase-angle": `${activePhase * 90}deg` }}
          >
            <div className="solar-art">
              <div className="solar-halo" aria-hidden="true" />
              <div className="orbit orbit-outer" />
              <div className="orbit orbit-middle" />
              <div className="orbit orbit-inner" />
              <div className="solar-indicator" aria-hidden="true">
                <span />
              </div>
              <div className="solar-core">
                <span>
                  SUN
                  <br />
                  <em>ARABIA</em>
                </span>
                <small aria-live="polite">{phases[activePhase].title}</small>
              </div>
            </div>
            <div className="orbit-controls">
              {phases.map((phase, index) => (
                <button
                  key={phase.title}
                  className={`orbit-label orbit-label-${["top", "right", "bottom", "left"][index]}`}
                  aria-pressed={activePhase === index}
                  onClick={() => setActivePhase(index)}
                >
                  0{index + 1} / {phase.title}
                </button>
              ))}
            </div>
            <div className="solar-footer">
              <button
                className="motion-toggle"
                aria-pressed={motionDisabled}
                disabled={prefersReducedMotion}
                onClick={() => setMotionPaused(!motionPaused)}
              >
                <svg
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.3"
                  aria-hidden="true"
                >
                  {motionDisabled ? (
                    <path d="m6 3 6 5-6 5Z" />
                  ) : (
                    <path d="M5 3v10m6-10v10" />
                  )}
                </svg>
                {prefersReducedMotion
                  ? "Reduced motion"
                  : motionPaused
                    ? "Play motion"
                    : "Pause motion"}
              </button>
              <span className="visual-caption">
                A continuous cycle.
                <br />A compounding advantage.
              </span>
            </div>
          </div>
          <div className="hero-bottom">
            <span className="established">
              Independent thinking.
              <br />
              <span>Global ambition. Est. 2014.</span>
            </span>
            <div className="hero-stat">
              <strong>
                100<span>+</span>
              </strong>
              <span>Global clients</span>
            </div>
            <div className="hero-stat">
              <strong>
                10<span>+</span>
              </strong>
              <span>Years of experience</span>
            </div>
            <div className="hero-stat">
              <strong>3</strong>
              <span>Markets. One partner.</span>
            </div>
            <a
              className="scroll-link"
              href="#about"
              aria-label="Discover our approach"
            >
              <Arrow />
            </a>
          </div>
        </section>
        <section id="about" className="section container about-section">
          <div className="section-heading">
            <h2>
              The antithesis of the
              <br />
              <em>traditional agency.</em>
            </h2>
            <p>
              Institutional-grade strategy.
              <br /> High-end brand sovereignty.
            </p>
          </div>
          <div className="about-grid">
            <div className="about-copy">
              <p>
                Having navigated the world’s most competitive landscapes for
                over a decade, we understand that true growth is not found in
                vanity metrics, but in the compounding value of{" "}
                <strong>Customer Lifetime Loyalty.</strong>
              </p>
              <p>
                We are a high-conviction partner for B2B enterprises that
                prioritize revenue over “reach.” We serve a global portfolio of
                visionaries who demand more than just deliverables — they demand
                a seat at the head of the table.
              </p>
    
              <a className="text-link" href="#process">
                Meet your growth framework <Arrow />
              </a>
            </div>
            <div className="principle">
              <blockquote>
                “Growth is not a campaign.
                <br />
                It is a culture —{" "}
                <em>
                  compounded,
                  <br />
                  daily, deliberately.
                </em>
                ”
              </blockquote>
              <p>Sun Arabia Operating Principle</p>
              <div className="principle-facts">
                <div>
                  <strong>50M+</strong>
                  <span>Engagements</span>
                </div>
                <div>
                  <strong>98%</strong>
                  <span>Retention</span>
                </div>
                <div>
                  <strong>∞</strong>
                  <span>Potential</span>
                </div>
              </div>
            </div>
          </div>
        </section>
        <section id="process" className="process-section section">
          <div className="container">
            <div className="section-heading">
              <h2>
                The <em>Solar Cycle.</em>
              </h2>
              <p>
                A four-phase proprietary framework engineered
                <br /> for compounding revenue growth.
              </p>
            </div>
            <div className="process-layout">
              <div
                className="phase-list"
                role="tablist"
                aria-label="Solar Cycle phases"
                aria-orientation="vertical"
              >
                {phases.map((phase, i) => (
                  <button
                    key={phase.title}
                    id={`phase-tab-${i}`}
                    className={`phase-tab ${activePhase === i ? "active" : ""}`}
                    role="tab"
                    aria-selected={activePhase === i}
                    aria-controls={`phase-panel-${i}`}
                    tabIndex={activePhase === i ? 0 : -1}
                    onClick={() => setActivePhase(i)}
                    onKeyDown={(event) => navigatePhase(event, i)}
                  >
                    <span>0{i + 1}</span>
                    <span>{phase.title}</span>
                    <Arrow diagonal />
                  </button>
                ))}
              </div>
              {phases.map((phase, i) => (
                <div
                  key={phase.title}
                  id={`phase-panel-${i}`}
                  className="phase-panel"
                  role="tabpanel"
                  aria-labelledby={`phase-tab-${i}`}
                  tabIndex="0"
                  hidden={activePhase !== i}
                >
                  <div
                    className={`phase-diagram phase-diagram-${i}`}
                    aria-hidden="true"
                  >
                    <span />
                    <span />
                    <span />
                    <span />
                  </div>
                  <div className="phase-detail">
                    <span>PHASE 0{i + 1} / 04</span>
                    <h3>{phase.title}</h3>
                    <p>{phase.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
        <section className="section container markets-section">
          <div className="section-heading">
            <h2>
              Three power hubs.
              <br />
              <em>One growth engine.</em>
            </h2>
            <p>
              A global perspective.
              <br /> Precisely local execution.
            </p>
          </div>
          <MarketBridge />
          <div className="markets-grid">
            {markets.map((market) => (
              <article className="market" key={market.region}>
                <span className="market-region">{market.region}</span>
                <h3>{market.title}</h3>
                <p>{market.desc}</p>
              </article>
            ))}
          </div>
        </section>
        <section id="templates" className="section templates-section">
          <div className="container">
            <div className="section-heading">
              <h2>
                Built for every business.
                <br />
                <em>Ready-made web systems.</em>
              </h2>
              <p>
                Industry templates engineered around real operational problems:
                bookings, orders, payments and portals. Start from a template;
                we tailor it to you.
              </p>
            </div>
            <div
              className="template-filters"
              role="group"
              aria-label="Filter templates by industry"
            >
              {["All", ...templateCategories].map((category) => (
                <button
                  key={category}
                  type="button"
                  aria-pressed={templateFilter === category}
                  onClick={() => {
                    setTemplateFilter(category);
                    setShowAllTemplates(false);
                  }}
                >
                  {category}
                  <span>
                    {category === "All"
                      ? templates.length
                      : templates.filter((t) => t.category === category)
                          .length}
                  </span>
                </button>
              ))}
            </div>
            <p className="template-count" aria-live="polite">
              Showing {visibleTemplates.length} of {filteredTemplates.length}{" "}
              {templateFilter === "All" ? "templates" : templateFilter}
            </p>
            <div className="template-grid">
              {visibleTemplates.map((template) => (
                <article className="template-card" key={template.name}>
                  <TemplatePreview layout={template.layout} />
                  <span className="template-category">{template.category}</span>
                  <h3>{template.name}</h3>
                  <p>{template.solves}</p>
                  <ul className="template-features">
                    {template.features.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                  <a
                    className="text-link"
                    href="#contact"
                    onClick={() => requestTemplate(template)}
                  >
                    Request this template
                    <span className="sr-only">: {template.name}</span>
                    <Arrow diagonal />
                  </a>
                </article>
              ))}
            </div>
            <div className="template-footer">
              {visibleTemplates.length < filteredTemplates.length && (
                <button
                  type="button"
                  className="button"
                  onClick={() => setShowAllTemplates(true)}
                >
                  View all {filteredTemplates.length} templates <Arrow />
                </button>
              )}
              <p>
                Don’t see your industry? Every template is a starting point.
                We build custom web systems for any business model.{" "}
                <a href="#contact">Tell us what you need.</a>
              </p>
            </div>
          </div>
        </section>
        <section id="voices" className="section voices-section">
          <div className="container">
            <div className="section-heading">
              <h2>
                Results that
                <br />
                <em>speak for themselves.</em>
              </h2>
              <p>
                Trusted by visionary leaders across three of
                <br /> the world’s most competitive markets.
              </p>
            </div>
            <div className="testimonials">
              <article className="testimonial testimonial-featured">
                <span className="quote-mark" aria-hidden="true">
                  “
                </span>
                <blockquote>{testimonials[0].quote}</blockquote>
                <Portrait client={testimonials[0]} />
              </article>
              <div className="testimonial-grid">
                {testimonials.slice(1).map((client) => (
                  <article className="testimonial" key={client.name}>
                    <blockquote>“{client.quote}”</blockquote>
                    <Portrait client={client} />
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>
        <section className="section container difference-section">
          <div className="section-heading">
            <h2>
              Categorically <em>different.</em>
            </h2>
            <p>
              Our focus is your growth.
              <br /> Our model reflects it.
            </p>
          </div>
          <table className="comparison">
            <caption className="sr-only">
              Traditional agencies compared with Sun Arabia
            </caption>
            <thead>
              <tr>
                <th scope="col">Traditional agencies</th>
                <th scope="col">
                  <SunMark />
                  Sun Arabia
                </th>
              </tr>
            </thead>
            <tbody>
              {differences.map(([before, after]) => (
                <tr key={before}>
                  <td>{before}</td>
                  <td>
                    <svg
                      viewBox="0 0 20 20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      aria-hidden="true"
                    >
                      <path d="m4 10 4 4 8-8" />
                    </svg>
                    {after}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
        <section id="pricing" className="workshop-section section">
          <div className="container workshop-layout">
            <div>
              <h2>
                Clarity first.
                <br />
                <em>Dominance follows.</em>
              </h2>
              <p className="workshop-intro">
                Stop guessing. Start executing. Our Paid Strategy & Audit is a
                deep-tissue diagnostic of your Website, Social, and Revenue
                Architecture.
              </p>
              <p>
                We provide the roadmap; you decide if we are the ones to drive
                it. No long-term contracts. Just pure ROI.
              </p>
            </div>
            <div className="workshop-offer">
              <div className="workshop-offer-heading">
                <SunMark />
                <h3>The Clarity Workshop</h3>
              </div>
              <div className="workshop-price">
                $5,000<span>Paid strategy & audit</span>
              </div>
              <ul>
                {["Website Audit", "Social Audit", "Revenue Architecture"].map(
                  (item) => (
                    <li key={item}>
                      <span>{item}</span>
                      <Arrow diagonal />
                    </li>
                  ),
                )}
              </ul>
              <a className="button" href="#contact">
                Book your Clarity Workshop <Arrow diagonal />
              </a>
              <p>
                No long-term commitment. Fully refundable within 48h if not
                satisfied.
              </p>
            </div>
          </div>
        </section>
        <section id="contact" className="section container contact-section">
          <div>
            <h2>
              Ready to dictate
              <br />
              <em>your market?</em>
            </h2>
            <p>
              Start with a conversation.
              <br />
              Tell us where you want to go.
            </p>
            <div className="contact-signature">
              <SunMark />
              <span>
                Independent strategy.
                <br />
                Shared ambition.
              </span>
            </div>
          </div>
          <div className="contact-form-wrap">
            {reviewing ? (
              <div className="enquiry-review">
                <h3 ref={reviewHeading} tabIndex="-1">
                  Your enquiry preview
                </h3>
                <p>
                  Online enquiries are not connected yet. Your details have not
                  been sent.
                </p>
                <dl>
                  <dt>Name</dt>
                  <dd>{formState.name}</dd>
                  <dt>Email</dt>
                  <dd>{formState.email}</dd>
                  {formState.company && (
                    <>
                      <dt>Company</dt>
                      <dd>{formState.company}</dd>
                    </>
                  )}
                  {formState.msg && (
                    <>
                      <dt>Your goals</dt>
                      <dd>{formState.msg}</dd>
                    </>
                  )}
                </dl>
                <button
                  className="button"
                  onClick={() => {
                    setReviewing(false);
                    requestAnimationFrame(() =>
                      document.getElementById("name")?.focus(),
                    );
                  }}
                >
                  Edit your details <Arrow />
                </button>
              </div>
            ) : (
              <form
                onSubmit={(event) => {
                  event.preventDefault();
                  setReviewing(true);
                }}
              >
                <p className="form-notice" id="form-notice">
                  Online enquiries are currently unavailable. You can preview
                  your enquiry below; it will not be sent.
                </p>
                <div className="form-grid">
                  {fields.map(({ key, label, ...inputProps }) => (
                    <div className={`field field-${key}`} key={key}>
                      <label htmlFor={key}>
                        {label}
                        {!inputProps.required && <span>Optional</span>}
                      </label>
                      <input
                        {...inputProps}
                        id={key}
                        name={key}
                        value={formState[key]}
                        onChange={(event) =>
                          setFormState({
                            ...formState,
                            [key]: event.target.value,
                          })
                        }
                      />
                    </div>
                  ))}
                  <div className="field field-message">
                    <label htmlFor="msg">
                      Your goals <span>Optional</span>
                    </label>
                    <textarea
                      id="msg"
                      name="msg"
                      rows="4"
                      placeholder="What would meaningful growth look like for your business?"
                      value={formState.msg}
                      onChange={(event) =>
                        setFormState({ ...formState, msg: event.target.value })
                      }
                    />
                  </div>
                </div>
                <button
                  className="button"
                  type="submit"
                  aria-describedby="form-notice"
                >
                  Preview your enquiry <Arrow diagonal />
                </button>
              </form>
            )}
          </div>
        </section>
      </main>
      <footer className="site-footer container">
        <div className="footer-wordmark" aria-hidden="true">
          SUN <em>ARABIA</em>
          <span>
            <SunMark />
          </span>
        </div>
        <div className="footer-top">
          <Brand />
          <nav aria-label="Footer navigation">
            <a href="#about">Our approach</a>
            <a href="#templates">Templates</a>
            <a href="#pricing">The workshop</a>
            <a href="#contact">Contact</a>
          </nav>
          <a className="text-link" href="#hero">
            Back to top <Arrow diagonal />
          </a>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Sun Arabia Marketing Agency</span>
          <span>USA · UK · UAE</span>
          <span>Strategy. Sovereignty. Growth.</span>
        </div>
      </footer>
    </div>
  );
}
