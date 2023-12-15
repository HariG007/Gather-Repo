
import { Outlet } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import FloatingButton from './elements/Chatbot/Floatingbtn';

const App = () => {
  return (
    <>
      <Header />
      <ToastContainer />
      
        <Outlet />
        
      <FloatingButton/>
    </>
  );
};

export default App;
