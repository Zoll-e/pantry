import axios from "axios";
import {GET_RECIPES,RECIPES_FAIL} from "./types";

export const getRecipes = search => async dispatch => {


    try {

        let res = await axios.get("/api/recipe/");

        res.data = await res.data.filter(res => res.dish.toLowerCase().includes(search.toLowerCase()));

        dispatch({type: GET_RECIPES, payload:{ data:res.data,search}});
    } catch (err) {
        dispatch({type:RECIPES_FAIL});
    }
}
