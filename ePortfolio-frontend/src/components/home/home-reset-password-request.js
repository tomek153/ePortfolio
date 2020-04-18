import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import ImageLogo from '../../images/logo.png';
import superagent from 'superagent';

class LoginContent extends Component {
    constructor() {
        super();
        this.state = {
            resetPasswordMail: {
                firstName: "Reset",
                lastName: "Hasła",
                email: "",
                password: "test",
                role: "user"
            },
            formControll: {
                email: false
            },
            modalSuccesShow: false,
            modalFailedShow: false,
            modalLoadingMessage: false
        }
    }

    checkFormDataValid() {
        if (
            this.state.formControll.email
        ) {
            var element = document.getElementsByClassName("login-button-my")[0];
            element.disabled = false;
        } else {
            document.getElementsByClassName("login-button-my")[0].disabled = true;
        }
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
    handleEmailChanged(event) {
        this.state.resetPasswordMail.email = event.target.value;

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
    clearField() {
        document.getElementById("formBasicEmail").value = "";
        this.state.resetPasswordMail.email = "";
    }

    submitFormAndSend(event) {
        this.setState({modalLoadingMessage: true});
        event.preventDefault();
        superagent
            .post('http://localhost:8080/api/reset-password')
            .send(this.state.resetPasswordMail)
            .end((err, res) => {
                if(err) {
                    if(res.body.message == "User_does_not_exist"){
                        this.setState({modalLoadingMessage: false});
                        this.setState({modalFailedShow: true});
                    } else
                         alert("Reset password, by message on your email: " + this.state.resetPasswordMail.email);
                         this.setState({modalLoadingMessage: false});
                         this.setState({modalFailedShow: true});       
                    return;
                } else {
                    this.clearField();
                    this.setState({modalLoadingMessage: false});
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
        return (
            <>
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
                            <Form.Label>Email</Form.Label><span id="form-value-alert-email" className="form-value-alert"><sub>Podano nieprawidłową wartość.</sub></span>
                            <Form.Control type="email" placeholder="Wprowadź email..." onChange={this.handleEmailChanged.bind(this)}/>
                            <Form.Text className="text-muted">
                               Nie udostępnimy twojego maila nikomu.
                            </Form.Text>
                        </Form.Group>
                        <Button onClick={this.submitFormAndSend.bind(this)} variant="primary" type="submit" className="login-button-my" style={{float: 'right'}}>
                            Zmień hasło
                        </Button>
                    </Form>
                </div>
            </div>
                <Modal show={this.state.modalSuccesShow} size="lg" aria-labelledby="contained-modal-title-vcenter"  style={{backgroundColor: "rgba(0,0,0,0.4)"}} centered>
                    <Modal.Header style={{color: "#31b4cb", backgroundColor: "rgba(49, 180, 203, 0.15)"}}>
                        <Modal.Title id="contained-modal-title-vcenter">
                          Udało się!
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{textAlign: "center"}}>
                        <i className="fas fa-check fa-5x" id="successIconModal"></i>
                        <p style={{color: "#444"}}>
                            Na adres mailowy została wysłana wiadomość, za pomocą której ustawisz nowe hasło.
                            Na podany <b>adres email</b> został wysłany <b>link resetowania hasła</b>, użyj go aby <b>ustawiń nowe hasło</b>.
                            <br /><b>Link</b> resetowania hasła będzie <b>ważny</b> przez <b>30 min</b>.
                        </p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="link" onClick={this.closeModal.bind(this)} className="modal-close-btn">Zamknij</Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={this.state.modalFailedShow} size="lg" aria-labelledby="contained-modal-title-vcenter" style={{backgroundColor: "rgba(0,0,0,0.4)"}} centered>
                    <Modal.Header style={{color: "#de473c", backgroundColor: "rgba(222, 71, 60, 0.15)"}}>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Konto nie istnieje!
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{textAlign: "center"}}>
                        <i className="fas fa-exclamation fa-5x" id="successIconModal" style={{color: "#de473c"}}></i>
                        <p style={{color: "#444"}}>
                            Mail <b>nie został</b> wysłany, ponieważ <b>nie istnieje</b> użytkownik z podanym adresem email. Spróbuj ponownie z <b>innym</b> adresem email.
                        </p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="link" className="modal-close-btn" onClick={this.closeModal.bind(this)}>Zamknij</Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={this.state.modalLoadingMessage} id="container-spinner-modal-register-request" style={{backgroundColor: "rgba(0,0,0,0.4)"}} centered>
                    <Spinner animation="grow" variant="light" id="spinner-modal-register-request"/>
                </Modal>
                </>
        )
    }
}

export default LoginContent;