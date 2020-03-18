import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import InputGroup from 'react-bootstrap/InputGroup';
import Modal from 'react-bootstrap/Modal';

import superagent from 'superagent';

import ImageLogo from '../../images/logo.png';
import BackgroundLogo from '../../images/home-background-revert.png';

class LoginContent extends Component {
    constructor() {
        super();
        this.state = {
            newUser: {
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                role: "user"
            },
            formControll: {
                firstName: false,
                lastName: false,
                email: false,
                password: false,
                regulations: false
            },
            modalSuccesShow: false,
            modalFailedShow: false
        }
    }

    checkFormDataValid() {
        if (this.state.formControll.firstName && 
            this.state.formControll.lastName &&
            this.state.formControll.email &&
            this.state.formControll.password &&
            this.state.formControll.regulations
        ) {
            var element = document.getElementsByClassName("login-button-my")[0];
            element.disabled = false;
        } else {
            document.getElementsByClassName("login-button-my")[0].disabled = true;
        }
    }


    handleFirstNameChanged(event) {
        this.state.newUser.firstName = event.target.value;

        let length = event.target.value.length;
        var regex = /[^a-zA-Z]/;
        let element = document.getElementById("form-value-alert-name");
        let messageShort = '<sub>Min 2 znaki.</sub>';
        let messageLong = '<sub>Max 15 znaków.</sub>';
        let messageRegexViolation = '<sub>Podano niedozwolony znak.</sub>';

        
        this.checkRegex(event.target.value, regex, messageRegexViolation, element,
            2, 15, length, messageShort, messageLong, "firstName");
    }
    handleLastNameChanged(event) {
        this.state.newUser.lastName = event.target.value;

        let length = event.target.value.length;
        var regex = /[^a-zA-Z]/;
        let element = document.getElementById("form-value-alert-lastName");
        let messageShort = '<sub>Min 2 znaki.</sub>';
        let messageLong = '<sub>Max 20 znaków.</sub>';
        let messageRegexViolation = '<sub>Podano niedozwolony znak.</sub>';

        
        this.checkRegex(event.target.value, regex, messageRegexViolation, element,
            2, 20, length, messageShort, messageLong, "lastName");
    }
    checkRegex(text, regex, messageRegexViolation, element, from, to, length, messageShort, messageLong, name) {
        if (text.match(regex) != null) {
            element.style.display = "block";
            element.innerHTML = messageRegexViolation;
            this.updateNamesState(name, false);
        } else {
            this.checkMessageState(from, to, length, messageShort, messageLong, element, name);
        }
    }
    checkMessageState(from, to, length, messageShort, messageLong, element, name) {
        if (length < from) {
            element.style.display = "block";
            element.innerHTML = messageShort;
            this.updateNamesState(name, false);
        } else if (length > to) {
            element.style.display = "block";
            element.innerHTML = messageLong;
            this.updateNamesState(name, false);
        } else {
            element.style.display = "none";
            this.updateNamesState(name, true);
        }
    }
    updateNamesState(name, bool) {
        if (name == "firstName")
            this.state.formControll.firstName = bool;
        else
            this.state.formControll.lastName = bool;
        
        this.checkFormDataValid();
    }


    handleEmailChanged(event) {
        this.state.newUser.email = event.target.value;

        let length = event.target.value.length;
        var regex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
        let element = document.getElementById("form-value-alert-email");
        let messageShort = '<sub>Min 8 znaków.</sub>';
        let messageLong = '<sub>Max 40 znaków.</sub>';
        let messageRegexViolation = '<sub>Podano niepoprawny adres email.</sub>';

        this.checkEmailRegex(event.target.value, regex, messageRegexViolation, element,
            8, 40, length, messageShort, messageLong);
    }
    checkEmailRegex(text, regex, messageRegexViolation, element, from, to, length, messageShort, messageLong) {
        let wronCharRegex = /[^a-zA-Z0-9@_.-]/;
        
        if (text.match(regex) != null) {
            if (text.match(wronCharRegex) != null) {
                element.style.display = "block";
                element.innerHTML = "<sub>Podano niepoprawny znak.</sub>";
                this.state.formControll.email = false;
                this.checkFormDataValid();
            } else {
                element.style.display = "none";
                this.checkMessageState(from, to, length, messageShort, messageLong, element);
                this.state.formControll.email = true;
                this.checkFormDataValid();
            }
        } else {
            element.style.display = "block";
            element.innerHTML = messageRegexViolation;
            this.state.formControll.email = false;
            this.checkFormDataValid();
        }
    }

