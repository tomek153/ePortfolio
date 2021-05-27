import React, { Component } from 'react';
import Breadcrumb from "react-bootstrap/Breadcrumb";
import {Col, Container, Row, Image, FormLabel} from "react-bootstrap";
import {Redirect} from "react-router-dom";
import FooterAuth from "../Other/footer-auth";
import LoadingElement from "../Other/loading-element";
import UserEduRow from "./user-edu-row";
import UserWorkRow from "./user-work-row";
import UserSkillRow from "./user-skill-row";
import UserCourseRow from "./user-course-row";

class UserProfile extends Component {
    _isMounted = false;

    constructor() {
        super();
        this.state = {
            user: null,
            _dataLoaded: false,
            _redirect: false
        }
    }

    componentDidMount() {
        this._isMounted = true;
        var token = localStorage.getItem("token");

        if (token != null && token !== "") {

            var myHeaders = new Headers();
            myHeaders.append('Content-Type', 'application/json');
            myHeaders.append('Authorization', localStorage.getItem("token"));

            const request = new Request(
                'http://localhost:8080/api/searching/user/'+this.props.match.params.id,
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
                                        this.setState({user: data});
                                        this.state.user = data;
                                        this.setState({_dataLoaded: true});
                                    } else {
                                        localStorage.removeItem("token");
                                        window.location.href = '/logowanie';
                                    }
                                });
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
    sendMessage() {
        this.setState({_redirect: true});
    }

