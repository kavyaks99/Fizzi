"use client";
import { Bounded } from "../../../components/Bounded";
import clsx from "clsx";
import { View } from "@react-three/drei";
import Scene from "./Scene";

function AlternatingText() {
  const contentData = [
    {
      id: 1,
      title: "Gut-Friendly Goodness",
      description:
        "Our soda is packed with prebiotics and 1 billion probiotics, giving your gut the love it deserves. Say goodbye to bloating and hello to a happy, healthy digestive system with every sip.",
    },
    {
      id: 2,
      title: "Light Calories, Big Flavor",
      description:
        "Indulge in bold, refreshing taste without the guilt. At just 20 calories per can, you can enjoy all the flavor you crave with none of the compromise. Light Calories, Big Flavor",
    },
    {
      id: 3,
      title: "Naturally Refreshing",
      description:
        "Our soda is made with real fruit juice and a touch of cane sugar. We never use artificial sweeteners or high fructose corn syrup. Try all five flavors and find your favorite!",
    },
  ];
  return (
    <Bounded className="alternating-text-container relative bg-yellow-300 text-sky-950">
      <div>
        <div className="relative grid z-[100]">
          <View className="alternating-text-view absolute left-0 top-0 h-screen w-full">
            <Scene />
          </View>
          {contentData.map((item, index) => {
            return (
              <div
                key={item.id}
                className="alternating-section grid h-screen place-items-center gap-x-12 md:grid-cols-2"
              >
                <div
                  className={clsx(
                    index % 2 === 0 ? "col-start-1" : "md:col-start-2",

                    "rounded-lg p-4 backdrop-blur-lg max-md:bg-white/30"
                  )}
                >
                  <h2 className="text-balance text-6xl font-bold">
                    {item.title}
                  </h2>
                  <div className="mt-4 text-xl font-normal">
                    {item.description}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Bounded>
  );
}

export default AlternatingText;
