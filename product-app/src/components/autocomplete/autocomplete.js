
/**
 * AutoComplete Component
 * inserts autocomplete function into InputContainer
 * receives props: category(string), categories(array)
 * Creation Date: 24.09.18
 */

import React, { Component } from 'react';

class AutoComplete extends Component {
    constructor(props){
        super(props)
        this.state = {
            inputFocused: false,
            category: '',
            matchedItems: this.fillAutoComplete('',this.props.categories || []),
            inputChanged: false
        }
        this.handleClick = this.handleClick.bind(this);
        this.handleFocus = this.handleFocus.bind(this);
        this.handleInputChange = this.handleInputChange.bind(this);
        this.fillAutoComplete = this.fillAutoComplete.bind(this);
        this.handleFocusLost = this.handleFocusLost.bind(this);
    }

    /**
     * reacts on document click and hides auto complete list
     */
    componentDidMount() {
        document.addEventListener('click', (event) => {
            if (event.target.className !== 'select' && event.target.className !== 'arrowDown' ) {
                this.setState({
                    inputFocused: false,
                    inputChanged: false
                })
            }
        });
    }

    /**
     *  on input focus losing. sends the opted category to InputContainer parent component
     * @param event [object]
     */
    handleFocusLost(event) {
        this.props.handleInputChange(event, this.state.category);
    }

    /**
     *
     * @param value {string}
     * @param categories {array}
     * @returns {array} matchedItems
     * receives new category value and all categories array, compares value to each array item and returns array of items with match with value
     */
    fillAutoComplete (value , categories)  {
        let matchedItems = [];
        if (value === "") {
            matchedItems = [...categories];
            return matchedItems;
        }

        for (let i = 0; i < categories.length; i++) {
            console.log(categories[i].substr(0, value.length), value);
            if (categories[i].substr(0, value.length).toLowerCase() === value.toLowerCase()) {
                    matchedItems.push(categories[i]);
                }
            }
        return matchedItems;
    }

    /**
     * on input focus, sets inputFocused state to true to show the auto complete list
     */
    handleFocus() {
        this.setState({
            inputFocused: true
        })
    }

    /**
     *
     * @param event {object}
     * handles click on the auto complete item ans sets input category value to value of clicked item
     */
    handleClick(event) {
        debugger;
        const selectedValue = event.target.innerHTML;
        const input = event.target.parentNode.parentNode.childNodes[0];
        input.value = selectedValue;
        this.setState({
            category: selectedValue
        })
    }

    /**
     *
     * @param event {object}
     * sets category state, matchedItem state as a result of fillAutoComplete function and inputChanged state to true to
     * show auto complete list
     */
    handleInputChange(event) {
        let category = event.target.value;

        this.setState( {
            category,
            matchedItems: this.fillAutoComplete(category, this.props.categories),
            inputChanged: true
        })
    }

    render () {
        const state = this.state;
        return (
        <div className='selectBox'>
            <input name='category' placeholder='Select category...' className='select' onChange={this.handleInputChange}
                   onFocus={this.handleFocus} onBlur={this.handleFocusLost}/>
            <div className='arrowDown' onClick={this.handleFocus}></div>
            {(state.inputFocused && state.matchedItems.length > 0) || (state.matchedItems.length > 0 && state.inputChanged) ?
                <ul>
                    {this.state.matchedItems.map((category) => {
                        return  <li onClick={this.handleClick}>{category}</li>
                    })}
                </ul> : null
            }
        </div>
        )
    }
}

export default  AutoComplete;
