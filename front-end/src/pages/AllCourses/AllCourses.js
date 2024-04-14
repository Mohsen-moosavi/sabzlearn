import React, { useEffect, useState } from 'react'
import Footer from '../../components/Footer/Footer'
import "./All-Courses.css"
import Pagination from '../../components/Pagination/Pagination'
import BreadCrumb from '../../components/BreadCrumb/BreadCrumb'
import CourseBox from '../../components/CourseBox/CourseBox'
import { BASE_URL } from '../../Utils/Variables/ApiVariables'
import Filtering from '../../components/Filtering/Filtering'
import Search from '../../components/Search/Search'
import Header from '../../components/Header/Header'

export default function AllCourses() {

    const [allCourses, setAllCourses] = useState([])
    const [paginatedItems, setPaginatedItems] = useState([])
    const [filteredItems, setFilteredItems] = useState([])
    const [searchedItems, setSearchedItems] = useState([])

    useEffect(() => {
        fetch(`${BASE_URL}courses`)
            .then(res =>res.ok ? res.json() : [])
            .then(result => {
                setAllCourses(result)
                setFilteredItems(result)
                setSearchedItems(result)
            })
    }, [])

    return (
        <>
            <Header />
            <div className='container'>


                <BreadCrumb
                    links={[
                        { id: 1, title: "خانه", to: "/" },
                        { id: 2, title: "تمامی دوره ها", to: "/courses" },
                    ]} />

                <section className="all-courses">

                        <div class="courses-top-bar">

                            <div class="courses-top-bar__right">
                                <Filtering
                                    allItems={searchedItems}
                                    setFilteredItems={setFilteredItems}
                                />
                            </div>

                            <div class="courses-top-bar__left">
                                <Search
                                    items={allCourses}
                                    setSearchedItems={setSearchedItems}
                                />
                            </div>

                        </div>

                        <div className="courses-content mt-5">
                            <div className="row g-5">

                                {
                                    paginatedItems.length === 0 ? (
                                        <div className='alert alert-danger'>
                                            هیچ دوره ای برای این مرتب سازی وجود ندارد.
                                        </div>
                                    ) : (
                                        paginatedItems.map(course => (
                                            <div class="col-12 col-md-6 col-lg-4">
                                                <CourseBox course={course} key={course._id} />
                                            </div>
                                        ))
                                    )
                                }
                            </div>
                        </div>
                </section>

                <Pagination
                    pathName={'/courses'}
                    items={filteredItems}
                    itemInEveryPageNumber={3}
                    setPaginatedItems={setPaginatedItems}
                />

            </div>
            <Footer />

        </>
    )
}
