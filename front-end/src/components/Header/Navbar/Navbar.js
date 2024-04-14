import React, { useContext, useEffect, useRef, useState } from 'react'
import './Navbar.css'
import AuthContext from '../../../contexts/AuthContext'
import { Link } from 'react-router-dom'
import { BASE_URL } from '../../../Utils/Variables/ApiVariables'
import changeTheme from '../../../Utils/ChangeTheme/ChangeTheme'

export default function Navbar() {


  const authContext = useContext(AuthContext)

  const [menus, setMenus] = useState([])
  const mobileMenuElm = useRef()

  useEffect(() => {
    fetch(`${BASE_URL}menus`)
      .then(res => res.ok ? res.json() : [])
      .then(result => {
        setMenus(result)
      })
  }, [])

  function openMobileMenuHandler() {
    mobileMenuElm.current.classList.add("mainbar__content--mobile-mode-open")
  }

  function colseMobileMenuHandler() {
    mobileMenuElm.current.classList.remove("mainbar__content--mobile-mode-open")
  }

  function openMobileSubmenu(event) {
    if (event.target.tagName === 'LI') {
      event.target.classList.toggle("category-menu__item--open")
    }
  }




  return (
    <div class="mainbar d-flex-space-between">
      <div class="mainbar__mobile-menu-icon" onClick={openMobileMenuHandler}>
        <label class="mainbar__mobile-menu-label" for="mainbar__mobile-menu-check">
          <span class="mainbar__mobile-menu-line"></span>
        </label>
      </div>
      <div class="mainbar__content d-flex-space-between" ref={mobileMenuElm}>
        <div class="close-mobile-menu" onClick={colseMobileMenuHandler}>
          <span class="close-mobile-menu__line"></span>
        </div>
        <div class="mainbar__mobile--user-account">
          {
            !(authContext.userInfos.length === 0) ? (
              <>
                <Link to='/my-account'>
                  <svg class="mainbar__user-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path
                      d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
                  </svg>
                </Link>
                <Link to="/my-account" className="mainbar__user-name">
                  {authContext.userInfos.name}
                </Link>
              </>
            ) : (
              <>
                <Link to='/login'>
                  <svg class="mainbar__user-icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 448 512">
                    <path
                      d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
                  </svg>
                </Link>
                <Link to="/login" className="mainbar__user-name">
                  ورود | ثبت نام
                </Link>
              </>
            )
          }
        </div>
        <img src="/image/icons/online-learning.png" class="mainbar__course-icon" alt="courses" />
        <ul class="category-menu">
          {
            menus.map(menu => (
              <li class="category-menu__item" onClick={openMobileSubmenu}>
                <Link to={`/category-info/${menu.href}/1`} class="category-menu__link"><span>دسته ی</span><br />{menu.title}</Link>

                {menu.submenus.length > 0 && (
                  <ul class="category-menu__submenu">
                    {menu.submenus.map(submenuItem => (
                      <li class="category-menu__submenu-item">
                        <Link to={`/course-info/${submenuItem.href}`} class="category-menu__submenu-link">{submenuItem.title}</Link>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))
          }
        </ul>
      </div>
      <div class="body-cover"></div>
      <div class="logo">
        <a class="logo__link" href="#">
          <img src="/image/Logo.png" class="logo__image" alt="sabzlearn" />
        </a>
      </div>
      <div class="them-handler them-handler--mobile" >
        <div class="them-handler__icon" onClick={() => changeTheme()}>
          <img class="them-handler__darck-moon" src="/image/icons/darck-moon.svg" alt="theme" />
        </div>
      </div>
    </div>
  )

}
