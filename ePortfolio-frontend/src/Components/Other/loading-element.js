import React, { Component } from 'react';
import {CircularProgress} from "@material-ui/core";


class LoadingElement extends Component {

    render() {

        const container = {
            width: "100%",
            minHeight: "300px",
            position: "relative"
        }

        const spinner = {
            position: "absolute",
            top: "calc(50% - 20px)",
            left: "calc(50% - 20px)",
            color: "#888"
        }

        return (
            <div style={container}>
                <CircularProgress style={spinner}/>
            </div>
        )
    }
}

export default LoadingElement;