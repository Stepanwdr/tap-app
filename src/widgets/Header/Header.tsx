import styled from "styled-components";
import { useEffect, useState } from "react";
import { ShieldUser,CirclePoundSterling } from "lucide-react";
const mockUser =  {
  name:"Stepan",
  coin:100,
  avatar:'',
}

export const Header = () => {
  const [user, setUser] = useState<any>(null);
  const tg = window.Telegram?.WebApp;


  useEffect(() => {
      const tgUser = tg?.initDataUnsafe?.user;
      setUser(tgUser);
  }, []);

  useEffect(() => {
    tg?.ready();
  }, []);
  return (
    <StyledHeader>
     <HeaderInner>
       {user?.name}
       <ShieldUser />
       {mockUser.name}
       <Coin>
         <CirclePoundSterling />
         {mockUser.coin}
       </Coin>


     </HeaderInner>
    </StyledHeader>
  );
};

const StyledHeader=styled.header`
    display: flex;
    background: #213547;
    border-radius: 10px;
    padding: 10px;
    margin: 10px;
    color: white;
`
const HeaderInner =styled.div`
  display: flex;
  gap: 5px;
  align-items: center;
  width: 100%;
`

const Coin=styled.div`
    margin-left: auto;
    border-radius: 10px;
    padding: 5px 10px;
    font-weight: bold;
    display: flex;
    gap: 5px;
    background-image: var(--gradient-bg) ;
    color: white;
`