import React from 'react'
import './DataTable.css'

export default function DataTable({title , children}) {
  return (
    <div className='data-table'>
      <div className="data-table__title">
        <span className='data-table__signup-wrapper'>
          لیست <span className="data-table__signup">{title}</span>
        </span>
      </div>
      <div className="data-table__content">
        {
            children
        }
      </div>
    </div>
  )
}
