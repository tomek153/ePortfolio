import React, { Component } from 'react';

import ImageLogo from '../images/logo.png';

class PagheLoading extends Component {
    
    render() {

        return (
            <div className="page-loading">
                <div className="background-opcaity-container">
                    <img 
                        className="login-logo-my"
                        src={ImageLogo}
                    />
                    <div className="spinner">
                        <div className="spinner-text">Ładowanie</div>
                        <div className="spinner-sector spinner-sector-red"></div>
                        <div className="spinner-sector spinner-sector-blue"></div>
                        <div className="spinner-sector spinner-sector-green"></div>
                    </div>
                </div>
            </div>
        )
    }
}

export default PagheLoading;