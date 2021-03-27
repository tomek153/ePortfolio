import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import PropTypes from 'prop-types';

class ModalLoading extends Component {

    render() {

        if (!this.props.show)
            return null;

        return (
            <Modal show={this.props.show} id="spinner-container" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Body>
                    <Spinner animation="grow e-spinner"/>
                </Modal.Body>
            </Modal>
        )
    }
}

ModalLoading.propTypes = {
    show: PropTypes.bool.isRequired
};


export default ModalLoading;