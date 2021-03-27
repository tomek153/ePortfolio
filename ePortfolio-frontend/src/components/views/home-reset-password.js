import React, { Component } from 'react';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';

import ModalHeaderError from '../modals/error-header';
import ModalLoading from '../modals/loading';
import ModalError from '../modals/error';
import ModalSuccess from '../modals/success';

class ResetPassword extends Component {

    constructor() {
        super();
        this.state = {
            form: {
                password: "",
                passwordRepeat: ""
            },
            reqBody: {
                linkId: "",
                userId: "",
                password: ""
            },
            formControll: {
                password: false,
                passwordRepeat: false,
                isAllValid: true
            },
            modalError: false,
            modalSuccess: false,
            modalUserNotExists: false,
            modalLinkDeactivated: false,
            scrollbarWidth: 0
        }
    }
    loadUserInfo() {
        this.state.reqBody.userId = this.props.match.params.idKey;
        this.state.reqBody.linkId = this.props.match.params.registerKey;
    }
    checkFormDataValid() {
        var element = document.getElementsByClassName("auth-button-my")[0];

        if (this.state.formControll.password &&
            this.state.formControll.passwordRepeat &&
            this.state.formControll.isAllValid) {
            element.disabled = false;
            this.state.reqBody.password = this.state.form.password;
        } else {
            element.disabled = true;
            this.state.reqBody.password = "";
        }
    }
    handlePasswordChanged(event) {
        let value = event.target.value;
        this.state.form.password = value;
        let length = value.length;
        let element = document.getElementById("form-value-alert-password");
        let element2 = document.getElementById("form-value-alert-password-span");

        element.style.display = "block";
        if (!value.match(/[^a-zA-Z0-9!@#$%^&*(){}[\]|:";'<>?,.\/\\]/)) {
            if (value.match(/[a-z]/) &&
                value.match(/[A-Z]/) &&
                value.match(/[0-9]/) &&
                value.match(/[!@#$%^&*(){}[\]|:";'<>?,.\/\\]/)
            ) {
                if (length >= 8 && length <= 40) {
                    element2.innerHTML = "<i class=\"fas fa-check\" style=\"font-size: 15px\"></i>";
                    this.state.formControll.password = true;
                } else {
                    element2.innerHTML = "<sub>Podano nieprawidłową wartość.</sub>";
                    this.state.formControll.password = false;
                }
            } else {
                element2.innerHTML = "<sub>Podano nieprawidłową wartość.</sub>";
                this.state.formControll.password = false;
            }
        }

        this.checkFormDataValid();
    }
    handlePasswordRepeatChanged(event) {
        let value = event.target.value;
        this.state.form.passwordRepeat = value;
        let element = document.getElementById("form-value-alert-password-repeat");
        let element2 = document.getElementById("form-value-alert-password-repeat-span");

        element.style.display = "block";
        if (this.state.form.password == value) {
            element2.innerHTML = "<i class=\"fas fa-check\" style=\"font-size: 15px\"></i>";
            this.state.formControll.passwordRepeat = true;
        } else {
            element2.innerHTML = "<sub>Podano nieprawidłową wartość.</sub>";
            this.state.formControll.passwordRepeat = false;
        }

        this.checkFormDataValid();
    }
    submitFormAndSend(event) {
        this.setState({modalLoading: true});

        if (this.state.formControll.password &&
            this.state.formControll.passwordRepeat &&
            this.state.formControll.isAllValid
            ){
              var myHeaders = new Headers();
              myHeaders.append('Content-Type', 'application/json');

              const request = new Request(
                  'http://localhost:8080/api/change-password',
                  {
                      method: 'POST',
                      headers: myHeaders,
                      body: JSON.stringify(this.state.reqBody)
                  }
              );

              fetch(request)
                  .then(response => {
                      if (response.status == 200) {
                          this.clearState();
                          this.setState({modalLoading: false});
                          this.setState({modalSuccess: true});
                      } else if (response.status == 405) {
                          this.setState({modalLoading: false});
                          this.setState({modalUserNotExists: true});
                      } else {
                          this.setState({modalLoading: false});
                          this.setState({modalError: true});
                      }
                  });
        } else {
            this.setState({modalLoading: false});
            this.setState({modalError: true});
            this.checkFormDataValid();
        }

    }
    checkResetLinkValid() {
        this.setState({modalLoading: true});

        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');

        const request = new Request(
            'http://localhost:8080/email/check-reset-password-link',
            {
                method: 'POST',
                headers: myHeaders,
                body: JSON.stringify(this.state.reqBody)
            }
        );

        fetch(request)
            .then(response => {
                if (response.status == 200) {
                    response.json().then(data => {
                        console.log(data);
                        if (data.status == true &&
                            (data.message == "deactivated" || data.message == "expired")) {
                            this.state.formControll.isAllValid = false;
                            this.setState({modalLoading: false});
                            this.setState({modalLinkDeactivated: true});
                        } else if (data.status == true &&
                                  data.message == "success") {
                            this.setState({modalLoading: false});
                        } else if (data.status == false &&
                                  data.message == "not_found") {
                            this.state.formControll.isAllValid = false;
                            this.setState({modalLoading: false});
                            window.location.href = "/nie-znaleziono";
                        }
                    });
                } else {
                    this.state.formControll.isAllValid = false;
                    this.setState({modalLoading: false});
                    this.setState({modalError: true});
                }
            });
    }
    closeModal = () => {
        this.setState({modalError: false});
        this.setState({modalUserNotExists: false});
        this.setState({modalSuccess: false});
        this.setState({modalLinkDeactivated: false});
    }
    closeModalAndRedirect = () => {
        this.closeModal();
        window.location.href = "/";
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
    changePasswordInputStyleIn(numb) {
        var element;
        var element2;
        var element3;

        if (numb == 1) {
            element= document.querySelector("form > div:nth-child(5) > div");
            element2 = document.getElementById("inputGroupPrepend");
            element3 = document.getElementById("formGridPassword");
            element2.style.borderColor = "#ced4da";
        } else if (numb == 2) {
            element= document.querySelector("form > div:nth-child(6) > div");
            element3 = document.getElementById("formGridPasswordRepeat");
        }

        element.style.boxShadow = "0 5px 5px -5px black";
        element3.style.borderColor = "#ced4da";
    }
    changePasswordInputStyleOut(numb) {
        var element;
        var element2;
        var element3;

        if (numb == 1) {
            element= document.querySelector("form > div:nth-child(5) > div");
            element2 = document.getElementById("inputGroupPrepend");
            element3 = document.getElementById("formGridPassword");
            element2.style.borderColor = "#ced4da";
        } else if (numb == 2) {
            element= document.querySelector("form > div:nth-child(6) > div");
            element3 = document.getElementById("formGridPasswordRepeat");
        }

        element.style.boxShadow = "0 3px 3px -3px black";
        element3.style.borderColor = "#ced4da";
    }
    componentDidMount() {
        this.adjustContent();
        this.checkResetLinkValid();
    }
    adjustContent() {
        this.loadUserInfo();
        document.getElementsByClassName("auth-button-my")[0].disabled = true;
        document.getElementById("root").style.height = "100%";
    }
    clearState() {
        this.state.form.password = "";
        this.state.form.passwordRepeat = "";
        this.state.reqBody.password = "";

        this.state.formControll.password = false;
        this.state.formControll.passwordRepeat = false;

        document.getElementById("formGridPassword").value = "";
        document.getElementById("formGridPasswordRepeat").value = "";
        document.getElementsByClassName("auth-button-my")[0].disabled = true;
        document.getElementById("form-value-alert-password-span").innerHTML = "";
        document.getElementById("form-value-alert-password-repeat-span").innerHTML = "";
    }

    render() {
        return (
            <>
                <div className="home-container" style={{height: "100%"}}>
                    <div className="photo-section photo-login-register">
                        <div className="opacity-background">
                            <div className="auth-content-container" style={{width: "700px"}}>
                                <Form>
                                    <h2 className="gradient-text">Odzyskiwanie hasła</h2>
                                    <h5>Tutaj możesz ustawić nowe hasło dla swojego konta.</h5>
                                    Pamiętaj że hasło powinno zawierać:
                                    <ul className="pass-req-list">
                                        <li>Od <b>8</b> do <b>40</b> znaków</li>
                                        <li>Co najmniej <b>jedną małą literę</b></li>
                                        <li>Co najmniej <b>jedną dużą literę</b></li>
                                        <li>Co najmniej <b>jedną cyfrę</b></li>
                                        <li>Co najmniej <b>jeden znak specjalny</b>, np. "#", "$", "%"</li>
                                    </ul>
                                    <hr style={{ marginBottom: "2rem"}}/>
                                    <Form.Group controlId="formGridPassword">
                                        <Form.Label>Hasło:</Form.Label>
                                        <span id="form-value-alert-password" className="form-value-alert" style={{display: "none"}}>
                                            <span id="form-value-alert-password-span"></span>
                                        </span>
                                        <InputGroup>
                                            <Form.Control type="password" placeholder="Nowe hasło..." onChange={this.handlePasswordChanged.bind(this)} onFocus={() => this.changePasswordInputStyleIn(1)} onBlur={() => this.changePasswordInputStyleOut(1)}/>
                                            <InputGroup.Prepend>
                                                <InputGroup.Text id="inputGroupPrepend" onClick={this.showPassword}><i className="fas fa-eye w3-animate-opacity"></i><i className="fas fa-eye-slash w3-animate-opacity" style={{display: "none", width: "18px"}}></i></InputGroup.Text>
                                            </InputGroup.Prepend>
                                        </InputGroup>
                                    </Form.Group>

                                    <Form.Group controlId="formGridPasswordRepeat">
                                        <Form.Label>Powtórz hasło:</Form.Label>
                                        <span id="form-value-alert-password-repeat" className="form-value-alert" style={{display: "none"}}>
                                            <span id="form-value-alert-password-repeat-span"></span>
                                        </span>
                                        <InputGroup>
                                            <Form.Control type="password" placeholder="Powtórz nowe hasło..." onChange={this.handlePasswordRepeatChanged.bind(this)} onFocus={() => this.changePasswordInputStyleIn(2)} onBlur={() => this.changePasswordInputStyleOut(2)}/>
                                        </InputGroup>
                                    </Form.Group>

                                    <Button onClick={this.submitFormAndSend.bind(this)} type="button" variant="primary" className="auth-button-my" style={{float: 'right'}}>
                                        Zmień hasło
                                    </Button>
                                </Form>
                              </div>
                        </div>
                        <div id="footer" style={{height: "70px", background: "none", position: "fixed", bottom: 0, width: "100%"}}>
                            <div className="width-divider">
                                <p>ePortfolio &copy; 2020</p><p>Wszelkie prawa zastrzeżone</p>
                            </div>
                        </div>
                    </div>

                    <ModalHeaderError show={this.state.modalError} onClose={this.closeModal}/>

                    <ModalError show={this.state.modalUserNotExists} onClose={this.closeModal} title="Użytkownik nie istnieje!">
                        <b>Nie znaleźliśmy</b> użytkownika z podanym adresem email. <b>Sprawdź</b> swój adres email i <b>spróbuj ponownie</b>.
                    </ModalError>

                    <ModalError show={this.state.modalLinkDeactivated} onClose={this.closeModalAndRedirect} title="Link nieaktywny!">
                        Podany link został <b>dezaktywowany</b> na wskutek zmiany hasła, utworzenia nowego linku bądź <b>wygasł</b> jego czas oczekiwania.
                        <br />Jeśli nie udało Ci się zmienić hasło prosimy <b>wygenerować nowy</b> link w panelu logowania.
                        <br /><sub><b>Pozdrawiamy zespół ePortfolio!</b></sub>
                    </ModalError>

                    <ModalSuccess show={this.state.modalSuccess} onClose={this.closeModalAndRedirect} title="Zmiana hasła zakończone!">
                        <b>Nowe hasło</b> do konta zostało <b>zmienione</b> poprawnie. Możesz teraz przejść do panelu logowania.
                        <br /><sub><b>Pozdrawiamy zespół ePortfolio!</b></sub>
                    </ModalSuccess>

                    <ModalLoading show={this.state.modalLoading}/>
                </div>
            </>
        )
    }
}

export default ResetPassword;
