import React, { Component } from 'react';
import superagent from 'superagent';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import PageLoading from '../page-loading';

function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

function clearMessages(){
    var e1 = document.getElementById("msg-err");
    var e2 = document.getElementById("msg-suc");
    var e3 = document.getElementById("msg-err-email"); 
    var e4 = document.getElementById("msg-err-empty");
    e1.classList.remove("show");
    e2.classList.remove("show");
    e3.classList.remove("show");
    e4.classList.remove("show");
    e1.classList.add("hide");
    e2.classList.add("hide");
    e3.classList.add("hide");
    e4.classList.add("hide");
}

function showErrorBox(){
    var e = document.getElementById("msg-err"); 
    e.classList.remove("hide");
    e.className += " show"; 
}

function showSuccessBox(){
    var e = document.getElementById("msg-suc"); 
    e.classList.remove("hide");
    e.className += " show"; 
}

function showErrorBox_Email(){
    var e = document.getElementById("msg-err-email"); 
    e.classList.remove("hide");
    e.className += " show"; 
}

function showErrorBox_Empty(){
    var e = document.getElementById("msg-err-empty"); 
    e.classList.remove("hide");
    e.className += " show"; 
}

class UserProfileEdit extends Component {

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
                gender: "",
                password: "HIDDEN"
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

submitFormAndSend(event) {

    console.log(this.state.user);
    superagent
        .put('http://localhost:8080/api/users/' + this.state.user.email)
        .send(this.state.user)
        .end((err, res) => {
            if(err) {
                if(res.body.message == "Update error - email"){
                    showErrorBox_Email(); 
                } else if (res.body.message == "Update error"){
                    showErrorBox(); 
                } else
                    showErrorBox(); 
                return;
            } else {
                superagent
                    .put('http://localhost:8080/api/users-bio/' + this.state.user.id)
                    .set('Content-Type', 'application/json')
                    .send(this.state.user)
                    .end((err, res) => {
                        if(err) {
                            if(res.body.message == "Update error"){
                                showErrorBox(); 
                            } else
                                showErrorBox(); 
                            return;
                        } else {
                            showSuccessBox(); 
                        }
                    }
                    );
            }
        }
    );
}

    handleFirstNameChanged(event) {
        this.state.user.firstName = event.target.value.trim();
    }
   
    handleLastNameChanged(event) {
        this.state.user.lastName = event.target.value.trim();
        console.log(this.state.user.lastName)
    }

    handleEmailChanged(event) {
        this.state.user.email = event.target.value.trim();
    }

    handlePhoneChanged(event) {
        this.state.user.phone = event.target.value.trim();
    }
    
    handleBirthDateChanged(event) {
        this.state.user.dateBirth = event.target.value.trim();
    }
    
    handleGenderChanged(event) {
        if(event.target.value == "Mężczyzna") {this.state.user.gender = "male" ;}
        if(event.target.value == "Kobieta") {this.state.user.gender = "female" ;}
        if(event.target.value == "Nie podano") {this.state.user.gender = "" ;}
    }
    
    handleAddressMainChanged(event) {
        this.state.user.address = event.target.value.trim();
    }

    handleAddressCityChanged(event) {
        this.state.user.city = event.target.value.trim();
    }

    handleAddressZipChanged(event) {
        this.state.user.zip = event.target.value.trim();
    }

