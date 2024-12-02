import React from "react";
import { useGLTF } from "@react-three/drei";
import { RigidBody } from "@react-three/rapier";
import HallModel from '../assets/Hall/Hall.glb'

const Hall = () => {

  const { scene } = useGLTF(HallModel);

  return (
    <RigidBody type="fixed" colliders="trimesh">
      {/* Render the GLTF model */}
      <primitive object={scene} />
    </RigidBody>
  );
};

export default Hall;
