import React, { useEffect, useState } from 'react'
import "./ArticleInfo.css"
import Footer from '../../components/Footer/Footer'
import BreadCrumb from '../../components/BreadCrumb/BreadCrumb'
import CommentTextArea from '../../components/CommentTextArea/CommentTextArea'
import { BASE_URL } from '../../Utils/Variables/ApiVariables'
import { Link, useParams } from 'react-router-dom'
import DOMPurify from 'dompurify'
import Header from '../../components/Header/Header'
import { FaFacebookF, FaRegEye, FaRegFolder, FaRegUser, FaStar, FaTelegramPlane, FaTwitter } from 'react-icons/fa'

export default function ArticleInfo() {

    const { articleName } = useParams()
    const [articleInfo, setArticleInfo] = useState({})
    const [articleCategory, setArticleCategory] = useState({})
    const [articleCreator, setArticleCreator] = useState({})
    const [relatedArticles , setRelatedArticles] = useState([])

    useEffect(() => {
        fetch(`${BASE_URL}articles/${articleName}`)
            .then(res =>res.ok ? res.json() : [])
            .then(result => {
                setArticleInfo(result)
                setArticleCategory(result.categoryID)
                setArticleCreator(result.creator)
            })

            fetch(`${BASE_URL}articles`)
            .then(res =>res.ok ? res.json() : [])
            .then(result => {
                const publishadArticles = result.filter(article=>article.publish==1) 
                const randomArticle = [...publishadArticles].sort(()=>Math.random()).slice(0,5)
                setRelatedArticles(randomArticle)}
            )
    }, [])

    return (
        <>
            <Header />
            <div className='container'>
                <BreadCrumb
                    links={[
                        { id: 1, title: "خانه", to: '/' },
                        { id: 2, title: "مقالات سایت", to: '/article-info/articleName' },
                        { id: 3, title: `${articleInfo.title}`, to: '/article-info/articleName' },
                    ]} />

                <main class="articleInfo-main">
                    <div class="row">
                        <div class="col-lg-8">
                            <div class="article">
                                <h1 class="app-title">
                                    {articleInfo.title}
                                </h1>
                                <div class="article__header">
                                    <div class="article-header__category article-header__item">
                                        <FaRegFolder class={'article-header__icon'} />
                                        <Link to={`/category-info/${articleCategory.name}/1`} class="article-header__text">
                                            {articleCategory.title}
                                        </Link>
                                    </div>
                                    <div class="article-header__category article-header__item">
                                        <FaRegUser class="article-header__icon" />
                                        <span class="article-header__text"> ارسال شده توسط{""} {articleCreator.name}</span>
                                    </div>
                                    <div class="article-header__category article-header__item">
                                        <FaRegEye class="article-header__icon" />
                                        <span class="article-header__text">تاریخ انتشار :{" "}{articleInfo.updatedAt?.slice(0, 10)}</span>
                                    </div>
                                </div>
                                <img src={`http://localhost:4000/courses/covers/${articleInfo.cover}`} alt="Article Cover" class="article__banner" />

                                <div class="article__score">
                                    <div class="article__score-icons">
                                        <FaStar class="article__score-icon" />
                                        <FaStar class="article__score-icon" />
                                        <FaStar class="article__score-icon" />
                                        <FaStar class="article__score-icon" />
                                        <FaStar class="article__score-icon" />
                                    </div>
                                    <span class="article__score-text">4.2/5 - (5 امتیاز)</span>
                                </div>

                                {/* <p class="article__paragraph paragraph">{articleInfo.body} {" "}
                                    جاوا اسکریپت یکی از زبان‌های برنامه‌نویسی اصلی حوزه فرانت‌اند است که به واسطه فریم ورک‌های آن می‌توان انواع وب سایت‌ها، اپلیکیشن‌ها و وب اپلیکیشن‌ها را طراحی کرد. به طور کلی بعد از یادگیری html و css معمولاً باید آموزش جاوا اسکریپت را نیز فرا بگیرید. . چرا که این زبان تکمیل‌کننده html و css بوده و در چنین شرایطی موقعیت‌های شغلی بیشتر را در اختیار خواهید داشت و همچنین می‌توانید پروژه‌های گسترده‌تری را انجام دهید. در حال حاضر با وجود منابع رایگان موجود در وب شما به راحتی می‌توانید زبان جاوا اسکریپت را به صورت حرفه‌ای فرا بگیرید. به همین واسطه در ادامه مطلب قصد داریم سایت‌های شاخص آموزش این زبان برنامه‌نویسی در جهان را به شما معرفی کنیم و در آخر بگوییم که بهترین سایت آموزش جاوا اسکریپت کدام است.
                                </p> */}

                                {/* <div class="article-read">
                                    <span class="article-read__title">آنچه در این مقاله خواهید خواند</span>
                                    <ul class="article-read__list">
                                        <li class="article-read__item">
                                            <a href="#" class="article-read__link">معرفی بهترین سایت ‌های آموزش جاوا اسکریپت:</a>
                                        </li>
                                        <li class="article-read__item">
                                            <a href="#" class="article-read__link">یک راه آسان‌تر، دوره‌ های جاوا اسکریپت آکادمی سبزلرن!</a>
                                        </li>
                                        <li class="article-read__item">
                                            <a href="#" class="article-read__link">ثبت نام در دوره‌ های جاوا اسکریپت سبزلرن:</a>
                                        </li>
                                    </ul>
                                </div> */}
                                <div class="article-section" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(articleInfo.body) }}>
                                </div>
                                {/* <div class="article-section">
                                    <h4 class="article-section__title">معرفی بهترین سایت ‌های آموزش جاوا اسکریپت:</h4>
                                    <p class="paragraph article-section__text">
                                        توجه داشته باشید که تمام وب سایت‌هایی که به عنوان بهترین سایت آموزش جاوا اسکریپت در ادامه معرفی می‌کنیم، بین‌المللی هستند و منابع موجود در آن‌ها به زبان انگلیسی است. در نتیجه شما باید یا تسلط متوسط و حداقلی به زبان انگلیسی داشته باشید و یا اینکه با استفاده از گوگل ترنسلیت منابع موجود را ترجمه کرده و از آن‌ها استفاده کنید. به همین دلیل در انتهای محتوا به شما خواهیم گفت که راه آسان دیگری برای یادگیری زبان جاوا اسکریپت وجود دارد که شما بتوانید به واسطه آن به صورت رایگان و به زبان فارسی این زبان را یاد بگیرید.
                                    </p>
                                    <img src="/image/blog/3.jpeg" alt="article body img" class="article-section__img" />
                                </div>
                                <div class="article-section">
                                    <h3 class="article-section__title">
                                        معرفی بهترین سایت ‌های آموزش جاوا اسکریپت:
                                    </h3>
                                    <p class="paragraph article-section__text">
                                        توجه داشته باشید که تمام وب سایت‌هایی که به عنوان بهترین سایت آموزش جاوا اسکریپت در ادامه معرفی می‌کنیم، بین‌المللی هستند و منابع موجود در آن‌ها به زبان انگلیسی است. در نتیجه شما باید یا تسلط متوسط و حداقلی به زبان انگلیسی داشته باشید و یا اینکه با استفاده از گوگل ترنسلیت منابع موجود را ترجمه کرده و از آن‌ها استفاده کنید. به همین دلیل در انتهای محتوا به شما خواهیم گفت که راه آسان دیگری برای یادگیری زبان جاوا اسکریپت وجود دارد که شما بتوانید به واسطه آن به صورت رایگان و به زبان فارسی این زبان را یاد بگیرید.
                                    </p>
                                </div>
                                <div class="article-section">
                                    <h2 class="article-section__title">
                                        معرفی بهترین سایت ‌های آموزش جاوا اسکریپت:
                                    </h2>
                                    <p class="paragraph article-section__text">
                                        توجه داشته باشید که تمام وب سایت‌هایی که به عنوان بهترین سایت آموزش جاوا اسکریپت در ادامه معرفی می‌کنیم، بین‌المللی هستند و منابع موجود در آن‌ها به زبان انگلیسی است. در نتیجه شما باید یا تسلط متوسط و حداقلی به زبان انگلیسی داشته باشید و یا اینکه با استفاده از گوگل ترنسلیت منابع موجود را ترجمه کرده و از آن‌ها استفاده کنید. به همین دلیل در انتهای محتوا به شما خواهیم گفت که راه آسان دیگری برای یادگیری زبان جاوا اسکریپت وجود دارد که شما بتوانید به واسطه آن به صورت رایگان و به زبان فارسی این زبان را یاد بگیرید.
                                    </p>
                                    <img src="/image/blog/2.jpg" alt="article body img" class="article-section__img" />
                                </div> */}

                                <div class="article-social-media">
                                    <span class="article-social-media__text">اشتراک گذاری :</span>
                                    <a href="#" class="article-social-media__link">
                                        <FaTelegramPlane class="article-social-media__icon"></FaTelegramPlane>
                                    </a>
                                    <a href="#" class="article-social-media__link">
                                        <FaTwitter class="article-social-media__icon"></FaTwitter>
                                    </a>
                                    <a href="#" class="article-social-media__link">
                                        <FaFacebookF class="article-social-media__icon"></FaFacebookF>
                                    </a>
                                </div>

                            </div>

                            <CommentTextArea />

                        </div>

                        <div class="col-lg-4">
                            <div class="courses-info">

                                <div class="course-info">
                                    <span class="course-info__courses-title">پر امتیازترین دوره ها</span>
                                    <ul class="course-info__courses-list">
                                        <li class="course-info__courses-list-item">
                                            <a href="#" class="course-info__courses-link">
                                                <img src="/image/courses/js_project.png" alt="Course Cover" class="course-info__courses-img" />
                                                <span class="course-info__courses-text">
                                                    پروژه های تخصصی با جاوا اسکریپت
                                                </span>
                                            </a>
                                        </li>
                                        <li class="course-info__courses-list-item">
                                            <a href="#" class="course-info__courses-link">
                                                <img src="/image/courses/fareelancer.png" alt="Course Cover" class="course-info__courses-img" />
                                                <span class="course-info__courses-text">
                                                    تعیین قیمت پروژه های فریلنسری
                                                </span>
                                            </a>
                                        </li>
                                        <li class="course-info__courses-list-item">
                                            <a href="#" class="course-info__courses-link">
                                                <img src="/image/courses/nodejs.png" alt="Course Cover" class="course-info__courses-img" />
                                                <span class="course-info__courses-text">
                                                    دوره Api نویسی
                                                </span>
                                            </a>
                                        </li>
                                        <li class="course-info__courses-list-item">
                                            <a href="#" class="course-info__courses-link">
                                                <img src="/image/courses/jango.png" alt="Course Cover" class="course-info__courses-img" />
                                                <span class="course-info__courses-text">
                                                    متخصص جنگو
                                                </span>
                                            </a>
                                        </li>
                                    </ul>
                                </div>

                                <div class="course-info">
                                    <span class="course-info__courses-title">مقاله های جدید</span>
                                    <ul class="last-articles__list">
                                        {relatedArticles?.map(article=>(
                                            <li class="last-articles__item">
                                            <Link to={`/article-info/${article.shortName}`} class="last-articles__link">
                                                <img src={`http://localhost:4000/courses/covers/${article.cover}`} alt="Course Cover" class="course-info__courses-img" />
                                                <span className='course-info__courses-text'>
                                                    {article.title}
                                                </span>
                                            </Link>
                                        </li>
                                        ))}
                                        {/* <li class="last-articles__item">
                                            <a href="#" class="last-articles__link">
                                                <img src="/image/courses/fareelancer.png" alt="Course Cover" class="course-info__courses-img" />
                                                <span className='course-info__courses-text'>
                                                    نحوه نصب کتابخانه در پایتون | آموزش نصب کتابخانه پایتون
                                                </span>
                                            </a>
                                        </li>
                                        <li class="last-articles__item">
                                            <a href="#" class="last-articles__link">
                                                <img src="/image/courses/fareelancer.png" alt="Course Cover" class="course-info__courses-img" />
                                                <span className='course-info__courses-text'>
                                                    نحوه نصب کتابخانه در پایتون | آموزش نصب کتابخانه پایتون
                                                </span>
                                            </a>
                                        </li>
                                        <li class="last-articles__item">
                                            <a href="#" class="last-articles__link">
                                                <img src="/image/courses/fareelancer.png" alt="Course Cover" class="course-info__courses-img" />
                                                <span className='course-info__courses-text'>
                                                    نحوه نصب کتابخانه در پایتون | آموزش نصب کتابخانه پایتون
                                                </span>
                                            </a>
                                        </li>
                                        <li class="last-articles__item">
                                            <a href="#" class="last-articles__link">
                                                <img src="/image/courses/fareelancer.png" alt="Course Cover" class="course-info__courses-img" />
                                                <span className='course-info__courses-text'>
                                                    نحوه نصب کتابخانه در پایتون | آموزش نصب کتابخانه پایتون
                                                </span>
                                            </a>
                                        </li>
                                        <li class="last-articles__item">
                                            <a href="#" class="last-articles__link">
                                                <img src="/image/courses/fareelancer.png" alt="Course Cover" class="course-info__courses-img" />
                                                <span className='course-info__courses-text'>
                                                    نحوه نصب کتابخانه در پایتون | آموزش نصب کتابخانه پایتون
                                                </span>
                                            </a>
                                        </li>
                                        <li class="last-articles__item">
                                            <a href="#" class="last-articles__link">
                                                <img src="/image/courses/fareelancer.png" alt="Course Cover" class="course-info__courses-img" />
                                                <span className='course-info__courses-text'>
                                                    نحوه نصب کتابخانه در پایتون | آموزش نصب کتابخانه پایتون
                                                </span>
                                            </a>
                                        </li> */}
                                    </ul>
                                </div>

                            </div>
                        </div>
                    </div>
                </main>
            </div>



            <Footer />
        </>
    )
}
