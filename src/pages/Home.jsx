import { Suspense, useRef, useState } from "react";
import { Canvas } from "@react-three/fiber";
import Bottle from "../models/Bottle";
import Bottle2 from "../models/Bottle2";
import { Environment } from "@react-three/drei";

const Home = () => {
  const [isRotating, setIsRotating] = useState(false);
  const [currentStage, setCurrentStage] = useState(1);
  const [currentModel, setCurrentModel] = useState("Bottle");

  const adjustBottleForScreenSize = () => {
    let screenScale = null;
    let screenPosition = null;
    let rotation = [0, 4.7, 0];

    if (currentModel === "Bottle2") {
      screenScale = [13, 13, 13];
      screenPosition = [0, 10, -135];
    } else {
      screenScale = [20, 20, 20];
      screenPosition = [0, 0, 0];
    }

    return [screenScale, screenPosition, rotation];
  };

  const [bottleScale, bottlePosition, bottleRotation] =
    adjustBottleForScreenSize();

  const handleChangeModelButtonClick = () => {
    setCurrentModel(currentModel === "Bottle" ? "Bottle2" : "Bottle");
  };

  return (
    <div>
      <div className="bottle_div">
        <section className="bottle">
          <Canvas camera={{ near: 0.1, far: 1000 }}>
            {/* Utilisez l'effet de coucher de soleil avec une texture HDR */}
            <Suspense fallback={null}>
              <Environment preset="sunset" />
            </Suspense>

            <Suspense fallback={null}>
              {currentModel === "Bottle" ? (
                <Bottle
                  isRotating={isRotating}
                  setIsRotating={setIsRotating}
                  setCurrentStage={setCurrentStage}
                  position={bottlePosition}
                  rotation={bottleRotation}
                  scale={bottleScale}
                />
              ) : (
                <Bottle2
                  isRotating={isRotating}
                  setIsRotating={setIsRotating}
                  setCurrentStage={setCurrentStage}
                  position={bottlePosition}
                  rotation={bottleRotation}
                  scale={bottleScale}
                />
              )}
            </Suspense>
          </Canvas>
        </section>
      </div>
      <div className="button_div">
        <section>
          <button className="button" onClick={handleChangeModelButtonClick}>
            Changer de modèle de bouteille
          </button>
        </section>
      </div>
    </div>
  );
};

export default Home;
