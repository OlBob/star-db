import React from "react";
import './error-indicator.css';
import icon from './death_star.png';

const ErrorIndicator = () => {
    return (
        <div className="error-indicator">
            <img src={icon} alt="error indicator" />
            <h1>BOOM!!!</h1>
            <span>Something has gone terribly wrong</span>
            <span>(Our droids were sent to fix this) </span>
        </div>
    )
}

export default ErrorIndicator;