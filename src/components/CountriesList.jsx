import React, { useState, useEffect, useRef, useContext } from "react";
import { GlobalContext } from "..";
import { MdSearch } from "react-icons/md";

import CountryItem from "./CountryItem";
import Dropdown from "./Dropdown";
import Spinner from "./Spinner";


export default function CountriesList() {

  const inputRef = useRef();

  const { theme, countries } = useContext(GlobalContext);

  const [filterList, setFilterList] = useState(countries);

  useEffect(() => {
    setFilterList(countries)
  }, [countries])

  const handleOnChange = () => {
    if (inputRef.current.value.toLowerCase()) {
      setFilterList(
        countries.filter(item =>
          item.name.toLowerCase().includes(inputRef.current.value.toLowerCase())
        )
      );
    } else {
      setFilterList(countries);
    }
  };

  const filterByRegion = (region) => {
    console.log(region)
    if(region !== 'show all') {
      setFilterList(
        countries.filter(item =>
          item.region.toLowerCase() === region
        )
      );
    } else {
      setFilterList(countries);
    }
  }

  return (
    <>
      <div className="filters-container">
        <div className={`filter search shadow-${theme.toLowerCase()} item-${theme.toLowerCase()}`}>
          <MdSearch size={25}/>
          <input
            className={`search-input item-${theme.toLowerCase()}`}
            onChange={handleOnChange}
            ref={inputRef}
            placeholder="Search for a country..."
            type="text"
          />
        </div>
        <div className={`filter shadow-${theme.toLowerCase()} item-${theme.toLowerCase()}`}>
          <Dropdown filterByRegion={filterByRegion}/>
        </div>
      </div>
      {filterList.length > 0 || countries ? (
        <ul className="country-list">
          {filterList.map((country, index) => {
            return (
              <CountryItem country={country} key={index} />
            )
          })}
        </ul>
      ) : (
        <Spinner />
      )}
    </>
  );
}
