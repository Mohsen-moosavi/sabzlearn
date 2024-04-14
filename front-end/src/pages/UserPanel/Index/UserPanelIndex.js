import React, { useContext } from 'react'
import AuthContext from '../../../contexts/AuthContext'
import IndexBox from '../../../components/UserPanel/IndexBox'

export default function UserPanelIndex() {

    const authContext = useContext(AuthContext)

  return (
    <div class="p-user-main">
      <div class="main__title">
        <span class="app-text">
          سلام{" "}
          <span class="app-title">{authContext.userInfos.name}</span>،
          به پنل کاربری خوش اومدی
        </span>
      </div>
      <p class="app-text mt-4">
        از طریق پیشخوان حساب کاربری‌تان، می‌توانید سفارش‌های اخیرتان را
        مشاهده، آدرس‌های حمل و نقل و صورتحساب‌تان را مدیریت و جزییات حساب
        کاربری و کلمه عبور خود را ویرایش کنید.
      </p>
      <div class="main__links">
        <div class="row">
          <IndexBox title="سفارش" href="orders" />
          <IndexBox title="دوره های خریداری شده" href="buyed" />
          <IndexBox title="جزئیات حساب کاربری" href="edit-account" />
          <IndexBox title="تیکت های پشتیبانی" href="tickets" />
        </div>
      </div>
    </div>
  )
}
