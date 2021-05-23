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
import DatePicker, {registerLocale} from "react-datepicker";
import Select from 'react-select';
import ModalHeaderError from "../Modals/error-header";
import MenuList from "../Other/custom-select-fast";
import pl from 'date-fns/locale/pl';
registerLocale('pl', pl);

class WorkData extends Component {
    _isMounted = false;

    constructor() {
        super();
        this.state = {
            work: [],
            work_data: null,
            form_place: null,
            form_industry: null,
            form_type: null,
            form_profession: null,
            form_name: "",
            form_start_date: "",
            form_end_date: "",
            form_description: "",
            form_display: "none",

            status_place: false,
            status_location: false,
            status_industry: false,
            status_type: false,
            status_profession: false,
            status_start_date: false,
            status_end_date: false,
            status_description: false,

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

            const request_work = new Request(
                'http://localhost:8080/api/work/data',
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

                                        fetch(request_work)
                                            .then(response => {
                                                if (response.status === 200) {
                                                    response.json()
                                                        .then(data => {
                                                            if (!data.error) {

                                                                (data.locations).forEach((row) => {
                                                                    Object.defineProperties(row, {
                                                                        "value": Object.getOwnPropertyDescriptor(row, "id"),
                                                                        "label": Object.getOwnPropertyDescriptor(row, "name")
                                                                    });
                                                                    ["id", "name"].forEach(key => delete row[key]);
                                                                });

                                                                (data.workIndustry).forEach((row) => {
                                                                    Object.defineProperties(row, {
                                                                        "value": Object.getOwnPropertyDescriptor(row, "id"),
                                                                        "label": Object.getOwnPropertyDescriptor(row, "name")
                                                                    });
                                                                    ["id", "name"].forEach(key => delete row[key]);
                                                                });

                                                                (data.workProfessions).forEach((row) => {
                                                                    Object.defineProperties(row, {
                                                                        "value": Object.getOwnPropertyDescriptor(row, "id"),
                                                                        "label": Object.getOwnPropertyDescriptor(row, "name")
                                                                    });
                                                                    ["id", "name"].forEach(key => delete row[key]);
                                                                });

                                                                (data.workType).forEach((row) => {
                                                                    Object.defineProperties(row, {
                                                                        "value": Object.getOwnPropertyDescriptor(row, "id"),
                                                                        "label": Object.getOwnPropertyDescriptor(row, "name")
                                                                    });
                                                                    ["id", "name"].forEach(key => delete row[key]);
                                                                });

                                                                this.state.work_data = data;
                                                                this.setState({_dataLoaded: true});

                                                                document.getElementById("workName_err").style.display = "none";
                                                                document.getElementById("workDescription_err").style.display = "none";
                                                            } else {
                                                                localStorage.removeItem("token");
                                                                window.location.href = '/logowanie';
                                                            }
                                                        })
                                                } else {
                                                    localStorage.removeItem("token");
                                                    window.location.href = '/logowanie';
                                                }
                                            });
                                    } else {
                                        localStorage.removeItem("token");
                                        window.location.href = '/logowanie';
                                    }
                                })
                        } else {
                            localStorage.removeItem("token");
                            window.location.href = '/logowanie';
                        }
                    }
                });

        } else {
            window.location.href = '/logowanie';
        }
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    removeItem(index) {
        let work = this.state.work;

        work.splice(index, 1);
        this.state.work = work;
    }
    changeName(event) {
        var value = event.target.value;
        var regex = /[^a-zA-ZżźćńółęąśŻŹĆĄŚĘŁÓŃ., -]/;

        this.state.form_name = value;

        if (value.match(regex) == null &&
            value.length >= 2 &&
            value.length <= 70) {
            this.setState({status_name: true});
            this.state.status_name = true;
            document.getElementById("workName_err").style.display = "none";
        } else {
            this.setState({status_name: false});
            this.state.status_name = false;
            document.getElementById("workName_err").style.display = "block";
        }

        this.checkStatuses();
    }
    changePlace = (selected) => {
        this.setState({form_place: selected});
        this.state.form_place = selected;
        this.setState({status_place: true});
        this.state.status_place = true;

        this.checkStatuses();
    }
    changeIndustry = (selected) => {
        this.setState({form_industry: selected});
        this.state.form_industry = selected;
        this.setState({status_industry: true});
        this.state.status_industry = true;

        this.checkStatuses();
    }
    changeType = (selected) => {
        this.setState({form_type: selected});
        this.state.form_type = selected;
        this.setState({status_type: true});
        this.state.status_type = true;

        this.checkStatuses();
    }
    changeProfession = (selected) => {
        this.setState({form_profession: selected});
        this.state.form_profession = selected;
        this.setState({status_profession: true});
        this.state.status_profession = true;

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
        var regex = /[^a-zA-ZżźćńółęąśŻŹĆĄŚĘŁÓŃ0-9., -]/;

        this.state.form_description = value;

        if ((value.match(regex) == null &&
            value.length >= 5 &&
            value.length <= 1000) || value.length === 0) {
            this.setState({status_description: true});
            this.state.status_description = true;
            document.getElementById("workDescription_err").style.display = "none";
        } else {
            this.setState({status_description: false});
            this.state.status_description = false;
            document.getElementById("workDescription_err").style.display = "block";
        }

        this.checkStatuses();
    }
    checkStatuses() {

        if (this.state.status_place &&
            this.state.status_name &&
            this.state.status_industry &&
            this.state.status_type &&
            this.state.status_profession &&
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
    addWork() {
        if (!this.state.profile_button_save_disabled) {

            this.setState({edu_add_btn_load: true});

            var newWork = {
                work_place: this.state.form_place.value,
                work_industry: this.state.form_industry.value,
                work_type: this.state.form_type.value,
                work_profession: this.state.form_profession.value,
                work_name: this.state.form_name,
                work_start_date: Date.parse(this.state.form_start_date),
                work_end_date: Date.parse(this.state.form_end_date),
                work_description: this.state.form_description
            }

            var myHeaders = new Headers();
            myHeaders.append('Content-Type', 'application/json');
            myHeaders.append('Authorization', localStorage.getItem("token"));

            const request = new Request(
                'http://localhost:8080/api/users/add/work',
                {
                    method: 'POST',
                    headers: myHeaders,
                    body: JSON.stringify(newWork)
                }
            );

            fetch(request)
                .then(response => {
                    if (response.status === 200) {
                        response.json()
                            .then(data => {
                                this.setState({edu_add_btn_load: false});
                                this.hideForm();
                                this.setState({work: []});
                                this.setState({work: data});
                                this.hideForm();
                            });
                    } else if (response.status === 400 && (response.message === "token_invalid" || response.message === "token_expired")) {
                        localStorage.removeItem("token");
                        window.location.href = '/logowanie';
                    } else {
                        this.setState({edu_add_btn_load: false});
                        this.setState({modal_del_err: true});
                        this.hideForm();
                    }
                });
        }
    }
    clearForm() {
        this.setState({form_name: ""});
        this.setState({form_place: null});
        this.state.form_place = null;
        this.setState({form_industry: null});
        this.state.form_industry = null;
        this.setState({form_type: null});
        this.state.form_type = null;
        this.setState({form_profession: null});
        this.state.form_profession = null;
        this.setState({form_start_date: ""});
        this.setState({form_end_date: ""});
        this.setState({form_description: ""});
        this.setState({form_display: "none"});

        this.setState({status_place: false});
        this.setState({status_name: false});
        this.setState({status_industry: false});
        this.setState({status_type: false});
        this.setState({status_profession: false});
        this.setState({status_start_date: false});
        this.setState({status_end_date: false});
        this.setState({status_description: false});

        document.getElementById("workName").value = "";
        document.getElementById("workDescription").value = "";
    }

    render() {

        return (
            <>
                <Container>
                    <Paper className="paper-custom" elevation={1}>
                        <Row>
                            <Card className="paper-custom-header">
                                <Card.Header className="card-header-custom">Doświadczenie</Card.Header>
                                {!this.state._dataLoaded
                                    ? <LoadingElement/>
                                    : <Card.Body>
                                        <Form style={{marginTop: "20px", display: this.state.form_display}}>
                                            <Form.Row>
                                                <Form.Label className="profile-label-section">Dodaj nową pozycję</Form.Label>
                                            </Form.Row>
                                            <Form.Row>
                                                <Form.Group as={Col} controlId="workName">
                                                    <Form.Label className="profile-label">Firma<span className="text-error">*</span></Form.Label>
                                                    <Form.Control className="profile-fields" autoComplete="off" onChange={this.changeName.bind(this)}/>
                                                    <Form.Text className="text-muted text-error" id="workName_err">
                                                        Podano nieprawidłową wartość.
                                                    </Form.Text>
                                                </Form.Group>

                                                <Col xs={3}>
                                                    <Form.Group controlId="workPlace">
                                                        <Form.Label className="profile-label">Lokalizacja<span className="text-error">*</span></Form.Label>
                                                        <Select id="workLocation" className="profile-fields"
                                                            components={{ MenuList }}
                                                            value={this.state.form_place}
                                                            options={this.state.work_data.locations}
                                                            onChange={this.changePlace}
                                                        />
                                                    </Form.Group>
                                                </Col>

                                                <Col xs={4}>
                                                    <Form.Group controlId="workIndustry">
                                                        <Form.Label className="profile-label">Branża<span className="text-error">*</span></Form.Label>
                                                        <Select id="workIndustry" className="profile-fields" value={this.state.form_industry} options={this.state.work_data.workIndustry} placeholder="Wybierz..." onChange={this.changeIndustry}/>
                                                    </Form.Group>
                                                </Col>
                                            </Form.Row>

                                            <Form.Row>
                                                <Col xs={4}>
                                                    <Form.Group controlId="workType">
                                                        <Form.Label className="profile-label">Typ zatrudnienia<span className="text-error">*</span></Form.Label>
                                                        <Select id="workType" className="profile-fields" value={this.state.form_type} options={this.state.work_data.workType} placeholder="Wybierz..." onChange={this.changeType}/>
                                                    </Form.Group>
                                                </Col>

                                                <Col xs={4}>
                                                    <Form.Group controlId="workProfession">
                                                        <Form.Label className="profile-label">Stanowisko<span className="text-error">*</span></Form.Label>
                                                        <Select id="workProfession" className="profile-fields" value={this.state.form_profession} options={this.state.work_data.workProfessions} placeholder="Wybierz..." onChange={this.changeProfession}/>
                                                    </Form.Group>
                                                </Col>

                                                <Col xs={2}>
                                                    <Form.Group>
                                                        <Form.Label>Data rozpoczęcia<span className="text-error">*</span></Form.Label>
                                                        <DatePicker id="workStartDate" className="form-control profile-fields" autoComplete="off" selected={this.state.form_start_date} onChange={this.changeStartDate.bind(this)} locale="pl"/>
                                                    </Form.Group>
                                                </Col>

                                                <Col xs={2}>
                                                    <Form.Group>
                                                        <Form.Label>Data ukończena<span className="text-error">*</span></Form.Label>
                                                        <DatePicker id="workEndDate" className="form-control profile-fields" autoComplete="off" selected={this.state.form_end_date} onChange={this.changeEndDate.bind(this)} locale="pl"/>
                                                    </Form.Group>
                                                </Col>
                                            </Form.Row>


                                            <Form.Group controlId="workDescription">
                                                <Form.Label className="profile-label">Zakres obowiązków<span className="text-error">*</span></Form.Label>
                                                <Form.Control as="textarea" className="profile-fields" autoComplete="off" onChange={this.changeDescription.bind(this)} rows={3}/>
                                                <Form.Text className="text-muted text-error" id="workDescription_err">
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
                                                    : <Button variant="primary" type="button" className="primary-button" id="button-edu-edit-save" disabled={this.state.profile_button_save_disabled} onClick={this.addWork.bind(this)}>
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

                                        {this.state.work.map((work, index) => <WorkSingle data={work} key={index} delete={this.removeItem.bind(this)}/>)}
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