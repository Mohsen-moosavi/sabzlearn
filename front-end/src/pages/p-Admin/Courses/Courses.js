import React, { useEffect, useState } from 'react'
import './Courses.css'
import DataTable from '../../../components/AdminDashboard/DataTable/DataTable'
import { BASE_URL } from '../../../Utils/Variables/ApiVariables'
import swal from 'sweetalert'
import Input from '../../../components/Form/Inpit/Input'
import { maximumValidator, minimumValidator, requiredValidator } from '../../../Utils/Validator/Rouls'
import useForm from '../../../hooks/useForm'
import { useNavigate } from 'react-router-dom'
import CkEditor from '../../../components/CKeditor/CkEditor'
import { FaSave } from 'react-icons/fa'

export default function Courses() {

  const [allCourses, setAllCourses] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(-1)
  const [categories, setCategories] = useState([])
  const [newCourseImage, setNewCourseImage] = useState('')
  const [newCourseStatus, setNewCourseStatus] = useState('')
  const [longDescription, setLongDescription] = useState('')
  const [formState, onInputHandler] = useForm({
    title: {
      value: '',
      isValid: false
    },
    descript: {
      value: '',
      isValid: false
    },
    shortName: {
      value: '',
      isValid: false
    },
    price: {
      value: '',
      isValid: false
    },
    support: {
      value: '',
      isValid: false
    }
  }, false)

  useEffect(() => {
    getAllCourses()
    getAllCategories()
  }, [])

  function getAllCourses() {
    const localStorageData = JSON.parse(localStorage.getItem("user"))

    fetch(`${BASE_URL}courses`, {
      headers: {
        Authorization: `Bearer ${localStorageData.token}`
      }
    })
      .then(res =>res.ok ? res.json() : [])
      .then(result => setAllCourses(result))
  }

  function getAllCategories() {
    fetch(`${BASE_URL}category`)
      .then(res =>res.ok ? res.json() : [])
      .then(result => setCategories(result))
  }

  function removeCourse(courseID) {
    swal({
      title: "آیا از حذف دوره اطمینان دارید؟",
      icon: "warning",
      buttons: ["لغو", "تایید"]
    }).then(result => {
      if (result) {
        fetch(`${BASE_URL}courses/${courseID}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token}`
          }
        }).then(res => {
          if (res.ok) {
            swal({
              title: "دوره با موفقیت حذف شد.",
              icon: "success",
              buttons: "تایید"
            })
            getAllCourses()
          } else {
            swal({
              title: "حذف کردن دسته بندی با خطا مواجه شد.",
              icon: "error",
              buttons: "تایید"
            })
          }
        })
      }
    })
  }

  function selectCategory(event) {
    setSelectedCategory(event.target.value)
  }

  function addNewCourse(event) {
    event.preventDefault()

    const formData = new FormData()
    formData.append("name", formState.initInputs.title.value)
    formData.append("description", formState.initInputs.descript.value)
    formData.append("longDescription", longDescription)
    formData.append("cover", newCourseImage)
    formData.append("shortName", formState.initInputs.shortName.value)
    formData.append("price", formState.initInputs.price.value)
    formData.append("status", newCourseStatus)
    formData.append("categoryID", selectedCategory)

    fetch(`${BASE_URL}courses`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token}`
      },
      body: formData
    }).then(res => {
      if (res.ok) {
        swal({
          title: "دوره با موفقیت اضافه شد.",
          icon: "success",
          buttons: "تایید"
        })
        getAllCourses()
        // setLongDescription('')
        // setSelectedCategory('')
        // setNewCourseImage('')
        // setNewCourseStatus('')
        
      } else {
        swal({
          title: "اضافه کردن دوره با خطا مواجه شد.",
          icon: "error",
          buttons: "تایید"
        })
      }
      return res.json()
    })

  }

  return (
    <>
      <div className='admin-page-title app-title'>دوره ها</div>
      <div className="home-content-edit">
        <div className="home-title">
          <span>افزودن محصول جدید</span>
        </div>
        <form className="form" onSubmit={addNewCourse}>
          <div className="col-12 col-md-6">
            <div className="name input">
              <label className="input-title">نام دوره</label>
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
                placeholder="لطفا نام محصول را وارد کنید..."
              />
              <span className="error-message text-danger"></span>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="number input">
              <label className="input-title">url دوره</label>
              <Input
                id='shortName'
                element='input'
                className="input-item"
                type="text"
                validations={[
                  requiredValidator(),
                  minimumValidator(3),
                  maximumValidator(20)
                ]}
                onInputHandler={onInputHandler}
                isValid="false"
                placeholder="لطفا url دوره را وارد کنید..."
              />
              <span className="error-message text-danger"></span>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="price input">
              <label className="input-title">قیمت دوره</label>
              <Input
                id='price'
                element='input'
                className="input-item"
                type="text"
                validations={[
                  requiredValidator()
                ]}
                onInputHandler={onInputHandler}
                isValid="false"
                placeholder="لطفا قیمت محصول را وارد کنید..."
              />
              <span className="error-message text-danger"></span>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="number input">
              <label className="input-title">نحوه پشتیبانی</label>
              <Input
                id='support'
                element='input'
                className="input-item"
                type="text"
                validations={[
                  requiredValidator(),
                  minimumValidator(3),
                  maximumValidator(18)
                ]}
                onInputHandler={onInputHandler}
                isValid="false"
                placeholder="لطفا نحوه پشتیبانی دوره را وارد کنید..."
              />
              <span className="error-message text-danger"></span>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="number input">
              <label className="input-title">دسته‌بندی دوره</label>
              <br />
              <select onChange={selectCategory} className='p-admi-selection'>
                <option value="-1">دسته بندی را انتخاب کنید</option>
                {categories.map((category) => (
                  <option value={category._id}>{category.title}</option>
                ))}
              </select>
              <span className="error-message text-danger"></span>
            </div>
          </div>
          <div className="col-12">
            <div className="price input">
              <label className="input-title">توضیحات کوتاه دوره</label>
              <Input
                id='descript'
                element='textarea'
                className="input-item"
                type="text"
                validations={[
                  requiredValidator(),
                  minimumValidator(3),
                ]}
                onInputHandler={onInputHandler}
                isValid="false"
                placeholder="لطفا توضیحات دوره را وارد کنید..."
              />
              <span className="error-message text-danger"></span>
            </div>
          </div>
          <div className="col-12">
            <div className="number input">
              <label className="input-title">توضیحات کامل دوره</label>
              <CkEditor value={longDescription} setValue={setLongDescription} />
              <span className="error-message text-danger"></span>
            </div>
          </div>
          <div className="col-12">
            <div className="file number input">
              <label className="input-title">عکس دوره</label>
              <input type="file" id="file" onChange={event => {
                setNewCourseImage(event.target.files[0])
              }} />
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="bottom-form">
              <div className="condition text-end ">
                <label className="input-title fw-bold">وضعیت دوره</label>
                <div className="radios d-flex gap-3">
                  <div className="presell-true">
                    <label>
                      <span>پیش فروش</span>
                      <input
                        type="radio"
                        value="presell"
                        name="presell"
                        onInput={(event) => {
                          setNewCourseStatus(event.target.value)
                        }}
                      />
                    </label>
                  </div>
                  <div className="presell-false">
                    <label>
                      <span>در حال برگزاری</span>
                      <input type="radio" value="start" name="presell"

                        onInput={(event) => {
                          setNewCourseStatus(event.target.value)
                        }} />
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="number input d-flex h-100 align-items-center justify-content-end">
              <button
                className={`p-2 rounded-3 ${(formState.isValidForm && selectedCategory != -1 && newCourseImage != "" && newCourseStatus) ? 'login-form__btn-success' : 'login-form__btn-error'} `} type="submit"
                disabled={(!formState.isValidForm || selectedCategory == -1 || newCourseImage == "" || !newCourseStatus)}
              >
                <FaSave className="login-form__btn-icon"></FaSave>
                <span className="login-form__btn-text">افزودن دوره جدید</span>
              </button>
            </div>
          </div>
        </form>
      </div>

      <DataTable title={"دوره ها"}>
        <table className="table">
          <thead>
            <tr>
              <th>شناسه</th>
              <th>عنوان</th>
              <th>مبلغ</th>
              <th>وضعیت</th>
              <th>مدرس</th>
              <th>url</th>
              <th>دسته بندی</th>
              <th>حذف</th>
            </tr>
          </thead>
          <tbody>
            {
              allCourses.map((course, index) => (
                <tr key={course._id}>
                  <td>{index + 1}</td>
                  <td>{course.name}</td>
                  <td>{course.price === 0 ? 'رایگان' : course.price}</td>
                  <td>{course.isComplete === 0 ? 'در حال برگزاری' : 'به اتمام رسیده'}</td>
                  <td>{course.creator}</td>
                  <td>{course.shortName}</td>
                  <td>{course.categoryID ? course.categoryID.title : ''}</td>
                  <td>
                    <button type="button" className="btn btn-danger delete-btn"
                      onClick={() => removeCourse(course._id)}>
                      حذف
                    </button>
                  </td>
                </tr>
              ))
            }
          </tbody>
        </table>
      </DataTable>
    </>
  )
}
