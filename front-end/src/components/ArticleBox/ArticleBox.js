import React, { useState } from 'react'
import "./ArticleBox.css"
import Shimmer from '../Shimmer/Shimmer'
import { Link } from 'react-router-dom'
import SectionHeader from '../SectionHeader/SectionHeader'

export default function ArticleBox({title , description , cover , shortName , slideMode = false}) {

    const [isImageShow , setIsImageShow] = useState(false)

    return(
        <div class={`article-box ${slideMode ? "article-box--in-carousel" : ""}`}>
        <div class="article-box__cover">
            <Link to={`/article-info/${shortName}`} class="article-box__img-link">
                <img src={`http://localhost:4000/courses/covers/${cover}`} onLoad={()=>setIsImageShow(true)} class="article-box__img" alt="blog img"/>
                {!isImageShow && <Shimmer/>}
                <div class="article-box__cover-shadow">
                    <Link to={`/article-info/${shortName}`} class="article-box__link">{title}</Link>
                </div>
            </Link>
        </div>
        <div class="article-box__details">
            <span class="article-box__author">سید محسن موسوی</span>
            <span class="article-box__date">15/12/1402</span>
        </div>
    </div>
    )
    // return (
    //     <div class="col-4">
    //         <div class="article-card">
    //             <div class="article-card__header">
    //                 <Link to={`/article-info/${shortName}`} class="article-card__link-img">
    //                     <img src={`http://localhost:4000/courses/covers/${cover}`} class="article-card__img" alt="Article Cover"
    //                     onLoad={()=>setIsImageShow(true)}/>
    //                     {!isImageShow && <Shimmer/>}
    //                 </Link>
    //             </div>
    //             <div class="article-card__content">
    //                 <Link to={`/article-info/${shortName}`} class="article-card__link">
    //                     {title}
    //                 </Link>
    //                 <p class="article-card__text">
    //                     {description}
    //                 </p>
    //                 <Link to={`/article-info/${shortName}`}  class="article-card__btn">بیشتر بخوانید</Link>
    //             </div>
    //         </div>
    //     </div>
    // )
}
