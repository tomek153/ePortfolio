import React, {Component, useState} from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Paper from '@material-ui/core/Paper';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Card from 'react-bootstrap/Card';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import FormLabel from 'react-bootstrap/FormLabel';

import DatePicker, {registerLocale} from "react-datepicker";
import Avatar from '../UserProfile/avatar';
import FooterAuth from "../Other/footer-auth";
import LoadingElement from "../Other/loading-element";

import "react-datepicker/dist/react-datepicker.css";
import pl from 'date-fns/locale/pl';
import ModalSuccess from "../Modals/success";
import ModalHeaderError from "../Modals/error-header";
registerLocale('pl', pl);

class PersonalData extends Component {
    _isMounted = false;

    constructor() {
        super();
        this.state = {
            id: "",
            firstName: "",
            lastName: "",
            email: "",
            image: "",
            phone: "",
            date_birth: null,
            address_main: "",
            address_city: "",
            address_zip: "",
            address_country: "",
            gender: "",

            new_firstName: "",
            new_lastName: "",
            new_email: "",
            new_image: "",
            new_phone: "",
            new_date_birth: null,
            new_address_main: "",
            new_address_city: "",
            new_address_zip: "",
            new_address_country: "",
            new_gender: "",

            status_firstName: false,
            status_lastName: false,
            status_email: false,
            status_phone: true,
            status_address_main: true,
            status_address_city: true,
            status_address_zip: true,

            err_firstName: false,
            err_lastName: false,
            err_email: false,

            tokenExpired: false,
            modalAvatar: false,
            _dataLoaded: false,

            profile_button_close: "none",
            profile_button_edit: "block",
            profile_button_save: false,
            inputsDisabled: true,
            modal_update_success: false,
            modal_update_err: false
        }
    }
    profileEditOpen() {
        this.setState({profile_button_close: "block"});
        this.setState({profile_button_edit: "none"});
        this.setState({inputsDisabled: false});

        this.checkNewValues();
    }
    profileEditClose() {
        this.setState({profile_button_close: "none"});
        this.setState({profile_button_edit: "block"});
        this.setState({inputsDisabled: true});

        this.setState({err_firstName: false});
        document.getElementById("profileFirstName").value = this.state.firstName;
        this.changeFirstName(this.state.firstName);

        this.setState({err_lastName: false});
        document.getElementById("profileLastName").value = this.state.lastName;
        this.changeLastName(this.state.lastName);

        document.getElementById("profileGender").value = this.state.gender;
        this.state.new_gender = this.state.gender;

        document.getElementById("profileBirthDate").value = this.state.date_birth;
        this.setState({new_date_birth: this.state.date_birth});
        this.state.new_date_birth = this.state.date_birth;

        this.setState({err_email: false});
        document.getElementById("profileEmail").value = this.state.email;
        this.changeEmail(this.state.email);

        this.setState({status_phone: true});
        this.state.status_phone = true;
        document.getElementById("profilePhone").value = this.state.phone;
        this.state.new_phone = this.state.phone;

        this.setState({status_address_main: true});
        this.state.status_address_main = true;
        document.getElementById("profileAddress").value = this.state.address_main;
        this.state.new_address_main = this.state.address_main;

        this.setState({status_address_city: true});
        this.state.status_address_city = true;
        document.getElementById("profileCity").value = this.state.address_city;
        this.state.new_address_city = this.state.address_city;

        this.setState({status_address_zip: true});
        this.state.status_address_zip = true;
        document.getElementById("profileZip").value = this.state.address_zip;
        this.state.new_address_zip = this.state.address_zip;

        document.getElementById("profileCountry").value = this.state.address_country;
        this.state.new_address_country = this.state.address_country;

        this.setState({profile_button_save: false});
        this.state.profile_button_save = false;
    }
    changeFirstName(event) {
        var value;
        var regex = /[^a-zA-ZżźćńółęąśŻŹĆĄŚĘŁÓŃ -]/;

        if (typeof event == "string")
            value = event;
        else
            value = event.target.value;

        this.state.new_firstName = value;

        if (value.match(regex) == null &&
            value.length >= 2 &&
            value.length <= 40) {
            this.state.status_firstName = true;
            this.setState({err_firstName: false});
        } else {
            this.state.status_firstName = false;
            this.setState({err_firstName: true});
        }

        this.checkNewValues();
    }
    changeLastName(event) {
        var value;
        var regex = /[^a-zA-ZżźćńółęąśŻŹĆĄŚĘŁÓŃ -]/;

        if (typeof event == "string")
            value = event;
        else
            value = event.target.value;

        this.state.new_lastName = value;

        if (value.match(regex) == null &&
            value.length >= 2 &&
            value.length <= 40) {
            this.state.status_lastName = true;
            this.setState({err_lastName: false});
        } else {
            this.state.status_lastName = false;
            this.setState({err_lastName: true});
        }

        this.checkNewValues();
    }
    changeGender(event) {
        var value;

        if (typeof event == "string")
            value = event;
        else
            value = event.target.value;

        this.state.new_gender = value;

        this.checkNewValues();
    }
    changeBirthDate(date) {
        let fixedDate = Date.parse(date);

        if (date == null) {
            this.setState({new_date_birth: null});
            this.state.new_date_birth = null;
        } else {
            this.setState({new_date_birth: fixedDate});
            this.state.new_date_birth = fixedDate;
        }

        this.checkNewValues();
    }
    changeEmail(event) {
        let value;
        let regex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
        let wronCharRegex = /[^a-zA-Z0-9żźćńółęąśŻŹĆĄŚĘŁÓŃ@_.-]/;

        if (typeof event == "string")
            value = event;
        else
            value = event.target.value;

        this.state.new_email = value;

        if (value.match(regex) != null &&
            value.match(wronCharRegex) == null &&
            value.length >= 8 &&
            value.length <= 50) {
            this.state.status_email = true;
            this.setState({err_email: false});
        } else {
            this.state.status_email = false;
            this.setState({err_email: true});
        }

        this.checkNewValues();
    }
    changePhone(event) {
        var value;
        var regex = /[^0-9]/;

        if (typeof event == "string")
            value = event;
        else
            value = event.target.value;

        this.state.new_phone = value;

        if (value.match(regex) == null &&
            (value.length === 9 || value.length === 0)) {
            this.setState({status_phone: true});
            this.state.status_phone = true;
        } else {
            this.setState({status_phone: false});
            this.state.status_phone = false;
        }

        this.checkNewValues();
    }
    changeAddress(event) {
        var value;
        var regex = /[^a-zA-Z0-9- ./żźćńółęąśŻŹĆĄŚĘŁÓŃ]/;

        if (typeof event == "string")
            value = event;
        else
            value = event.target.value;

        this.state.new_address_main = value;

        if (value.match(regex) == null &&
            ((value.length >= 5 && value.length <= 70) || value.length === 0)) {
            this.setState({status_address_main: true});
            this.state.status_address_main = true;
        } else {
            this.setState({status_address_main: false});
            this.state.status_address_main = false;
        }

        this.checkNewValues();
    }
    changeCity(event) {
        var value;
        var regex = /[^a-zA-Z- żźćńółęąśŻŹĆĄŚĘŁÓŃ]/;

        if (typeof event == "string")
            value = event;
        else
            value = event.target.value;

        this.state.new_address_city = value;

        if (value.match(regex) == null &&
            ((value.length >= 3 && value.length <= 60) || value.length === 0)) {
            this.setState({status_address_city: true});
            this.state.status_address_city = true;
        } else {
            this.setState({status_address_city: false});
            this.state.status_address_city = false;
        }

        this.checkNewValues();
    }
    changeZip(event) {
        var value;
        var regex = /\d{2}-\d{3}/;

        if (typeof event == "string")
            value = event;
        else
            value = event.target.value;

        this.state.new_address_zip = value;

        if (value.match(regex) != null &&
            (value.length === 6 || value.length === 0)) {
            this.setState({status_address_zip: true});
            this.state.status_address_zip = true;
        } else {
            this.setState({status_address_zip: false});
            this.state.status_address_zip = false;
        }

        this.checkNewValues();
    }
    changeCountry(event) {
        var value;

        if (typeof event == "string")
            value = event;
        else
            value = event.target.value;

        this.state.new_address_country = value;

        this.checkNewValues();
    }
    checkNewValues() {
        // console.clear();
        // console.log("DANE:");
        // console.log("imie: "+this.state.new_firstName);
        // console.log("nazwisko: "+this.state.new_lastName);
        // console.log("email: "+this.state.new_email);
        // console.log("telefon: "+this.state.new_phone);
        // console.log("data_narodzin: "+this.state.new_date_birth);
        // console.log("adres: "+this.state.new_address_main);
        // console.log("miasto: "+this.state.new_address_city);
        // console.log("kod_pocztowy: "+this.state.new_address_zip);
        // console.log("kraj: "+this.state.new_address_country);
        // console.log("płeć: "+this.state.new_gender);
        // console.log("STATUSY:");
        // console.log("imie: "+this.state.status_firstName);
        // console.log("nazwisko: "+this.state.status_lastName);
        // console.log("email: "+this.state.status_email);
        // console.log("STATUSY_ERR:");
        // console.log("telefon: "+this.state.status_phone);
        // console.log("adres: "+this.state.status_address_main);
        // console.log("miasto: "+this.state.status_address_city);
        // console.log("kod_pocztowy: "+this.state.status_address_zip);
        //
        // console.log(this.state.profile_button_save);

        if (this.state.status_firstName &&
        this.state.status_lastName &&
        this.state.status_email &&
        this.state.status_phone &&
        this.state.status_address_main &&
        this.state.status_address_city &&
        this.state.status_address_zip) {
            this.setState({profile_button_save: false});
            this.state.profile_button_save = false;
        } else {
            this.setState({profile_button_save: true});
            this.state.profile_button_save = true;
        }
    }
    componentDidMount() {
        this._isMounted = true;

        var token = localStorage.getItem("token");

        if (token != null && token != "") {

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
                    if (this._isMounted) {
                        if (response.status === 200) {
                            response.json()
                                .then(data => {
                                    if (!data.error) {
                                        this.setState({id: data.id});
                                        this.setState({firstName: data.firstName});
                                        this.setState({lastName: data.lastName});
                                        this.setState({email: data.email});
                                        this.setState({image: data.image});
                                        this.setState({phone: data.phone});
                                        this.setState({date_birth: Date.parse(data.date_birth)});
                                        this.setState({address_main: data.address_main});
                                        this.setState({address_city: data.address_city});
                                        this.setState({address_zip: data.address_zip});
                                        this.setState({address_country: data.address_country});
                                        this.setState({gender: data.gender});
                                        this.setState({_dataLoaded: true});

                                        if (data.firstName !== "" && data.firstName != null) {
                                            this.changeFirstName(data.firstName);
                                            document.getElementById("profileFirstName").value = data.firstName;
                                        }
                                        if (data.lastName !== "" && data.lastName != null) {
                                            this.changeLastName(data.lastName);
                                            document.getElementById("profileLastName").value = data.lastName;
                                        }
                                        if (data.gender !== "" && data.gender != null) {
                                            this.changeGender(data.gender);
                                            document.getElementById("profileGender").value = data.gender;
                                        }
                                        if (data.date_birth !== "" && data.date_birth != null) {
                                            this.changeBirthDate(data.date_birth);
                                        }
                                        if (data.email !== "" && data.email != null) {
                                            this.changeEmail(data.email);
                                            document.getElementById("profileEmail").value = data.email;
                                        }
                                        if (data.phone !== "" && data.phone != null) {
                                            this.changePhone(data.phone);
                                            document.getElementById("profilePhone").value = data.phone;
                                        }
                                        if (data.address_main !== "" && data.address_main != null) {
                                            this.changeAddress(data.address_main);
                                            document.getElementById("profileAddress").value = data.address_main;
                                        }
                                        if (data.address_city !== "" && data.address_city != null) {
                                            this.changeCity(data.address_city);
                                            document.getElementById("profileCity").value = data.address_city;
                                        }
                                        if (data.address_zip !== "" && data.address_zip != null) {
                                            this.changeZip(data.address_zip);
                                            document.getElementById("profileZip").value = data.address_zip;
                                        }
                                        if (data.address_country !== "" && data.address_country != null) {
                                            this.changeCountry(data.address_country);
                                            document.getElementById("profileCountry").value = data.address_country;
                                        }
                                    } else {
                                        localStorage.removeItem("token");
                                        window.location.replace('/logowanie');
                                    }
                                })
                        } else {
                            alert("Nieznany błąd.");
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
    closeModal = () => {
        this.setState({modalAvatar: false});
        this.setState({modal_update_success: false});
        this.setState({modal_update_err: false});
    };
    openAvatarModal = () => {
        this.setState({modalAvatar: true})
    }
    sendNewValues() {
        var token = localStorage.getItem("token");

        if (token != null && token !== "" && !this.state.profile_button_save) {
            var myHeaders = new Headers();
            myHeaders.append('Content-Type', 'application/json');
            myHeaders.append('Authorization', localStorage.getItem("token"));

            const request = new Request(
                'http://localhost:8080/api/user/my_profile',
                {
                    method: 'POST',
                    headers: myHeaders,
                    body: JSON.stringify({
                        first_name: this.state.new_firstName,
                        last_name: this.state.new_lastName,
                        email: this.state.new_email,
                        phone: this.state.new_phone,
                        date_birth: this.state.new_date_birth,
                        address_main: this.state.new_address_main,
                        address_city: this.state.new_address_city,
                        address_zip: this.state.new_address_zip,
                        address_country: this.state.new_address_country,
                        gender: this.state.new_gender
                    })
                }
            );

            fetch(request)
                .then(response => {
                    if (response.status === 200) {

                        this.setState({profile_button_save: true});

                        this.state.firstName = this.state.new_firstName;
                        this.state.lastName = this.state.new_lastName;
                        this.state.email = this.state.new_email;
                        this.state.phone = this.state.new_phone;
                        this.state.date_birth = this.state.new_date_birth;
                        this.state.address_main = this.state.new_address_main;
                        this.state.address_city = this.state.new_address_city;
                        this.state.address_zip = this.state.new_address_zip;
                        this.state.address_country = this.state.new_address_country;
                        this.state.gender = this.state.new_gender;

                        this.profileEditClose();
                        this.setState({modal_update_success: true});

                    } else if (response.status === 400) {
                        localStorage.removeItem("token");
                        window.location.replace('/logowanie');
                    } else {
                        this.profileEditClose();
                        this.setState({modal_update_err: false});
                    }
                });
        } else {
            window.location.replace('/logowanie');
        }
    }
    updatePhoto = async (urlPhoto, urlSmallPhoto, finish) => {
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Authorization', localStorage.getItem("token"));

        const request = new Request(
            'http://localhost:8080/api/user/update/image',
            {
                method: 'PUT',
                headers: myHeaders,
                body: JSON.stringify({image: urlPhoto, image_small: urlSmallPhoto})
            }
        );
        await fetch(request)
            .then(async response => {
                if(response.status === 200) {
                    await finish();
                    this.setState({image: urlPhoto})
                } else {
                    await finish();
                    alert("Niespodziewany błąd.");
                }
            });
    }

    render() {

        const renderTooltip = (props) => (
            <Tooltip id="button-tooltip" {...props}>
                Zmień zdjęcie
            </Tooltip>
        );

        return (
            <>
                <Container>
                    <Paper className="paper-custom" elevation={1}>
                        <Row>
                            <Card className="paper-custom-header">
                                <Card.Header className="card-header-custom">Dane podstawowe</Card.Header>
                                {!this.state._dataLoaded
                                    ? <LoadingElement/>
                                    : <Card.Body style={{paddingLeft: "50px"}}>
                                        <Row>
                                            <Col xs={3}>
                                                <Row>
                                                    <FormLabel className="profile-label-section" style={{marginTop: "20px"}}>Avatar</FormLabel>
                                                </Row>
                                                <Row>
                                                    <Image src={this.state.image}
                                                           className="profile-avatar-image"
                                                           roundedCircle/>
                                                    <div className="profile-avatar-image-edit">
                                                        <OverlayTrigger
                                                            placement="bottom"
                                                            delay={{show: 100, hide: 100}}
                                                            overlay={renderTooltip}
                                                        >
                                                            <i className="fas fa-edit"
                                                               onClick={this.openAvatarModal}>
                                                                <span>Edytuj</span></i>
                                                        </OverlayTrigger>
                                                    </div>
                                                </Row>
                                            </Col>
                                            <Col className="profile-basics">
                                                <Form style={{marginTop: "20px"}}>
                                                    <Form.Row>
                                                        <Form.Label className="profile-label-section">Dane osobowe</Form.Label>
                                                    </Form.Row>
                                                    <Form.Row>
                                                        <Form.Group as={Col} controlId="profileFirstName">
                                                            <Form.Label className="profile-label">Imię<span className="text-error">*</span></Form.Label>
                                                            <Form.Control className="profile-fields" disabled={this.state.inputsDisabled} onChange={this.changeFirstName.bind(this)}/>
                                                            <Form.Text className="text-muted text-error" id="profileFirstName_err" hidden={!this.state.err_firstName}>
                                                                Podano nieprawidłową wartość.
                                                            </Form.Text>
                                                        </Form.Group>

                                                        <Form.Group as={Col} controlId="profileLastName">
                                                            <Form.Label className="profile-label">Nazwisko<span className="text-error">*</span></Form.Label>
                                                            <Form.Control className="profile-fields" disabled={this.state.inputsDisabled} onChange={this.changeLastName.bind(this)}/>
                                                            <Form.Text className="text-muted text-error" id="profileLastName_err" hidden={!this.state.err_lastName}>
                                                                Podano nieprawidłową wartość.
                                                            </Form.Text>
                                                        </Form.Group>
                                                    </Form.Row>

                                                    <Form.Row>
                                                        <Col xs={3}>
                                                            <Form.Group controlId="profileGender">
                                                                <Form.Label className="profile-label">Płeć</Form.Label>
                                                                <Form.Control className="profile-fields" as="select" disabled={this.state.inputsDisabled} onChange={this.changeGender.bind(this)}>
                                                                    <option></option>
                                                                    <option>Mężczyzna</option>
                                                                    <option>Kobieta</option>
                                                                </Form.Control>
                                                            </Form.Group>
                                                        </Col>

                                                        <Col xs={5}>
                                                            <Form.Group>
                                                                <Form.Label>Data urodzenia</Form.Label>
                                                                <DatePicker id="profileBirthDate" className="form-control profile-fields" selected={this.state.new_date_birth} onChange={date => (this.changeBirthDate(date))} locale="pl" disabled={this.state.inputsDisabled}/>
                                                            </Form.Group>
                                                        </Col>
                                                    </Form.Row>

                                                    <Form.Row>
                                                        <Form.Label className="profile-label-section" style={{marginTop: "20px"}}>Dane kontaktowe</Form.Label>
                                                    </Form.Row>

                                                    <Form.Row>
                                                        <Col>
                                                            <Form.Group controlId="profileEmail">
                                                                <Form.Label className="profile-label">Email<span className="text-error">*</span></Form.Label>
                                                                <Form.Control className="profile-fields" onChange={this.changeEmail.bind(this)} disabled={this.state.inputsDisabled}/>
                                                                <Form.Text className="text-muted text-error" id="profileEmail_err" hidden={!this.state.err_email}>
                                                                    Podano nieprawidłową wartość.
                                                                </Form.Text>
                                                            </Form.Group>
                                                        </Col>

                                                        <Col xs={5}>
                                                            <Form.Group controlId="profilePhone">
                                                                <Form.Label>Telefon</Form.Label>
                                                                <Form.Control className="profile-fields" onChange={this.changePhone.bind(this)} disabled={this.state.inputsDisabled}/>
                                                                <Form.Text className="text-muted text-error" id="profilePhone_err" hidden={this.state.status_phone}>
                                                                    Podano nieprawidłową wartość.
                                                                </Form.Text>
                                                            </Form.Group>
                                                        </Col>
                                                    </Form.Row>

                                                    <Form.Group controlId="profileAddress">
                                                        <Form.Label className="profile-label">Adres</Form.Label>
                                                        <Form.Control className="profile-fields" onChange={this.changeAddress.bind(this)} disabled={this.state.inputsDisabled}/>
                                                        <Form.Text className="text-muted text-error" id="profileAddress_err" hidden={this.state.status_address_main}>
                                                            Podano nieprawidłową wartość.
                                                        </Form.Text>
                                                    </Form.Group>

                                                    <Form.Row>
                                                        <Col>
                                                            <Form.Group controlId="profileCity">
                                                                <Form.Label className="profile-label">Miasto</Form.Label>
                                                                <Form.Control className="profile-fields" onChange={this.changeCity.bind(this)} disabled={this.state.inputsDisabled}/>
                                                                <Form.Text className="text-muted text-error" id="profileCity_err" hidden={this.state.status_address_city}>
                                                                    Podano nieprawidłową wartość.
                                                                </Form.Text>
                                                            </Form.Group>
                                                        </Col>

                                                        <Col xs={3}>
                                                            <Form.Group controlId="profileZip">
                                                                <Form.Label>Kod pocztowy</Form.Label>
                                                                <Form.Control className="profile-fields" onChange={this.changeZip.bind(this)} disabled={this.state.inputsDisabled}/>
                                                                <Form.Text className="text-muted text-error" id="profileZip_err" hidden={this.state.status_address_zip}>
                                                                    Podano nieprawidłową wartość.
                                                                </Form.Text>
                                                            </Form.Group>
                                                        </Col>

                                                        <Col xs={4}>
                                                            <Form.Group controlId="profileCountry">
                                                                <Form.Label className="profile-label">Kraj</Form.Label>
                                                                <Form.Control className="profile-fields" as="select" onChange={this.changeCountry.bind(this)} disabled={this.state.inputsDisabled}>
                                                                    <option></option>
                                                                    <option>Polska</option>
                                                                </Form.Control>
                                                            </Form.Group>
                                                        </Col>
                                                    </Form.Row>

                                                    <Form.Text className="text-muted">
                                                        <span className="text-error">*</span> Pola obowiązkowe.
                                                    </Form.Text>

                                                    <Row style={{justifyContent: "flex-end", marginTop: "20px"}}>
                                                        <Button variant="link" style={{display: this.state.profile_button_edit}} onClick={this.profileEditOpen.bind(this)} className="edit-button">
                                                            <i className="fas fa-edit"/> Edytuj
                                                        </Button>
                                                        <Button variant="primary" type="button" className="primary-button" id="button-profile-edit-save" onClick={this.sendNewValues.bind(this)} style={{display: this.state.profile_button_close}} disabled={this.state.profile_button_save}>
                                                            Zapisz
                                                        </Button>
                                                        <Button variant="light" id="button-profile-edit-close" style={{display: this.state.profile_button_close}} onClick={this.profileEditClose.bind(this)}>
                                                            Anuluj
                                                        </Button>
                                                    </Row>
                                                </Form>
                                            </Col>
                                        </Row>
                                    </Card.Body>
                                }
                            </Card>
                        </Row>
                    </Paper>
                </Container>
                <FooterAuth/>
                <Avatar show={this.state.modalAvatar} onClose={this.closeModal} update={this.updatePhoto}/>
                <ModalSuccess show={this.state.modal_update_success} onClose={this.closeModal} title="Zapisano zmiany">
                    Pomyślnie zaktualizowano profil.
                </ModalSuccess>
                <ModalHeaderError show={this.state.modal_update_err} onClose={this.closeModal} title="Z nieznanych powodów nie udało się zaktualizować profilu."/>
            </>
        )
    }
}

export default PersonalData;