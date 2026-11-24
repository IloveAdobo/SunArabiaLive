import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBell,
  faCartShopping,
  faChartLine,
  faCheck,
  faChevronLeft,
  faChevronRight,
  faCircleCheck,
  faClock,
  faEnvelope,
  faFileLines,
  faFolderOpen,
  faGauge,
  faHeart,
  faLocationDot,
  faLock,
  faMagnifyingGlass,
  faPlus,
  faStar,
  faUser,
} from "@fortawesome/free-solid-svg-icons";

const siteNav = {
  shop: ["Shop", "New in", "Sale"],
  booking: ["Services", "Team", "Book"],
  listing: ["Browse", "Saved", "Sign in"],
  menu: ["Menu", "Order", "Visit"],
  editorial: ["Work", "About", "Contact"],
};
const appNavIcons = [faGauge, faFolderOpen, faEnvelope, faChartLine];

function statusTone(status) {
  const s = status.toLowerCase();
  if (/action|waitlist/.test(s)) return "alert";
  if (/pending|progress|packing|scheduled|draft|transit|out for|reserved/.test(s))
    return "wait";
  return "ok";
}

function Icon({ icon, className }) {
  return <FontAwesomeIcon icon={icon} className={className} />;
}

function SiteHeader({ template, links, extra }) {
  return (
    <div className="tpv-nav">
      <span className="tpv-logo">
        <i>
          <Icon icon={template.icon} />
        </i>
        {template.demo.brand}
      </span>
      <span className="tpv-links">
        {links.map((link) => (
          <span key={link}>{link}</span>
        ))}
        {extra}
      </span>
    </div>
  );
}

function Shop({ template }) {
  const { demo } = template;
  return (
    <>
      <SiteHeader
        template={template}
        links={siteNav.shop}
        extra={
          <span className="tpv-cart">
            <Icon icon={faCartShopping} />
            <b>2</b>
          </span>
        }
      />
      <div className="tpv-shop-hero">
        <div>
          <small>{demo.sub}</small>
          <strong>{demo.hero}</strong>
          <span className="tpv-btn">Shop now</span>
        </div>
        <Icon icon={demo.items[0].i} className="tpv-hero-icon" />
      </div>
      <div className="tpv-products">
        {demo.items.map((item, k) => (
          <div className="tpv-product" key={item.n}>
            <div className={`tpv-thumb tpv-thumb-${k % 4}`}>
              <Icon icon={item.i} />
              {k === 1 && <Icon icon={faHeart} className="tpv-fav" />}
            </div>
            <b>{item.n}</b>
            <span>
              {item.p}
              <i>
                <Icon icon={faPlus} />
              </i>
            </span>
          </div>
        ))}
      </div>
    </>
  );
}

