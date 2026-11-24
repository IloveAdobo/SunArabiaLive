import { lazy, Suspense, useEffect, useState } from "react";
import LandingPage from "./pages/LandingPage";
import "./App.css";
import "./animations.css";

// Template demo sites (and Three.js) load only when someone opens one.
const TemplateSite = lazy(() => import("./pages/TemplateSite"));

const templateRoute = () =>
  window.location.hash.match(/^#\/templates\/([\w-]+)/)?.[1] ?? null;

function App() {
  const [templateSlug, setTemplateSlug] = useState(templateRoute);

  useEffect(() => {
    const onHashChange = () => setTemplateSlug(templateRoute());
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  useEffect(() => {
    if (templateSlug) window.scrollTo(0, 0);
  }, [templateSlug]);

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
