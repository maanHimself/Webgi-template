import dynamic from "next/dynamic";

//@ts-ignore
const DynamicHeader = dynamic(() => import("../components/Webgi.tsx"), {
  ssr: false,
});

export default function useWebgi() {
  return (
    <>
      <DynamicHeader />;
    </>
  );
}
