import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';


const scene = new THREE.Scene();

// Создаем камеру
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.set(0, 2, 5);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('scene-container').appendChild(renderer.domElement);

const geometry = new THREE.BoxGeometry();
const material = new THREE.MeshStandardMaterial({ color: 0x00ff00, metalness: 0.7, roughness: 0.2 });
const cube = new THREE.Mesh(geometry, material);
scene.add(cube);

const ambientLight = new THREE.AmbientLight(0x404040);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
directionalLight.position.set(1, 1, 1);
scene.add(directionalLight);

const animate = () => {
    requestAnimationFrame(animate);

    cube.position.x += 0.01;

    if (cube.position.x > 5) {
        cube.position.x = -5;
    }

    renderer.render(scene, camera);
};


// Создаем плоскость
const planeGeometry = new THREE.PlaneGeometry(100, 100, 1, 1); // Ширина и высота плоскости
const planeMaterial = new THREE.MeshBasicMaterial({ color: 0xffffff }); // Белый материал
const plane = new THREE.Mesh(planeGeometry, planeMaterial);

// Повернем плоскость, чтобы она была горизонтальной
plane.rotation.x = -Math.PI / 2;

// Позиционируем плоскость ниже куба, чтобы она выглядела как пол
plane.position.y = -1;

scene.add(plane);

animate();

// Создаем управление для камеры
const controls = new OrbitControls(camera, renderer.domElement);