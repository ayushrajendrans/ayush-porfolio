'use client';

import { useRef, useMemo, useEffect, useState } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

/* ──────────────────────────────────────────
   Distant ambient star-field
────────────────────────────────────────── */
function Stars() {
    const ref = useRef<THREE.Points>(null!);
    const positions = useMemo(() => {
        const count = 1500;
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 200;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 200;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 200;
        }
        return pos;
    }, []);

    useFrame((_, delta) => {
        if (ref.current) {
            ref.current.rotation.y += delta * 0.008;
            ref.current.rotation.x += delta * 0.004;
        }
    });

    return (
        <points ref={ref}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" args={[positions, 3]} />
            </bufferGeometry>
            <pointsMaterial size={0.08} color="#aaaaaa" transparent opacity={0.15} sizeAttenuation />
        </points>
    );
}

/* ──────────────────────────────────────────
   Floating node graph — looks like a
   code dependency / network diagram
────────────────────────────────────────── */
function NodeGraph() {
    const groupRef = useRef<THREE.Group>(null!);
    const { mouse, viewport } = useThree();
    const [scrollY, setScrollY] = useState(0);

    useEffect(() => {
        const onScroll = () => setScrollY(window.scrollY);
        window.addEventListener('scroll', onScroll, { passive: true });
        return () => window.removeEventListener('scroll', onScroll);
    }, []);

    // Fixed node positions to form a loose graph / tree
    const nodes: [number, number, number][] = useMemo(() => [
        [0, 0, 0],
        [-12, 8, -5],
        [14, 6, -8],
        [-8, -10, -3],
        [10, -9, -6],
        [-18, 0, -10],
        [20, 2, -12],
        [0, 16, -8],
        [6, -18, -5],
        [-14, -16, -10],
        [22, -4, -15],
        [-4, 22, -12],
    ], []);

    // Edges between nodes (index pairs)
    const edges: [number, number][] = useMemo(() => [
        [0, 1], [0, 2], [0, 3], [0, 4],
        [1, 5], [1, 7], [2, 6], [2, 7],
        [3, 8], [3, 9], [4, 10], [4, 8],
        [5, 9], [6, 10], [7, 11],
    ], []);

    // Build line segments geometry
    const linePoints = useMemo(() => {
        const pts: THREE.Vector3[] = [];
        for (const [a, b] of edges) {
            pts.push(new THREE.Vector3(...nodes[a]));
            pts.push(new THREE.Vector3(...nodes[b]));
        }
        return pts;
    }, [nodes, edges]);

    const lineGeom = useMemo(() => {
        const g = new THREE.BufferGeometry().setFromPoints(linePoints);
        return g;
    }, [linePoints]);

    useFrame((_, delta) => {
        if (!groupRef.current) return;

        // Slow idle rotation
        groupRef.current.rotation.y += delta * 0.06;
        groupRef.current.rotation.x += delta * 0.025;

        // Parallax: drift up as user scrolls down
        const targetY = -scrollY * 0.03;
        groupRef.current.position.y = THREE.MathUtils.lerp(
            groupRef.current.position.y, targetY, 0.04
        );

        // Subtle mouse-follow tilt
        const targetRotY = mouse.x * 0.15;
        const targetRotX = -mouse.y * 0.10;
        groupRef.current.rotation.y = THREE.MathUtils.lerp(
            groupRef.current.rotation.y, targetRotY + groupRef.current.rotation.y, 0.01
        );
        groupRef.current.rotation.x = THREE.MathUtils.lerp(
            groupRef.current.rotation.x, targetRotX + groupRef.current.rotation.x, 0.01
        );
    });

    const nodeMat = useMemo(
        () => new THREE.MeshBasicMaterial({ color: '#444444' }),
        []
    );
    const lineMat = useMemo(
        () => new THREE.LineBasicMaterial({ color: '#2a2a2a', transparent: true, opacity: 0.6 }),
        []
    );
    const hubMat = useMemo(
        () => new THREE.MeshBasicMaterial({ color: '#666666' }),
        []
    );

    return (
        <group ref={groupRef} position={[8, 0, -35]}>
            {/* Edges as line segments */}
            <lineSegments geometry={lineGeom} material={lineMat} />

            {/* Hub node (center, slightly brighter) */}
            <mesh position={nodes[0]} material={hubMat}>
                <sphereGeometry args={[0.7, 12, 12]} />
            </mesh>

            {/* Leaf nodes */}
            {nodes.slice(1).map((pos, i) => (
                <mesh key={i} position={pos} material={nodeMat}>
                    <sphereGeometry args={[0.4, 10, 10]} />
                </mesh>
            ))}

            {/* Tiny octahedron markers on some nodes (code bracket feel) */}
            {[nodes[1], nodes[2], nodes[6], nodes[7]].map((pos, i) => (
                <mesh key={`oct-${i}`} position={pos} rotation={[Math.PI / 4, Math.PI / 4, 0]}>
                    <octahedronGeometry args={[0.9, 0]} />
                    <meshBasicMaterial color="#333333" wireframe />
                </mesh>
            ))}
        </group>
    );
}

