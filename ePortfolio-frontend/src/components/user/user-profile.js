import React, { Component } from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb';

import PageLoading from '../page-loading';
import { Redirect } from 'react-router-dom';

function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

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
            tokenExpired: false
        }
    }

    // componentDidMount() {
    //     var myHeaders = new Headers();
    //     myHeaders.append('Content-Type', 'application/json');
    //     myHeaders.append('Authorization', localStorage.getItem("token"));

    //     const request = new Request(
    //         'http://localhost:8080/api/users/profile', 
    //         {
    //             method: 'GET', 
    //             headers: myHeaders
    //         }
    //     );

    //     fetch(request)
    //         .then(response => {
    //             if (response.status === 200) {
    //                 response.json()
    //                     .then(data => {
    //                         this.setState({user: data});
    //                     });
    //             } else if (response.status === 400) {
    //                 response.json()
    //                     .then(data => {
    //                         if (data.message == "Token expired") {
    //                             window.location.replace("/logowanie?token=expired");
    //                         } else {
    //                             window.location.replace("/logowanie?token=bad_token");
    //                         }
    //                     });
    //             } else {
    //                 window.location.replace("/logowanie?token=bad_token");
    //             }
    //         });
    // }

    render() {

        return (
            <>
                <Breadcrumb>
                    <Breadcrumb.Item href="#">Start</Breadcrumb.Item>
                    <Breadcrumb.Item active>Mój profil</Breadcrumb.Item>
                </Breadcrumb>
                <Container>
                    <Row>
                        <Col>1 of 2</Col>
                        <Col>2 of 2</Col>
                    </Row>
                </Container>
            </>
        )
    }

}

export default UserProfile;