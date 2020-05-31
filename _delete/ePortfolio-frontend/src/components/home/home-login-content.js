import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import ImageLogo from '../../images/logo.png';

class LoginContent extends Component {
    
    showPassword() {
        var x = document.getElementById("login-password-my");
        if (x.type === "password")
          x.type = "text";
        else
          x.type = "password";
    }

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
                        <p>Tutaj możesz zalogować się do swojego konta.</p>
                        <p>Nie posiadasz jeszcze konta? <a href="/rejestracja" className="login-links">Zarejestruj się</a>
                        </p>
                        <hr />
                        <Form.Group controlId="formBasicEmail">
                            <Form.Label>Email</Form.Label>
                                <Form.Control type="email" placeholder="Wprowadź email..." />
                                <Form.Text className="text-muted">
                                    We'll never share your email with anyone else.
                                </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="formBasicPassword">
                            <Form.Label>Hasło</Form.Label>
                            <Form.Control type="password" placeholder="Wprowadź hasło..." id="login-password-my"/>
                        </Form.Group>
                        <Form.Group controlId="formBasicCheckbox">
                            <Form.Check type="checkbox" label="Pokaż hasło" onClick={this.showPassword}/>
                        </Form.Group>
                        <Button variant="primary" type="submit" className="login-button-my" style={{float: 'right'}}>
                            Zaloguj się
                        </Button>
                        <Button variant="link" style={{float: 'right'}} className="login-links">
                            Nie pamiętasz hasła?
                        </Button>
                    </Form>
                </div>
            </div>
        )
    }
}

export default LoginContent;