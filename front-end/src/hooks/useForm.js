import { useCallback, useReducer } from "react"

function formReducer(state, action) {

    switch (action.type) {

        case 'CHANGE_VALUE': {

            let isFormValid = true;
            for (const inputID in state.initInputs) {
                if (inputID === action.inputID) {
                    isFormValid = isFormValid && action.isValid
                }
                else {
                    isFormValid = isFormValid && state.initInputs[inputID].isValid
                }
            }

            return {
                ...state,
                initInputs: {
                    ...state.initInputs,
                    [action.inputID]: {
                        value: action.value,
                        isValid: action.isValid
                    }
                },
                isValidForm: isFormValid
            }

        }
        default: {
            return state
        }
    }
}

const useForm = (initInputs, isValidForm) => {

    const [formState, dispatch] = useReducer(formReducer, {
        initInputs,
        isValidForm
    })

    const onInputHandler =useCallback((id, value, isValid) =>{
        dispatch({
            type: 'CHANGE_VALUE',
            inputID: id,
            value,
            isValid
        })
    },[])

    return [formState, onInputHandler]
}


export default useForm
