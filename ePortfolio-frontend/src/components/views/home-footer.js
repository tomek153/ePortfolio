import React, { Component } from 'react';

class Footer extends Component {

    render() {
        return (
            <div id="footer">
                <div className="width-divider" style={{padding: "15px 0px"}}>
                    <div>
                        <ul>
                            <li className="text-shadow-1-2"><a href="/">Start</a></li>
                            <li className="text-shadow-1-2"><a href="/#czym-jest">Czym jest?</a></li>
                            <li className="text-shadow-1-2"><a href="/#oferta">Oferta</a></li>
                            <li className="text-shadow-1-2"><a href="/#kontakt">Kontakt</a></li>
                        </ul>
                        <ul>
                            <li className="text-shadow-1-2"><a href="/logowanie">Logowanie</a></li>
                            <li className="text-shadow-1-2"><a href="/rejestracja">Resjestracja</a></li>
                            <li className="text-shadow-1-2"><a href="/regulamin">Regulamin</a></li>
                        </ul>
                        <ul>
                            <li className="text-shadow-1-2"><a href="http://facebook.com" target="_blank"><i className="fab fa-facebook"></i>Facebook</a></li>
                            <li className="text-shadow-1-2"><a href="http://instagram.com" target="_blank"><i className="fab fa-instagram"></i>Instagram</a></li>
                            <li className="text-shadow-1-2"><a href="https://twitter.com" target="_blank"><i className="fab fa-twitter"></i>Twitter</a></li>
                        </ul>
                    </div>
                    <p className="text-shadow-1-2">ePortfolio &copy; 2020</p>
                    <p className="text-shadow-1-2">Wszelkie prawa zastrzeżone</p>
                </div>
            </div>
        )
    }
}

export default Footer;