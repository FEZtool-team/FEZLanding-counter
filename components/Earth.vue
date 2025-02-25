<script setup lang="ts">
import { onMounted } from "vue";
import { useTheme } from "vuetify";
import * as THREE from "three";
import gsap from "gsap";

import EarthNigthTexture from "@/assets/images/texture/earth_nightmap.jpg";
import EarthDayTexture from "@/assets/images/texture/earth_daymap.jpg";

const theme = useTheme();

const renderEarth = () => {
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(75, 1, 0.1, 1000);

  const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true,
  });

  renderer.setClearColor(0xffffff, 0);
  renderer.setSize(700, 700);
  renderer.setPixelRatio(devicePixelRatio);

  const container: any = document.getElementById("globe-container");

  if (!theme.current.value.dark) {
    container.style.filter = "brightness(0.5)";
  }

  container.appendChild(renderer.domElement);

  const sphereGeom = new THREE.SphereGeometry(5, 50, 50);

  const globe_image = new THREE.TextureLoader().load(
    theme.current.value.dark ? EarthNigthTexture : EarthDayTexture
  );

  const sphereMat = new THREE.ShaderMaterial({
    vertexShader: <string>document.getElementById("vertexShader")?.textContent,
    fragmentShader: <string>(
      document.getElementById("fragmentShader")?.textContent
    ),
    uniforms: {
      globeTexture: {
        value: globe_image,
      },
    },
  });

  const sphere = new THREE.Mesh(sphereGeom, sphereMat);

  const outerGlowMat = new THREE.ShaderMaterial({
    vertexShader: <string>(
      document.getElementById("atmosphereVertexShader")?.textContent
    ),
    fragmentShader: <string>(
      document.getElementById("atmosphereFragmentShader")?.textContent
    ),
    side: THREE.BackSide,
  });

  const outer_glow = new THREE.Mesh(sphereGeom, outerGlowMat);

  outer_glow.scale.set(1.01, 1.01, 1.01);

  scene.add(outer_glow);

  const group = new THREE.Group();
  group.add(sphere);
  scene.add(group);

  camera.position.z = 10;

  const mouse = {
    x: 0,
    y: 0,
  };

  function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    sphere.rotation.y -= 0.002;
    sphere.rotation.z -= 0.002;
    var scale = Math.random() * (1.013 - 1.01) + 1.015;
    outer_glow.scale.set(scale, scale, scale);

    gsap.to(group.rotation, {
      y: mouse.x * 0.1,
      x: -mouse.y * 0.1,
    });
  }
  animate();

  addEventListener("mousemove", (event) => {
    mouse.x = (event.clientX / innerWidth) * 5 - 1;
    mouse.y = -(event.clientY / innerHeight) * 5 - 1;
  });
};

onMounted(() => {
  renderEarth();
});
</script>
<template>
  <div class="gi position-absolute z-1">
    <div class="globe-total-container">
      <div id="globe-container"></div>
      <div id="globe-shadow"></div>
    </div>
  </div>
</template>
