import { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Box } from '@react-three/drei';

function RotatingCube() {
  const meshRef = useRef();

  useFrame((state, delta) => {
    meshRef.current.rotation.x += delta * 0.5;
    meshRef.current.rotation.y += delta * 0.5;
  });

  return (
    <Box
      ref={meshRef}
      args={[3, 3, 3]}
      scale={[1, 1, 1]}
    >
      <meshStandardMaterial
        color="#646cff"
        opacity={0.5}
        transparent
        metalness={0.8}
        roughness={0.2}
      />
    </Box>
  );
}

export default function FloatingCube() {
  return (
    <div className="absolute right-0 top-1/2 -translate-y-1/2 w-96 h-96">
      <Canvas camera={{ position: [5, 5, 5] }}>
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} />
        <RotatingCube />
      </Canvas>
    </div>
  );
}