import React, { useContext } from 'react'
import { GlobalContext } from '..'

import { MdOutlineDarkMode, MdOutlineLightMode } from 'react-icons/md'


export default function Header() {

  const { theme, changeTheme } = useContext(GlobalContext)

  return (
    <header className={`item-${theme.toLowerCase()}`}>
      <div className='container header-content'>
        <p className='header-title'>Where in the world?</p>
        <button className={`item-${theme.toLowerCase()} header-button`} onClick={changeTheme}>
          {theme === 'Dark' ?
            <><MdOutlineLightMode /> Light Mode</>
            :
            <><MdOutlineDarkMode /> Dark Mode</>
          }
        </button>
      </div>
    </header>

  )
}
