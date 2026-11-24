import { HeroStill } from "../components/Hero3D";
import { findTemplate } from "../data/templates";

/* Dev-only page: renders one template's 3D hero on a transparent square so
   scripts/bake-template-heroes.mjs can save it as the card image. */
export default function RenderStill({ slug }) {
  const template = findTemplate(slug);
  if (!template) return null;
  return (
    <div style={{ position: "fixed", inset: 0, background: "transparent" }}>
      <HeroStill template={template} />
    </div>
  );
}
