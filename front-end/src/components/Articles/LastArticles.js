import React, { useEffect, useState } from 'react'
import SectionHeader from '../SectionHeader/SectionHeader'
import ArticleBox from '../ArticleBox/ArticleBox'
import { BASE_URL } from '../../Utils/Variables/ApiVariables'
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';

export default function LastArticles() {

    const [articles, setArticles] = useState([])

    useEffect(() => {
        fetch(`${BASE_URL}articles`)
            .then(res => res.ok ? res.json() : [])
            .then(result => setArticles(result))
    }, [])

    return (
        <section class="articles" id='article-section'>
            <div class="container">
                <SectionHeader
                    title={"مقاله ها"}
                    description={"جدید ترین"}
                    btnMore={"همه مقاله ها"}
                    btnHref={"/articles/1"}
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
                            spaceBetween: 20,
                        },
                        768: {
                            slidesPerView: 2,
                            spaceBetween: 0,
                          },
                          992: {
                            slidesPerView: 3,
                            spaceBetween: 40,
                          }
                    }}
                    className="mySwiper"
                >
                    {
                         [...articles.filter(article => article.publish === 1)].reverse().slice(0, 4).map(article => (
                            <SwiperSlide key={article._id}>
                                <ArticleBox {...article} key={article._id} slideMode={true} />
                            </SwiperSlide>
                        ))
                    }

                </Swiper>

                {/* <div class="articles__content">
                    <div class="row">
                        {
                            [...articles.filter(article => article.publish === 1)].reverse().slice(0, 3).map((article) => (
                                <ArticleBox {...article} key={article._id} />
                            ))
                        }
                    </div>
                </div> */}
            </div>
        </section>
    )
}
