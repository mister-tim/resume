import { html } from "/libs/UI/main.js"

export const Landing = () => {
    let landing
    if(window.innerWidth > 999) {
        landing =  new html().css("/components/Window/Contact/landing/landing.css")
        .elem("div", "", ["id", "landing"]).open()
            .elem("section", "", ["id", "systems_image"])
                .open().elem("canvas", "", 
                    ["height", 300], 
                    ["width", 250],
                    ["id", "systems_canvas"])
                .elem("h2", "Systems Architecture").close()
            .elem("section", "", ["id", "web_image"])
                .open().elem("canvas", "", 
                    ["height", 300], 
                    ["width", 250],
                    ["id", "web_canvas"])
                .elem("h2", "Full Stack Web Development").close()
            .elem("section", "", ["id", "game_image"])
                .open().elem("canvas", "", 
                    ["height", 300], 
                    ["width", 250],
                    ["id", "game_canvas"])
                .elem("h2", "Game Development").close().close()
    }
    else {
       landing =  new html()._css("/components/Window/Contact/landing/landingM.css")
        .elem("div", "", ["id", "landing"]).open()
            .elem("section", "", ["class", "slide"])
                .open().elem("canvas", "", 
                    ["height", 600], 
                    ["width", 500],
                    ["id", "systems_canvas"])
                .elem("h2", "Systems Architecture").close()
            .elem("section", "", ["class", "slide"])
                .open().elem("canvas", "", 
                    ["height", 600], 
                    ["width", 500],
                    ["id", "web_canvas"])
                .elem("h2", "Full Stack Web Development").close()
            .elem("section", "", ["class", "slide"])
                .open().elem("canvas", "", 
                    ["height", 600], 
                    ["width", 500],
                    ["id", "game_canvas"])
                .elem("h2", "Game Development").close().close().ready(showSlide())
    } 
    return landing.content.innerHTML
}

function showSlide(){
    let toggle = 0
    let elems = document.getElementsByClassName("slide")
    setInterval(() => {
        if(toggle === 0){
            elems[0].style.display = "grid"
            toggle++
        } 
        else toggleSlides(elems) 
    }, 2000);
}
function toggleSlides(elems){
    for(let i=0; i<elems.length; i++) {
        if(elems[i].style.display === "grid"){
            elems[i].style.display = "none"
            i++
            if(i > elems.length-1) i = 0
            elems[i].style.display = "grid"
        }
    }
}