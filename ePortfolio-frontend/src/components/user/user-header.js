import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';

import '../../css/start.css';
import '../../css/user.css';
import LogoImage from '../../images/logo.png';

class HomeHeader extends Component {
    
    render() {
        return (
            <>
                <Navbar bg="light" variant="light" className="navbar-my">
                    <Navbar.Brand href="/home" className="mr-auto">
                        <Image src={LogoImage} fluid className="header-image-logo"/>
                    </Navbar.Brand>
                    <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <Button variant="outline-primary" className="header-btn-my header-btn-usersettings-my" href="/moj-profil">Ustawienia</Button>
                        <Button variant="link" className="header-btn-my header-btn-logout-my" href="#">Wyloguj</Button>
                    </Form>
                </Navbar>
            </>
        )
    }
}

export default HomeHeader;