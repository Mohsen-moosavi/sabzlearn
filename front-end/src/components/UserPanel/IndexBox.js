import React from 'react'
import './IndexBox.css'
import { Link } from 'react-router-dom'

export default function IndexBox({href , title}) {
  return (
    <div class="col-12 col-sm-4">
    <Link to={href} class="main__link">
      {title}
    </Link>
  </div>
  )
}
