import "./App.css";
import { useContext, useEffect } from 'react'
import CountriesList from "./components/CountriesList";
import Header from "./components/Header";
import { GlobalContext } from ".";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import CountryDetails from "./components/CountryDetails";
import axios from "axios";

function App() {

  const { theme, setCountries } = useContext(GlobalContext)

  const fetchData = async () => {
    await axios.get("https://restcountries.com/v2/all").then(res => {
      const data = res.data;
      setCountries(data)
    });
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className={theme.toLowerCase()}>
      <Header />
      <div className="container">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<CountriesList />} />
            <Route path={"/details/:countryName"} element={<CountryDetails />} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
  );
}

export default App;
