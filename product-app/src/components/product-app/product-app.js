import InputContainer from '../input-container/input-container';
import ProductTable from '../product-table/product-table';
import React, { Component } from 'react';
import { Link } from "react-router-dom";

class  ProductApp extends Component {
    constructor() {
        super()
    }

    render () {
        return (
            <div>
                <h1 className='head-title'>Goods  List</h1>
                <InputContainer/>
                <ProductTable/>
                <button className='printList'>
                    <Link to="/pdf">View List</Link>
            </button>
            </div>
        )
    }
}

export default ProductApp;
