import { useEffect } from "react";
import setupViewer from "../threejs/WebgiAPP";

export default function Home() {
  useEffect(() => {
    setupViewer();
  }, []);

  return (
    <div id="webgi-canvas-container">
      <canvas id="webgi-canvas"></canvas>
    </div>
  );
}
