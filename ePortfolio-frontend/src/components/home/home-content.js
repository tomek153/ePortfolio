import React, { Component } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import Image from 'react-bootstrap/Image';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import InputGroup from 'react-bootstrap/InputGroup';
import FormControl from 'react-bootstrap/FormControl';
import Modal from 'react-bootstrap/Modal';
import Spinner from 'react-bootstrap/Spinner';
import superagent from 'superagent';

import LogoImage from '../../images/logo-2.png';
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
            scrollbarWidth: 0
        }
    }

    closeModal() {
        this.setState({modalSuccess: false});
        this.setState({modalLoading: false});
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
        this.modalShow("loading");
        superagent
            .post('http://localhost:8080/email/contact-message')
            .send(this.state.form)
            .end((err, res) => {
                this.closeModal();
                if(err) {
                        alert("Error");
                    return;
                } else {
                    this.modalShow("success");
                    this.clearState();
                    this.checkFormDataValid();
                }
            }
        );
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

        console.log(this.state.formControll.name+" | "+this.state.formControll.email+" | "+this.state.formControll.message);
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

        // const nav = document.querySelector(".navbar-my");
        // const loader = document.querySelector(".page-loading");
        //
        // window.onload = function() {
        //     this.setTimeout(function() {
        //         loader.classList.add("hidden");
        //         this.setTimeout(function() {
        //             nav.style = "visibility: visible";
        //             nav.classList.add("animate-nav-in");
        //             document.querySelector(".home-info-container").style = "display: block";
        //         }, 200);
        //     }, 600);
        // }
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
            <>
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
                        <div id="footer">
                            <div className="width-divider" style={{padding: "15px 0px"}}>
                                <p>ePortfolio &copy; 2020</p><p>Wszelkie prawa zastrzeżone</p>
                            </div>
                        </div>
                    </div>
                    <Modal size="sm" show={this.state.modalSuccess} aria-labelledby="example-modal-sizes-title-sm" onHide={() => this.closeModal()}>
                        <Modal.Header closeButton>
                            <Modal.Title id="example-modal-sizes-title-sm" style={{textAlign: "center"}}>
                                <i className="fas fa-check-circle success-modal-icon"></i>Wiadomość została wysłana pomyślnie.
                            </Modal.Title>
                        </Modal.Header>
                    </Modal>
                    <Modal show={this.state.modalLoading} id="spinner-container" aria-labelledby="contained-modal-title-vcenter" centered>
                        <Modal.Body>
                            <Spinner animation="grow e-spinner"/>
                        </Modal.Body>
                    </Modal>
                </div>
            </>
        )
    }
}

export default HomeContent;

// <div className="background-image-container">
//     <PageLoading />
//     <div className="background-opcaity-container">
//         <div className="home-info-container">
//             <div style={{float: "left", width: "60%", minHeight: "450px"}}>
//                 <h1 className="gradient-text">Czym jest ePortfolio?</h1>
//                 <hr />
//                 <br />
//                 <p style={{color: "#444"}}>&nbsp;&nbsp;Lorem Ipsum jest tekstem stosowanym jako przykładowy wypełniacz w przemyśle poligraficznym. Został po raz pierwszy użyty w XV w. przez nieznanego drukarza do wypełnienia tekstem próbnej książki. Pięć wieków później zaczął być używany przemyśle elektronicznym, pozostając praktycznie niezmienionym. Spopularyzował się w latach 60. XX w. wraz z publikacją arkuszy Letrasetu, zawierających fragmenty Lorem Ipsum.</p>
//                 <p style={{color: "#444"}}>Ogólnie znana teza głosi, iż użytkownika może rozpraszać zrozumiała zawartość strony, kiedy ten chce zobaczyć sam jej wygląd. Jedną z mocnych stron używania Lorem Ipsum jest to, że ma wiele różnych „kombinacji” zdań, słów i akapitów, w przeciwieństwie do zwykłego: „tekst, tekst, tekst”, sprawiającego, że wygląda to „zbyt czytelnie” po polsku.</p>
//             </div>
//             <div style={{float: "left", width: "40%", textAlign: "center", minHeight: "450px"}}>
//                 <div style={{width: "50%", minHeight: "450px", float: "left", display: "table", textAlign: "right"}}>
//                     <i className="fas fa-briefcase middle" style={{fontSize: "7.5em", color: "#eb4a4a"}}></i>
//                 </div>
//                 <div style={{width: "50%", float: "left", display: "table", minHeight: "450px"}}>
//                     <div className="middle">
//                         <i className="fas fa-laptop-house" style={{fontSize: "7.5em", marginBottom: "25px", color: "#dcd465"}}></i>
//                         <i className="fas fa-globe-europe" style={{fontSize: "7.5em", marginTop: "25px", color: "#31b4cb"}}></i>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     </div>
// </div>
// <div className="carousel-home-content">
//
// </div>
