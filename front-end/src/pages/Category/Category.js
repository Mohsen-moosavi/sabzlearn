import React, { useEffect, useState } from 'react'
import './Category.css'
import Footer from '../../components/Footer/Footer'
import CourseBox from '../../components/CourseBox/CourseBox'
import Pagination from '../../components/Pagination/Pagination'
import { BASE_URL } from '../../Utils/Variables/ApiVariables'
import { useParams } from 'react-router-dom'
import Filtering from '../../components/Filtering/Filtering'
import Search from '../../components/Search/Search'
import Header from '../../components/Header/Header'

export default function Category() {

    const { categoryName } = useParams()
    const [categorycourses, setCategoryCourses] = useState([])
    const [paginatedItems, setPaginatedItems] = useState([])
    const [filteredItems, setFilteredItems] = useState()
    const [searchedItems, setSearchedItems] = useState([])


    useEffect(() => {
        fetch(`${BASE_URL}courses/category/${categoryName}`)
            .then(res =>res.ok ? res.json() : [])
            .then(result => {
                setCategoryCourses(result)
                setFilteredItems(result)
                setSearchedItems(result)
            })
    }, [categoryName])

    return (
        <>
            <Header />

            <div className='container'>
                {
                    categorycourses.length !== 0 ? (
                            <section class="category">
                                <div class="courses-top-bar">
                                    <div class="courses-top-bar__right">

                                        <Filtering
                                            allItems={searchedItems}
                                            setFilteredItems={setFilteredItems}
                                        />
                                    </div>

                                    <div class="courses-top-bar__left">
                                        <Search
                                            items={categorycourses}
                                            setSearchedItems={setSearchedItems}
                                        />
                                    </div>
                                </div>

                                <div class="category-content">
                                    <div class="row">
                                        {
                                            paginatedItems.length === 0 ? (
                                                <div className='alert alert-danger' style={{ width: "95%", margin: '0 auto' }}>
                                                    هیچ دوره ای برای این مرتب سازی وجود ندارد.
                                                </div>
                                            ) : (
                                                paginatedItems.map(courseInfo => (
                                                    <div class="col-12 col-md-6 col-lg-4">
                                                        <CourseBox course={courseInfo} />
                                                    </div>
                                                ))

                                            )
                                        }
                                    </div>
                                </div>

                                <Pagination
                                    pathName={`/category-info/${categoryName}`}
                                    items={filteredItems}
                                    itemInEveryPageNumber={3}
                                    setPaginatedItems={setPaginatedItems}
                                />
                            </section>
                    ) : (
                        <div className='alert alert-danger mt-5' >
                            هنوز هیچ دوره ای برای این دسته بندی وجود ندارد.
                        </div>
                    )
                }
            </div>
            <Footer />
        </>
    )
}
