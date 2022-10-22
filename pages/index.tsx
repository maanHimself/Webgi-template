import { useEffect } from "react";
import ThreeContainer from "./ThreeComp";
import dynamic from "next/dynamic";

//@ts-ignore
const DynamicHeader = dynamic(() => import("../threejs/test.tsx"), {
  ssr: false,
});

export default function Home() {
  useEffect(() => {
    // DynamicHeader();
  }, []);

  return (
    <>
      <DynamicHeader />;
    </>
  );
}
