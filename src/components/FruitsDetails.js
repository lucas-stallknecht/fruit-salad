import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";



const FruistDetails = () => {

    let fruit_id = useParams().fruitId
    const [isLoaded, setLoaded] = useState(false)
    const [fruit_data, setFruitData] = useState()

    useEffect(() => {
        axios({
            method: 'get',
            url: 'https://fruits.shrp.dev/items/fruits/'+fruit_id,
        })
        .then(
            response => response.data.data
        )
        .then(
            data => {setFruitData(data)
                    setLoaded(true)}
        )
    }, [fruit_id])

    if (isLoaded){
        return (
            <div className="FruitsDetails PopWindow">
                <button onClick={() => {
                    document.querySelector("#Pop").style.display = "none";
                    setLoaded(false)}
                }>&#10006;</button>
                <img src={require("../images/" + fruit_data.image)} alt=""/>
                <p style={{color: fruit_data.color}}><span>Nom</span> : {fruit_data.name}</p>
                <p><span>Saison</span> : {fruit_data.season}</p>
                <p><span>Prix</span> : {fruit_data.price}</p>
                <p><span>Stock</span> : {fruit_data.stock}</p>
    
            </div>
        );
    }else{
        return (
            <div className="FruitsDetails">
                <button onClick={() => {
                    document.querySelector("#Pop").style.display = "none";
                    setLoaded(false)}
                }>&#10006;</button>
                <p><span>Nom</span> : </p>
                <p><span>Saison</span> : </p>
                <p><span>Prix</span> : </p>
                <p><span>Stock</span> : </p>
    
            </div>
        );
    }
    

}

export default FruistDetails;