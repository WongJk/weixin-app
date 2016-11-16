/**
 *
 * 计算器的计算核心
 *
 *      如果用 [有限状态机] 实现，可扩展性会更高？
 * 
 * @author jk.wong
 */

// command type 符号类别
const arithmeticOperType = 'arithmetic operators type';
const otherOperType = 'other operators type';
const numberType = 'number type';

/**
 * 命令对象，用于运算
 */
class Command {
    constructor(value, type) {
        this.value = value;
        this.type = type;
    }
}

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

        // 输入栈
        this.stack = [];

        this.arithmeticOpers = new Set([
            '+', '-', '*', '/'
        ]);
        this.otherOpers = new Set([
            'AC', '+/-', '%', '=', '.'
        ]);
        this.numberOpers = new Set([
            '0', '1', '2', '3', '4', '5', '6', '7', '8', '9'
        ]);
    }

    /**
     * 生成命令obj，方便判断
     * @param  {string} command 用户输入的命令
     * @return {Object}         Command实例
     */
    genCommandObj(command) {
        let type = undefined;
        if (this.arithmeticOpers.has(command)) {
            type = arithmeticOperType;
        }
        else if (this.otherOpers.has(command)) {
            type = otherOperType;
        }
        else if (this.numberOpers.has(command)) {
            type = numberType;
        }

        return new Command(command, type);
    }

    /**
     * 实际的计算逻辑
     * @param  {Object} cmdObj Command实例
     */
    compute(cmdObj) {
        console.log(cmdObj);
        // todo 详细的计算逻辑
        this.stack.push(cmdObj);


        // todo 重新赋值，用于显示
        this.value = cmdObj.value;
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

        let cmdObj = this.genCommandObj(command);
        this.compute(cmdObj);

        return this.output();
    }
}

module.exports = CalcCore;
