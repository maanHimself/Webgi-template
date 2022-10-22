import {
  ViewerApp,
  AssetManagerPlugin,
  TonemapPlugin,
  addBasePlugins,
  TweakpaneUiPlugin,
  AssetManagerBasicPopupPlugin,
  CanvasSnipperPlugin,
  IViewerPlugin,
  CameraViewPlugin,
  PlaneGeometry,
  MeshBasicMaterial,
  Mesh,
  Clock,
  PopmotionPlugin,
  EasingFunctions,
  AssetImporter,
  Object3DModel,
  MeshStandardMaterial,
  LinearEncoding,
  GBufferPlugin,
  ProgressivePlugin,
  SSRPlugin,
  SSAOPlugin,
  FrameFadePlugin,
  GroundPlugin,
  BloomPlugin,
  TemporalAAPlugin,
  RandomizedDirectionalLightPlugin,
} from "webgi";
export default async function setupViewer() {
  // Initialize the viewer
  const viewer = new ViewerApp({
    canvas: document.getElementById("webgi-canvas") as HTMLCanvasElement,
    useRgbm: true,
    useGBufferDepth: true,
    isAntialiased: false,
  });

  viewer.renderer.displayCanvasScaling = Math.min(window.devicePixelRatio, 1);

  await addBasePlugins(viewer);
  const manager = await viewer.addPlugin(AssetManagerPlugin);
  const importer = manager.importer as AssetImporter;

  importer.addEventListener("onStart", (ev) => {
    // onUpdate()
  });

  importer.addEventListener("onProgress", (ev) => {
    const progressRatio = ev.loaded / ev.total;
    console.log("downloaded : ", progressRatio);
  });

  importer.addEventListener("onLoad", (ev) => {
    console.log("doneeeeeeeeeeeee");
  });

  // await viewer.addPlugin(CameraViewPlugin);

  const popmotion = await viewer.addPlugin(PopmotionPlugin);
  await viewer.renderer.refreshPipeline();

  const models = await manager.addFromPath("/scenePC.glb");

  // const uiPlugin = await viewer.addPlugin(TweakpaneUiPlugin);
  // uiPlugin.setupPlugins<IViewerPlugin>(
  //   TonemapPlugin,
  //   CanvasSnipperPlugin,
  //   CameraViewPlugin
  // );
}
