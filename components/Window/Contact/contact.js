import { html } from "/libs/UI/main.js"
import { Details } from "./details/details.js"
import { Landing } from "./landing/landing.js"

export const Contact = () => {
    return new html().set("id", "contact")._css("/components/Window/Contact/contact.css")
        .mapAs("div", "", 
            Details(), 
            Landing())
}