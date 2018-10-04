let actions = {
    addItem: function(item) {
        debugger;
        return {
            type: 'ADD_ITEM',
            item: item
        }
    },
    editItem: function(item, newName, newPrice) {
        return {
            type: 'EDIT_ITEM',
            item: item,
            newName: newName,
            newPrice: newPrice
        }
    },
    deleteItem: function(item) {
        return {
            type: 'DELETE_ITEM',
            item: item
        }
    }
};
export default actions;
