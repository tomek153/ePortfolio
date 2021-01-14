import React, { Component } from 'react';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import superagent from 'superagent';

import ModalHeaderError from '../modals/error-header';
import ModalHeaderSuccess from '../modals/success-header';
import ModalLoading from '../modals/loading';
import Footer from './home-footer';

import ScreenImage from '../../images/system-screen.png';

class HomeContent extends Component {
    constructor() {
        super();
        this.state = {
            form: {
                name: "",
                email: "",
                message: ""
            },
            formControll: {
                name: false,
                email: false,
                message: false
            },
            elements: {
                name: "",
                email: "",
                message: ""
            },
            modalSuccess: false,
            modalLoading: false,
            modalError: false,
            scrollbarWidth: 0
        }
    }
    closeModal = () => {
        this.setState({modalSuccess: false});
        this.setState({modalLoading: false});
        this.setState({modalError: false});
    }
    modalShow(modalName) {
        switch (modalName) {
            case "success":
                this.setState({modalSuccess: true});
                break;
            case "loading":
                this.setState({modalLoading: true});
                break;
        }
    }
    sendEmailForm() {
        if (this.state.formControll.name &&
            this.state.formControll.email &&
            this.state.formControll.message
          ){
            this.modalShow("loading");
            superagent
              .post('http://localhost:8080/email/contact-message')
              .send(this.state.form)
              .end((err, res) => {
                  this.closeModal();
                  if(err) {
                      this.setState({modalError: true});
                  } else {
                      this.modalShow("success");
                      this.clearState();
                      this.checkFormDataValid();
                  }
              });
        } else {
            this.setState({modalError: true});
            this.checkFormDataValid();
        }
    }
    clearState() {
        this.state.form.name = "";
        this.state.form.email = "";
        this.state.form.message = "";

        this.state.formControll.name = false;
        this.state.formControll.email = false;
        this.state.formControll.message = false;

        document.getElementById("form-name").value = "";
        document.getElementById("form-email").value = "";
        document.getElementById("form-message").value = "";
    }
    checkFormDataValid() {
        var element = document.getElementById("form-send-button");

        if (this.state.formControll.name &&
            this.state.formControll.email &&
            this.state.formControll.message
        ) {
            element.disabled = false;
        } else {
            element.disabled = true;
        }
    }
    handleEmailChanged(event) {
        let value = event.target.value
        this.state.form.email = value;
        var regex = /(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])*")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\[(?:(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9]))\.){3}(?:(2(5[0-5]|[0-4][0-9])|1[0-9][0-9]|[1-9]?[0-9])|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\])/;
        let wronCharRegex = /[^a-zA-Z0-9@_.-]/;
        let isProperValue = false;
        let length = event.target.value.length;
        let element = document.getElementById("form-email");

        if (value.match(regex) != null) {
            if (value.match(wronCharRegex) == null) {
                if (length >= 8 && length <= 40) {
                    isProperValue = true;
                }
            }
        }

        if (isProperValue) {
            this.state.formControll.email = true;
            element.style.borderColor = "#ced4da";
        } else {
            this.state.formControll.email = false;
            element.style.borderColor = "#f54242";
        }

