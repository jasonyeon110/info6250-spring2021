import {
    checkLoginStatus,
    performLogin,
} from './service';

const validate = require('../validate');

let items = {};


addLogin();
addLogOut();

checkLoginStatus()
    .then((userInfo) => {
        showContent();
        items = Object.values(userInfo.items);
        renderItems(items);
    })
    .catch(error => {
        showLogin();
    });


let usernameEl = document.querySelector('#item-app .login input');
let username = usernameEl.value;
const buttonE1 = document.querySelector('.logged-in .add-button');
const inputE1 = document.querySelector('.add-item');
const listEl = document.querySelector('#item-app .items');
let rank = document.querySelector('span .rating');

function convertError(response) {
    if (response.ok) {
        return response.json();
    }
    return response.json()
        .then(err => Promise.reject(err));
}

function showContent() {
    document.querySelector('#item-app .login').classList.add('hidden');
    document.querySelector('#item-app .logged-in').classList.remove('hidden');
}

function showLogin() {
    document.querySelector('#item-app .login').classList.remove('hidden');
    document.querySelector('#item-app .logged-in').classList.add('hidden');
}

function addLogin() {
    document.querySelector('#item-app .login button').addEventListener('click', () => {
        const usernameEl = document.querySelector('#item-app .login input');
        const username = usernameEl.value;

        if (!username) {
            return;
        }

        performLogin(username)
            .then(userInfo => {
                showContent();
                items = Object.values(userInfo.items);
                renderItems(items);

            })
            .catch(err => {
                console.log(err);
            })
    });
}

function addLogOut() {
    document.querySelector('.logged-in #out').addEventListener('click', () => {
        username = "";
        showLogin();
    })
}

function renderItems(items) {
    const listEl = document.querySelector('#item-app .items');
    usernameEl = document.querySelector('#item-app .login input');
    username = usernameEl.value;

    const html = items.map(item => {
        return `
        <li class="item">
            <button class="delete" data-item="${item.name}" data-user="${username}">X</button>
            <span>${item.name}</span>
            <div id="rating-container">
                <button class="down" data-item="${item.name}"> - </button>
                <span class="rating">[${item.rating}]</span>
                <button class="up" data-item="${item.name}"> + </button>
            </div>
            
        </li>
        `;
    }).join("\n");
    listEl.innerHTML = html;
}

// -------sorting-----------
document.querySelector('.logged-in .sorting').addEventListener('click', () => {

    fetch(`/item-lists/${username}`, {
        method: "GET",
    })
        .catch(() => Promise.reject({ error: "Network Error" }))
        .then(convertError)
        .then(items => {
            let sorted = sort(items);
            console.log(`after sort() items => go to renderItems() => ${JSON.stringify(items)}`);
            renderItems(sorted);
        })
});

function sort(items) {

    console.log(`sort() items received ${JSON.stringify(Object.values(items))}`);
    const unsorted = Object.values(items);
    console.log(`unsorted => ${JSON.stringify(unsorted)}`);

    let sorted = unsorted.sort(function (a, b) {
        return b.rating - a.rating;
    });
    console.log(`sorted => ${JSON.stringify(sorted)}`);
    return sorted;
}
//========sorting==========

buttonE1.addEventListener('click', () => {
    usernameEl = document.querySelector('#item-app .login input');
    username = usernameEl.value;
    const itemName = inputE1.value;

    if (itemName) {
        fetch(`/item/${itemName}`, {
            method: "POST",
            headers: new Headers({
                'content-type': 'application/json',
            }),
            body: JSON.stringify({ username }),
        })
            .catch(() => Promise.reject({ error: 'NetWork Error' }))
            .then(convertError)
            .then(items => {
                inputE1.value = '';
                renderItems(items);
            })
    }
});

listEl.addEventListener('click', (e) => {
    if (e.target.classList.contains("delete")) {
        const itemName = e.target.dataset.item;

        fetch(`/items-list/${itemName}`, {
            method: 'DELETE',
            headers: new Headers({
                'content-type': 'application/json',
            }),
            body: JSON.stringify({ username }),
        })
            .catch(() => Promise.reject({ error: 'Network Error' }))
            .then(convertError)
            .then(items => {
                renderItems(items);

            })
    }

    if (e.target.classList.contains('up')) {

        const itemName = e.target.dataset.item;
        fetch(`/items-list/rating/${itemName}`, {
            method: 'PATCH',
            headers: new Headers({
                'content-type': 'application/json',
            }),
            body: JSON.stringify({ username }),
        })
            .catch(() => Promise.reject({ error: 'Network Error' }))
            .then(convertError)
            .then(items => {
                renderItems(items);
            })
    }

    if (e.target.classList.contains('down')) {

        const itemName = e.target.dataset.item;

        fetch(`/items-list/rating-d/${itemName}`, {
            method: 'PATCH',
            headers: new Headers({
                'content-type': 'application/json',
            }),
            body: JSON.stringify({ username }),


        })
            .catch(() => Promise.reject({ error: 'Network Error' }))
            .then(convertError)
            .then(items => {
                renderItems(items);
            })
    }

});