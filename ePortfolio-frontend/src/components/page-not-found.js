import React, { Component } from 'react';

import ImageNotFound from '../images/not-found.png';

class NotFoundContent extends Component {
    
    render() {

        return (
            <div className="container-my">
                <div className="home-description-my">
                    <h1>Błąd 404</h1>
                    <hr />
                    <p>&nbsp;&nbsp;Strona nie została znaleziona.</p>
                </div>
                <img 
                    className="page-not-found-image"
                    src={ImageNotFound}
                />
            </div>
        )
    }
}

export default NotFoundContent;