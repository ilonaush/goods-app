import React, { Component } from 'react';
import {Link} from "react-router-dom";

class CloudButton extends Component {
    constructor(props) {
        super(props)
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        this.props.onClick(event);
    }

    render () {
        return (
            <div className="buttonCloud cloud" onClick={this.props.onClick ? this.handleClick : null}>
                <div>{this.props.children}</div>
            </div>
        )
    }
}

export  default CloudButton;
