class Background {
    constructor(gameWidth, gameHeight){
        this.gameWidth = gameWidth
        this.gameHeight = gameHeight
        this.image = document.getElementById('backgroundImage')
        this.x = 0
        this.y = 0
        this.width = 2500
        this.height = 720
        this.speed = 7
    }

    draw(context){
        context.drawImage(this.image, this.x, this.y, this.width, this.height)
        context.drawImage(this.image, this.x + this.width - this.speed, this.y, this.width, this.height)
    }
    update(){
        this.x -= this.speed
        if(this.x < 0 - this.width) this.x = 0
    }
}

export default Background
