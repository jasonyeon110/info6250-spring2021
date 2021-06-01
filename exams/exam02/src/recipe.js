import recipedetails from '../recipedetail';
import {
    checkLoginStatus,
    performLogin,
    performLogout,
} from './service';

const recipedetail = require('../recipedetail');

const status = {
    username: '',
    isLoggedIn: false,
};

const wrapper = document.querySelector('.wrapper');
const home = document.querySelector('.home');

//inital page recipe-title,,, this class="detail" is in static HTML
//need to do the innerHTML
const detailE1 = document.querySelector('.detail');

//inital page Login button <dynamic html below in renderRecipe
const navSpanLogin = document.querySelector('.in-and-out');
const homeLoginButton = document.querySelector('.home-login-button');
const homeLogoutButton = document.querySelector('.home-logout-button');
const recipeListDetail = document.querySelector('.recipe');

//Separage login page
const separateLoginPage = document.querySelector('.login.hidden');
const loginButtonE2 = document.querySelector('.login-button');

//open up the new recipe page button
const openNewRecipeButton = document.querySelector('.add-new.hidden');

//ul class recipes
const listE1 = document.querySelector('.recipes');

//Adding new recipe list div in separate page
const addNewRecipe = document.querySelector('.add-new-recipes');
const recipeTitle = document.querySelector('#recipe-title');
const recipeIngre = document.querySelector('#ingredients-field');
const recipeInstruc = document.querySelector('#instructions-field');
const updateRecipeButton = document.querySelector('.update-recipe-button');

//Detailed Recipe Page
const goback = document.querySelector('.go-back-button');


function renderRecipe(recipes) {
    const recipeItems = Object.values(recipes);

    //No login
    if (!status.isLoggedIn) {
        homeLoginButton.classList.remove('hidden');
        openNewRecipeButton.classList.add('hidden');
        goback.classList.add('hidden');
        const html = recipeItems.map(recipe => {
            return `
                <li>
                    <div>
                        <span class="title" data-recipe="${recipe.id}">${recipe.title} by ${recipe.author}</span>
                    </div>
                </li>
            `
        }).join('\n');
        listE1.innerHTML = html;
        fetchRecipeDetails();
        gobackHome();

    } else {
        //logged-in below

        homeLogoutButton.classList.remove('hidden');
        openNewRecipeButton.classList.remove('hidden');
        goback.classList.add('hidden');
        const html = recipeItems.map(recipe => {
            return `
                <li>
                    <div>
                        <span class="title" data-recipe="${recipe.id}">${recipe.title} by ${recipe.author}</span>
                    </div>
                </li>
            `
        }).join('\n');
        listE1.innerHTML = html;
        console.log(`86 done rendering recipes`);
        fetchRecipeDetails();
        gobackHome();
    };
};

function fetchRecipeDetails() {
    const titleSpanE1 = document.querySelector('.recipes');
    titleSpanE1.addEventListener('click', (e) => {
        if (!e.target.classList.contains('title')) {
            return;
        }
        e.preventDefault();

        document.querySelector('.contents').classList.add('hidden');
        detailE1.classList.remove('hidden');

        const id = e.target.dataset.recipe;
        return fetch('recipe', {
            method: 'GET',
        })
            .catch(() => Promise.reject({ error: "Network Error" }))
            .then(convertError)
            .then(recipe => {
                detailE1.innerHTML = `
                <div class="detail-recipe-title">
                    <h2>[${recipe[id].title}]</h2>
                    <span id="detail-id">by ${recipe[id].author}</span >
                </div >
                <div class="detail-ingredients">
                    <h3 id="detail-ing-label">Ingredients: </h3>
                    <p>${recipe[id].ingredients}</p>
                </div>
                <div class="detail-instructions">
                    <h3 id="detail-instruc-label">Instructions: </h3>
                    <p>${recipe[id].instruction}</p>
                </div>
                 `
                goback.classList.remove('hidden');
            })
    })
};

function gobackHome() {
    goback.addEventListener('click', () => {
        document.querySelector('.detail').classList.add('hidden');
        document.querySelector('.contents').classList.remove('hidden');
        goback.classList.add('hidden');
        fetchingUpdatedRecipes();
    })
};

function sendMeHome() {
    home.addEventListener('click', () => {
        fetchingUpdatedRecipes();
    })
};

function addLogin() {
    loginButtonE2.addEventListener('click', () => {
        const usernameE1 = document.querySelector('.login input');
        const username = usernameE1.value;

        performLogin(username)
            .then((userInfo) => {
                showContents();
                removeLogin();
                status.isLoggedIn = true;
                status.username = username;
                fetchingUpdatedRecipes();
                optionToLogout();
                usernameE1.value = '';
            })
            .catch(err => {
                console.log(err);
            })
    });
};

function showLogin() {
    document.querySelector('.login').classList.remove('hidden');
    document.querySelector('.wrapper').classList.add('hidden');
}

function removeLogin() {
    document.querySelector('.login').classList.add('hidden');
}

function showContents() {
    document.querySelector('.wrapper').classList.remove('hidden');
}

homeLoginButton.addEventListener('click', () => {
    showLogin();
    homeLoginButton.classList.add('hidden');
});

//logout button
function optionToLogout() {
    homeLogoutButton.addEventListener('click', () => {
        performLogout();
        status.isLoggedIn = false;
        homeLogoutButton.classList.add('hidden');
        fetchingUpdatedRecipes();
    });
};

function goToAddRecipePage() {
    wrapper.classList.add('hidden');
    addNewRecipe.classList.remove('hidden');
};

openNewRecipeButton.addEventListener('click', () => {
    goToAddRecipePage();
});

function goToRenderPage() {
    wrapper.classList.remove('hidden');
    addNewRecipe.classList.add('hidden');
};

updateRecipeButton.addEventListener('click', () => {
    addRecipes();
    goToRenderPage();
});

function convertError(response) {
    if (response.ok) {
        return response.json();
    }
    return response.json()
        .then(err => Promise.reject(err));
};

function addRecipes() {
    const author = status.username;
    const title = recipeTitle.value;
    const ingredients = recipeIngre.value;
    const instruction = recipeInstruc.value;

    return fetch(`/recipe/${title} `, {
        method: 'POST',
        headers: new Headers({
            'content-type': 'application/json',
        }),
        body: JSON.stringify({ author, title, ingredients, instruction }),
    })
        .catch(() => {
            Promise.reject({ error: 'Network Error' })
        })
        .then(convertError)
        .then(recipe => {
            renderRecipe(recipe);
            recipeTitle.value = '';
            recipeIngre.value = '';
            recipeInstruc.value = '';
        })
};

function fetchingUpdatedRecipes() {
    return fetch('/recipe', {
        method: 'GET',
    })
        .catch(() => Promise.reject({ error: "Network Error" }))
        .then(convertError)
        .then(recipe => {
            renderRecipe(recipe)
        })
};

sendMeHome();

if (!status.isLoggedIn) {
    addLogin();
}


console.log(`278 checking login status`)
checkLoginStatus()
    .then((username) => {
        addLogin();
        status.isLoggedIn = true;
        fetchingUpdatedRecipes()

    })
    .catch(() => {
        fetchingUpdatedRecipes()
    });