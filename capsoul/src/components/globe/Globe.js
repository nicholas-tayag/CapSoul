import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import ThreeGlobe from 'three-globe';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import countries from './files/globe-data-min.json';
import travelHistory from './files/my-flights.json';
import airportHistory from './files/my-airports.json';

const Globe = () => {
  const globeEl = useRef();

  useEffect(() => {
    // Initialize renderer
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    const currentGlobeEl = globeEl.current;
    currentGlobeEl.appendChild(renderer.domElement);

    // Initialize scene, light
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x040d21);

    // Initialize camera, light
    const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 1, 10000);
    camera.position.set(0, 100, 500);

    // Add stars to the scene
    const starGeometry = new THREE.BufferGeometry();
    const starMaterial = new THREE.PointsMaterial({ color: 0x888888 });

    const stars = [];
    for (let i = 0; i < 10000; i++) {
      stars.push(THREE.MathUtils.randFloatSpread(2000)); // x
      stars.push(THREE.MathUtils.randFloatSpread(2000)); // y
      stars.push(THREE.MathUtils.randFloatSpread(2000)); // z
    }

    starGeometry.setAttribute('position', new THREE.Float32BufferAttribute(stars, 3));
    const starField = new THREE.Points(starGeometry, starMaterial);
    scene.add(starField);

    // Add globe to the scene
    const globe = new ThreeGlobe({
      waitForGlobeReady: true,
      animateIn: true,
    })
      .hexPolygonsData(countries.features)
      .hexPolygonResolution(3)
      .hexPolygonMargin(0.7)
      .showAtmosphere(true)
      .atmosphereColor('#3a228a')
      .atmosphereAltitude(0.25)
      .hexPolygonColor((e) => {
        if (['KGZ', 'KOR', 'THA', 'RUS', 'UZB', 'IDN', 'KAZ', 'MYS'].includes(e.properties.ISO_A3)) {
          return 'rgba(255,255,255, 1)';
        } else return 'rgba(255,255,255, 0.7)';
      });

    globe.rotateY(-Math.PI * (5 / 9));
    globe.rotateZ(-Math.PI / 6);
    const globeMaterial = globe.globeMaterial();
    globeMaterial.color = new THREE.Color(0x3a228a);
    globeMaterial.emissive = new THREE.Color(0x220038);
    globeMaterial.emissiveIntensity = 0.1;
    globeMaterial.shininess = 0.7;

    scene.add(globe);

    // Add lighting to the scene
    scene.add(new THREE.AmbientLight(0xbbbbbb, 0.3));

    const dLight = new THREE.DirectionalLight(0xffffff, 0.8);
    dLight.position.set(-800, 2000, 400);
    camera.add(dLight);

    const dLight1 = new THREE.DirectionalLight(0x7982f6, 1);
    dLight1.position.set(-200, 500, 200);
    camera.add(dLight1);

    const dLight2 = new THREE.PointLight(0x8566cc, 0.5);
    dLight2.position.set(-200, 500, 200);
    camera.add(dLight2);

    scene.add(camera);

    // Initialize controls
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dynamicDampingFactor = 0.01;
    controls.enablePan = false;
    controls.minDistance = 200;
    controls.maxDistance = 500;
    controls.rotateSpeed = 0.8;
    controls.zoomSpeed = 1;
    controls.autoRotate = false;

    controls.minPolarAngle = Math.PI / 3.5;
    controls.maxPolarAngle = Math.PI - Math.PI / 3;

    window.addEventListener('resize', onWindowResize, false);

    // Handle window resize
    function onWindowResize() {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    }

    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);

      starField.rotation.x += 0.0005;
      starField.rotation.y += 0.0005;

      controls.update();
      renderer.render(scene, camera);
    };

    animate();

    // Cleanup on unmount
    return () => {
      window.removeEventListener('resize', onWindowResize);
      if (currentGlobeEl && renderer.domElement && currentGlobeEl.contains(renderer.domElement)) {
        currentGlobeEl.removeChild(renderer.domElement);
      }
    };
  }, []);

  return <div ref={globeEl} style={{ width: '100%', height: '100vh' }} />;
};

export default Globe;
