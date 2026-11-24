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

export default function TemplatePreview({ template }) {
  const Layout = layouts[template.layout];
  const domain = `${template.demo.brand
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "")}.com`;
  return (
    <div
      className="template-preview"
      style={{ "--tpv-accent": template.accent }}
      aria-hidden="true"
    >
      <div className="tpv">
        <div className="tpv-chrome">
          <i />
          <i />
          <i />
          <span>
            <Icon icon={faLock} />
            {domain}
          </span>
        </div>
        <div className={`tpv-body tpv-layout-${template.layout}`}>
          <Layout template={template} />
        </div>
      </div>
    </div>
  );
}
