import React, { useRef, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Float, Environment } from '@react-three/drei';
import * as THREE from 'three';
import type { MotionValue } from 'framer-motion';

function Brick({
  position,
  rotation,
  scale,
  color,
  roughness = 0.82,
  speed = 0.06,
}: {
  position: [number, number, number];
  rotation: [number, number, number];
  scale: number;
  color: string;
  roughness?: number;
  speed?: number;
}) {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = rotation[1] + state.clock.elapsedTime * speed;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.12} floatIntensity={0.5}>
      <mesh ref={ref} position={position} rotation={rotation} scale={scale} castShadow receiveShadow>
        <boxGeometry args={[1.2, 0.55, 0.65]} />
        <meshStandardMaterial color={color} roughness={roughness} metalness={0.08} />
      </mesh>
    </Float>
  );
}

function CameraRig({
  mouseX,
  mouseY,
}: {
  mouseX?: MotionValue<number>;
  mouseY?: MotionValue<number>;
}) {
  const { camera } = useThree();
  const target = useRef({ x: 0, y: 0 });

  useFrame(() => {
    const mx = mouseX?.get() ?? 0;
    const my = mouseY?.get() ?? 0;
    target.current.x += (mx * 0.35 - target.current.x) * 0.04;
    target.current.y += (-my * 0.2 - target.current.y) * 0.04;
    camera.position.x = target.current.x;
    camera.position.y = target.current.y + 0.15;
    camera.lookAt(0, 0, 0);
  });

  return null;
}

function Scene({
  mouseX,
  mouseY,
}: {
  mouseX?: MotionValue<number>;
  mouseY?: MotionValue<number>;
}) {
  return (
    <>
      <fog attach="fog" args={['#1a1816', 6, 18]} />
      <CameraRig mouseX={mouseX} mouseY={mouseY} />
      <ambientLight intensity={0.35} color="#e8e2d6" />
      <directionalLight position={[5, 8, 4]} intensity={1.1} color="#d4b896" castShadow />
      <directionalLight position={[-4, 3, 2]} intensity={0.35} color="#3d5c4a" />
      <pointLight position={[2, 1, 3]} intensity={0.6} color="#c9a35a" distance={10} />
      <spotLight
        position={[0, 6, 2]}
        angle={0.35}
        penumbra={1}
        intensity={0.9}
        color="#e8dcc8"
        castShadow
      />
      <Brick position={[-1.4, 0.1, 0.2]} rotation={[0.1, 0.4, 0.05]} scale={1.05} color="#6b5344" />
      <Brick position={[1.2, -0.35, -0.3]} rotation={[0.05, -0.35, 0.1]} scale={0.9} color="#4a6741" speed={0.05} />
      <Brick position={[0.25, 0.85, 0.15]} rotation={[-0.1, 0.55, 0]} scale={0.72} color="#8b7355" speed={0.07} />
      <Brick position={[-0.35, -0.65, -0.55]} rotation={[0.15, 0.15, 0.05]} scale={0.52} color="#5c4a3a" speed={0.04} />
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1.15, 0]} receiveShadow>
        <planeGeometry args={[14, 14]} />
        <meshStandardMaterial color="#1a1816" roughness={0.92} metalness={0.15} />
      </mesh>
      <Environment preset="sunset" />
    </>
  );
}

interface EcoBricksSceneProps {
  className?: string;
  mouseX?: MotionValue<number>;
  mouseY?: MotionValue<number>;
}

export const EcoBricksScene: React.FC<EcoBricksSceneProps> = ({
  className = '',
  mouseX,
  mouseY,
}) => (
  <div className={`h-full w-full ${className}`}>
    <Canvas
      camera={{ position: [0, 0.2, 6], fov: 36 }}
      dpr={[1, 1.75]}
      gl={{ antialias: true, alpha: true }}
      shadows
      style={{ background: 'transparent' }}
    >
      <Suspense fallback={null}>
        <Scene mouseX={mouseX} mouseY={mouseY} />
      </Suspense>
    </Canvas>
  </div>
);

export default EcoBricksScene;
