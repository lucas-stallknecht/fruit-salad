import { useForm } from "react-hook-form";


const Search = ({onSubmit}) => {

    const {register , handleSubmit } = useForm();


    return (
        <form onSubmit={handleSubmit(data => onSubmit(data))}>

            <input type="text" {...register("fruitName")} />
            <input type="submit" value="Rechercher"/>

        </form>
    );

}

export default Search;