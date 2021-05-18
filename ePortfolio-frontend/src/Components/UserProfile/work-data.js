import React, {Component, useState} from 'react';
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";

import Paper from '@material-ui/core/Paper';
import LoadingElement from "../Other/loading-element";
import WorkSingle from "./work-single";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import DatePicker from "react-datepicker";
import Select from 'react-select';
import ModalHeaderError from "../Modals/error-header";

class WorkData extends Component {
    _isMounted = false;

    constructor() {
        super();
        this.state = {
            work: [],
            work_data: null,
            form_institution: "",
            form_type: null,
            form_name: "",
            form_spec: null,
            form_start_date: "",
            form_end_date: "",
            form_description: "",
            form_display: "none",

            status_institution: false,
            status_type: false,
            status_spec: false,
            status_start_date: false,
            status_end_date: false,
            status_description: true,

            _dataLoaded: false,
            profile_button_add: "block",
            profile_button_save_disabled: true,
            modal_add_err: false,
            edu_add_btn_load: false
        }
    }

    closeModal() {
        this.setState({modal_add_err: false});
    }
    componentDidMount() {
        this._isMounted = true;
        var token = localStorage.getItem("token");

        if (token != null && token !== "") {

            var myHeaders = new Headers();
            myHeaders.append('Content-Type', 'application/json');
            myHeaders.append('Authorization', localStorage.getItem("token"));

            const request = new Request(
                'http://localhost:8080/api/users/profile/work',
                {
                    method: 'GET',
                    headers: myHeaders
                }
            );

            const request_edu = new Request(
                'http://localhost:8080/api/edu/data',
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
                                        this.state.work = data;

                                        console.log(data);

                                        fetch(request_edu)
                                            .then(response => {
                                                if (response.status === 200) {
                                                    response.json()
                                                        .then(data => {
                                                            if (!data.error) {

                                                                (data.eduType).forEach((row) => {
                                                                    Object.defineProperties(row, {
                                                                        "value": Object.getOwnPropertyDescriptor(row, "id"),
                                                                        "label": Object.getOwnPropertyDescriptor(row, "name")
                                                                    });
                                                                    ["id", "name"].forEach(key => delete row[key]);
                                                                });

                                                                (data.eduSpec).forEach((row) => {
                                                                    Object.defineProperties(row, {
                                                                        "value": Object.getOwnPropertyDescriptor(row, "id"),
                                                                        "label": Object.getOwnPropertyDescriptor(row, "name")
                                                                    });
                                                                    ["id", "name"].forEach(key => delete row[key]);
                                                                });

                                                                this.state.work_data = data;
                                                                this.setState({_dataLoaded: true});

                                                                document.getElementById("eduInstitution_err").style.display = "none";
                                                                document.getElementById("eduDescription_err").style.display = "none";
                                                            } else {
                                                                localStorage.removeItem("token");
                                                                window.location.replace('/logowanie');
                                                            }
                                                        })
                                                } else {
                                                    localStorage.removeItem("token");
                                                    window.location.replace('/logowanie');
                                                }
                                            });
                                    } else {
                                        localStorage.removeItem("token");
                                        window.location.replace('/logowanie');
                                    }
                                })
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
    removeItem(index) {
        let edu = this.state.work;

        edu.splice(index, 1);
        this.state.work = edu;
    }
    changeInstitution(event) {
        var value = event.target.value;
        var regex = /[^a-zA-ZżźćńółęąśŻŹĆĄŚĘŁÓŃ. -]/;

        this.state.form_institution = value;

        if (value.match(regex) == null &&
            value.length >= 5 &&
            value.length <= 60) {
            this.setState({status_institution: true});
            this.state.status_institution = true;
            document.getElementById("eduInstitution_err").style.display = "none";
        } else {
            this.setState({status_institution: false});
            this.state.status_institution = false;
            document.getElementById("eduInstitution_err").style.display = "block";
        }

        this.checkStatuses();
    }
    changeType = (selected) => {
        this.setState({form_type: selected});
        this.state.form_type = selected;
        this.setState({status_type: true});
        this.state.status_type = true;

        this.checkStatuses();
    }
    changeSpec = (selected) => {
        this.setState({form_spec: selected});
        this.state.form_spec = selected;
        this.setState({status_spec: true});
        this.state.status_spec = true;

        this.checkStatuses();
    }
    changeStartDate (date) {

        this.setState({form_start_date: date});
        this.state.form_start_date = date;
        this.setState({status_start_date: true});
        this.state.status_start_date = true;

        this.checkStatuses();
    }
    changeEndDate (date) {

        this.setState({form_end_date: date});
        this.state.form_end_date = date;
        this.setState({status_end_date: true});
        this.state.status_end_date = true;

        this.checkStatuses();
    }
    changeDescription(event) {
        var value = event.target.value;
        var regex = /[^a-zA-ZżźćńółęąśŻŹĆĄŚĘŁÓŃ0-9. -]/;

        this.state.form_description = value;

        if ((value.match(regex) == null &&
            value.length >= 5 &&
            value.length <= 600) || value.length === 0) {
            this.setState({status_description: true});
            this.state.status_description = true;
            document.getElementById("eduDescription_err").style.display = "none";
        } else {
            this.setState({status_description: false});
            this.state.status_description = false;
            document.getElementById("eduDescription_err").style.display = "block";
        }

        this.checkStatuses();
    }
    checkStatuses() {
        if (this.state.status_institution &&
            this.state.status_type &&
            this.state.status_spec &&
            this.state.status_start_date &&
            this.state.status_end_date &&
            this.state.status_description) {

            this.setState({profile_button_save_disabled: false});
        } else {
            this.setState({profile_button_save_disabled: true});
        }
    }
    displayForm() {
        this.setState({form_display: "block"});
        this.setState({profile_button_add: "none"});
    }
    hideForm() {
        this.setState({form_display: "none"});
        this.setState({profile_button_add: "block"});
        this.clearForm();
    }
    addEdu() {
        if (!this.state.profile_button_save_disabled) {

            this.setState({edu_add_btn_load: true});
            var newEdu = {
                edu_place: this.state.form_institution,
                edu_type: this.state.form_type.value,
                edu_name: this.state.form_name,
                edu_spec: this.state.form_spec.value,
                edu_desc: this.state.form_description,
                edu_time_start: Date.parse(this.state.form_start_date),
                edu_time_end: Date.parse(this.state.form_end_date)
            }
            console.log(newEdu);

            var myHeaders = new Headers();
            myHeaders.append('Content-Type', 'application/json');
            myHeaders.append('Authorization', localStorage.getItem("token"));

            const request = new Request(
                'http://localhost:8080/api/users/add/edu',
                {
                    method: 'POST',
                    headers: myHeaders,
                    body: JSON.stringify(newEdu)
                }
            );

            fetch(request)
                .then(response => {
                    if (response.status === 200) {
                        response.json()
                            .then(data => {
                                console.log(data);
                                this.setState({edu_add_btn_load: false});
                                this.hideForm();
                                this.setState({edu: []});
                                this.setState({edu: data});
                                this.hideForm();
                            });
                    } else if (response.status === 400 && (response.message === "token_invalid" || response.message === "token_expired")) {
                        localStorage.removeItem("token");
                        window.location.replace('/logowanie');
                    } else {
                        this.setState({edu_add_btn_load: false});
                        this.setState({modal_del_err: true});
                        this.hideForm();
                    }
                });
        }
    }
    clearForm() {
        this.setState({form_institution: ""});
        this.setState({form_type: ""});
        this.setState({form_spec: ""});
        this.setState({form_start_date: ""});
        this.setState({form_end_date: ""});
        this.setState({form_description: ""});
        this.setState({form_display: "none"});

        this.setState({status_institution: false});
        this.setState({status_type: false});
        this.setState({status_spec: false});
        this.setState({status_start_date: false});
        this.setState({status_end_date: false});
        this.setState({status_description: true});

        document.getElementById("eduInstitution").value = "";
        document.getElementById("eduDescription").value = "";
        this.setState({form_type: null});
        this.state.form_type = null;
        this.setState({form_spec: null});
        this.state.form_spec = null;
    }

