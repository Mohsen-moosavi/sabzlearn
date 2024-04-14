import React, { useEffect, useState } from 'react'
import './AllTicket.css'
import { Link } from 'react-router-dom'
import { BASE_URL } from '../../../Utils/Variables/ApiVariables'
import TicketBox from '../../../components/UserPanel/TicketBox'
import { HiOutlineTicket } from 'react-icons/hi'
import { GiTicket } from 'react-icons/gi'

export default function AllTicket() {

    const [tickets, setTickets] = useState([])

    useEffect(() => {
        fetch(`${BASE_URL}tickets/user`, {
            headers: {
                Authorization: `Bearer ${JSON.parse(localStorage.getItem("user")).token
                    }`,
            },
        })
            .then((res) => res.json())
            .then((data) => {
                setTickets(data);
            });
    }, [])

    return (
        <div class="ticket p-user-main">
            <div class="ticket-header">
                <span class="ticket-header__title app-title">همه تیکت ها</span>
                <Link class="ticket-header__link" to="send-ticket">
                    ارسال تیکت جدید
                </Link>
            </div>
            <div class="ticket-boxes">
                <div className="row g-5">
                    <div className="col-6 col-sm-4 col-lg">
                        <div class="ticket-boxes__item">
                            <GiTicket class="ticket-boxes__img" />
                            <span class="ticket-boxes__condition">باز</span>
                            <span class="ticket-boxes__value">0</span>
                        </div>
                    </div>
                    <div className="col-6 col-sm-4 col-lg">
                        <div class="ticket-boxes__item ticket-boxes__closed ticket-boxes__custom">
                            <GiTicket class="ticket-boxes__img" />
                            <span class="ticket-boxes__condition">بسته</span>
                            <span class="ticket-boxes__value ticket-boxes__value-closed">
                                2
                            </span>
                        </div>
                    </div>
                    <div className="col-6 col-sm-4 col-lg">
                        <div class="ticket-boxes__item ticket-boxes__answered ticket-boxes__custom">
                            <GiTicket class="ticket-boxes__img" />
                            <span class="ticket-boxes__condition">پاسخ داده شده</span>
                            <span class="ticket-boxes__value ticket-boxes__value-answered">
                                1
                            </span>
                        </div>
                    </div>
                    <div className="col-6 col-sm-4 col-lg">
                        <div class="ticket-boxes__item ticket-boxes__finished ticket-boxes__custom">
                            <GiTicket class="ticket-boxes__img" />
                            <span class="ticket-boxes__condition">پایان یافته</span>
                            <span class="ticket-boxes__value ticket-boxes__value-finished">
                                1
                            </span>
                        </div>
                    </div>
                    <div className="col-6 col-sm-4 col-lg">
                        <div class="ticket-boxes__item">
                            <GiTicket class="ticket-boxes__img" />
                            <span class="ticket-boxes__condition">همه</span>
                            <span class="ticket-boxes__value">2</span>
                        </div>
                    </div>
                </div>





            </div>
            {/* <div class="ticket-filter">
                    <form action="#" class="ticket-filter__form">
                        <select class="ticket-filter__select">
                            <option class="ticket-filter__option" value="">
                                همه
                            </option>
                            <option class="ticket-filter__option" value="">
                                فرستاده شده
                            </option>
                            <option class="ticket-filter__option" value="">
                                دریافتی
                            </option>
                        </select>
                        <select class="ticket-filter__select">
                            <option class="ticket-filter__option" value="">
                                همه
                            </option>
                            <option class="ticket-filter__option" value="">
                                باز
                            </option>
                            <option class="ticket-filter__option" value="">
                                بسته
                            </option>
                            <option class="ticket-filter__option" value="">
                                پاسخ داده شده
                            </option>
                            <option class="ticket-filter__option" value="">
                                پایان یافته
                            </option>
                        </select>
                        <select class="ticket-filter__select">
                            <option class="ticket-filter__option" value="">
                                تاریخ پاسخ
                            </option>
                            <option class="ticket-filter__option" value="">
                                تاریخ ایجاد
                            </option>
                        </select>
                        <button class="ticket-filter__btn" type="submit">
                            اعمال
                        </button>
                    </form>
                </div> */}
            <div class="ticket-content">
                {/* <span class="ticket-content__title">نمایش 1 تیکت</span> */}

                {
                    tickets.length > 0 ?
                        tickets.map(ticket => (
                            <TicketBox {...ticket} />
                        )) :
                        (
                            <div className='alert alert-warning'>
                                تا کنون تیکتی ارسال نکرده اید.
                            </div>
                        )
                }
            </div>
        </div>
    )
}
