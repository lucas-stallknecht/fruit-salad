import PropTypes from 'prop-types';
import { Link } from "react-router-dom";


const FruitsPreview = ({fruit}) => {

    return (
        <li className="FruitsPreview">
            <div className="adding-to-cart-cont">
                    <button>-</button>
                    <div id="counter">0</div>
                    <button>+</button>
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