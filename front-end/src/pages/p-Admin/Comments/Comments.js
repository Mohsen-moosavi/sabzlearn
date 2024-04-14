import React, { useEffect, useState } from 'react'
import DataTable from '../../../components/AdminDashboard/DataTable/DataTable'
import { BASE_URL } from '../../../Utils/Variables/ApiVariables'
import swal from 'sweetalert'

export default function Comments() {

    const [allComments, setAllComments] = useState([])

    useEffect(() => {
        getAllComments()
    }, [])

    function getAllComments() {
        fetch(`${BASE_URL}comments`)
            .then(res => res.ok ? res.json() : [])
            .then(result => setAllComments(result))
    }

    function removeCourse(commentID) {
        swal({
            title: "آیا از حذف کامنت اطمینان دارید؟",
            icon: "warning",
            buttons: ["لغو", "تایید"]
        }).then(result => {
            if (result) {
                fetch(`${BASE_URL}comments/${commentID}`, {
                    method: "DELETE",
                    headers: {
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token}`
                    }
                }).then(res => {
                    if (res.ok) {
                        swal({
                            title: "کامنت با موفقیت حذف شد.",
                            icon: "success",
                            buttons: "تایید"
                        })
                        getAllComments()
                    } else {
                        swal({
                            title: "حذف کردن کامنت با خطا مواجه شد.",
                            icon: "error",
                            buttons: "تایید"
                        })
                    }
                })
            }
        })
    }

    function showCommentBody(commentBody) {
        swal({
            title: commentBody,
            buttons: 'تایید'
        })
    }

    function banUser(creatorID) {
        swal({
            title: "آیا از بن کاربر اطمینان دارید؟",
            icon: "warning",
            buttons: ["لغو", "تایید"]
        }).then(result => {
            if (result) {
                fetch(`${BASE_URL}users/ban/${creatorID}`, {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token}`
                    }
                }).then(res => {
                    if (res.ok) {
                        swal({
                            title: "کاربر با موفقیت بن شد.",
                            icon: "success",
                            buttons: "تایید"
                        })
                        getAllComments()
                    } else {
                        swal({
                            title: "بن کردن کاربر با خطا مواجه شد.",
                            icon: "error",
                            buttons: "تایید"
                        })
                    }
                    return res.json()
                })
            }
        })
    }

    function answerToComment(commentID) {
        swal({
            title: "پاسخ مورد نظر را وارد کنید.",
            content: "input",
            buttons: "فرستادن"
        }).then(answerText => {
            if (answerText) {

                const answerBody = {
                    body: answerText
                }

                fetch(`${BASE_URL}comments/answer/${commentID}`, {
                    method: 'POST',
                    headers: {
                        "Content-Type": 'application/json',
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token}`
                    },
                    body: JSON.stringify(answerBody)
                }).then(res => {
                    if (res.ok) {
                        swal({
                            title: "پاسخ با موفقیت ثبت شد.",
                            icon: "success",
                            buttons: "تایید"
                        })
                        getAllComments()
                    } else {
                        swal({
                            title: "ارسال پاسخ با خطا مواجه شد.",
                            icon: "error",
                            buttons: "تایید"
                        })
                    }
                })
            }
        })
    }

    function acceptComment(commentID) {
        swal({
            title: "آیا از تایید کامنت اطمینان دارید؟",
            icon: "warning",
            buttons: ["لغو", "تایید"]
        }).then(result => {
            if (result) {
                fetch(`${BASE_URL}comments/accept/${commentID}`, {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token}`
                    }
                }).then(res => {
                    if (res.ok) {
                        swal({
                            title: "کامنت با موفقیت تایید شد.",
                            icon: "success",
                            buttons: "تایید"
                        })
                        getAllComments()
                    } else {
                        swal({
                            title: "تایید کردن کامنت با خطا مواجه شد.",
                            icon: "error",
                            buttons: "تایید"
                        })
                    }
                })
            }
        })
    }

    function rejectComment(commentID) {
        swal({
            title: "آیا از رد کامنت اطمینان دارید؟",
            icon: "warning",
            buttons: ["لغو", "تایید"]
        }).then(result => {
            if (result) {
                fetch(`${BASE_URL}comments/reject/${commentID}`, {
                    method: "PUT",
                    headers: {
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token}`
                    }
                }).then(res => {
                    if (res.ok) {
                        swal({
                            title: "کامنت با موفقیت رد شد.",
                            icon: "success",
                            buttons: "تایید"
                        })
                        getAllComments()
                    } else {
                        swal({
                            title: "رد کردن کامنت با خطا مواجه شد.",
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
            <div className='admin-page-title app-title'>کامنت ها</div>
            <DataTable title={"کامنت ها"}>
                <table className="table">
                    <thead>
                        <tr>
                            <th>شناسه</th>
                            <th>کاربر</th>
                            <th>دوره</th>
                            <th>امتیاز</th>
                            <th>مشاهده</th>
                            <th>پاسخ</th>
                            <th>تایید</th>
                            <th>حذف</th>
                            <th>بن</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            allComments?.map((comment, index) => (
                                <tr key={comment._id}>
                                    <td className={comment.answer == 1 ? 'comment-answer' : 'comment-noanswer'}>{index + 1}</td>
                                    <td>{comment.creator?.name}</td>
                                    <td>{comment.course}</td>
                                    <td>{comment.score}</td>
                                    <td>
                                        <button type="button" className="btn btn-primary edit-btn" onClick={() => showCommentBody(comment.body)}>
                                            مشاهده
                                        </button>
                                    </td>
                                    <td>
                                        <button type="button" className="btn btn-primary edit-btn" onClick={() => answerToComment(comment._id)}>
                                            پاسخ
                                        </button>
                                    </td>
                                    {
                                        comment.answer === 0 ? (
                                            <td>
                                                <button type="button" className="btn btn-primary edit-btn" onClick={() => acceptComment(comment._id)}>
                                                    تایید
                                                </button>
                                            </td>
                                        ) : (
                                            <td>
                                                <button type="button" className="btn btn-warning edit-btn" onClick={() => rejectComment(comment._id)}>
                                                    {` رد `}
                                                </button>
                                            </td>
                                        )
                                    }
                                    <td>
                                        <button type="button" className="btn btn-danger delete-btn"
                                            onClick={() => removeCourse(comment._id)}>
                                            حذف
                                        </button>
                                    </td>
                                    <td>
                                        <button type="button" className="btn btn-primary edit-btn" onClick={() => banUser(comment.creator?._id)}>
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
