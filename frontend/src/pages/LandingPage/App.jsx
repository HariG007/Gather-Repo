import '../LandingPage/App.scss';
import { Route, Routes } from 'react-router-dom';
import Footer from "./components/Footer/Footer";
import Home from "./pages/Home/Home";
import 'bootstrap/dist/css/bootstrap.css';
import Connect from './components/Connect/Connect';
import Contact from './components/Contact/Contact';

function LandingPage() {
  return (
    <>
     <Home />
      <Connect />
      <Contact />
      <Footer />
    </>
  );
}

export default LandingPage;
