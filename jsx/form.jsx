import React from 'react';
import ReactDOM from 'react-dom';

const Form = props => {
    return (

        <form onSubmit={props.submit}>
            <p>Sprawdź pogodę dla wybranej miejscowości...</p>
            <input
                type="text"
                value={props.text}
                placeholder="Wpisz miasto"
                onChange={props.change}

            />
            <button>Wyszukaj miasta</button>
        </form>
    );
}



export default Form
