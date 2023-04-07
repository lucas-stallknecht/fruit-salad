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
    })

    if (isLoaded){
        return (
            <div className="FruitsDetails">
                <img src={require("../images/" + fruit_data.image)} alt=""/>
                <p style={{color: fruit_data.color}}><span>Nom</span> : {fruit_data.name}</p>
                <p><span>Saison</span> : {fruit_data.season}</p>
                <p><span>Prix</span> : {fruit_data.price}</p>
                <p><span>Stock</span> : {fruit_data.stock}</p>
    
            </div>
        );
    }else{
        return ('')
    }
    

}

export default FruistDetails;