import React, { Component } from 'react';


import PageLoading from '../page-loading';
import { Redirect } from 'react-router-dom';

class TestUser extends Component {
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

    componentDidMount() {
        var root = document.getElementById("root");
        root.style.background = "linear-gradient(135deg, #777, #888)";
        

        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Authorization', localStorage.getItem("token"));

        const request = new Request(
            'http://localhost:8080/api/users/profile', 
            {
                method: 'GET', 
                headers: myHeaders
            }
        );

        fetch(request)
            .then(response => {
                if (response.status === 200) {
                    response.json()
                        .then(data => {
                            this.setState({user: data});
                        });
                } else if (response.status === 400) {
                    response.json()
                        .then(data => {
                            if (data.message == "Token expired") {
                                window.location.replace("/logowanie?token=expired");
                            } else {
                                window.location.replace("/logowanie?token=bad_token");
                            }
                        });
                } else {
                    window.location.replace("/logowanie?token=bad_token");
                }
            });

        const loader = document.querySelector(".page-loading");
        const nav = document.querySelector(".navbar-my");
        window.onload = function() {
            this.setTimeout(function() {
                loader.classList.add("hidden");
                this.setTimeout(function() {
                    nav.style = "visibility: visible";
                    nav.classList.add("animate-nav-in");
                    const regTab = document.querySelector(".box-container-shadow");
                    regTab.style = "display: block";
                    regTab.style = "background-color: #fff";
                }, 200);
            }, 600);
        };
    }

    render() {
        return (
            <>
                <div className="fade-out-helper"></div>
                <PageLoading />
                <div className="box-container-shadow w3-animate-right-login" style={{display: 'none'}}>
                    {this.state.user.id}<br />
                    {this.state.user.firstName}<br />
                    {this.state.user.lastName}<br />
                    {this.state.user.email}<br />
                    {this.state.user.phone}<br />
                    {this.state.user.address}<br />
                    {this.state.user.city}<br />
                    {this.state.user.zip}<br />
                    {this.state.user.country}<br />
                    {this.state.user.dateBirth}<br />
                    {this.state.user.gender}
                </div>
            </>
        )
    }
}

export default TestUser;