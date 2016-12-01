/**
 * 引入redux
 * @author jk.wong
 */

const React = require('react');
const ReactDOM = require('react-dom');

const Calc = require('./calc.jsx');

ReactDOM.render(
    <Calc value='0' />,
    document.getElementById('calc-container')
);
