import Sidebar from "../../components/sidebar/Sidebar";

import "./home.scss";
import DashboardDefault from '../../components/Dashboardcomp/index';


const Home = () => {
  return (
    <div className="home" >
      <Sidebar />
      <div className="homeContainer">
        <button style={{padding:'5px 15px',borderRadius:'7px',marginLeft:'20px', margin:'10px',backgroundColor:'gray',color:'white'}}>Dashboard</button>
        <DashboardDefault/>
      </div>
    </div>
  );
};

export default Home;
