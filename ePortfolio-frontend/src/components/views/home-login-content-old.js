import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import InputGroup from 'react-bootstrap/InputGroup';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';

import superagent from 'superagent';

import ImageLogo from '../../images/logo.png';
import PageLoading from '../page-loading';

class LoginContent extends Component {
    constructor() {
        super();
        this.state = {
            form: {
                email: "",
                password: ""
            },
            formControll: {
                email: false,
                password: false
            },
            modalSuccesShow: false,
            modalFailedShow: false,
            modalLoadingMessage: false,
            modalUnconfirmed: false,
            reSendLinkSuccess: "none",
            reSendLinkFailed: "none",
            reSendLinkSpinner: "none",
            userId: "",
            redirectExpired: false,
            redirectBad_token: false
        }
    }

    setBadTokenState = () => {
        this.setState({redirectBad_token: true})
    }

    setExpiredState = () => {
        this.setState({redirectExpired: true})
    }

    componentDidMount() {
        let token = localStorage.getItem("token");
        if (token != null && this.props.location.search != "?token=bad_token" && this.props.location.search != "?token=expired") {
            this.userRedirect("/moj-profil");
        } else {
            this.checkFormDataValid();
            const loader = document.querySelector(".page-loading");

            window.onload = () => {
                window.setTimeout(function() {
                    loader.classList.add("hidden");
                    this.setTimeout(function() {
                        document.querySelector(".login-form-my").style = "display: block";
                        document.querySelector("#login-back-button").style = "display: block";
                        document.querySelector(".login-header-container").style = "display: block";
                    }, 200);
                }, 600);
                if (this.props.location.search == "?token=bad_token") {
                    window.setTimeout(this.setBadTokenState, 1200);
                    localStorage.removeItem("token");
                } else if (this.props.location.search == "?token=expired") {
                    window.setTimeout(this.setExpiredState, 1200);
                    localStorage.removeItem("token");
                }
            }
        }
    }

    userRedirect(url) {
        const form = document.querySelector(".login-form-my");
        const backButton = document.querySelector("#login-back-button");
        const header = document.querySelector(".login-header-container");

        form.classList.remove("w3-animate-right-login-container");
        form.classList.add("w3-animate-left-login-container");
        backButton.classList.add("w3-animate-left-login-back-button");
        backButton.classList.add("w3-animate-right-login-back-button");
        header.classList.add("w3-animate-left-login-header");
        header.classList.add("w3-animate-right-login-header");

        setTimeout(function() {
            form.style = "display: none";
            backButton.style = "display: none";
            header.style = "display: none";

            setTimeout(function() {
                window.location.href = url;
            }, 200);
        }, 600);
    }

    homeRedirect() {
        this.userRedirect("/");
    }

    registerRedirect() {
        this.userRedirect("/rejestracja");
    }

    checkFormDataValid() {
        if (this.state.formControll.email &&
            this.state.formControll.password
        ) {
            document.getElementsByClassName("login-button-my")[0].disabled = false;
        } else {
            document.getElementsByClassName("login-button-my")[0].disabled = true;
        }
    }

    handleEmailChanged(event) {
        this.state.form.email = event.target.value;

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
                if (length < 8 || length > 40) {
                    element.style.display = "block";
                    element.innerHTML = "<sub>Min 8, max 40 znaków.</sub>";
                    this.state.formControll.email = false;
                    this.checkFormDataValid();
                } else {
                    element.style.display = "none";
                    this.state.formControll.email = true;
                    this.checkFormDataValid();
                }
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
        this.state.form.password = password;

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
        var x = document.getElementById("formBasicPassword");
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
        element.style.boxShadow = "0 0 0 0.2rem rgba(0,123,255,.25)";

        var element2 = document.getElementById("inputGroupPrepend");
        element2.style.borderColor = "#80bdff";
    }
    changePasswordInputStyleOut() {
        var element = document.querySelector("form > div:nth-child(6) > div");
        element.style.boxShadow = "0 0 0 0 rgba(0,123,255,.25)";

        var element2 = document.getElementById("inputGroupPrepend");
        element2.style.borderColor = "#ced4da";
    }

