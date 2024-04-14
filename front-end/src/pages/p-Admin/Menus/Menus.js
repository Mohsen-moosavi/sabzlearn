import React, { useEffect, useState } from 'react'
import './Menus.css'
import DataTable from '../../../components/AdminDashboard/DataTable/DataTable'
import { BASE_URL } from '../../../Utils/Variables/ApiVariables'
import swal from 'sweetalert'
import Input from '../../../components/Form/Inpit/Input'
import { minimumValidator } from '../../../Utils/Validator/Rouls'
import useForm from '../../../hooks/useForm'
import { FaCheck, FaSave } from 'react-icons/fa'

export default function Menus() {

  const [allMenus, setAllMenus] = useState([])
  const [menuParent, setMenuParent] = useState(-1)
  const [formState, onInputHandler] = useForm({
    title: {
      value: '',
      isValid: false
    },
    href: {
      value: '',
      isValid: false
    }
  }, false)

  useEffect(() => {
    getAllMenus()
  }, [])


  function getAllMenus() {
    fetch(`${BASE_URL}menus/all`)
      .then(res =>res.ok? res.json() : [])
      .then(result => setAllMenus(result))
  }

  function removeMenu(menuID) {
    swal({
      title: "آیا از حذف منو اطمینان دارید؟",
      icon: "warning",
      buttons: ["لغو", "تایید"]
    }).then(result => {
      if (result) {
        fetch(`${BASE_URL}menus/${menuID}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token}`
          }
        }).then(res => {
          if (res.ok) {
            swal({
              title: "منو با موفقیت حذف شد.",
              icon: "success",
              buttons: "تایید"
            })
            getAllMenus()
          } else {
            swal({
              title: "حذف کردن منو با خطا مواجه شد.",
              icon: "error",
              buttons: "تایید"
            })
          }
        })
      }
    })
  }

  function addNewMenu(event) {
    event.preventDefault()

    const newMenu = {
      title: formState.initInputs.title.value,
      href: formState.initInputs.href.value,
      parent: menuParent == -1 ? undefined : menuParent
    }

    fetch(`${BASE_URL}menus`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token}`,
        'Content-Type': "application/json"
      },
      body: JSON.stringify(newMenu)
    }).then(res => {
      if (res.ok) {
        swal({
          title: "منو با موفقیت اضافه شد.",
          icon: "success",
          buttons: "تایید"
        })
        getAllMenus()
      } else {
        swal({
          title: "اضافه کردن منو با خطا مواجه شد.",
          icon: "error",
          buttons: "تایید"
        })
      } return res.json()
    })
  }

  return (
    <>
      <div className='admin-page-title app-title'>منو ها</div>
      <div className="home-content-edit">
        <div class="home-title">
          <span>افزودن منو جدید</span>
        </div>
        <form class="form" onSubmit={addNewMenu}>
          <div class="col-12 col-md-6">
            <div class="name input">
              <label class="input-title">عنوان</label>
              <Input
                element="input"
                className={'input-item'}
                onInputHandler={onInputHandler}
                id="title"
                type="text"
                isValid="false"
                placeholder="لطفا عنوان را وارد کنید..."
                validations={[minimumValidator(5)]}
              />
              <span class="error-message text-danger"></span>
            </div>
          </div>
          <div class="col-12 col-md-6">
            <div class="name input">
              <label class="input-title">url دروه</label>
              <Input
                element="input"
                onInputHandler={onInputHandler}
                className={'input-item'}
                id="href"
                type="text"
                isValid="false"
                validations={[minimumValidator(3)]}
                placeholder="لطفا url را وارد کنید..."
              />
              <span class="error-message text-danger"></span>
            </div>
          </div>
          <div class="col-12 col-md-6">
            <div class="name input">
              <label class="input-title">دسته بندی</label>
              <select
                class="select"
                onChange={(event) => setMenuParent(event.target.value)}
              >
                <option value="-1">ایجاد دسته بندی جدید</option>
                {allMenus.map((menu) => (
                  <>
                    {!Boolean(menu.parent) && (
                      <option value={menu._id}>{menu.title}</option>
                    )}
                  </>
                ))}
              </select>
              <span class="error-message text-danger"></span>
            </div>
          </div>
          <div class="col-12">
            <div class="bottom-form">
              <div class="submit-btn">
                <button type="submit" value="افزودن" disabled={!formState.isValidForm}
                  className={`p-2 rounded-3 ${(formState.isValidForm) ? 'login-form__btn-success' : 'login-form__btn-error'} `} >
                  <FaSave className="login-form__btn-icon"></FaSave>
                  <span className="login-form__btn-text">افزودن</span>
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>

      <DataTable title={"منو ها"}>
        <table className="table">
          <thead>
            <tr>
              <th>شناسه</th>
              <th>عنوان</th>
              <th>مقصد</th>
              <th>فرزند ...</th>
              <th>حذف</th>
            </tr>
          </thead>
          <tbody>
            {
              allMenus.map((menu, index) => (
                <tr key={menu._id}>
                  <td>{index + 1}</td>
                  <td>{menu.title}</td>
                  <td>{menu.href}</td>
                  <td>{menu.parent ? menu.parent.title : <FaCheck></FaCheck>}</td>
                  <td>
                    <button type="button" className="btn btn-danger delete-btn"
                      onClick={() => removeMenu(menu._id)}>
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
