import React, { createContext, useContext, useState, useEffect } from 'react';
import { getStoredItem, setStoredItem, KEYS } from '../utils/storage';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => {
    return getStoredItem(KEYS.THEME, 'dark'); // Default to dark for the immersive sci-fi campus
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    setStoredItem(KEYS.THEME, theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <ThemeContext.Provider value={{ theme, isDark: theme === 'dark', toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
