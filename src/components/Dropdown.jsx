import React, { useContext } from 'react'
import { MdArrowDropDown } from 'react-icons/md'

import { GlobalContext } from "..";

export default function Dropdown({ filterByRegion }) {

  const { theme } = useContext(GlobalContext);

  const dropdownLinks = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Show All'
  ]

  const showDropDown = (id) => {
    document.getElementById(id).classList.toggle("show");
  }

  const links = dropdownLinks.map(link => {
    return (
      <li key={link} className="dropdown-item">
        <button className={`item-${theme.toLowerCase()} header-button`} onClick={() => filterByRegion(link.toLowerCase())}>{link}</button>
      </li>
    )
  })

  return (
    <div className="dropdown" onClick={() => showDropDown('dropdown')}>
      Filter by Region
      <MdArrowDropDown size={25}/>
      <div id='dropdown' className={`dropdown-content shadow-${theme.toLowerCase()} item-${theme.toLowerCase()}`}>
        <ul>
          {links}
        </ul>
      </div>
    </div>
  )
}
