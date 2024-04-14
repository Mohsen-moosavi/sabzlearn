import React, { useEffect, useState } from 'react'
import './Buyed.css'
import { BASE_URL } from '../../../Utils/Variables/ApiVariables'
import { Link } from 'react-router-dom'
import CourseBox from '../../../components/CourseBox/CourseBox'

export default function Buyed() {

  const [allCourses, setAllCourses] = useState([])
  const [shownCourses, setShownCourses] = useState([])
  const [shownCoursesState, setShowCourseState] = useState("all")

  useEffect(() => {
    fetch(`${BASE_URL}users/courses`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
      }
    }).then(res => res.json())
      .then(result => {
        setAllCourses(result)
        setShownCourses(result)
      })
  }, [])

  useEffect(() => {
    switch (shownCoursesState) {
      case 'all': {
        setShownCourses(allCourses)
        break;
      }
      case 'free': {
        const freeCourses = allCourses.filter(course => course.price === 0)
        setShownCourses(freeCourses)
        break;
      }
      case 'money': {
        const freeCourses = allCourses.filter(course => course.price !== 0)
        setShownCourses(freeCourses)
        break;
      }
      default: {
        setShownCourses(allCourses)
      }
    }
  }, [shownCoursesState])


  return (

    <div class="courses p-user-main">
      <div class="courses-header__panel">
        <span class="courses-header__title">دوره های ثبت نام شده</span>
        <ul class="courses-header__list">
          <li
            class="courses-header__item"
            onClick={(event) => {
              event.preventDefault();
              setShowCourseState("all");
            }}
          >
            <a
              class={`courses-header__link__panel ${shownCoursesState === 'all' ? "courses-header__link-active" : ""}`}
              href="#"
            >
              همه دوره ها
            </a>
          </li>
          <li
            class="courses-header__item"
            onClick={(event) => {
              event.preventDefault();
              setShowCourseState("free");
            }}
          >
            <a
              class={`courses-header__link__panel ${shownCoursesState === "free" ? "courses-header__link-active" : ''}`}
              href="#"
            >
              دوره های رایگان
            </a>
          </li>
          <li
            class="courses-header__item"
            onClick={(event) => {
              event.preventDefault();
              setShowCourseState("money");
            }}
          >
            <a
              class={`courses-header__link__panel ${shownCoursesState === 'money' ? "courses-header__link-active" : ''}`}
              href="#"
            >
              دوره های پولی
            </a>
          </li>
        </ul>
      </div>
      <div class="main">
        <div class="row">
          <div class="col-12">
            {shownCourses.length !== 0 ? (
              <>
                {shownCourses.map((course) => (
                  <div class="main__box">
                    <div className="row">
                      <div className="col-12 col-sm-4">
                      <div class="main__box-right">
                      <a class="main__box-img-link" href="#">
                        <img
                          class="main__box-img"
                          src={`http://localhost:4000/courses/covers/${course.course.cover}`}
                        />
                      </a>
                    </div>
                      </div>
                      <div className="col-12 col-sm-8">
                      <div class="main__box-left">
                      <Link to="#" class="main__box-title">
                        {course.course.name}
                      </Link>
                      <div class="main__box-bottom">
                        <div class="main__box-all">
                          <span class="main__box-all-text">وضعیت:</span>
                          <span class="main__box-all-value">
                            {course.course.isComplete === 1
                              ? "تکمیل شده"
                              : "در حال برگزاری"}
                          </span>
                        </div>
                        <div class="main__box-completed">
                          <span class="main__box-completed-text">مبلغ:</span>
                          <span class="main__box-completed-value">
                            {course.course.price === 0
                              ? "رایگان"
                              : course.course.price}
                          </span>
                        </div>
                      </div>
                    </div>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <div className="alert alert-danger">
                دوره‌ای جهت نمایش برای این فیلتر وجود ندارد
              </div>
            )}
          </div>
        </div>
      </div>
    </div>

  )
}
