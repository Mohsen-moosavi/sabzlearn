import React, { useContext } from 'react'
import './UserPanel.css'
import Footer from '../../components/Footer/Footer'
import SideBar from '../../components/UserPanel/SideBar'
import { Outlet } from 'react-router-dom'
import Header from '../../components/Header/Header'
import AuthContext from '../../contexts/AuthContext'
import{ useNavigate }from 'react-router-dom'

export default function UserPanel() {

    const authContext = useContext(AuthContext)
    const navigator = useNavigate()

    if(!authContext.isLoggedIn){
        return navigator('/')
    }

    return (
        <>
            <Header />

            <section class="content">
                <div class="content-header">
                    <div class="container">
                        <span class="app-title">حساب کاربری من</span><br />
                    </div>
                </div>
                <div class="content-main">
                    <div class="container">
                        <div class="row gy-4">
                            <div className="col-12 col-md-3">
                                <SideBar />
                            </div>
                            <div className="col-12 col-md-9">
                                <Outlet />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Footer />
        </>
    )
}
