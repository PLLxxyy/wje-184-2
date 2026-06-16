import React, { useRef, useState, useMemo } from 'react'
import { Canvas, useFrame, useThree } from '@react-three/fiber'
import { OrbitControls, Html, Text } from '@react-three/drei'
import * as THREE from 'three'
import { BuildingData } from '../data'

interface SceneProps {
  buildings: BuildingData[]
  selectedBuilding: BuildingData | null
  onSelectBuilding: (building: BuildingData | null) => void
  viewMode: 'bird' | 'ground' | 'inside'
  targetBuilding: BuildingData | null
  hoveredBuilding: string | null
  setHoveredBuilding: (id: string | null) => void
}

// Ground plane with grid
function Ground() {
  return (
    <group>
      {/* Main ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.05, 0]} receiveShadow>
        <planeGeometry args={[80, 80]} />
        <meshStandardMaterial color="#1a2332" />
      </mesh>
      {/* Road grid */}
      <Roads />
      {/* Green areas */}
      <GreenAreas />
    </group>
  )
}

function Roads() {
  const roadMaterial = useMemo(() => new THREE.MeshStandardMaterial({ color: '#2a3444' }), [])

  return (
    <group>
      {/* Horizontal roads */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, -11]} material={roadMaterial}>
        <planeGeometry args={[60, 1.5]} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 0]} material={roadMaterial}>
        <planeGeometry args={[60, 2]} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.01, 13]} material={roadMaterial}>
        <planeGeometry args={[60, 1.5]} />
      </mesh>
      {/* Vertical roads */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[-6, 0.01, 0]} material={roadMaterial}>
        <planeGeometry args={[1.5, 40]} />
      </mesh>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[5, 0.01, 0]} material={roadMaterial}>
        <planeGeometry args={[1.5, 40]} />
      </mesh>
      {/* Road markings */}
      {[-20, -10, 0, 10, 20].map((x, i) => (
        <mesh key={`mark-h-${i}`} rotation={[-Math.PI / 2, 0, 0]} position={[x * 1.5, 0.02, 0]}>
          <planeGeometry args={[0.6, 0.08]} />
          <meshStandardMaterial color="#4a5568" />
        </mesh>
      ))}
    </group>
  )
}

function GreenAreas() {
  return (
    <group>
      {/* Large park area */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0.02, -6]}>
        <planeGeometry args={[3, 3]} />
        <meshStandardMaterial color="#166534" transparent opacity={0.6} />
      </mesh>
      {/* Small green patches */}
      {[
        [-15, 0.02, -12],
        [14, 0.02, -3],
        [-8, 0.02, 10],
        [14, 0.02, 2],
        [0, 0.02, 10],
      ].map((pos, i) => (
        <mesh key={`green-${i}`} rotation={[-Math.PI / 2, 0, 0]} position={pos as [number, number, number]}>
          <planeGeometry args={[2.5, 2.5]} />
          <meshStandardMaterial color="#15803d" transparent opacity={0.5} />
        </mesh>
      ))}
      {/* Trees (simple cylinders + spheres) */}
      {[
        [-15, 0, -12], [14, 0, -3], [-8, 0, 10], [14, 0, 2], [0, 0, 10],
        [-3, 0, -6], [3, 0, -6], [-15, 0, 3], [15, 0, -8],
      ].map((pos, i) => (
        <Tree key={`tree-${i}`} position={pos as [number, number, number]} />
      ))}
    </group>
  )
}

function Tree({ position }: { position: [number, number, number] }) {
  return (
    <group position={position}>
      {/* Trunk */}
      <mesh position={[0, 0.4, 0]}>
        <cylinderGeometry args={[0.08, 0.1, 0.8, 6]} />
        <meshStandardMaterial color="#78350f" />
      </mesh>
      {/* Canopy */}
      <mesh position={[0, 1, 0]}>
        <sphereGeometry args={[0.5, 8, 8]} />
        <meshStandardMaterial color="#22c55e" />
      </mesh>
    </group>
  )
}

