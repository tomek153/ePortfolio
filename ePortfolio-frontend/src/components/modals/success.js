import React from 'react';
import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';

class ModalError extends React.Component {

    close = () => {
        var onClose = this.props.onClose;
        document.querySelector("body > div.fade.modal-backdrop.show").classList.remove("show");
        document.querySelector("body > div.fade.modal.show").classList.remove("show");

        setTimeout(function() {
            onClose();
        }, 150);        
    }

    render() {
        if (!this.props.show)
            return null;

        return (
            <Modal size="sm" show={this.props.show} aria-labelledby="modal-success-title" onHide={this.close}>
                <Modal.Header closeButton>
                    <Modal.Title id="modal-success-title" style={{textAlign: "center"}}>
                        <i className="fas fa-check-circle success-modal-icon"></i>{this.props.title}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.props.children}
                </Modal.Body>
            </Modal>
        );
    }
}

ModalError.propTypes = {
    onClose: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired,
    children: PropTypes.array.isRequired
};

export default ModalError;
