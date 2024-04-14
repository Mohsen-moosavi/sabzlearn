export const emailValidatorRegex =  (value)=>{
    const emailRegext = /[a-zA-Z0-9.-]+@[a-z-]+\.[a-z]{2,3}/;
    return emailRegext.test(value)
}


