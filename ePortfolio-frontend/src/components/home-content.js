import React, { Component } from 'react';
import Carousel from 'react-bootstrap/Carousel'

import '../css/start.css';
import ImageSlider from '../images/slider.png';

class HomeContent extends Component {
    
    render() {

        return (
            <div className="container-my">
                <div className="home-description-my">
                    <h1>Lorem Ipsum</h1>
                    <hr />
                    <p>&nbsp;&nbsp;Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed tincidunt diam quis gravida consectetur. Nunc ac tincidunt nisl. Mauris vestibulum, purus in laoreet ultricies, velit ante mattis felis, at gravida est est sed tellus. Nam nunc massa, maximus id nisl non, molestie viverra lectus. Quisque et nisl sed lorem semper vehicula.</p>
                </div>
                <div className="slider-container-my">
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
                                src={ImageSlider}
                                alt="Third slide"
                            />

                            <Carousel.Caption>
                                <h3>Second slide label</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            </Carousel.Caption>
                        </Carousel.Item>
                        <Carousel.Item>
                            <img
                                className="d-block w-100"
                                src={ImageSlider}
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
        )
    }
}

export default HomeContent;