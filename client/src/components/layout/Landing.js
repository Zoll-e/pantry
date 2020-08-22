import React from 'react';
import { Link } from "react-router-dom";


const Landing = props => {
    return (
        <div>
            <Link to="/register">
                Sign up
            </Link>
            <Link to="/login">
                Log in
            </Link>
            
        </div>
    )
}

Landing.propTypes = {

}

export default Landing
