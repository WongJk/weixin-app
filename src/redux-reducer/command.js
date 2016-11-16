/**
 * 
 */

function command(state = '', action) {
    if (action.type === 'UPDATE_COMMAND') {
        return action.command;
    }
    return state;
}

module.exports = command;
