import { Container, Card, Button, Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { LinkContainer } from 'react-router-bootstrap';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '../slices/usersApiSlice';
import { logout } from '../slices/authSlice';
import logo from '../components/Logo.png';
import Navigationbar from '../elements/NavBar/Navbar';

const Header = () => {
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

  const headerStyle = {
    backgroundColor: '#343a40', // Dark background color
    color: '#ffffff',           // Text color
    padding: '4px 0',          // Padding top and bottom
  };

  const brandStyle = {
    marginLeft: '20px', // Keep consistent spacing
    fontSize: '1.5em',
    fontWeight: 'bold',
  };

  const linkContainerStyle = {
    display: 'flex',
    alignItems: 'center',
  };

  const buttonStyle = {
    fontSize: '1.2em',
    display: 'flex',
    alignItems: 'center',
    marginLeft: '20px', 
  };

  return (
    // <header style={headerStyle}>
    //   <Navigationbar/>
    //   <Navbar style={{ borderBottom: '2px solid #221429' }} variant='dark' expand='lg' collapseOnSelect>
    //     <LinkContainer to='/' style={brandStyle}>
    //       <Navbar.Brand><h3 style={{color:'white',fontSize:'16px',fontWeight:'bold'}}>N a v i s p h e r e</h3></Navbar.Brand>
    //     </LinkContainer>
    //     <Navbar.Toggle aria-controls='basic-navbar-nav' />
    //     <Navbar.Collapse id='basic-navbar-nav'>
    //       <Nav className='ms-auto'>
    //         {userInfo ? (
    //           <NavDropdown title={userInfo.name} id='username' style={{ ...buttonStyle }}>
    //             <LinkContainer to='/profile'>
    //               <NavDropdown.Item>Profile</NavDropdown.Item>
    //             </LinkContainer>
    //             <NavDropdown.Item onClick={logoutHandler}>Logout</NavDropdown.Item>
    //           </NavDropdown>
    //         ) : (
    //           <>
    //             <LinkContainer to='/login'  style={{linkContainerStyle,marginRight:'20px',paddingLeft:'10px',padding:'10px 20px',display:'flex',alignItems:'center',borderRadius:'30px',backgroundColor:'#221429 ',borderColor:'#221429',margin:'10px'}}>
    //               <Button  style={{ ...buttonStyle}}>
    //                 <FaSignInAlt style={{ marginRight: '5px' }} /> Sign In
    //               </Button>
    //             </LinkContainer>
    //             <LinkContainer to='/register'  style={{linkContainerStyle,marginRight:'20px',paddingLeft:'10px',padding:'10px 20px',display:'flex',alignItems:'center',borderRadius:'30px',color:'white',margin:'10px'}}>
    //               <Button variant='outline-secondary' style={{ ...buttonStyle}}>
    //                 <FaSignOutAlt style={{ marginRight: '5px' }} /> Sign Up
    //               </Button>
    //             </LinkContainer>
    //           </>
    //         )}
    //       </Nav>
    //     </Navbar.Collapse>
    //   </Navbar>
    // </header>
    <>
    <Navigationbar/>
    </>
  );
};

export default Header;
