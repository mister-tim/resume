import { html } from "/libs/UI/main.js"

export const Details = () => {
    let style = ""
    if(window.innerWidth > 999) style = "/components/Window/Contact/details/details.css"
    else style =  "/components/Window/Contact/details/detailsM.css"
    return new html()._css(style)
        .elem("div", "", ["id", "details"]).open()
            .elem("h2", "Contact Me")
            .elem("p", "Phone: (716) 398-0411")
            .elem("p", "Email: ")
                .open().elem("a", "Usmowen@gmail.com", ["href", "mailto: Usmowen@gmail.com"]).close()
            .elem("p", "Alt. Email: ")
                .open().elem("a", "Tim@Rogue-Wizards.com", ["href", "mailto: Tim@Rogue-Wizards.com"]).close()
            .elem("p", "Github: ")
                .open().elem("a", "Github.com/mister-tim", ["href", "http://www.Github.com/mister-tim"]).close()
        .close().content.innerHTML
}