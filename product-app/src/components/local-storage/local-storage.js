
/**
 * @returns {object} store from local Storage
 */
export const loadStore = () => {
    try {
        const serializedState = localStorage.getItem('state');
        if (serializedState === null) {
            return undefined;
        }
        return JSON.parse(serializedState);
    } catch (err) {
        return undefined;
    }
};
/**
 * records store to local storage
 * @param state {object}
 */
export const saveStore = (state) => {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState);
};

