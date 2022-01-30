import Background from "./src/classes/background";
import Enemy from "./src/classes/enemy";
import InputHandler from "./src/classes/inputHandler";
import Player from "./src/classes/player";

import "./style.css";
// Este evento espera que todas imagenes esten cargas
// para luego disparar el evento de la  function callback
window.addEventListener("load", () => {
  const canvas = document.getElementById("canvas1");

  //  ctx = context || donde vamos a crear una instancia para desarrollar en canvas 2D API
  //  esta api permite usar los metodos de dibujos y propiedades que necesitamos para animar nuestro juego
  const ctx = canvas.getContext("2d");
  canvas.width = 800;
  canvas.height = 650;

  let enemies = [];
  let score = 0;
  let gameOver = false;

  //
  const handleEnemies = (deltaTime) => {
    if (enemyTimer > enemyInterval + randomEnemyInterval) {
      enemies.push(new Enemy(canvas.width, canvas.height));
      randomEnemyInterval = Math.random() * 1000 + 500;
      console.log(enemies);
      enemyTimer = 0;
    } else {
      enemyTimer += deltaTime;
    }
    enemies.forEach((enemy) => {
      enemy.draw(ctx);
     score = enemy.update(deltaTime, score);
    });
    enemies = enemies.filter(enemy => !enemy.markedForDeletion)
  };

  const displayStatusText = (context) => {
    context.font = '40px Helvatica';
    context.fillStyle = 'black'
    context.fillText('Puntaje: ' + score, 20, 50)
    context.fillStyle = 'white'
    context.fillText('Puntaje: ' + score, 25, 52)

    if(gameOver){
      context.textAlign = 'center'
      context.fillStyle = 'black'
      context.fillText('GAME OVER, intenta de nuevo!', canvas.width/2, 200)
      context.fillStyle = 'white'
      context.fillText('GAME OVER, intenta de nuevo!', canvas.width/2+2, 202)
    }
    
  }
  
  const input = new InputHandler();
  const player = new Player(canvas.width, canvas.height);
  const background = new Background(canvas.width, canvas.height);

  let lastTime = 0;
  let enemyTimer = 0;
  let enemyInterval = 1000;
  let randomEnemyInterval = Math.random() * 1000 + 500;

  /**
   * el timeStamp es creado de manera automatica por la requestAnimationFrame y pasado por default a la funcion que la llama como argumento
   */
  const animate = (timeStamp) => {
    const deltaTime = timeStamp - lastTime;
    lastTime = timeStamp;

    ctx.clearRect(0, 0, canvas.width, canvas.height);
    background.draw(ctx);
    background.update();
    player.draw(ctx);
    gameOver = player.update(input, deltaTime, enemies, gameOver);
    handleEnemies(deltaTime);
    displayStatusText(ctx)
    if(!gameOver) requestAnimationFrame(animate);
  };

  animate(0);
});
