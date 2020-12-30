import React, { Component } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import superagent from 'superagent';

import LogoImage from '../../images/logo-2.png';
import ScreenImage from '../../images/system-screen.png';
import styles from '../../css/auth.css';

class RegisterContent extends Component {

    constructor() {
        super();
        this.state = {
            form: {
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
            elements: {
                firstName: "",
                lastName: "",
                email: "",
                password: ""
            },
            modalSuccess: false,
            modalLoading: false,
            modalError: false,
            scrollbarWidth: 0
        }
    }
    checkFormDataValid() {
        var element = document.getElementsByClassName("auth-button-my")[0];

        if (this.state.formControll.firstName &&
            this.state.formControll.lastName &&
            this.state.formControll.email &&
            this.state.formControll.password &&
            this.state.formControll.regulations
        ) {
            element.disabled = false;
        } else {
            element.disabled = true;
        }
    }
    handleFirstNameChanged(event) {
        let value = event.target.value;
        this.state.form.firstName = value;
        let length = value.length;
        var regex = /[^a-zA-Z -]/;
        let isProperValue = false;
        let element = document.getElementById("form-value-alert-name");

        if (value.match(regex) == null) {
            if (length >= 2 && length <= 40) {
                isProperValue = true;
            }
        }

        if (isProperValue) {
            this.state.formControll.firstName = true;
            element.innerHTML = "<i class=\"fas fa-check\" style=\"font-size: 15px\"></i>";
        } else {
            this.state.formControll.firstName = false;
            element.innerHTML = "<sub>Podano nieprawidłową wartość.</sub>";
        }

        this.checkFormDataValid();
    }
    handleLastNameChanged(event) {
        let value = event.target.value;
        this.state.form.lastName = value;
        let length = value.length;
        var regex = /[^a-zA-Z -]/;
        let isProperValue = false;
        let element = document.getElementById("form-value-alert-lastName");

        if (value.match(regex) == null) {
            if (length >= 2 && length <= 40) {
                isProperValue = true;
            }
        }

        if (isProperValue) {
            this.state.formControll.lastName = true;
            element.innerHTML = "<i class=\"fas fa-check\" style=\"font-size: 15px\"></i>";
        } else {
            this.state.formControll.lastName = false;
            element.innerHTML = "<sub>Podano nieprawidłową wartość.</sub>";
        }

        this.checkFormDataValid();
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
            superagent
                .get('http://localhost:8080/api/users/'+this.state.form.email)
                .send(this.state.form)
                .end((res, err) => {
                    if (err) {
                        this.state.formControll.email = false;
                        element.innerHTML = "<sub>Nieznany błąd.</sub>";
                    } else {
                        if (res.status == 200 && res.rawResponse == "user_not_exist") {
                            this.state.formControll.email = true;
                            element.innerHTML = "<i class=\"fas fa-check\" style=\"font-size: 15px\"></i>";
                        } else if (res.status == 200 && res.rawResponse == "user_exist") {
                            this.state.formControll.email = false;
                            element.innerHTML = "<sub>Użytkownik z podanym adresem email istnieje.</sub>";
                        } else {
                            this.state.formControll.email = false;
                            element.innerHTML = "<sub>Nieznany błąd.</sub>";
                        }
                    }
                    this.checkFormDataValid();
                });
        } else {
            this.state.formControll.email = false;
            element.innerHTML = "<sub>Podano nieprawidłową wartość.</sub>";
            this.checkFormDataValid();
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
    checkRegulations() {
        var element = document.getElementById("formBasicCheckbox");
        this.state.formControll.regulations = element.checked;

        this.checkFormDataValid();
    }
    submitFormAndSend(event) {
        event.preventDefault();
        this.setState({modalLoading: true});
        superagent
            .post('http://localhost:8080/api/users')
            .send(this.state.form)
            .end((err) => {
                if(err) {
                    this.clearState();
                    this.setState({modalLoading: false});
                    this.setState({modalError: true});
                } else {
                    this.clearState();
                    this.setState({modalLoading: false});
                    this.setState({modalSuccess: true});
                }
            }
        );
    }
    closeModal() {
        this.setState({modalSuccess: false});
        this.setState({modalLoading: false});
        this.setState({modalError: false});
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
        var element = document.querySelector("form > div:nth-child(6) > div:nth-child(2) > div");
        element.style.boxShadow = "0 5px 5px -5px black";

        var element2 = document.getElementById("inputGroupPrepend");
        element2.style.borderColor = "#ced4da";

        var element3 = document.getElementById("formGridPassword");
        element3.style.borderColor = "#ced4da";
    }
    changePasswordInputStyleOut() {
        var element3 = document.getElementById("formGridPassword");
        element3.style.borderColor = "#ced4da";

        var element = document.querySelector("form > div:nth-child(6) > div:nth-child(2) > div");
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
        document.querySelector("#root > div.navbar-header > div > div.navbar-buttons").innerHTML = "<span class=\"navbar-button-active\">Załóż konto</span><a href=\"/logowanie\" id=\"login-button\">Zaloguj się</a>";
    }
    clearState() {
        this.state.form.firstName = "";
        this.state.form.lastName = "";
        this.state.form.email = "";
        this.state.form.password = "";

        this.state.formControll.firstName = false;
        this.state.formControll.lastName = false;
        this.state.formControll.email = false;
        this.state.formControll.password = false;
        this.state.formControll.regulations = false;

        document.getElementById("formGridFirstName").value = "";
        document.getElementById("formGridLastName").value = "";
        document.getElementById("formGridEmail").value = "";
        document.getElementById("formGridPassword").value = "";
        document.getElementById("formBasicCheckbox").checked = false;
        document.getElementsByClassName("auth-button-my")[0].disabled = true;
        document.getElementById("form-value-alert-name").innerHTML = "";
        document.getElementById("form-value-alert-lastName").innerHTML = "";
        document.getElementById("form-value-alert-email").innerHTML = "";
        document.getElementById("form-value-alert-password-span").innerHTML = "";
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
                            <div className="auth-container">
                            <div className="auth-content-container">
                                <Form>
                                    <h2 className="gradient-text">Rejestracja</h2>
                                    <h4 className="gradient-text">Dołącz do społeczności ePortfolio!</h4>
                                    <p>Utworzenie konta zajmie Ci tylko <b>chwile</b>.</p>
                                    <hr style={{ marginBottom: "2rem"}}/>
                                    <Form.Row>
                                        <Form.Group as={Col} controlId="formGridFirstName">
                                            <Form.Label>Imię:</Form.Label><span id="form-value-alert-name" className="form-value-alert"></span>
                                            <Form.Control placeholder="Wprowadź imię..." onChange={this.handleFirstNameChanged.bind(this)} autoComplete="none"/>
                                        </Form.Group>

                                        <Form.Group as={Col} controlId="formGridLastName">
                                            <Form.Label>Nazwisko:</Form.Label><span id="form-value-alert-lastName" className="form-value-alert"></span>
                                            <Form.Control placeholder="Wprowadź nazwisko..." onChange={this.handleLastNameChanged.bind(this)} autoComplete="none"/>
                                        </Form.Group>
                                    </Form.Row>

                                    <Form.Row>
                                        <Form.Group as={Col} controlId="formGridEmail">
                                            <Form.Label>Email:</Form.Label><span id="form-value-alert-email" className="form-value-alert"></span>
                                            <Form.Control placeholder="Wprowadź email..." onChange={this.handleEmailChanged.bind(this)} autoComplete="none"/>
                                        </Form.Group>

                                        <Form.Group as={Col} controlId="formGridPassword">
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
                                    </Form.Row>
                                    <Form.Group controlId="formBasicCheckbox">
                                        <Form.Check>
                                            <Form.Check.Input type="checkbox" onClick={this.checkRegulations.bind(this)}/>
                                            <Form.Check.Label>Zapoznałem się z <a id="checkbox-regulations-link" href="/regulamin" target="_blank">regulaminem</a> serwisu, oraz akceptuje jego warunki.</Form.Check.Label>
                                        </Form.Check>
                                    </Form.Group>

                                    <Button onClick={this.submitFormAndSend.bind(this)} type="button" variant="primary" className="auth-button-my" style={{float: 'right'}}>
                                        Utwórz konto
                                    </Button>
                                </Form>
                            </div>
                            </div>
                        </div>
                        <div id="footer" style={{height: "70px", background: "none", position: "fixed", bottom: 0, width: "100%"}}>
                            <div className="width-divider">
                                <p>ePortfolio &copy; 2020</p><p>Wszelkie prawa zastrzeżone</p>
                            </div>
                        </div>
                    </div>

                    <Modal size="sm" show={this.state.modalSuccess} aria-labelledby="example-modal-sizes-title-sm" onHide={() => this.closeModal()}>
                        <Modal.Header closeButton>
                            <Modal.Title id="example-modal-sizes-title-sm" style={{textAlign: "center"}}>
                                <i className="fas fa-check-circle success-modal-icon"></i>Tworzenie konta zakończone!
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            Na podany <b>adres email</b> został wysłany <b>link aktywacyjny</b>, potwierdź go aby móc się <b>zalogować</b>.
                            <br /><b>Link</b> aktywacyjny będzie <b>ważny</b> przez <b>30 min</b>.
                        </Modal.Body>
                    </Modal>

                    <Modal size="sm" show={this.state.modalError} aria-labelledby="example-modal-sizes-title-sm" onHide={() => this.closeModal()}>
                        <Modal.Header closeButton className="modal-header-error">
                            <Modal.Title id="example-modal-sizes-title-sm" style={{textAlign: "center"}}>
                                <i className="fas fa-times-circle success-modal-icon"></i>Tworzenie konta nieudane!
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            Z nieznanych powodów <b>nie udało się</b> utworzyć konta.
                            <br/>Spróbuj ponownie <b>później</b>.
                        </Modal.Body>
                    </Modal>

                    <Modal show={this.state.modalLoading} id="spinner-container" aria-labelledby="contained-modal-title-vcenter" centered>
                        <Modal.Body>
                            <Spinner animation="grow e-spinner"/>
                        </Modal.Body>
                    </Modal>
                </div>
            </>
        )
    }
}

export default RegisterContent;
