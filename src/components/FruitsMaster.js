import React, { useState, useEffect } from "react";
import fs from "../images/fruit-salad.png";
import FruitsPreview from "./FruitsPreview";
import axios from "axios";
import { Outlet } from "react-router";



export default function FruitsMaster(){

    const [isLoaded, setFruitLoaded] = useState(false);
    const [fruit_list_data, setFruitList] = useState([]);
    const [selectedFilter, setFilter] = useState("")

    useEffect(() => {
        axios({
            method: 'get',
            url: 'https://fruits.shrp.dev/items/fruits',
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

    }, []);

    if (isLoaded){
        return (
            <div className="FruitsMaster">
                <div className="Popout"></div>
                <nav>   
                    <img src={fs}/>
                    <a href="#">Fruit-salad</a>
                </nav>
                <main>
                    <div className="Filter">
                        <select onChange={e => setFilter(e.target.value)}>
                            <option value="">Tous</option>
                            <option value="Printemps">Printemps</option>
                            <option value="Eté">Eté</option>
                            <option value="Automne">Automne</option>
                            <option value="Hiver">Hiver</option>
                        </select>
                    </div>
                    <ul className="FruitsList">
                            {fruit_list_data.filter(fruit => fruit.season.includes(selectedFilter)).map(fruit => <FruitsPreview fruit={fruit}/>)}

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
