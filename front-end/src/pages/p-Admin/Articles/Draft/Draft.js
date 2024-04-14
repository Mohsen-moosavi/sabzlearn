import React, { useEffect, useState } from 'react'
import useForm from '../../../../hooks/useForm'
import Input from '../../../../components/Form/Inpit/Input'
import { maximumValidator, minimumValidator, requiredValidator } from '../../../../Utils/Validator/Rouls'
import CkEditor from '../../../../components/CKeditor/CkEditor'
import { BASE_URL } from '../../../../Utils/Variables/ApiVariables'
import swal from 'sweetalert'
import { useNavigate, useParams } from 'react-router-dom'
import { FaSave } from 'react-icons/fa'
import { RiDraftFill } from 'react-icons/ri'

export default function Draft() {

    const { shortName } = useParams()
    const navigate = useNavigate()

    const [mainArticle, setMainArticle] = useState({})
    const [categories, setCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState(-1)
    const [articleCover, setArticleCover] = useState("")

    const [articleTitle, setArticleTitle] = useState("")
    const [articleUrl, setArticleUrl] = useState("")
    const [articleDescription, setArticleDescription] = useState("")
    const [articleBody, setArticleBody] = useState("")

    // const [formState, onInputHandler] = useForm({
    //     title: {
    //         value: mainArticle.title,
    //         isValid: false
    //     },
    //     shortName: {
    //         value: '',
    //         isValid: false
    //     },
    //     description: {
    //         value: '',
    //         isValid: false
    //     },

    // }, false)

    useEffect(() => {
        getMainArticles()
        getAllCategories()
    }, [])

    function getMainArticles() {
        fetch(`${BASE_URL}articles/${shortName}`)
            .then(res =>res.ok ? res.json() : [])
            .then(result => {
                setMainArticle(result)
                setArticleTitle(result.title)
                setArticleDescription(result.description)
                setArticleUrl(result.shortName)
                setArticleBody(result.body)
                setSelectedCategory(result.categoryID._id)
            })
    }

    function getAllCategories() {
        fetch(`${BASE_URL}category`)
            .then(res =>res.ok ? res.json() : [])
            .then(result => setCategories(result))
    }

    function selectCategory(event) {
        setSelectedCategory(event.target.value)
    }

    function addNewArticle(event) {
        event.preventDefault()

        if (articleCover === "") {
            return swal({
                title: "لطفا برای مقاله یک عکس انتخاب کنید",
                icon: 'error',
                buttons: "تایید"
            })
        }

        const formData = new FormData()
        formData.append("id", mainArticle._id)
        formData.append("title", articleTitle)
        formData.append("shortName", articleUrl)
        formData.append("description", articleDescription)
        formData.append("categoryID", selectedCategory)
        formData.append("cover", articleCover)
        formData.append("body", articleBody)

        fetch(`${BASE_URL}articles`, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token}`
            },
            body: formData
        }).then(res => {
            if (res.ok) {
                swal({
                    title: "مقاله با موفقیت اضافه شد.",
                    icon: "success",
                    buttons: "تایید"
                })
                navigate("/admin-dashboard/articles")
            } else {
                swal({
                    title: "اضافه مقاله دوره با خطا مواجه شد.",
                    icon: "error",
                    buttons: "تایید"
                })
            }
            return res.json()
        })
    }

    function saveAsDraft(event) {
        event.preventDefault()

        swal({
            title: "دقت کنید اگر مقاله را پیش نویس کنید، عکس مقاله دخیره نمی شود و بعدا باید برای آن  عکس انتخاب کنید",
            icon: "warning",
            buttons: ["لغو", "تایید"]
        }).then(result => {
            if (result) {
                const formData = new FormData()
                formData.append("id", mainArticle._id)
                formData.append("title", articleTitle)
                formData.append("shortName", articleUrl)
                formData.append("description", articleDescription)
                formData.append("categoryID", selectedCategory)
                formData.append("body", articleBody)

                fetch(`${BASE_URL}articles/draft`, {
                    method: 'POST',
                    headers: {
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token}`
                    },
                    body: formData
                }).then(res => {
                    if (res.ok) {
                        swal({
                            title: "مقاله با موفقیت پیش نویس شد.",
                            icon: "success",
                            buttons: "تایید"
                        })
                        navigate("/admin-dashboard/articles")
                    } else {
                        swal({
                            title: "اضافه مقاله دوره با خطا مواجه شد.",
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
            <div className='admin-page-title app-title'>ویرایش مقاله</div>
            <div className="home-content-edit">
                <div className="home-title">
                    <span>ویرایش مقاله پیش نویس</span>
                </div>
                <form className="form" onSubmit={addNewArticle}>
                    <div className="col-6">
                        <div className="name input">
                            <label className="input-title">عنوان</label>
                            <input
                                id='title'
                                type='text'
                                className="input-item"
                                value={articleTitle}
                                onChange={event => setArticleTitle(event.target.value)}
                                placeholder="لطفا نام مقاله را وارد کنید..."
                            />
                            <span className="error-message text-danger"></span>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="price input">
                            <label className="input-title">لینک</label>
                            <input
                                id='shortName'
                                className="input-item"
                                type="text"
                                value={articleUrl}
                                onChange={event => setArticleUrl(event.target.value)}
                                placeholder="لطفا لینک مقاله را وارد کنید..."
                            />
                            <span className="error-message text-danger"></span>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="number input">
                            <label className="input-title">چکیده</label>
                            <textarea
                                id='description'
                                className={`input-item description-height`}
                                value={articleDescription}
                                onChange={event => setArticleDescription(event.target.value)}
                                placeholder="لطفا یک چکیده از مقاله را در اینجا بنویسید..."
                            />
                            <span className="error-message text-danger"></span>
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="number input">
                            <label className="input-title">محتوا</label>
                            <CkEditor value={articleBody} setValue={setArticleBody} />
                            <span className="error-message text-danger"></span>
                        </div>
                    </div>
                    <div className="col-6">
                        <div className="number input">
                            <label className="input-title">دسته‌بندی مقاله</label>
                            <br />
                            <select onChange={selectCategory}>
                                <option value="-1">دسته بندی را انتخاب کنید</option>
                                {categories.map((category) => (
                                    <option value={category._id} selected={category._id == mainArticle.categoryID._id}>{category.title}</option>
                                ))}
                            </select>
                            <span className="error-message text-danger"></span>
                        </div>
                    </div>
                    <div className="col-12 col-md-6">
                        <div className="file number input mt-5">
                            <label className="input-title">عکس محصول</label>
                            <input type="file" id="file" onChange={event => {
                                setArticleCover(event.target.files[0])
                            }} />
                        </div>
                    </div>
                    <div className="col-12">
                        <div className="number input d-flex h-100 align-items-center justify-content-end">
                            <button
                                className={`p-2 m-2 rounded-3 ${(articleTitle.trim() && articleUrl.trim() && articleDescription.trim() && selectedCategory != -1 && articleBody != '') ? 'login-form__btn-success' : 'login-form__btn-error'} `} type="submit"
                                disabled={(!articleTitle.trim() || !articleUrl.trim() || !articleDescription.trim() || selectedCategory == -1 || articleBody == '')} onClick={saveAsDraft}
                            >
                                <RiDraftFill className="login-form__btn-icon"></RiDraftFill>
                                <span className="login-form__btn-text">پیش نویس</span>
                            </button>
                            <button
                                className={`p-2 rounded-3 ${(articleTitle.trim() && articleUrl.trim() && articleDescription.trim() && selectedCategory != -1 && articleBody != '' && articleCover != '') ? 'login-form__btn-success' : 'login-form__btn-error'} `} type="submit"
                                disabled={(!articleTitle.trim() || !articleUrl.trim() || !articleDescription.trim() || selectedCategory == -1 || articleBody == '' || articleCover == "")}
                            >
                                <FaSave className="login-form__btn-icon"></FaSave>
                                <span className="login-form__btn-text">افزودن</span>
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </>
    )
}
