import React, { useState, useEffect } from "react";
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
  const [showBingo, setShowBingo] = useState(false);

  // Initialize free space
  useEffect(() => {
    const newTiles = [...tiles];
    newTiles[18] = true; // FREE SPACE is at index 18
    setTiles(newTiles);
  }, []);

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
    if (index === 18) return; // FREE SPACE can't be unticked

    const newTiles = [...tiles];
    newTiles[index] = !newTiles[index];
    setTiles(newTiles);

    const newBingoCount = checkBingo(newTiles);
    setBingoCount(newBingoCount);

    if (newBingoCount > 0 && !showBingo) {
      setShowBingo(true);
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

  return (
    <div className="min-h-screen py-8 px-4">
      <header className="text-center mb-8">
        <h1 className="text-4xl font-bold mb-2">Job Seeker Struggles Bingo</h1>
        <p className="text-gray-600">
          Let it out. You've earned this. Tick what you've survived.
        </p>
        <div className="mt-4 text-lg font-semibold">Bingos: {bingoCount}</div>
      </header>

      <div id="bingo-grid" className="bingo-grid">
        {BINGO_CONTENT.map((content, index) => (
          <div
            key={index}
            className={classNames("bingo-tile", {
              ticked: tiles[index],
              "free-space": index === 18,
            })}
            onClick={() => handleTileClick(index)}
          >
            <div className="text-sm font-medium text-center">{content}</div>
            {tiles[index] && (
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-2xl">
                ✅
              </div>
            )}
          </div>
        ))}
      </div>

      {showBingo && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center">
          <div className="bg-white p-8 rounded-lg text-center">
            <h2 className="text-3xl font-bold mb-4">BINGO! 🎉</h2>
            <p className="mb-6">
              You've survived the job search! Share your achievement!
            </p>
            <button
              onClick={handleScreenshot}
              className="bg-primary text-white px-6 py-2 rounded-lg hover:bg-primary/90 transition-colors"
            >
              Download & Share
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
