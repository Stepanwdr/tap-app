import styled from "styled-components";
import type {FC, ReactNode} from "react";
import { Outlet } from "react-router-dom";

interface Props {
  slotMenu:ReactNode;
  slotHeader:ReactNode;
}
export const Layout:FC<Props> = ({slotMenu,slotHeader}) => {
  return (
    <Wrapper>
      {slotHeader}
      <main>
        <Outlet/>
      </main>
      <div className={'menu'}>
        {slotMenu}
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div`
    height: 100vh;
    display: flex;
    flex-direction: column;
 
    
    .menu {
        max-width: 100%;
    }
    main{
        height: calc(100vh - 60px);
        padding:10px;
    }
`