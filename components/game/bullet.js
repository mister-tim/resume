export class bullet{
    constructor(position){
        this.X = position;
        this.Y = 205;
    }
    move(){
        this.Y -= 5
    }
    render(context){
        context.beginPath();
        context.moveTo(this.X-2, this.Y-3);
        context.lineTo(this.X+2, this.Y-3);
        context.lineTo(this.X+2, this.Y+3);
        context.lineTo(this.X-2, this.Y+3);
        context.closePath();
        context.strokeStyle = "#000000";
        context.stroke();
        context.fillStyle = "#FFF000";
        context.fill();
        return this
    }
    
}