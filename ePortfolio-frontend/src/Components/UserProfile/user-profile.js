import React, { Component } from 'react';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';
import Paper from '@material-ui/core/Paper';
import Tooltip from 'react-bootstrap/Tooltip';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Card from 'react-bootstrap/Card';

import Avatar from '../UserProfile/avatar';

class UserProfile extends Component {

    constructor() {
        super();
        this.state = {
            id: "",
            firstName: "",
            lastName: "",
            email: "",
            image: "",
            phone: "",
            address_main: "",
            address_city: "",
            address_zip: "",
            address_country: "",
            gender: "",
            setting_public: true,
            setting_header1: "",
            setting_header2: "",
            userEduList: [],
            userWorkList: [],
            userSkillList: [],

            tokenExpired: false,
            display: "none",
            modalAvatar: false
        }
    }

    componentDidMount() {
        var token = localStorage.getItem("token");

        if(token != null && token != "") {

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
                    if(response.status === 200){
                        response.json()
                            .then(data => {
                                if(!data.error) {
                                    this.setState({id: data.id});
                                    this.setState({firstName: data.firstName});
                                    this.setState({lastName: data.lastName});
                                    this.setState({email: data.email});
                                    this.setState({image: data.image});
                                    this.setState({phone: data.phone});
                                    this.setState({address_main: data.address_main});
                                    this.setState({address_city: data.address_city});
                                    this.setState({address_zip: data.address_zip});
                                    this.setState({address_country: data.address_country});
                                    this.setState({gender: data.gender});
                                    this.setState({setting_public: data.setting_public});
                                    this.setState({setting_header1: data.setting_header1});
                                    this.setState({setting_header2: data.setting_header2});
                                    this.setState({userEduList: data.userEduList});
                                    this.setState({userWorkList: data.userWorkList});
                                    this.setState({userSkillList: data.userSkillList});
                                    this.setState({display: "block"});
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
                });
        } else {
            window.location.replace('/logowanie');
        }
    }

    closeModal = () => {
        this.setState({modalAvatar: false});
    };

    openAvatarModal = () => {
        this.setState({modalAvatar: true})
    }

    updatePhoto = async (urlPhoto, finish) => {
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json');
        myHeaders.append('Authorization', localStorage.getItem("token"));

        const request = new Request(
            'http://localhost:8080/api/user/update/image',
            {
                method: 'PUT', 
                headers: myHeaders,
                body: urlPhoto
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
            <div style={{display: this.state.display}}>
                <Breadcrumb className="breadcrumb-all">
                    <Breadcrumb.Item href="#">Start</Breadcrumb.Item>
                    <Breadcrumb.Item active>Mój profil</Breadcrumb.Item>
                </Breadcrumb>
                <Container>
                    <Paper className="paper-custom" elevation={1}>
                        <Row>
                            <Card className="paper-custom-header">
                                <Card.Header className="card-header-custom">Dane podstawowe</Card.Header>
                                <Card.Body style={{paddingLeft: "50px"}}>
                                    <Row>
                                        <Col xs={3}>
                                            <Row>
                                                <div className="paper-custom-data-header">Avatar</div>
                                            </Row>
                                            <Row>
                                                <Image src={this.state.image} className="profile-avatar-image" roundedCircle/>
                                                <div className="profile-avatar-image-edit">
                                                    <OverlayTrigger
                                                        placement="bottom"
                                                        delay={{ show: 100, hide: 100 }}
                                                        overlay={renderTooltip}
                                                    >
                                                        <i className="fas fa-edit" onClick={this.openAvatarModal}> <span>Edytuj</span></i>
                                                    </OverlayTrigger>
                                                </div>
                                            </Row>
                                        </Col>
                                        <Col className="profile-basics">
                                                <br/>
                                                <br/>
                                                <br/>
                                                <br/>
                                                <br/>
                                                <br/>
                                                <br/>
                                                <br/>
                                                <br/>
                                                <br/>
                                                <br/>
                                                <br/>
                                                <br/>
                                                <br/>
                                                <br/>
                                        </Col>
                                    </Row>
                                </Card.Body>
                            </Card>
                        </Row>
                    </Paper>
                </Container>
                <Avatar show={this.state.modalAvatar} onClose={this.closeModal} update={this.updatePhoto}/>
            </div>
        )
    }

}

export default UserProfile;