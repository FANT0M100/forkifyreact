import axios from "axios";
import { useContext, useEffect } from "react";
import { useQuery } from "react-query";
import { StoreContextRecipe } from "../../App";
import { parseIngredients } from "../../utils";



const Recipe = () => {

    const {stateRecipe, dispachRecipe} = useContext(StoreContextRecipe)

    const { isLoading, isError, data, error, refetch} = useQuery(stateRecipe?.recipeId, fetchData, {
        variable: stateRecipe?.recipeId,
        skip: !stateRecipe.recipeId
    })

    async function fetchData( {queryKey }) {
        const [query] = queryKey;
        if(!query) return [];
        const result = await axios(`http://forkify-api.herokuapp.com/api/get?rId=${query}`)
        return result?.data?.recipe
    }

    useEffect(() => {
        stateRecipe?.recipeId && refetch()
    }, [stateRecipe.recipeId]) 

    if(isLoading){
        return(
            <div className='loader'>
            <svg>
                <use href="img/icons.svg#icon-cw"/>
            </svg>
         </div>
        )
    }

    if(isError) {
        return(
            <span>Error: {error.message}</span>
        )
    }

    if(!stateRecipe.recipeId) {
        return(
            <div className="recipe">
            <figure className="recipe__fig">
                <h1 className="recipe__title">
                    <span>No Data</span>
                </h1>
            </figure>
            </div>
        )
    }


    return(
        <div className="recipe">
            <figure className="recipe__fig">
                <img src={data?.image_url || '/'} alt={data?.title} className="recipe__img"/>
                <h1 className="recipe__title">
                    <span>{data?.title}</span>
                </h1>
            </figure>
            <div className="recipe__details">
                <div className="recipe__info">
                    <svg className="recipe__info-icon">
                        <use href="img/icons.svg#icon-stopwatch"></use>
                    </svg>
                    <span className="recipe__info-data recipe__info-data--minutes">45</span>
                    <span className="recipe__info-text"> minutes</span>
                </div>
                <div className="recipe__info">
                    <svg className="recipe__info-icon">
                        <use href="img/icons.svg#icon-man"></use>
                    </svg>
                    <span className="recipe__info-data recipe__info-data--people">4</span>
                    <span className="recipe__info-text"> servings</span>

                    <div className="recipe__info-buttons">
                        <button className="btn-tiny">
                            <svg>
                                <use href="img/icons.svg#icon-circle-with-minus"></use>
                            </svg>
                        </button>
                        <button className="btn-tiny">
                            <svg>
                                <use href="img/icons.svg#icon-circle-with-plus"></use>
                            </svg>
                        </button>
                    </div>

                </div>
                <button className="recipe__love">
                    <svg className="header__likes">
                        <use href="img/icons.svg#icon-heart-outlined"></use>
                    </svg>
                </button>
            </div>



            <div className="recipe__ingredients">
                <ul className="recipe__ingredient-list">
                    {
                        parseIngredients(data?.ingredients).map((el, index) => (
                            <li key={index} className="recipe__item">
                              <svg className="recipe__icon">
                                 <use href="img/icons.svg#icon-check"></use>
                              </svg>
                              <div className="recipe__count">{el?.count}</div>
                              <div className="recipe__ingredient">
                                <span className="recipe__unit">{el?.unit}</span>
                                 {el?.ingredient}
                              </div>
                           </li>
                        ))
                    }
                </ul>

                <button className="btn-small recipe__btn">
                    <svg className="search__icon">
                        <use href="img/icons.svg#icon-shopping-cart"></use>
                    </svg>
                    <span>Add to shopping list</span>
                </button>
            </div>

            <div className="recipe__directions">
                <h2 className="heading-2">How to cook it</h2>
                <p className="recipe__directions-text">
                    This recipe was carefully designed and tested by
                    <span className="recipe__by">{data?.publisher}</span>. Please check out directions at their website.
                </p>
                <a className="btn-small recipe__btn" href={data?.publisher_url || "#"} target="_blank">
                    <span>Directions</span>
                    <svg className="search__icon">
                        <use href="img/icons.svg#icon-triangle-right"></use>
                    </svg>

                </a>
            </div>
        </div>
    )
}


export default Recipe;