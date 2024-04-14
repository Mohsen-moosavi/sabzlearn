import React, { useContext } from 'react'
import AuthContext from '../contexts/AuthContext'
import { useNavigate } from 'react-router-dom'

export default function AdminPrivate({children}) {

    const navigate = useNavigate()

  return (
    <>
    {localStorage.getItem('role') === 'ADMIN' ? <>{children}</> : navigate('/')}
    </>
  )
}
