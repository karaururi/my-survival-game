import * as THREE from 'three';

// シーン、カメラ、レンダラーの作成
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById('container').appendChild(renderer.domElement);

// プレイヤーの作成 (シンプルな立方体)
const playerGeometry = new THREE.BoxGeometry(1, 1, 1);
const playerMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const player = new THREE.Mesh(playerGeometry, playerMaterial);
scene.add(player);
player.position.set(0, 0, 0);

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
    renderer.render(scene, camera);
}

animate();
