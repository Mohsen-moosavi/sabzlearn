import React, { useEffect, useState } from 'react'
import './AnswerTicket.css'
import { Link, useParams } from 'react-router-dom'
import { BASE_URL } from '../../../Utils/Variables/ApiVariables'
import { GiTicket } from 'react-icons/gi'
import { FaPlus } from 'react-icons/fa'

export default function AnswerTicket() {

    const { ticketID } = useParams()

    const [ticketInfo, setTicketInfo] = useState({})

    useEffect(() => {
        fetch(`${BASE_URL}tickets/answer/${ticketID}`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token
                    }`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setTicketInfo(data);
            });
    }, [])

    return (
            <div class="ticket p-user-main">
                <div class="ticket-header">
                    <span class="ticket-header__title">همه تیکت ها</span>
                    <Link class="ticket-header__link" to="/my-account/tickets/send-ticket">
                        ارسال تیکت جدید
                    </Link>
                </div>
                <div class="ticket-top">
                    <div class="ticket-top__right">
                        <a class="ticket-top__link" href="#">
                            <GiTicket  class="ticket-top__icon"/>
                        </a>
                    </div>
                    <div class="ticket-top__left">
                        <span class="ticket-top__title">تیکت تست</span>
                    </div>
                </div>
                <div class="ticket-send">
                    <div class="ticket-send__title">
                        <span class="ticket-send__title-text">
                            <FaPlus class="ticket-send__title-icon"></FaPlus>
                            تیکت شما
                        </span>
                    </div>
                    <div class="ticket-send__answer">
                        <div class="ticket-send__answer-box">
                            <p class="ticket-send__answer-text">{ticketInfo.ticket}</p>
                        </div>
                        <div class="ticket-send__answer-bottom">
                            <span class="ticket-send__answer-name ticket-send__answer-span">
                                محمد امین سعیدی راد
                            </span>
                            <span class="ticket-send__answer-date ticket-send__answer-span">
                                2022-11-29
                            </span>
                            <span class="ticket-send__answer-time ticket-send__answer-span">
                                14:28
                            </span>
                        </div>
                    </div>

                    {ticketInfo.answer !== null  && (
                        <>
                            <div class="ticket-send__answer-title">
                                <span class="ticket-send__answer-title-text">
                                    <FaPlus  class="ticket-send__title-icon"></FaPlus>
                                    پاسخ ها
                                </span>
                            </div>
                            <div class="ticket-send__answer-user">
                                <div class="ticket-send__answer-user-box">
                                    <p class="ticket-send__answer-user-text">{ticketInfo.answer}</p>
                                </div>
                                <div class="ticket-send__answer-user-bottom">
                                    <span class="ticket-send__answer-user-name ticket-send__answer-user-span">
                                        محمد امین سعیدی راد
                                    </span>
                                    <span class="ticket-send__answer-user-date ticket-send__answer-user-span">
                                        2022-11-29
                                    </span>
                                    <span class="ticket-send__answer-user-time ticket-send__answer-user-span">
                                        14:28
                                    </span>
                                </div>
                            </div>
                        </>
                    )}
                </div>
            </div>
    )
}
