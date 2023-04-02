const boxSize = 25;
const row = 20;
const coloum = 20;

let show_score = document.querySelector(".score");

let board;
let context;
let snakeX = Math.floor(Math.random() * row)*boxSize;
let snakeY = Math.floor(Math.random() * coloum)*boxSize;

const up_btn = document.querySelector(".up-btn");
const left_btn = document.querySelector(".left-btn");
const down_btn = document.querySelector(".down-btn");
const right_btn = document.querySelector(".right-btn");


let foodX=0;
let foodY=0;

let velocityX = 0;
let velocityY = 0;

let gameOver = false;

let snake = [];
let score = 1;


window.onload = (()=>{
    board = document.getElementById("canvas-box");
    board.height = row * boxSize;
    board.width = coloum * boxSize;
    context = board.getContext("2d");
    
    changeFood();
    
    up_btn.addEventListener("click",()=>{
        velocityX = 0;
        velocityY = -1;
    });
    left_btn.addEventListener("click",()=>{
        velocityX = 1;
        velocityY = 0;
    });
    down_btn.addEventListener("click",()=>{
        velocityX = 0;
        velocityY = 1;
    });
    right_btn.addEventListener("click",()=>{
        velocityX = -1;
        velocityY = 0;
    });
    
    document.addEventListener("keydown",moveFun);

    setInterval(update,1000/10);
});

function update(){
    if (snakeX >= board.width)
        snakeX = 0
    else if (snakeX < 0)
        snakeX = board.width
    if (snakeY >= board.height)
        snakeY = 0 
    else if (snakeY < 0)
        snakeY = board.height

    if(gameOver) location.reload();

    console.log("hi");
    context.fillStyle = "black";
    context.fillRect(0,0,board.width,board.height);

    
    
    // Food
    context.fillStyle = "red"; 
    context.fillRect(foodX,foodY,boxSize,boxSize);

    if(snakeX == foodX && snakeY == foodY){
        snake.push([foodX,foodY]);
        changeFood();
    }

    // Add Continue : 
    
    for(let i=snake.length-1;i>0;i--) snake[i] = snake[i-1];
    if(snake.length) snake[0] = [snakeX,snakeY] 
    
    //Snake
    context.fillStyle = "green";
    snakeX += velocityX*boxSize;
    snakeY += velocityY*boxSize;
    context.fillRect(snakeX,snakeY,boxSize,boxSize);
    for(let i=0;i<snake.length;i++) context.fillRect(snake[i][0],snake[i][1],boxSize,boxSize);
    
    for(let i=0;i<snake.length;i++){ 
        if(snakeX == snake[i][0] && snakeY == snake[i][1]) {
            gameOver = true;
            alert("hi");}   
    }
}

function moveFun(e){
    if((e.code == "ArrowUp" || false) && velocityY != 1){
        console.log("ArrowUp");
        velocityX = 0;
        velocityY = -1;
    }
    else if(e.code == "ArrowDown" && velocityY != -1){
        velocityX = 0;
        velocityY = 1;
    }
    else if(e.code == "ArrowLeft" && velocityX != 1){
        velocityX = -1;
        velocityY = 0;
    }
    else if(e.code == "ArrowRight" && velocityX != -1){
        velocityX = 1;
        velocityY = 0;
    }
}

function changeFood(){
    show_score.textContent = score;
    score+=2;
    foodX = Math.floor(Math.random() * coloum)  * boxSize;
    foodY = Math.floor(Math.random() * row) * boxSize;

    while(snakeX == foodX) foodX = Math.floor(Math.random() * coloum)  * boxSize;
    while(snakeY == foodY) foodY = Math.floor(Math.random() * row)  * boxSize;
}