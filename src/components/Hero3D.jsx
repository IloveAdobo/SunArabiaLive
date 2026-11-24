import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  Float,
  Lightformer,
  MeshDistortMaterial,
  RoundedBox,
} from "@react-three/drei";
import * as THREE from "three";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";

const damp = THREE.MathUtils.damp;
const geometryCache = new Map();

/* Turn a Font Awesome icon definition into an extruded, bevelled, centred
   mesh about `size` units across. Cached because scenes reuse icons. */
function iconGeometry(icon, size) {
  const key = `${icon.iconName}-${size}`;
  if (geometryCache.has(key)) return geometryCache.get(key);
  const [width, height, , , pathData] = icon.icon;
  const d = Array.isArray(pathData) ? pathData.join(" ") : pathData;
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}"><path d="${d}"/></svg>`;
  const shapes = new SVGLoader()
    .parse(svg)
    .paths.flatMap((path) => SVGLoader.createShapes(path));
  const geometry = new THREE.ExtrudeGeometry(shapes, {
    depth: 110,
    bevelEnabled: true,
    bevelThickness: 18,
    bevelSize: 12,
    bevelSegments: 5,
    curveSegments: 16,
  });
  geometry.center();
  geometry.rotateX(Math.PI); // SVG's y axis points down
  const scale = size / Math.max(width, height);
  geometry.scale(scale, scale, scale);
  geometry.computeVertexNormals();
  geometryCache.set(key, geometry);
  return geometry;
}

function Icon3D({ icon, size = 2.1, color, ...props }) {
  const geometry = useMemo(() => iconGeometry(icon, size), [icon, size]);
  return (
    <mesh geometry={geometry} {...props}>
      <meshPhysicalMaterial
        color={color}
        roughness={0.2}
        metalness={0.12}
        clearcoat={1}
        clearcoatRoughness={0.08}
      />
    </mesh>
  );
}

function Glossy({ color, ...props }) {
  return (
    <meshPhysicalMaterial color={color} roughness={0.15} clearcoat={1} {...props} />
  );
}

/* ---------- Scenes ---------- */

function OrbitScene({ t, still, float }) {
  const ring = useRef(null);
  useFrame((_, delta) => {
    if (!still) ring.current.rotation.z += delta * 0.15;
  });
  return (
    <>
      <Float {...float}>
        <Icon3D icon={t.icon} color={t.accent} />
      </Float>
      <mesh ref={ring} rotation={[1.25, 0.15, 0]}>
        <torusGeometry args={[2.25, 0.012, 16, 160]} />
        <meshBasicMaterial color={t.light} transparent opacity={0.7} />
      </mesh>
      <Float {...float}>
        <mesh position={[2, 1.2, -0.6]}>
          <sphereGeometry args={[0.34, 48, 48]} />
          <Glossy color="#ffffff" />
        </mesh>
        <mesh position={[-2.1, -0.8, 0.5]} rotation={[0.6, 0.4, 0]}>
          <torusGeometry args={[0.32, 0.12, 32, 64]} />
          <Glossy color={t.light} />
        </mesh>
      </Float>
      <Float {...float} speed={float.speed * 1.2}>
        <RoundedBox args={[0.6, 0.6, 0.6]} radius={0.12} position={[-1.7, 1.45, -1]} rotation={[0.5, 0.7, 0.2]}>
          <meshPhysicalMaterial color="#ffffff" transmission={1} thickness={0.6} roughness={0.08} />
        </RoundedBox>
        <mesh position={[1.6, -1.35, 0.9]}>
          <sphereGeometry args={[0.18, 32, 32]} />
          <Glossy color={t.accent} />
        </mesh>
      </Float>
    </>
  );
}

function ConstellationScene({ t, still, float }) {
  const orbit = useRef(null);
  useFrame((_, delta) => {
    if (!still) orbit.current.rotation.y += delta * 0.25;
  });
  return (
    <>
      <Float {...float}>
        <Icon3D icon={t.icon} size={1.8} color={t.accent} />
      </Float>
      <group rotation={[0.35, 0, -0.12]}>
        <group ref={orbit}>
          {t.props.map((icon, k) => {
            const a = (k / t.props.length) * Math.PI * 2;
            return (
              <Float key={k} {...float} speed={float.speed * (1 + k * 0.15)}>
                <Icon3D
                  icon={icon}
                  size={0.62}
                  color={k % 2 ? "#ffffff" : t.light}
                  position={[Math.cos(a) * 2.35, 0, Math.sin(a) * 2.35]}
                />
              </Float>
            );
          })}
        </group>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2.35, 0.01, 12, 160]} />
          <meshBasicMaterial color={t.light} transparent opacity={0.6} />
        </mesh>
      </group>
    </>
  );
}

