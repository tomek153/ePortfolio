import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import ImageLogo from '../../images/logo.png';
import PageLoading from '../page-loading';
import superagent from 'superagent';

class ContactContent extends Component {

    constructor() {
        super();
        this.state = {
            newMail: {
                firstName: "",
                email: "",
                message: ""
            },
            formControll: {
                firstName: false,
                email: false,
                message: false
            },
            modalSuccesShow: false,
            modalFailedShow: false,
            modalLoadingMessage: false
        }
    }

    checkFormDataValid() {
        if (this.state.formControll.firstName &&
            this.state.formControll.email
        ) {
            var element = document.getElementsByClassName("login-button-my")[0];
            element.disabled = false;
        } else {
            document.getElementsByClassName("login-button-my")[0].disabled = true;
        }
    }

    handleFirstNameChanged(event) {
        this.state.newMail.firstName = event.target.value;

        let length = event.target.value.length;
        var regex = /[^a-zA-Z]/;
        let element = document.getElementById("form-value-alert-name");
        let messageShort = '<sub>Min 2 znaki.</sub>';
        let messageLong = '<sub>Max 15 znaków.</sub>';
        let messageRegexViolation = '<sub>Podano niedozwolony znak.</sub>';


        this.checkRegex(event.target.value, regex, messageRegexViolation, element,
            2, 15, length, messageShort, messageLong, "firstName");
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
        this.state.newMail.email = event.target.value;

        let length = event.target.value.length;
        var regex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
        let element = document.getElementById("form-value-alert-email");
        let messageShort = '<sub>Min 8 znaków.</sub>';
        let messageLong = '<sub>Max 40 znaków.</sub>';
        let messageRegexViolation = '<sub>Podano niepoprawny adres email.</sub>';

        this.checkEmailRegex(event.target.value, regex, messageRegexViolation, element,
            8, 40, length, messageShort, messageLong);
    }


handleMessageChanged(event){
    this.state.newMail.message = event.target.value;
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


    clearField() {
        document.getElementById("formGridFirstName").value = "";
        document.getElementById("formGridEmail").value = "";
        this.state.newMail.firstName = "";
        this.state.newMail.email = "";
    }


    submitFormAndSend(event) {
        this.setState({modalLoadingMessage: true});
        event.preventDefault();
        superagent
            .post('http://localhost:8080/email/contact-message')
            .send(this.state.newMail)
            .end((err, res) => {
                if(err) {
                        alert("Gratulacje! Pomyślnie wypełniłeś formularz. Obsługa wysyłania wiadomości pojawi się wkrótce... :)");
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

    showPassword() {
        var x = document.getElementById("login-password-my");
        if (x.type === "password")
            x.type = "text";
        else
            x.type = "password";
    }

    componentDidMount() {
        const loader = document.querySelector(".page-loading");
        document.querySelector(".login-button-my").disabled = true;

        window.onload = function() {
            this.setTimeout(function() {
                loader.classList.add("hidden");
                this.setTimeout(function() {
                    document.querySelector(".login-form-my").style = "display: block";
                    document.querySelector("#login-back-button").style = "display: block";
                    document.querySelector(".login-header-container").style = "display: block";
                }, 200);
            }, 600);
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

    render() {
        return (
            <div className="background-image-container">
                <PageLoading />
                <div className="background-opcaity-container">
                    <div className="login-header-container w3-animate-left-login-header"><span className="gradient-text">Kontakt</span></div>
                    <i className="fas fa-arrow-left home-link-register w3-animate-left-login-back-button" id="login-back-button" onClick={this.homeRedirect.bind(this)}></i>
                    <img
                        className="login-logo-my"
                        src={ImageLogo}
                    />
                    <div className="login-form-my w3-animate-right-login-container">
                        <Form>
                            <h3 className="gradient-text">Masz wątpliwości? Zapytaj!</h3>
                            <p>Wypełnij poniższy formularz, aby się z nami skontaktować.</p>
                            <hr />
                            <Form.Group controlId="formGridFirstName">
                                <Form.Label>Imię</Form.Label><span id="form-value-alert-name" className="form-value-alert"><sub>Podano nieprawidłową wartość.</sub></span>
                                <Form.Control placeholder="Wprowadź imię..." onChange={this.handleFirstNameChanged.bind(this)}/>
                            </Form.Group>
                            <Form.Group controlId="formGridEmail">
                                <Form.Label>Email</Form.Label><span id="form-value-alert-email" className="form-value-alert"><sub>Podano nieprawidłową wartość.</sub></span>
                                <Form.Control placeholder="Wprowadź email..." onChange={this.handleEmailChanged.bind(this)}/>
                                <Form.Text className="text-muted">Na ten email otrzymasz wiadomość od ePortfolio.</Form.Text>
                            </Form.Group>
                            <Form.Group controlId="exampleForm.ControlTextarea1">
                                <Form.Label>Wiadomość</Form.Label>
                                <Form.Control as="textarea" rows="3" placeholder="Wprowadź tekst..."/>
                            </Form.Group>
                            <Button onClick={this.submitFormAndSend.bind(this)} variant="primary" type="button" className="login-button-my" style={{float: 'right'}}>
                                Wyślij
                            </Button>
                        </Form>
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
                            Na adres mailowy została wysłana kopia wiadomości. Postaramy odpowiedzieć się na nią wkrótce.
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
                            Mail <b>nie został</b> wysłany. Spróbuj ponownie później.
                        </p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="link" className="modal-close-btn" onClick={this.closeModal.bind(this)}>Zamknij</Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={this.state.modalLoadingMessage} id="container-spinner-modal-register-request" style={{backgroundColor: "rgba(0,0,0,0.4)"}} centered>
                    <Spinner animation="grow" variant="light" id="spinner-modal-register-request"/>
                </Modal>
                </div>
            </div>
        )
    }
}

export default ContactContent;
