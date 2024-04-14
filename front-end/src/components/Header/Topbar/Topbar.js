import React, { memo, useContext, useEffect, useMemo, useRef, useState } from 'react'
import './Topbar.css'
import { BASE_URL } from '../../../Utils/Variables/ApiVariables'
import { Link } from 'react-router-dom'
import AuthContext from '../../../contexts/AuthContext'
import { FaUser } from "react-icons/fa";
import changeTheme from '../../../Utils/ChangeTheme/ChangeTheme'

const Topbar = memo(() => {

  const authContext = useContext(AuthContext)


  const [allTopbarLinks, setAllTopbarLinks] = useState([])
  const mainInfos = useContext(AuthContext).mainInfos;


  useEffect(() => {
    fetch(`${BASE_URL}menus/topbar`)
      .then(res =>res.ok ? res.json() : [])
      .then(result => setAllTopbarLinks(result))
  }, [])

  function getRandomMenu(allLinks, count) {
    return (allLinks?.sort(() => 0.5 - Math.random()).slice(0, count))
  }
  return (
    <div class="topbar d-flex-space-between">
      <ul class="topbar__menu d-flex-space-between">
        {getRandomMenu(allTopbarLinks, 5).map(link => (
          <li class="topbar__item">
            <Link to={`/course-info/${link.href}`}>{link.title}</Link>
          </li>
        ))}
      </ul>
      <div class="topbar__kit d-flex-space-between">
        <span class="topbar__supporter">پشتیبانی سریع <span>{mainInfos.phone}</span></span>
        <div href="#" class="topbar__account">

        <FaUser class="topbar__user-icon"/>
          {
            !(authContext.userInfos.length === 0) ? (
              <Link to="/my-account">
                {authContext.userInfos.name}
              </Link>
            ) : (
              <Link to="/login">
                ورود | ثبت نام
              </Link>
            )
          }
        </div>
        <div class="them-handler">
          <div class="them-handler__icon" onClick={changeTheme}>
            <img class="them-handler__darck-moon" src="/image/icons/darck-moon.svg" alt="theme" />
          </div>
        </div>
      </div>
    </div>
  )
})

export default Topbar