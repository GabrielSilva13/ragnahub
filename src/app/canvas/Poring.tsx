import { Suspense } from 'react'

import { Canvas } from '@react-three/fiber'
import { OrbitControls, Preload, useGLTF } from '@react-three/drei'
import { Loader } from '../components/Loader'

const Computers = () => {
  const poring = useGLTF('/poring/scene.gltf')

  return (
    <mesh>
      <hemisphereLight intensity={1.5} groundColor="hotpink" />
      <pointLight intensity={1} />
      <spotLight
        position={[-20, 50, 10]}
        angle={0.12}
        penumbra={1}
        intensity={1}
        castShadow
        shadow-mapSize={1024}
      />
      <primitive
        object={poring.scene}
        scale={10}
        position={[-0.4, 0, 2]}
        rotation={[-0.01, -0.1, -0.1]}
      />
    </mesh>
  )
}

export const PoringCanvas = () => {
  return (
    <Canvas
      frameloop="demand"
      shadows
      camera={{ position: [10, 4, 50], fov: 25 }}
      gl={{ preserveDrawingBuffer: true }}
    >
      <Suspense fallback={<Loader />}>
        <OrbitControls
          enableZoom={false}
          maxPolarAngle={Math.PI / 2}
          minPolarAngle={Math.PI / 2}
        />
        <Computers />
      </Suspense>

      <Preload all />
    </Canvas>
  )
}
