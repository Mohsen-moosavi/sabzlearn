import React from 'react'
import "./BreadCrumb.css"
import { Link } from 'react-router-dom'
import { FaHome } from "react-icons/fa";
import { IoIosArrowBack } from "react-icons/io";


export default function BreadCrumb({ links }) {
    return (
        <section class="breadcrumb">
                <div class="breadcrumb__content">
                    <div class="breadcrumb__home-content-icon">
                    <FaHome class="breadcrumb__home-icon"/>
                    </div>
                    <ul class="breadcrumb__list">
                        {links.map((link, index) => (
                            <li class="breadcrumb__item" key={link}>
                                <Link to={link.to} class="breadcrumb__link">
                                    {link.title}
                                    {links.length-1 == index ? (
                                        <></>
                                    ) : (
                                        <IoIosArrowBack class="breadcrumb__icon"/>
                                    )}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
        </section>
    )
}
