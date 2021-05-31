import React, { Component } from 'react';
import Breadcrumb from "react-bootstrap/Breadcrumb";
import {Accordion, Card, Container, Row, Button, Col, FormLabel, FormControl} from "react-bootstrap";
import FooterAuth from "../Other/footer-auth";
import LoadingElement from "../Other/loading-element";
import Select from "react-select";
import Form from "react-bootstrap/Form";
import SearchResults from "./search-results";

class Searching extends Component {
    _isMounted = false;

    constructor() {
        super();
        this.state = {

            usersAll: [],
            users: [],
            searchingDataAll: null,
            searchingData: null,

            searchInput: "",
            status_searchInput: false,

            advancedSearchInput: "",
            advancedCity: "",
            advancedWork: "",
            advancedEdu: "",
            status_advancedSearchInput: false,
            status_advancedCity: true,
            status_advancedWork: true,
            status_advancedEdu: true,


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
            selectDisabled: false,
            loadingResults: false,
            advancedSearchButton: false
        }
    }

    async componentDidMount() {
        this._isMounted = true;

        let usersList = await this.getUsersList([]);
        let filtersList = await this.getAllSearchingFilters();

        if (this._isMounted) {
            this.setState({users: usersList});
            this.state.users = usersList;
            this.state.usersAll = usersList;

            this.setState({searchingData: filtersList});
            this.state.searchingData = filtersList;
            this.state.searchingDataAll = filtersList;

            this.setState({_dataLoaded: true});

            const search = this.props.location.search.substring(7);
            if (search) {
                this.state.searchInput = search;
                this.setState({searchInput: search});
                this.searchingToggle();
                document.getElementById("searching-search-toogle").classList.add("show");
                document.getElementById("searchFilter_input").value = search;

                await this.searchUsers();
            }
        }
    }
    componentWillUnmount() {
        this._isMounted = false;
    }
    filterToggle() {
        if (this.state.filterOpen)
            this.clearFilter();
        if (this.state.searchingOpen)
            this.clearSearchUsers();
        if (this.state.advancedSearchingOpen) {
            this.clearAdvancedFilters();
        }
        this.setState({filterOpen: !this.state.filterOpen});
        this.setState({searchingOpen: false});
        this.setState({advancedSearchingOpen: false});
    }
    searchingToggle() {
        if (this.state.filterOpen)
            this.clearFilter();
        if (!this.state.searchingOpen)
            document.getElementById("searchFilter_err").hidden = true;
        if (this.state.searchingOpen)
            this.clearSearchUsers();
        if (this.state.advancedSearchingOpen) {
            this.clearAdvancedFilters();
        }
        this.setState({searchingOpen: !this.state.searchingOpen});
        this.setState({filterOpen: false});
        this.setState({advancedSearchingOpen: false});
    }
    advancedSearchingToggle() {
        if (this.state.filterOpen)
            this.clearFilter();
        if (this.state.searchingOpen)
            this.clearSearchUsers();
        if (!this.state.advancedSearchingOpen) {
            document.getElementById("advancedSearchFilter_err").hidden = true;
            document.getElementById("advancedCityFilter_err").hidden = true;
            document.getElementById("advancedWorkFilter_err").hidden = true;
            document.getElementById("advancedEduFilter_err").hidden = true;
        }
        if (this.state.advancedSearchingOpen) {
            this.clearAdvancedFilters();
        }
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
        this.state.filter_city = selected;
        this.setState({filter_city: selected});

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
        this.state.filter_eduName = selected;
        this.setState({filter_eduName: selected});

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
        this.state.filter_eduSpec = selected;
        this.setState({filter_eduSpec: selected});

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
        this.state.filter_skillName = selected;
        this.setState({filter_skillName: selected});

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
        this.state.filter_workName = selected;
        this.setState({filter_workName: selected});

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
        this.state.filter_workIndustry = selected;
        this.setState({filter_workIndustry: selected});

        await this.updateElasticData();
    }

