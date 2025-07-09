import styled from "styled-components";
import {mockGames} from "./mocks";

export const GamesList = () => {
  return (
    <Wrapper>
      <p>Խաղեր ({mockGames.length})</p>
      <ul>
        {mockGames.map((game) =>
          <Game key={game.id}>
            <GameLogo>
              <img src={game.image} alt="sds"/>
            </GameLogo>
            <Name>{game.name}</Name>
          </Game>
        )}
      </ul>
    </Wrapper>
  );
};

const Wrapper =styled.ul`
  ul {
    display: flex;
    gap: 10px;
    overflow-x: auto;
    margin-top: 10px;
      &::-webkit-scrollbar-thumb {
          display: none;
      }

      &::-webkit-scrollbar {
          display: none;
      }
  }
`
const Game=styled.li`
  border-radius: 22px;
  font-size: 12px;
  text-align: center;
  height: 200px;
  background: var(--gradient-bg);
`

const Name=styled.p``

const GameLogo=styled.div`
  border-radius: 20px;
  min-width: 100px;
  width: 100px;
    img { 
      object-fit: contain;
      width: 100%;
      border-radius: 20px;
    }
`