import React, { Component } from 'react';
import Modal from 'react-bootstrap/Modal';
import Image from 'react-bootstrap/Image';
import PropTypes from 'prop-types';

import LogoImage from '../../Images/logo-2.png'

class ModalLoading extends Component {

    render() {

        if (!this.props.show)
            return null;

        return (
            <Modal show={this.props.show} id="spinner-container" aria-labelledby="contained-modal-title-vcenter" centered>
                <Modal.Body>
                    <Image className="logo-spin" src={LogoImage}/>
                </Modal.Body>
            </Modal>
        )
    }
}

ModalLoading.propTypes = {
    show: PropTypes.bool.isRequired
};


export default ModalLoading;