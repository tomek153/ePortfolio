import React, {Component} from "react";
import {Col, Row} from "react-bootstrap";

class UserSkillRow extends Component {

    render() {
        return (
            <>
                {this.props.data.skill_type === this.props.type_match
                    ? <Row style={{marginBottom: "10px", padding: "0 20px"}}>
                        <Col className="search-profile-row-lang">
                            {this.props.data.skill_name}
                        </Col>
                        <Col style={{textAlign: "left"}}>
                            {this.props.data.skill_level === "Podstawowy"
                                ? <>
                                    <i className="fas fa-circle search-profile-row-circle active"/>
                                    <i className="fas fa-circle search-profile-row-circle"/>
                                    <i className="fas fa-circle search-profile-row-circle"/>
                                    <i className="fas fa-circle search-profile-row-circle"/>
                                    <i className="fas fa-circle search-profile-row-circle"/>
                                    <i className="fas fa-circle search-profile-row-circle"/>
                                </>
                                : null
                            }
                            {this.props.data.skill_level === "Średnio zaawansowany niższy"
                                ? <>
                                    <i className="fas fa-circle search-profile-row-circle active"/>
                                    <i className="fas fa-circle search-profile-row-circle active"/>
                                    <i className="fas fa-circle search-profile-row-circle"/>
                                    <i className="fas fa-circle search-profile-row-circle"/>
                                    <i className="fas fa-circle search-profile-row-circle"/>
                                    <i className="fas fa-circle search-profile-row-circle"/>
                                </>
                                : null
                            }
                            {this.props.data.skill_level === "Średnio zaawansowany"
                                ? <>
                                    <i className="fas fa-circle search-profile-row-circle active"/>
                                    <i className="fas fa-circle search-profile-row-circle active"/>
                                    <i className="fas fa-circle search-profile-row-circle active"/>
                                    <i className="fas fa-circle search-profile-row-circle"/>
                                    <i className="fas fa-circle search-profile-row-circle"/>
                                    <i className="fas fa-circle search-profile-row-circle"/>
                                </>
                                : null
                            }
                            {this.props.data.skill_level === "Średnio zaawansowany wyższy"
                                ? <>
                                    <i className="fas fa-circle search-profile-row-circle active"/>
                                    <i className="fas fa-circle search-profile-row-circle active"/>
                                    <i className="fas fa-circle search-profile-row-circle active"/>
                                    <i className="fas fa-circle search-profile-row-circle active"/>
                                    <i className="fas fa-circle search-profile-row-circle"/>
                                    <i className="fas fa-circle search-profile-row-circle"/>
                                </>
                                : null
                            }
                            {this.props.data.skill_level === "Zaawansowany"
                                ? <>
                                    <i className="fas fa-circle search-profile-row-circle active"/>
                                    <i className="fas fa-circle search-profile-row-circle active"/>
                                    <i className="fas fa-circle search-profile-row-circle active"/>
                                    <i className="fas fa-circle search-profile-row-circle active"/>
                                    <i className="fas fa-circle search-profile-row-circle active"/>
                                    <i className="fas fa-circle search-profile-row-circle"/>
                                </>
                                : null
                            }
                            {this.props.data.skill_level === "Biegły"
                                ? <>
                                    <i className="fas fa-circle search-profile-row-circle active"/>
                                    <i className="fas fa-circle search-profile-row-circle active"/>
                                    <i className="fas fa-circle search-profile-row-circle active"/>
                                    <i className="fas fa-circle search-profile-row-circle active"/>
                                    <i className="fas fa-circle search-profile-row-circle active"/>
                                    <i className="fas fa-circle search-profile-row-circle active"/>
                                </>
                                : null
                            }
                        </Col>
                    </Row>
                    : null
                }
            </>
        )
    }
}

export default UserSkillRow;