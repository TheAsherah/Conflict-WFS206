import { Oval } from 'react-loader-spinner';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFrown } from '@fortawesome/free-solid-svg-icons';
import './App.css';

function Grp204WeatherApp() {
    const [input, setInput] = useState('');
    const [weather, setWeather] = useState({
        loading: false,
        data: {},
        error: false,
    });
    const [forecast, setForecast] = useState([]);
    const [favorites, setFavorites] = useState([]);
    const [theme, setTheme] = useState('day'); // Ajout d'un état pour le thème (jour ou nuit)

    // Charger les villes favorites de localStorage au chargement
    useEffect(() => {
        const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setFavorites(savedFavorites);
    }, []);

    // Fonction pour afficher la date actuelle
    const toDateFunction = () => {
        const months = ['Janvier', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre'];
        const weekDays = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
        const currentDate = new Date();
        const date = `${weekDays[currentDate.getDay()]} ${currentDate.getDate()} ${months[currentDate.getMonth()]}`;
        return date;
    };

    // Fonction pour mettre à jour le thème (jour ou nuit) en fonction de l'heure locale
    const updateTheme = (timezone) => {
        const localTime = new Date(Date.now() + timezone * 1000); // Calcul de l'heure locale avec le décalage horaire
        const hour = localTime.getUTCHours();
        setTheme(hour >= 6 && hour < 18 ? 'day' : 'night'); // Jour entre 6h et 18h
    };

    // Fonction pour effectuer une recherche météo
    const search = async (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            setInput('');
            setWeather({ ...weather, loading: true });
            const api_key = 'f00c38e0279b7bc85480c3fe775d518c';

            // Récupérer les données météo actuelles
            const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather';
            await axios
                .get(weatherUrl, {
                    params: {
                        q: input,
                        units: 'metric',
                        appid: api_key,
                    },
                })
                .then((res) => {
                    setWeather({ data: res.data, loading: false, error: false });
                    updateTheme(res.data.timezone); // Mettre à jour le thème en fonction du fuseau horaire
                })
                .catch((error) => {
                    setWeather({ ...weather, data: {}, error: true });
                    setInput('');
                });

            // Récupérer les prévisions sur 5 jours
            const forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast';
            await axios
                .get(forecastUrl, {
                    params: {
                        q: input,
                        units: 'metric',
                        appid: api_key,
                    },
                })
                .then((res) => {
                    const dailyForecast = res.data.list.filter((item, index) => index % 8 === 0);
                    setForecast(dailyForecast);
                })
                .catch((error) => {
                    console.error("Erreur lors de la récupération des prévisions météo :", error);
                });
        }
    };

    // Ajouter une ville aux favoris
    const addFavorite = () => {
        if (input && !favorites.includes(input)) {
            const newFavorites = [...favorites, input];
            setFavorites(newFavorites);
            localStorage.setItem('favorites', JSON.stringify(newFavorites));
        }
    };

    // Charger une ville favorite
    const loadFavorite = (city) => {
        setInput(city);
        const enterEvent = new KeyboardEvent('keypress', { key: 'Enter' });
        search(enterEvent);
    };

    return (
        <div className={`App ${theme}`}>
            <h1 className="app-name">Application Météo grp206</h1>
            <div className="search-bar">
                <input
                    type="text"
                    className="city-search"
                    placeholder="Entrez le nom de la ville..."
                    name="query"
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    onKeyPress={search}
                />
                <button onClick={addFavorite}>Ajouter aux favoris</button>
            </div>

            <div className="favorites">
                <h2>Villes favorites</h2>
                {favorites.map((city, index) => (
                    <button key={index} onClick={() => loadFavorite(city)}>
                        {city}
                    </button>
                ))}
            </div>

            {weather.loading && (
                <>
                    <Oval type="Oval" color="black" height={100} width={100} />
                </>
            )}
            {weather.error && (
                <>
                    <span className="error-message">
                        <FontAwesomeIcon icon={faFrown} />
                        <span>Ville introuvable</span>
                    </span>
                </>
            )}
            {weather && weather.data && weather.data.main && (
                <div>
                    <h2>{weather.data.name}, {weather.data.sys.country}</h2>
                    <span>{toDateFunction()}</span>
                    <img src={`https://openweathermap.org/img/wn/${weather.data.weather[0].icon}@2x.png`}
                        alt={weather.data.weather[0].description} />
                    <p>{Math.round(weather.data.main.temp)}°C</p>
                    <p>Vitesse du vent : {weather.data.wind.speed} m/s</p>
                </div>
            )}

            {forecast.length > 0 && (
                <div className="forecast">
                    <h2>Prévisions météo pour les 5 prochains jours</h2>
                    <div className="forecast-container">
                        {forecast.map((day, index) => (
                            <div key={index} className="forecast-day">
                                <p>{new Date(day.dt * 1000).toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}</p>
                                <img src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`} alt="Icone météo" />
                                <p>{Math.round(day.main.temp)}°C</p>
                                <p>{day.weather[0].description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Grp204WeatherApp;
