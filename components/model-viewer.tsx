"use client";

import { Suspense, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import * as THREE from "three";
import {
  OrbitControls,
  Stage,
  useGLTF,
  Html,
  useProgress,
} from "@react-three/drei";

function Model({ src }: { src: string }) {
  const { scene } = useGLTF(src);
  // Rhino is Z-up; rotate into glTF/three Y-up. Tune material so the massing
  // reads with more contrast against the warm background.
  useMemo(() => {
    scene.traverse((o) => {
      const mesh = o as THREE.Mesh;
      if (mesh.isMesh) {
        mesh.castShadow = true;
        mesh.receiveShadow = true;
        const mat = mesh.material as THREE.MeshStandardMaterial;
        if (mat) {
          mat.color = new THREE.Color("#a59c90");
          mat.roughness = 0.78;
          mat.metalness = 0;
          mat.flatShading = false;
          mat.needsUpdate = true;
        }
      }
    });
  }, [scene]);
  return <primitive object={scene} rotation={[-Math.PI / 2, 0, 0]} />;
}

function Loader() {
  const { progress } = useProgress();
  return (
    <Html center>
      <span className="label whitespace-nowrap text-muted">
        Loading model… {Math.round(progress)}%
      </span>
    </Html>
  );
}

export function ModelViewer({ src }: { src: string }) {
  return (
    <Canvas
      shadows
      dpr={[1, 2]}
      camera={{ fov: 38, position: [6, 4, 9] }}
      gl={{ antialias: true, preserveDrawingBuffer: false }}
    >
      <color attach="background" args={["#f1eee7"]} />
      <Suspense fallback={<Loader />}>
        <Stage
          intensity={0.6}
          environment="city"
          adjustCamera={1.1}
          shadows={{ type: "contact", opacity: 0.6, blur: 2.2 }}
        >
          <Model src={src} />
        </Stage>
      </Suspense>
      <OrbitControls
        makeDefault
        enablePan={false}
        autoRotate
        autoRotateSpeed={0.5}
        minDistance={2}
        maxDistance={40}
        minPolarAngle={0.2}
        maxPolarAngle={Math.PI / 2.05}
      />
    </Canvas>
  );
}

useGLTF.preload("/models/duplexes.glb");
