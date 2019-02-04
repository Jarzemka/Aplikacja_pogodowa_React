import React from 'react';
import ReactDOM from 'react-dom';


const Result = props => {
    const { err, city, descript, temp } = props.weather;
    let content = null;

    if (!err && city) {
        content = (
            <ul id="result">
                <li>Przewidywana pogoda dla<br /> <em>{city}</em></li>
                <li>Temperatura: {temp}°C</li>
                <li>{descript}</li>
            </ul>
        )
    }

    return (
        <div className="result">
            {err ? `Brak w bazie miasta ${city}` : content}
        </div>
    );
}

export default Result; 