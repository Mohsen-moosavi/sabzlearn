import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './../../components/AdminDashboard/Sidebar/Sidebar'
import Topbar from '../../components/AdminDashboard/Topbar/Topbar'
import './AdminDashboard.css'

export default function AdminDashboard() {

  const [isShowSidebar, setIsShowSidebar] = useState(true)

  function sidebarHandler() {
    setIsShowSidebar(preValue => !preValue)
  }

  function sidebarFalsHandler() {
    setIsShowSidebar(false)
  }


  return (
    <div class="p-admin-content">
      <Sidebar class="side-bar" id="sidebar" isShowSidebar={isShowSidebar} sidebarHandler={sidebarFalsHandler} />
      <div class="main-bar" id="home">
        <Topbar sidebarHandler={sidebarHandler} isShowSidebar={isShowSidebar} />
        <div className='container'>
          <Outlet />
        </div>
      </div>
    </div>
  )

  // return (
  //   <>
  //     <div id="content">
  //       <Sidebar />
  //       <div id="home">
  //         <Topbar />
  //         <div id="home-content">
  //           <Outlet />
  //         </div>
  //       </div>
  //     </div>


  //   </>
  // )
}
