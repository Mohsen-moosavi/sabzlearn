import React, { useEffect, useState } from 'react'
import './Topbar.css'
import { BASE_URL } from '../../../Utils/Variables/ApiVariables'
import { FaBell } from "react-icons/fa";

export default function Topbar({ sidebarHandler, isShowSidebar }) {

    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const [adminInfo, setAdminInfo] = useState({})
    const [adminNotifications, setAdminNotifications] = useState([])
    const [isShowNotifications, setIsShowNotifications] = useState(false)

    useEffect(() => {
        setIsSidebarOpen(isShowSidebar)

        const localStorageData = JSON.parse(localStorage.getItem("user"))

        fetch(`${BASE_URL}auth/me`, {
            headers: {
                Authorization: `Bearer ${localStorageData.token}`
            }
        }).then(res => res.json())
            .then(result => {
                setAdminInfo(result)
                setAdminNotifications(result.notifications)
            })
    }, [])

    useEffect(() => {
        setIsSidebarOpen(isShowSidebar)
    }, [isShowSidebar])

    function notificationHadler(event) {
        setIsShowNotifications(prevValue => !prevValue)
    }

    function seenNotificationHandler(notID) {
        const localStorageData = JSON.parse(localStorage.getItem('user'))
        fetch(`${BASE_URL}notifications/see/${notID}`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${localStorageData.token}`
            }
        })
    }

    function onSidebarBtnClicked() {
        sidebarHandler()
    }

    return (
        <div className='container'>
            <div className={`p-admin-topbar`}>
                <div className="p-admin-topbar__right">
                    <div className='sidebar-handler'>
                        <div className='sidebar-handler__button' onClick={() => onSidebarBtnClicked()}>
                            <span className={`sidebar-handler__line ${isSidebarOpen ? 'sidebar-handler__line--open' : ""}`}></span>
                        </div>
                    </div>
                    <div className='p-admin-topbar__intro'>
                        <span className='p-admin-topbar__intro-hello'>سلام <span>{adminInfo.name}</span> عزیز</span>
                        <span className='p-admin-topbar__intro-text'>به پنل مدیریت سایت سبزلرن خوش آمدید</span>
                    </div>
                </div>
                <div className="p-admin-topbar__left">
                    <div className={`p-admin-topbar__notification ${isShowNotifications ? "active-modal-notfication" : ""}`}>
                        <button className="p-admin-topbar__notification-button" type='button'
                            onClick={notificationHadler}>
                            <FaBell className="far fa-bell p-admin-topbar__notification-icon" />
                        </button>
                        <div className='p-admin-topbar__notification-modal'>
                            <ul className="  p-admin-topbar__notification-modal-list">
                                {
                                    adminNotifications.length === 0 ? (
                                        <li className="  p-admin-topbar__notification-modal-item">
                                            هیچ نوتیفیکیشنی وجود ندارد
                                        </li>
                                    ) : (
                                        <>
                                            {
                                                adminNotifications.map(not => (
                                                    <li className="  p-admin-topbar__notification-modal-item">
                                                        <span className="  p-admin-topbar__notification-modal-text">{not.msg}</span>
                                                        <label className="  p-admin-topbar__switch">
                                                            <span onClick={() => seenNotificationHandler(not._id)}>دیدم</span>
                                                        </label>
                                                    </li>
                                                ))
                                            }
                                        </>
                                    )
                                }


                            </ul>
                        </div>
                    </div>
                    <span className='p-admin-topbar__vertical-line'></span>
                    <div className="p-admin-topbar__profile">
                        <div className="p-admin-topbar__profile-info">
                            <a href="#" className="p-admin-topbar__profile-name">{adminInfo.name}</a>
                            <br />
                            ADMIN
                        </div>
                        <div className="p-admin-topbar__profile-image">
                            <a href="#">
                                <img src={`${adminInfo.profile}`} alt="" />
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
