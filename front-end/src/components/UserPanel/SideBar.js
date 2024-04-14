import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import AuthContext from '../../contexts/AuthContext'
import swal from 'sweetalert'
import './SideBar.css'

export default function Sidebar() {

  const authContext = useContext(AuthContext)
  const navigate = useNavigate()

  function logoutUser(event) {
    event.preventDefault()

    swal({
      title: "آیا از خروج مطمئن هستید؟",
      icon: "warning",
      buttons: ["خیر", "بله"]
    }).then(result => {
      if (result) {
        swal({
          title: "با موفقیت از حساب خارج شدید.",
          icon: "success",
          buttons: "تایید"
        }).then(() => {
          authContext.logout()
          navigate('/')
        })

      }
    })

  }

  return (
    <div class="p-user-sidebar">
      <span class="p-user-sidebar__name">{authContext.userInfos?.name}</span>
      <ul class="p-user-sidebar__list">
        <li class="p-user-sidebar__item">
          <Link class="p-user-sidebar__link" to="/my-account">
            پیشخوان
          </Link>
        </li>
        <li class="p-user-sidebar__item">
          <Link class="p-user-sidebar__link" to="orders">
            سفارش‌ها
          </Link>
        </li>
        <li class="p-user-sidebar__item">
          <Link class="p-user-sidebar__link" to="edit-account">
            جزئیات حساب کاربری
          </Link>
        </li>
        <li class="p-user-sidebar__item">
          <Link class="p-user-sidebar__link" to="buyed">
            دوره های خریداری شده
          </Link>
        </li>
        <li class="p-user-sidebar__item">
          <Link class="p-user-sidebar__link" to="tickets">
            تیکت های پشتیبانی
          </Link>
        </li>
        {authContext.userInfos?.role === 'ADMIN' ? (
          <li class="p-user-sidebar__item">
            <Link class="p-user-sidebar__link" to="/admin-dashboard">
              پنل مدیریت
            </Link>
          </li>
        ) : ('')}
        <li class="p-user-sidebar__item" onClick={logoutUser}>
          <a class="p-user-sidebar__link" href="#">
            خروج از سیستم
          </a>
        </li>
      </ul>
    </div>
  )
}
