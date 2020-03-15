import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

import ImageLogo from '../../images/logo.png';
import BackgroundLogo from '../../images/home-background-revert.png';

class LoginContent extends Component {
    
    showPassword() {
        var x = document.getElementById("login-password-my");
        if (x.type === "password")
          x.type = "text";
        else
          x.type = "password";
    }

    changeBackground() {
        var root = document.getElementById("root");
        root.style.backgroundPosition = "right";
        root.style.backgroundImage = "url("+BackgroundLogo+")";
    }

    render() {
        return (
            <div className="register-container-my" onLoad={this.changeBackground}>
                <a href="/"><img 
                    className="register-logo-my"
                    src={ImageLogo}
                /></a>
                <div className="register-form-my">
                    <Form>
                        <h3>Witaj !</h3>
                        <p>Utworzenie konta zajmie Ci tylko <b>kilka sekund</b>.</p>
                        <hr />
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label>Imię</Form.Label>
                                <Form.Control type="email" placeholder="Wprowadź imię..." />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label>Nazwisko</Form.Label>
                                <Form.Control type="password" placeholder="Wprowadź nazwisko..." />
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="Wprowadź email..." />
                            </Form.Group>

                            <Form.Group as={Col} controlId="formBasicPassword">
                                <Form.Label>Hasło</Form.Label>
                                <Form.Control type="password" placeholder="Wprowadź hasło..." id="login-password-my"/>
                            </Form.Group>
                        </Form.Row>
                        <Form.Group controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Pokaż hasło" onClick={this.showPassword}/>
                        </Form.Group>

                        <Button variant="primary" type="submit" className="login-button-my" style={{float: 'right'}}>
                            Utwórz konto
                        </Button>
                        
                        <p className="register-have-account">Posiadasz już konto? <a href="/logowanie">Zaloguj się</a></p>
                    </Form>
                </div>
            </div>
        )
    }
}

export default LoginContent;