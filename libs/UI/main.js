//A class which aims to simplify dynamic generation of html.
export class html{
    constructor(style){
        if(style) this._css(style)
        let root = document.createDocumentFragment()
        root.append(document.createElement("div"))
        this.content = root.firstElementChild
        this.styles = []
        return this
    }
    checkStyle(element){
        for(let i=0; i<this.styles.length; i++) {
            if(this.styles[i].selectors[0][0] === '.') {
                if(this.styles[i].selectors[0].substring(1) === element.className) element.style = this.styles[i].stylerule
            } else if(this.styles[i].selectors[0][0] === '#') {
                if(this.styles[i].selectors[0].substring(1) === element.id) element.style = this.styles[i].stylerule
            } else {
                if(this.styles[i].selectors[0] === element.tagName.toLowerCase()) element.style = this.styles[i].stylerule
            } 
        }
    }
    close(){
        this.content.parentElement ? this.content = this.content.parentElement : ""
        return this
    }
    _css(stylesheet){
        //Update to using the fetch API at some point.
        let x = new XMLHttpRequest()
        x.open("GET", stylesheet, false)
        x.send()
        if(x.status === 200){
            this.parseStyle(x.responseText)
        }
        return this
    }
    css(stylesheet){
        //Remaining seperate from elem because I intend to find a better solution to attach stylesheets.
        let l = document.createElement("link")
        l.rel = "stylesheet"
        l.href = stylesheet
        l.type = "text/css"
        this.content.append(l)
        return this
    }
    elem(selector, markup, ...args){
        let el = document.createElement(selector)
        if(markup) el.innerHTML = markup
        if(args) for(let i=0; i<args.length; i++) el.setAttribute(args[i][0], args[i][1])
        this.checkStyle(el)
        this.content.append(el)
        return this
    }
    mapAs(selector, cssClass, ...args){
        for(let i=0; i<args.length;i++){
            this.elem(selector, args[i], ["class", cssClass])
        }
        
        return this
    }
    mount(target){
        let t = document.getElementById(target)
        t.replaceWith(this.content)
        return this
    }
    open(){
        this.content.lastChild ? this.content = this.content.lastChild : ""
        return this
    }
    parseStyle(stylesheet){
        let current = ""
        let styleblock = ""
        let selectors = []
        let styles = []
        for(let i=0; i<stylesheet.length;i++){
            if(styleblock.length){
                if(stylesheet[i] !== '\n' && stylesheet[i] !== '\r'){
                    styleblock += stylesheet[i]
                    if(stylesheet[i] === '}'){
                        if(selectors[0] === "*") this.content.style = styleblock.substring(1, styleblock.length-2).trim()
                        this.styles.push(new styleObject(selectors, styleblock))
                        current = ""
                        styleblock = ""
                        selectors = []
                    } 
                }
            } else if(stylesheet[i] === ' '){
                selectors.push(current)
                current = ""
            } else if(stylesheet[i] === '{') {
                selectors.push(current)
                styleblock += stylesheet[i] 
            } else if(stylesheet[i] !== '\n' && stylesheet[i] !== '\r') current += stylesheet[i]
        }
    }
    ready(handler){
        this.onload = () => { handler()}
        return this
    }
    set(attr, val){
        this.content.lastChild ? this.content.lastChild.setAttribute(attr, val)
            :   this.content.setAttribute(attr, val)
        return this
    }
}
//A class which acts as a router for SPAs.
export class router{
    constructor(target, home, ...args){
        this.target = target
        this.default = home
        args ? this.routes = args : this.routes = []
        return this
    }
    findRoute(route){
        for(let i=0; i< this.routes.length; i++) if(route === this.routes[i][0]) return this.routes[i][1]
    }
    /**
     * Assigns a list of nodes as links to SPA 'pages'.
     * @param {NodeList} targetlist A list of target nodes to act as links to the various pages. Must be in the same 
     * order as the routes in order to work properly at the moment.
     * @returns The router object
     */
    link(targetlist){
        for(let i=0; i<targetlist.length; i++) targetlist[i].onclick = () => this.navigate(this.routes[i][0])
        window.onpopstate = event => this.render(event.state)
        return this
    }
    navigate(route){
        window.history.pushState(route, "", window.location.origin + route)
        this.render(route)
        return this
    }
    render(route){
        let destination
        route ? destination = this.findRoute(route) : destination = this.findRoute(this.default)
        this.target.firstElementChild 
            ? this.target.firstElementChild.replaceWith(destination.content) 
            : this.target.append(destination.content)
        return this
    }
}
class styleObject{
    constructor(selectors, styletext){
        this.selectors = selectors
        this.stylerule = styletext.substring(1, styletext.length-2).trim()
        return this
    }
}