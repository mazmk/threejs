import "./style.css";
import * as THREE from "./js/three-js-0.139.2/three";
import * as dat from "dat.gui";
import { OrbitControls } from "./js/three-js-0.139.2/OrbitControls";

console.log(OrbitControls);
var arr = [];
const gui = new dat.GUI();
const world = {
  plane: {
    width: 10,
  },
};
gui.add(world.plane, "width", 1, 5).onChange(() => {
  planeMesh.geometry.dispose();
  planeMesh.geometry = getPlane(world.plane.width);
});

const scene = new THREE.Scene();
console.log(scene);
const camera = new THREE.PerspectiveCamera(
  75,
  innerWidth / innerHeight,
  0.1,
  100
);
console.log(camera);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(innerWidth, innerHeight);
renderer.setPixelRatio(devicePixelRatio);

document.body.appendChild(renderer.domElement);

const material = new THREE.MeshBasicMaterial({ color: "wheat" });
const planeMaterial = new THREE.MeshPhongMaterial({
  color: 0xffffff,
  side: THREE.DoubleSide,
  flatShading: THREE.FlatShading,
});

const mesh = new THREE.Mesh(getBox(), material);
const planeMesh = new THREE.Mesh(getPlane(), planeMaterial);

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0, 0, 1);
const backLight = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(0, 0, -1);

scene.add(light);
scene.add(backLight);
scene.add(mesh);
scene.add(planeMesh);

camera.position.z = 2;

new OrbitControls(camera, renderer.domElement)
// camera.position.x = 2;
// camera.position.y = 2;
planeMesh.rotation.x = -0.9;
function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
  mesh.rotation.x += 0.01;
  // planeMesh.rotation.x += 0.01;
  mesh.rotation.y += 0.01;
  mesh.rotation.z += 0.01;
}

animate();

function getBox() {
  const boxGeometry = new THREE.BoxGeometry(1, 1, 1);
  return boxGeometry;
}

function getPlane(width = 5) {
  console.log(width);
  const planeGeometry = new THREE.PlaneGeometry(width, 5, 10, 10);
  const { array } = planeGeometry.attributes.position;

  for (let i = 0; i < array.length; i += 3) {
    const x = array[i];
    const y = array[i + 1];
    const z = array[i + 2];
    array[i] = x + Math.random() / 4;
    array[i + 1] = y + Math.random() / 4;
    array[i + 2] = z + Math.random() / 4;
  }

  return planeGeometry;
}