// Individual building with hover and click effects
function Building({
  data,
  isSelected,
  isHovered,
  onClick,
  onHover,
  onUnhover,
}: {
  data: BuildingData
  isSelected: boolean
  isHovered: boolean
  onClick: () => void
  onHover: () => void
  onUnhover: () => void
}) {
  const meshRef = useRef<THREE.Mesh>(null!)
  const [glowIntensity, setGlowIntensity] = useState(0)

  useFrame((_, delta) => {
    if (meshRef.current) {
      const targetScale = isHovered ? 1.03 : 1
      meshRef.current.scale.x = THREE.MathUtils.lerp(meshRef.current.scale.x, targetScale, delta * 8)
      meshRef.current.scale.z = THREE.MathUtils.lerp(meshRef.current.scale.z, targetScale, delta * 8)
    }
    const targetGlow = isHovered || isSelected ? 0.4 : 0
    setGlowIntensity(THREE.MathUtils.lerp(glowIntensity, targetGlow, delta * 6))
  })

  const displayColor = isSelected ? data.highlightColor : data.color

  return (
    <group>
      <mesh
        ref={meshRef}
        position={data.position}
        castShadow
        onClick={(e) => {
          e.stopPropagation()
          onClick()
        }}
        onPointerOver={(e) => {
          e.stopPropagation()
          onHover()
          document.body.style.cursor = 'pointer'
        }}
        onPointerOut={() => {
          onUnhover()
          document.body.style.cursor = 'default'
        }}
      >
        <boxGeometry args={data.size} />
        <meshStandardMaterial
          color={displayColor}
          emissive={displayColor}
          emissiveIntensity={glowIntensity}
          transparent
          opacity={0.85}
        />
      </mesh>
      {/* Building label */}
      <Text
        position={[data.position[0], data.position[1] + data.size[1] / 2 + 0.8, data.position[2]]}
        fontSize={0.6}
        color="#ffffff"
        anchorX="center"
        anchorY="bottom"
        outlineWidth={0.04}
        outlineColor="#000000"
      >
        {data.name}
      </Text>
      {/* Window lines effect */}
      <WindowLines building={data} />
    </group>
  )
}

function WindowLines({ building }: { building: BuildingData }) {
  const lines: JSX.Element[] = []
  const floorHeight = building.size[1] / building.floors

  for (let f = 1; f < Math.min(building.floors, 12); f++) {
    const y = building.position[1] - building.size[1] / 2 + f * floorHeight
    // Front face
    lines.push(
      <mesh key={`wf-${f}`} position={[building.position[0], y, building.position[2] + building.size[2] / 2 + 0.01]}>
        <planeGeometry args={[building.size[0] * 0.8, floorHeight * 0.3]} />
        <meshStandardMaterial color="#1e293b" transparent opacity={0.5} />
      </mesh>
    )
  }

  return <group>{lines}</group>
}

// Camera controller that handles view transitions
function CameraController({
  viewMode,
  targetBuilding,
}: {
  viewMode: 'bird' | 'ground' | 'inside'
  targetBuilding: BuildingData | null
}) {
  const { camera } = useThree()
  const targetPos = useRef(new THREE.Vector3(35, 40, 35))
  const targetLookAt = useRef(new THREE.Vector3(0, 0, 0))

  useFrame((_, delta) => {
    if (viewMode === 'bird') {
      targetPos.current.set(35, 40, 35)
      targetLookAt.current.set(0, 0, 0)
    } else if (viewMode === 'ground') {
      targetPos.current.set(30, 8, 30)
      targetLookAt.current.set(0, 2, 0)
    } else if (viewMode === 'inside' && targetBuilding) {
      const [bx, by, bz] = targetBuilding.position
      targetPos.current.set(bx + 3, by + 1, bz + 3)
      targetLookAt.current.set(bx, by, bz)
    }

    camera.position.lerp(targetPos.current, delta * 2)
    const currentLookAt = new THREE.Vector3()
    camera.getWorldDirection(currentLookAt)
    currentLookAt.multiplyScalar(10).add(camera.position)
    currentLookAt.lerp(targetLookAt.current, delta * 2)
  })

  return null
}

export default function ParkScene({
  buildings,
  selectedBuilding,
  onSelectBuilding,
  viewMode,
  targetBuilding,
  hoveredBuilding,
  setHoveredBuilding,
}: SceneProps) {
  return (
    <Canvas
      camera={{ position: [35, 40, 35], fov: 50 }}
      shadows
      style={{ background: 'linear-gradient(180deg, #0a0e27 0%, #111827 100%)' }}
      onPointerMissed={() => onSelectBuilding(null)}
    >
      {/* Lighting */}
      <ambientLight intensity={0.4} />
      <directionalLight
        position={[20, 30, 20]}
        intensity={1.2}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-30}
        shadow-camera-right={30}
        shadow-camera-top={30}
        shadow-camera-bottom={-30}
      />
      <directionalLight position={[-10, 20, -10]} intensity={0.3} color="#6366f1" />
      <pointLight position={[0, 15, 0]} intensity={0.5} color="#3b82f6" />

      {/* Fog */}
      <fog attach="fog" args={['#0a0e27', 50, 120]} />

      {/* Scene content */}
      <Ground />

      {buildings.map((building) => (
        <Building
          key={building.id}
          data={building}
          isSelected={selectedBuilding?.id === building.id}
          isHovered={hoveredBuilding === building.id}
          onClick={() => onSelectBuilding(building)}
          onHover={() => setHoveredBuilding(building.id)}
          onUnhover={() => setHoveredBuilding(null)}
        />
      ))}

      <CameraController viewMode={viewMode} targetBuilding={targetBuilding} />

      <OrbitControls
        enableDamping
        dampingFactor={0.05}
        maxPolarAngle={Math.PI / 2.1}
        minDistance={5}
        maxDistance={80}
      />
    </Canvas>
  )
}
