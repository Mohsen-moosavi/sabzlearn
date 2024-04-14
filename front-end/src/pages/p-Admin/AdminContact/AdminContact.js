import React, { useEffect, useState } from 'react'
import "./AdminContact.css"
import DataTable from '../../../components/AdminDashboard/DataTable/DataTable'
import { BASE_URL } from '../../../Utils/Variables/ApiVariables'
import swal from 'sweetalert'

export default function AdminContact() {

  const [allContact , setAllContact] = useState([])

  useEffect(()=>{
    getAllContact()
  },[])

  function getAllContact(){
    fetch(`${BASE_URL}contact`)
    .then(res=>res.ok ?res.json() : [])
    .then(result=>setAllContact(result))
  }

  function showMessageBody(body){
    swal({
      title : body,
      buttons : 'تایید'
    })
  }

  function sendAnswerToContact(email){
    swal({
      title : "لطفا متن پاسخ را وارد کنید.",
      content : 'input',
      buttons : "فرستادن"
    }).then(result=>{
      if(result && result.trim().length){
        const answerInfo ={
          email,
          answer : result
        }

        fetch(`${BASE_URL}contact/answer`,{
          method : 'POST',
          headers :{
            Authorization : `Bearer ${JSON.parse(localStorage.getItem("user")).token}`,
            "Content-Type" : "application/json"
          },
          body : JSON.stringify(answerInfo)
        }).then(res=>{
          if (res.ok) {
            swal({
              title: "پاسخ با موفقیت فرستاده شد.",
              icon: "success",
              buttons: "تایید"
            })
            getAllContact()
          } else {
            swal({
              title: "پاسخ دادن به کاربر با خطا مواجه شد.",
              icon: "error",
              buttons: "تایید"
            })
          }
        })
      }
    })
  }

  function removeContact(contactID){
    swal({
      title: "آیا از حذف کامنت اطمینان دارید؟",
      icon: "warning",
      buttons: ["لغو", "تایید"]
    }).then(result => {
      if (result) {
        fetch(`${BASE_URL}contact/${contactID}`, {
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
            getAllContact()
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

  return (
    <>
    <div className='admin-page-title app-title'>پیغام ها</div>
      <DataTable title={"پیغام ها"}>
        <table className="table">
          <thead>
            <tr>
              <th>شناسه</th>
              <th>نام و نام خانوادگی</th>
              <th>ایمیل</th>
              <th>شماره تماس</th>
              <th>مشاهده</th>
              <th>پاسخ</th>
              <th>حذف</th>
            </tr>
          </thead>
          <tbody>
            {
              allContact.map((message, index) => (
                <tr key={message._id}>
                  <td className={message.answer == 1 ? "contact-answer" : "contact-noAnswer"}>{index + 1}</td>
                  <td>{message.name}</td>
                  <td>{message.email}</td>
                  <td>{message.phone}</td>
                  <td>
                    <button type='button' className='btn btn-primary edit-btn'
                    onClick={()=>showMessageBody(message.body)}>
                      مشاهده
                    </button>
                  </td>
                  <td>
                    <button type='button' className='btn btn-primary edit-btn'
                    onClick={()=>sendAnswerToContact(message.email)}>
                      پاسخ
                    </button>
                  </td>
                  <td>
                    <button type="button" className="btn btn-danger delete-btn"
                      onClick={()=>removeContact(message._id)}>
                      حذف
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
