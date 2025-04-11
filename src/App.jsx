import React, { useState, useEffect } from "react";
import html2canvas from "html2canvas";
import classNames from "classnames";
import AnimatedScore from "./components/AnimatedScore";
import BingoLine from "./components/BingoLine";
import BigCelebration from "./components/BigCelebration";

const BINGO_CONTENT = [
  "Got ghosted after the final round",
  "Applied for 1000+ roles",
  "Customized resume for 100 applications",
  "Got rejected in <24 hours",
  "Interviewer didn't show up",
  "Asked to do unpaid project",
  "Got a 'we'll keep you in mind' email",
  "Used ChatGPT for cover letter",
  "Cried after a rejection",
  "Spent all weekend job hunting",
  "Practiced STAR method",
  "Ghosted after recruiter call",
  "Made a job search spreadsheet",
  "Missed a deadline accidentally",
  "Had technical issues in interview",
  "Applied for a role I was overqualified for",
  "Felt like giving up",
  "Attended networking events",
  "Laid off recently",
  "Heard 'we went with another candidate'",
  "Reached final round twice this month",
  "Rewrote portfolio 10 times",
  "Tried networking but no response",
  "Did 20+ applications in one sitting",
  "Got a referral — still got rejected",
];

function App() {
  const [tiles, setTiles] = useState(Array(25).fill(false));
  const [bingoCount, setBingoCount] = useState(0);
  const [isScoreAnimating, setIsScoreAnimating] = useState(false);
  const [completedLines, setCompletedLines] = useState([]);
  const [previousBingoCount, setPreviousBingoCount] = useState(0);
  const [showBigCelebration, setShowBigCelebration] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  // Update window width on resize
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Define all possible bingo lines
  const bingoLines = [
    // Rows
    [0, 1, 2, 3, 4],
    [5, 6, 7, 8, 9],
    [10, 11, 12, 13, 14],
    [15, 16, 17, 18, 19],
    [20, 21, 22, 23, 24],
    // Columns
    [0, 5, 10, 15, 20],
    [1, 6, 11, 16, 21],
    [2, 7, 12, 17, 22],
    [3, 8, 13, 18, 23],
    [4, 9, 14, 19, 24],
    // Diagonals
    [0, 6, 12, 18, 24],
    [4, 8, 12, 16, 20],
  ];

  const checkBingo = (newTiles) => {
    const completedLines = bingoLines.filter((line) =>
      line.every((index) => newTiles[index])
    );

    // Update completed lines state
    setCompletedLines(completedLines);

    return completedLines.length;
  };

  const handleTileClick = (index) => {
    const newTiles = [...tiles];
    newTiles[index] = !newTiles[index];
    setTiles(newTiles);

    // Check for completed lines first
    const newCompletedLines = bingoLines.filter((line) =>
      line.every((index) => newTiles[index])
    );

    // Update completed lines state immediately
    setCompletedLines(newCompletedLines);

    const newBingoCount = newCompletedLines.length;

    // Check if bingo count increased
    if (newBingoCount > bingoCount) {
      setPreviousBingoCount(bingoCount);
      setBingoCount(newBingoCount);
      setIsScoreAnimating(true);

      // Check if we've hit 12 bingos for the big celebration
      if (newBingoCount === 12) {
        setShowBigCelebration(true);
        // Hide the big celebration after 5 seconds
        setTimeout(() => {
          setShowBigCelebration(false);
        }, 5000);
      }

      // Reset animation flag after animation completes
      setTimeout(() => {
        setIsScoreAnimating(false);
      }, 700);
    } else {
      setBingoCount(newBingoCount);
    }
  };

  const handleScreenshot = async () => {
    const element = document.getElementById("bingo-grid");
    const canvas = await html2canvas(element);
    const link = document.createElement("a");
    link.download = "job-seeker-bingo.png";
    link.href = canvas.toDataURL();
    link.click();
  };

  const handleReset = () => {
    setTiles(Array(25).fill(false));
    setBingoCount(0);
    setCompletedLines([]);
    setPreviousBingoCount(0);
    setShowBigCelebration(false);
  };

  // Show mobile message for screens below 290px
  if (windowWidth < 290) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-yellow-200">
        <div className="mobile-message">
          <h1 className="neo-title mb-2">Job Hunt Survival</h1>
          <p>To get a good experience, please access this on desktop.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center p-2 sm:p-4 bg-yellow-200">
      <header className="text-center mb-2 sm:mb-4 flex flex-col gap-1 w-full max-w-[min(100vw-1rem,42rem)]">
        <h1 className="neo-title mb-1 font-display">Job Hunt Survival</h1>
        <p className="neo-subtitle text-black/80 font-display">
          Let it out. You've earned this. Tick what you've survived.
        </p>
      </header>

      <div className="flex-grow flex items-center justify-center my-2 w-full">
        <div id="bingo-grid" className="bingo-grid relative">
          {BINGO_CONTENT.map((content, index) => (
            <div
              key={index}
              className={classNames("bingo-tile", {
                ticked: tiles[index],
              })}
              onClick={() => handleTileClick(index)}
            >
              <div className="tile-content">{content}</div>
            </div>
          ))}
          {/* Render bingo lines */}
          {completedLines.map((line, lineIndex) => {
            // Determine line type and position
            let type = "row";
            let position = 0;

            // Check if it's a row
            if (lineIndex < 5) {
              type = "row";
              position = lineIndex;
            }
            // Check if it's a column
            else if (lineIndex < 10) {
              type = "column";
              position = lineIndex - 5;
            }
            // It's a diagonal
            else {
              type = "diagonal";
              position = lineIndex - 10;
            }

            return (
              <BingoLine
                key={`line-${lineIndex}`}
                type={type}
                position={position}
                isCompleted={true}
              />
            );
          })}
        </div>
      </div>

      <div className="flex flex-col sm:flex-row justify-between items-center gap-4 my-4 w-full max-w-[min(100vw-1rem,42rem)]">
        <div>
          <AnimatedScore score={bingoCount} isAnimating={isScoreAnimating} />
        </div>
        <div className="flex gap-2 sm:gap-4">
          <button
            onClick={handleReset}
            className="neo-button font-display bg-white text-dark"
          >
            RESET
          </button>
          <button
            onClick={handleScreenshot}
            className="neo-button font-display"
          >
            DOWNLOAD & SHARE
          </button>
        </div>
      </div>

      {/* Big celebration when score hits 12 */}
      <BigCelebration isActive={showBigCelebration} />
    </div>
  );
}

export default App;
