import React from 'react';
import Picture from './Picture';


function Card({recipe :{dish,intro,picture}}) {

    return (
        <div className='card'>
            <Picture id={picture}/>
            <div className='container'>
            <h2><b>{dish}</b></h2>
            <p>{intro}</p>
            </div>
        </div>
    );
}

export default Card;