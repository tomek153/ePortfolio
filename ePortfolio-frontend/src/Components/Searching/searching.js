import React, { Component } from 'react';
import Breadcrumb from "react-bootstrap/Breadcrumb";
import {Card, Container} from "react-bootstrap";
import FooterAuth from "../Other/footer-auth";
import LoadingElement from "../Other/loading-element";
import UserCard from "./user-card";

class Searching extends Component {
    _isMounted = false;

    constructor() {
        super();
        this.state = {

            users: [],

            _dataLoaded: false,
        }
    }

    componentDidMount() {
        this._isMounted = true;

        var token = localStorage.getItem("token");

        if (token != null && token != "") {

            var myHeaders = new Headers();
            myHeaders.append('Content-Type', 'application/json; charset=utf-8');
            myHeaders.append('Authorization', localStorage.getItem("token"));

            const request = new Request(
                'http://localhost:8080/api/searching/users',
                {
                    method: 'POST',
                    headers: myHeaders,
                    body: JSON.stringify([])
                }
            );

            fetch(request)
                .then(response => {
                    if (this._isMounted) {
                        if (response.status === 200) {
                            response.json()
                                .then(data => {
                                    this.setState({users: data});
                                    this.state.users = data;
                                    this.setState({_dataLoaded: true});
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
                    <Breadcrumb.Item active>Wyszukiwarka</Breadcrumb.Item>
                </Breadcrumb>

                <Container className="search-container">
                    <br/>
                    {!this.state._dataLoaded
                        ? <LoadingElement/>
                        : <>
                            {this.state.users.map((user, index) => <UserCard data={user} key={index}/>)}
                        </>
                    }
                    <br/>
                </Container>
                <FooterAuth/>
            </>
        )
    }
}

export default Searching;