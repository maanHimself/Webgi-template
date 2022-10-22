import React, { Component } from "react";
import Sketch from "../threejs/ThreeApp";

export default function ThreeContainer() {
  const threeRootElement = React.useRef(null);
  const path = React.useRef(null);
  const svg = React.useRef(null);
  React.useEffect(() => {
    Sketch(threeRootElement.current);
  }, []);

  return (
    <>
      <div className={"h-screen overflow-hidden"}>
        <div style={{ height: "100%" }} ref={threeRootElement} />
      </div>
    </>
  );
}
