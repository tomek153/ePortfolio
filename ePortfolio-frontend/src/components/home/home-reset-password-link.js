import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';

import superagent from 'superagent';

import HomeContent from './home-content';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import InputGroup from 'react-bootstrap/InputGroup';

import ImageLogo from '../../images/logo.png';
import BackgroundLogo from '../../images/home-background-revert.png';
import PageLoading from '../page-loading';
import '../../css/login.css';

class ResetPasswordLinkSuccess extends Component {
    constructor() {
        super();
        this.state = {
            userInfo: {
                idKey: "",
                registerKey: ""
            },
            newUser: {
                firstName: "",
                lastName: "",
                email: "",
                password: "",
                role: "user"
            },
            User: {
                id: "",
                firstName: "Zmiana",
                lastName: "Hasła",
                email: "test@test.pl",
                password: "xxx",
                role: "none",
                confirmed: true
            },
            modalSuccesShow: false,
            modalFailedShow: false,
            modalAlreadyConfirmed: false,
            modalError404: false,
            modalLoadingMessage: false,
            reSendLinkSuccess: "none",
            reSendLinkFailed: "none",
            reSendLinkSpinner: "none",
            userId: "",
            redirectExpired: false,
            redirectBad_token: false,
            formControll: {
                firstName: false,
                lastName: false,
                email: false,
                password: false,
                regulations: false
            },
            
        }
        
    }

    load() {
        this.state.userInfo.idKey = this.props.match.params.idKey;
        this.state.userInfo.registerKey = this.props.match.params.registerKey;
        console.log("->"+this.state.userInfo.idKey);
        console.log("->"+this.state.userInfo.registerKey);
    }

    closeModal() {
        this.setState({modalSuccesShow: false});
        this.setState({modalFailedShow: false});
        this.setState({modalAlreadyConfirmed: false});
        this.setState({modalError404: false});
    }

    clearFailedMessage() {
        document.getElementById("failedMessageExpired").style.display = "none";
        document.getElementById("failedMessageDeactivated").style.display = "none";
    }
    
    checkResetPasswordLink() {
        superagent
        .post('http://localhost:8080/email/check-reset-password-link')
        .send({ idKey: this.props.match.params.idKey, registerKey: this.props.match.params.registerKey })
        .end((err, res) => {
            if (err) {
                this.closeModal();
                this.setState({modalError404: true});
            } else {
                let status = res.body.status;
                let message = res.body.message;

                console.log(status);
                console.log(message);
                if (status == false) {
                    this.closeModal();
                    this.setState({modalError404: true});
                } else {
                    if (message == "user_confirmed") {
                        this.closeModal();
                        this.setState({modalAlreadyConfirmed: true});
                    } else {
                        if (message == "expired") {
                            this.closeModal();
                            this.setState({modalFailedShow: true});
                            this.clearFailedMessage();
                            document.getElementById("failedMessageExpired").style.display = "block";
                        } else {
                            if (message == "deactivated") {
                                this.closeModal();
                                this.setState({modalFailedShow: true});
                                this.clearFailedMessage();
                                document.getElementById("failedMessageDeactivated").style.display = "block";
                                document.getElementsByClassName("resend-link-button")[0].style.display = "none";
                            } else {
                                if (message == "success") {
                                    this.closeModal();
                                    //this.setState({modalSuccesShow: true});
                                }
                            }
                        }
                    }
                }
            }
        });
    }

    componentDidMount() {
        this.checkResetPasswordLink();
    }


    checkFormDataValid() {
        if (
            this.state.formControll.password 
        ) {
            var element = document.getElementsByClassName("login-button-my")[0];
            element.disabled = false;
        } else {
            document.getElementsByClassName("login-button-my")[0].disabled = true;
        }
    }

