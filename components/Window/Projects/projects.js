import { html } from "/libs/UI/main.js"

export const Projects = () => {
    let style
    if(window.innerWidth > 999) style = "/components/Window/Projects/projects.css"
    else style = "/components/Window/Projects/projectsM.css"
    return new html().set("id", "projects")._css(style)
        .mapAs("div", "",
            project(
                "This site",
                "A resume built to show off some Javascript and HTML/CSS.",
                "Primarily Javascript and HTML/CSS.",
                "http://www.github.com/mister-tim/resume"),
            project(
                "Buffalo Scholastic Chess League",
                "A web app which allowed parents to view the standings of their kids within the league, as well as a portal to allow the admins to edit the database on the backend.",
                "The frontend is done in React, and the backend uses PHP and a MySQL database.",
                "http://www.github.com/mister-tim/BSCL"),
            project(
                "Buffalo Chess Association",
                "A simple website built displaying contact and other info for the client.",
                "Primarily Javascript and HTML/CSS",
                "http://www.github.com/mister-tim/BCA"))        
}

const project = (title, desc, lang, git) =>{
    return new html()
        .elem("h3", title)
        .mapAs("p", "",  desc, lang)
        .elem("a", "See the code.", ["href", git])
        .content.innerHTML
}