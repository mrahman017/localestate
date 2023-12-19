import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Logo from "../images/logo2.png";
import React, { useState } from "react";
import AuthButton from './AuthButton';

function Navigation() {

    const [isHover, setIsHover] = useState(false);

    const handleMouseEnter = () => {
        setIsHover(true);
    };

    const handleMouseLeave = () => {
        setIsHover(false);
    };

    const boxStyle = {
        backgroundColor: isHover ? '#cb416b' : 'pink',
     };

  return (
    <>
        <Navbar expand="md" variant="light" bg="transparent" className="py-2 px-2 ">
            <Navbar.Brand href="/">
                <img
                alt=""
                src={Logo}
                height="40"
                className="d-inline-block align-top px-2"
                />
            </Navbar.Brand>
            <Navbar.Toggle/>
            <Navbar.Collapse  className="justify-content-end">
                <Nav justified className="pe-3" variant="pills" defaultActiveKey="/contact" >
                    <Nav.Item>
                        <Nav.Link className="font-weight-bold px-4" href="/">Home</Nav.Link>
                    </Nav.Item>
                    
                    <Nav.Item>
                        <AuthButton />
                    </Nav.Item>

                    <Nav.Item>
                        <Nav.Link className="contactbtn font-weight-bold px-4" href="/contact" style={boxStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}> Contact Us </Nav.Link>
                    </Nav.Item>
                </Nav>
            </Navbar.Collapse>   

        </Navbar>
    </>
  );
};

export default Navigation;
