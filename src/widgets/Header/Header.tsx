import styled from "styled-components";
import { useEffect,  } from "react";
import { ShieldUser, CirclePoundSterling } from "lucide-react";
import { useStoreUser } from "../../shared/model/useUserStore.ts";
import { apiInstance } from "../../shared/api";
import {Avatar} from "../../shared/ui/Avatar.tsx";

export const Header = () => {
  const { user, setUser, setCoin, coin } = useStoreUser();

    const sendAuthRequest = async () => {
    const tg = window.Telegram?.WebApp;
    tg?.ready();
    const user = await tg?.initDataUnsafe?.user
   apiInstance.post("api/auth-telegram", {
      tgUserId: user?.id || 32323232,
      firstName: user?.first_name || "Grno",
      username: user?.username || "Grno",
      coin: 0,
      avatar: user?.photo_url,
    })
      .then(res => {
        setUser(res.data.user)
        setCoin(res?.data?.user?.coin)
      })
      .catch(err => console.error(err));
  };

  useEffect(() => {
    void sendAuthRequest()
  }, []);

  return (
    <StyledHeader>
     <HeaderInner>
       {user?.username}
        <Avatar src={user?.avatar} fallback={<ShieldUser/>}/>
       <Coin>
         <CirclePoundSterling />
         {coin}
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