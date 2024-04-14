import React from 'react'
import "./Footer.css"
import FooterItem from './FooterItem/FooterItem'
import Input from '../Form/Inpit/Input'
import { emailValidator } from '../../Utils/Validator/Rouls'
import useForm from '../../hooks/useForm'
import swal from 'sweetalert'
import { FaLongArrowAltUp ,FaGithub , FaTelegram , FaWhatsapp , FaInstagram } from "react-icons/fa";
import { Link } from 'react-router-dom'
import { BASE_URL } from '../../Utils/Variables/ApiVariables'

export default function Footer() {


    const [formState, onInputHandler] = useForm({
        newsRegistration: {
            value: '',
            isValid: false
        },
    }, false)

    function submitNewsRegistration(event) {
        event.preventDefault()

        const lettersBody = {
            email: formState.initInputs.newsRegistration.value
        }

        fetch(`${BASE_URL}newsletters`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(lettersBody)
        })
            .then(res => {
                if (!res.ok) {
                    swal({
                        title: 'عضویت در خبرنامه با خطا مواجه شد',
                        icon: 'error',
                        button: 'تایید'
                    })
                } else {
                    swal({
                        title: 'شما با موفقیت در خبرنامه عضو شدید',
                        icon: 'success',
                        button: 'تایید'
                    })
                }
            })
    }


    return (
        <footer class="footer">
            <div class="container">
                <div class="row g-5">
                    <div class="col-md-8 col-lg-4">
                        <div class="footer__item">
                            <h6 class="footer__title">درباره ما</h6>
                            <p class="footer__description">وقتی تازه شروع به یادگیری برنامه نویسی کردم. یکی از مشکلاتی که در
                                فرآیند یادگیری داشتم، کمبود آموزش های خوب با پشتیبانی قابل قبول بود که باعث شد اون موقع
                                تصمیم بگیرم اگر روزی توانایی مالی و فنی قابل قبولی داشتم یک وب سایت برای حل این مشکل راه
                                اندازی کنم! و خب امروز آکادمی آموزش برنامه نویسی سبزلرن به عنوان یک آکادمی خصوصی فعالیت
                                میکنه و این به این معنی هست که هر مدرسی اجازه تدریس در اون رو نداره و باید از فیلترینگ های
                                خاص آکادمی سبزلرن رد شه! این به این معنی هست که ما برامون فن بیان و نحوه تعامل مدرس با
                                دانشجو بسیار مهمه! ما در آکادمی سبزلرن تضمین پشتیبانی خوب و با کیفیت رو به شما میدیم . چرا
                                که مدرسین وب سایت سبزلرن حتی برای پشتیبانی دوره های رایگان شون هم هزینه دریافت میکنند و
                                متعهد هستند که هوای کاربر های عزیز رو داشته باشند !</p>
                        </div>
                    </div>
                    <div class="col-md-4 col-lg-3">
                        <div class="footer__item">
                            <h6 class="footer__title">دسترسی سریع</h6>
                            <ul class="footer__menu">
                                <li class="footer__quick-item">
                                    <a href="#presell-section" class="footer__quick-link">دوره های پیش فروش</a>
                                </li>
                                <li class="footer__quick-item">
                                    <a href="#popular-section" class="footer__quick-link">دوره های پرطرفداد</a>
                                </li>
                                <li class="footer__quick-item">
                                    <a href="#article-section" class="footer__quick-link">مقالات سایت</a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-md-6 col-lg-3">
                        <div class="footer__item">
                            <h6 class="footer__title">ارتباط با ما</h6>
                            <ul class="footer__menu">
                                <li class="footer__contact-item">تلفن تماس :<span class="footer__bold-contact-item">6981 264
                                    0938</span></li>
                                <li class="footer__contact-item">آدرس ایمیل :<span
                                    class="footer__bold-contact-item">mohsen.wsx@gmail.com</span></li>
                                    <li className='footer__contact-item' style={{ margin : '7rem 0 2rem'}}>
                                        <Link to="/contact" style={{textDecoration : 'underLine'}}>نظرات خود را با ما به اشتراک بگذارید</Link>
                                    </li>
                            </ul>
                            <div className='footer__nnewsRegistration-wrapper'>
                            <span className='footer__widgets-link'>عضویت در خبرنامه</span>
                                    <div className='footer__newsRegistration'>
                                        <Input
                                            id='newsRegistration'
                                            element='input'
                                            className="footer__newsRegistration-input"
                                            placeholder="برای عضویت، ایمیل خود را وارد کنید"
                                            validations={[
                                                emailValidator()
                                            ]}
                                            onInputHandler={onInputHandler}
                                        />
                                        <button
                                            className={`footer__newsRegistration-btn ${formState.isValidForm ? 'newsRegistration__btn-success' : ""} `}
                                            type="submit"
                                            disabled={!formState.isValidForm}
                                            onClick={submitNewsRegistration}
                                        >
                                            <span className="footer__newsRegistration-btn-text">ثبت</span>
                                        </button>
                                    </div>
                            </div>
                        </div>
                    </div>
                    <div class="col-md-6 col-lg-2">
                        <div class="footer__item">
                            <h6 class="footer__title">نماد اعتماد</h6>
                            <img src="/image/enamad.jpeg" class="enamad" alt="enamad" />
                        </div>
                    </div>
                </div>

                <div class="footer__bottom">
                    <a href="#" class="scroll-top">
                        <FaLongArrowAltUp />
                    </a>
                    <div class="footer__bottom-right">
                        <p class="footer__copyrighting">کلیه حقوق این سایت متعلق به آکادمی سبزلرن می باشد.</p>
                        <div class="footer__social-wrapper">
                        <FaTelegram class="footer__social-icon"/>
                            <FaGithub class="footer__social-icon"/>
                            <FaWhatsapp class="footer__social-icon"/>
                            <FaInstagram class="footer__social-icon"/>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    )
}
