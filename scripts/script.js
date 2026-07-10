let nav_options = document.querySelectorAll(".nav-option")
let dialogs = document.querySelectorAll("dialog")
let discord_ops = document.querySelectorAll("a#discord-op")
let mail_ops = document.querySelectorAll("a#mail-op")

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

    // INFORMAÇÃO AO PASSAR MOUSE SOBRE NAV
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

    dialogs.forEach((dialog, index) => {
        let dialog_alert = dialog.querySelector("p.copy-alert")
        let btn_dialog = dialog.querySelector("button")
        let copy_text = dialog.querySelector("p.copy")

        copy_text.addEventListener("click",()=>{
            navigator.clipboard.writeText(copy_text.textContent)
            dialog_alert.style.visibility = "visible"
            setTimeout(() => {dialog_alert.style.visibility = "hidden"}, 1000)
        })
        btn_dialog.addEventListener("click",()=>{
            dialog.toggleAttribute("open")
        })
    })

    let dialog_discord = document.getElementById("discord-dialog")
    let dialog_mail = document.getElementById("mail-dialog")

    discord_ops.forEach((disc_op,value) => {
        disc_op.addEventListener("click",()=>{
            dialog_mail.close()
            dialog_discord.toggleAttribute("open")
        })
    })

    mail_ops.forEach((mail_op,value) => {
        mail_op.addEventListener("click",()=>{
            dialog_discord.close()
            dialog_mail.toggleAttribute("open")
        })
    })
})

nav_options.forEach((nav, index) => {
    let hyper_link = nav.querySelector("a")
    hyper_link.addEventListener("click",(event)=>{
        event.preventDefault() // reseta o funcionamento padrão do hyperlink ao ser clicado
        let destination_element = document.querySelector(hyper_link.getAttribute("href"))
        let absolute_pos_element = destination_element.getBoundingClientRect().top + window.scrollY - 82
        window.scroll({
            top: absolute_pos_element,
            left: 0,
            behavior: "smooth"
        })
    })
});