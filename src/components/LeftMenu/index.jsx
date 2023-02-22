import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useQuery } from "react-query";
import { boolean } from "yup";
import { StoreContextRecipe } from "../../App";
import { limitRecipeTitle } from "../../utils";


function classNames(...classes) {
    return classes.filter(boolean).join(' ')
}

const LeftMenu = () => {

    const [start, setStart] = useState(0)
    const [end, setEnd] = useState(5)
    const [page, setPage] = useState(1)

    const {stateRecipe, dispachRecipe} = useContext(StoreContextRecipe)

    const { isLoading, isError, data, error, refetch} = useQuery(stateRecipe?.query, fetchData, {
        variable: stateRecipe?.query,
        skip: !stateRecipe.query
    })

    async function fetchData( {queryKey }) {
        const [query] = queryKey;
        if(!query) return [];
        const result = await axios(`http://forkify-api.herokuapp.com/api/search?q=${query}`)
        return result?.data?.recipes
    }

    useEffect(() => {
        stateRecipe?.query && refetch()
        setPage(1)
    }, [stateRecipe?.query])

    useEffect(() => {
        setStart((page - 1) * 5)
        setEnd(page * 5)
    }, [page])

    const redirectHendler = (id) => {
        dispachRecipe({
            type: "changePrimitiveType",
            propertyId: "recipeId",
            value: id
        })
    }
 
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

    return(
        <div className="results">
            <ul className="results__list">
                {
                    !!data?.length && data?.slice(start, end).map((el, index) => (
                     <li key={index}>
                        <a className={classNames(stateRecipe?.recipeId === el?.recipe_id ? "results__link--active" : "", "results__link")} href="#" onClick={() => redirectHendler(el.recipe_id)}>
                            <figure className="results__fig">
                                <img src={el.image_url} alt={el.title}/>
                            </figure>
                            <div className="results__data">
                                <h4 className="results__name">{limitRecipeTitle(el.title)}</h4>
                                <p className="results__author">{el.publisher}</p>
                            </div>
                        </a>
                    </li>
                    ))
                }
            </ul>
            <div className="results__pages">
               
                { page > 1 && page <= Math.ceil(data?.length / 5) &&
                  <button class="btn-inline results__btn--prev" onClick={() => setPage(value => value - 1)}>
                   <span>Page {page -1}</span> 
                  <svg class="search__icon">
                      <use href="img/icons.svg#icon-triangle-left"></use>
                  </svg>
                 </button>
                }
                
                
                { page < Math.ceil(data?.length / 5) &&
                <button className="btn-inline results__btn--next" onClick={() => setPage(value => value + 1)}>
                    <span>Page {page + 1}</span>
                    <svg className="search__icon">
                        <use href="img/icons.svg#icon-triangle-right"></use>
                    </svg>
                </button>
                }
            </div>
        </div>   
    )
}

export default LeftMenu;