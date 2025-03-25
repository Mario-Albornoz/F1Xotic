import { Float, OrthographicCamera } from "@react-three/drei";
import { useRef } from "react";
import * as THREE from "three";
import { useThree } from "@react-three/fiber"; // Import useThree hook

import { Mclaren } from "./Mclaren";
import { useFrame } from "@react-three/fiber";
import { Sphere } from "./Sphere";
import { Square } from "./Square";
import { MclarenHeavy } from "./MclarenHeavy";

// Create loading spinner
const LoadingSpinner = () => <mesh><sphereGeometry /><meshStandardMaterial color="gray" /></mesh>;

export const HomeScene = () => {
  const rotation_speed = 0.1;
  const spinningObject = useRef();
  const velocities = useRef(new Map());
  
  // use raycasting to track the mouse position
  const pointer = new THREE.Vector2();
  const raycaster = new THREE.Raycaster();

  // Use `useThree` hook to access the camera and scene
  const { camera, scene} = useThree();

  const getScreenBounds = () =>{
    const aspect = screen.width / screen.height
    const viewSize = camera.zoom;
    const normalizationForObjectScale = objectScale/2;
    const adjustTopBottomEdge = 0.5
    return {
      left: (-viewSize * aspect) + normalizationForObjectScale,
      right: (viewSize * aspect) - normalizationForObjectScale,
      top: (viewSize) - normalizationForObjectScale + adjustTopBottomEdge,
      bottom: (-viewSize)+ normalizationForObjectScale - adjustTopBottomEdge,
      
    };
  };

  

  const applyForce = (object, force) => {
    if (!velocities.current.has(object)){
      velocities.current.set(object, new THREE.Vector3());
    }
    velocities.current.get(object).add(force);
  }

  const onMouseMove = (e) => {
    // If camera or scene is undefined, stop the function
    if (!camera || !scene) {
      console.error("Camera or Scene is undefined");
      return;
    }

    // Calculate pointer position in device coordinates (-1 to +1)
    pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
    pointer.y = -(e.clientY / window.innerHeight) * 2 + 1;

    // Set the raycaster using the camera
    raycaster.setFromCamera(pointer, camera);
    const intersects = raycaster.intersectObjects(scene.children)

    if (intersects.length > 0) {
      const object = intersects[0].object;
      
      // Compute push force direction
      const forceDirection = new THREE.Vector3(
        object.position.x - pointer.x * 5,
        object.position.y - pointer.y * 5, 
        0

      ).normalize().multiplyScalar(0.02); // Scale force

      applyForce(object, forceDirection);
    }
  };

  // useFrame((_state, delta) =>{
  //   spinningObject.current.rotation.x += delta * rotation_speed;
  //   spinningObject.current.rotation.y += delta * rotation_speed;
  // })
  useFrame(() => {
    const bounds = getScreenBounds();

    velocities.current.forEach((velocity, object) => {
      object.position.add(velocity); // Apply velocity

      //make objects rotate
      object.rotation.x += Math.random() * 0.02;
      object.rotation.y += Math.random() * 0.02;

      // Boundary detection and bouncing effect
      if (object.position.x < bounds.left || object.position.x > bounds.right) {
        object.position.x = Math.max(bounds.left, Math.min(object.position.x, bounds.right));
        velocity.x *= -0.9; // Reverse X direction with damping
      }
      if (object.position.y < bounds.bottom || object.position.y > bounds.top) {
        object.position.y = Math.max(bounds.bottom, Math.min(object.position.y, bounds.top));
        velocity.y *= -0.9; // Reverse Y direction with damping
      }

      velocity.multiplyScalar(0.99); // Apply friction
    });
  });

  // Add mousemove event listener
  window.addEventListener("mousemove", onMouseMove);

  //const for scale on objects
  const objectScale = 10;
  const squareScale = 20;
  return (
    <>
      {/* the ratio between position at z and zoom needs to be position at z / 2.35294118 */}
      <OrthographicCamera makeDefault position={[0, 0, 20]} zoom={8.5} />
      <ambientLight intensity={1} />
      <directionalLight position={[0, 10, 0]} intensity={2} />
      <group>
        {/* Place car models into flotation animation */}
        <Float floatIntensity={10} speed={4}>

          
          
          {/* un commment mclaren model to see the car load up in the home
              though not functional given that the onMouseMove function is interacting with each individual mesh in the model
              intead of interacting with the group, therfore the model break appart upon touch
              feel free to try it, it does create an interesting effect

              - To do: Optimize jsx to create a single mesh that the function can interact or join the objects in blender to create a single instance */}
          
          {/* Optimize model by decreasing the number of polygons in the model through blender, for performance on loading */}
          {/* <Mclaren ref={spinningObject} scale={6} position={[50,1,-1]} /> */}


          {/* Mclaren heavy version model regular meshes and heavy material loaded, causes decrease in performance*/}  
          {/* <MclarenHeavy scale={objectScale - 6} position={[50,1,-1]}/> */}

          {/* Load sphere models */}
          <Sphere ref={spinningObject} scale={objectScale} position={[0, 0, -2]} />
          <Square scale={objectScale} position={[1,1,-1]} />
          <Sphere ref={spinningObject} scale={objectScale} position={[0, 0, -2]} />
          <Square ref={spinningObject} scale={objectScale} position={[0, 0, -2]} />
          <Sphere ref={spinningObject} scale={objectScale} position={[0, 0, -2]} />
          <Square ref={spinningObject} scale={objectScale} position={[0, 0, -2]} />
          <Sphere ref={spinningObject} scale={objectScale} position={[0, 0, -2]} />
          <Square ref={spinningObject} scale={objectScale} position={[0, 0, -2]} />
          <Sphere ref={spinningObject} scale={objectScale} position={[-2, 0, -2]} />
          <Square ref={spinningObject} scale={objectScale} position={[-2, 0, -2]} />
          <Square ref={spinningObject} scale={objectScale} position={[-2, 0, -2]} />
          <Sphere ref={spinningObject} scale={objectScale} position={[-2, 0, -2]} />
          <Square ref={spinningObject} scale={objectScale} position={[-2, 0, -2]} />
          <Square ref={spinningObject} scale={objectScale} position={[-2, 0, -2]} />
          <Sphere ref={spinningObject} scale={objectScale} position={[-2, 0, -2]} />
          <Square ref={spinningObject} scale={objectScale} position={[-2, 0, -2]} />
        </Float>
      </group>
    </>
  );
};

export default HomeScene;
