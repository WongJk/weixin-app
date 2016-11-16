/**
 * 引入redux
 * @author jk.wong
 */

const React = require('react');
const ReactDOM = require('react-dom');

const ReactRedux = require('react-redux');
const Redux = require('redux');

const Calc = require('./calc.jsx');

const reducers = require('./redux-reducer/reducers.js');

let store = Redux.createStore(reducers);

ReactDOM.render(
    <ReactRedux.Provider store={store}>
        <Calc />
    </ReactRedux.Provider>,
    document.getElementById('calc-container')
);
