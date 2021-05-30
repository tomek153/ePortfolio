import React, {Component} from "react";
import {Col, FormLabel, Row} from "react-bootstrap";

class UserCourseRow extends Component {

    render() {
        return (
            <>
                {this.props.data.edu_type === "KURS/SZKOLENIE"
                    ? <Row style={{marginBottom: "10px"}}>
                        <Col xs={3} className="search-profile-row-dates">
                            {this.props.data.edu_time_end
                                ? <>{this.props.data.edu_time_start.replaceAll("-", ".")} - {this.props.data.edu_time_end.replaceAll("-", ".")}</>
                                : <>{this.props.data.edu_time_start.replaceAll("-", ".")} - obecnie</>
                            }
                        </Col>
                        <Col>
                            <FormLabel className="search-profile-row-main">
                                {this.props.data.edu_name}
                            </FormLabel>
                            <p className="search-profile-row-spec">
                                {this.props.data.edu_spec}
                            </p>
                            <p className="search-profile-row-desc">
                                {this.props.data.edu_desc
                                    ? this.props.data.edu_desc
                                    : <span>Opis.</span>
                                }
                            </p>
                        </Col>
                    </Row>
                    : null
                }
            </>
        )
    }
}

export default UserCourseRow;