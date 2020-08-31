import React from 'react';

const Picture = picture => {

    return (
        <img src={`/api/photos/${picture.id}`}  alt=""/>
    )
}

export default Picture;