function Booking({ template }) {
  const { demo } = template;
  const range = demo.range ?? 1;
  const lead = 3;
  return (
    <>
      <SiteHeader template={template} links={siteNav.booking} />
      <div className="tpv-booking">
        <div className="tpv-panel">
          <strong className="tpv-h">{demo.title}</strong>
          {demo.services.map(([name, detail], k) => (
            <div
              className={`tpv-service ${k === 0 ? "is-active" : ""}`}
              key={name}
            >
              <span className="tpv-radio">
                {k === 0 && <Icon icon={faCheck} />}
              </span>
              <span>{name}</span>
              <b>{detail}</b>
            </div>
          ))}
          <div className="tpv-summary">
            <small>Your booking</small>
            <span>
              <em>Service</em>
              <b>{demo.services[0][0]}</b>
            </span>
            <span>
              <em>Date</em>
              <b>
                {demo.month} {demo.day}
                {range > 1 ? `–${demo.day + range - 1}` : ""}
              </b>
            </span>
            <span>
              <em>
                {/^(Guests|Pickup)/.test(demo.slotsLabel)
                  ? demo.slotsLabel.split(" ")[0]
                  : "Time"}
              </em>
              <b>{demo.slots[demo.active]}</b>
            </span>
          </div>
          <div className="tpv-note">
            <Icon icon={faStar} /> 4.9 · 1,200+ reviews
          </div>
        </div>
        <div className="tpv-panel">
          <div className="tpv-cal-head">
            <b>{demo.month}</b>
            <span>
              <Icon icon={faChevronLeft} />
              <Icon icon={faChevronRight} />
            </span>
          </div>
          <div className="tpv-cal">
            {["M", "T", "W", "T", "F", "S", "S"].map((d, k) => (
              <em key={k}>{d}</em>
            ))}
            {Array.from({ length: 28 }, (_, k) => {
              const date = k - lead + 1;
              const selected = date >= demo.day && date < demo.day + range;
              return (
                <span
                  key={k}
                  className={
                    date < 1
                      ? "is-empty"
                      : selected
                        ? "is-selected"
                        : date < demo.day - 6
                          ? "is-past"
                          : ""
                  }
                >
                  {date > 0 ? date : ""}
                </span>
              );
            })}
          </div>
          <small className="tpv-label">{demo.slotsLabel}</small>
          <div className="tpv-slots">
            {demo.slots.map((slot, k) => (
              <span key={slot} className={k === demo.active ? "is-active" : ""}>
                {slot}
              </span>
            ))}
          </div>
          <span className="tpv-btn tpv-btn-block">{demo.cta}</span>
        </div>
      </div>
    </>
  );
}

function AppSidebar({ template, nav }) {
  return (
    <div className="tpv-side">
      <span className="tpv-logo">
        <i>
          <Icon icon={template.icon} />
        </i>
        {template.demo.brand}
      </span>
      {nav.map((item, k) => (
        <span key={item} className={k === 0 ? "is-active" : ""}>
          <Icon icon={appNavIcons[k]} />
          {item}
        </span>
      ))}
    </div>
  );
}

