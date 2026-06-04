import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const vertexShader = `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position, 1.0);
}
`;

const fragmentShader = `
precision mediump float;

uniform float uTime;
uniform vec2 uMouse;
uniform vec2 uResolution;
uniform float uDistortion;
uniform vec3 uBaseColor;

varying vec2 vUv;

#define PI 3.14159265359
#define TAU 6.28318530718

vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m;
  m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

float fbm(vec2 p) {
  float sum = 0.0;
  float amp = 1.0;
  float freq = 1.0;
  for (int i = 0; i < 5; i++) {
    sum += amp * snoise(p * freq);
    p *= 2.0 + 0.5;
    amp *= 0.5;
    freq *= 2.0;
  }
  return sum;
}

vec4 sampleFluidState(vec2 p, float t) {
  return vec4(
    fbm(p * 1.5 + t * 0.05),
    fbm(p * 1.5 + vec2(5.2, 1.3) + t * 0.04),
    fbm(p * 2.0 + vec2(1.7, 9.2) + t * 0.03),
    fbm(p * 0.5 + vec2(8.3, 2.8) + t * 0.02)
  );
}

vec2 advect(vec2 p, vec2 vel, float dt) { return p - vel * dt; }

vec3 getNormal(vec2 p, float t) {
  float h = fbm(p + t * 0.05);
  float hx = fbm(p + vec2(0.01, 0.0) + t * 0.05);
  float hy = fbm(p + vec2(0.0, 0.01) + t * 0.05);
  return normalize(vec3((h - hx) * 30.0, (h - hy) * 30.0, 1.0));
}

float hash(float n) { return fract(sin(n) * 43758.5453123); }
float grain(vec2 p, float t) { return (hash(p.x * 100.0 + p.y * 357.0 + t * 0.1) - 0.5) * 0.015; }

void main() {
  vec2 uv = (vUv - 0.5) * vec2(uResolution.x / uResolution.y, 1.0) + 0.5;
  vec2 mouseInfluence = vec2(0.0);
  float mouseDist = 10.0;
  if (uMouse.x > 0.0) {
    vec2 mUV = (uMouse - 0.5) * vec2(uResolution.x / uResolution.y, 1.0) + 0.5;
    mouseDist = distance(uv, mUV);
    mouseInfluence = (uv - mUV) * (1.0 / (mouseDist + 0.1)) * 0.04;
  }
  vec2 p = uv;
  p += mouseInfluence;
  p += uDistortion * 0.1;
  vec4 state = sampleFluidState(p, uTime);
  vec2 vel = state.xy;
  float swirl = state.z;
  float compression = state.w;
  vec2 advectP = advect(p, vel, 0.5);
  advectP = advectP * 0.5 + 0.5;
  float scrollCompression = (uDistortion * 0.5 + 0.5) * compression;
  advectP += scrollCompression * 0.2;
  advectP = fract(advectP);

  vec2 color1Pos = vec2(0.5 + sin(uTime * 0.07) * 0.3, 0.5 + cos(uTime * 0.09) * 0.3);
  vec2 color2Pos = vec2(0.5 + cos(uTime * 0.06) * 0.3, 0.5 + sin(uTime * 0.08) * 0.3);
  vec2 color3Pos = vec2(0.5 + sin(uTime * 0.05 + 2.0) * 0.3, 0.5 + cos(uTime * 0.07 + 1.0) * 0.3);

  float field1 = fbm(advectP * 2.0 + uTime * 0.1 + swirl * 0.2);
  float field2 = fbm(advectP * 2.0 + uTime * 0.12 + vec2(50.0) + swirl * 0.2);
  float field3 = fbm(advectP * 2.0 + uTime * 0.08 + vec2(100.0) + swirl * 0.2);

  float weight1 = smoothstep(0.3, 0.7, field1);
  float weight2 = smoothstep(0.3, 0.7, field2);
  float weight3 = smoothstep(0.3, 0.7, field3);

  vec3 color1 = vec3(0.416, 0.000, 1.000);
  vec3 color2 = vec3(0.231, 0.039, 0.459);
  vec3 color3 = vec3(0.051, 0.020, 0.125);

  vec3 fluidColor = mix(mix(color1, color2, weight2), color3, weight3 * 0.6);
  fluidColor = mix(fluidColor, uBaseColor, 0.3);

  float banding = sin(dot(advectP, vel) * TAU * 3.0 + uTime * 0.5 + swirl * 2.0) * 0.5 + 0.5;
  banding = smoothstep(0.4, 0.6, banding);

  float velMag = length(vel);
  float colorShift = velMag * 0.1;
  vec3 chromaticColor = vec3(fluidColor.r + colorShift, fluidColor.g, fluidColor.b - colorShift);
  vec3 finalColor = mix(chromaticColor, fluidColor, 0.7);
  finalColor += vec3(0.780, 0.655, 1.000) * banding * 0.12;

  vec3 n = getNormal(p, uTime);
  vec3 l = normalize(vec3(0.5, 0.5, 1.0));
  float diff = max(dot(n, l), 0.0);
  finalColor *= (0.7 + diff * 0.3);
  finalColor += grain(p, uTime);

  float vig = 1.0 - smoothstep(0.5, 1.5, length(vUv - 0.5) * 2.0);
  finalColor *= (0.8 + vig * 0.2);

  gl_FragColor = vec4(finalColor, 1.0);
  #include <colorspace_fragment>
}
`;

