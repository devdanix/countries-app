import React, { useContext } from 'react'
import { GlobalContext } from '..'
import { Link} from 'react-router-dom'


export default function CountryItem({ country }) {

  const { theme } = useContext(GlobalContext)



  return (
    <Link to={`/details/${country.name.toLowerCase()}`}>
      <li className={`country-listitem item-${theme.toLowerCase()} shadow-${theme.toLowerCase()}`}>
        <img className='country-listitem-img' src={country.flags.png} alt={`${country.name}_flag`}/>
        <div className='country-listitem-info'>
          <p className='country-listitem-name'>{country.name}</p>
          <ul>
            <li><p className='fw-600'>Population: <span className='fw-300'>{country.population.toLocaleString()}</span></p></li>
            <li><p className='fw-600'>Region: <span className='fw-300'>{country.region}</span></p></li>
            <li><p className='fw-600'>Capital: <span className='fw-300'>{country.capital}</span></p></li>
          </ul>
        </div>
      </li>
    </Link>
  )
}
