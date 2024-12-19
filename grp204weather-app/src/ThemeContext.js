// ThemeContext.js
import React, { createContext, useState, useContext } from 'react';

// Créer le contexte pour le thème
const ThemeContext = createContext();

// Fournisseur du contexte (ThemeProvider)
export const ThemeProvider = ({ children }) => {
    const [theme, setTheme] = useState('light'); // Par défaut : thème clair

    return (
        <ThemeContext.Provider value={{ theme, setTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

// Hook personnalisé pour accéder au contexte du thème
export const useTheme = () => {
    return useContext(ThemeContext);
};
