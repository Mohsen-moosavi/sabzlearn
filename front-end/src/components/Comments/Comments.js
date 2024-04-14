import React from 'react'
import "./Comments.css"
import Pagination from '../Pagination/Pagination'
import { useLocation } from 'react-router-dom'
import { FaComment } from 'react-icons/fa'

export default function Comments({ comments }) {

    if (comments.length === 0) {
        return (<div className='comment-alert alert alert-warning'>
            هیچ کامنتی یافت نشد
        </div>)
    } else {
        return (
            <div className='comments-text'>
                <div className='comments-text__title'>
                    <FaComment className='comments-text__title-icon'></FaComment>
                    <span className='comments-text__title-text'>نظرات</span>
                </div>

                <div className='comment-text__container'>
                    {
                        comments.map(comment => (
                            <div className='comment-text__item'>
                                <div className='commets-text__item-header'>
                                    <div className='commets-text__item-header-right'>
                                        <span className='comments-text__item-header-username'>
                                            {comment.creator.name}
                                        </span>
                                        <span className='comments-text__item-header-userrole'>
                                            {comment.creator.role === 'ADMIN' ? 'مدیر' : 'خریدار محصول'}
                                        </span>
                                        <span className='comments-text__item-header-date'>
                                            {comment.createdAt?.slice(0, 10)}
                                        </span>
                                    </div>
                                    <div className='commets-text__item-header-left'>
                                        <button className='commets-text__item-header-answere'>پاسخ</button>
                                    </div>
                                </div>
                                <div className='commets-text__item-body'>
                                    <p className='commets-text__item-body-text'>
                                        {comment.body}
                                    </p>
                                </div>
                                {
                                    comment.answerContent && (
                                        <div className='comment-text__item'>
                                            <div className='commets-text__item-header'>
                                                <div className='commets-text__item-header-right'>
                                                    <span className='comments-text__item-header-username'>
                                                        {comment.answerContent.creator.name}
                                                    </span>
                                                    <span className='comments-text__item-header-userrole'>
                                                        {comment.answerContent.creator.role === 'ADMIN' ? 'مدیر' : 'خریدار محصول'}
                                                    </span>
                                                    <span className='comments-text__item-header-date'>
                                                        {comment.answerContent.createAt && comment.answerContent.createAt.slice(0, 10)}
                                                    </span>
                                                </div>
                                                <div className='commets-text__item-header-left'>
                                                    <button className='commets-text__item-header-answere'>پاسخ</button>
                                                </div>
                                            </div>
                                            <div className='commets-text__item-body'>
                                                <p className='commets-text__item-body-text'>
                                                    {comment.answerContent.body}
                                                </p>
                                            </div>
                                        </div>
                                    )
                                }
                            </div>
                        ))
                    }
                </div>
            </div>
        )
    }
}
