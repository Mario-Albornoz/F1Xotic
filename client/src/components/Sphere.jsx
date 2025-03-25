import { useMemo } from "react";
import { useGLTF } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import * as THREE from "three";

export function Sphere(props) {
    
    const selectedMaterial = useMemo(
        () =>
          new THREE.MeshStandardMaterial({
            color: "red",
            roughness: 0.2,
            metalness: 0.1,
          }),
        []
      );

    return (
        <group {...props} dispose={null}> 
            <mesh material={selectedMaterial}>
                <sphereGeometry/>
                         
            </mesh>
        </group>
        
    )
}