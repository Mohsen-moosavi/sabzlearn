import React, { useEffect, useState } from 'react'
import './Ticket.css'
import { BASE_URL } from '../../../Utils/Variables/ApiVariables'
import Input from '../../../components/Form/Inpit/Input'
import { requiredValidator } from '../../../Utils/Validator/Rouls'
import useForm from '../../../hooks/useForm'
import swal from 'sweetalert'
import { Link, useNavigate } from 'react-router-dom'
import { IoIosSend } from 'react-icons/io'

export default function Ticket() {

    const navigate = useNavigate()

    const [departments, setDepartments] = useState([])
    const [departmentsSubs, setDepartmentsSubs] = useState([])
    const [userCourses, setUserCourses] = useState([])

    const [selectedDepartment, setSelectedDepartment] = useState(-1)
    const [selectedDepartmentSub, setSelectedDepartmentSub] = useState(-1)
    const [courseID, setCourseID] = useState('')
    const [ticketLevel, setTicketLevel] = useState(-1)
    const [ticketFile, setTicketFile] = useState('')

    const [formState, onInputHandler] = useForm({
        ticketTitle: {
            value: '',
            isValid: false
        },
        ticketBody: {
            value: '',
            isValid: false
        }
    }, false)

    useEffect(() => {
        fetch(`${BASE_URL}tickets/departments`)
            .then(res =>res.ok ? res.json() : [])
            .then(result => setDepartments(result))

        fetch(`${BASE_URL}users/courses`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
            }
        }).then(res =>res.ok ? res.json() : [])
            .then(result => setUserCourses(result))
    }, [])

    useEffect(() => {
        if (selectedDepartment != -1) {
            fetch(`${BASE_URL}tickets/departments-subs/${selectedDepartment}`)
                .then(res =>res.ok? res.json() : [])
                .then(result => setDepartmentsSubs(result))
        }
    }, [selectedDepartment])

    function sendTicket(event) {
        event.preventDefault()

        const ticketBody = {
            departmentID: selectedDepartment,
            departmentSubID: selectedDepartmentSub,
            title: formState.initInputs.ticketTitle.value,
            body: formState.initInputs.ticketBody.value,
            priority: ticketLevel,
            course: courseID.length ? courseID : undefined
        }

        fetch(`${BASE_URL}tickets`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token
                }`,
            },
            body: JSON.stringify(ticketBody),
        }).then((res) => {
            if (res.ok) {
                swal({
                    title: "تیکت با موفقیت ثبت شد",
                    icon: "success",
                    buttons: "تایید",
                }).then(() => {
                    navigate("/my-account/tickets");
                });
            }else{
                swal({
                    title: "ثبت تیکت با خطا مواجه شد",
                    icon: "error",
                    buttons: "تایید",
                })
            }
        });
    }



    return (
            <div class="ticket p-user-main">
                <div class="ticket-header">
                    <span class="ticket-header__title app-title">ارسال تیکت جدید</span>
                    <Link class="ticket-header__link" to={'/my-account/tickets'}>
                        همه تیکت ها
                    </Link>
                </div>
                <form class="ticket-form" action="#" onSubmit={sendTicket}>
                    <div class="row">
                        <div class="col-12 col-sm-6">
                            <label class="ticket-form__label">دپارتمان را انتخاب کنید:</label>
                            <select
                                onChange={(event) => setSelectedDepartment(event.target.value)}
                                class="ticket-form__select"
                            >
                                <option class="ticket-form__option" value={-1}>
                                    لطفا یک مورد را انتخاب نمایید.
                                </option>
                                {departments.map((department) => (
                                    <option class="ticket-form__option" value={department._id}>{department.title}</option>
                                ))}
                            </select>
                        </div>
                        <div class="col-12 col-sm-6">
                            <label class="ticket-form__label">نوع تیکت را انتخاب کنید:</label>
                            <select
                                class="ticket-form__select"
                                onChange={(event) => setSelectedDepartmentSub(event.target.value)}
                            >
                                <option class="ticket-form__option" value={-1} selected>
                                    لطفا یک مورد را انتخاب نمایید.
                                </option>
                                {departmentsSubs.map((sub) => (
                                    <option value={sub._id}>{sub.title}</option>
                                ))}
                            </select>
                        </div>
                        <div class="col-12 col-sm-6">
                            <label class="ticket-form__label">عنوان تیکت را وارد کنید:</label>
                            <Input
                                id={"ticketTitle"}
                                element={"input"}
                                placeholder={'عنوان تیکت'}
                                type={'text'}
                                validations={[
                                    requiredValidator()
                                ]}
                                onInputHandler={onInputHandler}
                                className={"ticket-form__input"}
                            />
                        </div>
                        <div class="col-12 col-sm-6">
                            <label class="ticket-form__label">
                                سطح اولویت تیکت را انتخاب کنید:
                            </label>
                            <select
                                class="ticket-form__select"
                                onChange={(event) => setTicketLevel(event.target.value)}
                            >
                                <option class="ticket-form__option" value={-1}>
                                    لطفا یک مورد را انتخاب نمایید.
                                </option>
                                <option value="3">کم</option>
                                <option value="2">متوسط</option>
                                <option value="1">بالا</option>
                            </select>
                        </div>
                        {selectedDepartmentSub === "63b688c5516a30a651e98156" && (
                            <div class="col-12 col-sm-6">
                                <label class="ticket-form__label">دوره را انتخاب کنید:</label>
                                <select
                                    class="ticket-form__select"
                                    onChange={(event) => setCourseID(event.target.value)}
                                >
                                    <option class="ticket-form__option" value={''}>
                                        لطفا یک مورد را انتخاب نمایید.
                                    </option>
                                    {userCourses.map((course) => (
                                        <option value={course.course._id} key={course._id}>
                                            {course.course.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        )}
                        <div class="col-12">
                            <label class="ticket-form__label">
                                محتوای تیکت را وارد نمایید:
                            </label>
                            <Input
                                id={"ticketBody"}
                                element={"textarea"}
                                placeholder={'محتوای تیکت...'}
                                type={'text'}
                                validations={[
                                    requiredValidator()
                                ]}
                                onInputHandler={onInputHandler}
                                className="ticket-form__textarea"
                            />
                        </div>
                        {/* <div class="col-12">
                            <div class="ticket-form__file">
                                <span class="ticket-form__file-max">
                                    حداکثر اندازه: 6 مگابایت
                                </span>
                                <span class="ticket-form__file-format">
                                    فرمت‌های مجاز: jpg, png.jpeg, rar, zip
                                </span>
                                <input class="ticket-form__file-input" type="file" />
                            </div>
                        </div> */}
                        <div class="col-12">
                            <button class="ticket-form__btn" disabled={selectedDepartment == -1 || selectedDepartmentSub == -1 || ticketLevel == -1 || formState.isValidForm == false}>
                                <IoIosSend class="ticket-form__btn-icon"/>
                                ارسال تیکت
                            </button>
                        </div>
                    </div>
                </form>
            </div>
    )
}
