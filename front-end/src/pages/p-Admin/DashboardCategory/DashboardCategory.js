import React, { useEffect, useState } from 'react'
import './DashboardCategory.css'
import { BASE_URL } from '../../../Utils/Variables/ApiVariables'
import DataTable from '../../../components/AdminDashboard/DataTable/DataTable'
import Input from '../../../components/Form/Inpit/Input'
import { maximumValidator, minimumValidator, requiredValidator } from '../../../Utils/Validator/Rouls'
import useForm from '../../../hooks/useForm'
import swal from 'sweetalert'

export default function DashboardCategory() {

  const [categories, setCategories] = useState([])

  const [formState, onInputHandler] = useForm({
    title: {
      value: "",
      isValid: false,
    },
    shortName: {
      value: "",
      isValid: false,
    }
  }, false)

  useEffect(() => {
    getAllCategories()
  }, [])

  function getAllCategories() {
    fetch(`${BASE_URL}category`)
      .then(res =>res.ok ? res.json() : [])
      .then(result => setCategories(result))
  }

  function addNewCategory(event) {
    event.preventDefault()

    const newCategory = {
      name: formState.initInputs.shortName.value,
      title: formState.initInputs.title.value,
    }

    const localStorageData = JSON.parse(localStorage.getItem("user"))

    fetch(`${BASE_URL}category`, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${localStorageData.token}`
      },
      body: JSON.stringify(newCategory)
    }).then(res => {
      if (res.ok) {
        swal({
          title: "دسته بندی با موفقیت اضافه شد.",
          icon: "success",
          buttons: "تایید"
        })
        getAllCategories()
      } else {
        swal({
          title: "اضافه کردن دسته بندی با خطا مواجه شد.",
          icon: "error",
          buttons: "تایید"
        })
      }
    })
  }

  function removeCategory(categoryID) {
    swal({
      title: "آیا از حذف دسته بندی اطمینان دارید؟",
      icon: "warning",
      buttons: ["لغو", "تایید"]
    }).then(result => {
      if (result) {
        fetch(`${BASE_URL}category/${categoryID}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token}`
          }
        }).then(res => {
          if (res.ok) {
            swal({
              title: "دسته بندی با موفقیت حذف شد.",
              icon: "success",
              buttons: "تایید"
            })
            getAllCategories()
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

  function updateCategory(categoryID){
    swal({
      title: "لطفا نام جدید دسته بندی را بنویسید.",
      content : 'input',
      buttons: "تایید"
    }).then(result => {
      if (result?.trim()?.length) {
        fetch(`${BASE_URL}category/${categoryID}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token}`,
            "Content-Type" : "application/json"
          },
          body : JSON.stringify({name : result , title : result})
        }).then(res => {
          if (res.ok) {
            swal({
              title: "دسته بندی با موفقیت به روز شد.",
              icon: "success",
              buttons: "تایید"
            })
            getAllCategories()
          } else {
            swal({
              title: "به روز کردن دسته بندی با خطا مواجه شد.",
              icon: "error",
              buttons: "تایید"
            })
          }
          return res.json()
        })
      }
    })
  }

  return (
    <>
    <div className='admin-page-title app-title'>دسته بندی ها</div>
      <div className="home-content-edit">
        <div className="back-btn">
        <span>افزودن دسته جدید</span>
        </div>
        <form className="form" onSubmit={addNewCategory}>
          <div className="col-12 col-md-6">
            <div className="name input">
              <label className="input-title">عنوان دسته بندی</label>
              <Input
                type="text"
                className="input-item"
                id="title"
                element="input"
                validations={[
                  requiredValidator(),
                  minimumValidator(5),
                  maximumValidator(20),
                ]}
                onInputHandler={onInputHandler}
                placeholder="لطفا نام دسته بندی را وارد کنید..."
              />
              <span className="error-message text-danger"></span>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="family input">
              <label className="input-title">نام کوتاه</label>
              <Input
                type="text"
                className="input-item"
                id="shortName"
                element="input"
                validations={[
                  requiredValidator(),
                  minimumValidator(5),
                  maximumValidator(30),
                ]}
                onInputHandler={onInputHandler}
                placeholder="لطفا نام کوتاه دسته بندی را وارد کنید..."
              />
              <span className="error-message text-danger"></span>
            </div>
          </div>
          <div className="col-12">
            <div className="bottom-form">
              <div className="submit-btn">
                <input type="submit" value="افزودن" />
              </div>
            </div>
          </div>
        </form>
      </div>
      <DataTable title={"دسته بندی ها"}>
        <table className="table">
          <thead>
            <tr>
              <th>شناسه</th>
              <th>عنوان</th>
              <th>ویرایش</th>
              <th>حذف</th>
            </tr>
          </thead>
          <tbody>
            {
              categories.map((category, index) => (
                <tr key={category._id}>
                  <td>{index + 1}</td>
                  <td>{category.title}</td>
                  <td>
                    <button type="button" className="btn btn-primary edit-btn" onClick={()=>updateCategory(category._id)}>
                      ویرایش
                    </button>
                  </td>
                  <td>
                    <button type="button" className="btn btn-danger delete-btn"
                      onClick={() => removeCategory(category._id)}>
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
