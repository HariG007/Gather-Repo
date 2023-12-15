import FormOutBox from "../elements/FormOutBox/FormOutBox";
import LoginFormOutBox from "../elements/FormOutBox/LoginFormOutBox";
import LoginForm from "../elements/Forms/Login";
import { Link } from "react-router-dom";
import './LoginScreen.css';



const LoginScreen = () => {

  return (
    <>
    <div className="breadcrumbs">
          <Link to="/">Home</Link>
          <span>&gt;</span>
          <span>Log In</span>
        </div>
    <LoginFormOutBox/>
    
    </>
  );
};

export default LoginScreen;
