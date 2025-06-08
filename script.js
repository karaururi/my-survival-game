import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

// シーン、カメラ、レンダラーの作成
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container').appendChild(renderer.domElement);

// プレイヤーの作成
let player;
const playerLoader = new GLTFLoader();
playerLoader.load('assets/models/player.glb', (gltf) => {
    player = gltf.scene;
    scene.add(player);
    player.position.set(0, 0, 0);
});

// 敵の作成
let enemies = [];
const enemyLoader = new GLTFLoader();

// 数字ギミックの作成
let numberGimmicks = [];

// 攻撃力
let attackPower = 10;
let health = 100;

// スクロール速度
const scrollSpeed = 0.1;

// プレイヤーの移動処理
let isSwiping = false;
let startX = 0;

document.addEventListener('touchstart', (event) => {
    isSwiping = true;
    startX = event.touches[0].clientX;
});

document.addEventListener('touchmove', (event) => {
    if (!isSwiping) return;
    const touch = event.touches[0];
    const currentX = touch.clientX;
    const deltaX = currentX - startX;
    startX = currentX;

    player.position.x += deltaX * 0.01;
    player.position.x = Math.max(-5, Math.min(5, player.position.x)); // 画面端で移動制限
});

document.addEventListener('touchend', () => {
    isSwiping = false;
});

// アニメーションループ
function animate() {
    requestAnimationFrame(animate);

    // カメラの移動
    camera.position.z -= scrollSpeed;

    // 敵の生成
    if (Math.random() < 0.01) {
        enemyLoader.load('assets/models/enemy.glb', (gltf) => {
            const enemy = gltf.scene;
            enemy.position.set(Math.random() * 10 - 5, Math.random() * 5 - 2.5, -10);
            enemies.push(enemy);
            scene.add(enemy);
        });
    }

    // 敵の移動と削除
    enemies.forEach(enemy => {
        enemy.position.z += scrollSpeed;
        if (enemy.position.z > 10) {
            scene.remove(enemy);
            enemies = enemies.filter(e => e !== enemy);
        }
    });

    renderer.render(scene, camera);
}

animate();
