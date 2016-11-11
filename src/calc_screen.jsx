/**
 * 计算器的屏幕控件
 * @author jk.wong
 */

const React = require('react');
const ReactDOM = require('react-dom');

class CalcScreen extends React.Component {
    render() {
        return (
            <div className='calc-screen'>{this.props.value}</div>
        );
    }
}

module.exports = CalcScreen;
