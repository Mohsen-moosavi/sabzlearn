import React from 'react'
import "./Index.css"
import Header from '../../components/Header/Header'
import Landing from './../../components/Landing/Landing'
import LastCourses from '../../components/LastCourses/LastCourses'
import PopularCourses from '../../components/PopularCourses/PopularCourses'
import PresellCourses from '../../components/PresellCourses/PresellCourses'
import LastArticles from '../../components/Articles/LastArticles'
import Footer from '../../components/Footer/Footer'
import Services from '../../components/sevices/Services'

export default function Index() {
  return (
    <>
      <Header />
      <main className='main-home'>
        <Landing />
        <LastCourses />
        <PopularCourses />
        <Services />
        <PresellCourses />
        <LastArticles />
      </main>
        <Footer />
    </>
  )
}

