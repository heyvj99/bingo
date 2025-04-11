import React, { useEffect, useState } from "react";
import Confetti from "react-confetti";

const BigCelebration = ({ isActive }) => {
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
        numberOfPieces={300}
        recycle={false}
        gravity={0.5}
        initialVelocityY={70}
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
      <Confetti
        width={windowSize.width}
        height={windowSize.height}
        numberOfPieces={200}
        recycle={false}
        gravity={0.3}
        initialVelocityY={90}
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
        numberOfPieces={150}
        recycle={false}
        gravity={0.7}
        initialVelocityY={50}
        initialVelocityX={25}
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

export default BigCelebration;
