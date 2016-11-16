/**
 * 
 */

const Redux = require('redux');

const value = require('./value.js');
const command = require('./command.js');

let reducers = Redux.combineReducers({
    value,
    command
});

module.exports = reducers;
