import {
  checkLoginStatus,
  performLogin
} from './services';

let todos = []; // TODO - should be object, not array

addLogin();

// Check for login
checkLoginStatus()
.then( (userInfo) => {
  showContent();
  todos = userInfo.todos;
  renderTodos(todos);
})
.catch( error => {
  showLogin();
});

// TODO: Move these HTML-changing functions to an import from another file
function showContent() {
  document.querySelector('#todo-app .login').classList.add('hidden');
  document.querySelector('#todo-app .logged-in').classList.remove('hidden');
}

function showLogin() {
  document.querySelector('#todo-app .login').classList.remove('hidden');
  document.querySelector('#todo-app .logged-in').classList.add('hidden');
}

function addLogin() {
  document.querySelector('#todo-app .login button').addEventListener('click', () => {
    const usernameEl = document.querySelector('#todo-app .login input');
    const username = usernameEl.value;
    // call service
    performLogin(username)
    .then( userInfo => {
      showContent();
      todos = userInfo.todos;
      renderTodos(todos);
    })
    .catch( err => {
      // fixme - show errors
      console.log(err);
    })
  });
}

function renderTodos(todos) {
  const listEl = document.querySelector('#todo-app .todos');
  const html = todos.map( todo => {
    return `<li class="todo"><span>${todo.task}</span></li>`;
  }).join("\n");
  listEl.innerHTML = html;
}
