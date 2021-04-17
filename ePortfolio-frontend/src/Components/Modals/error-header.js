import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';

class ModalHeaderError extends Component {
    
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
            <Modal size="sm" show={this.props.show} aria-labelledby="example-modal-sizes-title-sm" onHide={this.close}>
                <Modal.Header closeButton className="modal-header-error">
                    <Modal.Title id="example-modal-sizes-title-sm" style={{textAlign: "center"}}>
                        <i className="fas fa-times-circle success-modal-icon"></i>Coś poszło nie tak!
                    </Modal.Title>
                </Modal.Header>
            </Modal>
        )
    }
}

ModalHeaderError.propTypes = {
    onClose: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired
};


export default ModalHeaderError;