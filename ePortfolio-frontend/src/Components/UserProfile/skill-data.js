import React, {Component, useState} from 'react';
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Container from "react-bootstrap/Container";
import Spinner from "react-bootstrap/Spinner";

import Paper from '@material-ui/core/Paper';
import LoadingElement from "../Other/loading-element";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Col";
import Select from 'react-select';
import ModalHeaderError from "../Modals/error-header";
import SkillSingle from "./skill-single";

class SkillData extends Component {
    _isMounted = false;

    constructor() {
        super();
        this.state = {
            skill: [],
            skill_data: null,
            form_type: null,
            form_name: "",
            form_time: "",
            form_level: "",
            form_display: "none",

            status_type: false,
            status_name: false,
            status_time: false,
            status_level: false,

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
                'http://localhost:8080/api/users/profile/skill',
                {
                    method: 'GET',
                    headers: myHeaders
                }
            );

            const request_work = new Request(
                'http://localhost:8080/api/skill/data',
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
                                        this.state.skill = data;

                                        fetch(request_work)
                                            .then(response => {
                                                if (response.status === 200) {
                                                    response.json()
                                                        .then(data => {
                                                            if (!data.error) {

                                                                (data.skillType).forEach((row) => {
                                                                    Object.defineProperties(row, {
                                                                        "value": Object.getOwnPropertyDescriptor(row, "id"),
                                                                        "label": Object.getOwnPropertyDescriptor(row, "name")
                                                                    });
                                                                    ["id", "name"].forEach(key => delete row[key]);
                                                                });

                                                                this.state.skill_data = data;
                                                                this.setState({_dataLoaded: true});

                                                                document.getElementById("skillName_err").style.display = "none";
                                                                document.getElementById("skillTime_err").style.display = "none";
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
        let skill = this.state.skill;

        skill.splice(index, 1);
        this.state.skill = skill;
    }
    changeName(event) {
        var value = event.target.value;
        var regex = /[^a-zA-ZżźćńółęąśŻŹĆĄŚĘŁÓŃ./"', -]/;

        this.state.form_name = value;

        if (value.match(regex) == null &&
            value.length >= 2 &&
            value.length <= 100) {
            this.setState({status_name: true});
            this.state.status_name = true;
            document.getElementById("skillName_err").style.display = "none";
        } else {
            this.setState({status_name: false});
            this.state.status_name = false;
            document.getElementById("skillName_err").style.display = "block";
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
    changeLevel = (selected) => {
        this.setState({form_level: selected});
        this.state.form_level = selected;
        this.setState({status_level: true});
        this.state.status_level = true;

        this.checkStatuses();
    }
    changeTime(event) {
        var value = event.target.value;
        var regex = /[^0-9]/;

        this.state.form_time = value;

        if (value.match(regex) == null &&
            value.length >= 1 &&
            value.length <= 3) {
            this.setState({status_time: true});
            this.state.status_time = true;
            document.getElementById("skillTime_err").style.display = "none";
        } else {
            this.setState({status_time: false});
            this.state.status_time = false;
            document.getElementById("skillTime_err").style.display = "block";
        }

        this.checkStatuses();
    }
    checkStatuses() {

        if (this.state.status_type &&
            this.state.status_name &&
            this.state.status_time &&
            this.state.status_level) {

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
    addSkill() {
        if (!this.state.profile_button_save_disabled) {

            this.setState({edu_add_btn_load: true});

            var newSkill = {
                skill_type: this.state.form_type.value,
                skill_name: this.state.form_name,
                skill_time: this.state.form_time,
                skill_level: this.state.form_level.label
            }

            var myHeaders = new Headers();
            myHeaders.append('Content-Type', 'application/json');
            myHeaders.append('Authorization', localStorage.getItem("token"));

            const request = new Request(
                'http://localhost:8080/api/users/add/skill',
                {
                    method: 'POST',
                    headers: myHeaders,
                    body: JSON.stringify(newSkill)
                }
            );

            fetch(request)
                .then(response => {
                    if (response.status === 200) {
                        response.json()
                            .then(data => {
                                this.setState({edu_add_btn_load: false});
                                this.hideForm();
                                this.setState({skill: []});
                                this.setState({skill: data});
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
        this.setState({form_type: null});
        this.state.form_type = null;
        this.setState({form_name: ""});
        this.setState({form_time: ""});
        this.setState({form_level: ""});
        this.setState({form_display: "none"});

        this.setState({status_type: false});
        this.setState({status_name: false});
        this.setState({status_time: false});
        this.setState({status_level: false});

        document.getElementById("skillName").value = "";
        document.getElementById("skillTime").value = "";
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
                                                <Form.Group as={Col} controlId="skillName">
                                                    <Form.Label className="profile-label">Nazwa<span className="text-error">*</span></Form.Label>
                                                    <Form.Control className="profile-fields" autoComplete="off" onChange={this.changeName.bind(this)}/>
                                                    <Form.Text className="text-muted text-error" id="skillName_err">
                                                        Podano nieprawidłową wartość.
                                                    </Form.Text>
                                                </Form.Group>

                                                <Col xs={4}>
                                                    <Form.Group controlId="skillType">
                                                        <Form.Label className="profile-label">Typ<span className="text-error">*</span></Form.Label>
                                                        <Select id="skillType" className="profile-fields"
                                                                placeholder="Wybierz..."
                                                                value={this.state.form_type}
                                                                options={this.state.skill_data.skillType}
                                                                onChange={this.changeType}
                                                        />
                                                    </Form.Group>
                                                </Col>

                                                <Col xs={3}>
                                                    <Form.Group controlId="skillLevel">
                                                        <Form.Label className="profile-label">Poziom<span className="text-error">*</span></Form.Label>
                                                        <Select id="skillLevel" className="profile-fields"
                                                                value={this.state.form_level}
                                                                options={[
                                                                    {value: 1, label: "Podstawowy"},
                                                                    {value: 2, label: "Średnio zaawansowany niższy"},
                                                                    {value: 3, label: "Średnio zaawansowany"},
                                                                    {value: 4, label: "Średnio zaawansowany wyższy"},
                                                                    {value: 5, label: "Zaawansowany"},
                                                                    {value: 6, label: "Biegły"}
                                                                ]}
                                                                placeholder="Wybierz..."
                                                                onChange={this.changeLevel}
                                                        />
                                                    </Form.Group>
                                                </Col>

                                                <Col xs={1}>
                                                    <Form.Group controlId="skillTime">
                                                        <Form.Label className="profile-label">Okres<span className="text-error">*</span></Form.Label>
                                                        <Form.Control className="profile-fields" autoComplete="off" onChange={this.changeTime.bind(this)}/>
                                                        <Form.Text>
                                                            (w m-cach)
                                                        </Form.Text>
                                                        <Form.Text className="text-muted text-error" id="skillTime_err">
                                                            Podano nieprawidłową wartość.
                                                        </Form.Text>
                                                    </Form.Group>
                                                </Col>
                                            </Form.Row>

                                            <Form.Text className="text-muted">
                                                <span className="text-error">*</span> Pola obowiązkowe.
                                            </Form.Text>

                                            <Row style={{justifyContent: "center", marginTop: "20px"}}>
                                                {this.state.edu_add_btn_load
                                                    ? <Button variant="primary" type="button" className="primary-button" disabled={true}>
                                                        Ładowanie &nbsp;<Spinner animation="border" style={{width: "1.3rem", height: "1.3rem"}}/>
                                                    </Button>
                                                    : <Button variant="primary" type="button" className="primary-button" id="button-edu-edit-save" disabled={this.state.profile_button_save_disabled} onClick={this.addSkill.bind(this)}>
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

                                        {this.state.skill.map((skill, index) => <SkillSingle data={skill} index={index} delete={this.removeItem.bind(this)}/>)}
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

export default SkillData;