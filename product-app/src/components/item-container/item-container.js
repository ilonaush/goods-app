import React, { Component } from 'react';
import ItemInfo from '../item-info/item-info'
import {bindActionCreators} from "redux";
import actions from "../../redux/actions/actions";
import { connect } from "react-redux";
import './item-container.css';

class ItemContainer extends Component {
    constructor() {
        super();
    }

    render() {
        let goods = this.props.goods;
        let sum = this.props.sum;
        return (
            <div className='itemBox'>
            <div>
                {Object.keys(goods).length > 0 ? Object.keys(goods).map((category) => {
                    return  (
                        <div key={category} className='itemList'>
                            <h3>{category}</h3>
                            {goods[category].length > 0 ? goods[category].map((item) => {
                                    return (
                                        <div key={item.id} >
                                            <ItemInfo item={item} deleteItem={this.props.actions.deleteItem} editItem={this.props.actions.editItem}/>
                                        </div>
                                    )
                                }) : null}
                            <h4>Category Sum: {sum.categoriesSum[category]}</h4>
                        </div>
                    )}) : null}
                {sum.generalSum > 0 ? <h3>General Sum: {sum.generalSum}</h3> : null}
            </div>
        </div>
        )
    }
}

function mapStateToProps(state) {
    return  {
        goods:  state.goods,
        sum: state.sum
    }
}
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators(actions, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ItemContainer)
