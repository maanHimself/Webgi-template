import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

export default (canvas: any) => {
  const scene = new THREE.Scene();

  const container = canvas;
  let width = container.offsetWidth;
  let height = container.offsetHeight;
  const renderer = new THREE.WebGLRenderer();
  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(width, height);
  renderer.setClearColor(0x000000, 1);
  renderer.outputEncoding = THREE.sRGBEncoding;

  container.appendChild(renderer.domElement);

  const camera = new THREE.PerspectiveCamera(
    70,
    window.innerWidth / window.innerHeight,
    0.001,
    1000
  );
  const controls = new OrbitControls(camera, renderer.domElement);

  //webgi

  // var frustumSize = 10;
  // var aspect = window.innerWidth / window.innerHeight;
  //  camera = new THREE.OrthographicCamera( frustumSize * aspect / - 2, frustumSize * aspect / 2, frustumSize / 2, frustumSize / - 2, -1000, 1000 );
  camera.position.set(0, 0, 2);
  let time = 0;

  addObjects();
  onWindowResize();
  render(0);
  setupResize();
  //  settings();

  function settings() {
    let settings = {
      progress: 0,
    };
    //  gui = new dat.GUI();
    //  gui.add( settings, "progress", 0, 1, 0.01);
  }

  function setupResize() {
    window.addEventListener("resize", onWindowResize);
  }

  function onWindowResize() {
    width = container.offsetWidth;
    height = container.offsetHeight;
    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
  }

  function addObjects() {
    const geometry = new THREE.PlaneGeometry(1, 1, 1, 1);

    const plane = new THREE.Mesh(
      geometry,
      new THREE.MeshBasicMaterial({ color: "#ffffff" })
    );
    scene.add(plane);
  }

  function render(time: number) {
    time += 0.05;
    // console.log(time)
    requestAnimationFrame(render);
    //  material.uniforms.time.value =  time;
    renderer.render(scene, camera);
  }
};