    handlePasswordChanged(event) {
        let password = event.target.value;
        this.state.newUser.password = password;

        let length = event.target.value.length;
        let element = document.getElementById("form-value-alert-password");

        if (password.match(/[^a-zA-Z0-9!@#$%^&*(){}[\]|:";'<>?,.\/\\]/)) {
            element.style.display = "block";
        } else {
            if (password.match(/[a-z]/) &&
                password.match(/[A-Z]/) &&
                password.match(/[0-9]/) &&
                password.match(/[!@#$%^&*(){}[\]|:";'<>?,.\/\\]/)
            ) {
                if (length >= 8 && length <= 40) {
                    element.style.display = "none";
                    this.state.formControll.password = true;
                    this.checkFormDataValid();
                } else {
                    element.style.display = "block";
                    this.state.formControll.password = false;
                    this.checkFormDataValid();
                } 
            } else {
                element.style.display = "block";
                this.state.formControll.password = false;
                this.checkFormDataValid();
            }
        }
    }
    showPassword() {
        var x = document.getElementById("formGridPassword");
        if (x.type === "password") {
            var element = document.querySelector("#inputGroupPrepend > i.fas.fa-eye");
            element.style.display = "none";
            var element2 = document.querySelector("#inputGroupPrepend > i.fas.fa-eye-slash");
            element2.style.display = "block";
            x.type = "text";
        } else {
            var element2 = document.querySelector("#inputGroupPrepend > i.fas.fa-eye-slash");
            element2.style.display = "none";
            var element = document.querySelector("#inputGroupPrepend > i.fas.fa-eye");
            element.style.display = "block";
            x.type = "password";
        }
    }

    changeBackground() {
        var root = document.getElementById("root");
        root.style.backgroundPosition = "right";
        root.style.backgroundImage = "url("+BackgroundLogo+")";

        document.getElementsByClassName("login-button-my")[0].disabled = true;
    }

    changePasswordInputStyleIn() {
        var element = document.querySelector("form > div:nth-child(5) > div:nth-child(2) > div");
        element.style.boxShadow = "0 0 0 0.2rem rgba(0,123,255,.25)";

        var element2 = document.getElementById("inputGroupPrepend");
        element2.style.borderColor = "#80bdff";
    }
    changePasswordInputStyleOut() {
        var element = document.querySelector("form > div:nth-child(5) > div:nth-child(2) > div");
        element.style.boxShadow = "0 0 0 0 rgba(0,123,255,.25)";

        var element2 = document.getElementById("inputGroupPrepend");
        element2.style.borderColor = "#ced4da";
    }

    checkRegulations() {
        var element = document.getElementById("formBasicCheckbox");
        this.state.formControll.regulations = element.checked;

        this.checkFormDataValid();
    }

    submitFormAndSend(event) {
        event.preventDefault();
        superagent
            .post('http://localhost:8080/api/users')
            .send(this.state.newUser)
            .end((err, res) => {
                if(err) {
                    if(res.body.message == "User exist.")
                        this.setState({modalFailedShow: true});
                    else
                        alert("Registration failed");
                    return;
                } else {
                    this.setState({modalSuccesShow: true});
                }
            }
        );
    }

    closeModal() {
        this.setState({modalSuccesShow: false});
        this.setState({modalFailedShow: false});
    }

    render() {
        const popover = (
            <Popover id="popover-basic">
                <Popover.Title as="h2" className="tooltip-register-password-header"><b>Jakie hasło utworzyć?</b></Popover.Title>
                <Popover.Content>
                    Hasło powinno zawierać:
                    <ul>
                        <li>od <b>8</b> do <b>40</b> znaków,</li>
                        <li>co najmniej <b>jedną małą literę</b>,</li>
                        <li>co najmniej <b>jedną dużą literę</b>,</li>
                        <li>co najmniej <b>jedną cyfrę</b>,</li>
                        <li>co najmniej <b>jeden znak specjalny</b>, np. "#", "$", "%".</li>
                    </ul>
                </Popover.Content>
            </Popover>
          );

        return (
            <div className="register-container-my" onLoad={this.changeBackground}>
                <a href="/"><img 
                    className="register-logo-my"
                    src={ImageLogo}
                /></a>
                <div className="register-form-my">
                    <Form>
                        <h3>Witaj!</h3>
                        <p>Utworzenie konta zajmie Ci tylko <b>kilka sekund</b>.</p>
                        <hr />
                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridFirstName">
                                <Form.Label>Imię</Form.Label><span id="form-value-alert-name" className="form-value-alert"><sub>Podano nieprawidłową wartość.</sub></span>
                                <Form.Control placeholder="Wprowadź imię..." onChange={this.handleFirstNameChanged.bind(this)}/>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridLastName">
                                <Form.Label>Nazwisko</Form.Label><span id="form-value-alert-lastName" className="form-value-alert"><sub>Podano nieprawidłową wartość.</sub></span>
                                <Form.Control placeholder="Wprowadź nazwisko..." onChange={this.handleLastNameChanged.bind(this)}/>
                            </Form.Group>
                        </Form.Row>

                        <Form.Row>
                            <Form.Group as={Col} controlId="formGridEmail">
                                <Form.Label>Email</Form.Label><span id="form-value-alert-email" className="form-value-alert"><sub>Podano nieprawidłową wartość.</sub></span>
                                <Form.Control placeholder="Wprowadź email..." onChange={this.handleEmailChanged.bind(this)}/>
                            </Form.Group>

                            <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label>Hasło</Form.Label>
                                <span id="form-value-alert-password" className="form-value-alert">
                                    <sub>Podano niepoprawne hasło. </sub>
                                    <OverlayTrigger trigger="hover" placement="right" overlay={popover}>
                                        <sub variant="success" id="register-password-tooltip"><i className="fas fa-question-circle"></i></sub>
                                    </OverlayTrigger>
                                </span>
                                <InputGroup>
                                    <Form.Control type="password" placeholder="Wprowadź hasło..." onChange={this.handlePasswordChanged.bind(this)} onFocus={this.changePasswordInputStyleIn} onBlur={this.changePasswordInputStyleOut}/>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id="inputGroupPrepend" onClick={this.showPassword}><i className="fas fa-eye w3-animate-opacity"></i><i className="fas fa-eye-slash w3-animate-opacity"></i></InputGroup.Text>
                                    </InputGroup.Prepend>
                                </InputGroup>
                            </Form.Group>
                        </Form.Row>
                        <Form.Group controlId="formBasicCheckbox">
                            <Form.Check>
                                <Form.Check.Input type="checkbox" onClick={this.checkRegulations.bind(this)}/>
                                <Form.Check.Label>Zapoznałem się z <a id="checkbox-regulations-link" href="/regulamin" target="_blank">regulaminem</a> serwisu, oraz akceptuje jego warunki.</Form.Check.Label>
                            </Form.Check>
                        </Form.Group>

                        <Button onClick={this.submitFormAndSend.bind(this)} type="button" variant="primary" className="login-button-my" style={{float: 'right'}} >
                            Utwórz konto
                        </Button>

                        <p className="register-have-account">Posiadasz już konto? <a href="/logowanie">Zaloguj się</a></p>
                    </Form>
                </div>
                {this.state.modalSuccesShow && <Modal show size="lg" aria-labelledby="contained-modal-title-vcenter" centered >
                    <Modal.Header style={{color: "#31b4cb", backgroundColor: "rgba(49, 180, 203, 0.15)"}}>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Konto zostało utworzone!
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{textAlign: "center"}}>
                        <i class="fas fa-check fa-5x" id="successIconModal"></i>
                        <p style={{color: "#444"}}>
                            Tworzenie konta zakończone. Na podany <b>adres email</b> został wysłany <b>link aktywacyjny</b>, potwierdź go aby móc się <b>zalogować</b>.
                        </p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="link" onClick={this.closeModal.bind(this)} className="modal-close-btn">Zamknij</Button>
                        <Button className="modal-redirect-btn" href="/logowanie">Przejdź do logowania</Button>
                    </Modal.Footer>
                </Modal>}
                {this.state.modalFailedShow && <Modal show size="lg" aria-labelledby="contained-modal-title-vcenter" centered >
                    <Modal.Header style={{color: "#de473c", backgroundColor: "rgba(222, 71, 60, 0.15)"}}>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Konto nie zostało utworzone!
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{textAlign: "center"}}>
                        <i class="fas fa-exclamation fa-5x" id="successIconModal" style={{color: "#de473c"}}></i>
                        <p style={{color: "#444"}}>
                            Konto <b>nie zostało</b> utworzone, ponieważ <b>istnieje</b> użytkownik z podanym adresem email. Spróbuj ponownie z <b>innym</b> adresem email.
                        </p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="link" className="modal-close-btn" onClick={this.closeModal.bind(this)}>Zamknij</Button>
                    </Modal.Footer>
                </Modal>}
            </div>
        )
    }
}

export default LoginContent;