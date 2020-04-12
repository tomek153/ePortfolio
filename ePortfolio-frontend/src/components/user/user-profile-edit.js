import React, { Component } from 'react';
import superagent from 'superagent';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import InputGroup from 'react-bootstrap/InputGroup';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';

function handleErrors(response) {
    if (!response.ok) {
        throw Error(response.statusText);
    }
    return response;
}

class UserProfileEdit extends Component {


    constructor() {
        super();
        this.state = {
            editUser: {
                firstName: "",
                lastName: "",
                email: "",
                phone: "",
                addres_main: "",
                addres_city: "",
                addres_zip: "",
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

    state = {
        userUUID: null,
        userFirstName: null,
        userLastName: null,
        userEmail: null,
        userPhone: null,
        userRole: null,
        userConfirmed: null,
        userAddressMain: null,
        userAddressCity: null,
        userAddressZip: null,
        userAddressCountry: null,
        userDateBirth: null,
        userGender: null
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
        
            this.setState({userUUID: dataUserMain.id})
            this.setState({userFirstName: dataUserMain.firstName})
            this.setState({userLastName: dataUserMain.lastName})
            this.setState({userEmail: dataUserMain.email})
            this.setState({userRole: dataUserMain.role})
            this.setState({userConfirmed: dataUserMain.confirmed})
            this.setState({userPhone: dataUserBio.phone})
            this.setState({userAddressMain: dataUserBio.address_main})
            this.setState({userAddressCity: dataUserBio.address_city})
            this.setState({userAddressZip: dataUserBio.address_zip})
            this.setState({userAddressCountry: dataUserBio.address_country})
            this.setState({userDateBirth: dataUserBio.date_birth})
            this.setState({userGender: dataUserBio.gender})
        } 
    }


    submitFormAndSend(event) {

        let id = "148deb3a-a0ae-4f16-bd45-86ffa2bf28a7"

        const urlBio = "http://localhost:8080/api/users-bio/id/";
        const urlMain = "http://localhost:8080/api/users/id/";

        this.setState({modalLoadingMessage: true});
        event.preventDefault();
        superagent
            .post(urlBio + id)
            .send(this.state.editUser)
            .end((err, res) => {
                if(err) {
                    if(res.body.message == "Update user error."){
                        this.setState({modalLoadingMessage: false});
                        this.setState({modalFailedShow: true});
                    } else
                        alert("User update failed.");
                    return;
                } else {
                    this.clearField();
                    this.setState({modalLoadingMessage: false});
                    this.setState({modalSuccesShow: true});
                }
            }
        );
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
                                        <div className="col-12 col-md-6 user-bio-name">

                                            <Form.Group as={Col} controlId="formGridFirstName">
                                                <Form.Label><p className="user-firstname-main-label label">Imię</p></Form.Label>
                                                <span id="form-value-alert-firstname" className="form-value-alert"><sub>Podano nieprawidłową wartość.</sub></span>
                                                <Form.Control placeholder={this.state.userFirstName} />
                                            </Form.Group>
                                            
                                        </div>
                                        <div className="col-12 col-md-6 user-bio-name">

                                        <Form.Group as={Col} controlId="formGridFirstName">
                                                <Form.Label><p className="user-lastname-main-label label">Nazwisko</p></Form.Label>
                                                <span id="form-value-alert-lastname" className="form-value-alert"><sub>Podano nieprawidłową wartość.</sub></span>
                                                <Form.Control placeholder={this.state.userLastName} />
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
                                        
                                            <p className="user-birth-main-label label">Data urodzenia</p>
                                            <p className="user-birth-main user-bio-data">
                                                {this.state.userDateBirth == '' && <span>-</span>}
                                                {this.state.userDateBirth != '' && <span>{this.state.userDateBirth}</span>}
                                            </p>

                                            <Form.Group as={Col} controlId="formGridBirthDate">
                                                <Form.Label><p className="user-birth-main-label label">Data urodzenia</p></Form.Label>
                                                <span id="form-value-alert-birthdate" className="form-value-alert"><sub>Podano nieprawidłową wartość.</sub></span>
                                                <Form.Control placeholder={this.state.userLastName} />
                                        </Form.Group>
                                            
                                        </div>
                                        <div className="col-12 col-md-6 user-bio-gender user-bio-data-container">
                                        
                                            <p className="user-gender-main-label label">Płeć</p>
                                            <p className="user-gender-main user-bio-data">
                                                {this.state.userGender == '' && <span>-</span>}
                                                {this.state.userGender == 'male' && <span>Mężczyzna</span>}
                                                {this.state.userGender == 'female' && <span>Kobieta</span>}
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
                                            <p className="user-email user-bio-data">{this.state.userEmail}</p>
                                            
                                        </div>
                                        <div className="col-12 col-md-6 user-bio-phone user-bio-data-container">
                                        
                                            <p className="user-phone-label label">Telefon</p>
                                            <p className="user-phone user-bio-data">
                                                {this.state.userPhone == '' && <span>-</span>}
                                                {this.state.userPhone != '' && <span>{this.state.userPhone}</span>}
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
                                                {this.state.userAddressMain == '' && <span>-</span>}
                                                {this.state.userAddressMain != '' && <span>{this.state.userAddressMain}</span>}
                                            </p>
                                            
                                        </div>
                                        <div className="col-12 col-md-6 user-bio-address-city user-bio-data-container">
                                        
                                            <p className="user-address-city-label label">Miasto</p>
                                            <p className="user-address-city user-bio-data">
                                                {this.state.userAddressCity == '' && <span>-</span>}
                                                {this.state.userAddressCity != '' && <span>{this.state.userAddressCity}</span>}
                                            </p>

                                        </div>

                                        <div className="col-12 col-md-6 user-bio-address-zip user-bio-data-container">

                                            <p className="user-address-zip-label label">Kod pocztowy</p>
                                            <p className="user-address-zip user-bio-data">
                                                {this.state.userAddressZip == '' && <span>-</span>}
                                                {this.state.userAddressZip != '' && <span>{this.state.userAddressZip}</span>}
                                            </p>

                                            </div>
                                            <div className="col-12 col-md-6 user-bio-address-country user-bio-data-container">

                                            <p className="user-address-country-label label">Kraj</p>
                                            <p className="user-address-country user-bio-data">
                                                {this.state.userAddressCountry == '' && <span>-</span>}
                                                {this.state.userAddressCountry != '' && <span>{this.state.userAddressCountry}</span>}
                                            </p>

                                        </div>

                                        <Button onClick={this.submitFormAndSend.bind(this)} type="button" variant="primary" className="update-button">
                                                Zapisz
                                        </Button>


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