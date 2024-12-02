import React from "react";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import { Physics } from "@react-three/rapier";
import Hall from "./Components/Hall";

const App = () => {
  return (
    <Canvas style={{height:"100vh"}}>
      {/* Add lighting */}
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />

      {/* Set up the physics world */}
     
      <Physics  debug={true} >
    
        <Hall />
      </Physics>

      {/* Camera controls */}
      <OrbitControls />
    </Canvas>
  );
};

export default App;
