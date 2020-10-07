import React, { Component } from 'react';
import Carousel from 'react-bootstrap/Carousel'

import PageLoading from '../page-loading';

class HomeContent extends Component {

    componentDidMount() {
        const nav = document.querySelector(".navbar-my");
        const loader = document.querySelector(".page-loading");

        window.onload = function() {
            this.setTimeout(function() {
                loader.classList.add("hidden");
                this.setTimeout(function() {
                    nav.style = "visibility: visible";
                    nav.classList.add("animate-nav-in");
                    document.querySelector(".home-info-container").style = "display: block";
                }, 200);
            }, 600);
        }
    }

    render() {

        return (
            <>
                <div className="background-image-container">
                    <PageLoading />
                    <div className="background-opcaity-container">
                        <div className="home-info-container w3-animate-right-home-container">
                            <div style={{float: "left", width: "60%", minHeight: "450px"}}>
                                <h1 className="gradient-text">Czym jest ePortfolio?</h1>
                                <hr />
                                <br />
                                <p style={{color: "#444"}}>&nbsp;&nbsp;Lorem Ipsum jest tekstem stosowanym jako przykładowy wypełniacz w przemyśle poligraficznym. Został po raz pierwszy użyty w XV w. przez nieznanego drukarza do wypełnienia tekstem próbnej książki. Pięć wieków później zaczął być używany przemyśle elektronicznym, pozostając praktycznie niezmienionym. Spopularyzował się w latach 60. XX w. wraz z publikacją arkuszy Letrasetu, zawierających fragmenty Lorem Ipsum.</p>
                                <p style={{color: "#444"}}>Ogólnie znana teza głosi, iż użytkownika może rozpraszać zrozumiała zawartość strony, kiedy ten chce zobaczyć sam jej wygląd. Jedną z mocnych stron używania Lorem Ipsum jest to, że ma wiele różnych „kombinacji” zdań, słów i akapitów, w przeciwieństwie do zwykłego: „tekst, tekst, tekst”, sprawiającego, że wygląda to „zbyt czytelnie” po polsku.</p>
                            </div>
                            <div style={{float: "left", width: "40%", textAlign: "center", minHeight: "450px"}}>
                                <div style={{width: "50%", minHeight: "450px", float: "left", display: "table", textAlign: "right"}}>
                                    <i className="fas fa-briefcase middle" style={{fontSize: "7.5em", color: "#eb4a4a"}}></i>
                                </div>
                                <div style={{width: "50%", float: "left", display: "table", minHeight: "450px"}}>
                                    <div className="middle">
                                        <i className="fas fa-laptop-house" style={{fontSize: "7.5em", marginBottom: "25px", color: "#dcd465"}}></i>
                                        <i className="fas fa-globe-europe" style={{fontSize: "7.5em", marginTop: "25px", color: "#31b4cb"}}></i>
                                    </div>
                                </div>
                            </div>
                            {/* <div className="slider-container-my">
                                <Carousel>
                                    <Carousel.Item>
                                        <img
                                            className="d-block w-100"
                                            src={ImageSlider}
                                            alt="First slide"
                                        />
                                        <Carousel.Caption>
                                            <h3>First slide label</h3>
                                            <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                                        </Carousel.Caption>
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <img
                                            className="d-block w-100"
                                            src={ImageSlider1}
                                            alt="Second slide"
                                        />

                                        <Carousel.Caption>
                                            <h3>Second slide label</h3>
                                            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                                        </Carousel.Caption>
                                    </Carousel.Item>
                                    <Carousel.Item>
                                        <img
                                            className="d-block w-100"
                                            src={ImageSlider2}
                                            alt="Third slide"
                                        />

                                        <Carousel.Caption>
                                            <h3>Third slide label</h3>
                                            <p>Praesent commodo cursus magna, vel scelerisque nisl consectetur.</p>
                                        </Carousel.Caption>
                                    </Carousel.Item>
                                </Carousel>
                            </div> */}
                        </div>
                    </div>
                </div>
                <div className="carousel-home-content">

                </div>
            </>
        )
    }
}

export default HomeContent;
