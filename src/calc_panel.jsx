/**
 *
 * @author jk.wong
 */

const React = require('react');
const ReactDOM = require('react-dom');

let CalcPanel = React.createClass({
    render: () => {
        return (
            <div className="calc">
                <div className="btn-row">
                    <div className="calc-btn">AC</div>
                    <div className="calc-btn">+/-</div>
                    <div className="calc-btn">%</div>
                    <div className="calc-btn calc-operator-btn">/</div>
                </div>
                <div className="btn-row">
                    <div className="calc-btn">7</div>
                    <div className="calc-btn">8</div>
                    <div className="calc-btn">9</div>
                    <div className="calc-btn calc-operator-btn">*</div>
                </div>
                <div className="btn-row">
                    <div className="calc-btn">4</div>
                    <div className="calc-btn">5</div>
                    <div className="calc-btn">6</div>
                    <div className="calc-btn calc-operator-btn">-</div>
                </div>
                <div className="btn-row">
                    <div className="calc-btn">1</div>
                    <div className="calc-btn">2</div>
                    <div className="calc-btn">3</div>
                    <div className="calc-btn calc-operator-btn">+</div>
                </div>
                <div className="btn-row">
                    <div className="calc-btn calc-btn-2">
                        <div className="calc-btn-2-sub">0</div>
                        <div className="calc-btn-2-sub"></div>
                    </div>
                    <div className="calc-btn">.</div>
                    <div className="calc-btn calc-operator-btn">=</div>
                </div>
            </div>
        );
    }
});

module.exports = CalcPanel;
