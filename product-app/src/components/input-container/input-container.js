import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../../redux/actions/actions';
import {bindActionCreators} from "redux";
import AutoComplete from '../autocomplete/autocomplete';

class InputContainer extends Component {
    constructor () {
        super();
        this.handleAddButtonClick = this.handleAddButtonClick.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.clearFields = this.clearFields.bind(this);
        this.clearState = this.clearState.bind(this);

        this.state = {
            category: '',
            name: '',
            price: '',
            hasErrored: false
        }
    }

    handleAddButtonClick(event) {
        if (this.state.category === '' || this.state.price === '' || this.state.name === '' ) {
            event.preventDefault();
            return;
        }

        let item = {
            category: this.state.category,
            name: this.state.name,
            price: this.state.price,
            id: Date.now()
        };
        this.props.actions.addItem(item);
        this.clearFields();
        this.clearState();
    }

    clearFields() {
        let inputs = document.getElementsByTagName('input');
        console.log(inputs);
        for (let i = 0; i < inputs.length; i++) {
            inputs[i].value = '';
        }
    }

    clearState() {
        this.setState({
            category: '',
            name: '',
            price: ''
        })
    }

    handleInputChange (event, categoryValue) {
        let value = event.currentTarget.value;
        if (value === '') {
            this.setState({
                hasErrored: true
            });
            return;
        }
        let type = event.currentTarget.name;
        if (type === "category") {
            this.setState({
                category: categoryValue,
            })
        }
        else if (type === 'name') {
            this.setState({
                name: value
            })
        }
        else if (type === 'price') {
            this.setState({
                price: parseInt(value)
            })
        }
    }


    render () {
        return (
        <div  className='inputContainer inputBox'>
            <label htmlFor="category">Select Category</label>
            <AutoComplete categories={Object.keys(this.props.goods)} handleInputChange={this.handleInputChange}/>
            <input name='name'  placeholder='name' onChange={this.handleInputChange}/>
            <input name='price' placeholder='price' type='number' onChange={this.handleInputChange}/>
            <button onClick={this.handleAddButtonClick}>Add an item</button>
            {this.state.hasErrored ? <div><b>Fill all inputs</b></div> : null}
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
