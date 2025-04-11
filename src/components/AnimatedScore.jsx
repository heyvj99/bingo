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
      <div className="text-xl font-display bg-white border-2 border-black px-3 py-1 inline-block shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
        <span className="font-normal">BINGOS: </span>
        <span ref={scoreRef} className="font-bold">
          {score}
        </span>
      </div>
    </div>
  );
};

export default AnimatedScore;
