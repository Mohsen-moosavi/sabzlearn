import React, { useEffect, useState } from 'react'
import { BASE_URL } from '../../../Utils/Variables/ApiVariables'
import PanelItem from '../../../components/AdminDashboard/PanelItem/PanelItem'
import DataTable from '../../../components/AdminDashboard/DataTable/DataTable'
import './IndexDashboard.css'

export default function Index() {

  const [infos, setInfos] = useState([])
  const [lastRegisteredUsers, setLastRegisteredUsers] = useState([])

  useEffect(() => {
    fetch(`${BASE_URL}infos/p-admin`, {
      headers: {
        Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
      }
    }).then(res =>res.ok ? res.json() : [])
      .then(result => {
        setInfos(result.infos)
        setLastRegisteredUsers(result.lastUsers)
      })
  }, [])

  return (
    <>
        <div class="home-panel">
            {
              infos.map(item => (
                <PanelItem {...item} />
              ))
            }

        </div>

        <DataTable title="افراد اخیرا ثبت نام شده">
          <table className="table">
            <thead>
              <tr>
                <th>شناسه</th>
                <th>نام و نام خانوادگی</th>
                <th>ایمیل</th>
              </tr>
            </thead>
            <tbody>
              {lastRegisteredUsers.map((user, index) => (
                <tr>
                  <td>{index + 1}</td>
                  <td>{user.name}</td>
                  {/* <td>09123443243</td> */}
                  <td>{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </DataTable>
    </>
  )
}
