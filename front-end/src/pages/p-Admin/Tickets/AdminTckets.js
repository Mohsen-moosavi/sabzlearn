import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../../../Utils/Variables/ApiVariables';
import swal from 'sweetalert';
import DataTable from '../../../components/AdminDashboard/DataTable/DataTable';

export default function AdminTckets() {

    const [tickets, setTickets] = useState([])

    useEffect(() => {
        getAllTickets()
    }, [])

    function getAllTickets() {
        fetch(`${BASE_URL}tickets`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token
                    }`,
            },
        })
            .then((res) =>res.ok ? res.json() : [])
            .then((data) => {
                setTickets(data);
            })
    }

    const showTicketBody = (body) => {
        swal({
            title: body,
            buttons: "تایید",
        });
    };

    function setAnswerToTicket(ticketID) {
        swal({
            title: 'لطفا پاسخ مد نظر خود را بنویسید.',
            content: 'input',
            buttons: 'ارسال پاسخ'
        }).then(value => {
            if (value) {
                const ticketAnswerInfos = {
                    ticketID,
                    body: value,
                }

                fetch(`${BASE_URL}tickets/answer`, {
                    method: "POST",
                    headers: {
                        Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token
                            }`,
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(ticketAnswerInfos),
                }).then((res) => {
                    if (res.ok) {
                        swal({
                            title: "پاسخ مورد نظر با موفقیت ثبت شد",
                            icon: "success",
                            buttons: "تایید",
                        });
                        getAllTickets()
                    } else {
                        swal({
                            title: "ثبت پاسخ شما با مشکل مواجه شد.",
                            icon: "error",
                            buttons: "تایید",
                        })
                    }
                })
            }
        })
    }

    return (
        <>
    <div className='admin-page-title app-title'>تیکت ها</div>
            <DataTable title="تیکت‌ها">
                <table class="table">
                    <thead>
                        <tr>
                            <th>شناسه</th>
                            <th>کاربر</th>
                            <th>عنوان</th>
                            <th>نوع تیکت</th>
                            <th>دوره</th>
                            <th>اولویت</th>
                            <th>مشاهده</th>
                            <th>پاسخ</th>
                        </tr>
                    </thead>
                    <tbody>
                        {tickets.map((ticket, index) => (
                            <tr key={ticket._id}>
                                <td className={`${ticket.answer == 1 ? 'datatable__ticket-answer' : 'datatable__ticket-noanswer'}`}>
                                    {index + 1}
                                </td>
                                <td>{ticket.user}</td>
                                <td>{ticket.title}</td>
                                <td>{ticket.departmentSubID}</td>
                                <td>{ticket.course ? ticket.course : "---"}</td>
                                <td>
                                    {ticket.priority === 1 && "بالا"}
                                    {ticket.priority === 2 && "متوسط"}
                                    {ticket.priority === 3 && "کم"}
                                </td>
                                <td>
                                    <button
                                        type="button"
                                        class="btn btn-primary edit-btn"
                                        onClick={() => showTicketBody(ticket.body)}
                                    >
                                        مشاهده
                                    </button>
                                </td>
                                <td>
                                    <button
                                        type="button"
                                        class="btn btn-primary edit-btn"
                                        onClick={() => setAnswerToTicket(ticket._id)}
                                    >
                                        پاسخ
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </DataTable>
        </>
    )
}
