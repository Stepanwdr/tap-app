import { type FC, useRef } from "react";
import styled from "styled-components";

export const PuzzlePiece: FC<PuzzlePieceProps> = ({
                                                    index,
                                                    pieceIndex,
                                                    rows,
                                                    cols,
                                                    imageSrc,
                                                    onSwap,
                                                  }) => {
  const startX = useRef<number | null>(null);
  const startY = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    startX.current = e.touches[0].clientX;
    startY.current = e.touches[0].clientY;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (startX.current === null || startY.current === null) return;

    const endX = e.changedTouches[0].clientX;
    const endY = e.changedTouches[0].clientY;

    const deltaX = endX - startX.current;
    const deltaY = endY - startY.current;

    const threshold = 30; // минимальный свайп в px

    // Определяем направление свайпа
    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      // Горизонтальный свайп
      if (deltaX > threshold) {
        // Свайп вправо
        const rightIndex = index + 1;
        onSwap(index, rightIndex);
      } else if (deltaX < -threshold) {
        // Свайп влево
        const leftIndex = index - 1;
        onSwap(index, leftIndex);
      }
    } else {
      // Вертикальный свайп
      if (deltaY > threshold) {
        // Свайп вниз
        const downIndex = index + cols;
        onSwap(index, downIndex);
      } else if (deltaY < -threshold) {
        // Свайп вверх
        const upIndex = index - cols;
        onSwap(index, upIndex);
      }
    }

    startX.current = null;
    startY.current = null;
  };

  return (
    <PuzzlePieceStyled
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
      style={{
        backgroundImage: `url(${imageSrc})`,
        backgroundSize: `${cols * 60}px ${rows * 60}px`,
        backgroundPosition: `${(pieceIndex % cols) * -60}px ${
          Math.floor(pieceIndex / cols) * -60
        }px`,
      }}
    />
  );
};

type PuzzlePieceProps = {
  index: number;
  pieceIndex: number;
  rows: number;
  cols: number;
  imageSrc: string;
  onSwap: (from: number, to: number) => void;
  setSelectedIndex: (index: number | null) => void;
};

const PuzzlePieceStyled = styled.div`
    width: 60px;
    height: 60px;
    cursor: grab;
    border: 1px solid #ccc;
    background-repeat: no-repeat;
`;
