export class Canvas{
    constructor(canvas){
        this.CNV = document.getElementById(canvas)
        this.CTX = this.CNV.getContext("2d")
        return this
    }
    getImage(source, X, Y, width, height){
        let img = document.createElement("img")
        img.src = source
        let x = this.CNV.width * (X/100)
        let y = this.CNV.height * (Y/100)
        let w = this.CNV.width * (width/100)
        let h = this.CNV.height * (height/100)
        img.onload = () => this.CTX.drawImage(img, x, y, w, h)
        return this
    }
    spamImage(source, ...args){
        let img = document.createElement("img")
        img.src = source
        img.onload = () => {
            for(let i=0; i<args.length; i++){
                this.CTX.drawImage(img, 
                    this.CNV.width * (args[i][0]/100),
                    this.CNV.height *(args[i][1]/100),
                    this.CNV.width * (args[i][2]/100),
                    this.CNV.height * (args[i][3]/100))
            }
        }
    }
}