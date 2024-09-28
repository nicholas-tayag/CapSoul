import React, { useEffect } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import rocketModel from '../../assets/rocket.gltf'; // Adjust this path according to your directory structure

const RocketAnimation = () => {
  useEffect(() => {
    let scene, camera, renderer, rocket;
    let WIDTH = window.innerWidth;
    let HEIGHT = window.innerHeight;

    const init = () => {
      // Create scene
      scene = new THREE.Scene();
      scene.fog = new THREE.Fog(0x5d0361, 10, 1500);

      // Create camera
      camera = new THREE.PerspectiveCamera(60, WIDTH / HEIGHT, 1, 10000);
      camera.position.set(0, -10, 500);

      // Create renderer
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
      renderer.setSize(WIDTH, HEIGHT);
      renderer.shadowMap.enabled = true;
      document.getElementById('rocket-animation').appendChild(renderer.domElement);

      // Load rocket model
      const loader = new GLTFLoader();
      loader.load(rocketModel, (gltf) => {
        rocket = gltf.scene;
        rocket.position.y = 50;
        scene.add(rocket);
      });

      // Create lights
      const ambientLight = new THREE.HemisphereLight(0x404040, 0x404040, 1);
      const directionalLight = new THREE.DirectionalLight(0xdfebff, 1);
      directionalLight.position.set(-300, 0, 600);
      const pointLight = new THREE.PointLight(0xa11148, 2, 1000, 2);
      pointLight.position.set(200, -100, 50);
      scene.add(ambientLight, directionalLight, pointLight);

      window.addEventListener('resize', handleWindowResize, false);
    };

    const handleWindowResize = () => {
      WIDTH = window.innerWidth;
      HEIGHT = window.innerHeight;
      renderer.setSize(WIDTH, HEIGHT);
      camera.aspect = WIDTH / HEIGHT;
      camera.updateProjectionMatrix();
    };

    const animate = () => {
      requestAnimationFrame(animate);

      const t = (Date.now() % 2000) / 2000;
      const delta = 40 * Math.sin(Math.PI * 2 * t);

      if (rocket) {
        rocket.rotation.y += 0.1;
        rocket.position.y = delta;
      }

      renderer.render(scene, camera);
    };

    init();
    animate();
  }, []);

  return (
    <div id="rocket-animation" style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: 1000 }}></div>
  );
};

export default RocketAnimation;
