import { ViewerApp, AssetManagerPlugin, addBasePlugins, PopmotionPlugin, AssetImporter } from "webgi";

let viewer: ViewerApp;
export async function setupViewer() {
  // Initialize the viewer
  viewer = new ViewerApp({
    canvas: document.getElementById("webgi-canvas") as HTMLCanvasElement,
    useRgbm: true,
    useGBufferDepth: true,
    isAntialiased: false,
  });

  viewer.renderer.displayCanvasScaling = Math.min(window.devicePixelRatio, 1);

  await addBasePlugins(viewer);

  const manager = await viewer.addPlugin(AssetManagerPlugin);

  const importer = manager.importer as AssetImporter;

  const popmotion = await viewer.addPlugin(PopmotionPlugin);

  await viewer.renderer.refreshPipeline();

  const models = await manager.addFromPath("/cube.glb");
  viewer.scene.setEnvironment(
    await manager.importer!.importSingle({
      path: "/env.hdr",
    })
  );

  // const uiPlugin = await viewer.addPlugin(TweakpaneUiPlugin);
  // uiPlugin.setupPlugins<IViewerPlugin>(
  //   TonemapPlugin,
  //   CanvasSnipperPlugin,
  //   CameraViewPlugin
  // );
}
export function disposeViewer() {
  viewer.scene.disposeSceneModels();
  viewer.scene.dispose();
  viewer.renderer.dispose();
  viewer.dispose();
}
