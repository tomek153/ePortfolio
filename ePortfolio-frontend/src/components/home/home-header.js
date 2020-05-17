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
        const helper = document.querySelector(".fade-out-helper");
        const nav = document.querySelector(".navbar-my");
        const description = document.querySelector(".home-description-my");
        const carousel = document.querySelector(".slider-container-my");

        nav.classList.remove("animate-nav-in");
        nav.classList.add("animate-nav-out");
        description.classList.remove("animate-left-content");
        description.classList.add("animate-left-out-content");
        carousel.classList.remove("animate-right-carousel");
        carousel.classList.add("animate-right-out-carousel");

        setTimeout(function() {
            nav.style = "display: none";
            description.style = "display: none";
            carousel.style = "display: none";
            helper.style = "display: block";
            helper.classList.add("fade-in");

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
                    <Button variant="link" className="header-btn-my header-btn-register-my" onClick={this.contactRedirect.bind(this)} style={{color: "#555", marginRight: "10px"}}>Kontakt</Button>
                    <div style={{width: "50px", height: "50px", boxShadow: "-8px 0px 8px -8px rgba(0,0,0,0.75)"}}></div>
                    <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <Button variant="outline-primary" className="header-btn-my header-btn-login-my" onClick={this.loginRedirect.bind(this)}>Zaloguj</Button>
                        <Button variant="link" className="header-btn-my header-btn-register-my" onClick={this.registerRedirect.bind(this)} style={{marginRight: "0"}}>Rejestracja</Button>
                    </Form>
                </Navbar>
            </>
        )
    }
}

export default HomeHeader;