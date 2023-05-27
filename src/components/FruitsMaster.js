import React, { useState, useEffect } from "react";
import { Outlet } from "react-router";
import axios from "axios";
import CartContext from "../contexts/CartContext";

import FruitsPreview from "./FruitsPreview";

import fs from "../images/fruit-salad.png";
import cart_icon from "../images/grocery-store.png";
import Search from "./Search";
import { Link } from "react-router-dom";





export default function FruitsMaster(){

    const [keyword, setKeyword] = useState("")
    const [isLoaded, setFruitLoaded] = useState(false);
    const [fruit_list_data, setFruitList] = useState([]);
    const [selectedFilter, setFilter] = useState("");

    const [selectedFruits, setSelectedFruits] = useState([]);


    useEffect(() => {
        axios({
            method: 'get',
            url: `https://fruits.shrp.dev/items/fruits?search=${keyword}`,
        })
        .then(
            response => response.data.data
        )
        .then(
            data => {
                setFruitList(data)
                setFruitLoaded(true)
            }
        )

    }, [keyword]);

    const submitKeyword = (data) => {
        setKeyword(data.fruitName)
    }

    const addFruit = (fruit) => 
        setSelectedFruits(current => [...current, fruit.id]);

    const removeFruit = (fruit) => {
        const index = selectedFruits.indexOf(fruit.id);
        if (index >= 0);
            setSelectedFruits([...selectedFruits.slice(0, index), ...selectedFruits.slice(index + 1)]);
    }

    const calculateAmount = () => {
        let fruit_prices_map = selectedFruits.map(fruit_id => fruit_list_data.find(obj => obj.id == fruit_id).price);
        return fruit_prices_map.reduce((a, b) => a + b, 0);
    }

    if (isLoaded){
        return (
            <CartContext.Provider value={{selectedFruits, setSelectedFruits, addFruit, removeFruit, calculateAmount, fruit_list_data}}>
                <div className="FruitsMaster">
                    <div className="Popout"></div>
                    <nav>
                        <div className="title">
                            <img src={fs} alt="fruit salad logo"/>
                            <a href="/">Fruit-salad</a>
                        </div>

                            <Link to={"/cart"} onClick={() => document.querySelector("#Pop").style.display = "block"}>
                                <img src={cart_icon} alt="cart icon" className="cart-icon"/>
                            </Link>   

                    </nav>
                    <main>
                        <div className="Filter">
                            <Search onSubmit={submitKeyword}/>
                            <select onChange={e => setFilter(e.target.value)}>
                                <option value="">Tous</option>
                                <option value="Printemps">Printemps</option>
                                <option value="Eté">Eté</option>
                                <option value="Automne">Automne</option>
                                <option value="Hiver">Hiver</option>
                            </select>
                        </div>
                        <ul className="FruitsList">
                                {fruit_list_data.filter(fruit => fruit.season.includes(selectedFilter)).map(fruit => <FruitsPreview fruit={fruit} key={fruit.id}/>)}
                        </ul>
                    </main>
                    <div id="Pop">
                        <Outlet/>
                    </div>
                </div>
            </CartContext.Provider>
        );
    }
    else{
        return ("");
    }
}
