/*
Auto-generated by: https://github.com/pmndrs/gltfjsx
Command: npx gltfjsx@6.5.3 public/models/mclaren_mp45__formula_1.glb 
Author: dark_igorek (https://sketchfab.com/dark_igorek)
License: CC-BY-4.0 (http://creativecommons.org/licenses/by/4.0/)
Source: https://sketchfab.com/3d-models/mclaren-mp45-formula-1-3059d4532ecd48ca8da41e1cac971f22
Title: McLaren MP4/5 || Formula 1
*/

import React from 'react'
import { useGLTF } from '@react-three/drei'

export function MclarenHeavy(props) {
  const { nodes, materials } = useGLTF('./models/mclaren_mp45__formula_1.glb')
  return (
    <group {...props} dispose={null}>
      <group position={[0, -0.319, 0]}>
        <group position={[0, 0.319, 0]}>
          <mesh geometry={nodes.Object_7.geometry} material={materials.wheels_mat} />
          <mesh geometry={nodes.Object_8.geometry} material={materials.bottom_details_mat} />
        </group>
        <group position={[0, 0.319, 0]}>
          <group position={[0, 0.734, 0.908]}>
            <mesh geometry={nodes.Object_18.geometry} material={materials.interior_mat} />
            <mesh geometry={nodes.Object_19.geometry} material={materials.glass_details_mat} />
            <mesh geometry={nodes.Object_21.geometry} material={materials.interior_mat} position={[0, -0.734, -0.901]} />
            <mesh geometry={nodes.Object_23.geometry} material={materials.interior_mat} position={[0, 0.097, -0.065]} rotation={[-1.253, 0, 0]} />
          </group>
          <mesh geometry={nodes.Object_12.geometry} material={materials.body_mat} />
          <mesh geometry={nodes.Object_13.geometry} material={materials.body_mat} />
          <mesh geometry={nodes.Object_14.geometry} material={materials.wheels_mat} />
          <mesh geometry={nodes.Object_15.geometry} material={materials.bottom_details_mat} />
          <mesh geometry={nodes.Object_16.geometry} material={materials.glass_details_mat} />
        </group>
        <mesh geometry={nodes.Object_4.geometry} material={materials.bottom_details_mat} />
        <mesh geometry={nodes.Object_5.geometry} material={materials.wheels_mat} />
        <mesh geometry={nodes.Object_10.geometry} material={materials.wheels_mat} position={[0, 0.829, -2.749]} />
        <mesh geometry={nodes.Object_25.geometry} material={materials.wheels_mat} position={[0, 0.319, 0]} />
        <mesh geometry={nodes.Object_27.geometry} material={materials.wheels_mat} position={[0, 0.789, 2.056]} />
      </group>
    </group>
  )
}

useGLTF.preload('./models/mclaren_mp45__formula_1.glb')
