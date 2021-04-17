import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import PropTypes from 'prop-types';
import { CommonLoading } from 'react-loadingg';

class ModalLoading extends Component {

    render() {

        if (!this.props.show)
            return null;

        return (
            <Modal show={this.props.show} id="spinner-container" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Body>
                    <CommonLoading color="#ede576" size="large" speed="1.8" style={{width: "50px", height: "50px"}}/>
                </Modal.Body>
            </Modal>
        )
    }
}

ModalLoading.propTypes = {
    show: PropTypes.bool.isRequired
};


export default ModalLoading;