import { createContext, useEffect, useReducer } from "react";
import Header from "./components/Header";
import LeftMenu from "./components/LeftMenu";
import Recipe from "./components/Recipe";
import { recipeReducer } from "./state/Reducer/Recipe";
import { recipeState } from "./state/State/Recipe";


export const StoreContextRecipe = createContext({})

function App() {

  const [stateRecipe, dispachRecipe] = useReducer(recipeReducer, recipeState)

  useEffect(() => {
    console.log(stateRecipe);
  }, [stateRecipe.recipes.length])

  return (
      <StoreContextRecipe.Provider value= { { stateRecipe, dispachRecipe } }>
        <div className="container">
           <Header/>
           <LeftMenu/>
           <Recipe/> 
        </div>
      </StoreContextRecipe.Provider>
  );
}

export default App;
