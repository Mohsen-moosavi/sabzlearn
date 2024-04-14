import React from 'react'
import { Link } from 'react-router-dom'
import './TicketBox.css'
import { FaEllipsisV } from 'react-icons/fa'

export default function TicketBox(props) {
  return (
    <Link class="ticket-content__box" to={`answer/${props._id}`}>
      <sapn class="ticket-content__link">
        {props.title}
      </sapn>
      <div className='ticket-content__details'>
        <div class="ticket-content__right">
            <span class="ticket-content__category">
              <FaEllipsisV  class="ticket-content__icon"/>
              {props.departmentSubID}
            </span>
            <span class="ticket-content__name">{props.user}</span>
        </div>
        <div class="ticket-content__left">
          <div class="ticket-content__left-right">
            <div class={`ticket-content__condition ${props.answer !== 0 ?
              "ticket-content__condition-answered" : 'ticket-content__condition-noanswered'}`}>
              <span class="ticket-content__condition-text">
                {
                  props.answer === 0 ? "پاسخ داده نشده" : "پاسخ داده شده"
                }
              </span>
            </div>
          </div>
          <div class="ticket-content__left-left">
            <span class="ticket-content__time">{props.createdAt.slice(0, 10)}</span>
          </div>
        </div>
      </div>

    </Link>
  )
}
