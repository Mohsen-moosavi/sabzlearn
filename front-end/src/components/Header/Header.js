import React, { memo, useContext, useEffect, useRef, useState } from 'react'
import './Header.css'
import Topbar from './Topbar/Topbar'
import Navbar from './Navbar/Navbar'


const Header =memo(({name})=> {

  return (
    <header class="header">
      <div class="container">
        <div class="header__content">
          <Topbar/>
          <Navbar/>
        </div>
      </div>
    </header>



  )
})

export default Header