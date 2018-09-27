import InputContainer from '../input-container/input-container';
import React, { Component } from 'react';
import { Link } from "react-router-dom";
import ItemContainer from '../item-container/item-container';

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
                <div className="buttonCloud cloud">
                    <div><Link to='/pdf'>View list</Link></div>
                </div>
            </div>
        )
    }
}

export default ProductApp;
