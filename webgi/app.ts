import {
  ViewerApp,
  AssetManagerPlugin,
  addBasePlugins,
  PopmotionPlugin,
  AssetImporter,
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

  // await viewer.addPlugin(CameraViewPlugin);

  const popmotion = await viewer.addPlugin(PopmotionPlugin);
  await viewer.renderer.refreshPipeline();

  const models = await manager.addFromPath(
    "https://demo-assets.pixotronics.com/pixo/gltf/cube.glb"
  );

  viewer.scene.setEnvironment(
    await manager.importer!.importSingle({
      path: "https://demo-assets.pixotronics.com/pixo/hdr/p360-01.hdr",
    })
  );

  // const uiPlugin = await viewer.addPlugin(TweakpaneUiPlugin);
  // uiPlugin.setupPlugins<IViewerPlugin>(
  //   TonemapPlugin,
  //   CanvasSnipperPlugin,
  //   CameraViewPlugin
  // );
}
