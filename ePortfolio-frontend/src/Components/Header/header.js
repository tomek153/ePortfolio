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
import Avatar from '../../Images/avatar.png';

class HomeHeader extends Component {

    logoutRedirect() {
        localStorage.removeItem('token');
    }

    renderTooltip = (props) => (
        <Tooltip id="button-tooltip" {...props}>
            Wyloguj
        </Tooltip>
    );

    componentDidMount() {
        // console.log(this.props.activePage)
    }

    render() {
        return (
            <>
                <Navbar bg="dark" variant="dark" style={{minHeight: "70px"}}>
                    <Image src={LogoImage} className="logo-image"/>
                    <Navbar.Brand href="#home">ePortfolio</Navbar.Brand>
                    <Nav className="mr-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#features">Features</Nav.Link>
                        <Nav.Link href="#pricing">Pricing</Nav.Link>
                    </Nav>
                    <Form inline>
                        <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                        <Button variant="outline-light">Search</Button>
                    </Form>
                    <DropdownButton className="header-itmes" menuAlign="right" id="dropdown-menu-align-right" title={ <Image src={Avatar}/> } >
                        <Dropdown.Header>Tomasz Weiss</Dropdown.Header>
                        <Dropdown.Item eventKey="1" active disabled><i className="fas fa-user dropdown-icons"></i>Profil</Dropdown.Item>
                        <Dropdown.Item eventKey="2"><i className="fas fa-comment dropdown-icons"></i>Wiadomości</Dropdown.Item>
                        <Dropdown.Item eventKey="3"><i className="fas fa-cog dropdown-icons"></i>Ustawienia</Dropdown.Item>
                        <Dropdown.Divider />
                        <Dropdown.Item eventKey="4"><i className="fas fa-sign-out-alt dropdown-icons"></i>Wyloguj</Dropdown.Item>
                    </DropdownButton>
                </Navbar>
            </>
        )
    }
}

export default HomeHeader;