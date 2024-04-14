import React, { useEffect, useState } from 'react'
import './Users.css'
import DataTable from '../../../components/AdminDashboard/DataTable/DataTable'
import { BASE_URL } from '../../../Utils/Variables/ApiVariables'
import swal from 'sweetalert'
import Input from '../../../components/Form/Inpit/Input'
import { emailValidator, maximumValidator, minimumValidator, requiredValidator } from '../../../Utils/Validator/Rouls'
import useForm from '../../../hooks/useForm'

export default function Users() {

  const [users, setUsers] = useState([])

  const [formState, onInputHandler] = useForm(
    {
      name: {
        value: "",
        isValid: false,
      },
      username: {
        value: "",
        isValid: false,
      },
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      },
      phone: {
        value: "",
        isValid: false,
      },
    },
    false)

  useEffect(() => {
    getAllUsers()
  }, [])

  function getAllUsers() {
    const localStorageData = JSON.parse(localStorage.getItem("user"))

    fetch(`${BASE_URL}users`, {
      headers: {
        Authorization: `Bearer ${localStorageData.token}`
      }
    }).then(res =>res.ok ? res.json() : [])
      .then(result => setUsers(result))
  }

  function removeUser(userID) {
    swal({
      title: "آیا از حذف مطمئن هستید؟",
      icon: "warning",
      buttons: ["خیر", "بله"]
    }).then((result) => {
      if (result) {
        const localStorageData = JSON.parse(localStorage.getItem("user"))

        fetch(`${BASE_URL}users/${userID}`, {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${localStorageData.token}`
          }
        }).then(res => {
          if (res.ok) {
            swal({
              title: "کاربر با موفقیت حذف شد.",
              icon: "success",
              buttons: "تایید"
            }).then(() => {
              getAllUsers()
            })
          } else {
            swal({
              title: "حذف کاربر با خطا مواجه شد.",
              icon: "error",
              buttons: "تایید"
            })
          }
        })
      }
    })
  }

  function banUser(userID) {
    swal({
      title: "آیا از بن مطمئن هستید؟",
      icon: "warning",
      buttons: ["خیر", "بله"]
    }).then((result) => {
      if (result) {
        const localStorageData = JSON.parse(localStorage.getItem("user"))

        fetch(`${BASE_URL}users/ban/${userID}`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${localStorageData.token}`
          }
        }).then(res => {
          if (res.ok) {
            swal({
              title: "کاربر با موفقیت بن شد.",
              icon: "success",
              buttons: "تایید"
            })
          } else {
            swal({
              title: "بن کردن کاربر با خطا مواجه شد.",
              icon: "error",
              buttons: "تایید"
            })
          }
        })
      }
    })
  }

  function addNewUser(event) {
    event.preventDefault()

    const newUser = {
      name: formState.initInputs.name.value,
      username: formState.initInputs.username.value,
      email: formState.initInputs.email.value,
      phone: formState.initInputs.phone.value,
      password: formState.initInputs.password.value,
      confirmPassword: formState.initInputs.password.value,
    }

    fetch(`${BASE_URL}auth/register`, {
      method: 'POST',
      headers: {
        'Content-Type': "application/json"
      },
      body: JSON.stringify(newUser)
    }).then(res => {
      if (res.ok) {
        swal({
          title: "کاربر با موفقیت اضافه شد.",
          icon: "success",
          buttons: "تایید"
        })
        getAllUsers()
      } else {
        swal({
          title: "اضافه کردن کاربر با خطا مواجه شد.",
          icon: "error",
          buttons: "تایید"
        })
      }
    })
  }

  const changeRole = (userID) => {

    swal({
      title: "لطفا نقش جدید را وارد نمایید:",
      content: 'input'
    }).then(value => {
      if (value && value.length && (value == "ADMIN" || value == 'USER')) {
        const reqBodyInfos = {
          role: value,
          id: userID
        }

        fetch(`${BASE_URL}users/role`, {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify(reqBodyInfos)
        }).then(res => {
          if (res.ok) {
            swal({
              title: "نقش کاربر مورد نظر با موفقیت تغییر یافت",
              icon: "success",
              buttons: "تایید"
            })
            getAllUsers()
          } else {
            swal({
              title: "تغییر نقش کاربر مورد نظر با خطا مواجه شد",
              icon: "error",
              buttons: "تایید"
            })
          }
        })
      } else if (value && value.length) {
        swal({
          title: "نقش وارد شده معتبر نیست!",
          icon: "error",
          buttons: "تایید"
        })
      }
    })


  }

  return (
    <>
      <div className='admin-page-title app-title'>کاربران</div>
      <div className="home-content-edit">
        <div className="home-title">
          <span>افزودن کاربر جدید</span>
        </div>
        <form className="form" onSubmit={addNewUser}>
          <div className="col-12 col-md-6">
            <div className="name input">
              <label className="input-title">نام و نام خانوادگی</label>
              <Input
                type="text"
                className="input-item"
                id="name"
                element="input"
                validations={[
                  requiredValidator(),
                  minimumValidator(8),
                  maximumValidator(20),
                ]}
                onInputHandler={onInputHandler}
                placeholder="لطفا نام و نام خانوادگی کاربر را وارد کنید..."
              />
              <span className="error-message text-danger"></span>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="family input">
              <label className="input-title">نام کاربری</label>
              <Input
                type="text"
                className="input-item"
                id="username"
                element="input"
                validations={[
                  requiredValidator(),
                  minimumValidator(8),
                  maximumValidator(20),
                ]}
                onInputHandler={onInputHandler}
                placeholder="لطفا نام کاربری را وارد کنید..."
              />
              <span className="error-message text-danger"></span>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="email input">
              <label className="input-title">ایمیل</label>
              <Input
                type="text"
                className="input-item"
                id="email"
                element="input"
                validations={[
                  requiredValidator(),
                  minimumValidator(8),
                  emailValidator(),
                ]}
                onInputHandler={onInputHandler}
                placeholder="لطفا ایمیل کاربر را وارد کنید..."
              />
              <span className="error-message text-danger"></span>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="password input">
              <label className="input-title">رمز عبور</label>
              <Input
                type="text"
                className="input-item"
                id="password"
                element="input"
                validations={[
                  requiredValidator(),
                  minimumValidator(8),
                  maximumValidator(20),
                ]}
                onInputHandler={onInputHandler}
                placeholder="لطفا رمز عبور کاربر را وارد کنید..."
              />
              <span className="error-message text-danger"></span>
            </div>
          </div>
          <div className="col-12 col-md-6">
            <div className="phone input">
              <label className="input-title">شماره تلفن</label>
              <Input
                type="text"
                className="input-item"
                id="phone"
                element="input"
                validations={[
                  requiredValidator(),
                  minimumValidator(8),
                  maximumValidator(20),
                ]}
                onInputHandler={onInputHandler}
                placeholder="لطفا شماره تلفن کاربر را وارد کنید..."
              />
              <span className="error-message text-danger"></span>
            </div>
          </div>
          <div className="col-12">
            <div className="bottom-form">
              <div className="submit-btn">
                <input type="submit" value="افزودن" disabled={!formState.isValidForm} />
              </div>
            </div>
          </div>
        </form>
      </div>


      <DataTable title={"کاربران"}>
        <table className="table">
          <thead>
            <tr>
              <th>شناسه</th>
              <th>نام</th>
              <th>شماره</th>
              <th>ایمیل</th>
              <th>نقش</th>
              <th>تغییر سطح</th>
              <th>حذف</th>
              <th>بن</th>
            </tr>
          </thead>
          <tbody>
            {
              users.map((user, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.phone}</td>
                  <td>{user.email}</td>
                  <td className={user.role === 'ADMIN' ? "admin-style-text" : ""}>{user.role === 'ADMIN' ? "مدیر" : "کاربر"}</td>
                  <td>
                    <button type="button" className="btn btn-primary edit-btn"
                      onClick={() => changeRole(user._id)}
                    >
                      تغییر
                    </button>
                  </td>
                  <td>
                    <button type="button" className="btn btn-danger delete-btn"
                      onClick={() => removeUser(user._id)}>
                      حذف
                    </button>
                  </td>
                  <td>
                    <button type="button" className="btn btn-danger delete-btn"
                      onClick={() => banUser(user._id)}>
                      بن
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
