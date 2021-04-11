import React, { Component } from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

import Avatar from '../user_profile/avatar';
import '../../css/profile.css';

// function handleErrors(response) {
//     if (!response.ok) {
//         throw Error(response.statusText);
//     }
//     return response;
// }

class UserProfile extends Component {

    constructor() {
        super();
        this.state = {
            user: {
                id: "",
                firstName: "",
                lastName: "",
                email: "",
                phone: "",
                address: "",
                city: "",
                zip: "",
                country: "",
                dateBirth: "",
                gender: ""
            },
            tokenExpired: false,
            display: "none"
        }
    }

    componentDidMount() {
        var token = localStorage.getItem("token");

        if(token != null && token != "") {

            var myHeaders = new Headers();
            myHeaders.append('Content-Type', 'application/json');
            myHeaders.append('Authorization', localStorage.getItem("token"));

            const request = new Request(
                'http://localhost:8080/api/user/my_profile', 
                {
                    method: 'GET', 
                    headers: myHeaders
                }
            );

            fetch(request)
                .then(response => {
                    console.log(response);

                    this.setState({display: "block"});
                });
        } else {
            window.location.replace('/logowanie');
        }
    }

    render() {

        return (
            <div style={{display: this.state.display}}>
                <Breadcrumb>
                    <Breadcrumb.Item href="#">Start</Breadcrumb.Item>
                    <Breadcrumb.Item active>Mój profil</Breadcrumb.Item>
                </Breadcrumb>
                <Container>
                    <Row>
                        <Col xs={3} className="profile-avatar">
                        </Col>
                        <Col className="profile-basics">
                        </Col>
                    </Row>
                    
                </Container>
                <Avatar/>
            </div>
        )
    }

}

export default UserProfile;