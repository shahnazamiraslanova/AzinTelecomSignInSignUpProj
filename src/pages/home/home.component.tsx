import {  useNavigate } from "react-router-dom";
import ButtonComponent from "../../core/shared/button/button.component";
import { useHomeMainStyle } from "./home.style";
import {useState} from 'react'
import { Routes } from "../../router/routes";

const HomeComponent = () => {
  const navigate=useNavigate()
  const {homeMain,titleHome,userName,homeChild}=useHomeMainStyle();
  const [userNamefromLocal, setUsernamefromLocal] = useState(localStorage.getItem('userName'))
 function handleLogOut(){
  localStorage.removeItem('userName');
  localStorage.removeItem('isLoggedIn');
  navigate('/'+ Routes.signin)
 }
  return (
    <div className={homeMain}>
      <div className={homeChild}>
      <h2 className={titleHome}>Welcome</h2>
      <h2 className={userName}>{userNamefromLocal}</h2>
      <ButtonComponent
            content="Log out"
            btnClassName='buttonMain'
            type="button" 
            onClick={handleLogOut}
          />
      </div>
    </div>
  )
}

export default HomeComponent