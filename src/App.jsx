import { lazy, Suspense, useEffect, useState } from "react";
import LandingPage from "./pages/LandingPage";
import "./App.css";
import "./animations.css";

// Template demo sites (and Three.js) load only when someone opens one.
const TemplateSite = lazy(() => import("./pages/TemplateSite"));

// Dev only: #/render/<slug> renders a bare 3D hero for baking card images.
const RenderStill = import.meta.env.DEV
  ? lazy(() => import("./pages/RenderStill"))
  : null;

const hashRoute = (name) =>
  window.location.hash.match(new RegExp(`^#/${name}/([\\w-]+)`))?.[1] ?? null;

function App() {
  const [templateSlug, setTemplateSlug] = useState(() => hashRoute("templates"));
  const [renderSlug] = useState(() => hashRoute("render"));

  useEffect(() => {
    const onHashChange = () => setTemplateSlug(hashRoute("templates"));
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => {
    if (templateSlug) window.scrollTo(0, 0);
  }, [templateSlug]);

  if (RenderStill && renderSlug) {
    return (
      <Suspense fallback={null}>
        <RenderStill slug={renderSlug} />
      </Suspense>
    );
  }
  if (templateSlug) {
    return (
      <Suspense fallback={<div className="route-loading" />}>
        <TemplateSite slug={templateSlug} />
      </Suspense>
    );
  }
  return <LandingPage />;
}

export default App;
