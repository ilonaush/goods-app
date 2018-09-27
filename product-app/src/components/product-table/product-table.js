import React, { Component } from 'react';
import ItemContainer from '../item-container/item-container';

class ProductTable extends  Component {
    constructor() {
        super()
    }

    render () {
        return (
            <div>
                <ItemContainer/>
            </div>
        )
    }
}

export default  ProductTable;