function Dashboard({ template }) {
  const { demo } = template;
  const max = Math.max(...demo.chart);
  return (
    <div className="tpv-app">
      <AppSidebar template={template} nav={demo.nav} />
      <div className="tpv-main">
        <div className="tpv-topbar">
          <strong className="tpv-h">{demo.title}</strong>
          <span>
            <Icon icon={faBell} />
            <i className="tpv-avatar">
              <Icon icon={faUser} />
            </i>
          </span>
        </div>
        <div className="tpv-kpis">
          {demo.kpis.map(([label, value]) => (
            <div key={label}>
              <small>{label}</small>
              <b>{value}</b>
            </div>
          ))}
        </div>
        <div className="tpv-chart">
          {demo.chart.map((value, k) => (
            <span
              key={k}
              style={{ height: `${(value / max) * 100}%` }}
              className={k === demo.chart.length - 1 ? "is-current" : ""}
            />
          ))}
        </div>
        <div className="tpv-table">
          {demo.rows.map(([a, b, status]) => (
            <div key={a}>
              <b>{a}</b>
              <span>{b}</span>
              <em className={`tpv-pill tone-${statusTone(status)}`}>{status}</em>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function Listing({ template }) {
  const { demo } = template;
  return (
    <>
      <SiteHeader template={template} links={siteNav.listing} />
      <div className="tpv-search">
        <span className="tpv-input">
          <Icon icon={faMagnifyingGlass} />
          {demo.search}
        </span>
        <span className="tpv-btn">Search</span>
      </div>
      <div className="tpv-chips">
        {demo.filters.map((filter, k) => (
          <span key={filter} className={k === 0 ? "is-active" : ""}>
            {filter}
          </span>
        ))}
        <small>{demo.items.length * 41} results</small>
      </div>
      <div className={`tpv-results ${demo.map ? "has-map" : ""}`}>
        <div className="tpv-list">
          {demo.items.map((item, k) => (
            <div className="tpv-result" key={item.t}>
              <div className={`tpv-thumb tpv-thumb-${k % 4}`}>
                <Icon icon={template.icon} />
              </div>
              <div>
                <b>{item.t}</b>
                <span>{item.m}</span>
              </div>
              <strong>{item.p}</strong>
              {!demo.map && <span className="tpv-btn">{demo.action}</span>}
            </div>
          ))}
          {!demo.map && (
            <div className="tpv-pager">
              <small>
                Showing 1–{demo.items.length} of {demo.items.length * 41}
              </small>
              <span>
                <Icon icon={faChevronLeft} />
                <b>1</b>
                <span>2</span>
                <span>3</span>
                <Icon icon={faChevronRight} />
              </span>
            </div>
          )}
        </div>
        {demo.map && (
          <div className="tpv-map">
            <i className="tpv-road tpv-road-1" />
            <i className="tpv-road tpv-road-2" />
            {demo.items.map((item, k) => (
              <span key={item.t} className={`tpv-pin tpv-pin-${k}`}>
                <Icon icon={faLocationDot} />
                {item.p}
              </span>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

function Menu({ template }) {
  const { demo } = template;
  return (
    <>
      <SiteHeader template={template} links={siteNav.menu} />
      <div className="tpv-menu-hero">
        <strong>{demo.hero}</strong>
        {demo.stamps ? (
          <span className="tpv-stamps">
            {Array.from({ length: 10 }, (_, k) => (
              <i key={k} className={k < demo.stamps ? "is-on" : ""} />
            ))}
            <small>{demo.stamps}/10 rewards</small>
          </span>
        ) : (
          <span className="tpv-meta">
            <Icon icon={faClock} /> Open now · 25 min
          </span>
        )}
      </div>
      <div className="tpv-tabs">
        {demo.cats.map((cat, k) => (
          <span key={cat} className={k === 1 ? "is-active" : ""}>
            {cat}
          </span>
        ))}
      </div>
      <div className="tpv-dishes">
        {demo.items.map((item, k) => (
          <div key={item.n}>
            <div className={`tpv-thumb tpv-thumb-${k % 4}`}>
              <Icon icon={template.icon} />
            </div>
            <span>
              <b>{item.n}</b>
              <small>{item.d}</small>
            </span>
            <strong>{item.p}</strong>
            <i>
              <Icon icon={faPlus} />
            </i>
          </div>
        ))}
      </div>
      <div className="tpv-orderbar">
        <span>
          <Icon icon={faCartShopping} /> {demo.cart}
        </span>
        <span className="tpv-btn">Checkout</span>
      </div>
    </>
  );
}

function Portal({ template }) {
  const { demo } = template;
  return (
    <div className="tpv-app">
      <AppSidebar template={template} nav={demo.nav} />
      <div className="tpv-main">
        <div className="tpv-topbar">
          <span className="tpv-greet">
            <small>{demo.user}</small>
            <strong className="tpv-h">{demo.title}</strong>
          </span>
          <span>
            <Icon icon={faLock} />
            <i className="tpv-avatar">
              <Icon icon={faUser} />
            </i>
          </span>
        </div>
        <div className="tpv-progress">
          <span>
            <small>Progress</small>
            <b>{demo.progress}%</b>
          </span>
          <i>
            <span style={{ width: `${demo.progress}%` }} />
          </i>
        </div>
        <div className="tpv-checklist">
          {demo.items.map(([label, status]) => {
            const tone = statusTone(status);
            return (
              <div key={label}>
                <Icon
                  icon={tone === "ok" ? faCircleCheck : faFileLines}
                  className={`tone-icon-${tone}`}
                />
                <b>{label}</b>
                <em className={`tpv-pill tone-${tone}`}>{status}</em>
              </div>
            );
          })}
        </div>
        <div className="tpv-message">
          <i className="tpv-avatar">
            <Icon icon={faEnvelope} />
          </i>
          <span>
            <b>Message from {template.demo.brand}</b>
            <small>We’ve reviewed your latest upload. Next step is ready.</small>
          </span>
          <span className="tpv-btn">Reply</span>
        </div>
      </div>
    </div>
  );
}

function Editorial({ template }) {
  const { demo } = template;
  return (
    <>
      <SiteHeader template={template} links={siteNav.editorial} />
      <div className="tpv-ed-hero">
        <div>
          <strong>{demo.headline}</strong>
          <small>{demo.sub}</small>
          {demo.progress && (
            <div className="tpv-progress tpv-progress-inline">
              <i>
                <span style={{ width: `${demo.progress.value}%` }} />
              </i>
              <small>{demo.progress.label}</small>
            </div>
          )}
          <span className="tpv-btn">{demo.cta}</span>
        </div>
        <div className="tpv-ed-image">
          <Icon icon={template.icon} />
        </div>
      </div>
      <div className="tpv-ed-cards">
        {demo.items.map((item, k) => (
          <div key={item}>
            <div className={`tpv-thumb tpv-thumb-${(k + 1) % 4}`}>
              <Icon icon={template.icon} />
            </div>
            <b>{item}</b>
          </div>
        ))}
      </div>
    </>
  );
}

const layouts = {
  shop: Shop,
  booking: Booking,
  dashboard: Dashboard,
  listing: Listing,
  menu: Menu,
  portal: Portal,
  editorial: Editorial,
};

/* Baked stills of each template's 3D hero (scripts/bake-template-heroes.mjs). */
const heroImages = import.meta.glob("../assets/template-heroes/*.webp", {
  eager: true,
  import: "default",
});
const systemPath = {
  shop: "/shop",
  booking: "/book",
  dashboard: "/dashboard",
  listing: "/search",
  menu: "/order",
  portal: "/portal",
  editorial: "/work",
};
const LANDING_MS = 3200;
const SYSTEM_MS = 4600;

/* Miniature of the template's 3D landing page (mirrors TemplateSite's hero). */
function MiniLanding({ template }) {
  const { demo, site } = template;
  const image = heroImages[`../assets/template-heroes/${template.slug}.webp`];
  return (
    <div className={`tpv-landing tpv-landing--${site.hero} tpv-font-${site.font}`}>
      <div className="tpv-nav tpv-landing-nav">
        <span className="tpv-logo">
          <i>
            <Icon icon={template.icon} />
          </i>
          {demo.brand}
        </span>
        <span className="tpv-links">
          <span>Features</span>
          <span>Results</span>
          <span className="tpv-btn">{template.action}</span>
        </span>
      </div>
      <div className="tpv-landing-hero">
        <div className="tpv-landing-copy">
          <em className="tpv-eyebrow">{template.category}</em>
          <strong>{template.tagline}</strong>
          <small>{template.solves}</small>
          <span className="tpv-landing-actions">
            <span className="tpv-btn">{template.action}</span>
            <span className="tpv-btn tpv-btn-ghost">How it works</span>
          </span>
        </div>
        <div className="tpv-landing-3d">
          {image ? (
            <img src={image} alt="" loading="lazy" decoding="async" />
          ) : (
            <Icon icon={template.icon} />
          )}
        </div>
      </div>
    </div>
  );
}

/* Floating "live event" card that hovers in front of the screen in 3D. */
function floatingCard({ layout, demo }) {
  switch (layout) {
    case "shop":
      return { icon: faCartShopping, title: "New order", text: `${demo.items[1].n} · ${demo.items[1].p}` };
    case "booking":
      return { icon: faCircleCheck, title: "Booking confirmed", text: `${demo.month} ${demo.day} · ${demo.slots[demo.active]}` };
    case "dashboard":
      return { icon: faChartLine, title: `${demo.kpis[0][1]} ${demo.kpis[0][0].toLowerCase()}`, text: "+12% vs last week" };
    case "listing":
      return { icon: faBell, title: "New enquiry", text: demo.items[0].t };
    case "menu":
      return { icon: faClock, title: "Order received", text: demo.cart };
    case "portal":
      return { icon: faCircleCheck, title: demo.items[0][1], text: demo.items[0][0] };
    default:
      return { icon: faEnvelope, title: "New lead", text: demo.cta };
  }
}

const canTilt = () =>
  window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
  !window.matchMedia("(prefers-reduced-motion: reduce)").matches;

const prefersReducedMotion = () =>
  window.matchMedia("(prefers-reduced-motion: reduce)").matches;

export default function TemplatePreview({ template, showLanding = true }) {
  const ref = useRef(null);
  const frame = useRef(0);
  const [slide, setSlide] = useState(showLanding ? 0 : 1);
  const slideRef = useRef(slide);

  // Landing page first, then the system; loops only while the card is on screen.
  useEffect(() => {
    if (!showLanding || prefersReducedMotion()) return;
    let timer = 0;
    let visible = false;
    const show = (next) => {
      slideRef.current = next;
      setSlide(next);
      timer = setTimeout(() => show(next ? 0 : 1), next ? SYSTEM_MS : LANDING_MS);
    };
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !visible) {
          visible = true;
          const next = slideRef.current ? 0 : 1;
          timer = setTimeout(
            () => show(next),
            slideRef.current ? SYSTEM_MS : LANDING_MS,
          );
        } else if (!entry.isIntersecting && visible) {
          visible = false;
          clearTimeout(timer);
        }
      },
      { threshold: 0.35 },
    );
    observer.observe(ref.current);
    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, [showLanding]);

  // Reduced motion: no auto-play; hovering shows the system instead.
  const onPointerEnter = () => {
    if (showLanding && prefersReducedMotion()) setSlide(1);
  };
  const Layout = layouts[template.layout];
  const float = floatingCard(template);
  const domain = `${template.demo.brand
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "")}.com`;

  const onPointerMove = (event) => {
    if (!canTilt()) return;
    const el = ref.current;
    const { left, top, width, height } = el.getBoundingClientRect();
    const x = (event.clientX - left) / width - 0.5;
    const y = (event.clientY - top) / height - 0.5;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => {
      el.style.setProperty("--px", x.toFixed(3));
      el.style.setProperty("--py", y.toFixed(3));
      el.dataset.active = "true";
    });
  };
  const onPointerLeave = () => {
    if (showLanding && prefersReducedMotion()) setSlide(0);
    cancelAnimationFrame(frame.current);
    const el = ref.current;
    el.style.removeProperty("--px");
    el.style.removeProperty("--py");
    delete el.dataset.active;
  };

  return (
    <div
      ref={ref}
      className="template-preview"
      style={{ "--tpv-accent": template.accent }}
      data-slide={slide}
      onPointerEnter={onPointerEnter}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      aria-hidden="true"
    >
      <div className="tpv-stage">
        <div className="tpv">
          <div className="tpv-chrome">
            <i />
            <i />
            <i />
            <span>
              <Icon icon={faLock} />
              {domain}
              <b className="tpv-path">{slide ? systemPath[template.layout] : ""}</b>
            </span>
            {showLanding && (
              <span className="tpv-dots">
                <i className={slide ? "" : "is-on"} />
                <i className={slide ? "is-on" : ""} />
              </span>
            )}
          </div>
          <div className="tpv-slides">
            {showLanding && (
              <div className="tpv-slide tpv-slide-landing">
                <MiniLanding template={template} />
              </div>
            )}
            <div className={`tpv-slide tpv-slide-system tpv-body tpv-layout-${template.layout}`}>
              <Layout template={template} />
            </div>
          </div>
          <div className="tpv-glare" />
        </div>
        <div className="tpv-float">
          <i>
            <Icon icon={float.icon} />
          </i>
          <span>
            <b>{float.title}</b>
            <small>{float.text}</small>
          </span>
        </div>
      </div>
    </div>
  );
}
