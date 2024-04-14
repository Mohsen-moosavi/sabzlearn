import React, { useEffect, useState } from 'react'
import Footer from '../../components/Footer/Footer'
import BreadCrumb from '../../components/BreadCrumb/BreadCrumb'
import "./CourseInfo.css"
import {useLocation} from 'react-router-dom'
import CourseDetail from '../../components/CourseDetail/CourseDetail'
import CommentTextArea from '../../components/CommentTextArea/CommentTextArea'
import Accordion from 'react-bootstrap/Accordion';
import { BASE_URL } from '../../Utils/Variables/ApiVariables'
import { Link, useParams } from 'react-router-dom'
import Comments from '../../components/Comments/Comments'
import swal from 'sweetalert'
import Header from '../../components/Header/Header'
import { FaComments, FaEye, FaFacebookF, FaGraduationCap, FaLink, FaLock, FaTelegramPlane, FaTwitter, FaUserGraduate, FaYoutube } from 'react-icons/fa'
import { FaChalkboardUser } from "react-icons/fa6";
import DOMPurify from 'dompurify'

export default function CourseInfo() {

  const { courseName } = useParams()
  const [courseInfo, setCourseInfo] = useState({})
  const [categoryOfCourse, setCategoryOfCourse] = useState([])
  const [comments, setComments] = useState([])
  const [isUserRegistered, setIsUserRegistered] = useState(false)
  const [sessions, setSessions] = useState([])
  const [courseCreator, setCourseCreator] = useState({})
  const [relatedCourses, setRelatedCourses] = useState([])

  const localStorageData = JSON.parse(localStorage.getItem('user'))
  const location = useLocation()

  useEffect(() => {
    getCourseInfo()

    getRelatedCourse()

  }, [])

  useEffect(()=>{
    getCourseInfo()
    getRelatedCourse()
  },[location])

  function getCourseInfo() {
    fetch(`${BASE_URL}courses/${courseName}`, {
      headers: {
        Authorization: `Bearer ${localStorageData?.token}`
      }
    })
      .then(res => res.json())
      .then(result => {
        setCourseInfo(result)
        setCategoryOfCourse(result.categoryID)
        setComments([...result.comments].reverse())
        setIsUserRegistered(result.isUserRegisteredToThisCourse)
        setSessions(result.sessions)
        setCourseCreator(result.creator)
      })
  }

  function getRelatedCourse(){
    fetch(`${BASE_URL}courses/related/${courseName}`)
      .then(res => res.json())
      .then(result => setRelatedCourses(result))
  }

  function registerToCourse(courseInfo) {
    swal({
      title: "آیا از ثبت نام در این دوره اطمینان دارید؟",
      icon: "warning",
      buttons: ['خیر', 'بله']
    }).then(result => {
      if (courseInfo.price === 0) {
        if (result) {
          fetch(`${BASE_URL}courses/${courseInfo._id}/register`, {
            method: 'POST',
            headers: {
              Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({ price: courseInfo.price })
          }).then(res => {
            if (res.ok) {
              swal({
                title: 'ثبت نام شما در دوره با موفقیت انجام شد.',
                icon: 'success',
                buttons: 'تایید'
              })
              getCourseInfo()
            } else {
              swal({
                title: 'ثبت نام شما در دوره با مشکل مواجه شد.',
                icon: 'success',
                buttons: 'تایید'
              })
            }
          })
        }
      } else {
        swal({
          title: "در صورت داشتن کد تخفیف، آن را وارد کنید.",
          content: 'input',
          buttons: 'ثبت نام در دوره'
        }).then(code => {
          if (code?.trim() === "") {
            fetch(`${BASE_URL}courses/${courseInfo._id}/register`, {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({ price: courseInfo.price })
            }).then(res => {
              if (res.ok) {
                swal({
                  title: 'ثبت نام شما در دوره با موفقیت انجام شد.',
                  icon: 'success',
                  buttons: 'تایید'
                })
                getCourseInfo()
              } else {
                swal({
                  title: 'ثبت نام شما در دوره با مشکل مواجه شد.',
                  icon: 'success',
                  buttons: 'تایید'
                })
              }
            })
          } else if (code?.trim() !== '' && code !== null) {
            fetch(`${BASE_URL}offs/${code.trim()}`, {
              method: 'POST',
              headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
                'Content-type': 'application/json'
              },
              body: JSON.stringify({ course: courseInfo._id })
            }).then(res => {
              if (res.status === 404) {
                swal({
                  title: 'کد تخفیف معتبر نیست',
                  icon: 'error',
                  buttons: 'تایید'
                })
              } else if (res.status == 409) {
                swal({
                  title: 'کد تخفیف قبلا استفاده شده',
                  icon: 'error',
                  buttons: 'تایید'
                })
              } else if (res.status === 200 || res.status === 201) {
                return res.json()
              }
            }).then(result => {
              if (result) {
                fetch(`${BASE_URL}courses/${courseInfo._id}/register`, {
                  method: 'POST',
                  headers: {
                    Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
                    'Content-Type': 'application/json'
                  },
                  body: JSON.stringify({
                    price: (courseInfo.price - ((courseInfo.price * result.percent) / 100))
                  })
                }).then(res => {
                  if (res.ok) {
                    swal({
                      title: 'ثبت نام شما در دوره با موفقیت انجام شد.',
                      icon: 'success',
                      buttons: 'تایید'
                    })
                    getCourseInfo()
                  } else {
                    swal({
                      title: 'ثبت نام شما در دوره با مشکل مواجه شد.',
                      icon: 'success',
                      buttons: 'تایید'
                    })
                  }
                })
              }
            })
          }
        })
      }

    })
  }


  return (
    <>

      <Header />

      <div className='container'>
        <BreadCrumb
          links={[
            { id: 1, title: "خانه", to: "/" },
            { id: 2, title: `آموزش ${categoryOfCourse?.title}`, to: `/category-info/${categoryOfCourse?.name}/1` },
            { id: 3, title: `${courseInfo?.name}`, to: `/course-info/${courseInfo?.shortName}` },
          ]} />

        <section class="course-info">
          <div class="row gy-4">
            <div class="col-12 col-lg-6">
              <Link to={`/category-info/${categoryOfCourse?.name}`} class="course-info__link">
                آموزش {categoryOfCourse?.title}
              </Link>
              <h1 class="app-title">
                {courseInfo.name}
              </h1>
              <p class="app-text">{courseInfo.description}</p>
              <div class="course-info__social-media">
                <a href="#" class="course-info__social-media-item">
                  <FaTelegramPlane className='course-info__icon' />
                </a>
                <a href="#" class="course-info__social-media-item">
                  <FaTwitter class="course-info__icon" />
                </a>
                <a href="#" class="course-info__social-media-item">
                  <FaFacebookF class="course-info__icon" />
                </a>
              </div>
            </div>

            <div class="col-12 col-lg-6">
              <video src="" poster={`http://localhost:4000/courses/covers/${courseInfo.cover}`} class="course-info__video" controls></video>
            </div>
          </div>
        </section>

        <main className='main-course-info'>
          <div className="row">
            <div class="col-lg-8">
              <div class="course">
                {/* <!-- Start Course Boxes --> */}
                <div class="course-boxes">
                  <div class="row">
                    <CourseDetail
                      title={"وضعیت دوره:"}
                      detail={`${courseInfo.isComplete ? "به اتمام رسیده" : "درحال برگزاری"}`}
                      icon={"fas fa-graduation-cap"}
                    />

                    <CourseDetail
                      title={"زمان برگزاری دوره:"}
                      detail={courseInfo.createdAt?.slice(0, 10)}
                      icon={"fas fa-clock"}
                    />

                    <CourseDetail
                      title={"آخرین بروز رسانی:"}
                      detail={courseInfo.updatedAt?.slice(0, 10)}
                      icon={"fas fa-calendar-alt"}
                    />

                    <CourseDetail
                      title={"روش پشتیبانی:"}
                      detail={"آنلاین"}
                      icon={"fas fa-user-alt"}
                    />

                    <CourseDetail
                      title={"پیش نیاز:"}
                      detail={"HTML CSS"}
                      icon={"fas fa-info-circle"}
                    />

                    <CourseDetail
                      title={"نوع مشاهده:"}
                      detail={"ضبط شده / آنلاین"}
                      icon={"fas fa-play"}
                    />

                  </div>
                </div>
                {/* <!-- Finish Course Boxes --> */}

                {/* <!-- Start Introduction --> */}

                <div class="introduction">
                  <p className='app-text'>{courseInfo.description}</p>
                  <img src={`http://localhost:4000/courses/covers/${courseInfo.cover}`} alt="cover" className='introduction-img'/>
                  <div class="course-long-description" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(courseInfo.longDescription) }}>
                  </div>

                  <div class="introduction__topic">

                    <Accordion className='accordion' defaultActiveKey="0" id='sessions'>
                      {sessions?.length > 0 ? (
                        <>
                        {courseInfo.season?.map((season,index)=>(
                          <Accordion.Item eventKey={`${index}`} className='accordion-item'>
                          <Accordion.Header>{season}</Accordion.Header>
                          {
                            sessions.map((session, i) => (
                              <Accordion.Body className='introduction__accordion-body'>
                                {
                                  (session.free || courseInfo.isUserRegisteredToThisCourse) ? (
                                    <>
                                      <div class="introduction__accordion-right">
                                        <span class="introduction__accordion-count">{i + 1}</span>
                                        <FaYoutube class="introduction__accordion-icon" />
                                        <Link to={`/session/${courseName}/${session._id}`} class="introduction__accordion-link">
                                          {session.title}
                                        </Link>
                                      </div>
                                      <div class="introduction__accordion-left">
                                        <span class="introduction__accordion-time">
                                          {session.time}
                                        </span>
                                      </div>
                                    </>
                                  ) : (
                                    <>
                                      <div class="introduction__accordion-right">
                                        <span class="introduction__accordion-count">{i + 1}</span>
                                        <FaYoutube class="introduction__accordion-icon" />
                                        <span class="introduction__accordion-link">
                                          {session.title}
                                        </span>
                                      </div>
                                      <div class="introduction__accordion-left">
                                        <span class="introduction__accordion-time">
                                          {session.time}
                                        </span>
                                        <FaLock className='introduction__accordion-icon-lock'/>
                                      </div>
                                    </>
                                  )
                                }

                              </Accordion.Body>
                            ))
                          }
                        </Accordion.Item>
                        ))}
                        </>
                      ) : (
                        <div className="alert alert-warning">هنوز جلسه ای برای این دوره وجود ندارد</div>
                      )}
                    </Accordion>
                  </div>

                </div>

                {/* <!-- Finish Introduction --> */}

                {/* <!-- Start Teacher Details --> */}

                <div class="techer-details">
                  <div class="techer-details__header">
                    <div class="techer-details__header-right">
                      <img src="/image/info/teacher.jfif" alt="Teacher Profile" class="techer-details__header-img" />
                      <div class="techer-details__header-titles">
                        <a href="#" class="techer-details__header-link">
                          {courseCreator.name}
                        </a>
                        <span class="techer-details__header-skill">
                          Front End & Back End Developer
                        </span>
                      </div>
                    </div>
                    <div class="techer-details__header-left">
                      <FaChalkboardUser class="techer-details__header-icon" />
                      <span class="techer-details__header-name">مدرس</span>
                    </div>
                  </div>
                  <p class="techer-details__footer app-text">
                    اول از همه برنامه نویسی اندروید رو شروع کردم و نزدیک به 2 سال با زبان جاوا اندروید کار میکردم .بعد تصمیم گرفتم در زمینه وب فعالیت داشته باشم.و..
                  </p>
                </div>

                {/* <!-- Finish Teacher Details --> */}


                <Comments comments={comments} />

                <CommentTextArea courseShortName={courseInfo.shortName} />

              </div>
            </div>
            <div class="col-lg-4">
              <div class="courses-info">
                <div class="course-info">
                  <div class="course-info__register">
                    {isUserRegistered ? (
                      <span class="course-info__register-title">
                        <FaGraduationCap class="course-info__register-icon"></FaGraduationCap>
                        دانشجوی دوره هستید
                      </span>
                    ) : (
                      <Link to={''} onClick={() => registerToCourse(courseInfo)}>
                        <span class="course-info__register-title">
                          ثبت نام کنید
                        </span>
                      </Link>
                    )}

                  </div>
                  <div class="course-info__total">
                    <div class="course-info__top">
                      <div class="course-info__total-sale">
                        <FaUserGraduate className='course-info__total-sale-icon' />
                        <span class="course-info__total-sale-text">
                          تعداد دانشجو :
                        </span>
                        <span class="course-info__total-sale-number">
                          {courseInfo.courseStudentsCount}
                        </span>
                      </div>
                    </div>
                    <div class="course-info__bottom">
                      <div class="course-info__total-comment">
                        <FaComments className=' course-info__total-comment-icon' />
                        <span class="course-info__total-comment-text">
                          {comments?.length} دیدگاه
                        </span>
                      </div>
                      <div class="course-info__total-view">
                        <FaEye class="far fa-eye course-info__total-view-icon" />
                        <span class="course-info__total-view-text">
                          14,234 بازدید
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="course-info">
                  <span class="course-info__topic-title">
                    سرفصل های دوره
                  </span>
                  <span class="course-info__topic-text">
                    برای مشاهده جلسات دوره روی کلمه
                    <a href="#sessions" style={{ color: "blue", fontWeight: "bold" }}>
                      {" لینک "}
                    </a>
                    کلیک کنید
                  </span>
                </div>
                {
                  relatedCourses.length !== 0 && (
                    <div class="course-info">
                      <span class="course-info__courses-title">دوره های مرتبط</span>
                      <ul class="course-info__courses-list">
                        {
                          relatedCourses?.map(relatedCourse => (
                            <li class="course-info__courses-list-item">
                              <Link to={`/course-info/${relatedCourse.shortName}`} class="course-info__courses-link">
                                <img src={`http://localhost:4000/courses/covers/${relatedCourse.cover}`} alt="Course Cover" class="course-info__courses-img" />
                                <span class="course-info__courses-text">
                                  {relatedCourse.name}
                                </span>
                              </Link>
                            </li>
                          ))
                        }
                      </ul>
                    </div>

                  )
                }

              </div>
            </div>
          </div>


        </main>
      </div>

      <Footer />

    </>
  )
}
