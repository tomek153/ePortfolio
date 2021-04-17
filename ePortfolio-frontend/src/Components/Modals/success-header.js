import React from 'react';
import Modal from 'react-bootstrap/Modal';
import PropTypes from 'prop-types';

class ModalHeaderSuccess extends React.Component {

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
                <Modal.Header closeButton>
                    <Modal.Title id="example-modal-sizes-title-sm" style={{textAlign: "center"}}>
                        <i className="fas fa-check-circle success-modal-icon"></i>{this.props.title}
                    </Modal.Title>
                </Modal.Header>
            </Modal>
        );
    }
}

ModalHeaderSuccess.propTypes = {
    onClose: PropTypes.func.isRequired,
    show: PropTypes.bool.isRequired,
    title: PropTypes.string.isRequired
};

export default ModalHeaderSuccess;
