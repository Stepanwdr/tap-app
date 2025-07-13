import styled from "styled-components";
import { useEffect,  } from "react";
import { ShieldUser } from "lucide-react";
import { useStoreUser } from "../../shared/model/useUserStore.ts";
import { apiInstance } from "../../shared/api";
import {Avatar} from "../../shared/ui/Avatar";

export const Header = () => {
  const { user, setUser, setCoin } = useStoreUser();

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