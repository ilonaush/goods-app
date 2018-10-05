/**
 * ItemInfo Component
 * renders each item
 * receives props: item {object}
 * creation date: 18/09/18
 */

import React, { Component } from 'react';

class ItemInfo extends  Component {
    constructor(props) {
        super(props);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.onEditClick = this.onEditClick.bind(this);
        this.onSaveClick = this.onSaveClick.bind(this);
        this.state = {
            name: this.props.item.name,
            price: this.props.item.price,
            isEditable: false
        }
    }

    /**
     * handles input change on editing mode and sets new state
     * @param event {object}
     */
    handleInputChange(event) {
        if (event.target.name === 'name') {
            this.setState({
                name: event.target.value
            })
        } else {
            this.setState({
                price: parseInt(event.target.value)
            })
        }
    }

    /**
     * handles edit button click and switches edit mode on
     */
    onEditClick () {
        this.setState ({
            isEditable: true
        })

    }

    /**
     * handles save button click, switches edit mode off and calls editItem function which saves edited item
     */
    onSaveClick() {
        this.setState ({
            isEditable: false
        })
        this.props.editItem(this.props.item, this.state.name, this.state.price);

    }

    render (){
        const {isEditable, name, price} = this.state;
        return (
            <div>
                <div className='item'>
                    <div className="name">{isEditable ? <input  value={name} name='name' onChange={this.handleInputChange} /> : name}
                    </div>
                    <div className="price">{isEditable ? <input value={price} onChange={this.handleInputChange} name='price'/> : price}</div>
                </div>
                <div className="buttons">
                    {isEditable ?
                        <button  onClick={this.onSaveClick}> Save</button> :
                        <button  onClick={this.onEditClick}>Edit</button>
                    }
                    <button onClick={() => this.props.deleteItem(this.props.item)}>Delete</button>
                </div>
            </div>
        )
    }
}


export default ItemInfo;
