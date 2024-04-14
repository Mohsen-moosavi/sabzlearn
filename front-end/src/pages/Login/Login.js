import React, { useContext, useEffect, useState } from 'react'
import Footer from '../../components/Footer/Footer'
import { Link, useNavigate } from 'react-router-dom'
import "./Login2.css"
import Input from '../../components/Form/Inpit/Input'
import { emailValidator, maximumValidator, minimumValidator, requiredValidator } from '../../Utils/Validator/Rouls'
import useForm from '../../hooks/useForm'
import { BASE_URL } from '../../Utils/Variables/ApiVariables'
import AuthContext from '../../contexts/AuthContext'
import swal from 'sweetalert';
import { FaUser, FaLock } from "react-icons/fa";

export default function Login() {

    const authContext = useContext(AuthContext)
    const navigate = useNavigate()

    useEffect(()=>{
        if(authContext.userInfos.length){
            navigate("/my-account")
        }
    },[])

    const [formState, onInputHandler] = useForm({
        username: {
            value: '',
            isValid: false
        },
        password: {
            value: '',
            isValid: false
        }
    }, false)


    function loginHandler(event) {
        event.preventDefault()

        const userinfo = {
            identifier: formState.initInputs.username.value,
            password: formState.initInputs.password.value
        }

        fetch(`${BASE_URL}auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(userinfo)
        }).then(res => {
            if (res.ok) {
                return res.json()
            } else {
                throw new Error(res)
            }
        }).then(result => {
            authContext.login({}, result.accessToken)

            swal({
                title: "شما با موفقیت لاگین شدید :)",
                icon: "success",
                buttons: "ورود به پنل"
            }).then(value => {
                navigate("/")
            })
        })
            .catch(err => {
                swal({
                    title: "کاربری با این مشخصات وجود ندارد",
                    icon: "error",
                    buttons: "تلاش مجدد"
                })
            })
    }

    return (
        <section class="auth">
            <div class="auth-container">
                <div class="auth__wrapper">
                    <div class="auth__cover">
                        <img src="./image/padlock.png" class="auth__img" alt="authentication" />
                    </div>
                    <form class="auth__content" onSubmit={loginHandler}>
                        <div class="auth__input-wrapper">
                            <Input
                                element="input"
                                id='username'
                                className="auth__input"
                                placeholder="نام کاربری | ایمیل"
                                onInputHandler={onInputHandler}
                                validations={[
                                    requiredValidator(),
                                    minimumValidator(5)
                                ]}
                            />
                            <FaUser class="auth__input-icon" />
                        </div>
                        <div class="auth__input-wrapper">
                            <Input
                                id='password'
                                element='input'
                                className="auth__input"
                                type="text"
                                placeholder="کذرواژه"
                                onInputHandler={onInputHandler}
                                validations={[
                                    requiredValidator(),
                                    maximumValidator(20),
                                    minimumValidator(5)
                                ]}
                            />
                            <FaLock className='auth__input-icon' />
                        </div>
                        <button type="submit" class="auth__submit" disabled={!formState.isValidForm}>
                            ورود
                        </button>

                        <p class="auth__feature">هنوز ثبت نام نکرده اید؟ <Link to="/register" class="auth__link">ثبت نام</Link></p>
                    </form>
                </div>
            </div>
        </section>
    )
}
