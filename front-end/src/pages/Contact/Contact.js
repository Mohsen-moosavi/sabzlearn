import React from 'react'
import './Contact.css'
import useForm from '../../hooks/useForm'
import { BASE_URL } from '../../Utils/Variables/ApiVariables'
import { Link, useNavigate } from 'react-router-dom'
import Input from '../../components/Form/Inpit/Input'
import { emailValidator, maximumValidator, minimumValidator, requiredValidator } from '../../Utils/Validator/Rouls'
import { emailValidatorRegex } from '../../Utils/Validator/Regex'
import swal from 'sweetalert'
import { FaUser, FaLock } from "react-icons/fa";
import { MdEmail } from "react-icons/md";

export default function Contact() {

    const navigator = useNavigate()

    const [formState, onInputHandler] = useForm({
        contactName: {
            value: '',
            isValid: false
        },
        contactEmail: {
            value: '',
            isValid: false
        },
        contactPhone: {
            value: '',
            isValid: false
        },
        contactText: {
            value: '',
            isValid: false
        }

    }, false)

    function sendContact(event) {
        event.preventDefault()

        const contactDetails = {
            name: formState.initInputs.contactName.value,
            email: formState.initInputs.contactEmail.value,
            phone: formState.initInputs.contactPhone.value,
            body: formState.initInputs.contactText.value
        }

        fetch(`${BASE_URL}contact`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(contactDetails)
        })
            .then(res => {
                if (!res.ok) {
                    swal({
                        title: 'ثبت نظر با خطا مواجه شد.',
                        icon: 'error',
                        button: 'تایید'
                    })
                } else {
                    swal({
                        title: 'نظر شما با موفقیت برای ما ارسال گردید',
                        icon: 'success',
                        button: 'تایید'
                    }).then(value => navigator('/'))
                }
            })
    }


    return (
        <section class="auth">
            <div class="auth-container">
                <div class="auth__wrapper">
                    <div class="auth__cover">
                        <img src="./image/padlock.png" class="auth__img" alt="authentication" />
                    </div>
                    <form class="auth__content">
                        <div class="auth__input-wrapper">
                            <Input
                                id='contactName'
                                element='input'
                                className="auth__input"
                                type="text"
                                placeholder="نام و نام خانوادگی"
                                validations={[
                                    requiredValidator(),
                                    minimumValidator(2),
                                    maximumValidator(20)
                                ]}
                                onInputHandler={onInputHandler}
                            />
                            <FaUser class="auth__input-icon" />
                        </div>
                        <div class="auth__input-wrapper">
                            <Input
                                id='contactEmail'
                                element='input'
                                className="auth__input"
                                type="email"
                                placeholder="ایمیل"
                                validations={[
                                    requiredValidator(),
                                    minimumValidator(8),
                                    emailValidator()
                                ]}
                                onInputHandler={onInputHandler}
                            />

                            <MdEmail class="auth__input-icon" />
                        </div>
                        <div class="auth__input-wrapper">
                            <Input
                                id='contactPhone'
                                element='input'
                                className="auth__input"
                                type="number"
                                placeholder="تلفن همراه"
                                validations={[
                                    requiredValidator(),
                                    minimumValidator(10),
                                    maximumValidator(11)
                                ]}
                                onInputHandler={onInputHandler}
                            />
                            <FaUser class="auth__input-icon" />
                        </div>
                        <div class="auth__input-wrapper">
                            <Input
                                id='contactText'
                                element='textarea'
                                className='auth__input auth__textarea'
                                placeholder="نظر خود را با ما در میان بگذارید..."
                                validations={[
                                    requiredValidator(),
                                    minimumValidator(5),
                                ]}
                                onInputHandler={onInputHandler}
                            />
                        </div>
                        <button
                            type="submit"
                            class="auth__submit"
                            disabled={!formState.isValidForm}
                            onClick={sendContact}>
                            فرستادن نظر
                        </button>

                        <p class="auth__feature">کاربر جدبد هستید؟ <Link to="/login" class="auth__link">ثبت نام</Link></p>
                    </form>
                </div>
            </div>
        </section>
    )
}