/* ──────────────────────────────────────────
   Floating "</ >" bracket shape built from
   box geometry — clearly coding-themed
────────────────────────────────────────── */
function CodeBracket() {
    const groupRef = useRef<THREE.Group>(null!);

    useFrame((_, delta) => {
        if (groupRef.current) {
            groupRef.current.rotation.y += delta * 0.04;
        }
    });

    const mat = new THREE.MeshBasicMaterial({ color: '#2d2d2d', wireframe: false });
    const dimMat = new THREE.MeshBasicMaterial({ color: '#1a1a1a' });

    return (
        <group ref={groupRef} position={[-20, 6, -45]} scale={0.8}>
            {/* "<" left bracket */}
            {/* top arm */}
            <mesh material={mat} position={[-3.5, 2, 0]} rotation={[0, 0, -Math.PI / 4]}>
                <boxGeometry args={[0.4, 3.5, 0.4]} />
            </mesh>
            {/* bottom arm */}
            <mesh material={mat} position={[-3.5, -2, 0]} rotation={[0, 0, Math.PI / 4]}>
                <boxGeometry args={[0.4, 3.5, 0.4]} />
            </mesh>

            {/* "/" slash */}
            <mesh material={dimMat} position={[0, 0, 0]} rotation={[0, 0, -Math.PI / 5]}>
                <boxGeometry args={[0.4, 7, 0.4]} />
            </mesh>

            {/* ">" right bracket */}
            {/* top arm */}
            <mesh material={mat} position={[3.5, 2, 0]} rotation={[0, 0, Math.PI / 4]}>
                <boxGeometry args={[0.4, 3.5, 0.4]} />
            </mesh>
            {/* bottom arm */}
            <mesh material={mat} position={[3.5, -2, 0]} rotation={[0, 0, -Math.PI / 4]}>
                <boxGeometry args={[0.4, 3.5, 0.4]} />
            </mesh>
        </group>
    );
}

/* ──────────────────────────────────────────
   Abstract geometric element
────────────────────────────────────────── */
function AbstractGeometry() {
    const meshRef = useRef<THREE.Mesh>(null!);

    useFrame((_, delta) => {
        if (meshRef.current) {
            meshRef.current.rotation.x += delta * 0.1;
            meshRef.current.rotation.y += delta * 0.15;
        }
    });

    return (
        <mesh ref={meshRef} position={[15, -10, -20]} scale={1.5}>
            <torusKnotGeometry args={[3, 0.8, 100, 16]} />
            <meshBasicMaterial color="#444444" wireframe transparent opacity={0.2} />
        </mesh>
    );
}

/* ──────────────────────────────────────────
   Canvas wrapper
────────────────────────────────────────── */
export default function ParticleStars() {
    return (
        <div className="fixed inset-0 z-0 pointer-events-none">
            <Canvas
                camera={{ position: [0, 0, 50], fov: 75 }}
                gl={{ antialias: true, alpha: true }}
            >
                <ambientLight intensity={0.3} />
                <directionalLight position={[10, 20, 10]} intensity={1} color="#ffffff" />

                <Stars />
                <NodeGraph />
                <CodeBracket />
                <AbstractGeometry />
            </Canvas>
        </div>
    );
}
