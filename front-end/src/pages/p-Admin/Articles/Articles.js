import React, { useEffect, useState } from 'react'
import DataTable from '../../../components/AdminDashboard/DataTable/DataTable'
import { BASE_URL } from '../../../Utils/Variables/ApiVariables'
import swal from 'sweetalert'
import Input from '../../../components/Form/Inpit/Input'
import { maximumValidator, minimumValidator, requiredValidator } from '../../../Utils/Validator/Rouls'
import useForm from '../../../hooks/useForm'
import CkEditor from '../../../components/CKeditor/CkEditor'
import { Link, useParams } from 'react-router-dom'
import { RiDraftFill } from 'react-icons/ri'
import { FaSave } from 'react-icons/fa'

export default function Articles() {

  const [allArticles, setAllArticles] = useState([])
  const [categories, setCategories] = useState([])
  const [newArticleImage, setNewArticleImage] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(-1)
  const [articleBody, setArticleBody] = useState("")

  const [formState, onInputHandler] = useForm({
    title: {
      value: '',
      isValid: false
    },
    shortName: {
      value: '',
      isValid: false
    },
    description: {
      value: '',
      isValid: false
    },

  }, false)

  useEffect(() => {
    getAllArticles()
    getAllCategories()
  }, [])

  function getAllArticles() {
    fetch(`${BASE_URL}articles`)
      .then(res =>res.ok ? res.json() : [])
      .then(result => setAllArticles(result))
  }

  function getAllCategories() {
    fetch(`${BASE_URL}category`)
      .then(res =>res.ok ? res.json() : [])
      .then(result => setCategories(result))
  }

  function selectCategory(event) {
    setSelectedCategory(event.target.value)
  }

  function removeArticle(articleID) {
    swal({
      title: "آیا از حذف مقاله اطمینان دارید؟",
      icon: "warning",
      buttons: ["لغو", "تایید"]
    }).then(result => {
      if (result) {
        fetch(`${BASE_URL}articles/${articleID}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token}`
          }
        }).then(res => {
          if (res.ok) {
            swal({
              title: "مقاله با موفقیت حذف شد.",
              icon: "success",
              buttons: "تایید"
            })
            getAllArticles()
          } else {
            swal({
              title: "حذف کردن مقاله با خطا مواجه شد.",
              icon: "error",
              buttons: "تایید"
            })
          }
        })
      }
    })
  }

  function addNewArticle(event) {
    event.preventDefault()

    const formData = new FormData()
    formData.append("title", formState.initInputs.title.value)
    formData.append("shortName", formState.initInputs.shortName.value)
    formData.append("description", formState.initInputs.description.value)
    formData.append("categoryID", selectedCategory)
    formData.append("cover", newArticleImage)
    formData.append("body", articleBody)

    fetch(`${BASE_URL}articles`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token}`
      },
      body: formData
    }).then(res => {
      if (res.ok) {
        swal({
          title: "مقاله با موفقیت اضافه شد.",
          icon: "success",
          buttons: "تایید"
        })
        getAllArticles()
      } else {
        swal({
          title: "اضافه مقاله دوره با خطا مواجه شد.",
          icon: "error",
          buttons: "تایید"
        })
      }
      return res.json()
    })
  }

  function saveAsDraft(event) {
    event.preventDefault()

    const formData = new FormData()
    formData.append("title", formState.initInputs.title.value)
    formData.append("shortName", formState.initInputs.shortName.value)
    formData.append("description", formState.initInputs.description.value)
    formData.append("categoryID", selectedCategory)
    formData.append("cover", newArticleImage)
    formData.append("body", articleBody)

    fetch(`${BASE_URL}articles/draft`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token}`
      },
      body: formData
    }).then(res => {
      if (res.ok) {
        swal({
          title: "مقاله با موفقیت اضافه شد.",
          icon: "success",
          buttons: "تایید"
        })
        getAllArticles()
      } else {
        swal({
          title: "اضافه کردن مقاله با خطا مواجه شد.",
          icon: "error",
          buttons: "تایید"
        })
      }
      return res.json()
    })
  }


  return (
    <>
    <div className='admin-page-title app-title'>مقاله ها</div>
      <div className="home-content-edit">
          <div className="home-title">
            <span>افزودن مقاله جدید</span>
          </div>
          <form className="form" onSubmit={addNewArticle}>
            <div className="col-12 col-md-6">
              <div className="name input">
                <label className="input-title">عنوان</label>
                <Input
                  id='title'
                  element='input'
                  className="input-item"
                  type="text"
                  validations={[
                    requiredValidator(),
                    minimumValidator(3),
                  ]}
                  onInputHandler={onInputHandler}
                  isValid="false"
                  placeholder="لطفا نام مقاله را وارد کنید..."
                />
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="price input">
                <label className="input-title">لینک</label>
                <Input
                  id='shortName'
                  element='input'
                  className="input-item"
                  type="text"
                  validations={[
                    requiredValidator(),
                    minimumValidator(3),
                    maximumValidator(30)
                  ]}
                  onInputHandler={onInputHandler}
                  isValid="false"
                  placeholder="لطفا لینک مقاله را وارد کنید..."
                />
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-12">
              <div className="number input">
                <label className="input-title">چکیده</label>
                <Input
                  id='description'
                  element='textarea'
                  className={`input-item description-height ${formState.initInputs.description.isValid ? "success" : "error"}`}
                  type="text"
                  validations={[
                    requiredValidator(),
                    minimumValidator(3)
                  ]}
                  onInputHandler={onInputHandler}
                  isValid="false"
                  placeholder="لطفا یک چکیده از مقاله را در اینجا بنویسید..."
                />
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-12">
              <div className="number input">
                <label className="input-title">محتوا</label>
                <CkEditor value={articleBody} setValue={setArticleBody} />
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="number input">
                <label className="input-title">دسته‌بندی مقاله</label>
                <br />
                <select onChange={selectCategory}>
                  <option value="-1">دسته بندی را انتخاب کنید</option>
                  {categories.map((category) => (
                    <option value={category._id}>{category.title}</option>
                  ))}
                </select>
                <span className="error-message text-danger"></span>
              </div>
            </div>
            <div className="col-12 col-md-6">
              <div className="file number input mt-5">
                <label className="input-title">عکس محصول</label>
                <input type="file" id="file" onChange={event => {
                  setNewArticleImage(event.target.files[0])
                }} />
              </div>
            </div>
            <div className="col-12">
              <div className="number input d-flex h-100 align-items-center justify-content-end flex-wrap">
                <button
                  className={`p-2 m-2 rounded-3 ${(formState.isValidForm && selectedCategory != -1 && newArticleImage != "" && articleBody != '') ? 'login-form__btn-success' : 'login-form__btn-error'} `} type="submit"
                  disabled={(!formState.isValidForm || selectedCategory == -1 || newArticleImage == "" || articleBody == '')} onClick={saveAsDraft}
                >
                  <RiDraftFill className="login-form__btn-icon"></RiDraftFill>
                  <span className="login-form__btn-text">پیش نویس</span>
                </button>
                <button
                  className={`p-2 rounded-3 ${(formState.isValidForm && selectedCategory != -1 && newArticleImage != "" && articleBody != '') ? 'login-form__btn-success' : 'login-form__btn-error'} `} type="submit"
                  disabled={(!formState.isValidForm || selectedCategory == -1 || newArticleImage == "" || articleBody == '')}
                >
                  <FaSave className="login-form__btn-icon"></FaSave>
                  <span className="login-form__btn-text">افزودن</span>
                </button>
              </div>
            </div>
          </form>
      </div>

      <DataTable title={"مقاله ها"}>
        <table className="table">
          <thead>
            <tr>
              <th>شناسه</th>
              <th>عنوان</th>
              <th>لینک</th>
              <th>نویسنده</th>
              <th>وضعیت</th>
              <th>مشاهده و ویرایش</th>
              <th>حذف</th>
            </tr>
          </thead>
          <tbody>
            {
              allArticles.map((article, index) => (
                <tr key={article._id}>
                  <td>{index + 1}</td>
                  <td>{article.title}</td>
                  <td>{article.shortName}</td>
                  <td>{article.creator?.name}</td>
                  <td>{article.publish === 1 ? 'منتشر شده' : 'پیش نویس'}</td>
                  <td>
                    <button type="button" className="btn btn-primary edit-btn">
                    <Link to={`draft/${article.shortName}`}>
                      ویرایش
                    </Link>
                  </button>
                  </td>
                  <td>
                    <button type="button" className="btn btn-danger delete-btn" onClick={() => removeArticle(article._id)}>
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
