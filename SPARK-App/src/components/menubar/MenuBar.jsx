import * as React from 'react';
import { Container, Navbar } from 'react-bootstrap';
import SearchOutlinedIcon from "@mui/icons-material/SearchOutlined";

import "./menubar.css"


const MenuBar = () => {

    return (
        <>
            <Navbar bg="light" expand="lg">
                <Container>
                    <Navbar.Brand href="#home" style={{fontSize:30}}>&#128293; <span style={{fontWeight: 'bold', fontSize: 40, letterSpacing: -2}}>spark</span></Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <div className="wrapper">
                        <div className="search">
                            <SearchOutlinedIcon />
                            <input type="text" placeholder="Search chapter or subchapter..." />
                        </div>
                        <div className="items">
                            <div className="item">
                                <img src="https://images.pexels.com/photos/1967902/pexels-photo-1967902.jpeg?auto=compress&cs=tinysrgb&w=600" alt="" className="avatar"/>
                                <span>user@email.com</span>
                            </div>
                        </div>
                    </div>
                </Container>
            </Navbar>
        </>
    )
}

export default MenuBar;