import React, { useEffect, useRef, useState } from 'react'
import { FaAngleDown } from 'react-icons/fa'

export default function Filtering({ allItems, setFilteredItems }) {

    const [filteringTitle,setFilteringTitle] = useState("مرتب سازی پیش فرض")
    const selectionElm = useRef()

    useEffect(()=>{
        setFiltering(filteringTitle)
    },[allItems])

    function setFiltering(event , parameter) {
        for(let i=0;i<5;i++){
            selectionElm.current.children[i].classList.remove("courses-top-bar__selection-item--active")
        }
        
        event.target?.classList.add("courses-top-bar__selection-item--active")
        
        switch (parameter) {
            case "FREE":
                setFilteredItems(allItems.slice().filter(item => item.price == 0))
                setFilteringTitle("نمایش دوره های رایگان")
                break;
            case "MONY":
                setFilteredItems(allItems.slice().filter(item => item.price != 0))
                setFilteringTitle("نمایش دوره های غیر رایگان")
                break;
            case "LAST":
                setFilteredItems(allItems)
                setFilteringTitle("مرتب سازی براساس آخرین")
                break;
            case "FIRST":
                setFilteredItems(allItems.slice().reverse())
                setFilteringTitle("مرتب سازی براساس اولین")
                break;
            default: 
                setFilteredItems(allItems);
                setFilteringTitle("مرتب سازی پیش فرض")
        }
    }


    return (
        <div class="courses-top-bar__selection">
            <span class="courses-top-bar__selection-title">
                {filteringTitle}
                <FaAngleDown class="courses-top-bar__selection-icon"></FaAngleDown>
            </span>
            <ul class="courses-top-bar__selection-list" ref={selectionElm}>
                <li class="courses-top-bar__selection-item" onClick={(event) => setFiltering(event , "DEFAULT")}>مرتب سازی پیش فرض</li>
                <li class="courses-top-bar__selection-item" onClick={(event) => setFiltering(event , "LAST")}>مرتب سازی بر اساس آخرین</li><li class="courses-top-bar__selection-item" onClick={() => setFiltering("FIRST")}>مرتب سازی بر اساس اولین</li>
                <li class="courses-top-bar__selection-item" onClick={(event) => setFiltering(event , "FREE")}> نمایش دروه های رایگان</li>
                <li class="courses-top-bar__selection-item" onClick={(event) => setFiltering(event , "MONY")}>نمایش دوره های غیر رایگان</li>
            </ul>
        </div>
    )
}
