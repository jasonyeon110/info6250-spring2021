"use strict";

(function iife() {

    const errMsgs = {
        'duplicate': 'This item already exists',
        'network-error': 'Problem with connecting to the network....',
    };

    const status = document.querySelector('.status');
    const listE1 = document.querySelector('.item-list');
    const inputE1 = document.querySelector('.add-item');
    const buttonE1 = document.querySelector('.add');

    disableButtonIfNoInput();

    function updateStatus(message) {
        status.innerText = message;
    };

    function renderItems(items) {

        const html = items.map((item) => `
                <li>
                    <button class="delete" data-item="${item.itemId}">X</button>
                    <span class="item">${item.name}</span>
                    <div id="quant-container">
                        <button class="substract" data-item="${item.itemId}"> - </button>
                        <span class="quant">[${item.quantity}]</span> 
                        <button class="addition" data-item="${item.itemId}"> + </button>
                    </div>
                </li>`
        ).join('');
        listE1.innerHTML = html;
        buttonE1.disabled = !inputE1.value;
    }

    function disableButtonIfNoInput() {
        inputE1.addEventListener('input', () => {
            buttonE1.disabled = !inputE1.value;
        });
    }

    function convertError(response) {
        if (response.ok) {
            return response.json();
        }
        return response.json()
            .then(err => Promise.reject(err));
    }

    listE1.addEventListener('click', (e) => {
        if (e.target.classList.contains("delete")) {
            const item = e.target.dataset.item;
            fetch(`/items/${item}`, {
                method: 'DELETE',
            })
                .catch(() => Promise.reject({ error: 'Network Error' }))
                .then(convertError)
                .then(items => {
                    renderItems(items);
                    updateStatus('');
                })
                .catch(err => {
                    updateStatus(errMsgs[err.error] || err.error);
                });
        }

        if (e.target.classList.contains('addition')) {
            const itemId = e.target.dataset.item;
            fetch(`/add/${itemId}`, {
                method: 'PATCH',
            })
                .catch(() => Promise.reject({ error: 'Network Error' }))
                .then(convertError)
                .then(items => {
                    renderItems(items);
                })
                .catch(err => {
                    updateStatus(errMsgs[err.error] || err.error);
                })
        }

        if (e.target.classList.contains('substract')) {
            const itemId = e.target.dataset.item;
            fetch(`/sub/${itemId}`, {
                method: 'PATCH',
            })
                .catch(() => Promise.reject({ error: 'Network Error' }))
                .then(convertError)
                .then(items => {
                    renderItems(items);
                })
                .catch(err => {
                    updateStatus(errMsgs[err.error] || err.error);
                })
        }
    });

    buttonE1.addEventListener('click', () => {
        const itemName = inputE1.value;

        if (itemName) {
            fetch(`/items/${itemName}`, {
                method: 'POST',
            })
                .catch(() => Promise.reject({ error: 'NetWork Error' }))
                .then(convertError)
                .then(items => {
                    inputE1.value = '';
                    renderItems(items);
                    updateStatus('');
                })
                .catch(err => {
                    updateStatus(errMsgs[err.error] || err.error);
                });
        }
    });

    fetch('/items/', {
        method: 'GET',
    })
        .catch(() => Promise.reject({ error: 'NetWork Error' }))
        .then(convertError)
        .then(items => {
            renderItems(items);
            updateStatus('');
        })
        .catch(err => {
            updateStatus(errMsgs[err.error] || err.error);
        });

})();