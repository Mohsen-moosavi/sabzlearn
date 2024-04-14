import React, { useContext, useEffect, useState } from 'react'
import './EditAccount.css'
import AuthContext from '../../../contexts/AuthContext';
import swal from 'sweetalert';

export default function EditAccount() {

    const authContext = useContext(AuthContext);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    useEffect(() => {
        setName(authContext.userInfos.name);
        setPhone(authContext.userInfos.phone);
        setUsername(authContext.userInfos.username);
        setEmail(authContext.userInfos.email);
    }, []);

    function editAccount(event) {
        event.preventDefault()

        const userNewInfos = {
            name,
            username,
            email,
            password,
            phone,
        };

        fetch(`http://localhost:4000/v1/users/`, {
            method: 'PUT',
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${JSON.parse(localStorage.getItem('user')).token}`
            },
            body: JSON.stringify(userNewInfos)
        }).then(res => {
            if (res.ok) {
                swal({
                    title: "اطلاعات اکانت شما با موفقیت ویرایش شد",
                    icon: 'success',
                    buttons: "تایید"
                })
            } else {
                swal({
                    title: "ویرایش اطلاعات اکانت شما با خطا مواجه شد",
                    icon: 'success',
                    buttons: "تایید"
                })
            }
        })
    }

    return (
        <div class="edit p-user-main">
            <form class="edit__form" action="#">
                <div class="edit__personal">
                    <div class="row">
                        <div class="col-12">
                            <label class="edit__label">شماره موبایل *</label>
                            <input
                                class="edit__input"
                                type="text"
                                value={phone}
                                onChange={(event) => setPhone(event.target.value)}
                                placeholder="لطفا شماره موبایل خود را وارد کنید"
                            />
                        </div>

                        <div class="col-12">
                            <label class="edit__label">نام و نام خانوادگی (نمایشی) *</label>
                            <input
                                class="edit__input"
                                type="text"
                                value={name}
                                onChange={(event) => setName(event.target.value)}
                                placeholder="لطفا نام نمایشی خود را وارد کنید"
                            />
                            <span class="edit__help">
                                اسم شما به این صورت در حساب کاربری و نظرات دیده خواهد شد.
                            </span>
                        </div>
                        <div class="col-12">
                            <label class="edit__label">نام کاربری *</label>
                            <input
                                class="edit__input"
                                type="text"
                                value={username}
                                onChange={(event) => setUsername(event.target.value)}
                                placeholder="لطفا نام نمایشی خود را وارد کنید"
                            />
                        </div>
                        <div class="col-12">
                            <label class="edit__label">آدرس ایمیل *</label>
                            <input
                                class="edit__input"
                                type="text"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}
                                placeholder="لطفا نام نمایشی خود را وارد کنید"
                            />
                        </div>
                    </div>
                </div>
                <div class="edit__password">
                    <span class="edit__password-title">تغییر گذرواژه</span>
                    <div class="row">
                        <div class="col-12">
                            <label class="edit__label">گذرواژه جدید</label>
                            <input
                                class="edit__input"
                                type="text"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                placeholder="تکرار گذرواژه جدید"
                            />
                        </div>
                    </div>
                </div>
                <button class="edit__btn" type="submit" onClick={editAccount}>
                    ذخیره تغییرات
                </button>
            </form>
        </div>
    )
}
