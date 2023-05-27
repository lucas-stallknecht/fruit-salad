import PropTypes from 'prop-types';
import { useContext, useState } from 'react';
import { Link } from "react-router-dom";
import CartContext from '../contexts/CartContext';


const FruitsPreview = ({fruit}) => {

    const [in_cart, setCartCounter] = useState(0);
    const {addFruit, removeFruit} = useContext(CartContext);

    const add_to_cart_stock = () => {
        if(in_cart < fruit.stock ){
            setCartCounter(in_cart+1);
            addFruit(fruit);
        }
    }

    const remove_from_cart_stock = () => {
        if(in_cart > 0){
            setCartCounter(in_cart-1);
            removeFruit(fruit);
        }
    }
    

    return (
        <li className="FruitsPreview">
            <div className="adding-to-cart-cont">
                    <button onClick={() => remove_from_cart_stock()}>-</button>
                    <div className="counter">{in_cart}</div>
                    <button onClick={() => add_to_cart_stock()}>+</button>
                </div>
            <Link to={"fruits/"+fruit.id} style={{boxShadow: "0px 10px 0px "+ fruit.color}} onClick={() => document.querySelector("#Pop").style.display = "block"}>
                <img src={require("../images/" + fruit.image)} alt="" className="fruit-image"/>
                {fruit.name}
            </Link>
        </li>
    );

}

FruitsPreview.propTypes = {
    fruit: PropTypes.instanceOf(Object)
}

export default FruitsPreview;