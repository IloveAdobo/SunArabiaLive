import { lazy, Suspense, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faArrowRight,
  faBolt,
  faCheck,
  faGears,
  faPlugCircleBolt,
  faQuoteLeft,
  faStar,
} from "@fortawesome/free-solid-svg-icons";
import TemplatePreview from "../components/TemplatePreview";
import { findTemplate } from "../data/templates";
import "../templates.css";
import "../template-site.css";

const Hero3D = lazy(() => import("../components/Hero3D"));

const siteLinks = [
  ["Features", "ts-features"],
  ["How it works", "ts-showcase"],
  ["Results", "ts-results"],
  ["Contact", "ts-contact"],
];
const featureIcons = [faBolt, faGears, faPlugCircleBolt];
const featureCopy = [
  "Live in days, not months, and fast on every phone, tablet and desktop.",
  "Automations handle the busywork, so your team can focus on customers.",
  "Connected to payments, email, calendars and the tools you already use.",
];
const results = [
  ["24/7", "Open for business, even while you sleep"],
  ["60%", "Less time spent on manual admin"],
  ["3×", "More direct enquiries than before"],
];

/* Mouse-follow 3D tilt for cards. */
function tilt(event) {
  const el = event.currentTarget;
  if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
  const { left, top, width, height } = el.getBoundingClientRect();
  el.style.setProperty("--rx", `${((event.clientY - top) / height - 0.5) * -10}deg`);
  el.style.setProperty("--ry", `${((event.clientX - left) / width - 0.5) * 12}deg`);
}
function untilt(event) {
  event.currentTarget.style.removeProperty("--rx");
  event.currentTarget.style.removeProperty("--ry");
}

function scrollToId(event, id) {
  event.preventDefault();
  document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
}

function rememberRequest(template) {
  try {
    sessionStorage.setItem("sa-template-request", template.name);
  } catch {
    /* storage unavailable: the contact form simply won't be prefilled */
  }
}

