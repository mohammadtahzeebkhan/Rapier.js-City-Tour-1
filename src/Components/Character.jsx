import React, { useEffect, useRef, useState } from "react";
import { useGLTF, useAnimations } from "@react-three/drei";
import CharacterModel from '../assets/Character/Character.glb';
import { CapsuleCollider, RigidBody } from "@react-three/rapier";
import { Vector3 } from "three";

const Character = () => {
  const group = useRef();
  const { scene, animations } = useGLTF(CharacterModel);
  const { actions } = useAnimations(animations, group);

  // State to store character movement
  const [velocity, setVelocity] = useState(new Vector3(0, 0, 0));
  
  // Speed of character movement
  const speed = 0.1;
  
  useEffect(() => {
    const handleKeyDown = (event) => {
      let newVelocity = velocity.clone();

      // Arrow keys for movement
      switch (event.key) {
        case "ArrowUp":
          newVelocity.z = -speed; // Move forward
          break;
        case "ArrowDown":
          newVelocity.z = speed; // Move backward
          break;
        case "ArrowLeft":
          newVelocity.x = -speed; // Move left
          break;
        case "ArrowRight":
          newVelocity.x = speed; // Move right
          break;
        default:
          break;
      }
      setVelocity(newVelocity);
    };

    const handleKeyUp = (event) => {
      // Stop movement when key is released
      if (
        event.key === "ArrowUp" ||
        event.key === "ArrowDown" ||
        event.key === "ArrowLeft" ||
        event.key === "ArrowRight"
      ) {
        setVelocity(new Vector3(0, 0, 0)); // Stop moving
      }
    };

    // Listen for key down and key up events
    window.addEventListener("keydown", handleKeyDown);
    window.addEventListener("keyup", handleKeyUp);

    // Cleanup event listeners
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      window.removeEventListener("keyup", handleKeyUp);
    };
  }, [velocity]);

  // Update the position based on the velocity
  useEffect(() => {
    if (group.current) {
      group.current.position.add(velocity);
    }
  }, [velocity]);

  return (
    <RigidBody colliders={false} lockRotations>
      <ambientLight />
      <group  dispose={null}>
        <primitive object={scene} rotation={[0, -Math.PI, 0]} position={[0, 3.005, 0]} />
      </group>
      <CapsuleCollider args={[0.7, 0.3]} position={[0, 4, 0]} />
    </RigidBody>
  );
};

export default Character;
