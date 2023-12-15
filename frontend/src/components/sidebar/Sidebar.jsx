import "./sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
// import LoginIcon from '@mui/icons-material/Login';
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import { Link } from "react-router-dom";
import CardMembershipTwoToneIcon from '@mui/icons-material/CardMembershipTwoTone';
import StorageIcon from '@mui/icons-material/Storage';
// import AppRegistrationIcon from '@mui/icons-material/AppRegistration';
import ManageAccountsTwoToneIcon from '@mui/icons-material/ManageAccountsTwoTone';
import MyLocationTwoToneIcon from '@mui/icons-material/MyLocationTwoTone';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../../slices/usersApiSlice';
import { logout } from '../../slices/authSlice';
import SideBarButton from "../../elements/SideBarButtons/SideBarButtons";

const Sidebar = () => {

  
  const { userInfo } = useSelector((state) => state.auth);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [logoutApiCall] = useLogoutMutation();
  const logoutHandler = async () => {
    try {
      await logoutApiCall().unwrap();
      dispatch(logout());
      navigate('/login');
    } catch (err) {
      console.error(err);
    }
  };
  const userSettingsSVGPath = "M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256 256-114.6 256-256S397.4 0 256 0zm0 464c-119.1 0-216-96.88-216-216S136.9 32 256 32s216 96.88 216 216-96.88 216-216 216zm0-408c-91.65 0-166 74.35-166 166s74.35 166 166 166 166-74.35 166-166S347.6 56 256 56zM256 304c-39.75 0-72-32.25-72-72s32.25-72 72-72 72 32.25 72 72-32.25 72-72 72z";
  const logDetailsSVGPath = "M288 0C127.8 0 0 41.16 0 92v24c0 8.84 7.16 16 16 16h32c8.84 0 16-7.16 16-16V116c0-8.84 7.16-16 16-16h352c8.84 0 16 7.16 16 16v16c0 8.84 7.16 16 16 16s16-7.16 16-16V116c0-50.84-127.8-92-288-92zM480 220V228c0 8.84-7.16 16-16 16H16c-8.84 0-16-7.16-16-16v-8c0-50.84 127.8-92 288-92s288 41.16 288 92zm0 64V292c0 8.84-7.16 16-16 16H16c-8.84 0-16-7.16-16-16v-8c0-50.84 127.8-92 288-92s288 41.16 288 92zm0 64V356c0 8.84-7.16 16-16 16H16c-8.84 0-16-7.16-16-16v-8c0-50.84 127.8-92 288-92s288 41.16 288 92zm0 64V420c0 8.84-7.16 16-16 16H16c-8.84 0-16-7.16-16-16v-8c0-50.84 127.8-92 288-92s288 41.16 288 92z";
  const mapSVGPath = "M496 0H16C7.16 0 0 7.16 0 16v480c0 8.84 7.16 16 16 16h480c8.84 0 16-7.16 16-16V16C512 7.16 504.84 0 496 0zM464 464H48V160h416V464z";
  const dataSubscriptionSVGPath = "M368 112h-40V72c0-13.3-10.7-24-24-24s-24 10.7-24 24v40h-40c-13.3 0-24 10.7-24 24s10.7 24 24 24h40v40c0 13.3 10.7 24 24 24s24-10.7 24-24v-40h40c13.3 0 24-10.7 24-24S381.3 112 368 112zM256 416c-35.3 0-64-28.7-64-64s28.7-64 64-64s64 28.7 64 64S291.3 416 256 416zM448 32H368c-13.3 0-24 10.7-24 24s10.7 24 24 24h40v40c0 13.3 10.7 24 24 24s24-10.7 24-24v-40h40c13.3 0 24-10.7 24-24S461.3 32 448 32z";
  const profileSVGPath = "M256 0C114.6 0 0 114.6 0 256s114.6 256 256 256 256-114.6 256-256S397.4 0 256 0zm0 480C132.3 480 32 379.7 32 256S132.3 32 256 32s224 100.3 224 224-100.3 224-224 224z M256 64c-70.7 0-128 57.3-128 128s57.3 128 128 128s128-57.3 128-128S326.7 64 256 64zM256 368c-58.7 0-112-31.7-176-80c9.7-38.7 77.3-64 176-64s166.3 25.3 176 64C368 336.3 314.7 368 256 368z";
  const logoutSVGPath = "M320 448H64c-35.3 0-64-28.7-64-64V128c0-35.3 28.7-64 64-64h256c8.8 0 16 7.2 16 16s-7.2 16-16 16H64c-17.6 0-32 14.4-32 32v256c0 17.6 14.4 32 32 32h256c8.8 0 16 7.2 16 16S328.8 448 320 448zM512 256h-42.4c-25.6 0-47.2-18.4-62.4-44.8C369.6 191.2 360 165.6 360 136c0-70.4 57.6-128 128-128s128 57.6 128 128c0 29.6-9.6 55.2-26.4 75.2-15.2 26.4-36.8 44.8-62.4 44.8H512zM464 200c7.2 12 16 22.4 26.4 30.4 12 9.6 25.6 16.8 39.2 22.4 5.6 1.6 9.6 6.4 9.6 12.8s-4.8 11.2-11.2 12.8c-0.8 0-1.6 0-2.4 0H392c-8 0-14.4-6.4-14.4-14.4S384 224 392 224H464z";
const barGraphSVGPath = "M16 384h64v-256h-64v256zM112 384h64v-192h-64v192zM208 384h64v-320h-64v320zM304 384h64v-64h-64v64zM400 384h64v-128h-64v128z";

  const notificationSVGPath="M224 0c-17.7 0-32 14.3-32 32V49.9C119.5 61.4 64 124.2 64 200v33.4c0 45.4-15.5 89.5-43.8 124.9L5.3 377c-5.8 7.2-6.9 17.1-2.9 25.4S14.8 416 24 416H424c9.2 0 17.6-5.3 21.6-13.6s2.9-18.2-2.9-25.4l-14.9-18.6C399.5 322.9 384 278.8 384 233.4V200c0-75.8-55.5-138.6-128-150.1V32c0-17.7-14.3-32-32-32zm0 96h8c57.4 0 104 46.6 104 104v33.4c0 47.9 13.9 94.6 39.7 134.6H72.3C98.1 328 112 281.3 112 233.4V200c0-57.4 46.6-104 104-104h8zm64 352H224 160c0 17 6.7 33.3 18.7 45.3s28.3 18.7 45.3 18.7s33.3-6.7 45.3-18.7s18.7-28.3 18.7-45.3z";
  return (
    <div className="sidebar">
      {/* <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">SIH</span>
        </Link>
      </div>  */}
      <hr />
      <div className="center">
        <ul>
          <p className="title">Navigation</p>

          
          <li>
          <SideBarButton  buttonText="Statistics" route="/" svgPath={barGraphSVGPath} />
          </li>

          <p></p>
      
          

          <p className="title">Services</p>
          
          <li>
          <SideBarButton buttonText="Log Status" route="/logstatus" svgPath={logDetailsSVGPath} />
          </li>

          <p></p>

          <li>
          <SideBarButton buttonText="Data Subscription" route="/datasubcription" svgPath={dataSubscriptionSVGPath} />
          </li>

          <p></p>

          <li>
          <SideBarButton buttonText="User Settings" route="/usersettings" svgPath={userSettingsSVGPath} />
          </li>

          <p></p>

          <li>
         
          <SideBarButton buttonText="Map" route="/mapview" svgPath={mapSVGPath} />
         
          </li>

           <p></p>
           <p className="title">Profile Management</p>

          <li>
          <SideBarButton buttonText="Profile" route="/profile" svgPath={profileSVGPath} />
          </li>
          <p></p>

          <Link to="/login" onClick={logoutHandler} style={{ textDecoration: "none" }}>
          <li>
          <SideBarButton buttonText="Logout" route="/profile" svgPath={logoutSVGPath} />

          </li>
          </Link>

         
          <p></p>
        
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
