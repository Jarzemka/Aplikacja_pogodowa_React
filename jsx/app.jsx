import React from 'react';
import ReactDOM from 'react-dom';
import Form from './form.jsx';
import Result from './result.jsx';
import Navigation from './navigation.jsx';


const APIKey = "bb4adf97fdfbe3f4d2b3ff6c2b0ae92f&units=metric";
const geo = navigator.geolocation;

class App extends React.Component {
    state = {
        value: "",
        key: "",
        city: "",
        descript: "",
        temp: "",
        lati: "",
        longi: "",
        err: false
    }
    //obsluga wybranego miasta
    handleInputChange = (e) => {
        this.setState({
            value: e.target.value
        })
    }
    handleCitySubmit = (e) => {
        e.preventDefault();
        const API = `https://api.openweathermap.org/data/2.5/weather?q=${this.state.value}&APPID=${APIKey}&lang=pl`;

        fetch(API)
            .then(response => {
                if (response.ok) {
                    return response
                }
                throw Error("Coś poszło nie tak..")
            })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                this.setState(state => ({
                    err: false,
                    city: state.value,
                    descript: data.weather[0].description,
                    temp: data.main.temp,
                }))
            })
            .catch(err => {
                console.log(err)
                this.setState(prevState => ({
                    err: true,
                    city: prevState.value
                }))
            })
    }
    //obsluga lokalizacji user'a
    userWeather = () => {
        const userWeatherUrl = `https://apidev.accuweather.com/currentconditions/v1/${this.state.key}.json?language=pl&apikey=hoArfRosT1215`;
        console.log("info o pogodzie " + userWeatherUrl)
        fetch(userWeatherUrl)
            .then(response => {
                if (response.ok) {
                    return response
                }
                throw Error("pojawił się niespodziewany błąd")
            })
            .then(response => response.json())
            .then(info => {
                console.log(info)
                this.setState({
                    descript: info[0].WeatherText,
                    temp: info[0].Temperature.Metric.Value
                })
                console.log(this.state)
            })
            .catch(err => {
                console.log(err)
            })
    }
    userLocation = () => {
        if (geo) {
            console.log("geo")
            geo.getCurrentPosition((location) => {
                let userLati = location.coords.latitude;
                let userLongi = location.coords.longitude;
                const userLocUrl = `https://apidev.accuweather.com/locations/v1/cities/geoposition/search.json?q=${userLati},${userLongi}&apikey=hoArfRosT1215`;
                this.setState({
                    lati: userLati,
                    longi: userLongi
                })
                fetch(userLocUrl)
                    .then(response => {
                        if (response.ok) {
                            return response
                        }
                        throw Error("brak dostępu do lokalizacji!")
                    })
                    .then(response => response.json())
                    .then(info => {
                        console.log(info.LocalizedName)
                        this.setState({
                            city: info.LocalizedName,
                            key: info.Key
                        })
                        this.userWeather()
                    })
                    .catch(err => {
                        console.log(err)
                    })
                console.log(userLocUrl);
            })
        } else {
            console.log("lokalizacja niedostępna")
        }
    }


    render() {
        return (
            <div className="App">
                <Form
                    text={this.state.value}
                    change={this.handleInputChange}
                    submit={this.handleCitySubmit} />
                <Navigation
                    navi={this.userLocation}
                    weather={this.state} />
                <Result weather={this.state} />
            </div>
        )
    }
}

document.addEventListener('DOMContentLoaded', function () {
    ReactDOM.render(<App />, document.getElementById('app'));
});












