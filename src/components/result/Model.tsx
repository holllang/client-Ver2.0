import { Html, OrbitControls } from '@react-three/drei';
import { Canvas } from '@react-three/fiber';
import { useRouter } from 'next/router';
import { useEffect, useRef, useState } from 'react';
import { Object3D } from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

import Lights from './Lights';

interface ModalProps {
  isLoading: boolean;
  setIsLoading: (scene: any) => void;
  uri: string;
}

export default function Model({ uri, isLoading, setIsLoading }: ModalProps) {
  const controlsRef = useRef<any>(null);
  const groupRef = useRef<any>({ rotation: { x: 0, y: 0, z: 0 } });
  const [model, setModel] = useState<Object3D | null>(null);

  if (model !== null && isLoading) {
    setIsLoading(false);
  }

  useEffect(() => {
    const loader = new GLTFLoader();
    loader.load(uri, async (gltf: any) => {
      setModel(gltf.scene);
    });
  }, []);

  useEffect(() => {
    if (!controlsRef.current || !groupRef.current) return;
    controlsRef.current.addEventListener('change', () => {
      groupRef.current.rotation.y += 0.01;
    });
    return () => {
      controlsRef.current.removeEventListener('change', () => {});
    };
  }, [controlsRef, groupRef]);

  const view = uri.includes('ISFP') || uri.includes('ESTJ') ? 4.5 : 4;

  return (
    <Canvas camera={{ position: [0, 0, view] }}>
      <Lights />
      <OrbitControls ref={controlsRef} />
      <directionalLight position={[-1, 0, 1]} intensity={0.5} />
      <meshStandardMaterial attach="material" color={0xa3b18a} />
      {model ? (
        <>
          <group ref={groupRef} position={[0, 0, 0]} dispose={null}>
            <primitive name="Object_0" object={model} />
          </group>
        </>
      ) : (
        <Html>Loading...</Html>
      )}
    </Canvas>
  );
}
