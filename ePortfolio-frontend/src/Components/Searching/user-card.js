import React, { Component } from 'react';
import {Card, Col, Container, FormGroup, FormLabel, FormText, Image, Row} from "react-bootstrap";

class UserCard extends Component {

    componentDidMount() {
        // console.log(this.props.data);
    }
    openUserProfile() {
        window.location.href = "/wyszukiwarka/profil/"+this.props.data.id;
    }

    render() {
        return (
            <>
                <Container>
                    <Row className="search-user-card">
                        <Col xs={2} style={{minHeight: "176px"}}>
                            <Image src={this.props.data.image} className="search-user-card-image" roundedCircle={true}/>
                        </Col>
                        <Col xs={10} style={{padding: "20px"}}>
                            <FormGroup>
                                <FormLabel onClick={this.openUserProfile.bind(this)} className="search-user-card-name">{this.props.data.first_name} {this.props.data.last_name}</FormLabel>
                                <FormText className="search-user-card-city">
                                    <i className="fas fa-map-marker-alt" style={{fontSize: "1.0rem"}}/>
                                    {this.props.data.address_city
                                        ? <> {this.props.data.address_city}</>
                                        : <> Miejscowość</>
                                    }
                                </FormText>
                                <FormText className="search-user-card-work">
                                    {this.props.data.work_profession
                                        ? <>{this.props.data.work_profession} w {this.props.data.work_name}</>
                                        : <>Praca</>
                                    }
                                </FormText>
                            </FormGroup>
                        </Col>
                    </Row>
                </Container>
            </>
        )
    }
}

export default UserCard;