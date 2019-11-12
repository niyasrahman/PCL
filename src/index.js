import ReactDOM from "react-dom";
import React, { useRef } from "react";
import { Canvas, extend, useFrame, useThree } from "react-three-fiber";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Particles } from "./pointcloud";
import "./styles.css";

extend({ OrbitControls });

function Controls() {
  const controls = useRef();
  const { camera, gl } = useThree();
  useFrame(() => controls.current.update());
  return (
    <orbitControls
      ref={controls}
      args={[camera, gl.domElement]}
      enableDamping
      dampingFactor={0.1}
      rotateSpeed={0.5}
    />
  );
}
function App() {
  return (
    <div className="App">
      <Canvas
        style={{ background: "#333" }}
        orthographic
        camera={{ zoom: 60 }}
        raycaster={{ params: { Points: { threshold: 0.2 } } }}
      >
        <Particles pointCount={2000} />
        <Controls />
      </Canvas>
    </div>
  );
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
