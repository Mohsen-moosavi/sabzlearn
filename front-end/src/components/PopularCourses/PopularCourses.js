import React, { useEffect, useState } from 'react'
import SectionHeader from './../SectionHeader/SectionHeader'
import { Swiper, SwiperSlide } from 'swiper/react';
import { BASE_URL } from '../../Utils/Variables/ApiVariables';
import 'swiper/css';
import 'swiper/css/pagination';
import CourseBox from '../CourseBox/CourseBox';

export default function PopularCourses() {

    const [popularCourses, setPopularCourses] = useState([])


    useEffect(() => {
        fetch(`${BASE_URL}courses/popular`)
            .then(res =>res.ok ? res.json() : [])
            .then(result => setPopularCourses(result))
    }, [])

    return (
        <section class="presell" id='popular-section'>
            <div class="container">
            <SectionHeader title={'محبوب'} description={"دوره های"} />
                <Swiper
                    slidesPerView={3}
                    spaceBetween={30}
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
                            spaceBetween: 40,
                          }
                    }}
                    className="mySwiper"
                >
                    {
                        popularCourses.map(course => (
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