    handlePasswordChanged(event) {
        let password = event.target.value;
        this.state.User.password = password;
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

    submitFormAndSend(event) {
        this.setState({modalLoadingMessage: true});
        event.preventDefault();
        this.state.User.id = this.props.match.params.idKey
        superagent
             .post('http://localhost:8080/api/change-password')       
             .send(this.state.User)            
             .end((err, res) => {
                if(err) {
                    if(res.body.message == "User_does_not_exist."){
                        this.setState({modalLoadingMessage: false});
                        this.setState({modalFailedShow: true});
                    } else
                        alert("Password change falied");
                    return;
                } else {
                   // this.clearField();
                    this.setState({modalLoadingMessage: false});
                    this.setState({modalSuccesShow: true});
                }
            }
        );
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

    setBadTokenState = () => {
        this.setState({redirectBad_token: true})
    }

    setExpiredState = () => {
        this.setState({redirectExpired: true})
    }

    componentDidMount() {
        let token = localStorage.getItem("token");
        if (token != null && this.props.location.search != "?token=bad_token" && this.props.location.search != "?token=expired") {
            this.userRedirect();
        } else {
            this.checkFormDataValid();
            const loader = document.querySelector(".page-loading");

            window.onload = () => {
                window.setTimeout(function() {
                    loader.classList.add("hidden");
                    this.setTimeout(function() {
                        const regTab = document.querySelector(".home-right-container-my");
                        regTab.style = "display: block";
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
                        <p>Tutaj możesz zmienić hasło dla swojego konta.</p>
                        
                        <hr />
                        <Form.Group as={Col} controlId="formGridPassword">
                                <Form.Label>Hasło</Form.Label>
                                <span id="form-value-alert-password" className="form-value-alert">
                                    <sub>Podano niepoprawne hasło. </sub>
                                    <OverlayTrigger trigger="hover" placement="right" overlay={Popover}>
                                        <sub variant="success" id="register-password-tooltip"><i className="fas fa-question-circle"></i></sub>
                                    </OverlayTrigger>
                                </span>
                                <InputGroup>
                                    <Form.Control type="password" placeholder="Wprowadź hasło..." onChange={this.handlePasswordChanged.bind(this)}/>
                                    <InputGroup.Prepend>
                                        <InputGroup.Text id="inputGroupPrepend" onClick={this.showPassword}><i className="fas fa-eye w3-animate-opacity"></i><i className="fas fa-eye-slash w3-animate-opacity"></i></InputGroup.Text>
                                    </InputGroup.Prepend>
                                </InputGroup>
                            </Form.Group>
                       
                        <Button onClick={this.submitFormAndSend.bind(this)}  variant="primary" type="submit" className="login-button-my" style={{float: 'right'}}>
                            Zmień hasło
                        </Button>
                </Form>    

                </div>

            </div>
                <Modal show={this.state.modalSuccesShow} size="lg" aria-labelledby="contained-modal-title-vcenter"  style={{backgroundColor: "rgba(0,0,0,0.4)"}} centered>
                    <Modal.Header style={{color: "#31b4cb", backgroundColor: "rgba(49, 180, 203, 0.15)"}}>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Hasło zostało zresetowane!
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{textAlign: "center"}}>
                        <i className="fas fa-check fa-5x" id="successIconModal"></i>
                        <p style={{color: "#444", fontSize: "19px"}}>
                            <b>Gratulacje!</b>
                        </p>
                        <p style={{color: "#444"}}>
                            Hasło zostało <b>zresetowane</b>! Możesz Teraz przejść do <b>panelu logowania</b> aby zalogować się do swojego <b>konta</b>.
                        </p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className="modal-redirect-btn" href="/logowanie">Przejdź do logowania</Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={this.state.modalAlreadyConfirmed} size="lg" aria-labelledby="contained-modal-title-vcenter"  style={{backgroundColor: "rgba(0,0,0,0.4)"}} centered>
                    <Modal.Header style={{color: "rgba(0, 0, 0, 0.5)", backgroundColor: "rgba(0, 0, 0, 0.15)"}}>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Hasło zostało już zresetowane.
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{textAlign: "center"}}>
                        <i className="fas fa-check fa-5x" id="successIconModal" style={{color: "rgba(0, 0, 0, 0.5)"}}></i>
                        <p style={{color: "rgba(0, 0, 0, 0.5)ss"}}>
                        Hasło zostało <b>już zresetowane</b>. Przejdź do <b>panelu logowania</b> aby zalogować się do swojego <b>konta</b>.
                        </p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button className="modal-redirect-btn" href="/logowanie">Przejdź do logowania</Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={this.state.modalFailedShow} size="lg" aria-labelledby="contained-modal-title-vcenter" style={{backgroundColor: "rgba(0,0,0,0.4)"}} centered>
                    <Modal.Header style={{color: "#de473c", backgroundColor: "rgba(222, 71, 60, 0.15)"}}>
                        <Modal.Title id="contained-modal-title-vcenter">
                        Hasło nie zostało zresetowane!
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{textAlign: "center", color: "#888888"}}>
                        <i className="fas fa-exclamation fa-5x" id="successIconModal" style={{color: "#de473c"}}></i>
                        <p style={{color: "#444"}} id="failedMessageExpired" >
                        Hasło <b>nie zostało</b> zresetowane, ponieważ link resetowania hasła <b>stracił ważność</b>. Aby wygenerować <b>nowy</b> link, <b>kliknij</b> przycisk poniżej.
                        </p>
                        <p style={{color: "#444"}} id="failedMessageDeactivated" >
                            <b>Link</b> zresetowania hasła został <b>dezaktywowany</b>. Prawdopodobnie przez to że <b>został już użyty</b>  lub został wysłany nowy email. <b>Sprawdź swoją</b> skrzynkę i <b>kliknij</b> w najnowższy link.
                        </p>
                    </Modal.Body>               
                    <Modal.Footer>
                        <Button variant="link" className="modal-close-btn" onClick={this.closeModal.bind(this)} href="/">Zamknij</Button>
                        <Button className="resend-link-button" href="/zapomnialem_hasla">Wyslij nowy link</Button>
                        <Spinner style={{display: this.state.reSendLinkSpinner}} id="resend-link-spinner" animation="border" variant="primary" />
                    </Modal.Footer>
                </Modal>

                <Modal show={this.state.modalError404} size="lg" aria-labelledby="contained-modal-title-vcenter" style={{backgroundColor: "rgba(0,0,0,0.4)"}} centered>
                    <Modal.Header style={{color: "#de473c", backgroundColor: "rgba(222, 71, 60, 0.15)"}}>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Error 404.
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{textAlign: "center", color: "#888888"}}>
                        <i className="fas fa-exclamation-triangle fa-5x" id="successIconModal" style={{color: "#de473c"}}></i>
                        <p style={{color: "#444"}}>
                            Nie znaleźliśmy czego szukasz.
                            <br /><b>Pozdrawiamy zespół ePortfolio</b>
                        </p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="link" className="modal-close-btn" onClick={this.closeModal.bind(this)} href="/">Zamknij</Button>
                    </Modal.Footer>
                </Modal>
             </div>
         </>
        )
    }
}

export default ResetPasswordLinkSuccess;