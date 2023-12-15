import { Link } from 'react-router-dom';
import Sidebar from '../components/sidebar/Sidebar';
import RegisterForm from '../elements/Forms/UpdateProfile';
import SideBarButton from '../elements/SideBarButtons/SideBarButtons';
import SubsTable from '../pages/UserProfile/SubsTable/SubsTable';
import UserProfile from '../pages/UserProfile/Profile/UserProfile';

const ProfileScreen = () => {
  
 

  return (
    <div style={{display:'flex'}}>
      <Sidebar/>
      <RegisterForm/>
      <SubsTable/>
    </div>
  );
};

export default ProfileScreen;
