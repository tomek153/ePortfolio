import React, { Component } from 'react';
import Tabs from 'react-bootstrap/Tabs';
import Tab from 'react-bootstrap/Tab';

class UserProfile extends Component {
    
    render() {

        return (
            <div className="container-my container">
                <div className="row">
                    <div className="col-md-12 col-lg-6">
                        {/* empty */}
                    </div>

                    <div className="col-md-12 col-lg-6 user-profile-description-my">
                        <div className="col-md-12 page-header">
                            <h1 className="page-title">Mój profil</h1>
                            <hr />
                        </div>
                        <div className="col-md-12 page-content">

                            <p>pierdu pierdu dodaj formularz</p>


                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default UserProfile;