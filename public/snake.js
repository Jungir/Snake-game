const canvas = document.getElementById('canvas');
const context = canvas.getContext('2d');
const box = 32;

const ground = new Image();
ground.src = '/ground.png';

const foodImg = new Image();
foodImg.src = '/food.png';


// snake body
let snake = [];
snake[0] = {
    x: 9 * box,
    y: 10 * box
};

// direction keeper
let d;
let score = 0;

//food 
let food = {
    x : Math.floor(Math.random()*17 + 1)*box,
    y : Math.floor(Math.random()*15 + 3)*box
}


document.addEventListener('keydown', direction);


// direction changer
function direction(event){
    let key = event.keyCode;
    
    if ( key == 37 && d !== 'RIGHT'){
       d = 'LEFT';
    }else if ( key == 38 && d !== 'DOWN'){
        d = 'UP';
    }else if( key == 39 && d !== 'LEFT'){
        d = 'RIGHT';
    }else if( key == 40 && d !== 'UP'){
        d = 'DOWN';
    }
    
}

//check collision 
function collision (head, array){
    for(let i = 0; i< array.length; i++){
        if (head.x == array[i].x && head.y == array[i].y){
            return true;
        }
    }
    return false; 
}

function draw (){

    context.drawImage(ground, 0, 0);
    
    for (i = 0; i < snake.length; i ++){

        context.fillStyle = (i == 0) ? 'green' : 'grey';
        context.fillRect (snake[i].x, snake[i].y, box, box) ;
        context.strokeStyle = 'red';
        context.strokeRect (snake[i].x, snake[i].y, box, box);
    
    }
    //last snake 
    let snakeInitX = snake[0].x;
    let snakeInitY = snake[0].y;

    context.drawImage(foodImg, food.x, food.y)

    if (d == 'LEFT'){
        snakeInitX -= box;
    }
    if (d == 'UP'){
        snakeInitY -= box;
    }
    if (d == 'RIGHT'){
        snakeInitX += box;
    }
    if (d == 'DOWN'){
        snakeInitY += box;
    }
    
    
    if(snakeInitX == food.x && snakeInitY == food.y){
        score++;
        food = {
            x : Math.floor(Math.random()*17 + 1)*box,
            y : Math.floor(Math.random()*15 + 3)*box
        } 
    } else{
        snake.pop();
    } 

    let newHead = {
        x : snakeInitX,
        y : snakeInitY
    }

    if(snakeInitX < box || snakeInitX > 17*box || snakeInitY < 3*box || snakeInitY > 17*box || collision(newHead, snake)){
        clearInterval(game);
        context.fillStyle = 'crimson';
        context.font = '45px Changa one';
        context.fillText('Game over, try again ;(', 3*box, 8*box);
    }
    snake.unshift(newHead);
    // console.log(snake)
    context.fillStyle = '#fff';
    context.font = '45px Changa one';
    context.fillText(score, 2.5*box, 1.7*box);
}   
let game = setInterval(draw, 100);
// 
