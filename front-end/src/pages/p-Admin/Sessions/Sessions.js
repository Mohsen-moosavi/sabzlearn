import React, { useEffect, useState } from 'react'
import './Sessions.css'
import Input from '../../../components/Form/Inpit/Input'
import { maximumValidator, minimumValidator, requiredValidator } from '../../../Utils/Validator/Rouls'
import useForm from '../../../hooks/useForm'
import { BASE_URL } from '../../../Utils/Variables/ApiVariables'
import swal from 'sweetalert'
import DataTable from './../../../components/AdminDashboard/DataTable/DataTable'
import { FaSave } from 'react-icons/fa'

export default function Sessions() {


  const [allSessions, setAllSessions] = useState([])
  const [allCourses, setAllCourses] = useState([])
  const [selectCourse, setSelectCourse] = useState(-1)
  const [selectSeason, setSelectSeason] = useState(-1)
  const [isSessionsFree, setIsSessionsFree] = useState('')
  const [sessionVideo, setSessionVideo] = useState('')
  const [courseSeason, setCourseSeason] = useState([])
  const [selectedshownSessionOfCourse, setSelectedShownSessionOfCourse] = useState([])
  const [shownSessionOfCourse, setShownSessionOfCourse] = useState('')

  const [formState, onInputHandler] = useForm({
    title: {
      value: "",
      isValid: false
    },
    time: {
      value: '',
      isValid: false
    },
    season: {
      value: '',
      isValid: true
    }
  }, false)

  useEffect(() => {
    getAllSessions()
    getAllCourses()
  }, [])

  useEffect(() => {
    if (selectCourse !== -1) {
      setCourseSeason(allCourses.find(item => item._id === selectCourse).season)
    } else {
      setCourseSeason([])
    }
  }, [selectCourse])

  useEffect(() => {
    setShownSessionOfCourse(allSessions.filter(session => session.course._id === selectedshownSessionOfCourse))

  }, [selectedshownSessionOfCourse])

  function getAllSessions() {
    fetch(`${BASE_URL}courses/sessions`)
      .then(res => res.ok ? res.json() : [])
      .then(result => setAllSessions(result))
  }

  function getAllCourses() {
    fetch(`${BASE_URL}courses`)
      .then(res => res.ok ? res.json() : [])
      .then(result => {
        setAllCourses(result)
        setSelectedShownSessionOfCourse(result[0]?._id)
      })
  }

  function createNewSession(event) {
    event.preventDefault()

    if (selectSeason == -2 && formState.initInputs.season.value == '') {
      return swal({
        title: "لطفا نام فصل جدید را وارد کنید",
        icon: "error",
        buttons: "تایید"
      })
    }

    const formData = new FormData()
    formData.append("video", sessionVideo)
    formData.append("title", formState.initInputs.title.value)
    formData.append("time", formState.initInputs.time.value)
    formData.append("free", isSessionsFree)

    if (selectSeason == -2) {
      formData.append("season", formState.initInputs.season.value)
    } else {
      formData.append("season", selectSeason)
    }

    fetch(`${BASE_URL}courses/${selectCourse}/sessions`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token}`
      },
      body: formData
    })
      .then(res => {
        if (res.ok) {
          swal({
            title: "جلسه با موفقیت اضافه شد.",
            icon: "success",
            buttons: "تایید"
          }).then(() => {
            getAllSessions()
            // setSelectCourse(-1)
            // setSelectSeason(-1)
            setIsSessionsFree('')
            if(formState.initInputs.season.value){
              setCourseSeason(preValue=>[...preValue , formState.initInputs.season.value])
            }
            // setCourseSeason(prev=>console.log(prev))
            // setSessionVideo('')
            // setCourseSeason('')
          })
        } else {
          swal({
            title: "اضافه کردن جلسه با خطا مواجه شد.",
            icon: "error",
            buttons: "تایید"
          })
        }
        return res.json()
      })
  }

  function removeSession(sessionID) {
    swal({
      title: "آیا از حذف جلسه اطمینان دارید؟",
      icon: "warning",
      buttons: ["لغو", "تایید"]
    }).then(result => {
      if (result) {
        fetch(`${BASE_URL}courses/sessions/${sessionID}`, {
          method: 'DELETE',
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token}`
          }
        }).then(res => {
          if (res.ok) {
            swal({
              title: "جلسه با موفقیت حذف شد.",
              icon: "success",
              buttons: "تایید"
            })
            getAllSessions()
          } else {
            swal({
              title: "حذف کردن جلسه با خطا مواجه شد.",
              icon: "error",
              buttons: "تایید"
            })
          }
        })
      }
    })
  }

  return (
    <>
      <div className='admin-page-title app-title'>جلسات</div>
      <div className="home-content-edit">
        <div className="home-title">
          <span>افزودن جلسه جدید</span>
        </div>
        <form className="form" onSubmit={createNewSession}>
          <div className="col-12 col-md-6">
            <div className="name input">
              <label className="input-title">عنوان جلسه</label>
              <Input
                id='title'
                element='input'
                className="input-item"
                type="text"
                validations={[
                  requiredValidator(),
                  minimumValidator(3),
                  maximumValidator(50)
                ]}
                onInputHandler={onInputHandler}
                isValid="false"
                placeholder="لطفا موضوع جلسه را وارد کنید..."
              />
              <span className="error-message text-danger"></span>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="price input">
              <label className="input-title">مدت جلسه</label>
              <Input
                id='time'
                element='input'
                className="input-item"
                type="number"
                validations={[
                  requiredValidator(),
                ]}
                onInputHandler={onInputHandler}
                isValid="false"
                placeholder="لطفا مدت زمان جلسه را وارد کنید"
              />
              <span className="error-message text-danger"></span>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="price input">
              <label className="input-title">ویدئو</label>
              <input type="file" className='input-item'
                onChange={event => setSessionVideo(event.target.files[0])} />
              <span className="error-message text-danger"></span>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="number input">
              <label className="input-title">انتخاب دوره</label>
              <br />
              <select className='p-admi-selection' onChange={event => setSelectCourse(event.target.value)}>
                <option value="-1" selected={true}>دوره را انتخاب کنید</option>
                {allCourses.map((course) => (
                  <option value={course._id}>{course.name}</option>
                ))}
              </select>
              <span className="error-message text-danger"></span>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="number input">
              <label className="input-title">انتخاب فصل</label>
              <br />
              <select className='p-admi-selection' onChange={event => setSelectSeason(event.target.value)}>
                <option value="-1">فصل را انتخاب کنید</option>
                {courseSeason && courseSeason.map((season) => (
                  <option value={season}>{season}</option>
                ))}
                <option value={-2}>فصل جدید</option>
              </select>
              <span className="error-message text-danger"></span>
            </div>
          </div>
          {selectSeason == -2 && (
            <div className="col-12 col-md-6">
              <div className="price input">
                <label className="input-title">نام فصل جدید</label>
                <Input
                  id='season'
                  element='input'
                  className="input-item"
                  type="string"
                  validations={[
                  ]}
                  onInputHandler={onInputHandler}
                  isValid="false"
                  placeholder="لطفا نام فصل جدید را وارد کنید"
                />
                <span className="error-message text-danger"></span>
              </div>
            </div>
          )}
          <div className="col-12">
            <div className="name input">
              <label className='input-title'>وضعیت دوره</label>
              <br />
              <span>رایگان</span>
              <input
                type="radio"
                name='condition'
                value={1}
                onInput={event => setIsSessionsFree(event.target.value)}
              />
              <span>غیر رایگان</span>
              <input
                type="radio"
                name='condition'
                value={0}
                onInput={event => setIsSessionsFree(event.target.value)}
              />
              <span className="error-message text-danger"></span>
            </div>
          </div>
          <div className="col-12">
            <div className="number input d-flex h-100 align-items-center justify-content-end">
              <button
                className={`p-2 rounded-3 ${(formState.isValidForm && selectCourse != -1 && isSessionsFree != '' && sessionVideo != '' && selectSeason != -1) ? 'login-form__btn-success' : 'login-form__btn-error'} `} type="submit"
                disabled={(!formState.isValidForm || selectCourse == -1 || isSessionsFree == '' || sessionVideo == '' || selectSeason == -1)}
              >
                <FaSave className="login-form__btn-icon"></FaSave>
                <span className="login-form__btn-text">افزودن جلسه جدید</span>
              </button>
            </div>
          </div>
        </form>
      </div>

      <section className='season-section'>
        <div className="row">
          <div className="col-12 col-md-6">
            <div className="input">
              <label className="season-selection-title">انتخاب دوره</label>
              <br />
              <select className='p-admi-selection' onChange={event => setSelectedShownSessionOfCourse(event.target.value)}>
                {allCourses.map((course, index) => (
                  <option value={course._id} selected={index === 0}>{course.name}</option>
                ))}
              </select>
              <span className="error-message text-danger"></span>
            </div>
          </div>
        </div>
      </section>
      {allCourses.find(course => course._id === selectedshownSessionOfCourse)?.season?.map((season) => (
        <>
          <DataTable title={`جلسات فصل ${season}`}>
            <table className="table">
              <thead>
                <tr>
                  <th>شناسه</th>
                  <th>عنوان</th>
                  <th>مدت</th>
                  <th>دوره</th>
                  <th>حذف</th>
                </tr>
              </thead>
              <tbody>
                {shownSessionOfCourse.filter(session => session.season === season).map((session, index) => (
                  <tr key={session._id}>
                    <td>{index + 1}</td>
                    <td>{session.title}</td>
                    <td>{session.time}</td>
                    <td>{session.course?.name}</td>
                    <td>
                      <button type="button" className="btn btn-danger delete-btn"
                        onClick={() => removeSession(session._id)}>
                        حذف
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </DataTable>
        </>
      ))}
    </>
  )
}