function PodiumScene({ t, still, float }) {
  const dots = useRef(null);
  useFrame((_, delta) => {
    if (!still) dots.current.rotation.y -= delta * 0.3;
  });
  return (
    <>
      <Float {...float} floatIntensity={float.floatIntensity * 0.6}>
        <Icon3D icon={t.icon} size={1.75} color={t.accent} position={[0, 0.45, 0]} />
      </Float>
      <mesh position={[0, -1.12, 0]}>
        <cylinderGeometry args={[1.25, 1.25, 0.22, 96]} />
        <Glossy color="#ffffff" />
      </mesh>
      <mesh position={[0, -1.38, 0]}>
        <cylinderGeometry args={[1.65, 1.65, 0.3, 96]} />
        <Glossy color={t.light} />
      </mesh>
      <group ref={dots} position={[0, -1.12, 0]}>
        {Array.from({ length: 10 }, (_, k) => {
          const a = (k / 10) * Math.PI * 2;
          return (
            <mesh key={k} position={[Math.cos(a) * 2.05, 0.15 + (k % 3) * 0.25, Math.sin(a) * 2.05]}>
              <sphereGeometry args={[0.07 + (k % 3) * 0.03, 24, 24]} />
              <Glossy color={k % 2 ? t.accent : "#ffffff"} />
            </mesh>
          );
        })}
      </group>
    </>
  );
}

function PanelsScene({ t, float }) {
  const panels = [
    { p: [-0.9, 0.55, -1.2], r: [0, 0.35, 0.04], c: "#ffffff" },
    { p: [0.7, -0.35, -0.6], r: [0, -0.25, -0.03], c: t.light },
    { p: [-0.2, -0.95, -1.9], r: [0, 0.15, 0], c: "#ffffff" },
  ];
  return (
    <>
      {panels.map((panel, k) => (
        <Float key={k} {...float} speed={float.speed * (0.8 + k * 0.2)} rotationIntensity={float.rotationIntensity * 0.3}>
          <group position={panel.p} rotation={panel.r}>
            <RoundedBox args={[2.3, 1.45, 0.07]} radius={0.06}>
              <meshPhysicalMaterial
                color={panel.c}
                transmission={k === 1 ? 0.6 : 0}
                thickness={0.4}
                roughness={0.18}
                clearcoat={1}
              />
            </RoundedBox>
            <Icon3D icon={t.props[k]} size={0.42} color={t.accent} position={[-0.75, 0.4, 0.08]} />
            {[0.05, -0.2, -0.45].map((y, j) => (
              <mesh key={j} position={[0.15 - j * 0.15, y, 0.045]}>
                <boxGeometry args={[1.5 - j * 0.3, 0.09, 0.01]} />
                <meshBasicMaterial color={j ? "#d9d4c8" : t.accent} />
              </mesh>
            ))}
          </group>
        </Float>
      ))}
      <Float {...float}>
        <Icon3D icon={t.icon} size={1.45} color={t.accent} position={[0.25, 0.3, 0.9]} />
      </Float>
    </>
  );
}

function WaveScene({ t, still, float }) {
  const field = useRef(null);
  const cols = 6;
  const rows = 4;
  useFrame((state) => {
    const time = still ? 0 : state.clock.elapsedTime;
    field.current.children.forEach((child, k) => {
      const x = k % cols;
      const z = Math.floor(k / cols);
      child.position.y = Math.sin(time * 1.4 + x * 0.7 + z * 0.9) * 0.18;
      child.rotation.y = time * 0.4 + k;
    });
  });
  return (
    <>
      <group position={[0, -1.15, -1.2]} rotation={[0.45, 0, 0]}>
        <group ref={field}>
          {Array.from({ length: cols * rows }, (_, k) => (
            <group key={k} position={[((k % cols) - (cols - 1) / 2) * 0.75, 0, (Math.floor(k / cols) - 1.5) * 0.75]}>
              <Icon3D
                icon={t.props[k % t.props.length]}
                size={0.38}
                color={k % 3 === 0 ? t.accent : k % 3 === 1 ? t.light : "#ffffff"}
              />
            </group>
          ))}
        </group>
      </group>
      <Float {...float}>
        <Icon3D icon={t.icon} size={1.75} color={t.accent} position={[0, 0.55, 0.8]} />
      </Float>
    </>
  );
}

function BlobScene({ t, still, float }) {
  return (
    <>
      <mesh position={[0.2, 0.1, -1.1]} scale={1.4}>
        <sphereGeometry args={[1, 96, 96]} />
        <MeshDistortMaterial
          color={t.accent}
          distort={0.42}
          speed={still ? 0.0001 : 1.8}
          roughness={0.15}
          clearcoat={1}
        />
      </mesh>
      <Float {...float}>
        <Icon3D icon={t.icon} size={1.35} color="#ffffff" position={[-0.55, -0.1, 1.05]} />
      </Float>
      <Float {...float} speed={float.speed * 1.4}>
        <mesh position={[1.8, -1.2, 0.4]}>
          <sphereGeometry args={[0.28, 48, 48]} />
          <Glossy color={t.light} />
        </mesh>
        <mesh position={[-1.9, 1.35, -0.2]}>
          <sphereGeometry args={[0.16, 32, 32]} />
          <Glossy color="#ffffff" />
        </mesh>
      </Float>
    </>
  );
}

