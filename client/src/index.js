import React from 'react'
import reactDom from "react-dom";
import { Provider } from "react-redux";
import { createStore, applyMiddleware, compose } from 'redux';
import thunk from "redux-thunk"

import reducers from "./reducers";
import "./index.css"

import App from "./App.js"

let store = createStore(reducers,compose(applyMiddleware(thunk)));

reactDom.render(
    <Provider store={store}>
        <App />
    </Provider>
,
document.getElementById('root')
);