import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import * as THREE from 'three';
import { useLocation } from 'react-router-dom';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';
import rocketModel from '../assets/rocket.gltf'; // Ensure this path is correct
import '../assets/styles/rocketAnimation.css'; 

const RocketAnimationPage = () => {
  const location = useLocation();
  const { timeRemaining: initialTimeRemaining, releaseDate } = location.state || { timeRemaining: 0, releaseDate: '' };

  const [timeRemaining, setTimeRemaining] = useState(initialTimeRemaining);

  useEffect(() => {
    // If timeRemaining is greater than 0, set up the countdown
    if (timeRemaining > 0) {
      const timer = setInterval(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);  // Decrease by 1 second each time

      // Clear the interval when timeRemaining reaches 0 or component unmounts
      return () => clearInterval(timer);
    }
  }, [timeRemaining]);

  // Function to convert seconds into days, hours, minutes, and seconds
  const formatTime = (time) => {
    const days = Math.floor(time / (3600 * 24));
    const hours = Math.floor((time % (3600 * 24)) / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = Math.floor(time % 60);

    return { days, hours, minutes, seconds };
  };

  // Get the formatted time values
  const { days, hours, minutes, seconds } = formatTime(timeRemaining);

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
        camera.position.set(0, -50, 500);
  
        // Create renderer
        renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
        renderer.setSize(WIDTH, HEIGHT);
        renderer.shadowMap.enabled = true;
        document.getElementById('canvas').appendChild(renderer.domElement);
  
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
      <div>
        <div id="rocket-animation" style={{ width: '100%', height: '100%' }}>
        <h1 className="text-5xl font-bold mb-4 mt-12 text-white">Launching Capsule into Space</h1>
        <p className="text-3xl text-white">
          Your Time Capsule Will Open in {days}d {hours}h {minutes}m {seconds}s. <br />
          On {releaseDate}
        </p>          
        <div className="fire-wrapper">
            <img className="fire" src="https://stivs.dev/assets/rocket/fire.svg" alt="Fire" />
          </div>
          <div className="rain rain1"></div>
          <div className="rain rain2">
            <div className="drop drop2"></div>
          </div>
          <div className="rain rain3"></div>
          <div className="rain rain4"></div>
          <div className="rain rain5">
            <div className="drop drop5"></div>
          </div>
          <div className="rain rain6"></div>
          <div className="rain rain7"></div>
          <div className="rain rain8">
            <div className="drop drop8"></div>
          </div>
          <div className="rain rain9"></div>
          <div className="rain rain10"></div>
          <div className="drop drop11"></div>
          <div className="drop drop12"></div>
          <div id="canvas"></div>
  
          {/* Add a return button at the bottom */}
          <div style={{ position: 'absolute', bottom: '20px', left: '50%', transform: 'translateX(-50%)' }}>
            <Link to="/capsule">
              <button className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 transition">
                Return to Capsules
              </button>
            </Link>
          </div>
        </div>
        </div>
      );
    };
    
    export default RocketAnimationPage;