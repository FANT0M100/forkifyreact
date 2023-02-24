import * as yup from 'yup'
import { yupResolver } from '@hookform/resolvers/yup'
import { useForm } from 'react-hook-form'
import { useContext } from 'react'
import { StoreContextRecipe } from '../../App'
import LikesView from '../Likes'


const schema = yup.object().shape({
    recipe: yup.string().required("Required")
})

const Header = () => {

    const {stateRecipe, dispachRecipe} = useContext(StoreContextRecipe)

    const { register, handleSubmit, formState: {errors} } = useForm({
        resolver: yupResolver(schema),
    });


    const onSubmit = (data) => {
        dispachRecipe({
            type: "changePrimitiveType",
            propertyId: "query",
            value: data?.recipe
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
                        propertyId: "inputQuery",
                        value: e.target.value
                    })
                }
              })}
              value={stateRecipe?.inputQuery || ''}
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
            <div className="likes__field" style={{ visibility: !!stateRecipe.likes.length ? "visible" : "hidden" }}>
                <svg className="likes__icon">
                    <use href="img/icons.svg#icon-heart"></use>
                </svg>
            </div>
            <LikesView />
        </div>
    </header>
    )
}

export default Header;