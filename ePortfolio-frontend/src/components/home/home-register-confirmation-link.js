import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';

import superagent from 'superagent';

import HomeContent from './home-content';

class ConfirmationLinkSuccess extends Component {
    constructor() {
        super();
        this.state = {
            userInfo: {
                idKey: "",
                registerKey: ""
            },
            modalSuccesShow: false,
            modalFailedShow: false,
            modalAlreadyConfirmed: false,
            modalError404: false,
            modalLoadingMessage: false,
            reSendLinkSuccess: "none",
            reSendLinkFailed: "none",
            reSendLinkSpinner: "none"
        }
    }

    getLinkStatus(event) {
        event.preventDefault();
        superagent
            .post('http://localhost:8080/email/resend')
            .send(this.state.userInfo)
            .end((err, res) => {
                if(err) {
                    if(res.body.message == "User exist."){
                        this.setState({modalFailedShow: true});
                    } else
                        alert("Registration failed");
                    return;
                } else {
                    this.setState({modalSuccesShow: true});
                }
            }
        );
    }

    reSendConfirmationLink(event) {

        document.getElementsByClassName("resend-link-button")[0].style.display = "none";
        this.setState({reSendLinkSpinner: "block"});

        event.preventDefault();
        superagent
            .post('http://localhost:8080/email/resend')
            .send({ idKey: this.props.match.params.idKey, registerKey: this.props.match.params.registerKey })
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
    
    checkConfirmationLink() {
        superagent
        .post('http://localhost:8080/email/check-confirmation-link')
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
                                    this.setState({modalSuccesShow: true});
                                }
                            }
                        }
                    }
                }
            }
        });
    }

    componentDidMount() {
        this.checkConfirmationLink();
    }

    render() {
        return (
            <>
                <HomeContent/>
                
                <Modal show={this.state.modalSuccesShow} size="lg" aria-labelledby="contained-modal-title-vcenter"  style={{backgroundColor: "rgba(0,0,0,0.4)"}} centered>
                    <Modal.Header style={{color: "#31b4cb", backgroundColor: "rgba(49, 180, 203, 0.15)"}}>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Konto zostało potwierdzone!
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{textAlign: "center"}}>
                        <i className="fas fa-check fa-5x" id="successIconModal"></i>
                        <p style={{color: "#444", fontSize: "19px"}}>
                            <b>Gratulacje!</b>
                        </p>
                        <p style={{color: "#444"}}>
                            Konto zostało <b>potwierdzone</b>! Możesz Teraz przejść do <b>panelu logowania</b> aby zalogować się do swojego <b>konta</b>.
                        </p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="link" className="modal-close-btn" onClick={this.closeModal.bind(this)} href="/">Zamknij</Button>
                        <Button className="modal-redirect-btn" href="/logowanie">Przejdź do logowania</Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={this.state.modalAlreadyConfirmed} size="lg" aria-labelledby="contained-modal-title-vcenter"  style={{backgroundColor: "rgba(0,0,0,0.4)"}} centered>
                    <Modal.Header style={{color: "rgba(0, 0, 0, 0.5)", backgroundColor: "rgba(0, 0, 0, 0.15)"}}>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Konto zostało już potwierdzone.
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{textAlign: "center"}}>
                        <i className="fas fa-check fa-5x" id="successIconModal" style={{color: "rgba(0, 0, 0, 0.5)"}}></i>
                        <p style={{color: "rgba(0, 0, 0, 0.5)ss"}}>
                            Konto zostało <b>już potwierdzone</b>. Przejdź do <b>panelu logowania</b> aby zalogować się do swojego <b>konta</b>.
                        </p>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="link" className="modal-close-btn" onClick={this.closeModal.bind(this)} href="/">Zamknij</Button>
                        <Button className="modal-redirect-btn" href="/logowanie">Przejdź do logowania</Button>
                    </Modal.Footer>
                </Modal>

                <Modal show={this.state.modalFailedShow} size="lg" aria-labelledby="contained-modal-title-vcenter" style={{backgroundColor: "rgba(0,0,0,0.4)"}} centered>
                    <Modal.Header style={{color: "#de473c", backgroundColor: "rgba(222, 71, 60, 0.15)"}}>
                        <Modal.Title id="contained-modal-title-vcenter">
                            Konto nie zostało potwierdzone!
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{textAlign: "center", color: "#888888"}}>
                        <i className="fas fa-exclamation fa-5x" id="successIconModal" style={{color: "#de473c"}}></i>
                        <p style={{color: "#444"}} id="failedMessageExpired" >
                            Konto <b>nie zostało</b> potwierdzone, ponieważ link aktywacyjny <b>stracił ważność</b>. Aby wygenerować <b>nowy</b> link, <b>kliknij</b> przycisk poniżej.
                        </p>
                        <p style={{color: "#444"}} id="failedMessageDeactivated" >
                            <b>Link</b> aktywacyjny został <b>dezaktywowany</b>. Prawdopodobnie przez to że <b>został już wygenerowany</b> nowy email. <b>Sprawdź swoją</b> skrzynkę i <b>kliknij</b> w najnowższy link.
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
                        <Button variant="link" className="modal-close-btn" onClick={this.closeModal.bind(this)} href="/">Zamknij</Button>
                        <Button className="resend-link-button" onClick={this.reSendConfirmationLink.bind(this)}>Wyslij link</Button>
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
            </>
        )
    }
}

export default ConfirmationLinkSuccess;