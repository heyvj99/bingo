import React, { useEffect, useState } from "react";
import ConfettiEffect from "./Confetti";

const BingoLine = ({ type, position, isCompleted }) => {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (isCompleted) {
      setShowConfetti(true);
      const timer = setTimeout(() => {
        setShowConfetti(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [isCompleted]);

  return <ConfettiEffect isActive={showConfetti} />;
};

export default BingoLine;
