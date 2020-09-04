import React from 'react';

const Picture = ({src,classes,styles}) => {

    return (
        <img src={src} className={classes} alt="" style={styles}/>
    )
}

export default Picture;
