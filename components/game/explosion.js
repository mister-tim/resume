export class explosion{
    constructor(posX, posY, img){
        this.X = posX;
        this.Y = posY;
        this.time = 0;
        this.exploding = img
        return this
    }
    render(context){
        context.drawImage(this.exploding, this.X - 25, this.Y -25, 50, 50);
        this.time++;
        return this
        //if(this.time === 10) explosions.splice(explosions.indexOf(this), 1);
    }
}