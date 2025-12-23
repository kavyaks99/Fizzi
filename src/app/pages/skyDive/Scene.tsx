"use client";
import { useRef } from "react";
import * as THREE from "three";
import FloatingCan from "../../../components/FloatingCan";
import { Cloud, Clouds, Environment, Text } from "@react-three/drei";
import { SodaCanProps } from "../../../components/SodaCan";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type Props = {
  sentence: string;
  flavor: SodaCanProps["flavor"];
};

gsap.registerPlugin(useGSAP, ScrollTrigger);

export default function Scene({ sentence, flavor }: Props) {
  const groupRef = useRef<THREE.Group>(null);
  const canRef = useRef<THREE.Group>(null);
  const cloud1Ref = useRef<THREE.Group>(null);
  const cloud2Ref = useRef<THREE.Group>(null);
  const cloudsRef = useRef<THREE.Group>(null);
  const wordsRef = useRef<THREE.Group>(null);
  const ANGLE = 75 * (Math.PI / 180);

  const getXPosition = (distance: number) => distance * Math.cos(ANGLE);
  const getYPosition = (distance: number) => distance * Math.sin(ANGLE);

  const getXYPosition = (distance: number) => ({
    x: getXPosition(distance),
    y: getYPosition(-1 * distance),
  });

  useGSAP(() => {
    if (
      !groupRef.current ||
      !canRef.current ||
      !wordsRef.current ||
      !cloudsRef.current ||
      !cloud1Ref.current ||
      !cloud2Ref.current
    )
      return;

    gsap.set(cloudsRef.current.position, { z: 10 });
    gsap.set(canRef.current.position, { ...getXYPosition(-4) });
    gsap.set(
      wordsRef.current.children.map((word) => word.position),
      { ...getXYPosition(7), z: 2 }
    );

    //spinning can
    gsap.to(canRef.current.rotation, {
      y: Math.PI * 2,
      duration: 1.5,
      ease: "none",
      repeat: -1,
    });

    // cloud Movement
    gsap.set([cloud2Ref.current.position, cloud1Ref.current.position], {
      ...getXYPosition(15),
    });

    gsap.to(cloud1Ref.current.position, {
      y: `+=${getYPosition(15 * 2)}`,
      x: `+=${getXPosition(15 * -2)}`,
      ease: "none",
      repeat: -1,
      duration: 6,
    });

    gsap.to(cloud2Ref.current.position, {
      y: `+=${getYPosition(15 * 2)}`,
      x: `+=${getXPosition(15 * -2)}`,
      ease: "none",
      repeat: -1,
      delay: 6 / 2,
      duration: 6,
    });

    const scrollTl = gsap.timeline({
      scrollTrigger: {
        trigger: ".sky-dive",
        start: "top top",
        end: "+=2000",
        scrub: 1.5,
        pin: true,
      },
    });

    scrollTl
      .to("body", {
        backgroundColor: "#C0F0F5",
        overwrite: "auto",
        duration: 0.1,
      })
      .to(cloudsRef.current.position, { z: 0, duration: 0.3 }, 0)
      .to(
        canRef.current.position,
        { x: 0, y: 0, duration: 0.3, ease: "back.out(1.6)" },
        0
      )
      .to(
        wordsRef.current.children.map((word) => word.position),
        {
          keyframes: [
            { x: 0, y: 0, z: -1 },
            { ...getXYPosition(-7), z: -7 },
          ],
          stagger: 0.3,
        },
        0
      )
      .to(canRef.current.position, {
        ...getXYPosition(4),
        duration: 0.5,
        ease: "back.in(1.6)",
      })
      .to(cloudsRef.current.position, { z: 6, duration: 0.5 });
  });

  return (
    <group ref={groupRef}>
      <group rotation={[0, 0, 0.6]}>
        <FloatingCan ref={canRef} flavor={flavor}>
          <pointLight intensity={20} color="#8C0413" decay={0.6} />
        </FloatingCan>
      </group>
      {/* clouds */}
      <Clouds ref={cloudsRef}>
        <Cloud ref={cloud1Ref} bounds={[10, 10, 1]} />
        <Cloud ref={cloud2Ref} bounds={[10, 10, 1]} />
      </Clouds>

      {/* text */}
      <group ref={wordsRef}>
        <ThreeText sentence={sentence} color="#F97315" />
      </group>

      {/* ambient light */}
      <ambientLight intensity={2} color="#9DDEFA" />
      <Environment files="/hdr/field.hdr" environmentIntensity={1.5} />
    </group>
  );
}

function ThreeText({
  sentence,
  color = "white",
}: {
  sentence: string;
  color?: string;
}) {
  const words = sentence.toUpperCase().split(" ");

  const material = new THREE.MeshLambertMaterial();

  return words.map((word: string, wordIndex: number) => (
    <Text
      key={`${wordIndex}-${word}`}
      scale={1}
      color={color}
      material={material}
      font="/fonts/Alpino-Variable.woff"
      fontWeight={900}
      anchorX={"center"}
      anchorY={"middle"}
      characters="ABCDEFGHIJKLMNOPQRSTUVWXYZ!,.?'"
    >
      {word}
    </Text>
  ));
}
