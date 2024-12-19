// App.js
import React from 'react';
import { ThemeProvider } from './ThemeContext'; // Import du ThemeProvider
import Grp204WeatherApp from './Grp204WeatherApp'; // Import de l'application météo

function App() {
    return (
        <ThemeProvider> {/* Fournisseur du contexte pour le thème */}
            <Grp204WeatherApp /> {/* Application météo */}
        </ThemeProvider>
    );
}

export default App;
