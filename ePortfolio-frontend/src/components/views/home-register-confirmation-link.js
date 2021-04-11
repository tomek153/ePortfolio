import React, { Component } from 'react';
import superagent from 'superagent';

import HomeContent from './home';
import ModalHeaderError from '../modals/error-header';
import ModalLoading from '../modals/loading';
import ModalSuccess from '../modals/success';
import ModalErrorResendLink from '../modals/error-resend-link';

class ConfirmationLinkSuccess extends Component {
    constructor() {
        super();
        this.state = {
            reqBody: {
                linkId: "",
                userId: ""
            },
            modalSucces: false,
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

    reSendConfirmationLink = () => {

        document.getElementsByClassName("resend-link-button")[0].style.display = "none";
        this.setState({reSendLinkSpinner: "block"});

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
                        this.setState({reSendLinkSpinner: "none"});
                        this.setState({reSendLinkSuccess: "block"});
                        this.setState({reSendLinkFailed: "none"});
                        this.setState({reSendFooter: "none"});
                    } else {
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
    closeModal = () => {
        this.setState({modalSucces: false});
        this.setState({modalFailedShow: false});
        this.setState({modalAlreadyConfirmed: false});
        this.setState({modalError: false});
        this.setState({modalLoading: false});
    }
    closeModalAndRedirect = () => {
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
                        console.log(data);
                        if (data.status == true &&
                                   (data.message == "expired" || data.message == "deactivated")) {
                            this.setState({modalLoading: false});
                            this.setState({modalFailedShow: true});
                        } else if (data.status == true &&
                                   data.message == "user_confirmed") {
                            this.setState({modalLoading: false});
                            this.setState({modalAlreadyConfirmed: true});
                            document.querySelector("div.modal-header").style.backgroundColor = "rgba(0, 0, 0, 0.5)";
                        } else if (data.status == true &&
                                   data.message == "not_found") {
                            this.setState({modalLoading: false});
                            window.location.href = "/nie-znaleziono";
                        } else if (data.status == true &&
                                   data.message == "success") {
                            this.setState({modalLoading: false});
                            this.setState({modalSucces: true});
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

                <ModalHeaderError show={this.state.modalError} onClose={this.closeModalAndRedirect}/>

                <ModalSuccess show={this.state.modalSucces} onClose={this.closeModalAndRedirect} title="Konto zostało potwierdzone!">
                    Konto zostało <b>potwierdzone</b>! Możesz teraz przejść do <b>panelu logowania</b> aby zalogować się do swojego <b>konta</b>.
                    <br /><sub><b>Pozdrawiamy zespół ePortfolio!</b></sub>
                </ModalSuccess>

                <ModalSuccess show={this.state.modalAlreadyConfirmed} onClose={this.closeModalAndRedirect} title="Konto zostało już potwierdzone.">
                    Konto zostało <b>już potwierdzone</b>. Przejdź do <b>panelu logowania</b> aby zalogować się do swojego <b>konta</b>.
                    <br /><sub><b>Pozdrawiamy zespół ePortfolio!</b></sub>
                </ModalSuccess>

                <ModalErrorResendLink
                    onClose={this.closeModalAndRedirect}
                    show={this.state.modalFailedShow}
                    title="Konto nie zostało potwierdzone!"
                    reSendSuccess={this.state.reSendLinkSuccess}
                    reSendFailed={this.state.reSendLinkFailed}
                    reSendButton={this.state.reSendFooter}
                    reSendSpinner={this.state.reSendLinkSpinner}
                    reSendLink={this.reSendConfirmationLink}
                >
                    Konto <b>nie zostało</b> potwierdzone, ponieważ link aktywacyjny <b>stracił ważność</b> bądź został wygenerowany <b>nowy link</b>.
                    <br />Sprawdź swoją skrzynkę lub wygeneruj <b>nowy</b> link, klikając przycisk poniżej.
                </ModalErrorResendLink>

                <ModalLoading show={this.state.modalLoading}/>
            </>
        )
    }
}

export default ConfirmationLinkSuccess;
