import { recipeState } from "../State/Recipe";


export function recipeReducer(state, action) {
    switch (action.type) {
        case "changePrimitiveType":
            return {...state, [action.propertyId]: action.value}
        case 'addLikes':
             const index1 = state?.likes.findIndex(el => el?.id === action.value.id)
             index1 === -1 && state.likes.push(action.value)
             window.localStorage.setItem('likes', JSON.stringify(state.likes))
             return {...state}
        case 'deleteLikes': 
             const index2 = state?.likes.findIndex(el => el?.id === action.value)
             index2 !== -1 && state.likes.splice(index2, 1)
             window.localStorage.setItem('likes', JSON.stringify(state.likes))
            return {...state}
        case 'initLikes':
            return {...state, likes: action.value}    
        case "Reset":
            return {...recipeState}    
        default:
            break;
    }
}