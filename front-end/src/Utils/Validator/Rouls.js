const requiredValue = "REQUIRED"
const maximumValue = "MAXIMUM"
const minimumValue = "MINIMUM"
const emailValue = "EMAIL"
const confirmValue = "CONFIRM"

export const requiredValidator = () => ({
    value: requiredValue
})

export const minimumValidator = (min) => ({
    value: minimumValue,
    min
})

export const maximumValidator = (max) => ({
    value: maximumValue,
    max
})

export const confirmValidator = (confirm)=>({
    value : confirmValue,
    confirm
})

export const emailValidator = () => ({
    value: emailValue,
})

export default {
    requiredValue,
    maximumValue,
    minimumValue,
    emailValue,
    confirmValue
}