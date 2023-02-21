import { recipeState } from "../State/Recipe";


export function recipeReducer(state, action) {
    switch (action.type) {
        case "changePrimitiveType":
            return {...state, [action.propertyId]: action.value}
        case "Reset":
            return {...recipeState}    
        default:
            break;
    }
}