import React, { useEffect, useState } from 'react'
import "./Search.css"
import { IoIosSearch } from 'react-icons/io'

export default function Search({items , setSearchedItems}) {

    const [searchWord , setSearchWord] = useState("")

    useEffect(()=>{
        const searchResult = items.filter(item=>item.name.includes(searchWord))
        setSearchedItems(searchResult)
    },[searchWord])

    function changeSearchingWord(event){
        setSearchWord(event.target.value)
    }

    return (
        <form action="#" class="courses-top-bar__form">
            <input type="text" class="courses-top-bar__input" placeholder="جستجوی دوره ..." value={searchWord} onChange={changeSearchingWord}/>
            <IoIosSearch class="courses-top-bar__search-icon"></IoIosSearch>
        </form>
    )
}
