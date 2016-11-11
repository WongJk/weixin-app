/**
 * 计算器操作盘内的单个按钮控件
 * @author jk.wong
 */

const React = require('react');
const ReactDOM = require('react-dom');

class CalcButton extends React.Component {

    constructor(props) {
        super(props);

        let className = 'calc-btn';
        let operatorSet = new Set(['+', '-', '*', '/', '=']);

        if (this.props.value === '0') {
            className += ' calc-btn-2';
        }
        else if (operatorSet.has(this.props.value)) {
            className += ' calc-operator-btn';
        }

        this.state = {
            className
        };
        
        this.buttonClicked = this.buttonClicked.bind(this);
    }

    buttonClicked(evt) {
        let clickCb = this.props.clickCb;
        clickCb(this.props.value);
        evt.stopPropagation();
    }

    render() {
        if (this.props.value === '0') {
            return (
                <div onClick={this.buttonClicked}
                    className={this.state.className}
                >

                    <div className="calc-btn-2-sub">{this.props.value}</div>
                    <div className="calc-btn-2-sub"></div>
                </div>
            );
        }
        else {
            return (
                <div onClick={this.buttonClicked}
                    className={this.state.className}
                >

                    {this.props.value}
                </div>
            );
        }
    }

}

module.exports = CalcButton;
