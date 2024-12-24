import { createContext, useState, useContext, useEffect } from 'react';

export const ThemeContext = createContext();

const ThemeProvider = ({ children }) => {
  // Check localStorage for the saved theme preference or default to light mode
  const savedTheme = localStorage.getItem('theme');
  const [isDarkMode, setIsDarkMode] = useState(savedTheme === 'dark');

  // Toggle the theme between dark and light
  const toggleTheme = () => {
    setIsDarkMode((prev) => !prev);
  };

  // Apply the theme and save it in localStorage
  useEffect(() => {
    const root = document.documentElement;

    if (isDarkMode) {
      root.classList.add('dark');
      localStorage.setItem('theme', 'dark'); // Save theme in localStorage
    } else {
      root.classList.remove('dark');
      localStorage.setItem('theme', 'light'); // Save theme in localStorage
    }
  }, [isDarkMode]);

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;