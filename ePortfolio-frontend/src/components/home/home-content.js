import React, { Component } from 'react';
import Carousel from 'react-bootstrap/Carousel'


import ImageSlider from '../../images/slider.png';
import ImageSlider1 from '../../images/slider-1.png';
import ImageSlider2 from '../../images/slider-2.png';
import PageLoading from '../page-loading';

class HomeContent extends Component {
    
    componentDidMount() {
        const nav = document.querySelector(".navbar-my");
        const loader = document.querySelector(".page-loading");
        const description = document.querySelector(".home-description-my");
        const carousel = document.querySelector(".slider-container-my");

        window.onload = function() {
            this.setTimeout(function() {
                loader.classList.add("hidden");
                this.setTimeout(function() {
                    nav.style = "visibility: visible";
                    nav.classList.add("animate-nav-in");
                    description.style = "display: block";
                    carousel.style = "display: block";
                }, 200);
            }, 600);
        }
    }

    render() {

        return (
            <>
                <div className="fade-out-helper"></div>
                <PageLoading />
                <div className="container-my">
                    <div className="home-description-my animate-left-content">
                        <h1>Lorem Ipsum</h1>
                        <hr />
                        <p>&nbsp;&nbsp;Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt diam quis gravida consectetur. Nunc ac tincidunt nisl. Mauris vestibulum, purus in laoreet ultricies, velit ante mattis felis, at gravida est est sed tellus. Nam nunc massa, maximus id nisl non, molestie viverra lectus. Quisque et nisl sed lorem semper vehicula.</p>
                    </div>
                    <div className="slider-container-my animate-right-carousel">
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
                    </div>
                </div>
            </>
        )
    }
}

export default HomeContent;