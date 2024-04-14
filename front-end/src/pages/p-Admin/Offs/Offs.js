import React, { useEffect, useState } from 'react'
import Input from '../../../components/Form/Inpit/Input'
import { maximumValidator, minimumValidator, requiredValidator } from '../../../Utils/Validator/Rouls'
import useForm from '../../../hooks/useForm'
import { BASE_URL } from '../../../Utils/Variables/ApiVariables'
import swal from 'sweetalert'
import DataTable from '../../../components/AdminDashboard/DataTable/DataTable'
import { FaSave } from 'react-icons/fa'

export default function Offs() {

    const [allOffs, setAllOffs] = useState([])
    const [allCourses, setAllCourses] = useState([])
    const [selectCourse, setSelectCourse] = useState(-1)
    const [formState, onInputHandler] = useForm({
        code: {
            value: '',
            isValid: false
        },
        percent: {
            value: '',
            isValid: false
        },
        maximum: {
            value: '',
            isValid: false
        }
    }, false)

    useEffect(() => {
        getAllOffs()
        getAllCourses()
    }, [])

    function getAllOffs() {
        fetch(`${BASE_URL}offs`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
            }
        })
            .then(res =>res.ok ? res.json() : [])
            .then(result => setAllOffs(result))
    }

    function getAllCourses() {
        fetch(`${BASE_URL}courses`)
            .then(res =>res.ok ? res.json() : [])
            .then(result => setAllCourses(result))
    }

    function createNewOffCode(event) {
        event.preventDefault()

        const newCode = {
            percent: formState.initInputs.percent.value,
            code: formState.initInputs.code.value,
            max: formState.initInputs.maximum.value,
            course: selectCourse
        }


        fetch(`${BASE_URL}offs`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
            },
            body: JSON.stringify(newCode)
        }).then(res => {
            if (res.ok) {
                swal({
                    title: "کد تخفیف با موفقیت ثبت شد.",
                    icon: "success",
                    buttons: "تایید"
                })
            } else {
                swal({
                    title: "اضافه کردن کد تخفیف با خطا مواجه شد.",
                    icon: "error",
                    buttons: "تایید"
                })
            }
            return res.json()
        })
    }

    function removeOff(offID) {
        swal({
            title: "آیا از حذف کد تخفیف اطمینان دارید؟",
            icon: "warning",
            buttons: ["لغو", "تایید"]
        }).then(result => {
            if (result) {
                fetch(`${BASE_URL}offs/${offID}`, {
                    method: 'DELETE',
                    headers: {
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token}`
                    }
                }).then(res => {
                    if (res.ok) {
                        swal({
                            title: "کد تخفیف با موفقیت حذف شد.",
                            icon: "success",
                            buttons: "تایید"
                        })
                        getAllOffs()
                    } else {
                        swal({
                            title: "حذف کردن کد تخفیف با خطا مواجه شد.",
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
            <div className='admin-page-title app-title'>تخفیف ها</div>
            <div className="home-content-edit">
                <div className="home-title">
                    <span>افزودن کد تخفیف جدید</span>
                </div>
                <form className="form" onSubmit={createNewOffCode}>
                    <div className="col-12 col-md-6">
                        <div className="name input">
                            <label className="input-title">کد تخفیف</label>
                            <Input
                                id='code'
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
                                placeholder="لطفا متن کد تخفیف را وارد کنید..."
                            />
                            <span className="error-message text-danger"></span>
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="price input">
                            <label className="input-title">درصد تخفیف</label>
                            <Input
                                id='percent'
                                element='input'
                                className="input-item"
                                type="number"
                                validations={[
                                    requiredValidator(),
                                    maximumValidator(3)
                                ]}
                                onInputHandler={onInputHandler}
                                isValid="false"
                                placeholder="لطفا درصد تخفیف را وارد کنید"
                            />
                            <span className="error-message text-danger"></span>
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="price input">
                            <label className="input-title">حداکثر استفاده</label>
                            <Input
                                id='maximum'
                                element='input'
                                className="input-item"
                                type="number"
                                validations={[
                                    requiredValidator()
                                ]}
                                onInputHandler={onInputHandler}
                                isValid="false"
                                placeholder="لطفا حداکثر استفاده را وارد کنید"
                            />
                            <span className="error-message text-danger"></span>
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="number input">
                            <label className="input-title">انتخاب دوره</label>
                            <br />
                            <select className='p-admi-selection' onChange={event => setSelectCourse(event.target.value)}>
                                <option value="-1">دوره را انتخاب کنید</option>
                                {allCourses.map((course) => (
                                    <option value={course._id}>{course.name}</option>
                                ))}
                            </select>
                            <span className="error-message text-danger"></span>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="number input d-flex h-100 align-items-center justify-content-end">
                            <button
                                className={`p-2 rounded-3 ${(formState.isValidForm && selectCourse != -1) ? 'login-form__btn-success' : 'login-form__btn-error'} `} type="submit"
                                disabled={(!formState.isValidForm || selectCourse == -1)}
                            >
                            <FaSave className="login-form__btn-icon"></FaSave>
                                <span className="login-form__btn-text">افزودن کد تخفیف</span>
                            </button>
                        </div>
                    </div>
                </form>
            </div>

            <DataTable title={"تخفیف ها"}>
                <table className="table">
                    <thead>
                        <tr>
                            <th>شناسه</th>
                            <th>کد</th>
                            <th>درصد</th>
                            <th>سازنده</th>
                            <th>حداکثر استفاده</th>
                            <th>استفاده</th>
                            <th>حذف</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allOffs.map((off, index) => (
                                <tr key={off._id}>
                                    <td>{index + 1}</td>
                                    <td>{off.code}</td>
                                    <td>{off.percent}</td>
                                    <td>{off.creator}</td>
                                    <td>{off.max}</td>
                                    <td>{off.uses}</td>
                                    <td>
                                        <button type="button" className="btn btn-danger delete-btn"
                                            onClick={() => removeOff(off._id)}>
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
