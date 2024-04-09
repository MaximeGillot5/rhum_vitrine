import { Suspense, useState, useEffect, useRef } from "react";
import { Canvas } from "@react-three/fiber";
import Bottle from "../models/Bottle";
import Bottle2 from "../models/Bottle2";
import { Environment } from "@react-three/drei";

const Home = () => {
  const [currentModel, setCurrentModel] = useState("Bottle");
  const [rotation, setRotation] = useState([0, 0, 0]);
  const lastScrollY = useRef(0); // To track the last scroll position

  const adjustBottleForScreenSize = () => {
    let screenScale = null;
    let screenPosition = null;

    if (currentModel === "Bottle2") {
      screenScale = [13, 13, 13];
      screenPosition = [0, 10, -135];
    } else {
      screenScale = [20, 20, 20];
      screenPosition = [0, 0, 0];
    }

    return [screenScale, screenPosition, [0, 4.7, 0]];
  };

  const [bottleScale, bottlePosition, bottleRotation] =
    adjustBottleForScreenSize();

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const rotationY = (scrollY / window.innerHeight) * Math.PI * 2;
      setRotation([0, rotationY, 0]);

      if (scrollY > lastScrollY.current) {
        // Scrolling down
        if (rotationY >= Math.PI && currentModel === "Bottle") {
          setCurrentModel("Bottle2");
        }
      } else {
        // Scrolling up
        if (rotationY < Math.PI && currentModel === "Bottle2") {
          setCurrentModel("Bottle");
        }
      }
      lastScrollY.current = scrollY; // Update the last scroll position
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, [currentModel]); // Reacting to changes in currentModel

  return (
    <div>
      <div className="bottle_div">
        <section className="bottle">
          <Canvas camera={{ near: 0.1, far: 1000 }}>
            <Suspense fallback={null}>
              <Environment preset="sunset" />
            </Suspense>

            <Suspense fallback={null}>
              {currentModel === "Bottle" ? (
                <Bottle
                  position={bottlePosition}
                  rotation={rotation}
                  scale={bottleScale}
                />
              ) : (
                <Bottle2
                  position={bottlePosition}
                  rotation={rotation}
                  scale={bottleScale}
                />
              )}
            </Suspense>
          </Canvas>
        </section>
      </div>
    </div>
  );
};

export default Home;
