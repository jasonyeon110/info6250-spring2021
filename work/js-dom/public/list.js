"use strict";
(function iife() {

    const wishItems = [
        {
            item: 'computer',
            quant: 0,
            done: false,
        },
        {
            item: 'monitor',
            quant: 0,
            done: false,
        },
    ];

    const listE1 = document.querySelector('#list-app .item-list');
    const inputE1 = document.querySelector('#list-app input');
    const buttonE1 = document.querySelector('#list-app button');
    const subButtonE1 = document.querySelector('.item-list .substract');

    disableButtonIfNoInput();
    addAbilityToAddItems();
    addAbilityToDeleteItems();
    addAbilityToIncreaseQuant();
    addAbilitytoDecreaseQuant();

    render(wishItems);

    function render(wishItems) {

        const html = wishItems.map((listItem, index) => {
            return `
            <li>
                <button class="delete" data-index="${index}">x</button>
                <span class="item ${listItem.done ? "complete" : ""}" data-index="${index}">"${listItem.item}"</span>
                <div id="quant-container">
                    <button class="substract" data-index="${index}"> - </button>
                    <span class="quant">[${listItem.quant}]</span>
                    <button class="addition" data-index="${index}"> + </button>
                </div>
            </li>
            `;
        }).join('');

        listE1.innerHTML = html;

        buttonE1.disabled = !inputE1.value;
    };

    function disableButtonIfNoInput() {
        inputE1.addEventListener('input', () => {
            buttonE1.disabled = !inputE1.value;
        });
    }

    function addAbilityToAddItems() {
        buttonE1.addEventListener('click', (e) => {
            const newList = {
                item: inputE1.value,
                quant: 0,
                done: false,
            };
            wishItems.push(newList);

            inputE1.value = '';

            render(wishItems);
        });
    }

    function addAbilityToDeleteItems() {
        listE1.addEventListener('click', (e) => {
            if (!e.target.classList.contains('delete')) {
                return;
            }

            const index = e.target.dataset.index;
            wishItems.splice(index, 1);

            render(wishItems);
        });
    }

    function addAbilityToIncreaseQuant() {
        listE1.addEventListener('click', (e) => {
            if (!e.target.classList.contains('addition')) {
                return;
            }

            const index = e.target.dataset.index;
            wishItems[index].quant++;

            render(wishItems);
        });
    }

    function addAbilitytoDecreaseQuant() {
        listE1.addEventListener('click', (e) => {
            if (!e.target.classList.contains('substract')) {
                return;
            }
            const index = e.target.dataset.index;

            if (wishItems[index].quant === 0) {
                subButtonE1.disabled;
            }

            wishItems[index].quant--;

            render(wishItems);
        });
    }

})();