import React, { useState } from 'react'
import './CourseBox.css'
import Shimmer from '../Shimmer/Shimmer'
import { Link } from 'react-router-dom'
import { FaStar } from "react-icons/fa";
import { CiStar } from "react-icons/ci";
import { FaChalkboardTeacher } from "react-icons/fa";




export default function CourseBox({ course, slideMode = false }) {

    const [isImageShow, setIsImageShow] = useState(false)

    return (
        <div class={`course-box ${slideMode ? 'course-box--in-carousel' : ""}`}>
            <Link to={`/course-info/${course.shortName}`}>
                <div class="course-box__cover">
                    <img src={`http://localhost:4000/courses/covers/${course.cover}`} class="course-box__img" alt="node js" onLoad={() => setIsImageShow(true)} />
                </div>

                {!isImageShow && <Shimmer />}
            </Link>
            <div class="course-box__content">
                <div class="course-box__top-content">
                    <Link to={`/course-info/${course.shortName}`}>
                        <h4 class="course-box__title">{course.name}</h4>
                    </Link>
                    {(course.price !== 0 && course.discount) ? (
                        <span class="course-box__discount">%{course.discount}</span>
                    ):""}
                    <span class="course-box__score">
                        {
                            course?.courseAverageScore ? (
                                <>
                                {
                                        Array(course.courseAverageScore).fill(0).map(item => (
                                            <FaStar class="course-box__star" />
                                        ))
                                    }
                                    {
                                        Array(5 - course?.courseAverageScore).fill(0).map(item => (
                                            <CiStar class="course-box__star" />
                                        ))
                                    }
                                </>
                            ) : (<></>)
                        }
                    </span>
                </div>
                <div class="course-box__bottom-content">
                    <div class="course-box__teacher">
                        <FaChalkboardTeacher class="course-box__teacher-icon" />
                        <span class="course-box__teacher-name">{course.creator}</span>
                    </div>
                    <div class="course-box__price">
                        {
                            course.price === 0 ? (
                                <span class="course-box__price">{"رایگان"}</span>
                            ) :
                                course.discount ? (
                                    <>
                                        <span class="course-box__del-price">{course.price?.toLocaleString()}</span>
                                        <span class="course-box__price"> {course.price - ((course.price * course.discount) / 100)}<br /><span
                                            class="course-box__price-yeka">تومان</span></span>
                                    </>
                                ) : (
                                    <span class="course-box__price">{`${course.price?.toLocaleString()}`}<br /><span
                                        class="course-box__price-yeka">تومان</span></span>
                                )
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}