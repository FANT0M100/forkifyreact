import { useContext } from "react";
import { Link } from "react-router-dom";
import { StoreContextRecipe } from "../../App";


const LeftMenu = () => {

    const {stateRecipe, dispachRecipe} = useContext(StoreContextRecipe)

    return(
        <div className="results">
            <ul className="results__list">
                {
                    stateRecipe?.recipes && stateRecipe?.recipes.map((el, index) => (
                     <li key={index}>
                        <Link className="results__link" to={`recipe/${el.recipe_id}`}>
                            <figure className="results__fig">
                                <img src={el.image_url} alt={el.title}/>
                            </figure>
                            <div className="results__data">
                                <h4 className="results__name">{el.title}</h4>
                                <p className="results__author">{el.publisher}</p>
                            </div>
                        </Link>
                    </li>
                    ))
                }
            </ul>
        </div>   
    )
}

export default LeftMenu;