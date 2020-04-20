import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import InputGroup from 'react-bootstrap/InputGroup';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';

import superagent from 'superagent';

import ImageLogo from '../../images/logo.png';
import BackgroundLogo from '../../images/home-background-revert.png';

class ContactContent extends Component {

constructor() {
        super();
        this.state = {
            newMail: {
                firstName: "",
                email: ""
            },
            formControll: {
                firstName: false,
                email: false
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

changeBackground() {
        document.getElementsByClassName("login-button-my")[0].disabled = true;
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
            .post('http://localhost:8080/api/users')
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

    render() {

        return (
            <div className="home-right-container-my" onLoad={this.changeBackground}>
                            <a href="/"><img className="login-logo-my" src={ImageLogo}/></a>
                <div className="login-form-my">
                    <Form>
                        <h3>Masz wątpliwości? Zapytaj!</h3>
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


                                    <Form.Group controlId="formBasicText">
                                        <Form.Label>Wiadomość</Form.Label><br/>
                                        <textarea rows="5" placeholder="Wprowadź tekst..." id="message-text-my" style={{width:600}}></textarea>
                                    </Form.Group>
                                    <Button onClick={this.submitFormAndSend.bind(this)} variant="primary" type="button" className="login-button-my" style={{float: 'right'}}>
                                        Wyślij
                                    </Button>
                    </Form>
                </div>

<Modal show={this.state.modalSuccesShow} size="lg" aria-labelledby="contained-modal-title-vcenter"  style={{backgroundColor: "rgba(0,0,0,0.4)"}} centered>
                    <Modal.Header style={{color: "#31b4cb", backgroundColor: "rgba(49, 180, 203, 0.15)"}}>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Sukces!
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{textAlign: "center"}}>
                        <i className="fas fa-check fa-5x" id="successIconModal"></i>
                        <p style={{color: "#444"}}>
                            Wiadomość została wysłana. Odpowiedź zostanie wysłana na podany <b>adres email</b>.
                        </p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="link" onClick={this.closeModal.bind(this)} className="modal-close-btn">Zamknij</Button>
                    </Modal.Footer>
                </Modal>
                <Modal show={this.state.modalFailedShow} size="lg" aria-labelledby="contained-modal-title-vcenter" style={{backgroundColor: "rgba(0,0,0,0.4)"}} centered>
                    <Modal.Header style={{color: "#de473c", backgroundColor: "rgba(222, 71, 60, 0.15)"}}>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Błąd!
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{textAlign: "center"}}>
                        <i className="fas fa-exclamation fa-5x" id="successIconModal" style={{color: "#de473c"}}></i>
                        <p style={{color: "#444"}}>
                            Wiadomość <b>nie została</b> wysłana. <br/>Spróbuj ponownie <b>później</b>.
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

export default ContactContent;