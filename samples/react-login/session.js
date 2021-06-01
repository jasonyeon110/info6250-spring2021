const uuid = require('uuid').v4;

const users = {}; // Data that is saved beyond a session
const sessions = {}; // Data that exists only while logged in

const isValidUsername = function( username ) {
  if(!username) {
    return false;
  }
  const cleanUsername = username.replace(/[^a-zA-Z0-9_\-]/g, '');
  if(username !== cleanUsername) {
    return false;
  }
  return true;
};

const create = function({ username }) {
  if(!username) {
    return { error: 'username-required' };
  }
  if(!isValidUsername(username)) {
    return { error: 'username-invalid' };
  }
  const sid = uuid();
  // create or load user data
  users[username] = users[username] || {
    some: 'stuff', // this is where actual user data would go
  };
  // create session data, link to user
  sessions[sid] = {
    sid,
    username,
    startTime: Date.now(),
    info: users[username], // Notice session is NOT where this data is stored
    // Instead, session just holds a reference to the data in users, which is
    // where the data really lives
    // This way, the data survives login/logout,
    // and even handles multiple simultaneous logins from the same user
  };
  return { sid };
};

const remove = function(sid) {
  delete sessions[sid]; // Deletes session data, not all data for the user
};

const isValid = function(sid) {
  return !!sessions[sid];
};

module.exports = {
  details: sessions,
  create,
  remove,
  isValid,
};
