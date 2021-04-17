import React, { Component } from 'react';
import Image from 'react-bootstrap/Image';

import LogoImage from '../../Images/logo.png';

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
                            <a className="text-shadow-1" href="/#czym-jest">Czym jest?</a>
                            <a className="text-shadow-1" href="/#oferta">Oferta</a>
                            <a className="text-shadow-1" href="/#kontakt">Kontakt</a>
                            <a className="text-shadow-1">Szukaj</a>

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
