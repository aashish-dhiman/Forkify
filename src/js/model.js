import { API_URL, RES_PER_PAGE } from "./config.js";
import { getJSON } from "./views/helper.js";
import recipeView from "./views/recipeView.js";

export const state = {
    recipe: {},
    search: {
        query: "",
        results: [],
        resultsPerPage: RES_PER_PAGE,
        page: 1,
    },
};

export const loadRecipe = async function (id) {
    try {
        const data = await getJSON(`${API_URL}${id}`);

        let { recipe } = data.data;
        state.recipe = {
            id: recipe.id,
            title: recipe.title,
            publisher: recipe.publisher,
            sourceUrl: recipe.source_url,
            image: recipe.image_url,
            servings: recipe.servings,
            cookingTime: recipe.cooking_time,
            ingredients: recipe.ingredients,
        };
        // console.log(state.recipe);
    } catch (err) {
        //rejects current promise and calls the parent promise from controller.js
        throw err;
    }
};

export const loadSearchResult = async function (query) {
    try {
        state.search.query = query;
        const data = await getJSON(`${API_URL}?search=${query}`);
        console.log(data);

        state.search.results = data.data.recipes?.map((rec) => {
            return {
                id: rec.id,
                title: rec.title,
                publisher: rec.publisher,
                image: rec.image_url,
            };
        });
    } catch (err) {
        throw err;
    }
};

export const getSearchResultsPage = function (page = state.search.page) {
    state.search.page = page;
    const start = (page - 1) * state.search.resultsPerPage; //0
    const end = page * state.search.resultsPerPage; //9
    // console.log(state.search.resultsPerPage);
    // console.log(start, end);

    return state.search.results.slice(start, end);
};

export const updateServings = function (newServing) {
    state.recipe.ingredients.forEach((ing) => {
        ing.quantity = (ing.quantity * newServing) / state.recipe.servings;
        //formula-> oldQty * newServing / oldServing
    });
    state.recipe.servings = newServing;
};
