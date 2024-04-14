import React from 'react'
import './SectionHeader.css'
import { FaLongArrowAltLeft } from "react-icons/fa";
import { GiTeacher } from "react-icons/gi";
import { Link } from 'react-router-dom'

export default function SectionHeader({ title, description, btnMore, btnHref , whiteMode }) {

  return (
    <div class={`section-header ${whiteMode ? "section-header--white" : ""} ${btnMore ? "" : "section-header--complete-line"}`}>
      <div class="section-header__text">
        <div class="section-header__icon-wrapper">
          <GiTeacher className='section-header__icon'/>
        </div>
        <h4 class="section-header__title">{description}<br /><span class="section-header__bold-title">{title}</span></h4>
      </div>
      {btnMore ? (
        <div class="section-header__links-wrapper">
          <Link to={btnHref} class="section-header__show-more-btn">
            {btnMore}
          </Link>
          <Link to={btnHref} class="section-header__show-more-icon">
          <FaLongArrowAltLeft />
          </Link>
        </div>
      ) :
        (null)}
    </div>
  )
}
