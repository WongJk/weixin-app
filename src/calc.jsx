/**
 * 
 * @author jk.wong
 */

const React = require('react');
const ReactDOM = require('react-dom');

const ReactRedux = require('react-redux');

const CalcScreen = require('./calc_screen.jsx');
const CalcPanel = require('./calc_panel.jsx');
const CalcVoice = require('./calc_voice.jsx');

const CalcCore = require('./calc_core.jsx');

class Calc extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <CalcScreen value={this.props.value} />
                <CalcPanel />
                <CalcVoice value={this.props.command} />
            </div>
        );
    }
}

let calcCore = new CalcCore();

function select(state) {
    calcCore.input(state.command);
    let value = calcCore.output();

    return {
        value,
        command: state.command
    };
}

module.exports = ReactRedux.connect(select)(Calc);



