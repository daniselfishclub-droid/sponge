"use client";

/**
 * BallpitBackground - 3D 물리 기반 인터랙티브 배경
 * Three.js InstancedMesh + 물리 엔진
 * 스펀지클럽 네온 펑크 컬러 적용
 */
import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

// --- 물리 엔진 ---
interface PhysicsConfig {
  count: number;
  minSize: number;
  maxSize: number;
  gravity: number;
  friction: number;
  wallBounce: number;
  maxVelocity: number;
  maxX: number;
  maxY: number;
  maxZ: number;
  followCursor: boolean;
}

class PhysicsWorld {
  config: PhysicsConfig;
  positionData: Float32Array;
  velocityData: Float32Array;
  sizeData: Float32Array;
  center: THREE.Vector3 = new THREE.Vector3();

  constructor(config: PhysicsConfig) {
    this.config = config;
    this.positionData = new Float32Array(3 * config.count).fill(0);
    this.velocityData = new Float32Array(3 * config.count).fill(0);
    this.sizeData = new Float32Array(config.count).fill(1);
    this.initialize();
  }

  initialize() {
    const { count, maxX, maxY, maxZ, minSize, maxSize } = this.config;
    for (let i = 0; i < count; i++) {
      const idx = 3 * i;
      this.positionData[idx] = THREE.MathUtils.randFloatSpread(2 * maxX);
      this.positionData[idx + 1] = THREE.MathUtils.randFloatSpread(2 * maxY);
      this.positionData[idx + 2] = THREE.MathUtils.randFloatSpread(2 * maxZ);
      this.sizeData[i] = THREE.MathUtils.randFloat(minSize, maxSize);
    }
  }

  update(delta: number) {
    const {
      count,
      gravity,
      friction,
      wallBounce,
      maxVelocity,
      maxX,
      maxY,
      maxZ,
      followCursor,
    } = this.config;

    let startIdx = 0;
    if (followCursor) {
      startIdx = 1;
      const firstPos = new THREE.Vector3().fromArray(this.positionData, 0);
      firstPos.lerp(this.center, 0.1).toArray(this.positionData, 0);
      new THREE.Vector3(0, 0, 0).toArray(this.velocityData, 0);
    }

    for (let i = startIdx; i < count; i++) {
      const base = 3 * i;
      const pos = new THREE.Vector3().fromArray(this.positionData, base);
      const vel = new THREE.Vector3().fromArray(this.velocityData, base);
      const radius = this.sizeData[i];

      vel.y -= delta * gravity * radius;
      vel.multiplyScalar(friction);
      vel.clampLength(0, maxVelocity);
      pos.add(vel);

      // 구체 간 충돌
      for (let j = i + 1; j < count; j++) {
        const otherBase = 3 * j;
        const otherPos = new THREE.Vector3().fromArray(
          this.positionData,
          otherBase
        );
        const diff = new THREE.Vector3().copy(otherPos).sub(pos);
        const dist = diff.length();
        const sumRadius = radius + this.sizeData[j];
        if (dist < sumRadius) {
          const overlap = sumRadius - dist;
          const correction = diff.normalize().multiplyScalar(0.5 * overlap);
          pos.sub(correction);
          otherPos.add(correction);
          const relVel = new THREE.Vector3()
            .fromArray(this.velocityData, otherBase)
            .sub(vel);
          const impulse = correction
            .clone()
            .multiplyScalar(relVel.dot(correction.normalize()));
          vel.add(impulse);
          otherPos.toArray(this.positionData, otherBase);
        }
      }

      // 커서 따라가는 구체와의 상호작용
      if (followCursor) {
        const followerPos = new THREE.Vector3().fromArray(
          this.positionData,
          0
        );
        const diff = new THREE.Vector3().copy(followerPos).sub(pos);
        const d = diff.length();
        const sumRadius = radius + this.sizeData[0];
        if (d < sumRadius) {
          const correction = diff.normalize().multiplyScalar(sumRadius - d);
          pos.sub(correction);
          vel.sub(correction.multiplyScalar(0.2));
        }
      }

      // 벽 충돌
      if (Math.abs(pos.x) + radius > maxX) {
        pos.x = Math.sign(pos.x) * (maxX - radius);
        vel.x *= -wallBounce;
      }
      if (pos.y - radius < -maxY) {
        pos.y = -maxY + radius;
        vel.y *= -wallBounce;
      } else if (gravity === 0 && pos.y + radius > maxY) {
        pos.y = maxY - radius;
        vel.y *= -wallBounce;
      }
      if (Math.abs(pos.z) + radius > maxZ) {
        pos.z = Math.sign(pos.z) * (maxZ - radius);
        vel.z *= -wallBounce;
      }

      pos.toArray(this.positionData, base);
      vel.toArray(this.velocityData, base);
    }
  }
}

// --- 메인 컴포넌트 ---
export interface BallpitProps {
  count?: number;
  colors?: string[];
  ambientColor?: string;
  ambientIntensity?: number;
  lightIntensity?: number;
  minSize?: number;
  maxSize?: number;
  gravity?: number;
  friction?: number;
  wallBounce?: number;
  maxVelocity?: number;
  followCursor?: boolean;
  className?: string;
}

