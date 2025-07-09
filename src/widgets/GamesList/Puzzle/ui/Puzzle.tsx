import { type FC, useEffect, useState } from "react";
import { PuzzlePiece } from "./PuzzlePiece.tsx";
import styled from "styled-components";

type PuzzleProps = {
  rows: number;
  cols: number;
  imageSrc: string;
};


function shuffleArray(array: number[]) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
function formatTime(seconds: number) {
  const min = Math.floor(seconds / 60);
  const sec = seconds % 60;
  return `${min}:${sec.toString().padStart(2, "0")}`;
}


export const Puzzle:FC<PuzzleProps>=({ rows, cols, imageSrc })=> {
  const [pieces, setPieces] = useState<number[]>([]);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [timeLeft, setTimeLeft] = useState(60);

  useEffect(() => {
    const tempPieces = Array.from({ length: rows * cols }, (_, i) => i);
    shuffleArray(tempPieces);
    setPieces(tempPieces);
  }, [rows, cols]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          const tempPieces = Array.from({ length: rows * cols }, (_, i) => i);
          shuffleArray(tempPieces);
          setPieces(tempPieces);
          return 60;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  function swapPieces(index1: number, index2: number) {
    if (index2 < 0 || index2 >= pieces.length) return;
    const newPieces = [...pieces];
    [newPieces[index1], newPieces[index2]] = [newPieces[index2], newPieces[index1]];
    setPieces(newPieces);
  }

  function checkWin() {
    return pieces.every((val, idx) => val === idx);
  }

  return (
    <PuzzleWrapper cols={cols}>
      {pieces.map((pieceIndex, i) => (
        <PuzzlePiece
          key={i}
          index={i}
          pieceIndex={pieceIndex}
          rows={rows}
          cols={cols}
          imageSrc={imageSrc}
          onSwap={swapPieces}
          setSelectedIndex={setSelectedIndex}
        />
      ))}
      <Timer>Осталось времени: {formatTime(timeLeft)}</Timer>

      {checkWin() && <WinMessage>🎉 Вы собрали пазл!</WinMessage>}
    </PuzzleWrapper>
  );
}


const PuzzleWrapper = styled.div<{ cols: number }>`
  display: grid;
  grid-template-columns: repeat(${({ cols }) => cols}, 60px);
  justify-content: center;
  margin: 20px auto;
`;

const WinMessage = styled.div`
  margin-top: 20px;
  font-size: 24px;
  color: green;
`;


const Timer = styled.div`
  margin-top: 10px;
  font-size: 18px;
  color: #333;
  display: flex;
  flex-wrap: nowrap;
  white-space: nowrap;
`;