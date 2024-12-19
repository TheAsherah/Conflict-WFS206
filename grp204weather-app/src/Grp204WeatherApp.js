// Grp204WeatherApp.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Oval } from 'react-loader-spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFrown } from '@fortawesome/free-solid-svg-icons';
import { useTheme } from './ThemeContext'; // Import du hook useTheme
import './App.css';

function Grp204WeatherApp() {
    const [input, setInput] = useState('');
    const [weather, setWeather] = useState({ loading: false, data: {}, error: false });
    const [forecast, setForecast] = useState([]);
    const [favorites, setFavorites] = useState([]);
    
    const { theme, setTheme } = useTheme(); // Utiliser le contexte pour accéder au thème

    // Charger les villes favorites depuis le localStorage
    useEffect(() => {
        const savedFavorites = JSON.parse(localStorage.getItem('favorites')) || [];
        setFavorites(savedFavorites);
    }, []);

    // Detecter la localisation de l'utilisateur
    const detectLocation = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    fetchWeatherByCoords(latitude, longitude); // Requête pour récupérer la météo
                },
                (error) => {
                    console.error("Erreur de géolocalisation:", error);
                    alert("La géolocalisation n'est pas disponible.");
                }
            );
        } else {
            alert("La géolocalisation n'est pas supportée par ce navigateur.");
        }
    };

    // Fonction pour récupérer la météo en fonction des coordonnées
    const fetchWeatherByCoords = async (latitude, longitude) => {
        setWeather({ ...weather, loading: true });
        const api_key = 'votre_api_key'; // Remplacez par votre clé API

        const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather';
        try {
            const res = await axios.get(weatherUrl, {
                params: {
                    lat: latitude,
                    lon: longitude,
                    units: 'metric',
                    appid: api_key,
                },
            });
            setWeather({ data: res.data, loading: false, error: false });
            updateThemeBasedOnTime(res.data.timezone); // Mettre à jour le thème en fonction de l'heure locale
        } catch (error) {
            setWeather({ ...weather, data: {}, error: true });
            setInput('');
        }
    };

    // Mettre à jour le thème en fonction de l'heure locale
    const updateThemeBasedOnTime = (timezone) => {
        const localTime = new Date(new Date().getTime() + timezone * 1000); // Convertir UTC à l'heure locale
        const hours = localTime.getHours(); // Obtenir l'heure locale de la journée

        // Choisir le thème : Jour (6h - 18h) ou Nuit (18h - 6h)
        if (hours >= 6 && hours < 18) {
            setTheme('light'); // Thème clair pendant la journée
        } else {
            setTheme('dark'); // Thème sombre pendant la nuit
        }
    };

    const search = async (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            setInput('');
            setWeather({ ...weather, loading: true });
            const api_key = 'votre_api_key'; // Remplacez par votre clé API

            // Récupérer la météo
            const weatherUrl = 'https://api.openweathermap.org/data/2.5/weather';
            try {
                const res = await axios.get(weatherUrl, {
                    params: {
                        q: input,
                        units: 'metric',
                        appid: api_key,
                    },
                });
                setWeather({ data: res.data, loading: false, error: false });
                updateThemeBasedOnTime(res.data.timezone); // Mettre à jour le thème selon l'heure locale
            } catch (error) {
                setWeather({ ...weather, data: {}, error: true });
                setInput('');
            }

            // Récupérer les prévisions sur 5 jours
            const forecastUrl = 'https://api.openweathermap.org/data/2.5/forecast';
            try {
                const res = await axios.get(forecastUrl, {
                    params: {
                        q: input,
                        units: 'metric',
                        appid: api_key,
                    },
                });
                const dailyForecast = res.data.list.filter((item, index) => index % 8 === 0);
                setForecast(dailyForecast);
            } catch (error) {
                console.error("Erreur lors de la récupération des prévisions météo :", error);
            }
        }
    };

    const addFavorite = () => {
        if (input && !favorites.includes(input)) {
            const newFavorites = [...favorites, input];
            setFavorites(newFavorites);
            localStorage.setItem('favorites', JSON.stringify(newFavorites));
        }
    };

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
                    value={input}
                    onChange={(event) => setInput(event.target.value)}
                    onKeyDown={search}
                />
                <button onClick={addFavorite}>Ajouter aux favoris</button>
                <button onClick={detectLocation}>Utiliser ma position</button>
            </div>

            <div className="favorites">
                <h2>Villes favorites</h2>
                {favorites.map((city, index) => (
                    <button key={index} onClick={() => loadFavorite(city)}>
                        {city}
                    </button>
                ))}
            </div>

            {weather.loading && <Oval type="Oval" color="black" height={100} width={100} />}
            {weather.error && (
                <span className="error-message">
                    <FontAwesomeIcon icon={faFrown} />
                    <span>Ville introuvable</span>
                </span>
            )}

            {weather.data && weather.data.main && (
                <div>
                    <h2>{weather.data.name}, {weather.data.sys.country}</h2>
                    <span>{new Date().toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'long' })}</span>
                    <img
                        src={`https://openweathermap.org/img/wn/${weather.data.weather[0].icon}@2x.png`}
                        alt={weather.data.weather[0].description}
                    />
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
                                <img
                                    src={`https://openweathermap.org/img/wn/${day.weather[0].icon}@2x.png`}
                                    alt={day.weather[0].description}
                                />
                                <p>{Math.round(day.main.temp)}°C</p>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
}

export default Grp204WeatherApp;
