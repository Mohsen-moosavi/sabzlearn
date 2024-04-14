import React, { useEffect, useReducer } from 'react'
import "./Input.css"
import validator from '../../../Utils/Validator/Validator';

export default function Input({ element, className, placeholder , type , id , validations, onInputHandler }) {

    const [inputReducer , dispatch] = useReducer(reducerFunction,
        {value : '' , isValid : false});

        
        let {value , isValid} = inputReducer;
    
        useEffect(()=>{
            (onInputHandler) && onInputHandler(id , value , isValid)
        }, [value])


        function InputChangeHandler(event){
            dispatch({type : "CHANGE", value : event.target.value , validations})
        }

    const elementHtml = (element === "input") ?
        (<input
            id={id}
            placeholder={placeholder}
            className={`${className} ${inputReducer.isValid ? "" : "error"}`}
            type={type}
            onChange={InputChangeHandler}
            value={inputReducer.value}
        />) :
        (<textarea
            id={id}
            placeholder={placeholder}
            className={className}
            onChange={InputChangeHandler}
            value={inputReducer.value}
        />)

    return (
        <>
            {elementHtml}
        </>
    )
}

function reducerFunction(state , action){
    switch(action.type){
        case "CHANGE" : return {
            value : action.value,
            isValid : validator(action.value , action.validations)
        }
    }

}