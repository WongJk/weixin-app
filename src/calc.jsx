/**
 * 
 * @author jk.wong
 */

const React = require('react');
const ReactDOM = require('react-dom');

const CalcScreen = require('./calc_screen.jsx');
const CalcPanel = require('./calc_panel.jsx');
const CalcVoice = require('./calc_voice.jsx');

const CalcCore = require('./calc_core.jsx');

class Calc extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            value: this.props.value,
            command: 'hello, guys!'
        };

        this.core = new CalcCore();

        this.transmit = this.transmit.bind(this);
    }

    /**
     * React组件之间通信，有病，得治
     * @param  {string} command 计算器按钮的按键
     */
    transmit(command) {
        this.setState({
            command
        });

        this.core.input(command);

        this.setState({
            value: this.core.output()
        });
    }

    render() {
        return (
            <div>
                <CalcScreen value={this.state.value} />
                <CalcPanel emitCommand={this.transmit} />
                <CalcVoice value={this.state.command} />
            </div>
        );
    }
}

ReactDOM.render(
    <Calc value='0' />,
    document.getElementById('calc-container')
);


