/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./recipedetail.js":
/*!*************************!*\
  !*** ./recipedetail.js ***!
  \*************************/
/***/ ((module) => {

var recipes = {
  "001": {
    id: '001',
    author: 'Jason',
    title: 'Pasta',
    ingredients: 'olive oil, Pasta, Sauce, tomato',
    instruction: '1. boil water, 2.boil pasta, 3.mix sauce with tomata, 4. serve'
  },
  "002": {
    id: '002',
    author: 'Adam',
    title: 'Ramen',
    ingredients: 'Noodle, water, spring-onion',
    instruction: '1 boil water, 2.cook noodle, 3.Add power'
  },
  "003": {
    id: '003',
    author: 'Pete',
    title: 'Cookies',
    ingredients: 'Cookie doug',
    instruction: '1. make a cookie dough'
  }
};
var recipedetails = {
  recipes: recipes
};
module.exports = recipedetails;

/***/ }),

/***/ "./src/service.js":
/*!************************!*\
  !*** ./src/service.js ***!
  \************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "performLogin": () => (/* binding */ performLogin),
/* harmony export */   "checkLoginStatus": () => (/* binding */ checkLoginStatus),
/* harmony export */   "performLogout": () => (/* binding */ performLogout)
/* harmony export */ });
var performLogin = function performLogin(username) {
  return fetch('/session', {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json'
    }),
    body: JSON.stringify({
      username: username
    })
  })["catch"](function () {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }

    return response.json().then(function (err) {
      return Promise.reject(err);
    });
  });
};
var checkLoginStatus = function checkLoginStatus() {
  console.log("checkLoginStatus() activated");
  return fetch('/session', {
    method: 'GET'
  })["catch"](function () {
    return Promise.reject({
      error: 'network-error'
    });
  }).then(function (response) {
    if (response.ok) {
      return response.json();
    }

    return response.json().then(function (err) {
      return Promise.reject(err);
    });
  })["catch"](function () {
    return Promise.reject({
      error: 'Login Required'
    });
  });
};
var performLogout = function performLogout(username) {
  return fetch('/session', {
    method: 'DELETE',
    headers: new Headers({
      'content-type': 'application/json'
    }),
    body: JSON.stringify({
      username: username
    })
  })["catch"](function () {
    return Promise.reject({
      error: 'network-error'
    });
  });
};

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!***********************!*\
  !*** ./src/recipe.js ***!
  \***********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _recipedetail__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../recipedetail */ "./recipedetail.js");
/* harmony import */ var _recipedetail__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_recipedetail__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _service__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./service */ "./src/service.js");



var recipedetail = __webpack_require__(/*! ../recipedetail */ "./recipedetail.js");

var status = {
  username: '',
  isLoggedIn: false
};
var wrapper = document.querySelector('.wrapper');
var home = document.querySelector('.home'); //inital page recipe-title,,, this class="detail" is in static HTML
//need to do the innerHTML

var detailE1 = document.querySelector('.detail'); //inital page Login button <dynamic html below in renderRecipe

var navSpanLogin = document.querySelector('.in-and-out');
var homeLoginButton = document.querySelector('.home-login-button');
var homeLogoutButton = document.querySelector('.home-logout-button');
var recipeListDetail = document.querySelector('.recipe'); //Separage login page

var separateLoginPage = document.querySelector('.login.hidden');
var loginButtonE2 = document.querySelector('.login-button'); //open up the new recipe page button

var openNewRecipeButton = document.querySelector('.add-new.hidden'); //ul class recipes

var listE1 = document.querySelector('.recipes'); //Adding new recipe list div in separate page

var addNewRecipe = document.querySelector('.add-new-recipes');
var recipeTitle = document.querySelector('#recipe-title');
var recipeIngre = document.querySelector('#ingredients-field');
var recipeInstruc = document.querySelector('#instructions-field');
var updateRecipeButton = document.querySelector('.update-recipe-button'); //Detailed Recipe Page

var goback = document.querySelector('.go-back-button');

function renderRecipe(recipes) {
  var recipeItems = Object.values(recipes); //No login

  if (!status.isLoggedIn) {
    homeLoginButton.classList.remove('hidden');
    openNewRecipeButton.classList.add('hidden');
    goback.classList.add('hidden');
    var html = recipeItems.map(function (recipe) {
      return "\n                <li>\n                    <div>\n                        <span class=\"title\" data-recipe=\"".concat(recipe.id, "\">").concat(recipe.title, " by ").concat(recipe.author, "</span>\n                    </div>\n                </li>\n            ");
    }).join('\n');
    listE1.innerHTML = html;
    fetchRecipeDetails();
    gobackHome();
  } else {
    //logged-in below
    homeLogoutButton.classList.remove('hidden');
    openNewRecipeButton.classList.remove('hidden');
    goback.classList.add('hidden');

    var _html = recipeItems.map(function (recipe) {
      return "\n                <li>\n                    <div>\n                        <span class=\"title\" data-recipe=\"".concat(recipe.id, "\">").concat(recipe.title, " by ").concat(recipe.author, "</span>\n                    </div>\n                </li>\n            ");
    }).join('\n');

    listE1.innerHTML = _html;
    console.log("86 done rendering recipes");
    fetchRecipeDetails();
    gobackHome();
  }

  ;
}

