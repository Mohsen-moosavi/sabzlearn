import React, { useEffect } from 'react'
import './NotFound.css'
import { Link , useNavigate , useLocation } from 'react-router-dom'

export default function NotFound() {

    const navigate = useNavigate()
    const location = useLocation()

    useEffect(()=>{
        if(location.pathname !== '/not-found' ){
            navigate('/not-found' ,{replace : true})
        }
    } , [])
    

  return (
    <div className='not-found'>
      <span className='not-found__404'>404</span>
      <p className='not-found__text'>not found page</p>
      <Link to="/" className='not-found__link'>بازگشت به صفحه اصلی</Link>
    </div>
  )
}
