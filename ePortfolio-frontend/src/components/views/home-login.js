import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import superagent from 'superagent';

import ModalHeaderError from '../modals/error-header';
import ModalLoading from '../modals/loading';
import ModalError from '../modals/error';
import ModalSuccess from '../modals/success';
import ModalErrorResendLink from '../modals/error-resend-link';

class RegisterContent extends Component {

    constructor() {
        super();
        this.state = {
            form: {
                email: "",
                password: ""
            },
            resetEmail: "",
            formControll: {
                email: false,
                password: false,
                emailReset: false
            },
            elements: {
                email: "",
                password: ""
            },
            modalLoading: false,
            modalAuthFailed: false,
            modalUserUnconfirmed: false,
            modalError: false,
            modalResetPassSuccess: false,
            modalResetPassFailed: false,
            userId: "",
            reSendLinkSuccess: "none",
            reSendLinkFailed: "none",
            reSendLinkSpinner: "none",
            reSendButton: "block",
            scrollbarWidth: 0
        }
    }
    checkFormDataValid() {
        var element = document.getElementsByClassName("auth-button-my")[0];

        if (this.state.formControll.email &&
            this.state.formControll.password
        ) {
            element.disabled = false;
        } else {
            element.disabled = true;
        }
    }
    handleEmailChanged(event) {
        let value = event.target.value;
        this.state.form.email = value;
        var regex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
        let wronCharRegex = /[^a-zA-Z0-9@_.-]/;
        let isProperValue = false;
        let length = event.target.value.length;
        let element = document.getElementById("form-value-alert-email");

        if (value.match(regex) != null) {
            if (value.match(wronCharRegex) == null) {
                if (length >= 8 && length <= 50) {
                    isProperValue = true;
                }
            }
        }

        if (isProperValue) {
            this.state.formControll.email = true;
            element.innerHTML = "<i class=\"fas fa-check\" style=\"font-size: 15px\"></i>";
        } else {
            this.state.formControll.email = false;
            element.innerHTML = "<sub>Podano nieprawidłową wartość.</sub>";
        }
        this.checkFormDataValid();
    }
    handleEmailChangedPassReset(event) {
        let value = event.target.value;
        this.state.resetEmail = value;
        var regex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
        let wronCharRegex = /[^a-zA-Z0-9@_.-]/;
        let isProperValue = false;
        let length = event.target.value.length;
        let element = document.getElementById("form-value-alert-email-reset-pass");

        if (value.match(regex) != null) {
            if (value.match(wronCharRegex) == null) {
                if (length >= 8 && length <= 50) {
                    isProperValue = true;
                }
            }
        }

        if (isProperValue) {
            this.state.formControll.emailReset = true;
            element.innerHTML = "<i class=\"fas fa-check\" style=\"font-size: 15px\"></i>";
        } else {
            this.state.formControll.emailReset = false;
            element.innerHTML = "<sub>Podano nieprawidłową wartość.</sub>";
        }

        var button = document.getElementById("reset-pass-button");
        if (this.state.formControll.emailReset
        ) {
            button.disabled = false;
        } else {
            button.disabled = true;
        }
    }
    handlePasswordChanged(event) {
        let value = event.target.value;
        this.state.form.password = value;
        let length = value.length;
        let element = document.getElementById("form-value-alert-password");
        let element2 = document.getElementById("form-value-alert-password-span");
        let element3 = document.getElementById("register-password-tooltip");

        element.style.display = "block";
        if (!value.match(/[^a-zA-Z0-9!@#$%^&*(){}[\]|:";'<>?,.\/\\]/)) {
            if (value.match(/[a-z]/) &&
                value.match(/[A-Z]/) &&
                value.match(/[0-9]/) &&
                value.match(/[!@#$%^&*(){}[\]|:";'<>?,.\/\\]/)
            ) {
                if (length >= 8 && length <= 40) {
                    element2.innerHTML = "<i class=\"fas fa-check\" style=\"font-size: 15px\"></i>";
                    element3.style.display = "none";
                    this.state.formControll.password = true;
                } else {
                    element2.innerHTML = "<sub>Podano nieprawidłową wartość.</sub>";
                    element3.style.display = "block";
                    this.state.formControll.password = false;
                }
            } else {
                element2.innerHTML = "<sub>Podano nieprawidłową wartość.</sub>";
                element3.style.display = "block";
                this.state.formControll.password = false;
            }
        }

        this.checkFormDataValid();
    }
    submitFormAndSend(event) {
        this.setState({modalLoading: true});

        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');

        const request = new Request(
            'http://localhost:8080/api/login',
            {
                method: 'POST',
                headers: myHeaders,
                body: JSON.stringify(this.state.form)
            }
        );

        if (this.state.formControll.email &&
            this.state.formControll.password
          ){
            fetch(request)
                .then(response => response.json())
                .then(data => {
                    console.log(data);
                    this.setState({modalLoading: false});

                    if (data.message == "authentication_failed.")
                        this.setState({modalAuthFailed: true});
                    else if (data.message == "user_unconfirmed.") {
                        this.state.userId = data.userId;
                        this.setState({modalUserUnconfirmed: true});
                        this.setState({reSendButton: "block"});
                    }
                    else if (data.message == "Authentication success.") {
                        localStorage.setItem('token', data.token);
                        //this.userRedirect("/moj-profil");
                        console.log(data.token);
                    }
                    // else {
                    //     console.log(data);
                    //     alert("Unknown error.");
                    // }
                });
        } else {
            this.setState({modalLoading: false});
            this.setState({modalError: true});
        }
    }
    sendResetPassRequest(event) {
        this.setState({modalLoading: true});

        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');

        const request = new Request(
            'http://localhost:8080/api/reset-password',
            {
                method: 'POST',
                headers: myHeaders,
                body: this.state.resetEmail
            }
        );

        if (this.state.formControll.emailReset) {
            fetch(request)
              .then(response => {
                  this.clearResetPassState()

                  if (response) {
                      if (response.status == 200) {
                          this.setState({modalLoading: false});
                          this.setState({modalResetPassSuccess: true});
                      } else if (response.status == 405) {
                          this.setState({modalLoading: false});
                          this.setState({modalResetPassFailed: true});
                      } else {
                          this.setState({modalLoading: false});
                          this.setState({modalError: true});
                      }
                  } else {
                      this.setState({modalLoading: false});
                      this.setState({modalError: true});
                  }
              });
        } else {
            this.setState({modalLoading: false});
            this.setState({modalError: true});
            document.getElementById("reset-pass-button").disabled = true;
        }
    }
    reSendConfirmationLink = () => {
        document.getElementsByClassName("resend-link-button")[0].style.display = "none";
        this.setState({reSendLinkSpinner: "block"});

        superagent
            .post('http://localhost:8080/email/resend')
            .send({ userId: this.state.userId, linkId: null })
            .end((err, res) => {
                if (err) {
                    alert("Coś poszło nie tak!");
                    this.setState({reSendLinkSpinner: "none"});
                    document.getElementsByClassName("resend-link-button")[0].style.display = "block";
                    return;
                } else {
                    if (res.body.status) {
                        this.setState({reSendLinkSpinner: "none"});
                        this.setState({reSendLinkSuccess: "block"});
                        this.setState({reSendLinkFailed: "none"});
                        this.setState({reSendButton: "none"});

                    } else {
                        this.setState({reSendLinkSpinner: "none"});
                        this.setState({reSendLinkFailed: "block"});
                        this.setState({reSendLinkSuccess: "none"});
                        this.setState({reSendButton: "none"});
                    }
                }
            }
        );
    }
    closeModal = () => {
        this.setState({modalLoading: false});
        this.setState({modalError: false});
        this.setState({modalAuthFailed: false});
        this.setState({modalUserUnconfirmed: false});
        this.setState({modalResetPassSuccess: false});
        this.setState({modalResetPassFailed: false});

        this.clearState();
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
    changePasswordInputStyleIn() {
        var element = document.querySelector("form > div:nth-child(6) > div");
        element.style.boxShadow = "0 5px 5px -5px black";

        var element2 = document.getElementById("inputGroupPrepend");
        element2.style.borderColor = "#ced4da";

        var element3 = document.getElementById("formGridPassword");
        element3.style.borderColor = "#ced4da";
    }
    changePasswordInputStyleOut() {
        var element3 = document.getElementById("formGridPassword");
        element3.style.borderColor = "#ced4da";

        var element = document.querySelector("form > div:nth-child(6) > div");
        element.style.boxShadow = "0 3px 3px -3px black";

        var element2 = document.getElementById("inputGroupPrepend");
        element2.style.borderColor = "#ced4da";

    }
    componentDidMount() {
        this.adjustContent();
    }
    adjustContent() {
        document.getElementsByClassName("auth-button-my")[0].disabled = true;
        document.getElementById("root").style.height = "100%";
        document.querySelector("#root > div.navbar-header > div > div.navbar-buttons").innerHTML = "<a href=\"/rejestracja\">Załóż konto</a><a class=\"navbar-button-active\" style=\"margin-right: 10px\">Zaloguj się</a>";
        document.getElementById("password-reset-form").style.display = "none";
    }
    clearState() {
        this.state.form.email = "";
        this.state.form.password = "";

        this.state.formControll.email = false;
        this.state.formControll.password = false;

        document.getElementById("formGridEmail").value = "";
        document.getElementById("formGridPassword").value = "";
        document.getElementsByClassName("auth-button-my")[0].disabled = true;
        document.getElementById("form-value-alert-email").innerHTML = "";
        document.getElementById("form-value-alert-password-span").innerHTML = "";

        this.setState({userId: ""});
        this.setState({reSendLinkSuccess: "none"});
        this.setState({reSendLinkFailed: "none"});
        this.setState({reSendLinkSpinner: "none"});
        this.setState({reSendButton: "block"});
    }
    clearResetPassState() {
        this.state.resetEmail = "";
        this.state.formControll.emailReset = false;

        document.getElementById("formGridEmailResetPass").value = "";
        document.getElementById("reset-pass-button").disabled = true;
        document.getElementById("form-value-alert-email-reset-pass").innerHTML = "";
    }
    loginFormDisplay() {
        var resetPass = document.getElementById("password-reset-form");
        var signIn = document.getElementById("sign-in-form");

        resetPass.classList.remove("w3-animate-right-in");
        signIn.classList.remove("w3-animate-left-out");

        resetPass.classList.add("w3-animate-right-out");
        setTimeout(function() {
            resetPass.style.display = "none";
            signIn.style.display = "block";
            signIn.classList.add("w3-animate-left-in");
        }, 400);

        this.clearState();
    }
    passResetFormDisplay() {
        var resetPass = document.getElementById("password-reset-form");
        var signIn = document.getElementById("sign-in-form");

        resetPass.classList.remove("w3-animate-right-out");
        signIn.classList.remove("w3-animate-left-in");

        signIn.classList.add("w3-animate-left-out");
        setTimeout(function() {
            signIn.style.display = "none";
            resetPass.style.display = "block";
            resetPass.classList.add("w3-animate-right-in");
        }, 400);

        this.clearResetPassState();
    }

    render() {
        const popover = (
            <Popover id="popover-basic">
                <Popover.Title as="h3" className="tooltip-register-password-header"><b>Jakie hasło utworzyć?</b></Popover.Title>
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
            <>
                <div className="home-container" style={{height: "100%"}}>
                    <div className="photo-section photo-login-register">
                        <div className="opacity-background">
                            <div className="auth-content-container" style={{width: "700px"}} id="sign-in-form">
                                <Form>
                                    <h2 className="gradient-text">Logowanie</h2>
                                    <h4 className="gradient-text">Tutaj możesz zalogować się do swojego konta.</h4>
                                    <p>Nie posiadasz jeszcze konta? <a className="form-link" href="/rejestracja">Zarejestruj się</a></p>
                                    <hr style={{ marginBottom: "2rem"}}/>
                                    <Form.Group controlId="formGridEmail">
                                            <Form.Label>Email:</Form.Label><span id="form-value-alert-email" className="form-value-alert"></span>
                                            <Form.Control type="email" placeholder="Wprowadź email..." onChange={this.handleEmailChanged.bind(this)}/>
                                    </Form.Group>

                                    <Form.Group controlId="formGridPassword">
                                        <Form.Label>Hasło:</Form.Label>
                                        <span id="form-value-alert-password" className="form-value-alert" style={{display: "none"}}>
                                            <span id="form-value-alert-password-span"></span>
                                            <OverlayTrigger trigger={["hover", "hover"]} placement="right" overlay={popover}>
                                                <sub variant="success" id="register-password-tooltip"><i className="fas fa-question-circle"></i></sub>
                                            </OverlayTrigger>
                                        </span>
                                        <InputGroup>
                                            <Form.Control type="password" placeholder="Wprowadź hasło..." onChange={this.handlePasswordChanged.bind(this)} onFocus={this.changePasswordInputStyleIn} onBlur={this.changePasswordInputStyleOut}/>
                                            <InputGroup.Prepend>
                                                <InputGroup.Text id="inputGroupPrepend" onClick={this.showPassword}><i className="fas fa-eye w3-animate-opacity"></i><i className="fas fa-eye-slash w3-animate-opacity" style={{display: "none", width: "18px"}}></i></InputGroup.Text>
                                            </InputGroup.Prepend>
                                        </InputGroup>
                                    </Form.Group>
                                    <Form.Label>Nie pamiętasz hasła? <span className="form-link" onClick={this.passResetFormDisplay.bind(this)}>Zmień je</span></Form.Label>

                                    <Button onClick={this.submitFormAndSend.bind(this)} type="button" variant="primary" className="auth-button-my" style={{float: 'right'}}>
                                        Zaloguj się
                                    </Button>
                                </Form>
                              </div>

                              <div className="auth-content-container" style={{width: "700px"}} id="password-reset-form">
                                <Form>
                                    <h2 className="gradient-text">Odzyskiwanie konta</h2>
                                    <p>Wpisz swój adres email, abyśmy mogli wysłać Ci link do resetowania hasła.</p>
                                    <hr style={{ marginBottom: "2rem"}}/>
                                    <Form.Group controlId="formGridEmailResetPass">
                                            <Form.Label>Email:</Form.Label><span id="form-value-alert-email-reset-pass" className="form-value-alert"></span>
                                            <Form.Control type="email" placeholder="Wprowadź email..." onChange={this.handleEmailChangedPassReset.bind(this)}/>
                                    </Form.Group>

                                    <Button variant="outline-secondary" onClick={this.loginFormDisplay.bind(this)}>Wstecz</Button>
                                    <Button onClick={this.sendResetPassRequest.bind(this)} id="reset-pass-button" type="button" variant="primary" className="auth-button-my" style={{float: 'right'}}>
                                        Wyślij
                                    </Button>
                                </Form>
                            </div>
                        </div>
                        <div id="footer" style={{height: "70px", background: "none", position: "fixed", bottom: 0, width: "100%"}}>
                            <div className="width-divider">
                                <span></span>
                                <p className="text-shadow-1-2">ePortfolio &copy; 2020</p>
                                <p className="text-shadow-1-2">Wszelkie prawa zastrzeżone</p>
                            </div>
                        </div>
                    </div>

                    <ModalHeaderError show={this.state.modalError} onClose={this.closeModal}/>

                    <ModalError show={this.state.modalResetPassFailed} onClose={this.closeModal} title="Użytkownik nie istnieje!">
                        <b>Nie znaleźliśmy</b> danego użytkownika w systemie. <b>Sprawdź</b> swój adres email i <b>spróbuj ponownie</b>.
                    </ModalError>

                    <ModalSuccess show={this.state.modalResetPassSuccess} onClose={this.closeModal} title="Email wysłany!">
                        Na podany <b>adres email</b> został wysłany link, otwórz go żeby ustawić <b>nowe hasło</b>.
                        <br /><sub><b>Link resetujący będzie ważny przez 30 min.</b></sub>
                    </ModalSuccess>

                    <ModalError show={this.state.modalAuthFailed} onClose={this.closeModal} title="Błąd logowania!">
                        Podano <b>nieprawidłowy</b> login lub hasło.
                        <br/><sub><b>Spróbuj ponownie.</b></sub>
                    </ModalError>

                    <ModalErrorResendLink
                        onClose={this.closeModal}
                        show={this.state.modalUserUnconfirmed}
                        title="Konto nie zostało potwierdzone!"
                        reSendSuccess={this.state.reSendLinkSuccess}
                        reSendFailed={this.state.reSendLinkFailed}
                        reSendButton={this.state.reSendButton}
                        reSendSpinner={this.state.reSendLinkSpinner}
                        reSendLink={this.reSendConfirmationLink}
                        >
                        <b>Potwerdz</b> swoje konto aby móc się zalogować. <br />
                        Jeśli Twój link aktywacyjny <b>stracił ważność</b>, kliknij przycisk poniżej aby <b>wygenerować</b> nowy.
                    </ModalErrorResendLink>

                    <ModalLoading show={this.state.modalLoading}/>
                </div>
            </>
        )
    }
}

export default RegisterContent;
