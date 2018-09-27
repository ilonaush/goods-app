
let reducer = (state = {goods: [], sum: {}}, action) => {
    switch (action.type) {
        case 'ADD_ITEM':
            debugger;
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

            //     ...state,
            //     items: [
            //         ...state.items,
            //         [action.item.category]: {
            //             ...state[action.item.category],
            //             [action.item.id]: {
            //                 ...state[action.item.category][action.item.id],
            //                 name: action.newName,
            //                 price: action.newPrice
            //             }
            //         }
            //     ],
            //     sum:  ((state['sum'] || {}) || 0) - action.item.price + action.newPrice
            // }
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
            console.log(newState)
            return newState;
            // let newObj = {
            //     ...state,
            //     items: {
            //         ...state.items,
            //         [action.item.category]: {
            //             ...state[action.item.category]
            //         }
            //     }
            // };
            // newObj[action.item.category]['sum'] -= action.item.price;
            // delete newObj[action.item.category][action.item.id];
            // return newObj;

        default:
            return state;
    }
}
export default reducer;
