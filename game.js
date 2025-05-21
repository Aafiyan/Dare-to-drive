let socket;
let mode = "";

function startGame(selectedMode) {
  mode = selectedMode;
  document.getElementById("mode-selector").style.display = "none";

  if (mode !== "solo") {
    socket = io("https://your-backend.onrender.com"); // <== UPDATE THIS WITH RENDER URL AFTER DEPLOY
    socket.on("connect", () => {
      console.log("Connected to server!");
      socket.emit("join", { mode });
    });
  }

  initGame();
}

// Game Scene Setup
let scene, camera, renderer, car;

function initGame() {
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera(75, window.innerWidth/window.innerHeight, 0.1, 1000);
  renderer = new THREE.WebGLRenderer({ canvas: document.getElementById("gameCanvas") });
  renderer.setSize(window.innerWidth, window.innerHeight);

  // Lighting
  const light = new THREE.DirectionalLight(0xffffff, 1);
  light.position.set(10, 20, 10);
  scene.add(light);

  // Road
  const road = new THREE.Mesh(
    new THREE.PlaneGeometry(200, 20),
    new THREE.MeshStandardMaterial({ color: 0x333333 })
  );
  road.rotation.x = -Math.PI / 2;
  scene.add(road);

  // Placeholder Car (a red box)
  const carGeo = new THREE.BoxGeometry(2, 1, 4);
  const carMat = new THREE.MeshStandardMaterial({ color: 0xff0000 });
  car = new THREE.Mesh(carGeo, carMat);
  car.position.y = 0.5;
  scene.add(car);

  camera.position.set(0, 5, 10);
  camera.lookAt(car.position);

  animate();
}

// Game Loop
function animate() {
  requestAnimationFrame(animate);
  car.position.z += 0.1; // Move forward always

  renderer.render(scene, camera);
}
