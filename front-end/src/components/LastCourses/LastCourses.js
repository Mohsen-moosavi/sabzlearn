import React, { useEffect, useState } from 'react'
import './LastCourses.css'
import SectionHeader from '../SectionHeader/SectionHeader'
import CourseBox from '../CourseBox/CourseBox'
import { BASE_URL } from '../../Utils/Variables/ApiVariables'

export default function LastCourses() {

    const [courses, setCourses] = useState([])

    useEffect(() => {
        fetch(`${BASE_URL}courses`)
            .then(res => res.ok ? res.json() : [])
            .then(result => setCourses(result))
    }, [])


    return (
        <section class="last-course">
            <div style={{ height: '150px', overflow: "hidden" }} class="last-course__vawe">    <svg
                preserveAspectRatio="none"
                viewBox="0 0 500 150"
                style={{ height: "100%", width: "100%" }}
            >
                <path d="M0 49.85c302.14 58.9 190.97 58.9 500 0V0H0z"></path>
            </svg></div>
            <div class="container">
                <SectionHeader
                    title={"دوره های آموزشی"}
                    description={"جدید ترین"}
                    btnMore={"تمامی دوره ها"}
                    btnHref={"/courses/1"}
                    whiteMode={true}
                />
                <div class="row g-5">
                    {courses?.reverse().slice(0, 6).map(courseInfo => (
                        <div class="col-12 col-md-6 col-lg-4">
                            <CourseBox course={courseInfo} />
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}
