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
        this.navigationScrollAdjust();
    }
    navigationScrollAdjust() {
        var header = document.getElementsByClassName("navbar-header")[0];
        window.onscroll = function() {
          if (window.pageYOffset > 0) {
            header.classList.add("navbar-header-dark");
          } else {
            header.classList.remove("navbar-header-dark");
          }
        }
    }

    render() {
        return (
            <>
                <div className="navbar-header">
                    <div className="width-divider">
                        <a href="/"><Image src={LogoImage} className="header-image-logo"/></a>
                        <div className="navbar-links">
                            <a href="/#czym-jest">Czym jest?</a>
                            <a href="/#oferta">Oferta</a>
                            <a href="/#kontakt">Kontakt</a>
                            <a>Szukaj</a>

                        </div>
                        <div className="navbar-buttons">
                            <a href="/rejestracja">Załóż konto</a>
                            <a href="/logowanie" id="login-button">Zaloguj się</a>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}

export default HomeHeader;
