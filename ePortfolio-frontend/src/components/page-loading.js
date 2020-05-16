import React, { Component } from 'react';

import Spinner from 'react-bootstrap/Spinner';

import ImageLogo from '../images/logo.png';

class PagheLoading extends Component {
    
    render() {

        return (
            <div className="page-loading">
                <a href="/"><img 
                    className="register-logo-my loading-page-logo"
                    src={ImageLogo}
                /></a>
                <div className="spinner">
                    <div className="spinner-text">Ładowanie</div>
                    <div className="spinner-sector spinner-sector-red"></div>
                    <div className="spinner-sector spinner-sector-blue"></div>
                    <div className="spinner-sector spinner-sector-green"></div>
                </div>
            </div>
        )
    }
}

export default PagheLoading;