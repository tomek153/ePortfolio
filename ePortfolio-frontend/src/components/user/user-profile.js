import React, { Component } from 'react';

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

    componentDidMount() {
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
                }, 200);
            }, 600);
        };
    }

    render() {

        return (
            <div>
                <PageLoading />
                <div className="container-my container">
                
                    <div className="row">
                        <div className="col-md-12 col-lg-6">

                        </div>
                        
                        <div className="col-md-12 col-lg-6 user-profile-description-my">
                            <div className="row background-container">
                                <div className="col-md-12 page-header">
                                    <h1 className="page-title">Mój profil</h1>
                                    <hr />
                                </div>
                                <div className="col-md-12 user-profile-error-box-outter" id="error-box-523">
                                    <div className="col-md-12 user-profile-error-box">
                                        <h3 className="error-title">Wystąpił błąd!</h3>
                                        <p className="error-text">Dane nie mogły zostać pobrane. Spróbuj za chwilę ponownie. Jeśli problem będzie się powtarzał skontaktuj się z pomocą techniczną.</p>
                                    </div>
                                </div>
                                <div className="col-md-12 page-content">
                                    <div className="col-12 user-bio-personal-container" id="container-bio-personal">
                                        <div className="row">
                                            <div className="col-10 user-bio-name">

                                                <h2 className="user-name">{this.state.user.firstName} {this.state.user.lastName}</h2>
                                                
                                            </div>
                                            <div className="col-2 user-bio-edit">

                                                <a href="/moj-profil/edytuj" className="user-bio-edit-link" title="Edytuj"> <i className="fa fa-cog" aria-hidden="true"></i></a>

                                            </div>
                                        </div>

                                        <div className="row">          
                                            <div className="col-12 user-bio-personal-title">
                                                <h3 className="subtitle">Dane osobowe</h3>
                                            </div>                                  
                                        </div>
                                        <div className="row">
                                            <div className="col-12 col-md-6 user-bio-birth user-bio-data-container">
                                            
                                                <p className="user-birth-main-label label">Data urodzenia</p>
                                                <p className="user-birth-main user-bio-data">
                                                    {this.state.user.dateBirth == '' && <span>-</span>}
                                                    {this.state.user.dateBirth != '' && <span>{this.state.user.dateBirth}</span>}
                                                </p>
                                                
                                            </div>
                                            <div className="col-12 col-md-6 user-bio-gender user-bio-data-container">
                                            
                                                <p className="user-gender-main-label label">Płeć</p>
                                                <p className="user-gender-main user-bio-data">
                                                    {this.state.user.gender == '' && <span>-</span>}
                                                    {this.state.user.gender == 'male' && <span>Mężczyzna</span>}
                                                    {this.state.user.gender == 'female' && <span>Kobieta</span>}
                                                </p>
                                                
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 user-bio-contact-container" id="container-bio-contact">
                                        <div className="row">          
                                            <div className="col-12 user-bio-contact-title">
                                                <h3 className="subtitle">Dane kontaktowe</h3>
                                            </div>                                  
                                        </div>
                                        <div className="row">
                                            <div className="col-12 col-md-6 user-bio-email user-bio-data-container">

                                                <p className="user-email-label label">E-mail</p>
                                                <p className="user-email user-bio-data">{this.state.user.email}</p>
                                                
                                            </div>
                                            <div className="col-12 col-md-6 user-bio-phone user-bio-data-container">
                                            
                                                <p className="user-phone-label label">Telefon</p>
                                                <p className="user-phone user-bio-data">
                                                    {this.state.user.phone == '' && <span>-</span>}
                                                    {this.state.user.phone != '' && <span>{this.state.user.phone}</span>}
                                                </p>

                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-12 user-bio-address-container" id="container-bio-address">
                                        
                                        <div className="row">          
                                            <div className="col-12 user-bio-address-title">
                                                <h3 className="subtitle">Dane adresowe</h3>
                                            </div>                                  
                                        </div>

                                        <div className="row">
                                            
                                            <div className="col-12 col-md-6 user-bio-address-main user-bio-data-container">

                                                <p className="user-address-main-label label">Adres</p>
                                                <p className="user-address-main user-bio-data">
                                                    {this.state.user.address == '' && <span>-</span>}
                                                    {this.state.user.address != '' && <span>{this.state.user.address}</span>}
                                                </p>
                                                
                                            </div>
                                            <div className="col-12 col-md-6 user-bio-address-city user-bio-data-container">
                                            
                                                <p className="user-address-city-label label">Miasto</p>
                                                <p className="user-address-city user-bio-data">
                                                    {this.state.user.city == '' && <span>-</span>}
                                                    {this.state.user.cityy != '' && <span>{this.state.user.city}</span>}
                                                </p>

                                            </div>

                                            <div className="col-12 col-md-6 user-bio-address-zip user-bio-data-container">

                                                <p className="user-address-zip-label label">Kod pocztowy</p>
                                                <p className="user-address-zip user-bio-data">
                                                    {this.state.user.zip == '' && <span>-</span>}
                                                    {this.state.user.zip != '' && <span>{this.state.user.zip}</span>}
                                                </p>

                                                </div>
                                                <div className="col-12 col-md-6 user-bio-address-country user-bio-data-container">

                                                <p className="user-address-country-label label">Kraj</p>
                                                <p className="user-address-country user-bio-data">
                                                    {this.state.user.country == '' && <span>-</span>}
                                                    {this.state.user.country != '' && <span>{this.state.user.country}</span>}
                                                </p>

                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

}

export default UserProfile;