export class asteroid{
    constructor(position, direction){
        this.X = position;
        this.Y = -10;
        this.Direction = direction;
        return this
    }
    move(score){
        this.X += this.Direction;
        this.Y += (3 + score/100);
        return this;
    }
    render(context){
        context.beginPath();
        context.arc(this.X, this.Y, 20, 0, 2 * Math.PI);
        context.strokeStyle = "#000000";
        context.stroke();
        context.fillStyle = "#663300";
        context.fill();
        return this;
    }
    //move this to engine as well
    explode(){
        explosions.push(new explosion(this.X, this.Y));
        asteroids.splice(asteroids.indexOf(this), 1);
        score += 10;
    }
}