    handleAddressCountryChanged(event) {
        this.state.user.country = event.target.value.trim();
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
                                    <Form>   
                                        <div className="col-12 user-bio-personal-container" id="container-bio-personal">
                                            <div className="row">
                                                <div className="col-12 col-md-6 user-bio-name user-bio-data-container">

                                                    <Form.Group as={Col} controlId="formGridFirstName">
                                                        <Form.Label><p className="user-firstname-main-label label">Imię *</p></Form.Label>
                                                        <span id="form-value-alert-firstname" className="form-value-alert"><sub>Podano nieprawidłową wartość.</sub></span>
                                                        <Form.Control placeholder={this.state.user.firstName} onChange={this.handleFirstNameChanged.bind(this)}/>
                                                    </Form.Group>
                                                    
                                                </div>
                                                <div className="col-12 col-md-6 user-bio-name user-bio-data-container">

                                                <Form.Group as={Col} controlId="formGridFirstName">
                                                        <Form.Label><p className="user-lastname-main-label label">Nazwisko *</p></Form.Label>
                                                        <span id="form-value-alert-lastname" className="form-value-alert"><sub>Podano nieprawidłową wartość.</sub></span>
                                                        <Form.Control placeholder={this.state.user.lastName} onChange={this.handleLastNameChanged.bind(this)}/>
                                                </Form.Group>
                                                    
                                                </div>
                                            </div>

                                            <div className="row">          
                                                <div className="col-12 user-bio-personal-title">
                                                    <h3 className="subtitle">Dane osobowe</h3>
                                                </div>                                  
                                            </div>
                                            <div className="row">
                                                <div className="col-12 col-md-6 user-bio-birth user-bio-data-container">
                                                
                                                    <Form.Group as={Col} controlId="formGridBirthDate">
                                                        <Form.Label><p className="user-birth-main-label label">Data urodzenia (<i>dd-mm-rrrr</i>)</p></Form.Label>
                                                        <Form.Control placeholder={this.state.user.dateBirth} onChange={this.handleBirthDateChanged.bind(this)}/>
                                                    </Form.Group>
                                                    
                                                </div>
                                                <div className="col-12 col-md-6 user-bio-gender user-bio-data-container">
                                                
                                                    <Form.Group as={Col} controlId="formGridGender">
                                                        <Form.Label><p className="user-gender-main-label label">Płeć</p></Form.Label>
                                                            {this.state.user.gender == '' && <span><Form.Control as="select" onChange={this.handleGenderChanged.bind(this)}><option>Nie podano</option><option>Kobieta</option><option>Mężczyzna</option></Form.Control></span>}
                                                            {this.state.user.gender == 'female' && <span><Form.Control as="select" onChange={this.handleGenderChanged.bind(this)}><option>Kobieta</option><option>Mężczyzna</option><option>Nie podano</option></Form.Control></span>}
                                                            {this.state.user.gender == 'male' && <span><Form.Control as="select" onChange={this.handleGenderChanged.bind(this)}><option>Mężczyzna</option><option>Kobieta</option><option>Nie podano</option></Form.Control></span>}
                                                    </Form.Group>

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

                                                    <Form.Group as={Col} controlId="formGridEmail">
                                                        <Form.Label><p className="user-email-label label">E-mail *</p></Form.Label>
                                                        <span id="form-value-alert-email" className="form-value-alert"><sub>Podano nieprawidłową wartość.</sub></span>
                                                        <Form.Control placeholder={this.state.user.email} onChange={this.handleEmailChanged.bind(this)}/>
                                                    </Form.Group>
                                                    
                                                </div>
                                                <div className="col-12 col-md-6 user-bio-phone user-bio-data-container">
                                                
                                                    <Form.Group as={Col} controlId="formGridPhone">
                                                        <Form.Label><p className="user-phone-label label">Telefon</p></Form.Label>
                                                        <span id="form-value-alert-phone" className="form-value-alert"><sub>Podano nieprawidłową wartość.</sub></span>
                                                        <Form.Control placeholder={this.state.user.phone} onChange={this.handlePhoneChanged.bind(this)}/>
                                                    </Form.Group>

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

                                                    <Form.Group as={Col} controlId="formGridAddressMain">
                                                        <Form.Label><p className="user-address-main-label label">Adres</p></Form.Label>
                                                        <span id="form-value-alert-address-main" className="form-value-alert"><sub>Podano nieprawidłową wartość.</sub></span>
                                                        <Form.Control placeholder={this.state.user.address} onChange={this.handleAddressMainChanged.bind(this)}/>
                                                    </Form.Group>
                                                    
                                                </div>
                                                <div className="col-12 col-md-6 user-bio-address-city user-bio-data-container">
                                                
                                                    <Form.Group as={Col} controlId="formGridAddressCity">
                                                        <Form.Label><p className="user-address-city-label label">Miasto</p></Form.Label>
                                                        <span id="form-value-alert-address-city" className="form-value-alert"><sub>Podano nieprawidłową wartość.</sub></span>
                                                        <Form.Control placeholder={this.state.user.city} onChange={this.handleAddressCityChanged.bind(this)}/>
                                                    </Form.Group>

                                                </div>

                                                <div className="col-12 col-md-6 user-bio-address-zip user-bio-data-container">

                                                    <Form.Group as={Col} controlId="formGridAddressZip">
                                                        <Form.Label><p className="user-address-zip-label label">Kod pocztowy</p></Form.Label>
                                                        <span id="form-value-alert-address-zip" className="form-value-alert"><sub>Podano nieprawidłową wartość.</sub></span>
                                                        <Form.Control placeholder={this.state.user.zip} onChange={this.handleAddressZipChanged.bind(this)}/>
                                                    </Form.Group>

                                                </div>  
                                                <div className="col-12 col-md-6 user-bio-address-country user-bio-data-container">

                                                    <Form.Group as={Col} controlId="formGridAddressCountry">
                                                        <Form.Label><p className="user-address-country-label label">Kraj</p></Form.Label>
                                                        <span id="form-value-alert-address-country" className="form-value-alert"><sub>Podano nieprawidłową wartość.</sub></span>
                                                        <Form.Control placeholder={this.state.user.country} onChange={this.handleAddressCountryChanged.bind(this)}/>
                                                    </Form.Group>
                                                
                                                </div>
                                            </div>
                                        </div>
                                        <div className="col-12 user-bio-sumbit-container" id="container-submit">
                                        <hr />  
                                                <div className="row">
                                                                        
                                                    <div className="col-12 user-bio-edit-message">
                                                        
                                                        <div className="col-12 message-success hide" id="msg-suc">
                                                            <p><b>Sukces!</b> Dane zostały zapisane.</p>
                                                        </div>

                                                        <div className="col-12 message-failure hide" id="msg-err-email">
                                                            <p><b>Błąd!</b> Podany email jest już wykorzystywany.</p>
                                                        </div>

                                                        <div className="col-12 message-failure hide" id="msg-err-empty">
                                                            <p><b>Błąd!</b> Pola oznaczone gwiazdką muszą być uzupełnione.</p>
                                                        </div>

                                                        <div className="col-12 message-failure hide" id="msg-err"> 
                                                            <p><b>Błąd!</b> Edycja danych nie powiodła się.</p>
                                                        </div>

                                                    </div>
            
                                                    </div>
                                                <div className="row">

                                                <div className="col-12 col-md-6 user-bio-submit">
                                                    <Button onClick={this.submitFormAndSend.bind(this)} type="button" variant="primary" className="update-button">
                                                            Zapisz
                                                    </Button>
                                                </div>
                                                <div className="col-12 col-md-4 user-bio-exit">
                                                    <Button onClick={event =>  window.location.href='/moj-profil'} type="button" variant="primary" className="exit-button">
                                                            Cofnij
                                                    </Button>
                                                </div>
                                                <div className="col-12 col-md-2 user-bio-delete">
                                                    <a href="/moj-profil/usun" className="user-bio-delete-link" title="Usuń konto"> <i className="fa fa-trash" aria-hidden="true"></i></a>
                                                </div>

                                            </div>
                                        </div>
                                    </Form>     
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>        
        )
    }

}

export default UserProfileEdit;