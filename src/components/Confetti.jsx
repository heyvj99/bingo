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
    <Confetti
      width={windowSize.width}
      height={windowSize.height}
      numberOfPieces={200}
      recycle={false}
      gravity={0.8}
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
  );
};

export default ConfettiEffect;
