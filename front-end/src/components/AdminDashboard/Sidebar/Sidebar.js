import React, { useContext, useEffect, useRef } from 'react'
import './Sidebar.css'
import { Link, useNavigate , useLocation } from 'react-router-dom'
import AuthContext from '../../../contexts/AuthContext'
import swal from 'sweetalert'
import { FaHome, FaRegCommentDots, FaRegNewspaper } from 'react-icons/fa'
import { RiMovieFill, RiLogoutBoxRFill } from "react-icons/ri";
import { GoChecklist } from "react-icons/go";
import { MdMenuBook, MdMessage } from "react-icons/md";
import { FaUsers } from "react-icons/fa6";
import { GrClose, GrSort } from "react-icons/gr";
import { GiTicket } from "react-icons/gi";
import { TbDiscount2 } from "react-icons/tb";
import { LuPartyPopper } from "react-icons/lu";

export default function Sidebar({ isShowSidebar ,sidebarHandler }) {

    const authContext = useContext(AuthContext)
    const navigate = useNavigate()
    const location = useLocation()
    const sidebarLinks = useRef()

    function logutHandler(event) {
        event.preventDefault()
        swal({
            title: 'شما از حساب خارج شدید',
            icon: 'success',
            button: 'اوکی'
        }).then(value => {
            authContext.logout()
            navigate('/')
        })
    }

    function onMenuClicked(event){
        if(event.target.TagName!=='UL'){
            // const elements = event.currentTarget.children
            // for (const key in elements) {
            //     elements[key].classList?.remove("active-menu")
            // }
            // let activeElm = event.target
            // while(activeElm.tagName !== 'LI'){
            //     activeElm = activeElm.parentElement
            // }
            // activeElm.classList?.add('active-menu')

            sidebarHandler()
        }
    }

    useEffect(()=>{
        const items = sidebarLinks.current.children
        for (const item in items) {
            if(items[item].classList?.value ===location.pathname){
                items[item].classList.add("active-menu")
            }else{
                items[item].classList?.remove("active-menu")
            }
        }
    },[location])

    return (
        <div className={`sidebar ${isShowSidebar ? "sidebar--open" : ""}`}>
            <div className="sidebar-header">
                <div className="sidebar-logo">
                    <Link href="/">
                        <img src="/image/Logo.png" alt="Logo" />
                    </Link>
                </div>

                <div className="sidebar-menu-btn" onClick={()=>sidebarHandler()}>
                <GrClose className='sidebar-menu-btn__icon' />
                </div>
            </div>
            <div className="sidebar-menu">
                <ul onClick={onMenuClicked} ref={sidebarLinks}>
                    <li className="active-menu /admin-dashboard">
                        <Link to="/admin-dashboard">
                            <FaHome className="sidebar-menu__icon" />
                            <span>صفحه اصلی</span>
                        </Link>
                    </li>
                    <li className='/admin-dashboard/courses'>
                        <Link to="courses">
                            <RiMovieFill className="sidebar-menu__icon" />
                            <span>دوره ها</span>
                        </Link>
                    </li>
                    <li className='/admin-dashboard/sessions'>
                        <Link to="sessions">
                            <GoChecklist className="sidebar-menu__icon" />
                            <span>جلسات</span>
                        </Link>
                    </li>
                    <li className='/admin-dashboard/menus'>
                        <Link to="menus">
                            <MdMenuBook className="sidebar-menu__icon" />
                            <span>منو ها</span>
                        </Link>
                    </li>
                    <li className='/admin-dashboard/articles'>
                        <Link to="articles">
                            <FaRegNewspaper className="sidebar-menu__icon" />
                            <span>مقاله ها</span>
                        </Link>
                    </li>
                    <li className='/admin-dashboard/users'>
                        <Link to="users">
                            <FaUsers className="sidebar-menu__icon" />
                            <span>کاربران</span>
                        </Link>
                    </li>
                    <li className='/admin-dashboard/contact'>
                        <Link to="contact">
                            <MdMessage className="sidebar-menu__icon" />
                            <span>پیغام ها</span>
                        </Link>
                    </li>
                    <li className='/admin-dashboard/category'>
                        <Link to="category">
                            <GrSort className="sidebar-menu__icon" />
                            <span>دسته‌بندی‌ها</span>
                        </Link>
                    </li>
                    <li className='/admin-dashboard/comments'>
                        <Link to="comments">
                            <FaRegCommentDots className="sidebar-menu__icon" />
                            <span>کامنت ها</span>
                        </Link>
                    </li>
                    <li className='/admin-dashboard/tickets'>
                        <Link to="tickets">
                            <GiTicket className="sidebar-menu__icon" />
                            <span>تیکت ها</span>
                        </Link>
                    </li>
                    <li className='/admin-dashboard/offs'>
                        <Link to="offs">
                            <TbDiscount2 className="sidebar-menu__icon" />
                            <span>کد تخفیف</span>
                        </Link>
                    </li>
                    <li className='/admin-dashboard/discount'>
                        <Link to="discount">
                            <LuPartyPopper className="sidebar-menu__icon" />
                            <span>کمپین تخفیف</span>
                        </Link>
                    </li>
                    <li>
                        <Link to='/'>
                            <RiLogoutBoxRFill className="sidebar-menu__icon" />
                            <span>خروج از پنل</span>
                        </Link>
                    </li>
                    <li>
                        <Link to='#' onClick={logutHandler}>
                            <RiLogoutBoxRFill className="sidebar-menu__icon" />
                            <span>خروج از حساب</span>
                        </Link>
                    </li>
                </ul>
            </div>
        </div>
    )
}
