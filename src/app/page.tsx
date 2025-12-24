import { Bounded } from "../components/Bounded";
import Home from "./pages/Home";
import SkyDive from "./pages/skyDive/SkyDive";
import Carousel from "./pages/carousel/Carousel";

export default function Main() {
  return (
    <>
      <Home />
      <SkyDive />
      <Carousel />
    </>
  );
}
