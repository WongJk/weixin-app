/**
 * 计算器的发声控件
 *     目前只是在console里‘发声’了
 * @author jk.wong
 */

const React = require('react');
const ReactDOM = require('react-dom');

class CalcVoice extends React.Component {

    render() {
        console.log('say:', this.props.value);
        return (
            <div className='calc-voice'></div>
        );
    }
}

module.exports = CalcVoice;
