import React, { useState, useEffect, useContext, useCallback } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Spinner from "./Spinner";
import { GlobalContext } from "..";
import { HiArrowNarrowLeft } from "react-icons/hi";

export default function CountryDetails() {
  let params = useParams();

  const { countryName } = params;
  const { theme } = useContext(GlobalContext);

  const [country, setCountry] = useState({});

  const fetchData = useCallback(() => {
    const urlParam = countryName.length === 3 ? "alpha" : "name";
    axios
      .get(`https://restcountries.com/v3.1/${urlParam}/${countryName}`)
      .then((res) => {
        const data = res.data;
        setCountry(data[0]);
      });
  }, [countryName]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const showInlineLanguages = (arr) => {
    return Object.values(arr).map((item, index) => {
      return (
        <li key={item}>
          <span className="fw-300">
            {item}
            {index !== Object.values(arr).length - 1 ? "," : ""}
          </span>
        </li>
      );
    });
  };

  const showInlineCurrencies = (arr) => {
    return Object.values(arr).map((item, index) => {
      return (
        <li key={item.name}>
          <span className="fw-300">
            {item.name}
            {index !== Object.values(arr).length - 1 ? "," : ""}
          </span>
        </li>
      );
    });
  };

  const showBorders = (arr) => {
    if (arr && arr.length > 0) {
      return arr.map((item) => {
        return (
          <li
            key={item}
            className={`borders-item  item-${theme.toLowerCase()} shadow-${theme.toLowerCase()}`}
          >
            <Link
              to={`/details/${item.toLowerCase()}`}
              className={`btn borders-btn item-${theme.toLowerCase()}`}
            >
              {item}
            </Link>
          </li>
        );
      });
    }
  };

  return (
    <div>
      {country.name ? (
        <>
          <Link
            to="/"
            className={`btn back-btn item-${theme.toLowerCase()} shadow-${theme.toLowerCase()}`}
          >
            <HiArrowNarrowLeft size={25} />
            Back
          </Link>
          <div className="details-container">
            <div className="details-img-container">
              <img
                className={`details-img shadow-${theme.toLowerCase()}`}
                src={country.flags.svg}
                alt={`${country.name.common}_flag`}
              />
            </div>
            <div
              className={`details-info-container item-txt-${theme.toLowerCase()}`}
            >
              <p className="details-name">{country.name.common}</p>
              <ul className="detail-info-list">
                <li>
                  <p className="fw-600">
                    Native Name:{" "}
                    <span className="fw-300">
                      {country.name.official}
                    </span>
                  </p>
                </li>
                <li>
                  <p className="fw-600">
                    Population:{" "}
                    <span className="fw-300">
                      {country.population.toLocaleString()}
                    </span>
                  </p>
                </li>
                <li>
                  <p className="fw-600">
                    Region: <span className="fw-300">{country.region}</span>
                  </p>
                </li>
                <li>
                  <p className="fw-600">
                    Sub Region:{" "}
                    <span className="fw-300">{country.subregion}</span>
                  </p>
                </li>
                <li>
                  <p className="fw-600">
                    Capital:{" "}
                    <span className="fw-300">{country.capital[0]}</span>
                  </p>
                </li>
                <li>
                  <p className="fw-600">Currencies: </p>
                  <ul>{showInlineCurrencies(country.currencies)}</ul>
                </li>
                <li>
                  <p className="fw-600">Languages: </p>
                  <ul>{showInlineLanguages(country.languages)}</ul>
                </li>
              </ul>
              <div className="borders">
                <ul className="borders-list">
                  <p className="fw-600">Border Countries: </p>
                  {showBorders(country.borders)}
                </ul>
              </div>
            </div>
          </div>
        </>
      ) : (
        <Spinner />
      )}
    </div>
  );
}
