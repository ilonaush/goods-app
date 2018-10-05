import React, { Component } from 'react';

class CloudTitle extends  Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className='title'>
                    <div className="cloud">
                        <div className="cloudshadow">
                        </div>
                    </div>
                    <h1 className='head-title'>{this.props.children}</h1>
                </div>
            </div>
        )
    }
}

export default CloudTitle;
