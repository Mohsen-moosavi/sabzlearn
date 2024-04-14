import React, { useEffect, useState } from 'react'

export default function Counter({scale}) {

    const [number, setNumber] = useState(0)

    useEffect(() => {
        let counter = setInterval(() => {
            setNumber(prevValue => prevValue + 1)
        }, 1);

        if (number >= scale){
            clearInterval(counter)
        }

        return ()=>{
            clearInterval(counter)
        }
    }, [number])

    return (
        <span class="landing__academy-info">{number}</span>
    )
}
