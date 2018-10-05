/**
 * ProductApp component
 * renders InputContainer and ItemContainer components
 * creation Date: 24/09/18
 */

import InputContainer from '../input-container/input-container';
import React, { Component } from 'react';
import { Link } from "react-router-dom";
import ItemContainer from '../item-container/item-container';
import CloudTitle from '../cloud-title/cloud-title';

class  ProductApp extends Component {
    constructor() {
        super()
    }

    render () {
        return (
            <div>
                <CloudTitle>Goods List</CloudTitle>
                <InputContainer/>
                <ItemContainer/>
                <div className="buttonCloud cloud">
                    <div><Link to='/pdf' className='no-decoration'>View list</Link></div>
                </div>
            </div>
        )
    }
}

export default ProductApp;
