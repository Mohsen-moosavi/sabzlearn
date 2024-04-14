import React, { useEffect, useState } from 'react'
import './GlobalSearch.css'
import { useParams } from 'react-router-dom'
import { BASE_URL } from '../../Utils/Variables/ApiVariables'
import Footer from '../../components/Footer/Footer'
import SectionHeader from '../../components/SectionHeader/SectionHeader'
import CourseBox from '../../components/CourseBox/CourseBox'
import ArticleBox from '../../components/ArticleBox/ArticleBox'
import Header from '../../components/Header/Header'

export default function GlobalSearch() {

    const { searchWord } = useParams()

    const [searchedCourses, setSearchedCourses] = useState([])
    const [searchedArticles, setSearchedArticles] = useState([])

    useEffect(() => {
        fetch(`${BASE_URL}search/${searchWord}`)
            .then(res => res.json())
            .then(result => {
                setSearchedCourses(result.allResultCourses)
                setSearchedArticles(result.allResultArticles)
            })
    }, [])

    if (searchedArticles.length === 0 && searchedCourses.length === 0) {
        return (
            <>
                <Header />
                <div class="courses-content">
                    <div class="container">
                        <div className='alert alert-warning'>
                            موردی یافت نشد.
                        </div>
                    </div>
                </div>
                <Footer />
            </>
        )
    } else {
        return (
            <>
                <Header />
                <div class="courses-content">
                    <div class="container">
                        <div class="row g-4">
                            <SectionHeader
                                title={"دوره ها"}
                                description={"دوره های مطابق با جستجوی شما"}
                            />
                            {searchedCourses.length === 0 ? (
                                <div className='alert alert-warning'>
                                    هیچ دوه ای یافت نشد.
                                </div>
                            ) : (
                                searchedCourses.map(course => (
                                    <div class="col-12 col-md-6 col-lg-4">
                                        <CourseBox course={course} />
                                    </div>
                                ))
                            )}

                        </div>

                        <div class="row g-4">
                            <SectionHeader
                                title={"مقاله ها"}
                                description={"مقاله های مطابق با جستجوی شما"}
                            />
                            {searchedArticles.length === 0 ? (
                                <div className='alert alert-warning'>
                                    هیچ مقاله ای یافت نشد.
                                </div>
                            ) : (
                                searchedArticles.map(article => (
                                    <div class="col-12 col-md-6 col-lg-4">
                                        <ArticleBox {...article} />
                                    </div>
                                ))
                            )}

                        </div>
                    </div>
                </div>
                <Footer />
            </>
        )
    }

}
