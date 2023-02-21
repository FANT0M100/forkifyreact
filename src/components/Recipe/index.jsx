import { useEffect } from "react";
import { useParams } from "react-router-dom";



const Recipe = () => {
    const { id } = useParams()

    useEffect(() => {

    }, [id])
    return(
        <div>
            {id}
        </div>
    )
}


export default Recipe;