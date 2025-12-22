"use client";
import { Group } from "three";
import FloatingCan from "../../components/FloatingCan";
import { Environment } from "@react-three/drei";
import { useRef } from "react";
import gsap from "gsap";

import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(useGSAP, ScrollTrigger);
type Props = {};

function Scene({}: Props) {
  const canRef1 = useRef<Group>(null);
  const canRef2 = useRef<Group>(null);
  const canRef3 = useRef<Group>(null);
  const canRef4 = useRef<Group>(null);
  const canRef5 = useRef<Group>(null);

  const can1GroupRef = useRef<Group>(null);
  const can2GroupRef = useRef<Group>(null);

  const groupRef = useRef<Group>(null);
  const FLOATING_SPEED = 1.5;

  useGSAP(() => {
    if (
      !canRef1.current ||
      !canRef2.current ||
      !canRef3.current ||
      !canRef4.current ||
      !canRef5.current ||
      !can1GroupRef.current ||
      !can2GroupRef.current ||
      !groupRef.current
    )
      return;

    gsap.set(canRef1.current.position, { x: -1.5 });
    gsap.set(canRef1.current.rotation, { z: -0.5 });

    gsap.set(canRef2.current.position, { x: 1.5 });
    gsap.set(canRef2.current.rotation, { z: 0.5 });

    gsap.set(canRef3.current.position, { y: 5, z: 2 });
    gsap.set(canRef4.current.position, { y: 3, z: 2, x: 5 });
    gsap.set(canRef5.current.position, { y: -4, x: -2 });

    const introTl = gsap.timeline({
      defaults: { duration: 1, ease: "back.out(1.7)" },
    });

    introTl.from(
      can1GroupRef.current.position,
      {
        y: -5,
        x: 1,
      },
      0
    );
    introTl.from(
      can1GroupRef.current.rotation,
      {
        z: 3,
      },
      0
    );
    introTl.from(
      can2GroupRef.current.position,
      {
        y: 5,
        x: 1,
      },
      0
    );
    introTl.from(
      can2GroupRef.current.rotation,
      {
        z: 3,
      },
      0
    );

    const scrollTl = gsap.timeline({
      defaults: { duration: 2 },
      scrollTrigger: {
        trigger: ".hero",
        start: "top top",
        end: "bottom bottom",
        scrub: 1.5,
      },
    });

    scrollTl
      .to(groupRef.current.rotation, {
        y: Math.PI * 2,
      })
      .to(canRef1.current.position, { x: 1.1, y: -0.7, z: -2 }, 0)
      .to(canRef1.current.rotation, { z: 0.3 }, 0)

      .to(canRef2.current.position, { x: 1, y: -0.5, z: -1 }, 0)
      .to(canRef2.current.rotation, { z: -0.5 }, 0)

      .to(canRef3.current.position, { x: 2, y: -0.3, z: -1 }, 0)
      .to(canRef3.current.rotation, { z: 0 }, 0)

      .to(canRef4.current.position, { y: 0.5, z: -3, x: 2.1 }, 0)
      .to(canRef4.current.rotation, { z: -0.3 }, 0)

      .to(canRef5.current.position, { y: 0.5, x: 1.4, z: -3 }, 0)
      .to(canRef5.current.rotation, { z: 0.25 }, 0);
  });

  return (
    <group ref={groupRef}>
      <group ref={can1GroupRef}>
        <FloatingCan
          ref={canRef1}
          flavor="blackCherry"
          floatSpeed={FLOATING_SPEED}
        />
      </group>
      <group ref={can2GroupRef}>
        <FloatingCan
          ref={canRef2}
          flavor="watermelon"
          floatSpeed={FLOATING_SPEED}
        />
      </group>
      <FloatingCan ref={canRef3} flavor="grape" floatSpeed={FLOATING_SPEED} />
      <FloatingCan
        ref={canRef4}
        flavor="lemonLime"
        floatSpeed={FLOATING_SPEED}
      />
      <FloatingCan
        ref={canRef5}
        flavor="strawberryLemonade"
        floatSpeed={FLOATING_SPEED}
      />
      <Environment files="/hdr/lobby.hdr" environmentIntensity={1.5} />
    </group>
  );
}

export default Scene;
