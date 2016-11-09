/**
 * 
 * @author jk.wong
 */

const React = require('react');
const ReactDOM = require('react-dom');

const CalcScreen = require('./calc_screen.jsx');
const CalcPanel = require('./calc_panel.jsx');

ReactDOM.render(
    <CalcScreen />,
    document.getElementById('calc-screen')
);

ReactDOM.render(
    <CalcPanel />,
    document.getElementById('calc-panel')
);


