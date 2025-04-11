import React, { useEffect, useRef } from "react";

const AnimatedScore = ({ score, isAnimating }) => {
  const scoreRef = useRef(null);

  useEffect(() => {
    if (isAnimating && scoreRef.current) {
      // Reset animation class
      scoreRef.current.classList.remove("animate-score-increase");

      // Force reflow to restart animation
      void scoreRef.current.offsetWidth;

      // Add animation class
      scoreRef.current.classList.add("animate-score-increase");
    }
  }, [isAnimating, score]);

  return (
    <div className="relative inline-block">
      {/* Score display */}
      <div className="text-xl font-display bg-white-0 py-1 inline-block">
        <span className="font-normal">BINGOS: </span>
        <span ref={scoreRef} className="font-bold">
          {score}
        </span>
      </div>
    </div>
  );
};

export default AnimatedScore;
