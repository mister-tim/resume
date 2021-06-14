import { html } from "/libs/UI/main.js"


export const Header = () => {  
    return new html()._css("/components/Header/header.css").elem("h1", "Timothy H. Owen", ["id", "head"])
    .content.innerHTML
}