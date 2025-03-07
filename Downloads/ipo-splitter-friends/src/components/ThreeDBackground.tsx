
import React, { useRef, useEffect } from 'react';
import * as THREE from 'three';

interface ThreeDBackgroundProps {
  className?: string;
}

const ThreeDBackground: React.FC<ThreeDBackgroundProps> = ({ className }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const spheresRef = useRef<THREE.Mesh[]>([]);
  
  useEffect(() => {
    if (!containerRef.current) return;
    
    // Initialize the scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    
    // Create camera
    const camera = new THREE.PerspectiveCamera(
      75,
      containerRef.current.clientWidth / containerRef.current.clientHeight,
      0.1,
      1000
    );
    camera.position.z = 20;
    cameraRef.current = camera;
    
    // Create WebGL renderer
    const renderer = new THREE.WebGLRenderer({ 
      antialias: true,
      alpha: true 
    });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setClearColor(0x000000, 0); // transparent background
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;
    
    // Create spheres
    const createSphere = (radius: number, color: number, posX: number, posY: number, posZ: number) => {
      const geometry = new THREE.SphereGeometry(radius, 32, 32);
      const material = new THREE.MeshPhongMaterial({ 
        color,
        transparent: true,
        opacity: 0.7,
        shininess: 30
      });
      const sphere = new THREE.Mesh(geometry, material);
      sphere.position.set(posX, posY, posZ);
      scene.add(sphere);
      return sphere;
    };
    
    // Add multiple spheres with different colors and positions
    const spheres = [
      createSphere(2, 0x4287f5, -8, 3, -5),   // Blue
      createSphere(1.5, 0x42f5f2, 7, -4, -3), // Cyan
      createSphere(3, 0x425af5, 4, 6, -8),    // Purple
      createSphere(2.5, 0x42b2f5, -5, -5, -10) // Light Blue
    ];
    spheresRef.current = spheres;
    
    // Add ambient light
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
    scene.add(ambientLight);
    
    // Add directional light
    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.7);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);
    
    // Animation loop
    let frameId: number;
    const animate = () => {
      frameId = requestAnimationFrame(animate);
      
      // Rotate spheres
      spheres.forEach((sphere, index) => {
        const speed = 0.002 * (index + 1);
        sphere.rotation.x += speed;
        sphere.rotation.y += speed * 0.7;
        
        // Add some subtle floating movement
        sphere.position.y += Math.sin(Date.now() * 0.001 * (index + 1)) * 0.01;
      });
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current || !cameraRef.current || !rendererRef.current) return;
      
      cameraRef.current.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Mouse movement effect for interactive feel
    const handleMouseMove = (event: MouseEvent) => {
      if (!containerRef.current || !spheresRef.current.length) return;
      
      const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
      
      spheresRef.current.forEach((sphere, index) => {
        sphere.rotation.x += mouseY * 0.01 * (index % 2 ? 1 : -1);
        sphere.rotation.y += mouseX * 0.01 * (index % 2 ? -1 : 1);
      });
    };
    
    document.addEventListener('mousemove', handleMouseMove);
    
    // Clean up
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('mousemove', handleMouseMove);
      
      if (containerRef.current && rendererRef.current) {
        containerRef.current.removeChild(rendererRef.current.domElement);
      }
      
      // Dispose geometries and materials
      spheresRef.current.forEach(sphere => {
        sphere.geometry.dispose();
        (sphere.material as THREE.Material).dispose();
      });
    };
  }, []);
  
  return <div ref={containerRef} className={className} />;
};

export default ThreeDBackground;
