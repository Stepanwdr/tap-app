import level1 from "/level1.png";
import styled, { keyframes } from "styled-components";
import { useState } from "react";


type tap = {
  id:number
  x:number
  y: number,
}

export const TapToAslan = () => {
  const [animatedNumbers, setAnimatedNumbers] = useState<tap[]>([]); // State to hold animated numbers

  const handleTap = (tap:tap) => {
    // Create a new animated number object
    const newNumber = {
      id: Date.now(), // Unique ID for each animation
      x: tap.x, // X position of the click
      y: tap.y, // Y position of the click
    };

    // Add the new number to the animatedNumbers array
    setAnimatedNumbers((prevNumbers) => [...prevNumbers, newNumber]);

    // Remove the number after its animation is complete (e.g., 1 second)
    setTimeout(() => {
      setAnimatedNumbers((prevNumbers) =>
        prevNumbers.filter((num) => num.id !== newNumber.id)
      );
    }, 1000); // Adjust this duration to match your animation
  };

  return (
    <Wrapper>
      <SpriteContainer onClick={(ev)=>handleTap({
        x:ev.clientX,
        y:ev.clientY
      } as tap)}>
        <AslanImage src={level1} />
      </SpriteContainer>
      {animatedNumbers.map((num) => (
        <AnimatedText key={num.id} style={{ left: num.x, top: num.y }}>
          +10
        </AnimatedText>
      ))}
    </Wrapper>
  );
};

const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    width: 100%;
    height: calc(100vh - 200px);
    position: relative; /* Needed for absolute positioning of animated numbers */
    overflow: hidden; /* Hide numbers that go out of bounds */
`;

const SpriteContainer = styled.div`
    max-width: 400px;
    max-height: 400px;
    width: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer; /* Indicate clickable area */
`;

const AslanImage = styled.img`
    object-fit: contain;
    max-width: 300px;
    text-align: center;
    margin-bottom: auto;
`;

// Keyframes for the animation
const fadeAndMove = keyframes`
  0% {
    opacity: 1;
    transform: translateY(0);
  }
  100% {
    opacity: 0;
    transform: translateY(-50px); /* Adjust how high the number floats */
  }
`;

// Styled component for the animated text
const AnimatedText = styled.div`
  position: absolute;
  color: #fff; /* White color for the text */
  font-size: 1.5em; /* Adjust font size */
  font-weight: bold;
  pointer-events: none; /* Make sure it doesn't interfere with clicks */
  animation: ${fadeAndMove} 0.2s forwards; /* Apply animation */
  z-index: 10; /* Ensure it's above other elements */
  transform: translate(-50%, -100%); /* Center the text relative to the click */
`;