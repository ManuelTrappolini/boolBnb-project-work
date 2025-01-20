import React, { createContext, useState, useContext, useEffect } from 'react';

// Crea il contesto
const AuthContext = createContext();

// Hook per utilizzare il contesto
export const useAuth = () => {
    return useContext(AuthContext);
};

// Componente provider del contesto
export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Verifica se c'è un token salvato nel localStorage all'avvio
        const token = localStorage.getItem('authToken');
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    const login = (token) => {
        localStorage.setItem('authToken', token);
        setIsLoggedIn(true);
    };

    const logout = () => {
        localStorage.removeItem('authToken');
        setIsLoggedIn(false);
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
