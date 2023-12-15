
import { useSelector } from 'react-redux';
import Home from '../pages/home/Home';
import Hero from '../components/Hero';

const HomeScreen = () => {
  // Use the useSelector hook to get userInfo from the Redux store
  const { userInfo } = useSelector((state) => state.auth);

  // Conditionally render Home or Hero based on user login
  return userInfo ? <Home /> : <Hero />;
};

export default HomeScreen;
