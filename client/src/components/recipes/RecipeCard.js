import React from 'react';


function Card({recipe :{dish,intro}}) {

    return (
        <div className='card'>
            <img src="https://cdn.tasteatlas.com/Images/Dishes/0384c4118bdf4bc687dc766b3c4beca0.jpg?w=600&h=450"  alt=""/>
            <div className='container'>
            <h2><b>{dish}</b></h2>
            <p>{intro}</p>
            </div>
        </div>
    );
}

export default Card;