function RingsScene({ t, still, float }) {
  const rings = useRef(null);
  useFrame((_, delta) => {
    if (still) return;
    rings.current.children.forEach((ring, k) => {
      ring.rotation.x += delta * (0.2 + k * 0.08) * (k % 2 ? -1 : 1);
      ring.rotation.y += delta * (0.12 + k * 0.05);
    });
  });
  return (
    <>
      <group ref={rings}>
        {[1.2, 1.5, 1.8, 2.08].map((radius, k) => (
          <mesh key={radius} rotation={[k * 0.6, k * 0.9, 0]}>
            <torusGeometry args={[radius, 0.045 - k * 0.006, 24, 160]} />
            <Glossy color={k % 2 ? "#ffffff" : t.light} metalness={0.3} />
          </mesh>
        ))}
      </group>
      <Float {...float}>
        <Icon3D icon={t.icon} size={1.55} color={t.accent} />
      </Float>
    </>
  );
}

const scenes = {
  orbit: OrbitScene,
  constellation: ConstellationScene,
  podium: PodiumScene,
  panels: PanelsScene,
  wave: WaveScene,
  blob: BlobScene,
  rings: RingsScene,
};

/* Lights + the template's scene, turned by the pointer and by scrolling. */
export function HeroScene({ template, still = false, follow = true }) {
  const group = useRef(null);
  const t = useMemo(
    () => ({
      icon: template.icon,
      accent: template.accent,
      light: `#${new THREE.Color(template.accent).lerp(new THREE.Color("#ffffff"), 0.55).getHexString()}`,
      props: template.site.props,
    }),
    [template],
  );
  const Scene = scenes[template.site.scene];
  const float = still
    ? { speed: 0, rotationIntensity: 0, floatIntensity: 0 }
    : { speed: 1.6, rotationIntensity: 0.45, floatIntensity: 0.85 };

  useFrame((state, delta) => {
    if (!follow) return;
    const scroll = Math.min(window.scrollY / window.innerHeight, 1.3);
    const g = group.current;
    g.rotation.y = damp(g.rotation.y, -0.35 + state.pointer.x * 0.5 + (still ? 0 : scroll * Math.PI * 0.7), 4, delta);
    g.rotation.x = damp(g.rotation.x, -state.pointer.y * 0.28 + scroll * 0.25, 4, delta);
    g.position.y = damp(g.position.y, scroll * 1.1, 4, delta);
    state.camera.position.z = damp(state.camera.position.z, 7.6 + scroll * 1.6, 3, delta);
  });

  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 6, 5]} intensity={2.4} />
      <directionalLight position={[-5, -2, 3]} intensity={0.6} color={t.light} />
      <Environment resolution={256}>
        <Lightformer form="rect" intensity={3} position={[0, 5, -3]} scale={[12, 2, 1]} />
        <Lightformer form="circle" intensity={2.5} position={[-6, 1, 2]} scale={4} color={t.light} />
        <Lightformer form="rect" intensity={1.6} position={[6, -1, 3]} scale={[3, 7, 1]} />
        <Lightformer form="ring" intensity={1.2} position={[0, 0, 8]} scale={6} />
      </Environment>
      <group ref={group} rotation={[0, follow ? 0 : -0.35, 0]}>
        <Scene t={t} still={still} float={float} />
      </group>
      <ContactShadows position={[0, -1.85, 0]} opacity={0.25} scale={5} blur={2.8} far={4} />
    </>
  );
}

const heroCamera = { position: [0, 0, 7.6], fov: 35 };

/* Static render of a template's hero scene on a transparent background.
   Used (dev only) to bake the 3D stills shown in the template cards. */
export function HeroStill({ template }) {
  return (
    <Canvas
      dpr={1}
      camera={heroCamera}
      gl={{ antialias: true, alpha: true, preserveDrawingBuffer: true }}
    >
      <HeroScene template={template} still follow={false} />
    </Canvas>
  );
}

export default function Hero3D({ template }) {
  const wrap = useRef(null);
  const [visible, setVisible] = useState(true);
  const [still] = useState(
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
  );

  // Stop rendering when the hero is off screen.
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) =>
      setVisible(entry.isIntersecting),
    );
    observer.observe(wrap.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="ts-canvas" ref={wrap} aria-hidden="true">
      <Canvas
        dpr={[1, 1.75]}
        camera={heroCamera}
        gl={{ antialias: true, alpha: true }}
        frameloop={visible ? "always" : "never"}
        eventSource={document.getElementById("root")}
        eventPrefix="client"
      >
        <HeroScene template={template} still={still} />
      </Canvas>
    </div>
  );
}
