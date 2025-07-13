import level1 from "/level1.png";
import styled, {css, keyframes} from "styled-components";
import { useState } from "react";
import { useScoreCounter } from "../../../shared/model/useScoreCounter";
import { useStoreUser } from "../../../shared/model/useUserStore";


type tap = {
  id:number
  x:number
  y: number,
}

export const TapToAslan = () => {
  const [animatedNumbers, setAnimatedNumbers] = useState<tap[]>([]); // State to hold animated numbers
  const { setCoin, coin , user} = useStoreUser()
  const { increment } = useScoreCounter({ tgUserId:user?.tgUserId || 0})
  const [clicks, setClicks] = useState(0);
  const [animate, setAnimate] = useState(false);

  const handleTap = (tap:tap) => {
    // Create a new animated number object
    const newNumber = {
      id: Date.now(), // Unique ID for each animation
      x: tap.x, // X position of the click
      y: tap.y, // Y position of the click
    };
    setCoin(coin + 10)
    setAnimate(true);
    setTimeout(() => setAnimate(false), 900);
    const newClicks = clicks + 1;
    setClicks(newClicks);

    increment()
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
      <Button onClick={(ev)=>handleTap({
        x:ev.clientX,
        y:ev.clientY
      } as tap)}>
        <AslanImage src={level1} animate={animate} />
      </Button>
      {animatedNumbers.map((num) => (
        <AnimatedText key={num.id} style={{ left: num.x, top: num.y }}>
          +10
        </AnimatedText>
      ))}
    </Wrapper>
  );
};

// Анимация прыжка
const jump = keyframes`
  0% { transform: translateY(0); }
  30% { transform: translateY(-20px); }
  60% { transform: translateY(5px); }
  100% { transform: translateY(0); }
`;


const Wrapper = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: calc(100vh - 200px);
    position: relative; /* Needed for absolute positioning of animated numbers */
    overflow: hidden; /* Hide numbers that go out of bounds */
`;

const Button = styled.button`
    max-width: 400px;
    max-height: 400px;
    width: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer; /* Indicate clickable area */
`;

const AslanImage = styled.img<{ animate: boolean }>`
    width: 280px;
    height: auto;
    ${({ animate }) =>
            animate &&
            css`
      animation: ${jump} 0.6s ease;
    `}
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
  animation: ${fadeAndMove} 0.4s forwards; /* Apply animation */
  z-index: 10; /* Ensure it's above other elements */
  transform: translate(-50%, -100%); /* Center the text relative to the click */
`;