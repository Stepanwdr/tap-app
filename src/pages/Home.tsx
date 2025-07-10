import styled from "styled-components";
import {GamesList} from "../widgets/GamesList/GamesList";
import {CurtainDrawer} from "../shared/ui/CurtainDrawer";
import {useLocation, useNavigate} from "react-router-dom";
import { TapToAslan } from "../widgets/GamesList/TapToAslan/TapToAslan";
import { useState } from "react";

const Home = () => {
const [tapCount, setTapCount]=useState(0)
  const { pathname } = useLocation();

  const navigate=useNavigate();

  const renderPages=()=> {
    switch (pathname) {

      case '/games':
        return  <GamesList />
      case '/earn':
        return  'earn'
      case '/gifts':
        return  'gifts'
      case '/top':
        return  'top'
      case '/profile':
        return  'profile'
      default :
        return null
    }
  }

  return (
    <Wrapper>
      <TapToAslan
        tapCount={tapCount}
        setTapCount={setTapCount}
      />
      <CurtainDrawer fullHeight onClose={()=>navigate('/')} isOpen={['/games','/earn','/gifts','/top','/profile'].includes(pathname)} >
        {renderPages()}
      </CurtainDrawer >
    </Wrapper>
  );
};

export default Home;

const Wrapper=styled.div`
  display: flex;
  flex-direction: column;
`