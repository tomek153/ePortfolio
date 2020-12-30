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
            reqBody: {
                linkId: "",
                userId: ""
            },
            modalSuccesShow: false,
            modalFailedShow: false,
            modalAlreadyConfirmed: false,
            modalError: false,
            modalLoading: false,
            reSendLinkSuccess: "none",
            reSendLinkFailed: "none",
            reSendLinkSpinner: "none",
            reSendFooter: "block"
        }
    }

    getLinkStatus(event) {
        event.preventDefault();
        superagent
            .post('http://localhost:8080/email/resend')
            .send(this.state.reqBody)
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
            .send(this.state.reqBody)
            .end((err, res) => {
                if(err) {
                    alert("Coś poszło nie tak!");
                    this.setState({reSendLinkSpinner: "none"});
                    document.getElementsByClassName("resend-link-button")[0].style.display = "block";
                    return;
                } else {
                    if(res.body.status){
                        document.querySelector("div.fade.modal.show > div > div > div.modal-body > p").style.color = "rgba(0,0,0,0.3)";
                        this.setState({reSendLinkSpinner: "none"});
                        this.setState({reSendLinkSuccess: "block"});
                        this.setState({reSendLinkFailed: "none"});
                        this.setState({reSendFooter: "none"});
                    } else {
                        document.querySelector("div.fade.modal.show > div > div > div.modal-body > p").style.color = "rgba(0,0,0,0.3)";
                        this.setState({reSendLinkSpinner: "none"});
                        this.setState({reSendLinkFailed: "block"});
                        this.setState({reSendLinkSuccess: "none"});
                        this.setState({reSendFooter: "none"});
                    }
                }
            }
        );
    }
    loadUserInfo() {
        this.state.reqBody.linkId = this.props.match.params.registerKey;
        this.state.reqBody.userId = this.props.match.params.idKey;
    }
    closeModal() {
        this.setState({modalSuccesShow: false});
        this.setState({modalFailedShow: false});
        this.setState({modalAlreadyConfirmed: false});
        this.setState({modalError: false});
        this.setState({modalLoading: false});
    }
    closeModalAndRedirect() {
        this.closeModal();
        window.location.href = "/";
    }
    clearFailedMessage() {
        document.getElementById("failedMessageExpired").style.display = "none";
        document.getElementById("failedMessageDeactivated").style.display = "none";
    }
    checkConfirmationLink() {
        this.setState({modalLoading: true});

        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');

        const request = new Request(
            'http://localhost:8080/email/check-confirmation-link',
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
                        if (data.status == true &&
                                   (data.message == "expired" || data.message == "deactivated")) {
                            this.setState({modalLoading: false});
                            this.setState({modalFailedShow: true});
                        } else if (data.status == true &&
                                   data.message == "user_confirmed") {
                            this.setState({modalLoading: false});
                            this.setState({modalAlreadyConfirmed: true});
                        } else if (data.status == true &&
                                   data.message == "not_found") {
                            this.setState({modalLoading: false});
                            window.location.href = "/nie-znaleziono";
                        } else {
                            this.setState({modalLoading: false});
                            this.setState({modalError: true});
                        }
                    });
                } else {
                    this.setState({modalLoading: false});
                    this.setState({modalError: true});
                }
            });
    }
    componentDidMount() {
        this.loadUserInfo();
        this.checkConfirmationLink();
    }

    render() {
        return (
            <>
                <HomeContent/>

                <Modal size="sm" show={this.state.modalError} aria-labelledby="example-modal-sizes-title-sm" onHide={() => this.closeModalAndRedirect()}>
                    <Modal.Header closeButton className="modal-header-error">
                        <Modal.Title id="example-modal-sizes-title-sm" style={{textAlign: "center"}}>
                            <i className="fas fa-times-circle success-modal-icon"></i>Coś poszło nie tak!
                        </Modal.Title>
                    </Modal.Header>
                </Modal>

                <Modal size="sm" show={this.state.modalSuccesShow} aria-labelledby="example-modal-sizes-title-sm" onHide={() => this.closeModalAndRedirect()}>
                    <Modal.Header closeButton>
                        <Modal.Title id="example-modal-sizes-title-sm" style={{textAlign: "center"}}>
                            <i className="fas fa-check-circle success-modal-icon"></i>Konto zostało potwierdzone!
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Konto zostało <b>potwierdzone</b>! Możesz teraz przejść do <b>panelu logowania</b> aby zalogować się do swojego <b>konta</b>.
                        <br /><sub><b>Pozdrawiamy zespół ePortfolio!</b></sub>
                    </Modal.Body>
                </Modal>

                <Modal size="sm" show={this.state.modalAlreadyConfirmed} aria-labelledby="example-modal-sizes-title-sm" onHide={() => this.closeModalAndRedirect()}>
                    <Modal.Header closeButton style={{backgroundColor: "rgba(0, 0, 0, 0.5)"}}>
                        <Modal.Title id="example-modal-sizes-title-sm" style={{textAlign: "center"}}>
                            <i className="fas fa-check-circle success-modal-icon"></i>Konto zostało już potwierdzone.
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        Konto zostało <b>już potwierdzone</b>. Przejdź do <b>panelu logowania</b> aby zalogować się do swojego <b>konta</b>.
                        <br /><sub><b>Pozdrawiamy zespół ePortfolio!</b></sub>
                    </Modal.Body>
                </Modal>

                <Modal show={this.state.modalFailedShow} size="sm" aria-labelledby="contained-modal-title-sm" onHide={() => this.closeModalAndRedirect()}>
                    <Modal.Header closeButton className="modal-header-error">
                        <Modal.Title id="example-modal-sizes-title-sm" style={{textAlign: "center"}}>
                            <i className="fas fa-times-circle success-modal-icon"></i>Konto nie zostało potwierdzone!
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body style={{textAlign: "center", color: "#888888"}}>
                        <p style={{color: "#444"}}>
                            Konto <b>nie zostało</b> potwierdzone, ponieważ link aktywacyjny <b>stracił ważność</b> bądź został wygenerowany <b>nowy link</b>.
                            <br />Sprawdź swoją skrzynkę lub wygeneruj <b>nowy</b> link, klikając przycisk poniżej.
                        </p>
                    </Modal.Body>
                    <Modal.Body style={{display: this.state.reSendLinkSuccess, textAlign: "center", borderTop: "1px solid #dee2e6"}}>
                        <i className="fas fa-check-circle success-modal-icon" style={{fontSize: "25px", color: "green"}}></i>
                        <p style={{color: "#444"}}>
                            <b>Nowy</b> link aktywacyjny został <b>wysłany</b> na Twój adres email. Będzie <b>ważny</b> przez kolejne <b>30 min</b>.
                            <br /><sub><b>Pozdrawiamy zespół ePortfolio!</b></sub>
                        </p>
                    </Modal.Body>
                    <Modal.Body style={{display: this.state.reSendLinkFailed, textAlign: "center", borderTop: "1px solid #dee2e6"}}>
                        <i className="fas fa-times-circle success-modal-icon" style={{fontSize: "25px", color: "red"}}></i>
                        <p style={{color: "#444"}}>
                            Z nieznanych powodów <b>nie udało</b> się wysłać nowego linku. Prosimy spróbować ponownie <b>później</b>.
                            <br /><sub><b>Pozdrawiamy zespół ePortfolio!</b></sub>
                        </p>
                    </Modal.Body>
                    <Modal.Footer style={{display: this.state.reSendFooter}}>
                        <Button className="resend-link-button" onClick={this.reSendConfirmationLink.bind(this)}>Wyslij link</Button>
                        <Spinner style={{display: this.state.reSendLinkSpinner}} id="resend-link-spinner" animation="border" variant="primary" />
                    </Modal.Footer>
                </Modal>

                <Modal show={this.state.modalLoading} id="spinner-container" aria-labelledby="contained-modal-title-vcenter" centered>
                    <Modal.Body>
                        <Spinner animation="grow e-spinner"/>
                    </Modal.Body>
                </Modal>
            </>
        )
    }
}

export default ConfirmationLinkSuccess;
