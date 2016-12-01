/**
 *
 * 计算器的计算核心
 *
 *      如果用 [有限状态机] 实现，可扩展性会更高？
 *      https://github.com/jakesgordon/javascript-state-machine
 * 
 * @author jk.wong
 */

const stateMachine = require("javascript-state-machine");

/**
 *  stage0 |  stage1   | stage2   | stage3   | stage4   | stage5   | stage6   | stage7
 *  a:   x |  a:   x   | a:   x   | a:   x   | a:   x   | a:   x   | a:   x   | a:   x
 *  op1: # |  op1: +,- | op1: *,/ | op1: +,- | op1: +,- | op1: +,- | op1: *,/ | op1: +,-
 *  b:   # |  b:   #   | b:   #   | b:   y   | b:   y   | b:   y   | b:   y   | b:   y
 *  op2: # |  op2: #   | op2: #   | op2: #   | op2: *,/ | op2: *,/ | op2: #   | op2: +,-
 *  c:   # |  c:   #   | c:   #   | c:   #   | c:   #   | c:   z   | c:   #   | c:   #
 */

/**
 * 计算器计算核心
 */
class CalcCore {

    /**
     * 构造函数
     * @param  {string|number} value 初始化原始值
     */
    constructor (value) {
        this.value = value || 0;

        // 加减运算符
        this.addsubOpers = new Set([
            '+', '-'
        ]);;
        // 乘除运算符
        this.muldivOpers = new Set([
            '*', '/'
        ]);;
        // 其他
        this.otherOpers = new Set([
            'AC', '+/-', '%', '=', '.'
        ]);;
        // 数字
        this.numberOpers = new Set([
            '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'
        ]);;

        /**
         * 计算相关的操作数
         * 比如 1 + 2 * 3 对应为 a op1 b op2 c
         */
        this.a = null;
        this.op1 = null;
        this.b = null;
        this.op2 = null;
        this.c = null;

        // 有限状态机实例
        this.sm = this.initStateMachine();
    }

    initStateMachine () {

        // 进入stageN时的回调 
        let onstage0 = function (event, from, to, command) {

        };
        let onstage1 = function (event, from, to, command) {

        };
        let onstage2 = function (event, from, to, command) {

        };
        let onstage3 = function (event, from, to, command) {

        };
        let onstage4 = function (event, from, to, command) {

        };
        let onstage5 = function (event, from, to, command) {

        };
        let onstage6 = function (event, from, to, command) {

        };
        let onstage7 = function (event, from, to, command) {

        };

        return stateMachine.create({
            initial: 'stage0',
            /**
             * 有限状态机的状态转化图(状态之间的转换关系)
             * @description
             *     number表示输入 数字
             *     addsub表示输入 +,-
             *     muldiv表示输入 *,/
             */
            events: [
                /* start stage0 */
                {name: 'number', from: 'stage0', to: 'stage0'},
                {name: 'addsub', from: 'stage0', to: 'stage1'},
                {name: 'muldiv', from: 'stage0', to: 'stage2'},
                /* end stage0, start stage1 */
                {name: 'number', from: 'stage1', to: 'stage3'},
                {name: 'addsub', from: 'stage1', to: 'stage1'},
                {name: 'muldiv', from: 'stage1', to: 'stage2'},
                /* end stage1, start stage2 */
                {name: 'number', from: 'stage2', to: 'stage6'},
                {name: 'addsub', from: 'stage2', to: 'stage1'},
                {name: 'muldiv', from: 'stage2', to: 'stage2'},
                /* end stage2, start stage3 */
                {name: 'number', from: 'stage3', to: 'stage3'},
                {name: 'addsub', from: 'stage3', to: 'stage7'},
                {name: 'muldiv', from: 'stage3', to: 'stage4'},
                /* end stage3, start stage4 */
                {name: 'number', from: 'stage4', to: 'stage5'},
                {name: 'addsub', from: 'stage4', to: 'stage7'},
                {name: 'muldiv', from: 'stage4', to: 'stage4'},
                /* end stage4, start stage5 */
                {name: 'number', from: 'stage5', to: 'stage5'},
                {name: 'addsub', from: 'stage5', to: 'stage7'},
                {name: 'muldiv', from: 'stage5', to: 'stage4'},
                /* end stage5, start stage6 */
                {name: 'number', from: 'stage6', to: 'stage6'},
                {name: 'addsub', from: 'stage6', to: 'stage1'},
                {name: 'muldiv', from: 'stage6', to: 'stage2'},
                /* end stage6, start stage7 */
                {name: 'number', from: 'stage7', to: 'stage3'},
                {name: 'addsub', from: 'stage7', to: 'stage7'},
                {name: 'muldiv', from: 'stage7', to: 'stage4'}
                /* end stage7 */
            ],
            callbacks: {
                onbeforeevent: function (event, from, to, command) {
                    switch (this.current) {
                        case 'stage0':
                        case 'stage1':
                        case 'stage2':
                        case 'stage3':
                        case 'stage4':
                        case 'stage5':
                        case 'stage6':
                        case 'stage7':
                            break;
                        
                        default: 
                            // ..
                    }
                }
            }
        });
    }

    /**
     * 实际的计算逻辑
     * @param  {string} command 用户从键盘输入的命令
     */
    compute(command) {
        if (this.addsubOpers.has(command)) {
            this.sm.addsub(command);
        }
        else if (this.muldivOpers.has(command)) {
            this.sm.muldiv(command);
        }
        else if (this.numberOpers.has(command)) {
            this.sm.number(command);
        }
        else if (command === '=') {
            console.log(command);
        }
        else {
            console.log(`not support ${command} yet.`);
        }

        console.log(command, this.sm.current);
    }

    /**
     * 输出计算结果
     * @return {string|number} 运算的结果，或者短暂的结果
     */
    output() {
        return this.value;
    }

    /**
     * 输入命令，进行计算
     * @param  {string} command 用户从键盘输入的命令
     * @return {string|number}  运算的结果，或者短暂的结果
     */
    input(command) {

        this.compute(command);

        return this.output();
    }
}

module.exports = CalcCore;
