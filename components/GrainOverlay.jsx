// Fixed film-grain layers: multiply (depth) + soft highlight sparkle.
// Textures are inline SVGs in globals.css — no extra assets.
export default function GrainOverlay() {
  return (
    <>
      <div className="grain-overlay grain-overlay--film" aria-hidden="true" />
      <div className="grain-overlay grain-overlay--sheen" aria-hidden="true" />
    </>
  );
}