export default function TemplateSite({ slug }) {
  const template = findTemplate(slug);

  useEffect(() => {
    if (!template) return;
    const previous = document.title;
    document.title = `${template.demo.brand} · ${template.name} template · Sun Arabia`;
    return () => {
      document.title = previous;
    };
  }, [template]);

  if (!template) {
    return (
      <div className="ts ts-missing">
        <h1>Template not found</h1>
        <a className="ts-btn" href="#templates">
          <FontAwesomeIcon icon={faArrowLeft} /> Back to all templates
        </a>
      </div>
    );
  }

  const { demo } = template;
  const selfHref = `#/templates/${template.slug}`;

  return (
    <div className="ts" style={{ "--ts-accent": template.accent }}>
      <div className="ts-demobar">
        <a href="#templates" className="ts-demobar-back">
          <FontAwesomeIcon icon={faArrowLeft} />
          <span>All templates</span>
        </a>
        <span className="ts-demobar-title">
          Sun Arabia · <b>{template.name}</b> template preview
        </span>
        <a
          href="#contact"
          className="ts-demobar-cta"
          onClick={() => rememberRequest(template)}
        >
          Request this template
        </a>
      </div>

      <header className="ts-nav">
        <a className="ts-logo" href={selfHref} onClick={(e) => scrollToId(e, "ts-top")}>
          <i>
            <FontAwesomeIcon icon={template.icon} />
          </i>
          {demo.brand}
        </a>
        <nav aria-label={`${demo.brand} navigation`}>
          {siteLinks.map(([label, id]) => (
            <a key={id} href={selfHref} onClick={(e) => scrollToId(e, id)}>
              {label}
            </a>
          ))}
        </nav>
        <a className="ts-btn ts-btn-small" href={selfHref} onClick={(e) => scrollToId(e, "ts-contact")}>
          {template.action}
        </a>
      </header>

      <main>
        <section className="ts-hero" id="ts-top">
          <div className="ts-hero-copy">
            <span className="ts-eyebrow">
              <i />
              {template.category}
            </span>
            <h1>{template.tagline}</h1>
            <p>
              {template.solves} {demo.sub ?? ""}
            </p>
            <div className="ts-actions">
              <a className="ts-btn" href={selfHref} onClick={(e) => scrollToId(e, "ts-contact")}>
                {template.action} <FontAwesomeIcon icon={faArrowRight} />
              </a>
              <a
                className="ts-btn ts-btn-ghost"
                href={selfHref}
                onClick={(e) => scrollToId(e, "ts-showcase")}
              >
                See how it works
              </a>
            </div>
            <div className="ts-trust">
              <span className="ts-stars">
                {Array.from({ length: 5 }, (_, k) => (
                  <FontAwesomeIcon key={k} icon={faStar} />
                ))}
              </span>
              4.9 from 1,200+ happy customers
            </div>
          </div>

          <div className="ts-hero-visual">
            <div className="ts-hero-glow" />
            <Suspense fallback={<div className="ts-canvas" />}>
              <Hero3D template={template} />
            </Suspense>
            {template.features.slice(0, 2).map((feature, k) => (
              <div className={`ts-chip ts-chip-${k}`} key={feature}>
                <i>
                  <FontAwesomeIcon icon={faCheck} />
                </i>
                {feature}
              </div>
            ))}
          </div>
        </section>

        <section className="ts-section" id="ts-features">
          <div className="ts-heading">
            <span className="ts-eyebrow">
              <i />
              Built-in systems
            </span>
            <h2>Everything {demo.brand} needs, in one place.</h2>
          </div>
          <div className="ts-features">
            {template.features.map((feature, k) => (
              <article
                className="ts-feature"
                key={feature}
                onPointerMove={tilt}
                onPointerLeave={untilt}
              >
                <i>
                  <FontAwesomeIcon icon={featureIcons[k]} />
                </i>
                <h3>{feature}</h3>
                <p>{featureCopy[k]}</p>
                <span className="ts-feature-index">0{k + 1}</span>
              </article>
            ))}
          </div>
        </section>

        <section className="ts-section ts-showcase" id="ts-showcase">
          <div className="ts-heading ts-heading-center">
            <span className="ts-eyebrow">
              <i />
              How it works
            </span>
            <h2>See the system in action.</h2>
            <p>{template.solves}</p>
          </div>
          <div className="ts-showcase-frame">
            <TemplatePreview template={template} />
          </div>
        </section>

        <section className="ts-section" id="ts-results">
          <div className="ts-results">
            {results.map(([value, label]) => (
              <div key={label} onPointerMove={tilt} onPointerLeave={untilt}>
                <strong>{value}</strong>
                <span>{label}</span>
              </div>
            ))}
          </div>
          <figure className="ts-quote">
            <FontAwesomeIcon icon={faQuoteLeft} />
            <blockquote>
              Since launching our new site, customers do in two minutes what
              used to take a phone call and a follow-up email. It paid for
              itself in the first month.
            </blockquote>
            <figcaption>
              <b>Operations Manager</b> · {demo.brand}
            </figcaption>
          </figure>
        </section>

        <section className="ts-cta" id="ts-contact">
          <div>
            <h2>Ready to launch {demo.brand}?</h2>
            <p>This is a live demo template. Make it yours in days.</p>
          </div>
          <a
            className="ts-btn ts-btn-light"
            href="#contact"
            onClick={() => rememberRequest(template)}
          >
            Request this template <FontAwesomeIcon icon={faArrowRight} />
          </a>
        </section>
      </main>

      <footer className="ts-footer">
        <span className="ts-logo">
          <i>
            <FontAwesomeIcon icon={template.icon} />
          </i>
          {demo.brand}
        </span>
        <span>
          © {new Date().getFullYear()} {demo.brand}. Demo content.
        </span>
        <a href="#templates">Template by Sun Arabia</a>
      </footer>
    </div>
  );
}
