import React, { Component } from 'react';
import superagent from 'superagent';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';

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
            editUser: {
                id: null,
                firstName: "",
                lastName: "",
                email: "",
            },
            editUserBio: {
                user_uuid: null,
                phone: "",
                address_main: "",
                address_city: "",
                address_zip: "",
                address_country: "",
                date_birth: "",
                gender: ""
            },
            formControll: {
                firstName: false,
                lastName: false,
                email: false,
                phone: false,
                addres_main: false,
                addres_city: false,
                addres_zip: false,
                address_country: false,
                date_birth: false,
                gender: false

            },
            modalSuccesShow: false,
            modalFailedShow: false,
            modalLoadingMessage: false
        }
    }

    async componentDidMount() {

        let connectionError = false;

        {/*
            DOSTĘPNE ID:
            1a1d1d84-be02-4184-a26f-565302a0a9ab | uzupełnione
            67d37b2e-428f-4ec4-9525-668383def1db | nowy user
            148deb3a-a0ae-4f16-bd45-86ffa2bf28a7 | user do edycji
        */}

        let id = "148deb3a-a0ae-4f16-bd45-86ffa2bf28a7"
        const urlMain = "http://localhost:8080/api/users/id/";
        const urlBio = "http://localhost:8080/api/users-bio/id/";

        const responseUserMain = await fetch(urlMain + id).catch(error => error);
        const responseUserBio = await fetch(urlBio + id).catch(error => error);

        if(responseUserMain != "[object Response]" || responseUserBio != "[object Response]"){
            connectionError = true;
        }

        if (connectionError){
            var h1 = document.getElementById("container-bio-address"); 
            var h2 = document.getElementById("container-bio-personal"); 
            var h3 = document.getElementById("container-bio-contact"); 
            h1.className += " hide"; 
            h2.className += " hide"; 
            h3.className += " hide"; 
            var s = document.getElementById("error-box-523"); 
            s.className += " show"; 
            return;
        } else {
            const dataUserMain = await responseUserMain.json();
            const dataUserBio = await responseUserBio.json();
        
            this.setState({editUser : {...this.state.editUser, firstName: dataUserMain.firstName} })
            this.setState({editUser : {...this.state.editUser, lastName: dataUserMain.lastName} })
            this.setState({editUser : {...this.state.editUser, email: dataUserMain.email} })
            this.setState({editUser : {...this.state.editUser, id: dataUserMain.id} })

            this.setState({editUserBio : {...this.state.editUserBio, user_uuid: dataUserMain.id} })
            this.setState({editUserBio : {...this.state.editUserBio, phone: dataUserBio.phone} })
            this.setState({editUserBio : {...this.state.editUserBio, address_main: dataUserBio.address_main} })
            this.setState({editUserBio : {...this.state.editUserBio, address_city: dataUserBio.address_city} })
            this.setState({editUserBio : {...this.state.editUserBio, address_zip: dataUserBio.address_zip} })
            this.setState({editUserBio : {...this.state.editUserBio, address_country: dataUserBio.address_country} })
            this.setState({editUserBio : {...this.state.editUserBio, date_birth: dataUserBio.date_birth} })
            this.setState({editUserBio : {...this.state.editUserBio, gender: dataUserBio.gender} })
        } 
    }

    submitFormAndSend(event) {

        clearMessages();

        let id = "148deb3a-a0ae-4f16-bd45-86ffa2bf28a7"

        const urlBio = "http://localhost:8080/api/users-bio/update/";
        const urlMain = "http://localhost:8080/api/users/update/";

        if (this.state.editUser.firstName == '' ||
            this.state.editUser.lastName == '' ||
            this.state.editUser.email == '' ){
                showErrorBox_Empty();
                return;
        }

        superagent
            .put(urlMain + id)
            .set('Content-Type', 'application/json')
            .send(this.state.editUser)
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
                    .put(urlBio + id)
                    .set('Content-Type', 'application/json')
                    .send(this.state.editUserBio)
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
        this.state.editUser.firstName = event.target.value.trim();
    }
   
    handleLastNameChanged(event) {
        this.state.editUser.lastName = event.target.value.trim();
    }

    handleEmailChanged(event) {
        this.state.editUser.email = event.target.value.trim();
    }

    handlePhoneChanged(event) {
        this.state.editUserBio.phone = event.target.value.trim();
    }
    
    handleBirthDateChanged(event) {
        this.state.editUserBio.date_birth = event.target.value.trim();
    }
    
    handleGenderChanged(event) {
        if(event.target.value == "Mężczyzna") {this.state.editUserBio.gender = "male" ;}
        if(event.target.value == "Kobieta") {this.state.editUserBio.gender = "female" ;}
        if(event.target.value == "Nie podano") {this.state.editUserBio.gender = "" ;}
    }
    
    handleAddressMainChanged(event) {
        this.state.editUserBio.address_main = event.target.value.trim();
    }

    handleAddressCityChanged(event) {
        this.state.editUserBio.address_city = event.target.value.trim();
    }

    handleAddressZipChanged(event) {
        this.state.editUserBio.address_zip = event.target.value.trim();
    }

    handleAddressCountryChanged(event) {
        this.state.editUserBio.address_country = event.target.value.trim();
    }

    
    render() {

        return (
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
                                                <Form.Control placeholder={this.state.editUser.firstName} onChange={this.handleFirstNameChanged.bind(this)}/>
                                            </Form.Group>
                                            
                                        </div>
                                        <div className="col-12 col-md-6 user-bio-name user-bio-data-container">

                                        <Form.Group as={Col} controlId="formGridFirstName">
                                                <Form.Label><p className="user-lastname-main-label label">Nazwisko *</p></Form.Label>
                                                <span id="form-value-alert-lastname" className="form-value-alert"><sub>Podano nieprawidłową wartość.</sub></span>
                                                <Form.Control placeholder={this.state.editUser.lastName} onChange={this.handleLastNameChanged.bind(this)}/>
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
                                                <Form.Control placeholder={this.state.editUserBio.date_birth} onChange={this.handleBirthDateChanged.bind(this)}/>
                                            </Form.Group>
                                            
                                        </div>
                                        <div className="col-12 col-md-6 user-bio-gender user-bio-data-container">
                                        
                                            <Form.Group as={Col} controlId="formGridGender">
                                                <Form.Label><p className="user-gender-main-label label">Płeć</p></Form.Label>
                                                    {this.state.editUserBio.gender == '' && <span><Form.Control as="select" onChange={this.handleGenderChanged.bind(this)}><option>Nie podano</option><option>Kobieta</option><option>Mężczyzna</option></Form.Control></span>}
                                                    {this.state.editUserBio.gender == 'female' && <span><Form.Control as="select" onChange={this.handleGenderChanged.bind(this)}><option>Kobieta</option><option>Mężczyzna</option><option>Nie podano</option></Form.Control></span>}
                                                    {this.state.editUserBio.gender == 'male' && <span><Form.Control as="select" onChange={this.handleGenderChanged.bind(this)}><option>Mężczyzna</option><option>Kobieta</option><option>Nie podano</option></Form.Control></span>}
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
                                                <Form.Control placeholder={this.state.editUser.email} onChange={this.handleEmailChanged.bind(this)}/>
                                            </Form.Group>
                                            
                                        </div>
                                        <div className="col-12 col-md-6 user-bio-phone user-bio-data-container">
                                        
                                            <Form.Group as={Col} controlId="formGridPhone">
                                                <Form.Label><p className="user-phone-label label">Telefon</p></Form.Label>
                                                <span id="form-value-alert-phone" className="form-value-alert"><sub>Podano nieprawidłową wartość.</sub></span>
                                                <Form.Control placeholder={this.state.editUserBio.phone} onChange={this.handlePhoneChanged.bind(this)}/>
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
                                                <Form.Control placeholder={this.state.editUserBio.address_main} onChange={this.handleAddressMainChanged.bind(this)}/>
                                            </Form.Group>
                                            
                                        </div>
                                        <div className="col-12 col-md-6 user-bio-address-city user-bio-data-container">
                                        
                                            <Form.Group as={Col} controlId="formGridAddressCity">
                                                <Form.Label><p className="user-address-city-label label">Miasto</p></Form.Label>
                                                <span id="form-value-alert-address-city" className="form-value-alert"><sub>Podano nieprawidłową wartość.</sub></span>
                                                <Form.Control placeholder={this.state.editUserBio.address_city} onChange={this.handleAddressCityChanged.bind(this)}/>
                                            </Form.Group>

                                        </div>

                                        <div className="col-12 col-md-6 user-bio-address-zip user-bio-data-container">

                                            <Form.Group as={Col} controlId="formGridAddressZip">
                                                <Form.Label><p className="user-address-zip-label label">Kod pocztowy</p></Form.Label>
                                                <span id="form-value-alert-address-zip" className="form-value-alert"><sub>Podano nieprawidłową wartość.</sub></span>
                                                <Form.Control placeholder={this.state.editUserBio.address_zip} onChange={this.handleAddressZipChanged.bind(this)}/>
                                            </Form.Group>

                                        </div>  
                                        <div className="col-12 col-md-6 user-bio-address-country user-bio-data-container">

                                            <Form.Group as={Col} controlId="formGridAddressCountry">
                                                <Form.Label><p className="user-address-country-label label">Kraj</p></Form.Label>
                                                <span id="form-value-alert-address-country" className="form-value-alert"><sub>Podano nieprawidłową wartość.</sub></span>
                                                <Form.Control placeholder={this.state.editUserBio.address_country} onChange={this.handleAddressCountryChanged.bind(this)}/>
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
        )
    }

}

export default UserProfileEdit;