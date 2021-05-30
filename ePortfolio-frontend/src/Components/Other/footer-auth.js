import React, { Component } from 'react';
import Container from "react-bootstrap/Container";

class FooterAuth extends Component {

    render() {

        return(
            <div id="footer-auth">
                <Container>
                    <p className="text-shadow-1-2" style={{width: "100%"}}>ePortfolio &copy; 2021</p>
                    <p className="text-shadow-1-2">Wszelkie prawa zastrzeżone</p>
                </Container>
            </div>
        )
    }
}

export default FooterAuth;