import { html } from "/libs/UI/main.js"

export const Nav = () => {
    if(window.innerWidth > 999){
        return new html()._css("/components/Nav/nav.css")
            .elem("div", "", ["id", "nav"]).open()
            .mapAs("p", "navP",
                "Contact Me", "Languages/Skills", "Projects").close().content.innerHTML 
    }
    return new html()._css("/components/Nav/navM.css").set("style", "text-align: center;")
        .elem("h2", "&#9776", ["id", "navbtn"])
        .elem("section", "", ["id", "nav"]).open()
            .mapAs("p", "navP",
            "Contact Me", "Languages/Skills", "Projects").close().content.innerHTML
}

export function displayNav(target){
    if(target.style.display === "none") target.style.display = "grid"
    else target.style.display = "none"
}