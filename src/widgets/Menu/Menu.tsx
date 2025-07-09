import styled from "styled-components";
import { useLocation, useNavigate} from "react-router-dom";
import { Gamepad2, House, User, HandCoins, Gift, Medal } from "lucide-react";

const MenuList=[
  {
    id:1,
    name:"Home",
    link:"/",
    icon :<House />,
    title:'Գլխավոր'
  },
  {
  id:2,
  name:"Games",
  link:"/games",
  title:'Խաղեր',
  icon :<Gamepad2 />
},
  {
    id:4,
    name:"Earn",
    link:"/earn",
    title:'Վաստակել',
    icon :<HandCoins />
  },
  {
    id:4,
    name:"Gift",
    link:"/gifts",
    title:'Նվերներ',
    icon :<Gift />
  },
  {
    id:4,
    name:"Gift",
    link:"/top",
    title:'Թոփ',
    icon :<Medal />
  },
  {
    id:3,
    name:"Profile",
    link:"/profile",
    title:'Հաշիվ',
    icon :<User />
  },
]

export const Menu = () => {

  const {pathname}=useLocation();
   const navigate=useNavigate()
  return (
    <Nav>
      <List>
        {MenuList.map((item)=>
          <ListItem key={item.id} $selected={pathname===item.link}>
          <button className={'link'}
                  onClick={()=>navigate(item.link)}
            >
             <span className={'icon'}>{item.icon}</span>
            <Title>
              {item.title}
            </Title>
          </button>
          </ListItem>)}
      </List>
    </Nav>
  );
};


const Nav= styled.nav`
   display: flex;
   background: #213547;
   border-top-left-radius: 20px;
   border-top-right-radius: 20px;
   align-items: center;
   justify-content: center;
   padding: 15px;
   opacity: .8;
   user-select: none;
    z-index: 100;
`

const List = styled.ul`
    display: flex;
    align-items: flex-start;
    gap: 15px;
    width: 100%;
    justify-content: space-between;
    
`
const ListItem = styled.li<{$selected:boolean}>`
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
    gap: 2px;
    .icon {
        border-radius: 5px;
        padding: 5px;
        min-width: 40px;
        background-image: ${({$selected})=>$selected && 'var(--gradient-bg)'};
    }
     .link {
       display: flex;
       flex-direction: column;
       align-items: center;
       font-size: 12px;
       text-align: center;
         &:hover {
             color: white;
         }
     }
`

const Title = styled.p`
    text-align: center;
    white-space: pre-line;
`