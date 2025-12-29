import { Bounded } from "../components/Bounded";
import Home from "./pages/Home";
import SkyDive from "./pages/skyDive/SkyDive";
import Carousel from "./pages/carousel/Carousel";
import AlternatingText from "./pages/alternatingText/AlternatingText";
import BigText from "./pages/bigtext/BigText";
import Footer from "../components/Footer";

export default function Main() {
  return (
    <>
      <Home />
      <SkyDive />
      <Carousel />
      <AlternatingText />
      <BigText />
      <Footer />
    </>
  );
}
