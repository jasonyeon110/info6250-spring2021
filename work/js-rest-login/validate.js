const uuid = require('uuid').v4;

const sessions = {};

const isValidSession = function (sid) {
    return sessions[sid];
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
    return errors.lengths ? errors : '';
};

const createSession = function (username) {

    if (sessions[username]) {
        return username;
    }

    sessions[username] = {
        username,
        items: {
            "apple": {
                name: "apple",
                rating: 3
            },
        },
    };
    return username;
};

const validate = {
    sessions,
    isValidSession,
    validateUsername,
    createSession,
}

module.exports = validate;