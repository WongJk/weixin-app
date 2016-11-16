/**
 *
 * 计算器的计算核心
 * @author jk.wong
 */

class CalcCore {
    constructor (value) {
        this.value = value || 0;
    }

    output() {
        return this.value;
    }

    input(command) {
        console.log('core', command);
        // todo
        this.value = command;
    }
}

module.exports = CalcCore;
