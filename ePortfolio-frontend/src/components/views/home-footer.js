import React, { Component } from 'react';

class Footer extends Component {

    render() {
        return (
            <div id="footer">
                <div className="width-divider" style={{padding: "15px 0px"}}>
                    <div>
                        <ul>
                            <li><a href="/">Start</a></li>
                            <li><a href="/#czym-jest">Czym jest?</a></li>
                            <li><a href="/#oferta">Oferta</a></li>
                            <li><a href="/#kontakt">Kontakt</a></li>
                        </ul>
                        <ul>
                            <li><a href="/logowanie">Logowanie</a></li>
                            <li><a href="/rejestracja">Resjestracja</a></li>
                            <li><a href="/regulamin">Regulamin</a></li>
                        </ul>
                        <ul>
                            <li><a href="http://facebook.com" target="_blank"><i className="fab fa-facebook"></i>Facebook</a></li>
                            <li><a href="http://instagram.com" target="_blank"><i className="fab fa-instagram"></i>Instagram</a></li>
                            <li><a href="https://twitter.com" target="_blank"><i className="fab fa-twitter"></i>Twitter</a></li>
                        </ul>
                    </div>
                    <p>ePortfolio &copy; 2020</p><p>Wszelkie prawa zastrzeżone</p>
                </div>
            </div>
        )
    }
}

export default Footer;