interface FluidCanvasProps {
  scrollVelocityRef: React.MutableRefObject<number>;
}

export default function FluidCanvas({ scrollVelocityRef }: FluidCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const rafRef = useRef<number>(0);
  const mouseRef = useRef({ x: -1, y: -1, targetX: -1, targetY: -1 });

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const isMobile = window.innerWidth < 768;
    const dpr = Math.min(window.devicePixelRatio, isMobile ? 1 : 2);

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: false });
    renderer.setPixelRatio(dpr);
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);
    const scene = new THREE.Scene();

    const uniforms = {
      uTime: { value: 0 },
      uMouse: { value: new THREE.Vector2(-1, -1) },
      uResolution: { value: new THREE.Vector2(container.offsetWidth, container.offsetHeight) },
      uDistortion: { value: 0 },
      uBaseColor: { value: new THREE.Vector3(0.416, 0.0, 1.0) },
    };

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
      depthWrite: false,
      depthTest: false,
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    const clock = new THREE.Clock();

    const onMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      mouseRef.current.targetX = (e.clientX - rect.left) / rect.width;
      mouseRef.current.targetY = 1.0 - (e.clientY - rect.top) / rect.height;
    };

    const onMouseLeave = () => {
      mouseRef.current.targetX = -1;
      mouseRef.current.targetY = -1;
    };

    const onResize = () => {
      const w = container.offsetWidth;
      const h = container.offsetHeight;
      renderer.setSize(w, h);
      uniforms.uResolution.value.set(w, h);
    };

    container.addEventListener('mousemove', onMouseMove);
    container.addEventListener('mouseleave', onMouseLeave);
    window.addEventListener('resize', onResize);

    // IntersectionObserver to pause when off-screen
    let isVisible = true;
    const observer = new IntersectionObserver(
      ([entry]) => { isVisible = entry.isIntersecting; },
      { threshold: 0 }
    );
    observer.observe(container);

    const animate = () => {
      rafRef.current = requestAnimationFrame(animate);
      if (!isVisible) return;

      const t = clock.getElapsedTime();
      uniforms.uTime.value = t;

      // Lerp mouse
      const m = mouseRef.current;
      m.x += (m.targetX - m.x) * 0.05;
      m.y += (m.targetY - m.y) * 0.05;
      uniforms.uMouse.value.set(m.x, m.y);

      // Distortion from scroll velocity
      const sv = scrollVelocityRef.current || 0;
      const ambient = Math.sin(t * 0.3) * 0.5;
      uniforms.uDistortion.value = ambient + sv;

      renderer.render(scene, camera);
    };

    animate();

    return () => {
      cancelAnimationFrame(rafRef.current);
      observer.disconnect();
      container.removeEventListener('mousemove', onMouseMove);
      container.removeEventListener('mouseleave', onMouseLeave);
      window.removeEventListener('resize', onResize);
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [scrollVelocityRef]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 w-full h-full"
      style={{ zIndex: 0 }}
    />
  );
}
