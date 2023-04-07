import React, { useState, useEffect } from "react";
import fs from "../images/fruit-salad.png";
import FruitsPreview from "./FruitsPreview";
import axios from "axios";
import { Outlet } from "react-router";



export default function FruitsMaster(){

    const [displayFruits, setDisplayFruits] = useState(false);
    const [fruit_content, setFruitContent] = useState();

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
                displayFruits ? 
                setFruitContent((<ul className="FruitsList">{data.map(fruit => <FruitsPreview fruit={fruit}/>)}</ul>)) 
                : setFruitContent()
            }
        )

    }, [displayFruits]);


    return (
        <div className="FruitsMaster">
            <nav>   
                <img src={fs}/>
                <h1>Fruit-Salad</h1>
                <button onClick={() => setDisplayFruits(!displayFruits)}>Afficher les fruits</button>
            </nav>
            <main>
                {fruit_content}
                <div id="Detail">
                    <Outlet/>
                </div>
            </main>
        </div>
    );
}
