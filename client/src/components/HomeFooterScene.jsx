import React from 'react'
import { MclarenHeavy } from './MclarenHeavy'
import { OrbitControls } from '@react-three/drei'

const HomeFooterScene = () => {
  return (
    <>
    <ambientLight intensity={1} />
    <directionalLight position={[0, 10, 0]} intensity={2} />
    <perspectiveCamera/>
    <OrbitControls 
    enableZoom={false}
    minPolarAngle={Math.PI / 3}  // Restrict vertical movement (downward limit)
    maxPolarAngle={Math.PI / 2}  // Restrict vertical movement (upward limit)
    minAzimuthAngle={-Math.PI}  // Restrict horizontal rotation (left limit)
    maxAzimuthAngle={Math.PI }   // Restrict horizontal rotation (right limit)
    />


    <MclarenHeavy position={[0,-1,0]} rotation={[0,Math.PI,0]}/>
    </>
  )
}

export default HomeFooterScene