import React, { Component } from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

import PersonalData from "./personal-data";

class UserProfile extends Component {

    render() {

        return (
            <div>
                <Breadcrumb className="breadcrumb-all">
                    <Breadcrumb.Item href="#">Start</Breadcrumb.Item>
                    <Breadcrumb.Item active>Mój profil</Breadcrumb.Item>
                </Breadcrumb>
                <PersonalData/>
            </div>
        )
    }

}

export default UserProfile;