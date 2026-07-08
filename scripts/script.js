let nav_options = document.querySelectorAll(".nav-option")

/**
 * @param {HTMLElement} nav 
 */
function showDescription(nav) {
    let description = nav.querySelector("p")
    if(description.style.display != "none"){
        description.style.display = "none"
    }else{
        description.style.display = "inline"
    }
}
document.addEventListener("DOMContentLoaded",()=>{
    nav_options.forEach((nav, index) => {
        let description = nav.querySelector("p")
        nav.addEventListener("mouseout",() => {
            showDescription(nav)
            description.style.display = "none"
        })
        nav.addEventListener("mouseover",() => {
            showDescription(nav)
            description.style.display = "inline"
        })
    });
})