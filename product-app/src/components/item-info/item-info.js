import React, { Component } from 'react';
import {Link} from "react-router-dom";


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

    onEditClick () {
        this.setState ({
            isEditable: true
        })

    }

    onSaveClick() {
        this.setState ({
            isEditable: false
        })
        this.props.editItem(this.props.item, this.state.name, this.state.price);

    }

    render (){
        return (
            <div>
                <div className='item'>
                    <div className="name">{this.state.isEditable ? <input  value={this.state.name} name='name' onChange={this.handleInputChange} /> : this.props.item.name}
                    </div>
                    <div className="price">{this.state.isEditable ? <input value={this.state.price} onChange={this.handleInputChange} name='price'/> : this.props.item.price}</div>
                </div>
                <div className="buttons">
                    {this.state.isEditable ?
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
