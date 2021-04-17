import React, { Component } from 'react';

import Footer from '../Home/home-footer';
import ImageNotFound from '../../Images/not-found.jpg';

class NotFoundContent extends Component {
    
    render() {
        return (
            <div className="home-container">
                <div className="home-container">
                    <div className="photo-section" style={{height: "200px", backgroundPosition: "50% 31.5%"}}>
                        <div className="opacity-background">
                        </div>
                    </div>
                    <div className="not-found-container">
                            <img 
                                className="page-not-found-image"
                                src={ImageNotFound}
                            />
                        </div>
                        <Footer/>
                </div>
            </div>
        )
    }
}

export default NotFoundContent;