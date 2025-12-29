"use client";
import { useRef } from "react";
import FloatingCan from "../../../components/FloatingCan";
import { Environment } from "@react-three/drei";
import { Group } from "three";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);

function Scene() {
  const canRef = useRef<Group>(null);
  const bgColors = ["#FFA6B5", "#E9CFF6", "#CBEF9A"];

  useGSAP(() => {
    if (!canRef.current) return;

    const sections = gsap.utils.toArray(".alternating-section");

    // Set initial background color
    gsap.set(".alternating-text-container", {
      backgroundColor: "#FDE047",
    });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: ".alternating-text-view",
        endTrigger: ".alternating-text-container",
        start: "top top",
        end: "bottom bottom",
        scrub: true,
        pin: true,
      },
    });

    sections.forEach((_, index) => {
      if (index === 0) {
        return;
      }

      const isOdd = index % 2 !== 0;

      const xPosition = isOdd ? "-1" : "1";
      const yRotation = isOdd ? ".4" : "-.4";

      tl.to(canRef.current.position, {
        x: xPosition,
        ease: "circ.inOut",
        delay: 0.5,
      })
        .to(
          canRef.current.rotation,
          {
            y: yRotation,
            ease: "back.inOut",
          },
          "<"
        )
        .to(".alternating-text-container", {
          backgroundColor: gsap.utils.wrap(bgColors, index),
          ease: "sine.inOut",
        });
    });
  });

  return (
    <group ref={canRef} position-x={1} rotation-y={-0.5}>
      <FloatingCan flavor="watermelon" />
      <Environment files="/hdr/lobby.hdr" environmentIntensity={1.5} />
    </group>
  );
}

export default Scene;
