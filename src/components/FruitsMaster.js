import React, { useState, useEffect } from "react";
import { Outlet } from "react-router";
import axios from "axios";

import FruitsPreview from "./FruitsPreview";

import fs from "../images/fruit-salad.png";
import Search from "./Search";





export default function FruitsMaster(){

    const [keyword, setKeyword] = useState("")
    const [isLoaded, setFruitLoaded] = useState(false);
    const [fruit_list_data, setFruitList] = useState([]);
    const [selectedFilter, setFilter] = useState("");

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

    if (isLoaded){
        return (
            <div className="FruitsMaster">
                <div className="Popout"></div>
                <nav>   
                    <img src={fs} alt="fruit salad logo"/>
                    <a href="/">Fruit-salad</a>
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
        );
    }
    else{
        return ("");
    }
}
