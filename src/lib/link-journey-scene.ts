import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
export type JourneyScene = {
  setStage: (stage: number) => void;
  dispose: () => void;
};
type Pose = {
  x: number;
  y: number;
  z: number;
  rx: number;
  ry: number;
  rz: number;
  s: number;
};
const pose = (
  x: number,
  y: number,
  z: number,
  rx: number,
  ry: number,
  rz: number,
  s = 1,
): Pose => ({ x, y, z, rx, ry, rz, s });
// Local geometry and textures only. Nothing entered in the form reaches this scene.
export function createJourneyScene(
  canvas: HTMLCanvasElement,
  initial: number,
  onLost: () => void,
): JourneyScene {
  const renderer = new THREE.WebGLRenderer({
    canvas,
    alpha: true,
    antialias: true,
    powerPreference: 'low-power',
  });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 1.5));
  renderer.setClearColor(0x000000, 0);
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.35;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
  camera.position.set(0, 0.3, 10.8);
  camera.lookAt(0, 0, 0);
  scene.add(new THREE.HemisphereLight(0xf4f9ff, 0x526378, 3));
  const key = new THREE.DirectionalLight(0xffffff, 5);
  key.position.set(-3, 5, 7);
  scene.add(key);
  const rim = new THREE.DirectionalLight(0xb5c8ff, 3);
  rim.position.set(4, 1, -3);
  scene.add(rim);
  const world = new THREE.Group();
  scene.add(world);
  const objects: THREE.Group[] = [];
  const textures: THREE.Texture[] = [];
  const material = (color: string) =>
    new THREE.MeshStandardMaterial({ color, roughness: 0.3, metalness: 0.18 });
  function card(
    w: number,
    h: number,
    color: string,
    draw: (ctx: CanvasRenderingContext2D) => void,
  ) {
    const group = new THREE.Group();
    const box = new THREE.Mesh(
      new RoundedBoxGeometry(w, h, 0.13, 3, 0.08),
      material(color),
    );
    group.add(box);
    const surface = document.createElement('canvas');
    surface.width = 768;
    surface.height = Math.round((768 * h) / w);
    const ctx = surface.getContext('2d');
    if (!ctx) throw Error('Canvas unavailable');
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, surface.width, surface.height);
    ctx.save();
    ctx.scale(surface.width / 768, surface.height / 512);
    draw(ctx);
    ctx.restore();
    const texture = new THREE.CanvasTexture(surface);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.anisotropy = Math.min(4, renderer.capabilities.getMaxAnisotropy());
    textures.push(texture);
    const face = new THREE.Mesh(
      new THREE.PlaneGeometry(w - 0.07, h - 0.07),
      new THREE.MeshBasicMaterial({ map: texture, transparent: true }),
    );
    face.position.z = 0.073;
    group.add(face);
    return group;
  }
  const browser = card(3.7, 2.35, '#fffdf6', (ctx) => {
    ctx.fillStyle = '#d3dfeb';
    [42, 66, 90].forEach((x) => {
      ctx.beginPath();
      ctx.arc(x, 42, 7, 0, Math.PI * 2);
      ctx.fill();
    });
    ctx.fillStyle = '#172b3a';
    ctx.font = '500 32px sans-serif';
    ctx.fillText('A story worth sharing.', 40, 125);
    ctx.fillStyle = '#e7ecf0';
    ctx.fillRect(40, 170, 688, 90);
    ctx.fillStyle = '#526373';
    ctx.font = '22px monospace';
    ctx.fillText('example.com/a-long-story', 59, 225);
    ctx.fillStyle = '#d3dfeb';
    ctx.fillRect(40, 310, 470, 12);
    ctx.fillRect(40, 344, 360, 12);
    ctx.fillStyle = '#244bd8';
    ctx.fillRect(40, 403, 190, 52);
    ctx.fillStyle = '#fff';
    ctx.font = '22px sans-serif';
    ctx.fillText('one address', 66, 437);
  });
  world.add(browser);
  objects.push(browser);
  const chain = new THREE.Group();
  function ring(color: string) {
    const shape = new THREE.Shape();
    shape.moveTo(-0.72, -0.38);
    shape.lineTo(0.72, -0.38);
    shape.quadraticCurveTo(0.98, -0.38, 0.98, -0.1);
    shape.lineTo(0.98, 0.1);
    shape.quadraticCurveTo(0.98, 0.38, 0.72, 0.38);
    shape.lineTo(-0.72, 0.38);
    shape.quadraticCurveTo(-0.98, 0.38, -0.98, 0.1);
    shape.lineTo(-0.98, -0.1);
    shape.quadraticCurveTo(-0.98, -0.38, -0.72, -0.38);
    const hole = new THREE.Path();
    hole.moveTo(-0.6, -0.14);
    hole.lineTo(0.6, -0.14);
    hole.quadraticCurveTo(0.72, -0.14, 0.72, 0);
    hole.quadraticCurveTo(0.72, 0.14, 0.6, 0.14);
    hole.lineTo(-0.6, 0.14);
    hole.quadraticCurveTo(-0.72, 0.14, -0.72, 0);
    hole.quadraticCurveTo(-0.72, -0.14, -0.6, -0.14);
    shape.holes.push(hole);
    const geometry = new THREE.ExtrudeGeometry(shape, {
      depth: 0.22,
      bevelEnabled: true,
      bevelSegments: 4,
      steps: 1,
      bevelSize: 0.07,
      bevelThickness: 0.07,
      curveSegments: 24,
    });
    geometry.center();
    return new THREE.Mesh(geometry, material(color));
  }
  const left = ring('#5274ef');
  left.position.set(-0.55, 0.28, 0);
  left.rotation.set(0.15, 0.08, -0.55);
  chain.add(left);
  const right = ring('#d5ec8a');
  right.position.set(0.52, -0.18, 0.18);
  right.rotation.set(-0.55, 0.2, -0.55);
  chain.add(right);
  world.add(chain);
  objects.push(chain);
  const ticket = card(2.5, 2.25, '#244bd8', (ctx) => {
    ctx.strokeStyle = '#a9c0ff';
    ctx.lineWidth = 8;
    ctx.beginPath();
    ctx.roundRect(45, 45, 96, 62, 25);
    ctx.stroke();
    ctx.beginPath();
    ctx.roundRect(103, 85, 96, 62, 25);
    ctx.stroke();
    ctx.fillStyle = '#fff';
    ctx.font = '30px sans-serif';
    ctx.fillText('MemoLink', 45, 220);
    ctx.font = 'bold 36px sans-serif';
    ctx.fillText('l.memolab.me/hello', 45, 293);
    ctx.strokeStyle = '#7694ed';
    ctx.lineWidth = 2;
    ctx.beginPath();
    ctx.moveTo(45, 354);
    ctx.lineTo(723, 354);
    ctx.stroke();
    ctx.fillStyle = '#def198';
    ctx.font = '25px sans-serif';
    ctx.fillText('Ready for the next person  ↗', 45, 424);
  });
  world.add(ticket);
  objects.push(ticket);
  const phone = card(1.75, 2.7, '#132838', (ctx) => {
    ctx.fillStyle = '#f7f7f2';
    ctx.beginPath();
    ctx.roundRect(32, 65, 704, 391, 24);
    ctx.fill();
    ctx.fillStyle = '#132838';
    ctx.font = '38px sans-serif';
    ctx.fillText('hello.', 90, 157);
    ctx.fillStyle = '#244bd8';
    ctx.beginPath();
    ctx.roundRect(80, 225, 608, 99, 24);
    ctx.fill();
    ctx.fillStyle = '#fff';
    ctx.font = '26px sans-serif';
    ctx.fillText('l.memolab.me/hello  ↗', 110, 285);
    ctx.fillStyle = '#def198';
    ctx.beginPath();
    ctx.roundRect(360, 355, 326, 55, 20);
    ctx.fill();
    ctx.fillStyle = '#172b3a';
    ctx.font = '25px sans-serif';
    ctx.fillText('See you there.', 383, 391);
  });
  world.add(phone);
  objects.push(phone);
  const qr = card(1.05, 1.2, '#fffdf6', (ctx) => {
    ctx.fillStyle = '#172b3a';
    const dots = [
      [0, 0],
      [1, 0],
      [2, 0],
      [0, 1],
      [2, 1],
      [0, 2],
      [1, 2],
      [2, 2],
      [5, 0],
      [6, 0],
      [7, 0],
      [5, 1],
      [7, 1],
      [5, 2],
      [6, 2],
      [7, 2],
      [0, 5],
      [1, 5],
      [2, 5],
      [0, 6],
      [2, 6],
      [0, 7],
      [1, 7],
      [2, 7],
      [4, 4],
      [6, 4],
      [7, 5],
      [5, 6],
      [7, 7],
      [4, 7],
      [3, 3],
      [4, 2],
    ];
    dots.forEach(([x, y]) => ctx.fillRect(134 + x * 60, 34 + y * 48, 48, 39));
  });
  world.add(qr);
  objects.push(qr);
  const plane = new THREE.Group();
  const geo = new THREE.BufferGeometry();
  geo.setAttribute(
    'position',
    new THREE.Float32BufferAttribute(
      [
        -0.6, 0.15, 0, 0.6, 0, 0, -0.55, -0.15, 0, -0.55, -0.15, 0, 0.6, 0, 0,
        -0.2, -0.6, 0.12,
      ],
      3,
    ),
  );
  geo.computeVertexNormals();
  plane.add(
    new THREE.Mesh(
      geo,
      new THREE.MeshStandardMaterial({
        color: '#def198',
        side: THREE.DoubleSide,
        roughness: 0.4,
      }),
    ),
  );
  world.add(plane);
  objects.push(plane);
  const states: Pose[][] = [
    [
      pose(-0.55, 0.25, 0.3, -0.12, -0.17, -0.06),
      pose(1.13, -0.92, 0.8, 0.12, -0.2, 0.05, 0.64),
      pose(0.9, -0.35, -1, 0.03, -0.15, 0.2, 0.52),
      pose(1.9, 0.9, -2, 0, -0.35, 0.12, 0.35),
      pose(-1.95, -1, -1, 0, 0.2, -0.2, 0.45),
      pose(1.65, 1.1, -0.5, 0.1, 0.1, 0.12, 0.5),
    ],
    [
      pose(-1.25, 0.7, -1.7, -0.2, 0.25, -0.15, 0.65),
      pose(-0.65, -0.6, 1.15, 0.05, -0.1, 0.06, 0.78),
      pose(0.65, 0.12, 0.45, 0.03, -0.22, 0.13, 0.98),
      pose(1.8, 0.8, -2, 0, -0.2, 0.1, 0.45),
      pose(-1.7, -1, -1, 0, 0.2, -0.2, 0.55),
      pose(1.65, 1.3, -0.8, 0.15, 0.3, 0.08, 0.65),
    ],
    [
      pose(-1.3, 1, -2.4, -0.25, 0.2, -0.12, 0.43),
      pose(-0.65, -0.95, 0.4, 0.12, -0.1, -0.05, 0.64),
      pose(-1.05, 0.22, -0.2, 0.02, 0.22, -0.16, 0.65),
      pose(0.95, 0.18, 0.65, 0, -0.25, 0.12, 0.95),
      pose(-0.42, -0.4, 1.6, 0, 0.1, -0.16, 0.78),
      pose(0.2, 1.38, 1, 0.2, -0.25, -0.2, 0.83),
    ],
  ];
  function apply(target: Pose[], amount = 1) {
    objects.forEach((o, i) => {
      const p = target[i];
      o.position.lerp(new THREE.Vector3(p.x, p.y, p.z), amount);
      o.rotation.x += (p.rx - o.rotation.x) * amount;
      o.rotation.y += (p.ry - o.rotation.y) * amount;
      o.rotation.z += (p.rz - o.rotation.z) * amount;
      o.scale.lerp(new THREE.Vector3(p.s, p.s, p.s), amount);
    });
  }
  let stage = initial;
  let end = 0;
  let active = false;
  let disposed = false;
  let contextLost = false;
  let tiltX = 0,
    tiltY = 0;
  apply(states[stage]);
  objects.forEach((o) => {
    o.position.y -= 0.4;
    o.rotation.y -= 0.2;
    o.scale.multiplyScalar(0.8);
  });
  const frame = (time: number) => {
    if (disposed) return;
    apply(states[stage], 0.12);
    world.rotation.x += (tiltX - world.rotation.x) * 0.12;
    world.rotation.y += (tiltY - world.rotation.y) * 0.12;
    renderer.render(scene, camera);
    if (time > end) {
      apply(states[stage]);
      world.rotation.set(tiltX, tiltY, 0);
      renderer.render(scene, camera);
      renderer.setAnimationLoop(null);
      active = false;
      canvas.dataset.animating = 'false';
    }
  };
  const animate = () => {
    if (disposed || contextLost || document.hidden) return;
    end = performance.now() + 1000;
    canvas.dataset.animating = 'true';
    if (!active) {
      active = true;
      renderer.setAnimationLoop(frame);
    }
  };
  const resize = () => {
    const { width, height } = canvas.getBoundingClientRect();
    if (!width || !height) return;
    renderer.setSize(width, height, false);
    camera.aspect = width / height;
    camera.position.z = camera.aspect < 1.25 ? 8.8 : 7.6;
    camera.updateProjectionMatrix();
    animate();
  };
  const observer = new ResizeObserver(resize);
  observer.observe(canvas);
  const pointer = (e: PointerEvent) => {
    if (e.pointerType !== 'mouse') return;
    const r = canvas.getBoundingClientRect();
    tiltX = (0.5 - (e.clientY - r.top) / r.height) * 0.16;
    tiltY = ((e.clientX - r.left) / r.width - 0.5) * 0.3;
    animate();
  };
  const leave = () => {
    tiltX = tiltY = 0;
    animate();
  };
  const visibility = () => {
    if (document.hidden) {
      renderer.setAnimationLoop(null);
      active = false;
      canvas.dataset.animating = 'false';
    } else animate();
  };
  const lost = (e: Event) => {
    e.preventDefault();
    contextLost = true;
    active = false;
    canvas.dataset.animating = 'false';
    onLost();
    renderer.setAnimationLoop(null);
  };
  canvas.addEventListener('pointermove', pointer);
  canvas.addEventListener('pointerleave', leave);
  canvas.addEventListener('webglcontextlost', lost);
  document.addEventListener('visibilitychange', visibility);
  resize();
  return {
    setStage(next) {
      stage = Math.min(2, Math.max(0, next));
      objects.forEach((o) => {
        o.rotation.y += 0.1;
        o.position.y -= 0.13;
      });
      animate();
    },
    dispose() {
      if (disposed) return;
      disposed = true;
      observer.disconnect();
      canvas.removeEventListener('pointermove', pointer);
      canvas.removeEventListener('pointerleave', leave);
      canvas.removeEventListener('webglcontextlost', lost);
      document.removeEventListener('visibilitychange', visibility);
      renderer.setAnimationLoop(null);
      scene.traverse((o) => {
        if (o instanceof THREE.Mesh) {
          o.geometry.dispose();
          const materials = Array.isArray(o.material)
            ? o.material
            : [o.material];
          materials.forEach((m) => m.dispose());
        }
      });
      textures.forEach((t) => t.dispose());
      renderer.dispose();
      renderer.forceContextLoss();
      canvas.dataset.animating = 'false';
    },
  };
}
