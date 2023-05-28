import { useContext} from "react";
import CartContext from "../contexts/CartContext";

const Cart = () => {

    const {selectedFruits, calculateAmount, fruit_list_data} = useContext(CartContext);

    const countOccurrences = (arr) => {
        var count = {};
        
        arr.reduce(function (acc, curr) {
          if (curr in count) {
            count[curr]++;
          } else {
            count[curr] = 1;
          }
        }, 0);
        
        return count;
      }    

      const counts = countOccurrences(selectedFruits);


        return(
            <div className="Cart PopWindow">
                <button onClick={() => document.querySelector("#Pop").style.display = "none"}>&#10006;</button>
                <div className="cart-top">Taille de la salade : {selectedFruits.length} </div>
                <ul>
                    {Object.keys(counts).map(fruit_id => <li key={fruit_id}>
                        {counts[fruit_id]}x :
                        <img src={require("../images/" + fruit_list_data.find(obj => obj.id == fruit_id).image)} alt="" className="fruit-image"/>
                        ({Math.round(fruit_list_data.find(obj => obj.id == fruit_id).price * counts[fruit_id])}€)
                    </li>)}
                </ul>
                <div className="cart-bottom">Prix total : <b>{calculateAmount()}€</b></div>
            </div>
        );
}

export default Cart;