export const BallpitBackground: React.FC<BallpitProps> = ({
  count = 150,
  colors = ["#ffd700", "#64ffda", "#1a1a2e"],
  ambientColor = "#1e3a5f",
  ambientIntensity = 0.8,
  lightIntensity = 200,
  minSize = 0.4,
  maxSize = 0.9,
  gravity = 0.3,
  friction = 0.998,
  wallBounce = 0.95,
  maxVelocity = 0.15,
  followCursor = true,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return;
    const canvas = canvasRef.current;
    const parent = containerRef.current;

    // 렌더러 설정
    const renderer = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

    // 씬 & 환경
    const scene = new THREE.Scene();
    const roomEnv = new RoomEnvironment();
    const pmrem = new THREE.PMREMGenerator(renderer);
    const envTexture = pmrem.fromScene(roomEnv).texture;

    // 카메라
    const camera = new THREE.PerspectiveCamera(35, 1, 0.1, 1000);
    camera.position.z = 20;

    // 지오메트리 & 머티리얼
    const geometry = new THREE.SphereGeometry(1, 32, 32);
    const material = new THREE.MeshPhysicalMaterial({
      envMap: envTexture,
      metalness: 0.6,
      roughness: 0.3,
      clearcoat: 1,
      clearcoatRoughness: 0.1,
      transmission: 0.1,
      thickness: 0.5,
    });

    // 인스턴스 메시
    const imesh = new THREE.InstancedMesh(geometry, material, count);
    scene.add(imesh);

    // 조명
    const ambient = new THREE.AmbientLight(ambientColor, ambientIntensity);
    scene.add(ambient);
    const pointLight = new THREE.PointLight(colors[0], lightIntensity);
    scene.add(pointLight);

    // 물리
    const config: PhysicsConfig = {
      count,
      minSize,
      maxSize,
      gravity,
      friction,
      wallBounce,
      maxVelocity,
      followCursor,
      maxX: 5,
      maxY: 5,
      maxZ: 2,
    };
    const physics = new PhysicsWorld(config);

    // 인스턴스 컬러 설정
    const threeColors = colors.map((c) => new THREE.Color(c));
    for (let i = 0; i < count; i++) {
      const color = threeColors[i % threeColors.length];
      imesh.setColorAt(i, color);
    }
    imesh.instanceColor!.needsUpdate = true;

    // 마우스/터치 인터랙션
    const raycaster = new THREE.Raycaster();
    const plane = new THREE.Plane(new THREE.Vector3(0, 0, 1), 0);
    const intersection = new THREE.Vector3();
    const pointer = new THREE.Vector2();
    const updatePointer = (e: MouseEvent | TouchEvent) => {
      const x = "touches" in e ? e.touches[0].clientX : e.clientX;
      const y = "touches" in e ? e.touches[0].clientY : e.clientY;
      const rect = canvas.getBoundingClientRect();
      pointer.x = ((x - rect.left) / rect.width) * 2 - 1;
      pointer.y = -((y - rect.top) / rect.height) * 2 + 1;
      raycaster.setFromCamera(pointer, camera);
      raycaster.ray.intersectPlane(plane, intersection);
      physics.center.copy(intersection);
    };
    window.addEventListener("mousemove", updatePointer);
    window.addEventListener("touchstart", updatePointer);
    window.addEventListener("touchmove", updatePointer);

    // 리사이즈
    const resize = () => {
      const w = parent.offsetWidth;
      const h = parent.offsetHeight;
      renderer.setSize(w, h);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
      const fovRad = (camera.fov * Math.PI) / 180;
      const wHeight = 2 * Math.tan(fovRad / 2) * camera.position.z;
      const wWidth = wHeight * camera.aspect;
      physics.config.maxX = wWidth / 2;
      physics.config.maxY = wHeight / 2;
    };
    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(parent);
    resize();

    // 애니메이션 루프
    let animationFrameId: number;
    const clock = new THREE.Clock();
    const dummy = new THREE.Object3D();
    const animate = () => {
      const delta = clock.getDelta();
      physics.update(Math.min(delta, 0.1));
      for (let i = 0; i < count; i++) {
        dummy.position.fromArray(physics.positionData, i * 3);
        const s = physics.sizeData[i];
        if (i === 0 && !followCursor) {
          dummy.scale.setScalar(0);
        } else {
          dummy.scale.setScalar(s);
        }
        dummy.updateMatrix();
        imesh.setMatrixAt(i, dummy.matrix);
        if (i === 0) pointLight.position.copy(dummy.position);
      }
      imesh.instanceMatrix.needsUpdate = true;
      renderer.render(scene, camera);
      animationFrameId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener("mousemove", updatePointer);
      window.removeEventListener("touchstart", updatePointer);
      window.removeEventListener("touchmove", updatePointer);
      resizeObserver.disconnect();
      cancelAnimationFrame(animationFrameId);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      pmrem.dispose();
      roomEnv.dispose();
    };
  }, [
    count,
    colors,
    ambientColor,
    ambientIntensity,
    lightIntensity,
    minSize,
    maxSize,
    gravity,
    friction,
    wallBounce,
    maxVelocity,
    followCursor,
  ]);

  return (
    <div
      ref={containerRef}
      className={`absolute inset-0 w-full h-full overflow-hidden ${className}`}
    >
      <canvas
        ref={canvasRef}
        className="block w-full h-full outline-none"
      />
    </div>
  );
};

export default BallpitBackground;
