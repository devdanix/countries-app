import React, { useState, useEffect, useContext, useCallback } from 'react'
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import Spinner from './Spinner';
import { GlobalContext } from '..';
import { HiArrowNarrowLeft } from 'react-icons/hi'

export default function CountryDetails() {

  let params = useParams();

  const { countryName } = params
  const { theme, countries } = useContext(GlobalContext)

  const [ country, setCountry ] = useState({})


  const fetchData = useCallback(() => {
    axios.get(`https://restcountries.com/v2/name/${countryName}`).then(res => {
      const data = res.data;
      setCountry(data[0])
    });
  }, [countryName]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const showInlineList = (arr) => {
    return arr.map(item => {
      return <li><span className='fw-300'>{item.name}</span></li>
    })
  }

  const showBorders = (arr) => {
    if (arr && arr.length > 0) {
      return arr.map(item => {
        const borderCountry = countries.filter(brd => brd.alpha3Code === item)

        return <li className={`borders-item  item-${theme.toLowerCase()} shadow-${theme.toLowerCase()}`}><Link to={`/details/${borderCountry[0].name.toLowerCase()}`} className={`btn borders-btn item-${theme.toLowerCase()}`}>{borderCountry[0].name}</Link></li>
      })
    }
  }

  return (
    <div>
      {country.name ?
      (
        <>
        <Link to='/' className={`btn back-btn item-${theme.toLowerCase()} shadow-${theme.toLowerCase()}`}>
          <HiArrowNarrowLeft size={25} />
          Back
        </Link>
        <div className='details-container'>
          <div className='details-img-container'>

          <img className={`details-img shadow-${theme.toLowerCase()}`} src={country.flags.svg} alt={`${country.name}_flag`}/>
          </div>
          <div className={`details-info-container item-txt-${theme.toLowerCase()}`}>
            <p className='details-name'>{country.name}</p>
            <ul className='detail-info-list'>
              <li><p className='fw-600'>Native Name: <span className='fw-300'>{country.nativeName}</span></p></li>
              <li><p className='fw-600'>Population: <span className='fw-300'>{country.population.toLocaleString()}</span></p></li>
              <li><p className='fw-600'>Region: <span className='fw-300'>{country.region}</span></p></li>
              <li><p className='fw-600'>Sub Region: <span className='fw-300'>{country.subregion}</span></p></li>
              <li><p className='fw-600'>Capital: <span className='fw-300'>{country.capital}</span></p></li>
              <li><p className='fw-600'>Top Level Domain: <span className='fw-300'>{country.topLevelDomain[0]}</span></p></li>
              <li><p className='fw-600'>Currencies: </p><ul>{showInlineList(country.currencies)}</ul></li>
              <li><p className='fw-600'>Languages: </p><ul>{showInlineList(country.languages)}</ul></li>
            </ul>
            <div className='borders'>
              <ul className='borders-list'>
                <p className='fw-600'>Border Countries: </p>
                {showBorders(country.borders)}
              </ul>
            </div>
          </div>
        </div>
        </>
      ) : <Spinner /> }
    </div>
  )
}