    render() {
        return (
            <>
                {this.state._redirect
                    ? <Redirect id={this.state.user.id}
                        to={{
                            pathname: "/wiadomosci",
                            newChat: { id: this.state.user.id }
                        }}
                    />
                    : <>
                        <Breadcrumb className="breadcrumb-all">
                            <Breadcrumb.Item href="/">Start</Breadcrumb.Item>
                            <Breadcrumb.Item href="/wyszukiwarka">Wyszukiwarka</Breadcrumb.Item>
                            <Breadcrumb.Item active>Profil</Breadcrumb.Item>
                        </Breadcrumb>
                        <Container className="search-profile-container">
                            {!this.state._dataLoaded
                                ? <div style={{minHeight: "68vh", backgroundColor: "#e9ecef", width: "calc(100% + 30px)", marginLeft: "-15px"}}><LoadingElement/></div>
                                : <div style={{position: "relative"}}>
                                    <div className="search-profile-color-div"/>
                                    <br/>
                                    <Row className="search-profile-header-row">
                                        <Col xs={9}>
                                            <Row className="search-profile-name">
                                                {this.state.user.firstName} {this.state.user.lastName}
                                            </Row>
                                            <Row style={{paddingLeft: "30px", marginBottom: "10px", marginTop: "20px"}}>
                                                <Col>
                                                    <div style={{float: "left"}}>
                                                        <i className="fas fa-map-marker-alt search-profile-icon"/>
                                                    </div>
                                                    {this.state.user.address_main && this.state.user.address_zip && this.state.user.address_city
                                                        ? <div style={{float: "left"}}>
                                                            {this.state.user.address_main}, {this.state.user.address_zip} {this.state.user.address_city}
                                                        </div>
                                                        : <div style={{float: "left"}}>
                                                            Adres, Kod Miejscowość
                                                        </div>
                                                    }
                                                </Col>
                                                <Col xs={3}>
                                                    <div style={{float: "left"}}>
                                                        <i className="fas fa-comment search-profile-icon"/>
                                                    </div>
                                                    <div style={{float: "left"}} className="search-profile-link" onClick={this.sendMessage.bind(this)}>
                                                        Wyślij wiadomość
                                                    </div>
                                                </Col>
                                            </Row>
                                            <Row style={{paddingLeft: "30px"}}>
                                                <Col>
                                                    <div>
                                                        <div style={{float: "left"}}>
                                                            <i className="fas fa-envelope search-profile-icon"/>
                                                        </div>
                                                        {this.state.user.email
                                                            ? <div style={{float: "left"}} className="search-profile-email">
                                                                <a href={"mailto:"+this.state.user.email}>{this.state.user.email}</a>
                                                            </div>
                                                            : <div style={{float: "left"}}>
                                                                Email
                                                            </div>
                                                        }
                                                    </div>
                                                </Col>
                                                <Col xs={3}>
                                                    <div style={{float: "left"}}>
                                                        <i className="fas fa-calendar search-profile-icon"/>
                                                    </div>
                                                    {this.state.user.date_birth
                                                        ? <div style={{float: "left"}}>
                                                            {this.state.user.date_birth}
                                                        </div>
                                                        : <div style={{float: "left"}}>
                                                            Data urodzenia
                                                        </div>
                                                    }
                                                </Col>
                                                <Col xs={3}>
                                                    <div style={{float: "left"}}>
                                                        <i className="fas fa-phone search-profile-icon"/>
                                                    </div>
                                                    {this.state.user.phone
                                                        ? <div style={{float: "left"}}>
                                                            {this.state.user.phone}
                                                        </div>
                                                        : <div style={{float: "left"}}>
                                                            Telefon
                                                        </div>
                                                    }
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col xs={3} className="search-profile-image-container">
                                            <Image className="search-profile-image" src={this.state.user.image} roundedCircle/>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="search-profile-section-title">
                                            O sobie
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="search-profile-section-text center">
                                            Brak danych.
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="search-profile-section-title">
                                            Wykształcenie
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="search-profile-section-text center">
                                            {this.state.user.userEduList.length !== 0
                                                ? <>
                                                    {this.state.user.userEduList.map((edu, index) => edu.edu_type === "SZKOŁA" || edu.edu_type === "UCZELNIA WYŻSZA").includes(true)
                                                        ? this.state.user.userEduList.map((edu, index) => <UserEduRow data={edu} key={index}/>)
                                                        : <span>Brak danych.</span>
                                                    }
                                                </>
                                                : <span>Brak danych.</span>
                                            }
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="search-profile-section-title">
                                            Doświadczenie zawodowe
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="search-profile-section-text center">
                                            {(this.state.user.userWorkList.map((work, index) => <UserWorkRow data={work} key={index}/>)).length !== 0
                                                ? this.state.user.userWorkList.map((work, index) => <UserWorkRow data={work} key={index}/>)
                                                : <span>Brak danych.</span>
                                            }
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col style={{paddingRight: "5px"}}>
                                            <Row>
                                                <Col className="search-profile-section-title" style={{marginRight: "15px"}}>
                                                    Znajomość języków
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col className="search-profile-section-text center">
                                                    {this.state.user.userSkillList.length !== 0
                                                        ? <>
                                                            {this.state.user.userSkillList.map((skill, index) => skill.skill_type === "JĘZYK OBCY").includes(true)
                                                                ? this.state.user.userSkillList.map((skill, index) => <UserSkillRow data={skill} type_match="JĘZYK OBCY" key={index}/>)
                                                                : <span>Brak danych.</span>
                                                            }
                                                        </>
                                                        : <span>Brak danych.</span>
                                                    }
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col style={{paddingLeft: "5px"}}>
                                            <Row>
                                                <Col className="search-profile-section-title" style={{marginLeft: "15px"}}>
                                                    Znajomość technologii
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col className="search-profile-section-text center">
                                                    {this.state.user.userSkillList.length !== 0
                                                        ? <>
                                                            {this.state.user.userSkillList.map((skill, index) => skill.skill_type === "ZNAJOMOŚĆ TECHNOLOGII").includes(true)
                                                                ? this.state.user.userSkillList.map((skill, index) => <UserSkillRow data={skill} type_match="ZNAJOMOŚĆ TECHNOLOGII" key={index}/>)
                                                                : <span>Brak danych.</span>
                                                            }
                                                        </>
                                                        : <span>Brak danych.</span>
                                                    }
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col style={{paddingRight: "5px"}}>
                                            <Row>
                                                <Col className="search-profile-section-title" style={{marginRight: "15px"}}>
                                                    Uprawnienia/Certyfikaty
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col className="search-profile-section-text center">
                                                    {this.state.user.userSkillList.length !== 0
                                                        ? <>
                                                            {this.state.user.userSkillList.map((skill, index) => skill.skill_type === "UPRAWNIENIA/CERTYFIKATY").includes(true)
                                                                ? this.state.user.userSkillList.map((skill, index) =>
                                                                    <UserSkillRow data={skill} type_match="UPRAWNIENIA/CERTYFIKATY" key={index}/>)
                                                                : <span>Brak danych.</span>
                                                            }
                                                        </>
                                                        : <span>Brak danych.</span>
                                                    }
                                                </Col>
                                            </Row>
                                        </Col>
                                        <Col style={{paddingLeft: "5px"}}>
                                            <Row>
                                                <Col className="search-profile-section-title" style={{marginLeft: "15px"}}>
                                                    Inne
                                                </Col>
                                            </Row>
                                            <Row>
                                                <Col className="search-profile-section-text center">
                                                    {this.state.user.userSkillList.length !== 0
                                                        ? <>
                                                            {this.state.user.userSkillList.map((skill, index) => skill.skill_type === "INNE").includes(true)
                                                                ? this.state.user.userSkillList.map((skill, index) => <UserSkillRow data={skill} type_match="INNE" key={index}/>)
                                                                : <span>Brak danych.</span>
                                                            }
                                                        </>
                                                        : <span>Brak danych.</span>
                                                    }
                                                </Col>
                                            </Row>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="search-profile-section-title">
                                            Kursy/Szkolenia
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Col className="search-profile-section-text center">
                                            {this.state.user.userSkillList.length !== 0
                                                ? <>
                                                    {this.state.user.userEduList.map((edu, index) => edu.edu_type === "KURS/SZKOLENIE").includes(true)
                                                        ? this.state.user.userEduList.map((edu, index) => <UserCourseRow data={edu} key={index}/>)
                                                        : <span>Brak danych.</span>
                                                    }
                                                </>
                                                : <span>Brak danych.</span>
                                            }
                                        </Col>
                                    </Row>
                                    <br/><br/>
                                </div>
                            }
                        </Container>
                        <FooterAuth/>
                    </>
                }
            </>
        )
    }
}

export default UserProfile;