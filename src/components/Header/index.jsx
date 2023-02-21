import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useContext } from 'react'
import { StoreContextRecipe } from '../../App'
import axios from 'axios'

const schema = yup.object().shape({
    recipe: yup.string().required("Required")
})

const Header = () => {

    const {stateRecipe, dispachRecipe} = useContext(StoreContextRecipe)

    const { register, handleSubmit, formState: {errors} } = useForm({
        resolver: yupResolver(schema),
    });

    const fetchData = async (query) => {
        const result = await axios(`http://forkify-api.herokuapp.com/api/search?q=${query}`)
        dispachRecipe({
            type: "changePrimitiveType",
            propertyId: "recipes",
            value: result.data.recipes
        })
    }

    const onSubmit = (data) => {
        fetchData(data.recipe)
        dispachRecipe({
            type: "changePrimitiveType",
            propertyId: "query",
            value: ''
        })
    };

    const onFormError = (error) => {
        console.log(error);
    }

    return(
        <header className="header">
        <img src="img/logo.png" alt="Logo" className="header__logo"/>
        <form className="search" onSubmit={handleSubmit(onSubmit, onFormError)}>
            <input 
              {...register('recipe', {
                onChange: (e) => {
                    dispachRecipe({
                        type: "changePrimitiveType",
                        propertyId: "query",
                        value: e.target.value
                    })
                }
              })}
              value={stateRecipe?.query || ''}
              name='recipe'
              type="text" 
              className="search__field" 
              placeholder="Search over 1,000,000 recipes..."
            />
            <button className="btn search__btn">
                <svg className="search__icon">
                    <use href="img/icons.svg#icon-magnifying-glass"></use>
                </svg>
                <span>Search</span>
            </button>
        </form>
        <div className="likes">
            <div className="likes__field">
                <svg className="likes__icon">
                    <use href="img/icons.svg#icon-heart"></use>
                </svg>
            </div>
            <div className="likes__panel">
                <ul className="likes__list">
                    <li>
                        <a className="likes__link" href="#23456">
                            <figure className="likes__fig">
                                <img src="img/test-1.jpg" alt="Test"/>
                            </figure>
                            <div className="likes__data">
                                <h4 className="likes__name">Pasta with Tomato ...</h4>
                                <p className="likes__author">The Pioneer Woman</p>
                            </div>
                        </a>
                    </li>
                </ul>
            </div>
        </div>
    </header>
    )
}

export default Header;