import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";

const ConfettiEffect = ({ isActive }) => {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    const handleResize = () => {
      setWindowSize({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  if (!isActive) return null;

  return (
    <>
      {/* Multiple confetti instances for a more dramatic effect */}
      <Confetti
        width={windowSize.width}
        height={windowSize.height}
        numberOfPieces={500}
        recycle={false}
        gravity={0.5}
        initialVelocityY={30}
        initialVelocityX={15}
        colors={[
          "#FFD700",
          "#FFA500",
          "#FF69B4",
          "#87CEEB",
          "#98FB98",
          "#FF4500",
          "#00FF00",
          "#FF00FF",
        ]}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          pointerEvents: "none",
          zIndex: 1000,
        }}
      />
      <Confetti
        width={windowSize.width}
        height={windowSize.height}
        numberOfPieces={1000}
        recycle={false}
        gravity={0.9}
        initialVelocityY={25}
        initialVelocityX={10}
        colors={[
          "#FFD700",
          "#FFA500",
          "#FF69B4",
          "#87CEEB",
          "#98FB98",
          "#FF4500",
          "#00FF00",
          "#FF00FF",
        ]}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          pointerEvents: "none",
          zIndex: 1000,
        }}
      />
      <Confetti
        width={windowSize.width}
        height={windowSize.height}
        numberOfPieces={1175}
        recycle={false}
        gravity={0.2}
        initialVelocityY={35}
        initialVelocityX={20}
        colors={[
          "#FFD700",
          "#FFA500",
          "#FF69B4",
          "#87CEEB",
          "#98FB98",
          "#FF4500",
          "#00FF00",
          "#FF00FF",
        ]}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          pointerEvents: "none",
          zIndex: 1000,
        }}
      />
    </>
  );
};

export default ConfettiEffect;
