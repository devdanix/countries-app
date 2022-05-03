import React, { useState, createContext } from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

export const GlobalContext = createContext()

function GlobalProvider({children}) {

  const [ theme, setTheme ] = useState('Dark')
  const [ countries, setCountries ] = useState([])

  const changeTheme = () => {
    if(theme === 'Light') {
      setTheme('Dark')
    } else {
      setTheme('Light')
    }
  }

  return (
    <GlobalContext.Provider value={{theme, changeTheme, countries, setCountries}}>
      {children}
    </GlobalContext.Provider>
  )
}


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GlobalProvider>
      <App />
    </GlobalProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
