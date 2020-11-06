import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';

import '../../css/start.css';
import LogoImage from '../../images/logo.png';

class HomeHeader extends Component {

    componentDidMount() {
        var header = document.getElementsByClassName("navbar-header")[0];
        window.onscroll = function() {
          if (window.pageYOffset > 0) {
            header.classList.add("navbar-header-dark");
          } else {
            header.classList.remove("navbar-header-dark");
          }
        }
    }

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
                <div className="navbar-header">
                    <div className="width-divider">
                        <Image src={LogoImage} className="header-image-logo"/>
                        <div className="navbar-links">
                            <a>Czym jest?</a>
                            <a>Oferta</a>
                            <a>Kontakt</a>
                            <a>Szukaj</a>

                        </div>
                        <div className="navbar-buttons">
                            <a>Załóż konto</a>
                            <a id="login-button">Zaloguj się</a>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default HomeHeader;

// <a>Kontakt</a>
// <a>Logowanie</a>
// <a>Rejestracja</a>

// <Navbar bg="light" variant="light">
//     <div className="width-content">
//         <Navbar.Brand href="/" className="mr-auto">
//             <Image src={LogoImage} fluid className="header-image-logo"/>
//         </Navbar.Brand>
//         <Button variant="link" className="header-btn-my header-home-links header-btn-shadow" onClick={this.contactRedirect.bind(this)}>Kontakt</Button>
//         <div className="header-divider"></div>
//         <Button variant="link" className="header-btn-my header-btn-login-my" onClick={this.loginRedirect.bind(this)}>Zaloguj</Button>
//         <Button variant="link" className="header-btn-my header-btn-register-my header-btn-shadow" onClick={this.registerRedirect.bind(this)} style={{marginRight: "0"}}>Rejestracja</Button>
//     </div>
// </Navbar>
