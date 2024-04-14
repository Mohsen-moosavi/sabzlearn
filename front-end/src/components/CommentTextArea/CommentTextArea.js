import React, { useContext, useState } from 'react'
import "./CommentTextArea.css"
import AuthContext from '../../contexts/AuthContext'
import { BASE_URL } from '../../Utils/Variables/ApiVariables'
import swal from 'sweetalert'
import Input from '../Form/Inpit/Input'
import { requiredValidator } from '../../Utils/Validator/Rouls'
import useForm from '../../hooks/useForm'
import { Link } from 'react-router-dom'
import { FaCheck } from 'react-icons/fa'

export default function CommentTextArea({ courseShortName }) {

    const authContext = useContext(AuthContext)
    const [commentScore, setCommentScore] = useState(-1)

    const [formState, onInputHandler] = useForm({
        commentTextArea: {
            value: '',
            isValid: false
        }
    }, false)

    function sendNewComment(event) {

        const localStorageData = JSON.parse(localStorage.getItem("user")).token

        const newComment = {
            body: formState.initInputs.commentTextArea.value,
            score: commentScore,
            courseShortName
        }

        fetch(`${BASE_URL}comments`, {
            method: "POST",
            headers: {
                Authorization: `Bearer ${localStorageData}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify(newComment)
        })
            .then(res => res.json())
            .then(result => {
                swal({
                    title: "کامنت شما با موفقیت ثبت شد",
                    icon: "success",
                    buttons: "تایید"
                })
            })
    }


    if (authContext.isLoggedIn) {
        return (
            <>
                <div className="comments__rules">
                    <span className="comments__rules-title">قوانین ثبت دیدگاه</span>
                    <span className="comments__rules-item">
                        <FaCheck className="comments__rules-icon" />
                        اگر نیاز به پشتیبانی دوره دارید از قسمت پرسش سوال در قسمت نمایش
                        انلاین استفاده نمایید و سوالات مربوط به رفع اشکال تایید نخواهند شد
                    </span>
                    <span className="comments__rules-item">
                        <FaCheck className="comments__rules-icon" />
                        دیدگاه های نامرتبط به دوره تایید نخواهد شد.
                    </span>
                    <span className="comments__rules-item">
                        <FaCheck className="comments__rules-icon" />
                        سوالات مرتبط با رفع اشکال در این بخش تایید نخواهد شد.
                    </span>
                    <span className="comments__rules-item">
                        <FaCheck className="comments__rules-icon" />
                        از درج دیدگاه های تکراری پرهیز نمایید.
                    </span>
                </div>
                <div className="comments__respond">
                    <div className="comments__score">
                        <span className="comments__score-title">امتیاز شما</span>
                        <div className="col-12">
                            <select className="form-select form-control font-bold form-score" onChange={event => setCommentScore(event.target.value)}>
                                <option value="-1" className="form-control">
                                    امتیاز خود را انتخاب کنید
                                </option>
                                <option value="5">عالی</option>
                                <option value="4">خیلی خوب</option>
                                <option value="3">خوب</option>
                                <option value="2">ضعیف</option>
                                <option value="1">بد</option>
                            </select>
                        </div>
                    </div>
                    <div className="comments__respond-content">
                        <div className="comments__respond-title">دیدگاه شما *</div>
                        <Input
                            className="comments__content-textarea comments__score-input-respond"
                            id="commentTextArea"
                            element="textarea"
                            placeholder="نظر خود را بنویسید..."
                            onInputHandler={onInputHandler}
                            validations={[
                                requiredValidator()
                            ]}
                        />
                    </div>
                    <button
                        type="submit"
                        className="comments__respond-btn"
                        onClick={sendNewComment} disabled={!formState.isValidForm || commentScore == -1}
                    >
                        ارسال
                    </button>
                </div>
            </>
        )
    } else {
        return (
            <div className="alert alert-danger">
                برای ثبت کامنت باید
                <Link to="/login">لاگین کنید</Link>
            </div>
        )
    }

}

