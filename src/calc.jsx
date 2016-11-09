/**
 * 
 * @author jk.wong
 */

const React = require('react');
const ReactDOM = require('react-dom');

const CalcScreen = require('./calc_screen.jsx');
const CalcPanel = require('./calc_panel.jsx');

let Calc = React.createClass({
    render: () => {
        return (
            <div>
                <CalcScreen />
                <CalcPanel />
            </div>
        );
    }
});

ReactDOM.render(
    <Calc />,
    document.getElementById('calc-container')
);


