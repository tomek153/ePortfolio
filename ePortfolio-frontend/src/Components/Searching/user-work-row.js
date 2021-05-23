import React, {Component} from "react";
import {Col, FormLabel, Row} from "react-bootstrap";

class UserWorkRow extends Component {

    render() {
        return (
            <>
                <Row style={{marginBottom: "10px"}}>
                    <Col xs={3} className="search-profile-row-dates">
                        {this.props.data.work_time_start.replaceAll("-", ".")} - {this.props.data.work_time_end.replaceAll("-", ".")}
                    </Col>
                    <Col>
                        <FormLabel className="search-profile-row-main">
                            {this.props.data.work_name}
                        </FormLabel>
                        <p className="search-profile-row-loc">
                            <i className="fas fa-network-wired"/> {this.props.data.work_industry} &nbsp;&nbsp;<i className="fas fa-map-marker-alt"/> {this.props.data.work_place}
                        </p>
                        <p className="search-profile-row-spec">
                            {this.props.data.work_type === "PRAKTYKI" || this.props.data.work_type === "STAŻ" || this.props.data.work_type === "WOLONTARIAT"
                                ? <span>{this.props.data.work_type}, {this.props.data.work_profession}</span>
                                : <span>{this.props.data.work_profession}</span>
                            }
                        </p>
                        <p className="search-profile-row-desc">
                            <i>Obowiązki:</i> {this.props.data.work_desc}
                        </p>
                    </Col>
                </Row>
            </>
        )
    }
}

export default UserWorkRow;