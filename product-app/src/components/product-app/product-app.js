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
                <h1 className='head-title'>Goods  List</h1>
                <InputContainer/>
                <ItemContainer/>
                <button className='printList'>
                    <Link to="/pdf">View List</Link>
            </button>
            </div>
        )
    }
}

export default ProductApp;
