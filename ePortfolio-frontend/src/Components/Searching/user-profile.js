import React, { Component } from 'react';
import Breadcrumb from "react-bootstrap/Breadcrumb";
import {Col, Container, Row, Image} from "react-bootstrap";
import FooterAuth from "../Other/footer-auth";
import LoadingElement from "../Other/loading-element";

class UserProfile extends Component {
    _isMounted = false;

    constructor() {
        super();
        this.state = {
            user: null,
            _dataLoaded: false
        }
    }

    componentDidMount() {
        this._isMounted = true;
        var token = localStorage.getItem("token");

        if (token != null && token !== "") {

            var myHeaders = new Headers();
            myHeaders.append('Content-Type', 'application/json');
            myHeaders.append('Authorization', localStorage.getItem("token"));

            const request = new Request(
                'http://localhost:8080/api/searching/user/'+this.props.match.params.id,
                {
                    method: 'GET',
                    headers: myHeaders
                }
            );

            fetch(request)
                .then(response => {
                    if (this._isMounted) {
                        if (response.status === 200) {
                            response.json()
                                .then(data => {
                                    if (!data.error) {
                                        console.log(data);
                                        this.setState({user: data});
                                        this.state.user = data;
                                        this.setState({_dataLoaded: true});
                                    } else {
                                        localStorage.removeItem("token");
                                        window.location.replace('/logowanie');
                                    }
                                });
                        } else {
                            localStorage.removeItem("token");
                            window.location.replace('/logowanie');
                        }
                    }
                });

        } else {
            window.location.replace('/logowanie');
        }
    }
    componentWillUnmount() {
        this._isMounted = false;
    }

    render() {
        return (
            <>
                <Breadcrumb className="breadcrumb-all">
                    <Breadcrumb.Item href="#">Start</Breadcrumb.Item>
                    <Breadcrumb.Item href="#">Wyszukiwarka</Breadcrumb.Item>
                    <Breadcrumb.Item href="#" active>Profil</Breadcrumb.Item>
                </Breadcrumb>
                <Container className="search-profile-container">
                    {!this.state._dataLoaded
                        ? <div style={{backgroundColor: "#e9ecef", width: "calc(100% + 30px)", marginLeft: "-15px"}}><LoadingElement/></div>
                        : <div>
                            <br/>
                            <Row>
                                <Col xs={9}>
                                    <Row className="search-profile-name">{this.state.user.firstName} {this.state.user.lastName}</Row>
                                    <Row>
                                        <Col>
                                            {/*<i className="fas fa-map-marker-alt"/> {this.state.user}*/}

                                        </Col>
                                        <Col><i className="fas fa-calendar"/></Col>
                                        <Col><i className="fas fa-phone"/></Col>
                                        <Col><i className="fas fa-envelope"/></Col>
                                    </Row>
                                </Col>
                                <Col xs={3} className="search-profile-image-container">
                                    <Image className="search-profile-image" src={this.state.user.image} roundedCircle/>
                                </Col>
                            </Row>
                        </div>
                    }
                </Container>
                <FooterAuth/>
            </>
        )
    }
}

export default UserProfile;