import React, { Component } from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

import PersonalData from "./personal-data";
import EducationData from "./edu-data";
import FooterAuth from "../Other/footer-auth";
import WorkData from "./work-data";
import SkillData from "./skill-data";

class UserProfile extends Component {

    render() {

        return (
            <div>
                <Breadcrumb className="breadcrumb-all">
                    <Breadcrumb.Item href="#">Start</Breadcrumb.Item>
                    <Breadcrumb.Item active>Mój profil</Breadcrumb.Item>
                </Breadcrumb>
                <PersonalData/>
                <br/>
                <br/>
                <EducationData/>
                <br/>
                <br/>
                <WorkData/>
                <br/>
                <br/>
                <SkillData/>
                <FooterAuth/>
            </div>
        )
    }

}

export default UserProfile;