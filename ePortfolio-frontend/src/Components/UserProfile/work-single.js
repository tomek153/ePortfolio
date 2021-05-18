import React, {Component, useState} from 'react';
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import {Card} from "react-bootstrap";
import Button from "react-bootstrap/Button";
import ModalHeaderError from "../Modals/error-header";

class WorkSingle extends Component {

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
            'http://localhost:8080/api/users/delete/edu/'+this.props.data.id,
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
                    window.location.replace('/logowanie');
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

        return (
            <>
                {this.state.show
                    ? <>
                        <Form>
                            <Card className="profile-card-data">
                                <Card.Body>
                                    <Form.Group style={row_group} as={Row}>
                                        <Form.Label style={row_group_title} column sm="3">
                                            Firma:
                                        </Form.Label>
                                        <Col sm="9">
                                            <Form.Control plaintext readOnly defaultValue={this.props.data.work_place} />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group style={row_group} as={Row}>
                                        <Form.Label style={row_group_title} column sm="3">
                                            Lokalizacja:
                                        </Form.Label>
                                        <Col sm="9">
                                            <Form.Control plaintext readOnly defaultValue={this.props.data.work_location} />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group style={row_group} as={Row}>
                                        <Form.Label style={row_group_title} column sm="3">
                                            Branża:
                                        </Form.Label>
                                        <Col sm="9">
                                            <Form.Control plaintext readOnly defaultValue={this.props.data.work_industry} />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group style={row_group} as={Row}>
                                        <Form.Label style={row_group_title} column sm="3">
                                            Stanowisko:
                                        </Form.Label>
                                        <Col sm="9">
                                            <Form.Control plaintext readOnly defaultValue={this.props.data.work_profession} />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group style={row_group} as={Row}>
                                        <Form.Label style={row_group_title} column sm="3">
                                            Rodzaj zatrudnienia:
                                        </Form.Label>
                                        <Col sm="9">
                                            <Form.Control plaintext readOnly defaultValue={this.props.data.work_type} />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group style={row_group} as={Row}>
                                        <Form.Label style={row_group_title} column sm="3">
                                            Czas rozpoczęcia:
                                        </Form.Label>
                                        <Col sm="9">
                                            <Form.Control plaintext readOnly defaultValue={this.props.data.work_time_start} />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group style={row_group} as={Row}>
                                        <Form.Label style={row_group_title} column sm="3">
                                            Czas zakończenia:
                                        </Form.Label>
                                        <Col sm="9">
                                            <Form.Control plaintext readOnly defaultValue={this.props.data.work_time_end} />
                                        </Col>
                                    </Form.Group>
                                    <Form.Group style={row_group} as={Row}>
                                        <Form.Label style={row_group_title} column sm="3">
                                            Zakres obowiązków:
                                        </Form.Label>
                                        <Col sm="9">
                                            <Form.Control plaintext readOnly defaultValue={this.props.data.work_desc} />
                                        </Col>
                                    </Form.Group>
                                    <Button variant="link" className="profile-remove-button" onClick={this.removeItem.bind(this)}>
                                        <i className="fas fa-trash"/> Usuń
                                    </Button>
                                </Card.Body>
                            </Card>
                        </Form>
                        <ModalHeaderError show={this.state.modal_del_err} onClose={this.closeModal} title="Coś poszło nie tak."/>
                    </>
                    : null}
            </>
        )
    }
}

export default WorkSingle;