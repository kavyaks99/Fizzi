"use client";
import { Bounded } from "../../../components/Bounded";
import Scene from "./Scene";
import { View } from "@react-three/drei";

type Props = {};

export default function SkyDive({}: Props) {
  return (
    <Bounded className="sky-dive h-screen">
      <View className="h-screen w-screen">
        <Scene sentence="Dive into better health" flavor="blackCherry" />
      </View>
    </Bounded>
  );
}
