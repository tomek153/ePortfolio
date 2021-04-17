import React from 'react';
import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';
import Spinner from 'react-bootstrap/Spinner';
import Button from 'react-bootstrap/Button';

class ModalErrorResendLink extends React.Component {

    close = () => {
        var onClose = this.props.onClose;
        document.querySelector("body > div.fade.modal-backdrop.show").classList.remove("show");
        document.querySelector("body > div.fade.modal.show").classList.remove("show");

        setTimeout(function() {
            onClose();
        }, 150);        
    }

    resendLink = () => {
        document.querySelector("body > div.fade.modal.show > div > div > div:nth-child(2)").style.color = "rgba(0,0,0,0.3)";
        this.props.reSendLink();
    }

    render() {

        if (!this.props.show)
            return null;

        return (
            <Modal size="sm" show={this.props.show} aria-labelledby="example-modal-sizes-title-sm" onHide={this.close}>
                <Modal.Header closeButton className="modal-header-error">
                    <Modal.Title id="example-modal-sizes-title-sm" style={{textAlign: "center"}}>
                        <i className="fas fa-times-circle success-modal-icon"></i>{this.props.title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.props.children}
                </Modal.Body>
                <Modal.Body style={{display: this.props.reSendSuccess, textAlign: "center", borderTop: "1px solid #dee2e6"}}>
                    <i className="fas fa-check-circle success-modal-icon" style={{fontSize: "25px", color: "green"}}></i>
                    <p style={{color: "#444"}}>
                        <b>Nowy</b> link aktywacyjny został <b>wysłany</b> na Twój adres email. Będzie <b>ważny</b> przez kolejne <b>30 min</b>.
                        <br /><sub><b>Pozdrawiamy zespół ePortfolio!</b></sub>
                    </p>
                </Modal.Body>
                <Modal.Body style={{display: this.props.reSendFailed, textAlign: "center", borderTop: "1px solid #dee2e6"}}>
                    <i className="fas fa-times-circle success-modal-icon" style={{fontSize: "25px", color: "red"}}></i>
                    <p style={{color: "#444"}}>
                        Z nieznanych powodów <b>nie udało</b> się wysłać nowego linku. Prosimy spróbować ponownie <b>później</b>.
                        <br /><sub><b>Pozdrawiamy zespół ePortfolio!</b></sub>
                    </p>
                </Modal.Body>
                <Modal.Footer style={{display: this.props.reSendButton}}>
                    <Button className="resend-link-button" onClick={this.resendLink}>Wyslij link</Button>
                    <Spinner style={{display: this.props.reSendSpinner}} id="resend-link-spinner" animation="border" variant="primary" />
                </Modal.Footer>
            </Modal>
        );
    }
}

ModalErrorResendLink.propTypes = {
    onClose: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    children: PropTypes.array.isRequired,
    reSendSuccess: PropTypes.string.isRequired,
    reSendFailed: PropTypes.string.isRequired,
    reSendButton: PropTypes.string.isRequired,
    reSendSpinner: PropTypes.string.isRequired,
    reSendLink: PropTypes.func.isRequired
};

export default ModalErrorResendLink;
