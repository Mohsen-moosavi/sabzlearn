import React, { useEffect, useState } from 'react'
import './Orders.css'
import { BASE_URL } from '../../../Utils/Variables/ApiVariables'

export default function Orders() {

  const [orders, setOrders] = useState([])

  useEffect(() => {
    fetch(`${BASE_URL}orders`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
      }
    }).then(res =>res.ok ? res.json() : [])
      .then(result => setOrders(result))
  }, [])

  return (
    <>
    {
      orders.length ? (
        <div class="p-user-main">
        <table class="order__table">
          <thead class="order__table-header">
            <tr class="order__table-header-list">
              <th class="order__table-header-item">شناسه</th>
              <th class="order__table-header-item">تاریخ</th>
              <th class="order__table-header-item">وضعیت</th>
              <th class="order__table-header-item">دوره</th>
              <th class="order__table-header-item">مبلغ</th>
            </tr>
          </thead>
          <tbody class="order__table-body">
            {orders.map((order, index) => (
              <tr class="order__table-body-list">
                <td class="order__table-body-item">
                  <a href="#" class="order__table-body-link">
                    {index + 1}
                  </a>
                </td>
                <td class="order__table-body-item">{order?.createdAt.slice(0, 10)}</td>
                <td class="order__table-body-item">تکمیل شده</td>
                <td class="order__table-body-item">
                  {order?.course.name}
                </td>
                <td class="order__table-body-item">
                  {order.price}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      ):(
        <div className='alert alert-warning'>شما هنوز در هیچ دوره ای ثبت نام نکرده اید </div>
      )
    }

    </>
  )
}
