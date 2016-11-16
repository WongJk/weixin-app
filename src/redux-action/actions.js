/**
 * 
 */

let updateCommand = function (command) {
    return {
        type: 'UPDATE_COMMAND',
        command
    };
};

module.exports = {
    updateCommand
};
