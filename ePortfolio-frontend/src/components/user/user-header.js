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

    logoutRedirect() {
        localStorage.removeItem('token');
        const helper = document.querySelector(".fade-out-helper");
        const nav = document.querySelector(".navbar-my");
        const regTab = document.querySelector(".box-container-shadow");

        nav.classList.remove("animate-nav-in");
        nav.classList.add("animate-nav-out");
        /*regTab.classList.remove("w3-animate-right-login");
        regTab.classList.add("w3-animate-right-out-login");*/ //TODO wywala error

        setTimeout(function() {
            /*nav.style = "display: none";
            regTab.style = "display: none";
            helper.style = "display: block";
            helper.classList.add("fade-in");*/  //TODO wywala error
            
            setTimeout(function() {
                window.location.href = "/";
            }, 200);
        }, 600);
    }
    
    render() {
        return (
            <>
                <Navbar bg="light" variant="light" className="navbar-my" style={{backgroundColor: "rgba(255, 255,255,0.2)!important"}}>
                    <Navbar.Brand href="/home" className="mr-auto">
                        <Image src={LogoImage} fluid className="header-image-logo"/>
                    </Navbar.Brand>
                    
                    <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <Button variant="outline-primary" className="header-btn-my header-btn-usersettings-my" href="/moj-profil">Moje dane</Button>
                        <Button variant="link" className="header-btn-my header-btn-logout-my" onClick={this.logoutRedirect.bind(this)}>Wyloguj</Button>
                    </Form>
                </Navbar>
            </>
        )
    }
}

export default HomeHeader;