
import FormOutBox from '../elements/FormOutBox/FormOutBox';
import RegisterForm from '../elements/Forms/Register';
import { Link } from 'react-router-dom';

const RegisterScreen = () => {
 

  const labelStyle = {
    padding:'5px',
    fontWeight: 'bold',
  };
  const ControlStyle = {
    padding:'10px 20px',
    borderRadius:'30px',
  };

  const buttonStyle = {
    marginTop: '15px', // Adjust the spacing between the form and the button
  };

  return (
    <div>
      <div className="breadcrumbs">
          <Link to="/">Home</Link>
          <span>&gt;</span>
          <span>New User</span>
        </div>
   
    <FormOutBox/>
    </div>
  );
};

export default RegisterScreen;