    submitFormAndSend(event) {
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

        fetch(request)
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data.message == "Authentication failed.") {
                    this.setState({modalLoadingMessage: false});
                    this.setState({modalFailedShow: true});
                } else if (data.message == "User unconfirmed.") {
                    this.state.userId = data.userId;
                    this.setState({modalLoadingMessage: false});
                    this.setState({modalUnconfirmed: true});
                } else if (data.message == "Authentication success.") {
                    localStorage.setItem('token', data.token);
                    this.userRedirect("/moj-profil");
                } else {
                    console.log(data);
                    alert("Unknown error.");
                }
            }
        );
    }

    closeModal() {
        this.setState({modalSuccesShow: false});
        this.setState({modalFailedShow: false});
        this.setState({modalUnconfirmed: false});
        this.setState({redirectExpired: false});
        this.setState({redirectBad_token: false});
    }

    reSendConfirmationLink(event) {

        document.getElementsByClassName("resend-link-button")[0].style.display = "none";
        this.setState({reSendLinkSpinner: "block"});

        event.preventDefault();
        superagent
            .post('http://localhost:8080/email/resend')
            .send({ idKey: this.state.userId, registerKey: null })
            .end((err, res) => {
                if(err) {
                    alert("Coś poszło nie tak!");
                    this.setState({reSendLinkSpinner: "none"});
                    document.getElementsByClassName("resend-link-button")[0].style.display = "block";
                    return;
                } else {
                    if(res.body.status){
                        document.querySelector("#successIconModal").style.color = "rgba(0,0,0,0.3)";
                        document.querySelector("div.fade.modal.show > div > div > div.modal-body > p").style.color = "rgba(0,0,0,0.3)";
                        this.setState({reSendLinkSpinner: "none"});
                        this.setState({reSendLinkSuccess: "block"});
                        this.setState({reSendLinkFailed: "none"});
                    } else{
                        document.querySelector("#successIconModal").style.color = "rgba(0,0,0,0.3)";
                        document.querySelector("div.fade.modal.show > div > div > div.modal-body > p").style.color = "rgba(0,0,0,0.3)";
                        this.setState({reSendLinkSpinner: "none"});
                        this.setState({reSendLinkFailed: "block"});
                        this.setState({reSendLinkSuccess: "none"});
                    }
                }
            }
        );
    }

    render() {
        const popoverPassword = (
            <Popover id="popover-basic">
                <Popover.Title as="h2" className="tooltip-register-password-header"><b>Polityka haseł.</b></Popover.Title>
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
            <div class="background-image-container">
                <PageLoading />
                <div className="background-opcaity-container">
                    <div className="login-header-container w3-animate-left-login-header"><span className="gradient-text">Logowanie</span></div>
                    <i className="fas fa-arrow-left home-link-register w3-animate-left-login-back-button" id="login-back-button" onClick={this.homeRedirect.bind(this)}></i>
                    <img
                        className="login-logo-my"
                        src={ImageLogo}
                    />
                    <div className="login-form-my w3-animate-right-login-container">
                        <Form>
                            <h3 className="gradient-text">Witaj !</h3>
                            <p>Tutaj możesz zalogować się do swojego konta.</p>
                            <p>Nie posiadasz jeszcze konta? <a className="login-links login-register-redirect" onClick={this.registerRedirect.bind(this)}>Zarejestruj się</a>
                            </p>
                            <hr />
                            <Form.Group controlId="formBasicEmail">
                                    <Form.Label>Email</Form.Label><span id="form-value-alert-email" className="form-value-alert"><sub>Podano nieprawidłową wartość.</sub></span>
                                    <Form.Control type="email" placeholder="Wprowadź email..." onChange={this.handleEmailChanged.bind(this)}/>
                                    <Form.Text className="text-muted">
                                        We'll never share your email with anyone else.
                                    </Form.Text>
                            </Form.Group>

                            <Form.Group controlId="formBasicPassword" style={{marginBottom: '45px'}}>
                                <Form.Label>Hasło</Form.Label>
                                <span id="form-value-alert-password" className="form-value-alert">
                                    <sub>Podano niepoprawne hasło. </sub>
                                    <OverlayTrigger trigger="hover" placement="top" overlay={popoverPassword}>
                                        <sub variant="success" id="register-password-tooltip"><i className="fas fa-question-circle"></i></sub>
                                    </OverlayTrigger>
                                </span>
                                <InputGroup id="div-password-login">
                                    <Form.Control type="password" placeholder="Wprowadź hasło..." onChange={this.handlePasswordChanged.bind(this)} onFocus={this.changePasswordInputStyleIn} onBlur={this.changePasswordInputStyleOut}/>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id="inputGroupPrepend" onClick={this.showPassword}><i className="fas fa-eye w3-animate-opacity"></i><i className="fas fa-eye-slash w3-animate-opacity"></i></InputGroup.Text>
                                    </InputGroup.Prepend>
                                </InputGroup>
                            </Form.Group>
                            <Button onClick={this.submitFormAndSend.bind(this)} variant="primary" className="login-button-my" style={{float: 'right'}}>
                                Zaloguj się
                            </Button>
                            <Button variant="link" style={{float: 'right'}} className="login-links">
                                Nie pamiętasz hasła?
                            </Button>
                        </Form>
                    </div>
                </div>
                <Modal show={this.state.modalLoadingMessage} id="container-spinner-modal-register-request" style={{backgroundColor: "rgba(0,0,0,0.4)"}} centered>
                    <Spinner animation="grow" variant="light" id="spinner-modal-register-request"/>
                </Modal>
                <Modal show={this.state.modalFailedShow} size="lg" aria-labelledby="contained-modal-title-vcenter" style={{backgroundColor: "rgba(0,0,0,0.4)"}} centered>
                    <Modal.Header style={{color: "#de473c", backgroundColor: "rgba(222, 71, 60, 0.15)"}}>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Błąd logowania!
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{textAlign: "center"}}>
                        <i className="fas fa-exclamation fa-5x" id="successIconModal" style={{color: "#de473c"}}></i>
                        <p style={{color: "#444"}}>
                            Wprowadzono błedny login lub hasło. Spróbuj ponownie.
                        </p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="link" className="modal-close-btn" onClick={this.closeModal.bind(this)}>Zamknij</Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={this.state.modalUnconfirmed} size="lg" aria-labelledby="contained-modal-title-vcenter" style={{backgroundColor: "rgba(0,0,0,0.4)"}} centered>
                    <Modal.Header style={{color: "#31b4cb", backgroundColor: "rgba(49, 180, 203, 0.15)"}}>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Konto nie zostało potwierdzone.
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{textAlign: "center"}}>
                        <i className="fas fa-exclamation fa-5x" id="successIconModal" style={{color: "#31b4cb"}}></i>
                        <p style={{color: "#444"}}>
                            <b>Potwerdz</b> swoje konto aby móc się zalogować. <br />
                            Jeśli Twój link aktywacyjny <b>stracił ważność</b>, kliknij przycisk poniżej aby <b>wygenerować</b> nowy.
                        </p>
                    </Modal.Body>
                    <Modal.Footer style={{display: this.state.reSendLinkSuccess}}>
                        <Modal.Body style={{textAlign: "center"}}>
                            <i className="fas fa-check fa-5x" id="successIconModal"></i>
                            <p style={{color: "#444"}}>
                                <b>Nowy</b> link aktywacyjny został <b>wysłany</b> na Twój adres email. Będzie <b>ważny</b> przez kolejne <b>30 min</b>.
                                <br /><b>Pozdrawiamy ePortfolio team!</b>
                            </p>
                        </Modal.Body>
                    </Modal.Footer>
                    <Modal.Footer style={{display: this.state.reSendLinkFailed}}>
                        <Modal.Body style={{textAlign: "center"}}>
                            <i className="fas fa-exclamation fa-5x" id="successIconModal" style={{color: "#de473c"}}></i>
                            <p style={{color: "#444"}}>
                                Z nieznanych powodów <b>nie udało</b> się wysłać nowego linku. Prosimy spróbować <b>później</b>.
                                <br /><b>Pozdrawiamy Zespół ePortfolio</b>
                            </p>
                        </Modal.Body>
                    </Modal.Footer>
                    <Modal.Footer>
                        <Button variant="link" className="modal-close-btn" onClick={this.closeModal.bind(this)}>Zamknij</Button>
                        <Button className="resend-link-button" onClick={this.reSendConfirmationLink.bind(this)}>Wyslij link</Button>
                        <Spinner style={{display: this.state.reSendLinkSpinner}} id="resend-link-spinner" animation="border" variant="primary" />
                    </Modal.Footer>
                </Modal>
                <Modal show={this.state.redirectExpired} size="lg" aria-labelledby="contained-modal-title-vcenter" style={{backgroundColor: "rgba(0,0,0,0.4)"}} centered>
                    <Modal.Header style={{color: "#de473c", backgroundColor: "rgba(222, 71, 60, 0.15)"}}>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Sesja wygasła!
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{textAlign: "center"}}>
                        <i className="fas fa-exclamation fa-5x" id="successIconModal" style={{color: "#de473c"}}></i>
                        <p style={{color: "#444"}}>
                            Twoja sesja wygasła. Zaloguj się ponownie aby wejść na swoje konto.
                        </p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="link" className="modal-close-btn" onClick={this.closeModal.bind(this)}>Zamknij</Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={this.state.redirectBad_token} size="lg" aria-labelledby="contained-modal-title-vcenter" style={{backgroundColor: "rgba(0,0,0,0.4)"}} centered>
                    <Modal.Header style={{color: "#de473c", backgroundColor: "rgba(222, 71, 60, 0.15)"}}>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Brak autoryzacji!
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{textAlign: "center"}}>
                        <i className="fas fa-exclamation fa-5x" id="successIconModal" style={{color: "#de473c"}}></i>
                        <p style={{color: "#444"}}>
                            Zaloguj się aby móc wejść do serwisu.
                        </p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="link" className="modal-close-btn" onClick={this.closeModal.bind(this)}>Zamknij</Button>
                    </Modal.Footer>
                </Modal>
            </div>
        )
    }
}

export default LoginContent;