    render() {
        return (
            <>
                <Container>
                    <Paper className="paper-custom" elevation={1}>
                        <Row>
                            <Card className="paper-custom-header">
                                <Card.Header className="card-header-custom">Praca</Card.Header>
                                {!this.state._dataLoaded
                                    ? <LoadingElement/>
                                    : <Card.Body>
                                        <Form style={{marginTop: "20px", display: this.state.form_display}}>
                                            <Form.Row>
                                                <Form.Label className="profile-label-section">Dodaj nową pozycję</Form.Label>
                                            </Form.Row>
                                            <Form.Row>
                                                <Form.Group as={Col} controlId="eduInstitution">
                                                    <Form.Label className="profile-label">Instytucja<span className="text-error">*</span></Form.Label>
                                                    <Form.Control className="profile-fields" autoComplete="off" onChange={this.changeInstitution.bind(this)}/>
                                                    <Form.Text className="text-muted text-error" id="eduInstitution_err">
                                                        Podano nieprawidłową wartość.
                                                    </Form.Text>
                                                </Form.Group>

                                                <Col xs={3}>
                                                    <Form.Group controlId="eduType">
                                                        <Form.Label className="profile-label">Typ<span className="text-error">*</span></Form.Label>
                                                        <Select id="eduType" className="profile-fields" value={this.state.form_type} options={this.state.work_data.eduType} placeholder="Wybierz..." onChange={this.changeType}/>
                                                    </Form.Group>
                                                </Col>

                                                <Col xs={4}>
                                                    <Form.Group controlId="eduSpec">
                                                        <Form.Label className="profile-label">Dziedzina<span className="text-error">*</span></Form.Label>
                                                        <Select id="eduSpec" className="profile-fields" value={this.state.form_spec} options={this.state.work_data.eduSpec} placeholder="Wybierz..." onChange={this.changeSpec}/>
                                                    </Form.Group>
                                                </Col>
                                            </Form.Row>

                                            <Form.Row>
                                                <Col xs={5}>
                                                    <Form.Group>
                                                        <Form.Label>Data rozpoczęcia<span className="text-error">*</span></Form.Label>
                                                        <DatePicker id="eduStartDate" className="form-control profile-fields" autoComplete="off" selected={this.state.form_start_date} onChange={this.changeStartDate.bind(this)}/>
                                                    </Form.Group>
                                                </Col>

                                                <Col xs={5}>
                                                    <Form.Group>
                                                        <Form.Label>Data ukończena<span className="text-error">*</span></Form.Label>
                                                        <DatePicker id="eduEndDate" className="form-control profile-fields" autoComplete="off" selected={this.state.form_end_date} onChange={this.changeEndDate.bind(this)}/>
                                                    </Form.Group>
                                                </Col>
                                            </Form.Row>


                                            <Form.Group controlId="eduDescription">
                                                <Form.Label className="profile-label">Opis</Form.Label>
                                                <Form.Control as="textarea" className="profile-fields" autoComplete="off" onChange={this.changeDescription.bind(this)}/>
                                                <Form.Text className="text-muted text-error" id="eduDescription_err">
                                                    Podano nieprawidłową wartość.
                                                </Form.Text>
                                            </Form.Group>


                                            <Form.Text className="text-muted">
                                                <span className="text-error">*</span> Pola obowiązkowe.
                                            </Form.Text>

                                            <Row style={{justifyContent: "center", marginTop: "20px"}}>
                                                {this.state.edu_add_btn_load
                                                    ? <Button variant="primary" type="button" className="primary-button" disabled={true}>
                                                        Ładowanie &nbsp;<Spinner animation="border" style={{width: "1.3rem", height: "1.3rem"}}/>
                                                    </Button>
                                                    : <Button variant="primary" type="button" className="primary-button" id="button-edu-edit-save" disabled={this.state.profile_button_save_disabled} onClick={this.addEdu.bind(this)}>
                                                        Zapisz
                                                    </Button>
                                                }
                                                <Button variant="light" id="button-edu-edit-close" onClick={this.hideForm.bind(this)}>
                                                    Anuluj
                                                </Button>
                                            </Row>
                                        </Form>

                                        <Row style={{justifyContent: "center", padding: "10px 0"}}>
                                            <Button variant="link" style={{display: this.state.profile_button_add}} className="edit-button" onClick={this.displayForm.bind(this)}>
                                                <i className="fas fa-plus-square"/> Dodaj
                                            </Button>
                                        </Row>

                                        {this.state.work.map((edu, index) => <WorkSingle data={edu} index={index} delete={this.removeItem.bind(this)}/>)}
                                    </Card.Body>
                                }
                            </Card>
                        </Row>
                    </Paper>
                </Container>
                <ModalHeaderError show={this.state.modal_add_err} onClose={this.closeModal} title="Coś poszło nie tak."/>
            </>
        )
    }
}

export default WorkData;