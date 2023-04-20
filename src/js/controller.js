import * as model from "./model.js";
import recipeView from "./views/recipeView.js";

import "core-js/stable";
import "regenerator-runtime/runtime";
// console.log(icons);

const recipeContainer = document.querySelector(".recipe");

// https://forkify-api.herokuapp.com/v2

///////////////////////////////////////

const controlRecipes = async function () {
    try {
        //getting recipe id
        const id = window.location.hash.slice(1);
        console.log(id);
        
        if (!id) return;

        // rendering spinner
        recipeView.renderSpinner();

        // 1. Loading Recipe
        await model.loadRecipe(id);

        // 2. rendering recipe
        console.log(model.state.recipe);
        recipeView.render(model.state.recipe);
    } catch (err) {
        console.log(err);
    }
};

const init = function () {
    recipeView.addHandlerRender(controlRecipes);
};
init();
