import React from 'react'
import './Services.css'
import { Link } from 'react-router-dom'

export default function Services() {
    return (
        <section class="services">
            <div class="container">
                <div class="row g-2 g-md-4">
                    <div class="col-3  d-none d-sm-block">
                        <div class="service service--article service--vertical">
                            <Link to={'/articles/1'}>
                                <div class="service__shadow">
                                    <h4 class="service__title">ارتقای دانش با<br /><span class="service__bold-title">مقالات
                                        سایت</span></h4>
                                </div>
                            </Link>
                        </div>
                    </div>
                    <div class="col-sm-9 col-12">
                        <div class="row g-2 g-md-4">
                            <div class="col-5">
                                <div class="service service--security">
                                    <Link to={'/category-info/security/1'}>
                                        <div class="service__shadow">
                                            <h4 class="service__title">صفر تا صد<br /><span
                                                class="service__bold-title">امنیت...</span></h4>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                            <div class="col-7">
                                <div class="service service--front-end">
                                    <Link to={"/category-info/frontend/1"}>
                                        <div class="service__shadow">
                                            <h4 class="service__title">متخصص <br /><span class="service__bold-title">فرانت
                                                اند</span> شو...</h4>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                            <div class="col-7">
                                <div class="service service--back-end">
                                    <Link to={'/category-info/backend/1'}>
                                        <div class="service__shadow">
                                            <h4 class="service__title">بهترین دوره های <br /><span
                                                class="service__bold-title">بک
                                                اند...</span></h4>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                            <div class="col-5">
                                <div class="service service--soft-skill">
                                    <Link to={"/category-info/softskills/1"}>
                                        <div class="service__shadow">
                                            <h4 class="service__title">ارتقای <br /><span class="service__bold-title">مهارت
                                                های
                                                نرم...</span></h4>
                                        </div>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}
