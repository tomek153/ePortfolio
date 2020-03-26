import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import ImageLogo from '../../images/logo.png';

class LoginContent extends Component {
    render() {
        return (
            <div className="home-right-container-my">
                <a href="/"><img
                    className="login-logo-my"
                    src={ImageLogo}
                /></a>
                <div className="login-form-my">
                    <Form>
                        <h3>Witaj !</h3>
                        <p>Tutaj możesz zmienić hasło, jeśli nie możesz go sobie przypomnieć.</p>
                        <p>Nie posiadasz jeszcze konta? <a href="/rejestracja" className="login-links">Zarejestruj się</a>
                        </p>
                        <hr />
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                            <Form.Control type="email" placeholder="Wprowadź email..." />
                            <Form.Text className="text-muted">
                               Nie udostępnimy twojego maila nikomu.
                            </Form.Text>
                        </Form.Group>
                        <Button variant="primary" type="submit" className="login-button-my" style={{float: 'right'}}>
                            Zmień hasło
                        </Button>
                    </Form>
                </div>
            </div>
        )
    }
}

export default LoginContent;