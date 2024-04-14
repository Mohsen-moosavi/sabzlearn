import React, { useContext, useEffect, useState } from 'react'
import "./Register.css"
import Footer from '../../components/Footer/Footer'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../../components/Form/Inpit/Input'
import { emailValidator, maximumValidator, minimumValidator, requiredValidator, confirmValidator } from '../../Utils/Validator/Rouls'
import useForm from '../../hooks/useForm'
import {BASE_URL} from "./../../Utils/Variables/ApiVariables"
import AuthContext from '../../contexts/AuthContext'
import swal from 'sweetalert'
import { FaUser, FaLock , FaPhoneAlt} from "react-icons/fa";
import { MdEmail } from "react-icons/md";
import ReCAPTCHA from 'react-google-recaptcha'



export default function Register() {

    
    const [isRecaptcha, setIsRecaptcha] = useState(false)
    const authContext = useContext(AuthContext)
    const navigate = useNavigate()

    const [formState, onInputHandler] = useForm({
        fullname: {
            value: '',
            isValid: false
        },
        username: {
            value: '',
            isValid: false
        },
        email: {
            value: '',
            isValid: false
        },
        password: {
            value: '',
            isValid: false
        },
        confirmPassword: {
            value: '',
            isValid: false
        },
        phone: {
            value: '',
            isValid: false
        }
    }, false)

    
    useEffect(()=>{
        if(authContext.userInfos.length){
            navigate("/my-account")
        }
    },[])

    function reachaptchaHandler() {
        setIsRecaptcha(true)
    }

    function registerNewUser(event) {
        event.preventDefault()

        const useRegisterInfo = {
            username: formState.initInputs.username.value,
            email: formState.initInputs.email.value,
            password: formState.initInputs.password.value,
            confirmPassword: formState.initInputs.confirmPassword.value,
            phone: formState.initInputs.phone.value,
            name: formState.initInputs.fullname.value
        }

        fetch(`${BASE_URL}auth/register`,{
            method : 'POST',
            headers :{
                "Content-Type" : "application/json"
            },
            body : JSON.stringify(useRegisterInfo)
        }).then(res=>{
            if(res.ok){
                return res.json()
            }else{
                if(res.status === 403){
                    swal({
                        title : "این شماره بن شده است.",
                        icon : "error",
                        buttons : "تایید"
                    })
                }else{
                    swal({
                        title : "ثبت نام با شکست مواجه شد. لطفا بعدا تلاش کنید",
                        icon : "error",
                        buttons : "تایید"
                    })
                }
                throw Error("خطا در ثبت نام")
            }
        })
        .then(data=>{
            authContext.login(data.user,data.accessToken)
            swal({
                title : "ثبت نام با موفقیت انجام شد",
                icon : "success",
                buttons : "تایید"
            }).then(()=>navigate('/'))
            
        })
    }



    return(
        <section class="auth">
        <div class="auth-container">
            <div class="auth__wrapper">
                <div class="auth__cover">
                    <img src="./image/padlock.png" class="auth__img" alt="authentication" />
                </div>
                <form class="auth__content" onSubmit={registerNewUser}>
                    <div class="auth__input-wrapper">
                    <Input
                                id='fullname'
                                element='input'
                                className="auth__input"
                                type="text"
                                placeholder="نام و نام خانوادگی"
                                onInputHandler={onInputHandler}
                                validations={[
                                    requiredValidator(),
                                    minimumValidator(5),
                                    maximumValidator(25)
                                ]}
                            />
                        <FaUser class="auth__input-icon" />
                    </div>
                    <div class="auth__input-wrapper">
                    <Input
                                id='username'
                                element='input'
                                className="auth__input"
                                type="text"
                                placeholder="نام کاربری"
                                onInputHandler={onInputHandler}
                                validations={[
                                    requiredValidator(),
                                    minimumValidator(5),
                                    maximumValidator(20)
                                ]}
                            />
                        <FaUser class="auth__input-icon" />
                    </div>
                    <div class="auth__input-wrapper">
                    <Input
                                id='email'
                                element='input'
                                className="auth__input"
                                type="text"
                                placeholder="آدرس ایمیل"
                                onInputHandler={onInputHandler}
                                validations={[
                                    requiredValidator(),
                                    minimumValidator(10),
                                    emailValidator()
                                ]}
                            />
                        <MdEmail class="auth__input-icon" />
                    </div>
                    <div class="auth__input-wrapper">
                    <Input
                                id='phone'
                                element='input'
                                className="auth__input"
                                type="number"
                                placeholder="تلفن همراه"
                                onInputHandler={onInputHandler}
                                validations={[
                                    requiredValidator(),
                                    minimumValidator(10),
                                    maximumValidator(11)
                                ]}
                            />
                        <FaPhoneAlt class="auth__input-icon" />
                    </div>
                    <div class="auth__input-wrapper">
                    <Input
                                id='password'
                                element='input'
                                className="auth__input"
                                type="text"
                                placeholder="رمز عبور"
                                onInputHandler={onInputHandler}
                                validations={[
                                    requiredValidator(),
                                    minimumValidator(8),
                                    maximumValidator(25)
                                ]}
                            />
                        <FaLock className='auth__input-icon' />
                    </div>
                    <div class="auth__input-wrapper">
                    <Input
                                id='confirmPassword'
                                element='input'
                                className="auth__input"
                                type="text"
                                placeholder="تکرار رمز عبور"
                                onInputHandler={onInputHandler}
                                validations={[
                                    confirmValidator(formState.initInputs.password.value)
                                ]}
                            />
                        <FaLock className='auth__input-icon' />
                    </div>
                    <div className='recaptcha'>
                        <ReCAPTCHA sitekey='6LeIxAcTAAAAAJcZVRqyHh71UMIEGNQ_MXjiZKhI' className='g-recaptcha' theme={"dark"}
                            onChange={reachaptchaHandler} />
                    </div>
                    <button type="submit" class="auth__submit" disabled={!formState.isValidForm && isRecaptcha}>
                        ثبت نام
                    </button>

                    <p class="auth__feature">قبلا ثبت نام کرده اید؟ <Link to="/login" class="auth__link">وارد شوید</Link></p>
                </form>
            </div>
        </div>
    </section>
    )
}
