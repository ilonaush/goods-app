/**
 * ProductApp component
 * renders InputContainer and ItemContainer components
 * creation Date: 24/09/18
 */

import InputContainer from '../input-container/input-container';
import React, { Component } from 'react';
import { Link } from "react-router-dom";
import ItemContainer from '../item-container/item-container';
import CloudButton from '../cloud-button/cloud-button';

class  ProductApp extends Component {
    constructor() {
        super()
    }

    render () {
        return (
            <div>
                <div>
                    <div className='title'>
                        <div className="cloud">
                            <div className="cloudshadow">
                            </div>
                        </div>
                        <h1 className='head-title'>Goods List</h1>
                    </div>
                </div>
                <InputContainer/>
                <ItemContainer/>
                <CloudButton onClick={null}><Link to='/pdf' className='no-decoration'>View list</Link></CloudButton>
            </div>
        )
    }
}

export default ProductApp;
