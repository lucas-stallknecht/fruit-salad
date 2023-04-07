import React from "react";
import PropTypes from 'prop-types';
import { Outlet, Link } from "react-router-dom";



const FruitsPreview = ({fruit}) => {

    return (
        <li className="FruitsPreview" style={{boxShadow: "0px 10px 0px "+ fruit.color}}>
            <Link to={"fruits/"+fruit.id}>
                {fruit.name}
                <img src={require("../images/" + fruit.image)} alt="" className="fruit-image"/>
            </Link>
        </li>
    );

}

FruitsPreview.propTypes = {
    fruit: PropTypes.instanceOf(Object)
}

export default FruitsPreview;