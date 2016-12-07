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
        // 计算核心对外输出的值，可能是临时计算值，也可能是最后的计算结果
        this.value = value || 0;

        // 加减运算符
        this.addsubOpers = new Set([
            '+', '-'
        ]);
        // 乘除运算符
        this.muldivOpers = new Set([
            '*', '/'
        ]);
        // 其他
        this.otherOpers = new Set([
            'AC', '+/-', '%', '=', '.'
        ]);
        // 数字
        this.numberOpers = new Set([
            '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'
        ]);

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
        let core = this;

        // 进入stageN时的回调
        let onenterstage0 = function (event, from, to, command, optMsg = {}) {
            // 初始化 initial 时，command是undefined
            command = command || 0;
            core.a = core.refreshNumber(core.a, command);
            core.value = core.a;
        };
        // 离开stageN时的回调
        let onleavestage0 = function (event, from, to, command, optMsg = {}) {};

        let onenterstage1 = function (event, from, to, command, optMsg = {}) {
            core.op1 = command;
        };
        let onleavestage1 = function (event, from, to, command, optMsg = {}) {};

        let onenterstage2 = function (event, from, to, command, optMsg = {}) {
            core.op1 = command;
        };
        let onleavestage2 = function (event, from, to, command, optMsg = {}) {};

        let onenterstage3 = function (event, from, to, command, optMsg = {}) {
            core.b = core.refreshNumber(core.b, command);
            core.value = core.b;
        };
        let onleavestage3 = function (event, from, to, command, optMsg = {}) {};

        let onenterstage4 = function (event, from, to, command, optMsg = {}) {
            core.op2 = command;
        };
        let onleavestage4 = function (event, from, to, command, optMsg = {}) {};

        let onenterstage5 = function (event, from, to, command, optMsg = {}) {
            core.c = core.refreshNumber(core.c, command);
            core.value = core.c;
        };
        let onleavestage5 = function (event, from, to, command, optMsg = {}) {
            core.b = core.evaluate(core.b, core.op2, core.c);
            core.c = null;
        };

        let onenterstage6 = function (event, from, to, command, optMsg = {}) {
            core.b = core.refreshNumber(core.b, command);
        };
        let onleavestage6 = function (event, from, to, command, optMsg = {}) {
            core.a = core.evaluate(core.a, core.op1, core.b);
            core.b = null;
        };

        let onenterstage7 = function (event, from, to, command, optMsg = {}) {
            core.op2 = command;
            core.c = null;
            core.value = core.evaluate(core.a, core.op1, core.b);
        };
        let onleavestage7 = function (event, from, to, command, optMsg = {}) {
            if (optMsg.commandType === 'number') {
                core.a = core.evaluate(core.a, core.op1, core.b);
                core.op1 = core.op2;
                core.b = null;
                core.op2 = null;
            }
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
                /**
                 * 当状态不变时，比如：stage0时输入的是number
                 * 不会触发onleavestate & onenterstate事件
                 * 所以在这里统一处理 自循环状态转换，主动触发onenterstate事件的回调
                 */
                onbeforeevent: function (event, from, to, command, optMsg = {}) {
                    let commandType = optMsg.commandType;

                    if (this.is('stage0') && commandType === 'number') {
                        onenterstage0(event, from, to, command, optMsg);
                    }
                    else if (this.is('stage1') && commandType === 'addsub') {
                        onenterstage1(event, from, to, command, optMsg);
                    }
                    else if (this.is('stage2') && commandType === 'muldiv') {
                        onenterstage2(event, from, to, command, optMsg);
                    }
                    else if (this.is('stage3') && commandType === 'number') {
                        onenterstage3(event, from, to, command, optMsg);
                    }
                    else if (this.is('stage4') && commandType === 'muldiv') {
                        onenterstage4(event, from, to, command, optMsg);
                    }
                    else if (this.is('stage5') && commandType === 'number') {
                        onenterstage5(event, from, to, command, optMsg);
                    }
                    else if (this.is('stage6') && commandType === 'number') {
                        onenterstage6(event, from, to, command, optMsg);
                    }
                    else if (this.is('stage7') && commandType === 'addsub') {
                        onenterstage7(event, from, to, command, optMsg);
                    }
                    else {
                        // ignore
                    }
                },
                onenterstage0, onleavestage0, onenterstage1, onleavestage1,
                onenterstage2, onleavestage2, onenterstage3, onleavestage3,
                onenterstage4, onenterstage4, onenterstage5, onleavestage5,
                onenterstage6, onleavestage6, onenterstage7, onleavestage7,
                onafterevent: function (...args) {
                    // debug信息
                    console.log(...args);
                    console.log(core.a, core.op1, core.b, core.op2, core.c);
                }
            }
        });
    }

    /**
     * 求值函数，传入表达式，利用eval计算得值
     * @param  {...command} args    数字or运算符
     * @return {number}             计算后的值
     */
    evaluate(...args) {
        let value = null;
        try {
            value = eval(args.join(''));
        }
        catch (e) {
            alert('boom!~');
        }
        return value;
    }

    /**
     * 接受一个旧数字，一个新数字（单个字符），生成一个更新后的数字
     * 比如：oldNumber是12，newNumber是3，则输出123
     * @param  {number} oldNumber 旧数字
     * @param  {number} newNumber 新数字
     * @return {number}           结果
     */
    refreshNumber(oldNumber, newNumber) {
        if (oldNumber === null) {
            return parseInt(newNumber, 10);
        }
        oldNumber = parseInt(oldNumber, 10);
        newNumber = parseInt(newNumber, 10);
        return oldNumber * 10 + newNumber;
    }

    /**
     * 实际的计算逻辑
     * @param  {string} command 用户从键盘输入的命令
     */
    compute(command) {
        if (this.addsubOpers.has(command)) {
            this.sm.addsub(command, {
                commandType: 'addsub'
            });
        }
        else if (this.muldivOpers.has(command)) {
            this.sm.muldiv(command, {
                commandType: 'muldiv'
            });
        }
        else if (this.numberOpers.has(command)) {
            this.sm.number(command, {
                commandType: 'number'
            });
        }
        else if (command === '=') {
            let args = [
                this.a, this.op1, this.b, this.op2, this.c
            ].map(x => x === null ? '' : x);
            console.log(...args);
            this.a = this.evaluate(...args);
            this.value = this.a;

            // 重置除了a之外的变量
            [
                this.a, this.op1, this.b, this.op2, this.c
            ] = [
                this.a, null, null, null, null
            ];
        }
        else {
            console.log(`not support ${command} yet.`);
        }
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
