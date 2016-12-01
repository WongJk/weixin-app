/**
 * 加蒜器的按钮盘控件
 * @author jk.wong
 */

const React = require('react');
const ReactDOM = require('react-dom');

// const _ = require('lodash');

const CalcButton = require('./calc_button.jsx');

class CalcPanel extends React.Component {

    constructor() {
        super();
        this.state = {

        };

        this.calcButtonClicked = this.calcButtonClicked.bind(this);
    }

    calcButtonClicked(value) {
        let emitCommand = this.props.emitCommand;
        emitCommand(value);
    }

    render() {

        return (
            <div className='calc-panel'>
                <div className='btn-row'>
                    <CalcButton clickCb={this.calcButtonClicked} value='AC' />
                    <CalcButton clickCb={this.calcButtonClicked} value='+/-' />
                    <CalcButton clickCb={this.calcButtonClicked} value='%' />
                    <CalcButton clickCb={this.calcButtonClicked} value='/' />
                </div>
                <div className='btn-row'>
                    <CalcButton clickCb={this.calcButtonClicked} value='7' />
                    <CalcButton clickCb={this.calcButtonClicked} value='8' />
                    <CalcButton clickCb={this.calcButtonClicked} value='9' />
                    <CalcButton clickCb={this.calcButtonClicked} value='*' />
                </div>
                <div className='btn-row'>
                    <CalcButton clickCb={this.calcButtonClicked} value='4' />
                    <CalcButton clickCb={this.calcButtonClicked} value='5' />
                    <CalcButton clickCb={this.calcButtonClicked} value='6' />
                    <CalcButton clickCb={this.calcButtonClicked} value='-' />
                </div>
                <div className='btn-row'>
                    <CalcButton clickCb={this.calcButtonClicked} value='1' />
                    <CalcButton clickCb={this.calcButtonClicked} value='2' />
                    <CalcButton clickCb={this.calcButtonClicked} value='3' />
                    <CalcButton clickCb={this.calcButtonClicked} value='+' />
                </div>
                <div className='btn-row'>
                    <CalcButton clickCb={this.calcButtonClicked} value='0' />
                    <CalcButton clickCb={this.calcButtonClicked} value='.' />
                    <CalcButton clickCb={this.calcButtonClicked} value='=' />
                </div>
            </div>
        );
    }
};

module.exports = CalcPanel;
