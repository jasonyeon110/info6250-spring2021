const { messages, addMessage } = require("./chat");

const chatWeb = {
  chatPage: function (chat) {
    // Fill in anything below!
    return `
      <!doctype html>
      <html>
        <head>
          <title>Chat</title>
          <link rel="stylesheet" href="/css/app.css">
        </head>
        <body>
          <div id="chat-app">
            <div class="display-panel">
              ${chatWeb.getUserList(chat)}
              ${chatWeb.getMessageList(chat)}
            </div>
            ${chatWeb.getOutgoing(chat)}
          </div>
        </body>
      </html>
  `;
  },

  getMessageList: function (chat) {
    return `<ol class="messages">` +
      //Fill in!
      chat.messages.map(message =>
        `
      <li>
        <div class="message">
          <div class="container">
            <div>
              <span>${message.sender}</span>
            </div>
            <div>
              <span>${message.text}</span>
            </div>  
          </div>
        </div>
      </li>  
      `).join('') +
      `</ol>`;
  },

  getUserList: function (chat) {
    return `<ul class="users">` +
      Object.values(chat.users).map(user => `
      <li>
        <div class="user">
          <span class="username">${user}</span>
        </div>
      </li>
    `).join('') +
      `</ul>`;
  },

  getOutgoing: function () {
    // Fill in!
    return `
    <form action="/chat" method="POST">
      <input type="hidden" name="sender" value="Amit">
      <input id="text" name="text" placeholder="message">
      <button type="submit">Send</button>
    </form>
    `
  }
};

module.exports = chatWeb;
