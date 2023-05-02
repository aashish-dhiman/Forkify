import * as model from "./model.js";
import recipeView from "./views/recipeView.js";
import searchView from "./views/searchView.js";
import resultsView from "./views/resultsView.js";
import paginationView from "./views/paginationView.js";
import bookmarksView from "./views/bookmarksView.js";

import "core-js/stable";
import "regenerator-runtime/runtime";
// console.log(icons);

//prevent reloading pages
if (module.hot) {
    module.hot.accept();
}

const recipeContainer = document.querySelector(".recipe");

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function () {
    try {
        //getting recipe id
        const id = window.location.hash.slice(1);
        // console.log(id);

        if (!id) return;

        // rendering spinner
        recipeView.renderSpinner();

        //highlight the current recipe
        resultsView.update(model.getSearchResultsPage());

        // 1. Loading Recipe
        await model.loadRecipe(id);

        // 2. rendering results
        console.log(model.state.recipe);

        //3. Rendering Recipe
        recipeView.render(model.state.recipe);

        //4.updating bookmarks view
        bookmarksView.update(model.state.bookmarks);
    } catch (err) {
        console.log(err);
        recipeView.renderError();
    }
};

const controlSearchResults = async function () {
    try {
        resultsView.renderSpinner();

        // get search results
        const query = searchView.getQuery();
        if (!query) return;

        // load search results
        await model.loadSearchResult(query);

        // render results
        // console.log(model.state.search.results);
        // resultsView.render(model.state.search.results);
        // console.log(model.getSearchResultsPage());
        resultsView.render(model.getSearchResultsPage());

        //render pagination buttons
        paginationView.render(model.state.search);
    } catch (err) {
        console.log(err);
    }
};

const controlPagination = function (gotoPage) {
    // render results
    resultsView.render(model.getSearchResultsPage(gotoPage));
    //render pagination buttons
    paginationView.render(model.state.search);
};

const controlServings = function (newServing) {
    //update recipe servings(in state)
    model.updateServings(newServing);

    //update recipe view
    // recipeView.render(model.state.recipe);
    recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
    //add or remove bookmark
    if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
    else if (model.state.recipe.bookmarked)
        model.deleteBookmark(model.state.recipe.id);

    // console.log(model.state.recipe);
    //updating the recipe view->
    recipeView.update(model.state.recipe);

    //render bookmarks->
    bookmarksView.render(model.state.bookmarks);
};

controlBookmarks = function () {
    bookmarksView.render(model.state.bookmarks);
};

const init = function () {
    bookmarksView.addHandlerRender(controlBookmarks);
    recipeView.addHandlerRender(controlRecipes);
    recipeView.addHandlerUpdateServings(controlServings);
    recipeView.addHandlerAddBookmark(controlAddBookmark);
    searchView.addHandlerSearch(controlSearchResults);
    paginationView.addHandlerClick(controlPagination);
};
init();
