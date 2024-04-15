import React, { useContext, useEffect, useState } from 'react'
import './SessionInfo.css'
import Footer from './../../components/Footer/Footer'
import { Link, useParams, useLocation, useNavigate } from 'react-router-dom'
import { BASE_URL } from '../../Utils/Variables/ApiVariables'
import Header from '../../components/Header/Header'
import { FaArrowLeft, FaArrowRight, FaBookOpen, FaHome } from 'react-icons/fa'
import { FaCirclePlay } from 'react-icons/fa6'
import { IoIosArrowForward } from 'react-icons/io'
import AuthContext from '../../contexts/AuthContext'

export default function SessionInfo() {

    const user = useContext(AuthContext)
    const navigate = useNavigate()

    const { courseName, sessionID } = useParams()
    const [sessionInfos, setSessionInfos] = useState({})
    const [sessionsList, setSessionsList] = useState([])

    const location = useLocation()

    useEffect(() => {
        if (user.isLoggedIn) {
            getMainInfos()
        } else {
            navigate('/login')
        }
    }, [])

    useEffect(() => {
        if (user.isLoggedIn) {
            getMainInfos()
        } else {
            navigate('/login')
        }
    }, [location])

    function getMainInfos() {
        fetch(`${BASE_URL}courses/${courseName}/${sessionID}`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token}`
            }
        }).then(res => res.ok ? res.json() : [])
            .then(result => {
                setSessionInfos(result.session)
                setSessionsList(result.sessions)
            })
    }

    return (
        <>
            <Header />
            <section class="session-section">
                <div className='container'>
                    <div className="row">
                        <div class="col-12 col-lg-4 order-2">
                            <div class="session-sidebar">
                                <div class="session-sidebar__header">
                                    <Link class="session-sidebar__header-link" to={`/course-info/${courseName}`}>
                                        <FaBookOpen class="session-sidebar__haeder-icon" />
                                        لیست جلسات
                                    </Link>
                                </div>
                                <div class="session-sidebar-topics">
                                    <div class="session-sidebar-topics__item">
                                        <ul class="session-sidebar-topics__list">
                                            {
                                                sessionsList.map(session => (
                                                    <>
                                                        <li class={`session-sidebar-topics__list-item ${sessionInfos.title == session.title ? "active-session" : ''} `}>
                                                            <div class="session-sidebar-topics__list-right">
                                                                <FaCirclePlay class="session-sidebar-topics__list-item-icon" />
                                                                <Link class="session-sidebar-topics__list-item-link" to={`/session/${courseName}/${session._id}`}>
                                                                    {session.title}
                                                                </Link>
                                                            </div>
                                                            <div class="session-sidebar-topics__list-left">
                                                                <span class="session-sidebar-topics__list-item-time">
                                                                    {session.time}
                                                                </span>
                                                            </div>
                                                        </li>
                                                    </>
                                                ))
                                            }
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-12 col-lg-8 order-1 order-lg-3">
                            <div class="episode">
                                <div class="episode-haeder">
                                    <div class="episode-header__right">
                                        <a class="episode-header__right-back-link" href="#">
                                            <IoIosArrowForward class="episode-header__icon episode-header__right-back-icon"></IoIosArrowForward>
                                            <div class="episode-header__right-home">
                                                <Link class="episode-header__right-home-link" to={`/course-info/${courseName}`}>
                                                    به دوره خانه بروید
                                                </Link>
                                                <FaHome class="episode-header__icon episode-header__right-home-icon"></FaHome>
                                            </div>
                                        </a>
                                    </div>
                                    <div class="episode-header__left">
                                        <FaCirclePlay class="episode-header__icon episode-header__left-icon"></FaCirclePlay>
                                        <span class="episode-header__left-text">
                                            {" "}
                                            {sessionInfos.title}
                                        </span>
                                    </div>
                                </div>
                                <div class="episode-content">
                                    <video
                                        class="episode-content__video"
                                        controls
                                        src={`http://localhost:4000/courses/covers/${sessionInfos.video}`}
                                    ></video>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </section>
            <Footer />
        </>
    )
}
