import { asteroid } from "/components/game/asteroid.js"
import { bullet } from "/components/game/bullet.js"
import { explosion } from "/components/game/explosion.js"
import { player } from "/components/game/player.js"


export class engine{
    constructor(canvas){
        this.CNV = document.getElementById(canvas)
        this.CTX = this.CNV.getContext("2d")
        this.asteroids = [], this.bullets = [], this.explosions = []
        this.state = "title"
        this.timer = 0,  this.score = 0
        this.player = new player()
        return this
    }
    checkCollisions(){
        for(let i=0; i<this.asteroids.length; i++){
            for(let ii = 0; ii < this.bullets.length; ii++){
                if(this.bullets[ii].X > this.asteroids[i].X - 20 && this.bullets[ii].X < this.asteroids[i].X + 20){
                    if(this.bullets[ii].Y > this.asteroids[i].Y - 20 && this.bullets[ii].Y < this.asteroids[i].Y + 20){
                        this.bullets.splice(ii, 1)
                        this.explosions.push(new explosion(this.asteroids[i].X, this.asteroids[i].Y, this.explode))
                        this.asteroids.splice(i, 1)
                        this.score += 10
                    }
                }else if (this.asteroids[i].Y > 235) this.state = "game over";
            }
        }
        return this
    }
    drawFloor(){
        this.CTX.fillStyle = "#009900"
        this.CTX.fillRect(0, 250, 250, 300);
        return this
    }
    drawKeys(){
        this.CTX.strokeStyle = "#000000";
        this.CTX.fillStyle = "#000000";
        this.CTX.strokeRect(10, 100, 20, 20);
        this.CTX.beginPath();
        this.CTX.moveTo(25, 110);
        this.CTX.lineTo(15, 110);
        this.CTX.lineTo(18, 112);
        this.CTX.lineTo(18, 108);
        this.CTX.lineTo(15, 110);
        this.CTX.stroke();
        this.CTX.strokeRect(40, 100, 20, 20);
        this.CTX.beginPath();
        this.CTX.moveTo(45, 110);
        this.CTX.lineTo(55, 110);
        this.CTX.lineTo(52, 112);
        this.CTX.lineTo(52, 108);
        this.CTX.lineTo(55, 110);
        this.CTX.stroke();
        this.CTX.strokeRect(25, 130, 20, 20);
        this.CTX.beginPath();
        this.CTX.moveTo(35, 145);
        this.CTX.lineTo(35, 135);
        this.CTX.lineTo(33, 138);
        this.CTX.lineTo(37, 138);
        this.CTX.lineTo(35, 135);
        this.CTX.stroke();
        return this
    }
    drawScore(){
        this.CTX.font = "20px Times New Roman"
        this.CTX.fillStyle = "#000000"
        this.CTX.fillText("Score: " + this.score, 100, 299)
        return this
    }
    drawSky(){
        let sky = this.CTX.createLinearGradient(0, 75, 0, 0)
        sky.addColorStop(0, "#66CCFF")
        sky.addColorStop(.5, "#3399FF")
        sky.addColorStop(1, "#0033CC")
        this.CTX.fillStyle = sky
        this.CTX.fillRect(0,0,250,250)
        return this
    }
    fillBackground(){
        this.CTX.clearRect(0,0,250,300)
        this.drawSky()
            .drawFloor()
            .drawScore()
        return this
    }
    gameOver(){
        this.fillBackground()
            .timer++
        this.CTX.font = "30px Georgia"
        this.CTX.strokeText("GAME", 85, 125)
        this.CTX.strokeText("OVER", 85, 150)
        //Reset everything.
        if(this.timer === 90) {
            this.asteroids = [], this.bullets = [],  this.explosions = []
            this.state = "title"
            this.timer = 0
            this.score = 0
            this.player = new player()
            return this
        }
    }
    header(content){
        this.CTX.font = "15px Arial";
        this.CTX.strokeText(content, 50, 25);
        return this
    }
    highjackControls(){
        this.CNV.onclick = () => {
            if(this.state === "title"){
                this.state = "tutorial"
                this.timer = 0
                document.onkeydown = event => {
                    if(event.code === "ArrowLeft" || event.code === "ArrowRight"){
                        this.player.direction = event.code;
                    } else if(event.code === "ArrowUp" && !this.player.reloading){
                        this.bullets.push(new bullet(this.player.position))
                        this.player.reloading++
                    }
                }
                document.onkeyup = event => {
                    if(event.code === this.player.direction) this.player.direction = "none";
                }
            }
        }
        return this
    }
    launch(framerate){
        var i = 0
        var render = setInterval(() => {
                this.stateController()
            }, 1000/framerate)
        return this
    }
    playGame(){
        this.fillBackground()
            .renderObjects()
            .checkCollisions()
        this.player
            .render(this.CTX)
            .move()
            .reload()
        if(this.timer === 50){
            this.spawnAsteroid()
            this.timer = 0
        } else this.timer++
        return this
    }
    prepareObjectRenders(){
        this.explode = document.createElement("img")
        this.explode.src = "/images/explode.png"
        return this
    }
    renderObjects(){
        for(let i=0; i<this.bullets.length; i++) 
            this.bullets[i]
                .render(this.CTX)
                .move()
        for(let i=0; i<this.asteroids.length; i++) 
            this.asteroids[i]
                .render(this.CTX)
                .move(this.score)
        for(let i=0; i<this.explosions.length; i++) 
            if(this.explosions[i].render(this.CTX).time === 10) this.explosions.splice(i, 1)
        return this
    }
    spawnAsteroid(){
        this.asteroids.push(new asteroid((Math.floor(Math.random() * 150) + 50), (Math.floor(Math.random() * 3) - 2)))
        return this
    }
    stateController(){ 
        this.state === "title" ? this.titleScreen() 
        : this.state === "tutorial" ? this.tutorial()
        : this.state === "play" ? this.playGame()
        : this.state === "game over" ? this.gameOver() : ""
        return this
    }
    titleScreen(){
        this.fillBackground()
            .header("Not Available On Mobile")
        this.player.render(this.CTX)
        if(this.timer < 60){
            if(this.timer < 30){
                this.CTX.font = "30px Georgia";
                this.CTX.strokeText("CLICK", 85, 125);
                this.CTX.strokeText("TO", 110, 150);
                this.CTX.strokeText("PLAY", 95, 175);
            }
            this.timer++;
        } else this.timer = 0;
        return this
    }
    tutorial(){
        this.fillBackground()
            .header("Destroy the Asteroids!!!")
            .drawKeys();
        this.player.render(this.CTX)
        this.CTX.font = "20px Georgia";
        this.CTX.strokeText("Move", 70, 115);
        this.CTX.strokeText("Shoot", 70, 150);
        this.timer++;
        if(this.timer === 60){
            this.timer = 0
            this.state = "play"
        }
        return this
    }
}