;

function fetchRecipeDetails() {
  var titleSpanE1 = document.querySelector('.recipes');
  titleSpanE1.addEventListener('click', function (e) {
    if (!e.target.classList.contains('title')) {
      return;
    }

    e.preventDefault();
    document.querySelector('.contents').classList.add('hidden');
    detailE1.classList.remove('hidden');
    var id = e.target.dataset.recipe;
    return fetch('recipe', {
      method: 'GET'
    })["catch"](function () {
      return Promise.reject({
        error: "Network Error"
      });
    }).then(convertError).then(function (recipe) {
      detailE1.innerHTML = "\n                <div class=\"detail-recipe-title\">\n                    <h2>[".concat(recipe[id].title, "]</h2>\n                    <span id=\"detail-id\">by ").concat(recipe[id].author, "</span >\n                </div >\n                <div class=\"detail-ingredients\">\n                    <h3 id=\"detail-ing-label\">Ingredients: </h3>\n                    <p>").concat(recipe[id].ingredients, "</p>\n                </div>\n                <div class=\"detail-instructions\">\n                    <h3 id=\"detail-instruc-label\">Instructions: </h3>\n                    <p>").concat(recipe[id].instruction, "</p>\n                </div>\n                 ");
      goback.classList.remove('hidden');
    });
  });
}

;

function gobackHome() {
  goback.addEventListener('click', function () {
    document.querySelector('.detail').classList.add('hidden');
    document.querySelector('.contents').classList.remove('hidden');
    goback.classList.add('hidden');
    fetchingUpdatedRecipes();
  });
}

;

function sendMeHome() {
  home.addEventListener('click', function () {
    fetchingUpdatedRecipes();
  });
}

;

function addLogin() {
  loginButtonE2.addEventListener('click', function () {
    var usernameE1 = document.querySelector('.login input');
    var username = usernameE1.value;
    (0,_service__WEBPACK_IMPORTED_MODULE_1__.performLogin)(username).then(function (userInfo) {
      showContents();
      removeLogin();
      status.isLoggedIn = true;
      status.username = username;
      fetchingUpdatedRecipes();
      optionToLogout();
      usernameE1.value = '';
    })["catch"](function (err) {
      console.log(err);
    });
  });
}

;

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

homeLoginButton.addEventListener('click', function () {
  showLogin();
  homeLoginButton.classList.add('hidden');
}); //logout button

function optionToLogout() {
  homeLogoutButton.addEventListener('click', function () {
    (0,_service__WEBPACK_IMPORTED_MODULE_1__.performLogout)();
    status.isLoggedIn = false;
    homeLogoutButton.classList.add('hidden');
    fetchingUpdatedRecipes();
  });
}

;

function goToAddRecipePage() {
  wrapper.classList.add('hidden');
  addNewRecipe.classList.remove('hidden');
}

;
openNewRecipeButton.addEventListener('click', function () {
  goToAddRecipePage();
});

function goToRenderPage() {
  wrapper.classList.remove('hidden');
  addNewRecipe.classList.add('hidden');
}

;
updateRecipeButton.addEventListener('click', function () {
  addRecipes();
  goToRenderPage();
});

function convertError(response) {
  if (response.ok) {
    return response.json();
  }

  return response.json().then(function (err) {
    return Promise.reject(err);
  });
}

;

function addRecipes() {
  var author = status.username;
  var title = recipeTitle.value;
  var ingredients = recipeIngre.value;
  var instruction = recipeInstruc.value;
  return fetch("/recipe/".concat(title, " "), {
    method: 'POST',
    headers: new Headers({
      'content-type': 'application/json'
    }),
    body: JSON.stringify({
      author: author,
      title: title,
      ingredients: ingredients,
      instruction: instruction
    })
  })["catch"](function () {
    Promise.reject({
      error: 'Network Error'
    });
  }).then(convertError).then(function (recipe) {
    renderRecipe(recipe);
    recipeTitle.value = '';
    recipeIngre.value = '';
    recipeInstruc.value = '';
  });
}

;

function fetchingUpdatedRecipes() {
  return fetch('/recipe', {
    method: 'GET'
  })["catch"](function () {
    return Promise.reject({
      error: "Network Error"
    });
  }).then(convertError).then(function (recipe) {
    renderRecipe(recipe);
  });
}

;
sendMeHome();

if (!status.isLoggedIn) {
  addLogin();
}

console.log("278 checking login status");
(0,_service__WEBPACK_IMPORTED_MODULE_1__.checkLoginStatus)().then(function (username) {
  addLogin();
  status.isLoggedIn = true;
  fetchingUpdatedRecipes();
})["catch"](function () {
  fetchingUpdatedRecipes();
});
})();

/******/ })()
;
//# sourceMappingURL=recipe.js.map