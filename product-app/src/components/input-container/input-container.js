/**
 * InputContainer Component
 * inserts input Block where user can add new item to the list
 * receives props: goods(object, redux)
 * Creation Date: 17.09.18
 */

import React, { Component } from 'react';
import { connect } from 'react-redux';
import actions from '../../redux/actions/actions';
import {bindActionCreators} from "redux";
import AutoComplete from '../autocomplete/autocomplete';
import { makeRequest } from "../request-service/request-service";

class InputContainer extends Component {
    constructor () {
        super();
        this.handleAddButtonClick = this.handleAddButtonClick.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.clearFields = this.clearFields.bind(this);
        this.clearState = this.clearState.bind(this);
        this.getList = this.getList.bind(this);
        this.getModel = this.getModel.bind(this);

        this.state = {
            category: '',
            name: '',
            price: '',
            hasErrored: false,
            values: [],
            models: []
        }
    }

     componentDidMount() {
        this.getList();
     }
    /**
     * @param event (object)
     * validates each item property from this.state, sends new object to redux, clears inputs after adding
     */
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

    /**
     * searches all inputs and sets their value to ''
     */
    clearFields() {
        let inputs = document.getElementsByTagName('input');
        for (let i = 0; i < inputs.length; i++) {
            inputs[i].value = '';
        }
    }

    /**
     * clears all states to prevent from creating similar objects after add button clicking
     */
    clearState() {
        this.setState({
            category: '',
            name: '',
            price: ''
        })
    }


    getList() {
        makeRequest('https://developers.ria.com/auto/new/marks?category_id=1&api_key=NhVhfXAfj7Z7ns7t05E32bv5BUTMid1FIH1l61hC').then((response) => {
            let marks = response.map((item) => {
                return item.name;
            });
            this.setState({
                values: marks,
                catalogue: response
            })
        })
    }

    getModel() {
        let category = this.state.category;
        let model = this.state.catalogue.find((item) => {
            if (item.name === category) {
                return item
            }
        });
       makeRequest(`https://developers.ria.com/auto/new/models?marka_id=${model['marka_id']}&category_id=1&api_key=NhVhfXAfj7Z7ns7t05E32bv5BUTMid1FIH1l61hC`).then((response) => {
            let models = response.map((item) => {
                return item.name;
            });
            this.setState({
                models: models
            })
            }
        )
    }

    /**
     *
     * @param event {object}
     * @param categoryValue [string]
     * reacts on each input change and sets current state
     * on category input value change is being called from child component AutoComplete
     * if value is '', sets this.state.hasErrored to true to show the error message
     */
    handleInputChange (categoryValue, event) {
        let value;
        let type;
        if (event === 'category' || event === 'name') {
            value = categoryValue;
            type = event;
        } else {
             value = event.currentTarget.value;
             type = event.currentTarget.name;
        }
        if (value === '') {
            this.setState({
                hasErrored: true
            });
            return;
        } else {
            this.setState({
                hasErrored: false
            });
        }
        if (type === "category") {
            this.setState({
                category: categoryValue
            }, () => this.getModel());

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
            <AutoComplete values={this.state.values} handleInputChange={this.handleInputChange} type='category'>Select category</AutoComplete>
            <AutoComplete values={this.state.models.length !== 0 ? this.state.models : []} handleInputChange={this.handleInputChange} type='name'>Select name</AutoComplete>
            <input name='price' placeholder='price' type='number' onChange={(event) => this.handleInputChange(event.target.value, event)}/>
            <div className="buttonCloud cloud" onClick={this.handleAddButtonClick}>
                <div>Add item</div>
            </div>
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