    async updateElasticData() {
        this.setState({loadingResults: true});
        this.setState({selectDisabled: true});
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

        if (this.state.filter_string_city === "city/" &&
            this.state.filter_string_eduName === "edu-name/" &&
            this.state.filter_string_eduSpec === "edu-spec/" &&
            this.state.filter_string_skillName === "skill-name/" &&
            this.state.filter_string_workName === "work-name/" &&
            this.state.filter_string_workIndustry === "work-industries/") {

            this.setState({users: this.state.usersAll});
            this.setState({searchingData: this.state.searchingDataAll});
            this.setState({selectDisabled: false});
            this.setState({loadingResults: false});
        } else {

            // Aktualizacja listy
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
                    unique_ids.push(row.uuid);
                }
            });

            // Aktualizacja filtrow

            var addressCityList = [];
            var eduNameList = [];
            var eduSpecList = [];
            var skillNameList = [];
            var workNameList = [];
            var workIndustryList = [];

            var addressCityTab = [];
            var eduNameTab = [];
            var eduSpecTab = [];
            var skillNameTab = [];
            var workNameTab = [];
            var workIndustryTab = [];

            results.forEach(row => {

                if (!addressCityTab.includes(row.city)) {
                    addressCityTab.push(row.city);
                }
                for (const edu_name of row.eduNames) {
                    if (!eduNameTab.includes(edu_name)) {
                        eduNameTab.push(edu_name);
                    }
                }
                for (const edu_spec of row.eduSpec) {
                    if (!eduSpecTab.includes(edu_spec)) {
                        eduSpecTab.push(edu_spec);
                    }
                }
                for (const skill_name of row.skillName) {
                    if (!skillNameTab.includes(skill_name)) {
                        skillNameTab.push(skill_name);
                    }
                }
                for (const workName_name of row.workNames) {
                    if (!workNameTab.includes(workName_name)) {
                        workNameTab.push(workName_name);
                    }
                }
                for (const workIndustry_name of row.workIndustries) {
                    if (!workIndustryTab.includes(workIndustry_name)) {
                        workIndustryTab.push(workIndustry_name);
                    }
                }
            });

            addressCityTab.forEach(city_name => {
                for (const city of this.state.searchingDataAll.addressCityList) {
                    if (JSON.stringify(city).includes('"label":"'+city_name+'"')) {
                        addressCityList.push(city);
                        break;
                    }
                }
            });
            eduNameTab.forEach(eduName_name => {
                for (const edu_name of this.state.searchingDataAll.eduNameList) {
                    if (JSON.stringify(edu_name).includes('"label":"'+eduName_name+'"')) {
                        eduNameList.push(edu_name);
                        break;
                    }
                }
            });
            eduSpecTab.forEach(eduSpec_name => {
                for (const edu_spec of this.state.searchingDataAll.eduSpecList) {
                    if (JSON.stringify(edu_spec).includes('"label":"'+eduSpec_name+'"')) {
                        eduSpecList.push(edu_spec);
                        break;
                    }
                }
            });
            skillNameTab.forEach(skillName_name => {
                for (const skill_name of this.state.searchingDataAll.skillNameList) {
                    if (JSON.stringify(skill_name).includes('"label":"'+skillName_name+'"')) {
                        skillNameList.push(skill_name);
                        break;
                    }
                }
            });
            workNameTab.forEach(workName_name => {
                for (const work_name of this.state.searchingDataAll.workNameList) {
                    if (JSON.stringify(work_name).includes('"label":"'+workName_name+'"')) {
                        workNameList.push(work_name);
                        break;
                    }
                }
            });
            workIndustryTab.forEach(workIndustry_name => {
                for (const work_industry of this.state.searchingDataAll.workIndustryList) {
                    if (JSON.stringify(work_industry).includes('"label":"'+workIndustry_name+'"')) {
                        workIndustryList.push(work_industry);
                        break;
                    }
                }
            });

            var new_filters = {
                addressCityList: addressCityList,
                eduNameList: eduNameList,
                eduSpecList: eduSpecList,
                skillNameList: skillNameList,
                workNameList: workNameList,
                workIndustryList: workIndustryList
            }

            this.setState({users: await this.getUsersList(unique_ids)});
            this.setState({searchingData: new_filters});
            this.setState({selectDisabled: false});
            this.setState({loadingResults: false});
        }
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
    async getUsersListBySearch() {
        var token = localStorage.getItem("token");

        if (token != null && token != "") {
            var myHeaders = new Headers();
            myHeaders.append('Content-Type', 'text/plain; charset=utf-8');
            myHeaders.append('Authorization', localStorage.getItem("token"));

            const request = new Request(
                'http://localhost:8081/find/query',
                {
                    method: 'POST',
                    headers: myHeaders,
                    body: this.state.searchInput
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
    async getUsersListByAdvancedSearch() {
        var token = localStorage.getItem("token");

        if (token != null && token != "") {
            var myHeaders = new Headers();
            myHeaders.append('Content-Type', 'application/json; charset=utf-8');
            myHeaders.append('Authorization', localStorage.getItem("token"));

            const request = new Request(
                'http://localhost:8081/find/query-advanced',
                {
                    method: 'POST',
                    headers: myHeaders,
                    body: JSON.stringify({
                        text: this.state.advancedSearchInput,
                        city: this.state.advancedCity,
                        work: this.state.advancedWork,
                        edu: this.state.advancedEdu
                    })
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

    clearFilter() {
        this.setState({selectDisabled: true});
        this.setState({filter_city: []});
        this.setState({filter_eduName: []});
        this.setState({filter_eduSpec: []});
        this.setState({filter_skillName: []});
        this.setState({filter_workName: []});
        this.setState({filter_workIndustry: []});

        this.state.filter_string_city = "city/";
        this.state.filter_string_eduName = "edu-name/";
        this.state.filter_string_eduSpec = "edu-spec/";
        this.state.filter_string_skillName = "skill-name/";
        this.state.filter_string_workName = "work-name/";
        this.state.filter_string_workIndustry = "work-industries/";

        this.setState({users: this.state.usersAll});
        this.setState({searchingData: this.state.searchingDataAll});
        this.setState({selectDisabled: false});
    }
    changeSearchInput(event) {
        var value = event.target.value;
        var regex = /[^a-zA-Z0-9żźćńółęąśŻŹĆĄŚĘŁÓŃ,./ -]/;

        this.state.searchInput = value;

        if (value.match(regex) == null &&
            value.length >= 2 &&
            value.length <= 200) {
            this.setState({status_searchInput: true});
            document.getElementById("searchFilter_err").hidden = true;
        } else {
            this.setState({status_searchInput: false});
            document.getElementById("searchFilter_err").hidden = false;
        }
        if (value.length === 0) {
            document.getElementById("searchFilter_err").hidden = true;
        }
    }
    clearSearchUsers() {
        document.getElementById("searchFilter_input").value = "";
        this.state.searchInput = "";
        this.setState({users: this.state.usersAll});
        this.setState({status_searchInput: false});
    }
    async searchUsers() {
        document.getElementById("searching-regularSearchButton").disabled = true;
        document.getElementById("searchFilter_input").disabled = true;
        this.setState({loadingResults: true});

        var results = [];
        results = (await this.getUsersListBySearch()).content;

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
                unique_ids.push(row.uuid);
            }
        });

        var usersNew;
        if (unique_ids.length === 0)
            usersNew = [];
        else
            usersNew = await this.getUsersList(unique_ids);
        this.setState({users: usersNew});
        this.setState({loadingResults: false});
        document.getElementById("searching-regularSearchButton").disabled = false;
        document.getElementById("searchFilter_input").disabled = false;
    }

    changeAdvancedSearchInput(event) {
        var value = event.target.value;
        var regex = /[^a-zA-Z0-9żźćńółęąśŻŹĆĄŚĘŁÓŃ,./ -]/;

        this.state.advancedSearchInput = value;

        if (value.match(regex) == null &&
            value.length >= 2 &&
            value.length <= 200) {

            this.state.status_advancedSearchInput = true;
            document.getElementById("advancedSearchFilter_err").hidden = true;
        } else {

            this.state.status_advancedSearchInput = false;
            document.getElementById("advancedSearchFilter_err").hidden = false;
        }
        if (value.length === 0) {
            document.getElementById("advancedSearchFilter_err").hidden = true;
        }

        this.checkAdvancedSearchButton();
    }
    changeAdvancedCity(event) {
        var value = event.target.value;
        var regex = /[^a-zA-Z0-9żźćńółęąśŻŹĆĄŚĘŁÓŃ,./ -]/;

        this.state.advancedCity = value;

        if ((value.match(regex) == null &&
            value.length >= 2 &&
            value.length <= 200) || value === "") {

            this.state.status_advancedCity = true;
            document.getElementById("advancedCityFilter_err").hidden = true;
        } else {

            this.state.status_advancedCity = false;
            document.getElementById("advancedCityFilter_err").hidden = false;
        }

        this.checkAdvancedSearchButton();
    }
    changeAdvancedWork(event) {
        var value = event.target.value;
        var regex = /[^a-zA-Z0-9żźćńółęąśŻŹĆĄŚĘŁÓŃ,./ -]/;

        this.state.advancedWork = value;

        if ((value.match(regex) == null &&
            value.length >= 2 &&
            value.length <= 200) || value === "") {

            this.state.status_advancedWork = true;
            document.getElementById("advancedWorkFilter_err").hidden = true;
        } else {

            this.state.status_advancedWork = false;
            document.getElementById("advancedWorkFilter_err").hidden = false;
        }

        this.checkAdvancedSearchButton();
    }
    changeAdvancedEdu(event) {
        var value = event.target.value;
        var regex = /[^a-zA-Z0-9żźćńółęąśŻŹĆĄŚĘŁÓŃ,./ -]/;

        this.state.advancedEdu = value;

        if ((value.match(regex) == null &&
            value.length >= 2 &&
            value.length <= 200) || value === "") {

            this.state.status_advancedEdu = true;
            document.getElementById("advancedEduFilter_err").hidden = true;
        } else {

            this.state.status_advancedEdu = false;
            document.getElementById("advancedEduFilter_err").hidden = false;
        }

        this.checkAdvancedSearchButton();
    }
    checkAdvancedSearchButton() {
        if (this.state.status_advancedSearchInput &&
            this.state.status_advancedCity &&
            this.state.status_advancedWork &&
            this.state.status_advancedEdu) {

            this.setState({advancedSearchButton: true});
        } else {
            this.setState({advancedSearchButton: false});
        }
    }
    clearAdvancedFilters() {
        document.getElementById("advancedSearchFilter_input").value = "";
        document.getElementById("advancedCityFilter_input").value = "";
        document.getElementById("advancedWorkFilter_input").value = "";
        document.getElementById("advancedEduFilter_input").value = "";

        this.state.advancedSearchInput = "";
        this.state.advancedCity = "";
        this.state.advancedWork = "";
        this.state.advancedEdu = "";

        this.state.status_advancedSearchInput = false;
        this.state.status_advancedCity = true;
        this.state.status_advancedWork = true;
        this.state.status_advancedEdu = true;

        this.setState({advancedSearchButton: false});
        this.setState({users: this.state.usersAll});
    }
    async searchAdvancedUsers() {
        document.getElementById("searching-advancedSearchButton").disabled = true;
        document.getElementById("advancedSearchFilter_input").disabled = true;
        document.getElementById("advancedCityFilter_input").disabled = true;
        document.getElementById("advancedWorkFilter_input").disabled = true;
        document.getElementById("advancedEduFilter_input").disabled = true;
        this.setState({loadingResults: true});

        var results = [];
        results = (await this.getUsersListByAdvancedSearch()).content;

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
                unique_ids.push(row.uuid);
            }
        });

        var usersNew;
        if (unique_ids.length === 0)
            usersNew = [];
        else
            usersNew = await this.getUsersList(unique_ids);
        this.setState({users: usersNew});
        this.setState({loadingResults: false});
        document.getElementById("searching-advancedSearchButton").disabled = false;
        document.getElementById("advancedSearchFilter_input").disabled = false;
        document.getElementById("advancedCityFilter_input").disabled = false;
        document.getElementById("advancedWorkFilter_input").disabled = false;
        document.getElementById("advancedEduFilter_input").disabled = false;
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
                                                        <Select className="profile-fields" options={this.state.searchingData.addressCityList} isMulti={true} onChange={this.changeCity} isDisabled={this.state.selectDisabled} value={this.state.filter_city}/>
                                                    </Col>
                                                    <Col className="search-filters-select-container">
                                                        <FormLabel>Intytucje kształcenia</FormLabel>
                                                        <Select className="profile-fields" options={this.state.searchingData.eduNameList} isMulti={true} onChange={this.changeEduName} isDisabled={this.state.selectDisabled} value={this.state.filter_eduName}/>
                                                    </Col>
                                                    <Col className="search-filters-select-container">
                                                        <FormLabel>Specjalności kształcenia</FormLabel>
                                                        <Select className="profile-fields" options={this.state.searchingData.eduSpecList} isMulti={true} onChange={this.changeEduSpec} isDisabled={this.state.selectDisabled} value={this.state.filter_eduSpec}/>
                                                    </Col>
                                                </Row>
                                                <br/>
                                                <Row>
                                                    <Col className="search-filters-select-container">
                                                        <FormLabel>Umiejętności</FormLabel>
                                                        <Select className="profile-fields" options={this.state.searchingData.skillNameList} isMulti={true} onChange={this.changeSkillName} isDisabled={this.state.selectDisabled} value={this.state.filter_skillName}/>
                                                    </Col>
                                                    <Col className="search-filters-select-container">
                                                        <FormLabel>Firmy</FormLabel>
                                                        <Select className="profile-fields" options={this.state.searchingData.workNameList} isMulti={true} onChange={this.changeWorkName} isDisabled={this.state.selectDisabled} value={this.state.filter_workName}/>
                                                    </Col>
                                                    <Col className="search-filters-select-container">
                                                        <FormLabel>Branża firm</FormLabel>
                                                        <Select className="profile-fields" options={this.state.searchingData.workIndustryList} isMulti={true} onChange={this.changeWorkIndustry} isDisabled={this.state.selectDisabled} value={this.state.filter_workIndustry}/>
                                                    </Col>
                                                </Row>
                                                <br/>
                                                <Row style={{justifyContent: "center"}}>
                                                    <Button className="search-filters-clear-button" variant="link" onClick={this.clearFilter.bind(this)}>Wyczyść filtry</Button>
                                                </Row>
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
                                        <Accordion.Collapse eventKey="1" id="searching-search-toogle">
                                            <Card.Body>
                                                <br/>
                                                <Row>
                                                    <Col>
                                                        <FormControl id="searchFilter_input" className="profile-fields" as="input" placeholder="Wpisz szukaną frazę..." onChange={this.changeSearchInput.bind(this)}/>
                                                        <Form.Text className="text-muted text-error" id="searchFilter_err">
                                                            Podano nieprawidłową wartość.
                                                        </Form.Text>
                                                    </Col>
                                                    <Col xs={2}>
                                                        <Button id="searching-regularSearchButton" onClick={this.searchUsers.bind(this)} style={{float: "right", color: "#fff"}} disabled={!this.state.status_searchInput} className="search-filters-clear-button primary-button"><i className="fas fa-search"/> &nbsp;Szukaj</Button>
                                                    </Col>
                                                    <Col xs={2}>
                                                        <Button className="search-filters-clear-button" variant="link" onClick={this.clearSearchUsers.bind(this)}>Wyczyść</Button>
                                                    </Col>
                                                </Row>
                                                <br/>
                                            </Card.Body>
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
                                            <Card.Body>
                                                <Row>
                                                    <Col>
                                                        <FormLabel className="profile-label">Szukaj<span className="text-error">*</span></FormLabel>
                                                        <FormControl onChange={this.changeAdvancedSearchInput.bind(this)} id="advancedSearchFilter_input" className="profile-fields" as="input" placeholder="Wpisz szukaną frazę..."/>
                                                        <Form.Text className="text-muted text-error" id="advancedSearchFilter_err">
                                                            Podano nieprawidłową wartość.
                                                        </Form.Text>
                                                    </Col>
                                                    <Col>
                                                        <FormLabel className="profile-label">Miejscowość</FormLabel>
                                                        <FormControl onChange={this.changeAdvancedCity.bind(this)} id="advancedCityFilter_input" className="profile-fields" as="input" placeholder="Wpisz szukaną frazę..."/>
                                                        <Form.Text className="text-muted text-error" id="advancedCityFilter_err">
                                                            Podano nieprawidłową wartość.
                                                        </Form.Text>
                                                    </Col>
                                                </Row>
                                                <br/>
                                                <Row>
                                                    <Col>
                                                        <FormLabel className="profile-label">Praca</FormLabel>
                                                        <FormControl onChange={this.changeAdvancedWork.bind(this)} id="advancedWorkFilter_input" className="profile-fields" as="input" placeholder="Wpisz szukaną frazę..."/>
                                                        <Form.Text className="text-muted text-error" id="advancedWorkFilter_err">
                                                            Podano nieprawidłową wartość.
                                                        </Form.Text>
                                                    </Col>
                                                    <Col>
                                                        <FormLabel className="profile-label">Edukacja</FormLabel>
                                                        <FormControl onChange={this.changeAdvancedEdu.bind(this)} id="advancedEduFilter_input" className="profile-fields" as="input" placeholder="Wpisz szukaną frazę..."/>
                                                        <Form.Text className="text-muted text-error" id="advancedEduFilter_err">
                                                            Podano nieprawidłową wartość.
                                                        </Form.Text>
                                                    </Col>
                                                </Row>
                                                <br/>
                                                <Row>
                                                    <Col>
                                                        <Button onClick={this.searchAdvancedUsers.bind(this)} disabled={!this.state.advancedSearchButton} id="searching-advancedSearchButton" style={{float: "left", color: "#fff"}} className="search-filters-clear-button primary-button"><i className="fas fa-search"/> &nbsp;Szukaj</Button>
                                                    </Col>
                                                    <Col>
                                                        <Button onClick={this.clearAdvancedFilters.bind(this)} className="search-filters-clear-button" variant="link" style={{float: "right"}}>Wyczyść</Button>
                                                    </Col>
                                                </Row>
                                            </Card.Body>
                                        </Accordion.Collapse>
                                    </Card>
                                </Accordion>
                            </Row>
                            <br/>
                            {this.state.loadingResults
                                ? <LoadingElement/>
                                : <SearchResults data={this.state.users}/>
                            }
                        </>
                    }
                </Container>
                <FooterAuth/>
            </>
        )
    }
}

export default Searching;