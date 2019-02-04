import React from 'react';
import ReactDOM from 'react-dom';

const Navigation = (props) => {
    const { err, city, descript, temp } = props.weather;
    let content = null;

    return (
        <div className="navi">
            <p>Pogoda dla Twojej lokalizacji...</p>
            <button onClick={props.navi} >Pogoda na dziś</button>
            <button>Pogoda długoterminowa</button>
        </div>
    );
}

export default Navigation;





