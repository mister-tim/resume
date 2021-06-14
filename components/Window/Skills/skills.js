import { html } from "/libs/UI/main.js"

export const Skills = () => {
    let style
    if(window.innerWidth > 999) style = "/components/Window/Skills/skills.css"
    else style = "/components/Window/Skills/skillsM.css"
    return new html().set("id", "skills")._css(style)
        .elem("ul", "").open()
            .elem("h3", "Languages")
            .mapAs("li", "skills_item",
             "Javascript", "HTML/CSS", "C/C++", "C# .net", "SQL", "PHP").close()
        .elem("ul", "").open()
            .elem("h3", "Other Knowledge")
            .mapAs("li", "skills_item",
            "Apache2", "Node.JS", "Linux", "Microsoft Suite", "React/React Native", "Angular").close()
        
}