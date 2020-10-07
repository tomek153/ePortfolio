import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';

import '../../css/start.css';
import LogoImage from '../../images/logo.png';

class HomeHeader extends Component {

    redirectAnimation(href) {
        const nav = document.querySelector(".navbar-my");
        const form = document.querySelector(".home-info-container");

        nav.classList.remove("animate-nav-in");
        nav.classList.add("animate-nav-out");
        form.classList.remove("w3-animate-right-home-container");
        form.classList.add("w3-animate-left-home-container");

        setTimeout(function() {
            nav.style = "display: none";
            form.style = "display: none";
            
            setTimeout(function() {
                window.location.href = href;
            }, 200);
        }, 600);
    }

    registerRedirect() {
        this.redirectAnimation("/rejestracja");
    }

    loginRedirect() {
        this.redirectAnimation("/logowanie");
    }
    
    contactRedirect() {
        this.redirectAnimation("/kontakt");
    }

    render() {
        return (
            <>
                <Navbar bg="light" variant="light" className="navbar-my">
                    <Navbar.Brand href="/" className="mr-auto">
                        <Image src={LogoImage} fluid className="header-image-logo"/>
                    </Navbar.Brand>
                    <Button variant="link" className="header-btn-my header-home-links" onClick={this.contactRedirect.bind(this)}>Kontakt</Button>
                    <div className="header-divider"></div>
                    <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2 search-header" style={{backgroundColor: "rgba(248, 248, 250, 0.3)", color: "#fff"}}/>
                        <Button variant="outline-primary" className="header-btn-my header-btn-login-my" onClick={this.loginRedirect.bind(this)}>Zaloguj</Button>
                        <Button variant="link" className="header-btn-my header-btn-register-my" onClick={this.registerRedirect.bind(this)} style={{marginRight: "0"}}>Rejestracja</Button>
                    </Form>
                </Navbar>
            </>
        )
    }
}

export default HomeHeader;