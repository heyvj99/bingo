import React, { useState } from "react";
import html2canvas from "html2canvas";
import classNames from "classnames";

const BINGO_CONTENT = [
  "Got ghosted after the final round",
  "Applied for 1000+ roles",
  "Laid off recently",
  "Customized every resume",
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
  "FREE SPACE",
  "Heard 'we went with another candidate'",
  "Reached final round twice this month",
  "Rewrote portfolio 3 times",
  "Tried networking but no response",
  "Did 10+ applications in one sitting",
  "Got a referral — still got rejected",
];

function App() {
  const [tiles, setTiles] = useState(Array(25).fill(false));
  const [bingoCount, setBingoCount] = useState(0);

  const checkBingo = (newTiles) => {
    const rows = [
      [0, 1, 2, 3, 4],
      [5, 6, 7, 8, 9],
      [10, 11, 12, 13, 14],
      [15, 16, 17, 18, 19],
      [20, 21, 22, 23, 24],
    ];

    const columns = [
      [0, 5, 10, 15, 20],
      [1, 6, 11, 16, 21],
      [2, 7, 12, 17, 22],
      [3, 8, 13, 18, 23],
      [4, 9, 14, 19, 24],
    ];

    const diagonals = [
      [0, 6, 12, 18, 24],
      [4, 8, 12, 16, 20],
    ];

    const allLines = [...rows, ...columns, ...diagonals];
    const completedLines = allLines.filter((line) =>
      line.every((index) => newTiles[index])
    );

    return completedLines.length;
  };

  const handleTileClick = (index) => {
    const newTiles = [...tiles];
    newTiles[index] = !newTiles[index];
    setTiles(newTiles);

    const newBingoCount = checkBingo(newTiles);
    setBingoCount(newBingoCount);
  };

  const handleScreenshot = async () => {
    const element = document.getElementById("bingo-grid");
    const canvas = await html2canvas(element);
    const link = document.createElement("a");
    link.download = "job-seeker-bingo.png";
    link.href = canvas.toDataURL();
    link.click();
  };

  return (
    <div className="h-screen flex flex-col p-3 bg-yellow-100">
      <header className="text-center mb-3">
        <h1 className="neo-title mb-1 font-display">
          Job Seeker Struggles Bingo
        </h1>
        <p className="neo-subtitle text-black/80 font-display">
          Let it out. You've earned this. Tick what you've survived.
        </p>
        <div className="mt-2 text-xl font-display bg-white border-2 border-black px-3 py-1 inline-block shadow-[2px_2px_0px_0px_rgba(0,0,0,1)]">
          BINGOS: {bingoCount}
        </div>
      </header>

      <div className="flex-grow flex items-center justify-center">
        <div id="bingo-grid" className="bingo-grid">
          {BINGO_CONTENT.map((content, index) => (
            <div
              key={index}
              className={classNames("bingo-tile", {
                ticked: tiles[index],
              })}
              onClick={() => handleTileClick(index)}
            >
              <div className="text-sm font-normal text-center">{content}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-center mt-3">
        <button onClick={handleScreenshot} className="neo-button font-display">
          DOWNLOAD & SHARE
        </button>
      </div>
    </div>
  );
}

export default App;
