import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../../redux/actions/actions';
import {bindActionCreators} from "redux";
import './input.css';
import AutoComplete from '../autocomplete/autocomplete';

class InputContainer extends Component {
    constructor () {
        super();
        this.handleAddButtonClick = this.handleAddButtonClick.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.clearFields = this.clearFields.bind(this);

        this.state = {
            category: '',
            name: '',
            price: '',
            hasErrored: false
        }
    }

    handleAddButtonClick() {
        let item = {
            category: this.state.category,
            name: this.state.name,
            price: this.state.price,
            id: Date.now()
        };
        this.props.actions.addItem(item);
        this.clearFields();
    }

    clearFields() {
        let inputs = document.getElementsByTagName('input');
        for (let i = 0; i < inputs.length; i++) {
            inputs[i].value = '';
        }
    }

    handleInputChange (event, categoryValue) {
        let value = event.currentTarget.value;
        if (value === '') {
            this.setState({
                hasErrored: true
            });
            return;
        } else {
            this.setState({
                hasErrored: false
            })
        }
        let type = event.currentTarget.name;
        if (type === "category") {
            this.setState({
                category: categoryValue,
            })}
        else if (type === 'name') {
            debugger;
            this.setState({
                name: value
            })}
        else if (type === 'price') {
            this.setState({
                price: parseInt(value)
            })
            }
        }

    render () {
        return (
        <div  className='inputContainer inputBox'>
            <label htmlFor="name">Select Category</label>
            <AutoComplete categories={Object.keys(this.props.goods)} handleInputChange={this.handleInputChange}/>
            <label htmlFor="name">Name</label>
            <input name='name'  onChange={this.handleInputChange}/>
            <label htmlFor="price">Price</label>
            <input name='price'  type='number' onChange={this.handleInputChange}/>
            <button onClick={this.handleAddButtonClick}>+</button>
            {this.state.hasErrored ? <div>Fill all inputs</div> : null}
        </div>
        )
    }
}

function mapStateToProps(state) {
    return { goods: state.goods }
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(InputContainer)
