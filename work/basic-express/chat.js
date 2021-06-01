const users = {
  "Amit": "Amit",
  "Bao": "Bao",
};

const messages = [
  {
    sender: "Amit",
    text: "You up?",
  },
  {
    sender: "Bao",
    text: "Yeah, still working on this INFO6250 work, but I keep getting distracted by cat videos",
  }
];

//original code
function addMessage({ sender, text }) {
  //   //Fill in below

  if (!sender || !text) {
    return;
  }
  chat.users[sender] = sender;
  chat.messages.push({ sender, text });
};


const chat = {
  users,
  messages,
  addMessage,
};

module.exports = chat;

