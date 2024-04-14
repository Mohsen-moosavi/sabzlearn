import React, { useEffect, useState } from 'react'
import SectionHeader from '../SectionHeader/SectionHeader'
import 'swiper/css';
import 'swiper/css/pagination';
import CourseBox from '../CourseBox/CourseBox';
import { BASE_URL } from '../../Utils/Variables/ApiVariables';
import { Swiper, SwiperSlide } from 'swiper/react';

export default function PresellCourses() {

    const [presellCourses, setPresellCourses] = useState([])


    useEffect(() => {
        fetch(`${BASE_URL}courses/presell`)
            .then(res =>res.ok ? res.json() : [])
            .then(result => setPresellCourses(result))
    }, [])

    return (
        <section class="presell" id='presell-section'>
            <div class="container">
                <SectionHeader
                    title={"پیش فروش"}
                    description={'دوره های در حال'}
                />
                <Swiper
                    slidesPerView={3}
                    spaceBetween={30}
                    loop={true}
                    pagination={{
                        clickable: true,
                    }}
                    breakpoints={{
                        0:{
                            slidesPerView: 1,
                            spaceBetween: 0,
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 30,
                          },
                          992: {
                            slidesPerView: 3,
                            spaceBetween: 30,
                          }
                    }}
                    className="mySwiper"
                >
                    {
                        presellCourses.map(course => (
                            <SwiperSlide key={course._id}>
                                <CourseBox course={course} slideMode={true} />
                            </SwiperSlide>
                        ))
                    }

                </Swiper>
            </div>
        </section>
    )
}
