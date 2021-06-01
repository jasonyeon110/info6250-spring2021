const uuid = require('uuid').v4;
const users = require('./users');

const sessions = {};

const isValidUsername = function (username) {

    if (!username) {
        return false;
    }

    const cleanUsername = username.replace(/[^a-zA-Z0-9_\-]/g, '');

    if (username !== cleanUsername) {
        return false;
    }
    return true;
};

const create = function ({ username }) {

    if (!username) {
        console.log(username)
        return { error: 'Please Ender username' };
    }
    if (username.toLowerCase() === 'dog') {
        return { error: `**Told you, you can't come in... Sorry**` }
    }
    if (!isValidUsername(username)) {
        return { error: 'Invalid Username...' };
    }

    const sid = uuid();

    users[username] = users[username] || { default: 'Empty Reviews' };

    sessions[sid] = {
        sid,
        username,
        startTime: Date.now(),
        info: users[username],
    };
    return { sid };
};

const isValid = function (sid) {
    return !!sessions[sid];
};

const remove = function (sid) {
    delete sessions[sid];
};

module.exports = {
    details: sessions,
    create,
    remove,
    isValid,
};