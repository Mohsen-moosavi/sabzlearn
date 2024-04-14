import React, { useEffect, useState } from 'react'
import './AllArticles.css'
import Footer from '../../components/Footer/Footer'
import BreadCrumb from '../../components/BreadCrumb/BreadCrumb'
import { BASE_URL } from '../../Utils/Variables/ApiVariables'
import Pagination from '../../components/Pagination/Pagination'
import ArticleBox from '../../components/ArticleBox/ArticleBox'
import Header from '../../components/Header/Header'

export default function AllArticles() {

    const [allArticles, setAllArticles] = useState([])
    const [paginatedArticles, setPaginatedArticles] = useState([])

    useEffect(() => {
        fetch(`${BASE_URL}articles`)
            .then(res => res.ok ? res.json() : [])
            .then(result => {setAllArticles(result.filter(article => article.publish === 1))})
    }, [])

    return (
        <>
            <Header />
            <div className='container'>
                <BreadCrumb
                    links={[
                        { id: 1, title: "خانه", to: '/' },
                        { id: 2, title: "مقالات سایت", to: '/articles/1' }
                    ]} />

                {
                    allArticles.length === 0 ? (
                        <div className='alert alert-warning'>هنوز مقاله ای وجود ندارد</div>
                    ) : (
                        <>
                            <section className="articles mt-5">
                                <div className="articles-content">
                                    <div className="container">
                                        <div className="row g-4">
                                            {
                                                paginatedArticles.map(article => (
                                                    <div class="col-12 col-md-6 col-lg-4">
                                                        <ArticleBox {...article} />
                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                </div>
                            </section>

                            <Pagination
                                items={allArticles}
                                pathName={'/articles'}
                                itemInEveryPageNumber={3}
                                setPaginatedItems={setPaginatedArticles}
                            />ّ
                        </>
                    )
                }
            </div>

            <Footer />
        </>
    )
}
