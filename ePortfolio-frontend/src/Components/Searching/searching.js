import React, { Component } from 'react';
import Breadcrumb from "react-bootstrap/Breadcrumb";
import {Accordion, Card, Container, Row, Button, Col, FormLabel} from "react-bootstrap";
import FooterAuth from "../Other/footer-auth";
import LoadingElement from "../Other/loading-element";
import UserCard from "./user-card";
import Select from "react-select";

class Searching extends Component {
    _isMounted = false;

    constructor() {
        super();
        this.state = {

            users: [],
            searchingData: null,

            filter_string_city: "city/",
            filter_string_eduName: "edu-name/",
            filter_string_eduSpec: "edu-spec/",
            filter_string_skillName: "skill-name/",
            filter_string_workName: "work-name/",
            filter_string_workIndustry: "work-industries/",

            filter_city: [],
            filter_eduName: [],
            filter_eduSpec: [],
            filter_skillName: [],
            filter_workName: [],
            filter_workIndustry: [],

            filterOpen: false,
            searchingOpen: false,
            advancedSearchingOpen: false,
            _dataLoaded: false,
        }
    }

    async componentDidMount() {
        this._isMounted = true;

        let usersList = await this.getUsersList([]);
        let filtersList = await this.getAllSearchingFilters();

        if (this._isMounted) {
            this.setState({users: usersList});
            this.state.users = usersList;

            this.setState({searchingData: filtersList});
            this.state.searchingData = filtersList;

            this.setState({_dataLoaded: true});
        }
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    filterToggle() {
        this.setState({filterOpen: !this.state.filterOpen});
        this.setState({searchingOpen: false});
        this.setState({advancedSearchingOpen: false});
    }
    searchingToggle() {
        this.setState({searchingOpen: !this.state.searchingOpen});
        this.setState({filterOpen: false});
        this.setState({advancedSearchingOpen: false});
    }
    advancedSearchingToggle() {
        this.setState({advancedSearchingOpen: !this.state.advancedSearchingOpen});
        this.setState({searchingOpen: false});
        this.setState({filterOpen: false});
    }

    changeCity = async (selected) => {
        var filters_string = "city/";

        for (const filter of selected) {
            filters_string += filter.label.toLowerCase();
            if (filter !== selected[selected.length-1]) {
                filters_string += "-"
            }
        }
        this.state.filter_string_city = filters_string;

        await this.updateElasticData();
    }
    changeEduName = async (selected) => {
        var filters_string = "edu-name/";

        for (const filter of selected) {
            filters_string += filter.label.toLowerCase();
            if (filter !== selected[selected.length-1]) {
                filters_string += "-"
            }
        }
        this.state.filter_string_eduName = filters_string;

        await this.updateElasticData();
    }
    changeEduSpec = async (selected) => {
        var filters_string = "edu-spec/";

        for (const filter of selected) {
            filters_string += filter.label.toLowerCase();
            if (filter !== selected[selected.length-1]) {
                filters_string += "-"
            }
        }
        this.state.filter_string_eduSpec = filters_string;

        await this.updateElasticData();
    }
    changeSkillName = async (selected) => {
        var filters_string = "skill-name/";

        for (const filter of selected) {
            filters_string += filter.label.toLowerCase();
            if (filter !== selected[selected.length-1]) {
                filters_string += "-"
            }
        }
        this.state.filter_string_skillName = filters_string;

        await this.updateElasticData();
    }
    changeWorkName = async (selected) => {
        var filters_string = "work-name/";

        for (const filter of selected) {
            filters_string += filter.label.toLowerCase();
            if (filter !== selected[selected.length-1]) {
                filters_string += "-"
            }
        }
        this.state.filter_string_workName = filters_string;

        await this.updateElasticData();
    }
    changeWorkIndustry = async (selected) => {
        var filters_string = "work-industries/";

        for (const filter of selected) {
            filters_string += filter.label.toLowerCase();
            if (filter !== selected[selected.length-1]) {
                filters_string += "-"
            }
        }
        this.state.filter_string_workIndustry = filters_string;

        await this.updateElasticData();
    }

    async updateElasticData() {
        var results = [];
        if (this.state.filter_string_city !== "city/") {
            const city_results = await this.getEllasticData(this.state.filter_string_city);
            for (const result of city_results) {
                results.push(result);
            }
        }
        if (this.state.filter_string_eduName !== "edu-name/") {
            const city_results = await this.getEllasticData(this.state.filter_string_eduName);
            for (const result of city_results) {
                results.push(result);
            }
        }
        if (this.state.filter_string_eduSpec !== "edu-spec/") {
            const city_results = await this.getEllasticData(this.state.filter_string_eduSpec);
            for (const result of city_results) {
                results.push(result);
            }
        }
        if (this.state.filter_string_skillName !== "skill-name/") {
            const city_results = await this.getEllasticData(this.state.filter_string_skillName);
            for (const result of city_results) {
                results.push(result);
            }
        }
        if (this.state.filter_string_workName !== "work-name/") {
            const city_results = await this.getEllasticData(this.state.filter_string_workName);
            for (const result of city_results) {
                results.push(result);
            }
        }
        if (this.state.filter_string_workIndustry !== "work-industries/") {
            const city_results = await this.getEllasticData(this.state.filter_string_workIndustry);
            for (const result of city_results) {
                results.push(result);
            }
        }

        let unique_ids = [];
        results.forEach(row => {
            let isPresent = false;
            for (const row_unique of unique_ids) {
                if (row.uuid === row_unique.uuid) {
                    isPresent = true;
                    break;
                }
            }

            if (!isPresent) {
                unique_ids.push(row);
            }
        });

        console.log(unique_ids);
    }
    async getEllasticData(filters) {
        var myHeaders = new Headers();
        myHeaders.append('Content-Type', 'application/json; charset=utf-8');

        const request = new Request(
            'http://localhost:8081/find/'+filters,
            {
                method: 'GET',
                headers: myHeaders
            }
        );

        const response = await fetch(request);
        if (response.status === 200) {
            const json = await response.json();

            return json;
        }

        return [];
    }
    async getUsersList(ids) {
        var token = localStorage.getItem("token");

        if (token != null && token != "") {
            var myHeaders = new Headers();
            myHeaders.append('Content-Type', 'application/json; charset=utf-8');
            myHeaders.append('Authorization', localStorage.getItem("token"));

            const request = new Request(
                'http://localhost:8080/api/searching/users',
                {
                    method: 'POST',
                    headers: myHeaders,
                    body: JSON.stringify(ids)
                }
            );

            const response = await fetch(request);
            if (response.status === 200) {
                const json = await response.json();

                return json;
            } else {
                localStorage.removeItem("token");
                window.location.href = '/logowanie';
            }
        } else {
            window.location.href = '/logowanie';
        }
    }
    async getAllSearchingFilters() {
        var token = localStorage.getItem("token");

        if (token != null && token != "") {
            var myHeaders = new Headers();
            myHeaders.append('Content-Type', 'application/json; charset=utf-8');
            myHeaders.append('Authorization', localStorage.getItem("token"));

            const request = new Request(
                'http://localhost:8080/api/fixed-data/searching/filters',
                {
                    method: 'GET',
                    headers: myHeaders
                }
            );

            const response = await fetch(request);
            if (response.status === 200) {
                const json = await response.json();

                return json;
            } else {
                localStorage.removeItem("token");
                window.location.href = '/logowanie';
            }
        } else {
            window.location.href = '/logowanie';
        }
    }

    render() {

        return (
            <>
                <Breadcrumb className="breadcrumb-all">
                    <Breadcrumb.Item href="#">Start</Breadcrumb.Item>
                    <Breadcrumb.Item active>Wyszukiwarka</Breadcrumb.Item>
                </Breadcrumb>

                <Container className="search-container">
                    {!this.state._dataLoaded
                        ? <LoadingElement/>
                        : <>
                            <Row>
                                <Accordion className="search-filters-container">
                                    <Card className="search-filters-container-card">
                                        <Card.Header>
                                            <Accordion.Toggle as={Button} variant="link" eventKey="0" className="acc searching-filter-title" onClick={this.filterToggle.bind(this)}>
                                                Filtry
                                            </Accordion.Toggle>
                                            {this.state.filterOpen
                                                ? <i className="fas fa-angle-up filter-carret"/>
                                                : <i className="fas fa-angle-down filter-carret"/>
                                            }
                                        </Card.Header>
                                        <Accordion.Collapse eventKey="0">
                                            <Card.Body>
                                                <Row>
                                                    <Col className="search-filters-select-container">
                                                        <FormLabel>Miejscowości</FormLabel>
                                                        <Select options={this.state.searchingData.addressCityList} isMulti={true} onChange={this.changeCity}/>
                                                    </Col>
                                                    <Col className="search-filters-select-container">
                                                        <FormLabel>Intytucje kształcenia</FormLabel>
                                                        <Select options={this.state.searchingData.eduNameList} isMulti={true} onChange={this.changeEduName}/>
                                                    </Col>
                                                    <Col className="search-filters-select-container">
                                                        <FormLabel>Specjalności kształcenia</FormLabel>
                                                        <Select options={this.state.searchingData.eduSpecList} isMulti={true} onChange={this.changeEduSpec}/>
                                                    </Col>
                                                </Row>
                                                <br/>
                                                <Row>
                                                    <Col className="search-filters-select-container">
                                                        <FormLabel>Umiejętności</FormLabel>
                                                        <Select options={this.state.searchingData.skillNameList} isMulti={true} onChange={this.changeSkillName}/>
                                                    </Col>
                                                    <Col className="search-filters-select-container">
                                                        <FormLabel>Firmy</FormLabel>
                                                        <Select options={this.state.searchingData.workNameList} isMulti={true} onChange={this.changeWorkName}/>
                                                    </Col>
                                                    <Col className="search-filters-select-container">
                                                        <FormLabel>Branża firm</FormLabel>
                                                        <Select options={this.state.searchingData.workIndustryList} isMulti={true} onChange={this.changeWorkIndustry}/>
                                                    </Col>
                                                </Row>
                                                <br/>
                                            </Card.Body>
                                        </Accordion.Collapse>
                                    </Card>
                                    <Card className="search-filters-container-card">
                                        <Card.Header style={{borderTop: "1px solid rgba(0, 0, 0, 0.125)"}}>
                                            <Accordion.Toggle as={Button} variant="link" eventKey="1" className="searching-filter-title" onClick={this.searchingToggle.bind(this)}>
                                                Wyszukiwanie
                                            </Accordion.Toggle>
                                            {this.state.searchingOpen
                                                ? <i className="fas fa-angle-up filter-carret"/>
                                                : <i className="fas fa-angle-down filter-carret"/>
                                            }
                                        </Card.Header>
                                        <Accordion.Collapse eventKey="1">
                                            <Card.Body>Hello! I'm another body</Card.Body>
                                        </Accordion.Collapse>
                                    </Card>
                                    <Card className="search-filters-container-card">
                                        <Card.Header style={{borderTop: "1px solid rgba(0, 0, 0, 0.125)"}}>
                                            <Accordion.Toggle as={Button} variant="link" eventKey="2" className="searching-filter-title" onClick={this.advancedSearchingToggle.bind(this)}>
                                                Wyszukiwanie zaawansowane
                                            </Accordion.Toggle>
                                            {this.state.advancedSearchingOpen
                                                ? <i className="fas fa-angle-up filter-carret"/>
                                                : <i className="fas fa-angle-down filter-carret"/>
                                            }
                                        </Card.Header>
                                        <Accordion.Collapse eventKey="2">
                                            <Card.Body>Hello! I'm another body</Card.Body>
                                        </Accordion.Collapse>
                                    </Card>
                                </Accordion>
                            </Row>
                            <br/>
                            {this.state.users.map((user, index) => <UserCard data={user} key={index}/>)}
                        </>
                    }
                    <br/>
                </Container>
                <FooterAuth/>
            </>
        )
    }
}

export default Searching;