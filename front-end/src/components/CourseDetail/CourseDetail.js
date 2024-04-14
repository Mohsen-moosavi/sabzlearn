import React from 'react'
import "./CourseDetail.css"

export default function CourseDetail({title , detail , icon}) {
    return (
        <div className="col-6 col-md-4 gx-2 gx-sm-4">
            <div className="course-boxes__box">
                <div className="course-boxes__box-right">
                    <i class={`course-boxes__box-right-icon ${icon}`}></i>
                </div>
                <div className="course-boxes__box-left">
                    <span className="course-boxes__box-left-title">
                        {title}
                    </span>
                    <span className="course-boxes__box-left--subtitle">
                        {detail}
                    </span>
                </div>
            </div>
        </div>
    )
}

