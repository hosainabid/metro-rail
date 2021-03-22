import { Button } from 'react-bootstrap';
import React, { useContext } from 'react';
import { Nav, Navbar } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { UserContext } from '../../App';
import logo from '../../images/logo.png';

const Header = () => {
    const [loggedInUser, setLoggedInUser] = useContext(UserContext);
    return (
        <div style={{ background: '#9b59b6' }}>
            <div className="container">
                <Navbar bg="" expand="lg">
                    <Navbar.Brand as={Link} to="/home"> <img style={{ height: '100px' }} className="img-fluid" src={logo} alt="" /> </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <Nav.Link as={Link} to="/home"><b>Home</b></Nav.Link>
                            <Nav.Link as={Link}><b>Destination</b></Nav.Link>
                            <Nav.Link as={Link} to="/blog"><b>Blog</b></Nav.Link>
                            <Nav.Link as={Link} to="/contact"><b>Contact</b></Nav.Link>
                            {
                                loggedInUser && <Nav.Link><b>{loggedInUser.email}</b></Nav.Link>
                            }
                            {
                                loggedInUser.email ? <Button onClick={() => setLoggedInUser({})} className="btn btn-dark">Logout</Button>
                                    : <Button as={Link} to='/login' className="btn btn-dark">Login</Button>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Navbar>
            </div>
        </div>
    );
};

export default Header;