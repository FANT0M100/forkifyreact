import { createContext, useEffect, useReducer } from "react";
import { Route, Routes } from "react-router-dom";
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
     <Routes>
      <Route path="/" element={
      <StoreContextRecipe.Provider value= { { stateRecipe, dispachRecipe } }>
        <div className="container">
           <Header/>
           <LeftMenu/>
        </div>
      </StoreContextRecipe.Provider>
      }/>
      <Route path="/recipe/:id" element={<Recipe/>}/>
     </Routes>
  );
}

export default App;
