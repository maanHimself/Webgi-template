import { useEffect } from "react";
import setupViewer from "../webgi/app";

export default function Home() {
  let dispose: () => void;

  useEffect(() => {
    let setup = setupViewer();

    setup.then((callback) => {
      dispose = callback;
    });

    return () => {
      dispose();
    };
  }, []);

  return (
    <div id="webgi-canvas-container" className="w-screen h-screen top-0 left-0 fixed">
      <canvas id="webgi-canvas" className="w-screen h-screen"></canvas>
    </div>
  );
}
