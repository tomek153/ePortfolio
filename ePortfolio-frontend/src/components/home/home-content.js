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

// import PageLoading from '../page-loading';
import LogoImage from '../../images/logo-2.png';
import ScreenImage from '../../images/system-screen.png';

class HomeContent extends Component {

    componentDidMount() {
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
                        <div className="content-photo-divider"></div>
                        <div id="about-header" className="content-header">
                            <div className="width-divider">
                                <h1>Czym jest ePortfolio?</h1>
                            </div>
                        </div>
                        <div id="about-content">
                            <div className="width-divider" style={{padding: "120px 0px"}}>
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
                                <h1>Co oferujemy?</h1>
                            </div>
                        </div>
                        <div id="offer-content">
                            <div className="width-divider" style={{padding: "80px 0px"}}>
                                <Container>
                                    <div className="offer-brochure">
                                        <ul class="fa-ul">
                                            <hr></hr>
                                            <li><span class="fa-li"><i class="fas fa-check"></i></span><p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p></li>
                                            <hr></hr>
                                            <li><span class="fa-li"><i class="fas fa-check"></i></span><p>Maecenas consequat, tellus ut dictum scelerisque, ante elit facilisis neque, nec interdum eros velit eu dui.</p></li>
                                            <hr></hr>
                                            <li><span class="fa-li"><i class="fas fa-check"></i></span><p>Pellentesque quis risus lectus.</p></li>
                                            <hr></hr>
                                            <li><span class="fa-li"><i class="fas fa-check"></i></span><p>Ut suscipit non ipsum id luctus. Nam volutpat dapibus pellentesque.</p></li>
                                            <hr></hr>
                                            <li><span class="fa-li"><i class="fas fa-check"></i></span><p>Sed vitae dictum augue, quis auctor felis.</p></li>
                                            <hr></hr>
                                        </ul>
                                    </div>
                                </Container>
                            </div>
                        </div>
                        <div id="contact-header" className="content-header">
                            <div className="width-divider">
                                <h1>Masz wątpliwości? Zapytaj!</h1>
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
                                            <FormControl placeholder="Jan Kowalki" aria-label="Name" aria-describedby="basic-addon1"/>
                                        </InputGroup>
                                        <InputGroup>
                                            <InputGroup.Prepend>
                                                <InputGroup.Text id="basic-addon1">Email</InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <FormControl placeholder="jan.kowalki@example.com" aria-label="Name" aria-describedby="basic-addon1"/>
                                        </InputGroup>
                                        <Form.Text className="text-muted mb-3">Na ten email otrzymasz wiadomość od zespołu ePortfolio.</Form.Text>
                                        <InputGroup className="mb-5">
                                            <InputGroup.Prepend>
                                                <InputGroup.Text>Wiadomość</InputGroup.Text>
                                            </InputGroup.Prepend>
                                            <FormControl as="textarea" aria-label="With textarea" style={{height: "120px"}}/>
                                        </InputGroup>
                                        <a id="form-send-button">Wyślij</a>
                                    </Form>
                                </div>
                            </div>
                        </div>
                        <div id="footer">
                            <div className="width-divider" style={{padding: "40px 0px"}}>
                                <p>ePortfolio &copy; 2020</p><p>Wszelkie prawa zastrzeżone</p>
                            </div>
                        </div>
                    </div>
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
