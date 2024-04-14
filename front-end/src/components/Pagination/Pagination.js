import React, { useEffect } from 'react'
import "./Pagination.css"
import { Link, useNavigate, useParams } from 'react-router-dom'
import { FaLongArrowAltLeft, FaLongArrowAltRight } from 'react-icons/fa'

export default function Pagination({ items, itemInEveryPageNumber, pathName, setPaginatedItems }) {

    const navigate = useNavigate()
    const { page } = useParams()
    const paginationBtnCount = Math.ceil(items.length / itemInEveryPageNumber)

    useEffect(() => {

        const endIndex = page * itemInEveryPageNumber;
        const startIndex = endIndex - itemInEveryPageNumber;
        const paginatedItems = items.slice(startIndex, endIndex)
        setPaginatedItems(paginatedItems)
        if(page > paginationBtnCount) {
            navigate(`${pathName}/1`)
        }
    }, [items, page])


    return (
        <div class="courses-pagination">
            <ul class="courses__pagination-list">
                {
                    !(page == 1) && (
                        <li class="courses__pagination-item">
                            <Link to={`${pathName}/${page - 1}`} class="courses__pagination-link">
                                <FaLongArrowAltRight class="courses__pagination-icon"></FaLongArrowAltRight>
                            </Link>
                        </li>
                    )
                }

                {Array.from(Array(paginationBtnCount)).map((i, index) => (
                    <li class="courses__pagination-item">
                        <Link to={`${pathName}/${index + 1}`} class={`courses__pagination-link ${index + 1 == page ? "courses__pagination-link--active" : ""}`}>
                            {index + 1}
                        </Link>
                    </li>
                ))}
                {
                    !(page == paginationBtnCount) && (
                        <li class="courses__pagination-item">
                            <Link to={`${pathName}/${Number(page) + 1}`} class="courses__pagination-link">
                                <FaLongArrowAltLeft class="courses__pagination-icon"></FaLongArrowAltLeft>
                            </Link>
                        </li>
                    )
                }

            </ul>
        </div>
    )
}
