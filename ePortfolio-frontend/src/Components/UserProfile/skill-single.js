import React, {Component, useState} from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import {Card} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import ModalHeaderError from "../Modals/error-header";

class SkillSingle extends Component {

    constructor() {
        super();
        this.state = {
            modal_del_err: false,
            show: true
        }
    }

    closeModal() {
        this.setState({modal_del_err: false});
    }
    componentDidMount() {
        // console.log(this.props.data);
        // console.log(this.props.index);
    }
    removeItem() {

        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Authorization', localStorage.getItem("token"));

        const request = new Request(
            'http://localhost:8080/api/users/delete/skill/'+this.props.data.id,
            {
                method: 'DELETE',
                headers: myHeaders
            }
        );

        fetch(request)
            .then(response => {
                if (response.status === 200) {
                    var remove = this.props.delete;
                    remove(this.props.index);
                    this.setState({show: false});
                } else if (response.status === 400 && response.message === "token_invalid") {
                    localStorage.removeItem("token");
                    window.location.href = '/logowanie';
                } else {
                    this.setState({modal_del_err: true});
                }
            });
    }

    render() {

        const row_group = {
            marginBottom: "0px"
        };

        const row_group_title = {
            fontWeight: 600
        };

        const data_text = {
            padding: ".375rem 0",
            margin: "0"
        };

        return (
            <>
                {this.state.show
                    ? <>
                        <Form>
                            <Card className="profile-card-data">
                                <Card.Body>
                                    <Form.Group style={row_group} as={Row}>
                                        <Form.Label style={row_group_title} column sm="3">
                                            Nazwa:
                                        </Form.Label>
                                        <Col sm="9">
                                            <p style={data_text}>{this.props.data.skill_name}</p>
                                        </Col>
                                    </Form.Group>
                                    <Form.Group style={row_group} as={Row}>
                                        <Form.Label style={row_group_title} column sm="3">
                                            Typ:
                                        </Form.Label>
                                        <Col sm="9">
                                            <p style={data_text}>{this.props.data.skill_type}</p>
                                        </Col>
                                    </Form.Group>
                                    <Form.Group style={row_group} as={Row}>
                                        <Form.Label style={row_group_title} column sm="3">
                                            Poziom:
                                        </Form.Label>
                                        <Col sm="9">
                                            <p style={data_text}>{this.props.data.skill_level}</p>
                                        </Col>
                                    </Form.Group>
                                    <Form.Group style={row_group} as={Row}>
                                        <Form.Label style={row_group_title} column sm="3">
                                            Czas:
                                            <Form.Text>
                                                <b>(w m-cach)</b>
                                            </Form.Text>
                                        </Form.Label>
                                        <Col sm="9">
                                            <p style={data_text}>{this.props.data.skill_time_months}</p>
                                        </Col>
                                    </Form.Group>
                                    <Button variant="link" className="profile-remove-button" onClick={this.removeItem.bind(this)}>
                                        <i className="fas fa-trash"/> Usuń
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Form>
                        <ModalHeaderError show={this.state.modal_del_err} onClose={this.closeModal.bind(this)} title="Coś poszło nie tak."/>
                    </>
                    : null}
            </>
        )
    }
}

export default SkillSingle;