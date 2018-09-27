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


    componentDidMount() {
        document.addEventListener('click', (event) => {
            if (event.target.className !== 'select') {
                debugger;
                this.setState({
                    inputFocused: false,
                    inputChanged: false
                })
            }
        });
    }

    handleFocusLost(event) {
        this.props.handleInputChange(event, this.state.category);
    }

    fillAutoComplete = (value , categories) => {
        debugger;
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

    handleFocus() {
        this.setState({
            inputFocused: true
        })
    }

    handleClick(event) {
        const selectedValue = event.target.innerHTML;
        const input = event.target.parentNode.previousSibling;
        input.value = selectedValue;
        this.setState({
            category: selectedValue
        })
    }

    handleInputChange(event) {
        let category = event.target.value;

        this.setState( {
            category,
            matchedItems: this.fillAutoComplete(category, this.props.categories),
            inputChanged: true
        })
    }

    render () {
        return (
        <div className='select-box'>
            <input name='category' className='select' onChange={this.handleInputChange} onFocus={this.handleFocus} onBlur={this.handleFocusLost}/>
            {(this.state.inputFocused && this.state.matchedItems.length > 0) || (this.state.matchedItems.length > 0 && this.state.inputChanged) ?
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
