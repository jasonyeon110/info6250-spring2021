const uuid = require('uuid').v4;
const sessions = {};
const users = require('./users');

const isValidSession = function (sid) {
    return users[sid];
};

const validateUsername = function (username) {
    const errors = [];
    const clean = username.replace(/[^A-Za-z0-9_]+/g, '');

    if (clean !== username) {
        errors.push('username contained disallowed characters');
    }
    if (!username) {
        errors.push('username was empty');
    }
    if (username === 'dog') {
        errors.push(`You are Not Allow to login! ${username}`);
    }

    return errors.lengths ? errors : '';
};

const createSession = function (username) {
    const sid = uuid();
    sessions[sid] = {
        username,
    }
    return sid;
};

const validate = {
    sessions,
    isValidSession,
    validateUsername,
    createSession,
};

module.exports = validate;