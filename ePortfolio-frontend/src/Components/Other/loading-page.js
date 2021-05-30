import React, { Component } from 'react';
import Image from 'react-bootstrap/Image';

import LogoImage from '../../Images/logo-3.png'

class LoadingPage extends Component {

    render() {

        const container = {
            width: "100%",
            height: "100%",
            position: "absolute",
            background: "#343a40"
        }

        const div_center = {
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            height: "47px"
        }

        const image = {
            width: "70px",
            marginRight: "7px",
            marginTop: "-7px"
        }

        const span = {
            color: "#fff",
            fontSize: "1.5rem"
        }

        const copyright = {
            color: "#888",
            fontSize: "0.9rem",
            position: "absolute",
            bottom: "20px",
            left: "50%",
            transform: "translate(-50%, -50%)",
        }

        return (
            <div style={container}>
                <div style={div_center}>
                    <Image className="logo-spin" style={image} src={LogoImage}/><span style={span}>ePortfolio</span>
                </div>
                <span style={copyright}>&copy; Wszelkie prawa zastrzeżone</span>
            </div>
        )
    }
}


export default LoadingPage;