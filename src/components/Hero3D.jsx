import { useEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import {
  ContactShadows,
  Environment,
  Float,
  Lightformer,
  RoundedBox,
} from "@react-three/drei";
import * as THREE from "three";
import { SVGLoader } from "three/examples/jsm/loaders/SVGLoader.js";

/* Turn a Font Awesome icon definition into an extruded, bevelled 3D mesh. */
function useIconGeometry(icon) {
  return useMemo(() => {
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
      bevelSegments: 6,
      curveSegments: 18,
    });
    geometry.center();
    geometry.rotateX(Math.PI); // SVG's y axis points down
    const scale = 2.1 / Math.max(width, height);
    geometry.scale(scale, scale, scale);
    geometry.computeVertexNormals();
    return geometry;
  }, [icon]);
}

const damp = THREE.MathUtils.damp;

function Scene({ template, still }) {
  const geometry = useIconGeometry(template.icon);
  const group = useRef(null);
  const ring = useRef(null);
  const accent = template.accent;
  const light = useMemo(
    () => new THREE.Color(accent).lerp(new THREE.Color("#ffffff"), 0.55),
    [accent],
  );

  useFrame((state, delta) => {
    const scroll = Math.min(window.scrollY / window.innerHeight, 1.3);
    const g = group.current;
    g.rotation.y = damp(
      g.rotation.y,
      -0.45 + state.pointer.x * 0.55 + (still ? 0 : scroll * Math.PI * 0.8),
      4,
      delta,
    );
    g.rotation.x = damp(g.rotation.x, -state.pointer.y * 0.3 + scroll * 0.25, 4, delta);
    g.position.y = damp(g.position.y, scroll * 1.1, 4, delta);
    state.camera.position.z = damp(state.camera.position.z, 7.4 + scroll * 1.6, 3, delta);
    if (!still) ring.current.rotation.z += delta * 0.15;
  });

  const floatProps = still
    ? { speed: 0, rotationIntensity: 0, floatIntensity: 0 }
    : { speed: 1.6, rotationIntensity: 0.5, floatIntensity: 0.9 };

  return (
    <>
      <ambientLight intensity={0.35} />
      <directionalLight position={[4, 6, 5]} intensity={2.4} />
      <directionalLight position={[-5, -2, 3]} intensity={0.6} color={light} />
      <Environment resolution={256}>
        <Lightformer form="rect" intensity={3} position={[0, 5, -3]} scale={[12, 2, 1]} />
        <Lightformer form="circle" intensity={2.5} position={[-6, 1, 2]} scale={4} color={light} />
        <Lightformer form="rect" intensity={1.6} position={[6, -1, 3]} scale={[3, 7, 1]} />
        <Lightformer form="ring" intensity={1.2} position={[0, 0, 8]} scale={6} />
      </Environment>

      <group ref={group}>
        <Float {...floatProps}>
          <mesh geometry={geometry}>
            <meshPhysicalMaterial
              color={accent}
              roughness={0.2}
              metalness={0.15}
              clearcoat={1}
              clearcoatRoughness={0.08}
            />
          </mesh>
        </Float>

        <mesh ref={ring} rotation={[1.25, 0.15, 0]}>
          <torusGeometry args={[2.25, 0.012, 16, 160]} />
          <meshBasicMaterial color={light} transparent opacity={0.7} />
        </mesh>

        <Float {...floatProps} speed={floatProps.speed * 1.3}>
          <mesh position={[2, 1.2, -0.6]}>
            <sphereGeometry args={[0.34, 48, 48]} />
            <meshPhysicalMaterial color="#ffffff" roughness={0.12} clearcoat={1} />
          </mesh>
        </Float>
        <Float {...floatProps} speed={floatProps.speed * 0.9}>
          <mesh position={[-2.1, -0.8, 0.5]} rotation={[0.6, 0.4, 0]}>
            <torusGeometry args={[0.32, 0.12, 32, 64]} />
            <meshPhysicalMaterial color={light} roughness={0.25} clearcoat={1} />
          </mesh>
        </Float>
        <Float {...floatProps} speed={floatProps.speed * 1.1}>
          <RoundedBox
            args={[0.6, 0.6, 0.6]}
            radius={0.12}
            position={[-1.7, 1.45, -1]}
            rotation={[0.5, 0.7, 0.2]}
          >
            <meshPhysicalMaterial
              color="#ffffff"
              transmission={1}
              thickness={0.6}
              roughness={0.08}
              ior={1.4}
            />
          </RoundedBox>
        </Float>
        <Float {...floatProps} speed={floatProps.speed * 1.4}>
          <mesh position={[1.6, -1.35, 0.9]}>
            <sphereGeometry args={[0.18, 32, 32]} />
            <meshPhysicalMaterial color={accent} roughness={0.2} clearcoat={1} />
          </mesh>
        </Float>
      </group>

      <ContactShadows
        position={[0, -1.75, 0]}
        opacity={0.25}
        scale={5}
        blur={2.8}
        far={4}
      />
    </>
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
        camera={{ position: [0, 0, 7.4], fov: 35 }}
        gl={{ antialias: true, alpha: true }}
        frameloop={visible ? "always" : "never"}
        eventSource={document.getElementById("root")}
        eventPrefix="client"
      >
        <Scene template={template} still={still} />
      </Canvas>
    </div>
  );
}
