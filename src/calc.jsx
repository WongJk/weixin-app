/**
 * 
 * @author jk.wong
 */

const React = require('react');
const ReactDOM = require('react-dom');

const CalcScreen = require('./calc_screen.jsx');
const CalcPanel = require('./calc_panel.jsx');
const CalcVoice = require('./calc_voice.jsx');

class Calc extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            value: this.props.value,
            command: 'hello, guys!'
        };

        this.transmit = this.transmit.bind(this);
    }

    /**
     * 计算
     * @param  {string} command 输入的单个命令
     * @return {number|string}  计算的结果
     */
    calculate(command) {
        //////////
        // 计算逻辑 //
        //////////
        return command;
    }

    /**
     * React组件之间通信，有病，得治
     * @param  {string} command 计算器按钮的按键
     */
    transmit(command) {
        this.setState({
            command
        });

        ///////////////////
        // 计算之前的判断逻辑todo //
        ///////////////////

        this.setState({
            value: this.calculate(command)
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


