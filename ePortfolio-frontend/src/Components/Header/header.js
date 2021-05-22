import React, { Component } from 'react';
import Navbar from 'react-bootstrap/Navbar'
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';
import Nav from 'react-bootstrap/Nav';
import Image from 'react-bootstrap/Image';
import Tooltip from 'react-bootstrap/Tooltip';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

import LogoImage from '../../Images/logo-3.png';

class HomeHeader extends Component {

    logoutRedirect(event) {
        localStorage.removeItem('token');
        window.location.replace("/");
    }

    renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Wyloguj
        </Tooltip>
    );

    componentDidMount() {}

    render() {
        return (
            <>
                {!this.props.userInfo.tokenValid
                    ? <></>
                    : <Navbar bg="dark" variant="dark" style={{minHeight: "70px"}}>
                        <Image src={LogoImage} className="logo-image"/>
                        <Navbar.Brand href="#home">ePortfolio</Navbar.Brand>
                        <Nav className="mr-auto">
                            {this.props.activePage === "searching"
                                ? <Nav.Link href="/wyszukiwarka" active disabled>Wyszukiwarka</Nav.Link>
                                : <Nav.Link href="/wyszukiwarka">Wyszukiwarka</Nav.Link>
                            }
                        </Nav>
                        <Form inline>
                            <FormControl type="text" placeholder="Search" className="mr-sm-2"/>
                            <Button variant="outline-light">Search</Button>
                        </Form>
                        <DropdownButton className="header-itmes" menuAlign="right" id="dropdown-menu-align-right"
                                        title={<Image src={this.props.userInfo.userInfo.image} roundedCircle style={{boxShadow: "0px 5px 5px -5px #000"}}/>}>
                            <Dropdown.Header>{this.props.userInfo.userInfo.firstName} {this.props.userInfo.userInfo.lastName}</Dropdown.Header>
                            {this.props.activePage === "profile"
                                ? <Dropdown.Item eventKey="1" href="/moj-profil" active disabled><i className="fas fa-user dropdown-icons"/>Profil</Dropdown.Item>
                                : <Dropdown.Item eventKey="1" href="/moj-profil"><i className="fas fa-user dropdown-icons"/>Profil</Dropdown.Item>
                            }
                            <Dropdown.Item eventKey="2"><i
                                className="fas fa-comment dropdown-icons"/>Wiadomości</Dropdown.Item>
                            <Dropdown.Item eventKey="3"><i
                                className="fas fa-cog dropdown-icons"/>Ustawienia</Dropdown.Item>
                            <Dropdown.Divider/>
                            <Dropdown.Item eventKey="4" onClick={this.logoutRedirect.bind(this)}><i
                                className="fas fa-sign-out-alt dropdown-icons"/>Wyloguj</Dropdown.Item>
                        </DropdownButton>
                    </Navbar>
                }
            </>
        )
    }
}

export default HomeHeader;