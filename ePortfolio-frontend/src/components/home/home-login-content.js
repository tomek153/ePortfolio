import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

import ImageLogo from '../../images/logo.png';
import PageLoading from '../page-loading';

class LoginContent extends Component {
    
    showPassword() {
        var x = document.getElementById("login-password-my");
        if (x.type === "password")
          x.type = "text";
        else
          x.type = "password";
    }

    componentDidMount() {
        const loader = document.querySelector(".page-loading");
        window.onload = function() {
            this.setTimeout(function() {
                loader.classList.add("hidden");
                this.setTimeout(function() {
                    const regTab = document.querySelector(".home-right-container-my");
                    regTab.style = "display: block";
                }, 200);
            }, 600);
        }
    }

    homeRedirect() {
        const helper = document.querySelector(".fade-out-helper");
        const logTab = document.querySelector(".box-container-shadow");
        
        logTab.classList.remove("w3-animate-right-login");
        logTab.classList.add("w3-animate-right-out-login");

        setTimeout(function() {
            logTab.style = "display: none";
            helper.style = "display: block";
            helper.classList.add("fade-in");
        
            setTimeout(function() {
                window.location.href = "/";
            }, 200);
        }, 600);
    }

    registerRedirect() {
        const helper = document.querySelector(".fade-out-helper");
        const logTab = document.querySelector(".box-container-shadow");

        logTab.classList.remove("w3-animate-right-login");
        logTab.classList.add("w3-animate-right-out-login");

        setTimeout(function() {
            logTab.style = "display: none";
            helper.style = "display: block";
            helper.classList.add("fade-in");
            
            setTimeout(function() {
                window.location.href = "/rejestracja";
            }, 200);
        }, 600);
    }

    render() {
        return (
            <>
                <div className="fade-out-helper"></div>
                <PageLoading />
                <div className="home-right-container-my">
                    <div className="box-container-shadow w3-animate-right-login" style={{width: '720px', height: '670px'}}>
                        <i className="fas fa-arrow-left home-link-register" onClick={this.homeRedirect.bind(this)}></i>
                        <a href="/"><img 
                            className="login-logo-my"
                            src={ImageLogo}
                            style={{top: '18%'}}
                        /></a>
                        <div className="login-form-my">
                            <Form>
                                <h3>Witaj !</h3>
                                <p>Tutaj możesz zalogować się do swojego konta.</p>
                                <p>Nie posiadasz jeszcze konta? <a className="login-links login-register-redirect" onClick={this.registerRedirect.bind(this)}>Zarejestruj się</a>
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
                </div>
            </>
        )
    }
}

export default LoginContent;