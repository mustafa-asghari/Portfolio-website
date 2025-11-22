import { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import { motion, useScroll } from 'framer-motion';
import * as THREE from 'three';

interface RobotFaceProps {
  mousePosition: { x: number; y: number };
  isHovered: boolean;
  isChatOpen: boolean;
}

function RobotFace({ mousePosition, isHovered, isChatOpen }: RobotFaceProps) {
  const groupRef = useRef<THREE.Group>(null);
  const leftEyeRef = useRef<THREE.Mesh>(null);
  const rightEyeRef = useRef<THREE.Mesh>(null);
  const mouthRef = useRef<THREE.Mesh>(null);
  const [mouthScale, setMouthScale] = useState(1);

  useFrame((state) => {
    if (!groupRef.current || !leftEyeRef.current || !rightEyeRef.current || !mouthRef.current) return;

    // Eyes follow cursor
    const targetX = (mousePosition.x - 0.5) * 0.3;
    const targetY = -(mousePosition.y - 0.5) * 0.3;
    
    leftEyeRef.current.position.x += (targetX - 0.3 - leftEyeRef.current.position.x) * 0.1;
    leftEyeRef.current.position.y += (targetY - leftEyeRef.current.position.y) * 0.1;
    
    rightEyeRef.current.position.x += (targetX + 0.3 - rightEyeRef.current.position.x) * 0.1;
    rightEyeRef.current.position.y += (targetY - rightEyeRef.current.position.y) * 0.1;

    // Mouth animation (talking effect)
    const time = state.clock.getElapsedTime();
    const targetScale = isChatOpen ? 1 + Math.sin(time * 8) * 0.3 : 1;
    mouthRef.current.scale.y = THREE.MathUtils.lerp(mouthRef.current.scale.y, targetScale, 0.1);
  });

  return (
    <Float
      speed={1.5}
      rotationIntensity={isHovered ? 0.3 : 0.1}
      floatIntensity={0.3}
    >
      <group ref={groupRef}>
        {/* Head/Face - Round */}
        <mesh position={[0, 0, 0]}>
          <sphereGeometry args={[1.2, 32, 32]} />
          <meshStandardMaterial
            color={isChatOpen ? "#00BFFF" : "#C0C0C0"}
            metalness={0.9}
            roughness={0.1}
            emissive={isChatOpen ? "#00BFFF" : "#C0C0C0"}
            emissiveIntensity={isHovered ? 0.5 : 0.2}
          />
        </mesh>

        {/* Eye sockets (dark areas) */}
        <mesh position={[-0.4, 0.3, 1.05]}>
          <circleGeometry args={[0.35, 32]} />
          <meshBasicMaterial color="#000000" />
        </mesh>
        <mesh position={[0.4, 0.3, 1.05]}>
          <circleGeometry args={[0.35, 32]} />
          <meshBasicMaterial color="#000000" />
        </mesh>

        {/* Left Eye */}
        <mesh ref={leftEyeRef} position={[-0.3, 0.3, 1.1]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial 
            color="#00BFFF" 
            emissive="#00BFFF" 
            emissiveIntensity={1}
          />
        </mesh>

        {/* Right Eye */}
        <mesh ref={rightEyeRef} position={[0.3, 0.3, 1.1]}>
          <sphereGeometry args={[0.15, 16, 16]} />
          <meshStandardMaterial 
            color="#00BFFF" 
            emissive="#00BFFF" 
            emissiveIntensity={1}
          />
        </mesh>

        {/* Mouth - Animated */}
        <mesh ref={mouthRef} position={[0, -0.4, 1.05]}>
          <boxGeometry args={[0.8, 0.1, 0.05]} />
          <meshStandardMaterial 
            color="#00BFFF" 
            emissive="#00BFFF"
            emissiveIntensity={isChatOpen ? 0.8 : 0.3}
          />
        </mesh>

        {/* Mouth corners for smile effect */}
        <mesh position={[-0.35, -0.45, 1.04]}>
          <boxGeometry args={[0.08, 0.08, 0.05]} />
          <meshStandardMaterial 
            color="#00BFFF" 
            emissive="#00BFFF"
            emissiveIntensity={0.5}
          />
        </mesh>
        <mesh position={[0.35, -0.45, 1.04]}>
          <boxGeometry args={[0.08, 0.08, 0.05]} />
          <meshStandardMaterial 
            color="#00BFFF" 
            emissive="#00BFFF"
            emissiveIntensity={0.5}
          />
        </mesh>

        {/* Antenna */}
        <mesh position={[0, 1.4, 0]}>
          <cylinderGeometry args={[0.05, 0.05, 0.3]} />
          <meshStandardMaterial color="#C0C0C0" metalness={1} roughness={0} />
        </mesh>
        <mesh position={[0, 1.6, 0]}>
          <sphereGeometry args={[0.1, 16, 16]} />
          <meshStandardMaterial 
            color="#00BFFF" 
            emissive="#00BFFF" 
            emissiveIntensity={2}
          />
        </mesh>
      </group>
    </Float>
  );
}

interface AILogo3DProps {
  onLogoClick: () => void;
  isChatOpen: boolean;
}

export default function AILogo3D({ onLogoClick, isChatOpen }: AILogo3DProps) {
  const [mousePosition, setMousePosition] = useState({ x: 0.5, y: 0.5 });
  const [isHovered, setIsHovered] = useState(false);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const { scrollYProgress } = useScroll();

  // Detect mobile
  const isMobile = typeof window !== 'undefined' && window.innerWidth < 768;
  const logoSize = isMobile ? 'w-20 h-20' : 'w-32 h-32';

  // Track mouse globally (desktop only)
  useEffect(() => {
    if (isMobile) return;
    
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: e.clientX / window.innerWidth,
        y: e.clientY / window.innerHeight,
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isMobile]);

  // Random position on scroll
  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      const screenWidth = window.innerWidth;
      const screenHeight = window.innerHeight;
      const logoWidth = isMobile ? 80 : 128;
      
      const positions = isMobile ? [
        { x: 20, y: 20 },
        { x: screenWidth - logoWidth - 20, y: 20 },
        { x: screenWidth / 2 - logoWidth / 2, y: screenHeight - 150 },
        { x: 20, y: screenHeight / 2 - 60 },
        { x: screenWidth - logoWidth - 20, y: screenHeight / 2 - 60 },
      ] : [
        { x: 20, y: 20 },
        { x: screenWidth - 150, y: 20 },
        { x: screenWidth / 2 - 64, y: screenHeight - 200 },
        { x: 20, y: screenHeight / 2 },
        { x: screenWidth - 150, y: screenHeight / 2 },
      ];
      
      const index = Math.floor(latest * positions.length);
      if (positions[index]) {
        setPosition(positions[index]);
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress, isMobile]);

  return (
    <motion.div
      className={`fixed ${logoSize} z-50 cursor-pointer rounded-full overflow-hidden`}
      animate={{ 
        x: position.x,
        y: position.y,
      }}
      transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onLogoClick}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
    >
      {/* Glow effect */}
      <motion.div
        className="absolute inset-0 rounded-full blur-xl"
        animate={{
          backgroundColor: isChatOpen ? "#00BFFF" : "#C0C0C0",
          opacity: isHovered ? 0.6 : 0.3,
        }}
        transition={{ duration: 0.3 }}
      />
      
      <Canvas camera={{ position: [0, 0, 5], fov: 50 }} gl={{ alpha: true }}>
        
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} intensity={1} />
        <pointLight position={[-5, -5, 5]} intensity={0.5} color="#00BFFF" />
        <RobotFace 
          mousePosition={mousePosition} 
          isHovered={isHovered}
          isChatOpen={isChatOpen}
        />
      </Canvas>
      
      {/* Tooltip */}
      {isHovered && !isChatOpen && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="absolute -top-12 left-1/2 -translate-x-1/2 bg-card border border-primary/50 rounded-lg px-3 py-2 whitespace-nowrap text-sm"
        >
          𝘾𝙡𝙞𝙘𝙠 𝙩𝙤 𝙘𝙝𝙖𝙩
        </motion.div>
      )}
    </motion.div>
  );
}
