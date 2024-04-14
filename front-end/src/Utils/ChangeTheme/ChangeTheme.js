const LIGHT_MODE = "light"
const DARK_MODE = "dark"


function changeTheme() {

    const theme = localStorage.getItem("theme") || LIGHT_MODE

    if (theme === LIGHT_MODE) {
        document.documentElement.style.setProperty("--primary-color", '#3281b9')
        document.documentElement.style.setProperty('--body-color', "#1b262c")
        document.documentElement.style.setProperty('--anty-body-color', "#fff")
        document.documentElement.style.setProperty('--course-box-color', "#02383C")
        document.documentElement.style.setProperty('--footer-color', "#02383C")
        document.documentElement.style.setProperty('--shadow-color', "rgba(255,255,255,0.2)")
        document.documentElement.style.setProperty('--text-color', "#fff")
        document.documentElement.style.setProperty('--text-color-light', "#FEFDED")
        localStorage.setItem("theme", DARK_MODE)
    } else {
        document.documentElement.style.setProperty('--primary-color', '#0000a3')
        document.documentElement.style.setProperty('--body-color', "#fff")
        document.documentElement.style.setProperty('--anty-body-color', "#232029")
        document.documentElement.style.setProperty('--course-box-color', "#fff")
        document.documentElement.style.setProperty('--footer-color', "#0000a3")
        document.documentElement.style.setProperty('--shadow-color', "rgba(0,0,0,0.25)")
        document.documentElement.style.setProperty('--text-color', "#3B3735")
        document.documentElement.style.setProperty('--text-color-light', " #808080")
        localStorage.setItem("theme", LIGHT_MODE)
    }
}

export default changeTheme