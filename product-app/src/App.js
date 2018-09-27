
import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import reducer   from './redux/reducer/reducer';
import  { saveStore, loadStore } from './components/local-storage/local-storage';
import ProductApp from './components/product-app/product-app';
import PDFList from './components/pdf-list/pdf-list';
import { Route } from 'react-router-dom';
import './components/item-container/item-container.css';


import './App.css';
const predefinedStore = loadStore();
const store = createStore(
    reducer,
    predefinedStore
);


store.subscribe(() => {
    saveStore(store.getState());
});

class App extends Component {
    render() {
        return (
            <Provider store={store}>
                <div className="App">
                    <Route path="/" exact component={ProductApp}/>
                    <Route path="/pdf" exact component={PDFList}/>
                </div>
            </Provider>
        );
    }
}


export default App;
