import { emailValidatorRegex } from './Regex'
import validateRouls from './Rouls'

function validator(value , rouls){

    let isValid = []

    for(const roul of rouls){

        if(roul.value === validateRouls.requiredValue){
            value.trim().length === 0 && isValid.push(false)
        }
        else if(roul.value === validateRouls.minimumValue){
            value.trim().length < roul.min && isValid.push(false)
        }
        else if(roul.value === validateRouls.maximumValue){
            value.trim().length > roul.max && isValid.push(false)
        }
        else if(roul.value === validateRouls.emailValue){
            !emailValidatorRegex(value) && isValid.push(false)
        }else if(roul.value === validateRouls.confirmValue){
            value.trim() !== roul.confirm && isValid.push(false)
        }
    }

    if(isValid.length>0){
        return false
    }else{
        return true
    }
}

export default validator