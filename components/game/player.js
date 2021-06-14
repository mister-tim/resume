//Will have to rewrite this if I make the canvas scale with page size
export class player{
    constructor(){
        this.position = 125
        this.direction = "none"
        this.reloading = 0
    }
    move(){
        if(this.direction !== "none"){
            if(this.direction === "ArrowLeft") this.position -= 5
            else this.position += 5
        }
        
        if(this.position < 0) this.position = 0
        else if(this.position > 250) this.position = 250
        return this
    }
    reload(){
        if(this.reloading){
            this.reloading++
            if(this.reloading === 16) this.reloading = 0
        }
        return this
    }
    render(context){
        context.beginPath();
        context.moveTo(this.position, 205);
        context.lineTo(this.position - 20, 265);
        context.lineTo(this.position + 20, 265);
        context.closePath();
        context.strokeStyle = "#000000";
        context.stroke();
        context.fillStyle = "#666699";
        context.fill();
        return this
    }
}