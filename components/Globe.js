// components/Globe.js
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import { useRef } from 'react';

export default function Globe() {
  return (
    <div style={{ height: '400px', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 0 20px #0ff' }}>
      <Canvas camera={{ position: [0, 0, 3] }}>
        <ambientLight intensity={0.4} />
        <pointLight position={[2, 3, 2]} intensity={1.5} />
        <Stars />
        <Venus />
        <OrbitControls enableZoom={false} autoRotate autoRotateSpeed={0.75} />
      </Canvas>
    </div>
  );
}

function Venus() {
  const mesh = useRef();

  return (
    <mesh ref={mesh}>
      <sphereGeometry args={[1, 64, 64]} />
      <meshStandardMaterial
        map={useVenusTexture()}
        roughness={1}
        metalness={0.2}
      />
    </mesh>
  );
}

function useVenusTexture() {
  const texture = new THREE.TextureLoader().load(
    'https://www.solarsystemscope.com/textures/download/2k_venus_surface.jpg'
  );
  return texture;
}
