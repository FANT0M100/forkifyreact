import { useContext } from "react";
import { StoreContextRecipe } from "../../App";
import { limitRecipeTitle } from "../../utils";


const LikesView = () => {

    const {stateRecipe, dispachRecipe} = useContext(StoreContextRecipe)

    const clickHandlerFn = (id) => {
        dispachRecipe({
            type: "changePrimitiveType",
            propertyId: "recipeId",
            value: id
        })
    }

    return(
        <div className="likes__panel">
                <ul className="likes__list">
                    {
                        stateRecipe.likes.map((el, index) => (
                            <li key={index}>
                               <a className="likes__link" href="#" onClick={() => clickHandlerFn(el?.id)}>
                                  <figure className="likes__fig">
                                   <img src={el?.img} alt={el?.title}/>
                               </figure>
                               <div className="likes__data">
                                   <h4 className="likes__name">{limitRecipeTitle(el?.title)}</h4>
                                   <p className="likes__author">{el?.publisher}</p>
                               </div>
                              </a>
                           </li>
                        ))
                    }
                </ul>
            </div>
    )
}

export default LikesView;