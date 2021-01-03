import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';

import ImageNotFound from '../images/not-found.jpg';

class NotFoundContent extends Component {

    componentDidMount() {
        document.getElementById("root").style.height = "100%";
    }
    
    render() {

        return (
            <div className="home-container" style={{height: "100%"}}>
                <div className="home-container" style={{height: "100%"}}>
                    <div className="photo-section photo-login-register">
                        <div className="opacity-background">
                            <div className="not-found-container">
                                <img 
                                    className="page-not-found-image"
                                    src={ImageNotFound}
                                />
                                <div id="footer">
                            <div className="width-divider" style={{padding: "15px 0px"}}>
                                <p>ePortfolio &copy; 2020</p><p>Wszelkie prawa zastrzeżone</p>
                            </div>
                        </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default NotFoundContent;