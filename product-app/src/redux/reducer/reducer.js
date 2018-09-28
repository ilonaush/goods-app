
let reducer = (state = {goods: [], sum: {}}, action) => {
    switch (action.type) {
        case 'ADD_ITEM':
            return {
                ...state,
                goods: {
                    ...state.goods,
                    [action.item.category]: [
                        ...state.goods[action.item.category] || [],
                        action.item
                    ]
                },
                sum: {
                    ...state.sum,
                    generalSum: (state['sum']['generalSum'] || 0) + action.item.price,
                    categoriesSum: {
                        ...state.sum.categoriesSum || [],
                        [action.item.category]: ((state['sum']['categoriesSum'] || {})[action.item.category] || 0) + action.item.price
                    }
                }
            }
        case 'EDIT_ITEM':
            let State = {
                ...state,
                goods: {
                    ...state.goods,
                    [action.item.category]: [
                        ...state.goods[action.item.category],
                    ]
                },
                sum: {
                    generalSum: (state['sum']['generalSum'] || 0) - action.item.price + action.newPrice,
                    categoriesSum: {
                        ...state.sum.categoriesSum || [],
                        [action.item.category]: ((state['sum']['categoriesSum'] || {})[action.item.category] || 0) - action.item.price + action.newPrice
                    }
                }
            };
            State.goods[action.item.category] = State.goods[action.item.category].map((item) => {
                debugger;
                if (item.id === action.item.id) {
                    return {
                        ...item,
                        name: action.newName,
                        price: action.newPrice
                    }
                } else {
                    return {...item};
                }
            });
            return State;
        case 'DELETE_ITEM':
            let newState = {
                ...state,
                goods: {
                    ...state.goods,
                    [action.item.category]: [
                        ...state.goods[action.item.category],
                    ]
                },
                sum: {
                    generalSum: (state['sum']['generalSum'] || 0) - action.item.price,
                    categoriesSum: {
                        ...state.sum.categoriesSum || [],
                        [action.item.category]: ((state['sum']['categoriesSum'] || {})[action.item.category] || 0) - action.item.price
                    }
                }
            };
            newState.goods[action.item.category] = newState.goods[action.item.category].filter((item) => {
                return item.id !== action.item.id
            });

            if (newState.goods[action.item.category].length === 0) {
                delete newState.goods[action.item.category];
            }
            return newState;


        default:
            return state;
    }
}
export default reducer;


