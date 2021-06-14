import { html, router } from "/libs/UI/main.js"
import { Header } from "./components/Header/header.js"
import { Nav, displayNav } from "./components/Nav/nav.js"
import { Projects } from "./components/Window/Projects/projects.js"
import { Skills } from "./components/Window/Skills/skills.js"
import { Contact } from "./components/Window/Contact/contact.js"
import { Canvas } from "./components/Window/Contact/landing/canvas.js"
import { engine } from "./components/game/engine.js"

var HTML = new html().css("/index.css")
    .elem("div", Header())
    .elem("div", Nav())
    .elem("div", "", ["id", "window"])
    .mount("root")

var Router = new router(document.getElementById("window"), "/contact",
        ["/contact", Contact()],
        ["/skills", Skills()],
        ["/projects", Projects()])
    .link(document.querySelectorAll(".navP"))
    .render()

var Web = new Canvas("web_canvas")
    .spamImage("../images/LAMP.png",
         [35, 0, 30, 33],
         [35, 30, 30, 33],
         [35, 60, 30, 33])

var Systems = new Canvas("systems_canvas")
    .getImage("../images/computer.png", 40, 41.67, 20, 16.67)
    .getImage("../images/house.png", 40, 0, 20, 16.67)
    .getImage("../images/cart.png", 0, 83.33, 20, 16.67)
    .getImage("../images/bank.png", 80, 83.33, 20, 16.67)
    .getImage("../images/arrowU.png", 46, 21.67, 8, 16.67)
    .getImage("../images/arrowL.png", 20, 61.67, 20, 16.67)
    .getImage("../images/arrowR.png", 60, 61.67, 20, 16.67)

if(window.innerWidth > 999){
    var Game = new engine("game_canvas")
        .prepareObjectRenders()
        .launch(30)
        .highjackControls()
} else {
    var NoGame = new Canvas("game_canvas")
    NoGame.CTX.font = "40px Times New Roman"
    NoGame.CTX.fillStyle = "#000000"
    NoGame.CTX.fillText("Ooops!", 200, 80)
    NoGame.CTX.fillText("Looks like I didn't", 100, 450)
    NoGame.CTX.fillText("make a mobile game", 100, 500)
}

if(window.innerWidth < 1000) {
    let MobileNav = document.getElementById("navbtn").parentElement
    MobileNav.style.justifyItems = "right"
    for(let i=0; i<MobileNav.children.length; i++) 
        MobileNav.children[i].onclick = () => displayNav(document.getElementById("nav"))
} 