        this.checkFormDataValid();
    }
    handleNameChanged(event) {
        let value = event.target.value;
        this.state.form.name = value;
        let length = value.length;
        var regex = /[^a-zA-Z -]/;
        let isProperValue = false;
        let element = document.getElementById("form-name");

        if (value.match(regex) == null) {
            if (length >= 2 && length <= 40) {
                isProperValue = true;
            }
        }

        if (isProperValue) {
            this.state.formControll.name = true;
            element.style.borderColor = "#ced4da";
        } else {
            this.state.formControll.name = false;
            element.style.borderColor = "#f54242";
        }

        this.checkFormDataValid();
    }
    handleMessageChanged(event) {
        let value = event.target.value;
        this.state.form.message = value;
        let length = value.length;
        var regex = /[^<>{}[]\&\+]/;
        let isProperValue = false;
        let element = document.getElementById("form-message");

        if (value.match(regex) == null) {
            if (length >= 5 && length <= 1200) {
                isProperValue = true;
            }
        }

        if (isProperValue) {
            this.state.formControll.message = true;
            element.style.borderColor = "#ced4da";
        } else {
            this.state.formControll.message = false;
            element.style.borderColor = "#f54242";
        }

        this.checkFormDataValid();
    }
    componentDidMount() {
        this.getScrollbarWidth();
        this.clearState();
        this.checkFormDataValid();
    }
    getScrollbarWidth() {
        // Creating invisible container
        const outer = document.createElement('div');
        outer.style.visibility = 'hidden';
        outer.style.overflow = 'scroll'; // forcing scrollbar to appear
        outer.style.msOverflowStyle = 'scrollbar'; // needed for WinJS apps
        document.body.appendChild(outer);

        // Creating inner element and placing it in the container
        const inner = document.createElement('div');
        outer.appendChild(inner);

        // Calculating difference between container's full width and the child width
        const scrollbarWidth = (outer.offsetWidth - inner.offsetWidth);

        // Removing temporary elements from the DOM
        outer.parentNode.removeChild(outer);

        this.setState({scrollbarWidth: scrollbarWidth});
    }

    render() {

        return (
            <div className="home-container">
                <div className="photo-section">
                    <div className="opacity-background">
                    <InputGroup className="search">
                        <FormControl
                            placeholder="Wprowadź szukane informacje..."
                            aria-label="Wprowadź szukane informacje..."
                            aria-describedby="basic-addon2"
                        />
                        <InputGroup.Append>
                            <Button variant="outline-secondary">Szukaj</Button>
                        </InputGroup.Append>
                    </InputGroup>
                    </div>
                </div>
                <div className="home-content">
                    <div id="about-header" className="content-header">
                        <div className="width-divider">
                            <h1 id="czym-jest">Czym jest ePortfolio?</h1>
                        </div>
                    </div>
                    <div id="about-content">
                        <div className="width-divider" style={{padding: "80px 0px"}}>
                            <Container>
                                <Row>
                                    <Col style={{paddingRight: "40px"}}>
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Maecenas consequat, tellus ut dictum scelerisque, ante elit facilisis neque, nec interdum eros velit eu dui. Pellentesque quis risus lectus. Ut suscipit non ipsum id luctus. Nam volutpat dapibus pellentesque. Sed vitae dictum augue, quis auctor felis. Morbi fermentum arcu eget odio dapibus condimentum. Morbi fermentum interdum quam, et interdum nisi sollicitudin ac.
                                        <br></br><br></br>
                                        Morbi augue risus, pharetra at nisi in, ultricies tincidunt massa. Maecenas vestibulum nisi id pretium porttitor. Phasellus id egestas metus, vel dictum turpis. Aenean convallis blandit quam eu sollicitudin. Phasellus quis rhoncus magna. Aliquam interdum turpis ut velit tincidunt, vel lobortis ligula sodales. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.
                                    </Col>
                                    <Col>
                                        <Image src={ScreenImage} className="home-image-screen"/>
                                    </Col>
                                </Row>
                            </Container>
                        </div>
                    </div>
                    <div id="offer-header" className="content-header">
                        <div className="width-divider">
                            <h1 id="oferta" style={{border: "none"}}>Co oferujemy?</h1>
                        </div>
                    </div>
                    <div id="offer-content">
                        <div className="opacity-background" style={{boxShadow: "inset 0 15px 15px -15px black"}}>
                            <div className="width-divider" style={{padding: "80px 0px"}}>
                                <Container>
                                    <div className="offer-brochure">
                                        <ul className="fa-ul">
                                            <li><span className="fa-li"><i className="fas fa-check"></i></span><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p></li>
                                            <hr></hr>
                                            <li><span className="fa-li"><i className="fas fa-check"></i></span><p>Maecenas consequat, tellus ut dictum scelerisque, ante elit facilisis neque, nec interdum eros velit eu dui.</p></li>
                                            <hr></hr>
                                            <li><span className="fa-li"><i className="fas fa-check"></i></span><p>Pellentesque quis risus lectus.</p></li>
                                            <hr></hr>
                                            <li><span className="fa-li"><i className="fas fa-check"></i></span><p>Ut suscipit non ipsum id luctus. Nam volutpat dapibus pellentesque.</p></li>
                                            <hr></hr>
                                            <li><span className="fa-li"><i className="fas fa-check"></i></span><p>Sed vitae dictum augue, quis auctor felis.</p></li>
                                        </ul>
                                    </div>
                                </Container>
                            </div>
                        </div>
                    </div>
                    <div id="contact-header" className="content-header" style={{boxShadow: "0 15px 15px 15px black"}}>
                        <div className="width-divider">
                            <h1 id="kontakt">Masz wątpliwości? Zapytaj!</h1>
                        </div>
                    </div>
                    <div id="contact-content">
                        <div className="width-divider" style={{padding: "30px 0px 120px 0px"}}>
                            <div className="login-form-my">
                                <p>Wypełnij poniższy formularz, aby się z nami skontaktować.</p>
                                <Form style={{padding: "40px 0px 0px 0px"}}>
                                    <InputGroup className="mb-3">
                                        <InputGroup.Prepend>
                                            <InputGroup.Text id="basic-addon1">Godność</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl placeholder="Jan Kowalki" aria-label="Name" aria-describedby="basic-addon1" id="form-name" onChange={this.handleNameChanged.bind(this)}/>
                                    </InputGroup>
                                    <InputGroup>
                                        <InputGroup.Prepend>
                                            <InputGroup.Text id="basic-addon1">Email</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl placeholder="jan.kowalki@example.com" aria-label="Name" aria-describedby="basic-addon1" id="form-email" onChange={this.handleEmailChanged.bind(this)}/>
                                    </InputGroup>
                                    <Form.Text className="text-muted mb-3">Na ten email otrzymasz wiadomość od zespołu ePortfolio.</Form.Text>
                                    <InputGroup className="mb-5">
                                        <InputGroup.Prepend>
                                            <InputGroup.Text>Wiadomość</InputGroup.Text>
                                        </InputGroup.Prepend>
                                        <FormControl as="textarea" aria-label="With textarea" style={{minHeight: "150px"}} placeholder="Wiadomość..." id="form-message" onChange={this.handleMessageChanged.bind(this)}/>
                                    </InputGroup>
                                </Form>
                                <Button id="form-send-button" onClick={this.sendEmailForm.bind(this)}>Wyślij</Button>
                            </div>
                        </div>
                    </div>
                    <Footer/>
                </div>

                <ModalHeaderError show={this.state.modalError} onClose={this.closeModal}/>

                <ModalHeaderSuccess show={this.state.modalSuccess} onClose={this.closeModal} title="Wiadomość została wysłana!"/>

                <ModalLoading show={this.state.modalLoading}/>
            </div>
        )
    }
}

export default HomeContent;
