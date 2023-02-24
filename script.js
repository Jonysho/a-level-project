const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight; 
const collisionCanvas = document.getElementById("collisionCanvas");
const collisionCtx = collisionCanvas.getContext('2d');
collisionCanvas.width = window.innerWidth;
collisionCanvas.height = window.innerHeight;

let score = 0;
let lives = 3;
let gameOver = false;
ctx.font = "50px Impact";
let speed = 0;
let real = false
let countdown = 3;
let timeToNextRaven = 0;
let ravenInterval = 500;
let lastTime = 0;

//questionGenerator
let numSign = 0;  
let num1 = 0 //+,-
let num2 = 0; //+,÷
var question;

function numAS(){
    num1 = Math.floor(Math.random()* 99 + 1)
    num2 = Math.floor(Math.random()* 99 + 1)
}
function numMD(){
    num1 = Math.floor(Math.random()* 12 + 1)
    num2 = Math.floor(Math.random()* 12 + 1)
}
function addition(){
    numAS();
    question = num1 + "+" + num2;
    ans = num1 + num2
}
function subtraction(){
    numAS();
    if (num1>num2){
        question = num1 + "-" + num2;
        ans = num1 - num2;
    }   else{
            question = num2 + "-" + num1;
            ans = num2 - num1;
    }
}
function multiplication(){
    numMD();
    question = num1 + "x" + num2;
    ans = num1 * num2
}
function division(){
    numMD()
    num2 = num1 * num2
    question = num2 + "/" + num1;
    ans = num2 / num1
}
function drawQuestion(){
    ctx.fillStyle = "black";
    ctx.fillText(question, canvas.width/2-3, canvas.height/2-397);
    ctx.fillStyle = "white";
    ctx.fillText(question, canvas.width/2, canvas.height/2-400);
}
function questionSelect(){
    qnum = Math.floor(Math.random()* 4 + 1) 
    if (qnum === 1)addition()
    if (qnum === 2)subtraction()
    if (qnum === 3)multiplication()
    if (qnum === 4)division()
    drawQuestion()
}

let ravens = [];
class Raven {
    constructor(){
        this.spriteWidth = 271;
        this.spriteHeight = 194;
        this.sizeModifier = Math.random() * 0.4 + 0.4; 
        this.width = this.spriteWidth/2;
        this.height = this.spriteHeight/2;
        this.x = canvas.width;
        this.y = Math.random() * (canvas.height - this.height);
        this.directionX = Math.random() * 5 + 2.5;
        this.directionY = Math.random() * 5 - 2.5;
        this.markedForDeletion = false;
        this.image = new Image();
        this.image.src = "raven.png";
        this.spriteWidth = 271;
        this.spriteHeight = 194;
        this.frame = 0;
        this.maxFrame = 4;
        this.timeSinceFlap = 0;
        this.flapInterval = 100;
        this.flapInterval = Math.random() * 50 + 50;
        this.randomColors = [Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255)];
        this.rans = Math.floor(Math.random()* 199)
        while (this.rans === ans)this.rans = Math.floor(Math.random()* 199)
        if (real == false){
            this.chance = Math.floor(Math.random()* 5)
            if (this.chance === 3){
                this.rans = ans
                real = true
        }
    }
        this.color = 'rgb(' + this.randomColors[0] + ',' + this.randomColors[1] + ',' + this.randomColors[2] + ')';
    };
    update(deltatime){
        answers.push(new Answers(this.x, this.y, this.width, this.rans, this.color));
        if (this.y < 0 || this.y > canvas.height - this.height){
            this.directionY = this.directionY * -1;
        }
        document.onclick = function(e){
            speed += 0.1
        };
        this.x -= this.directionX+speed;
        this.y += this.directionY;
        if (this.x < 0 - this.width) this.markedForDeletion = true;
        this.timeSinceFlap += deltatime;
        if (this.timeSinceFlap > this.flapInterval){
            if (this.frame > this.maxFrame) this.frame = 0;
            else this.frame++;
            this.timeSinceFlap = 0;
        }
        if (this.rans === ans){
            if (this.x < 0 - this.width){
                lives--;
                alert("You missed the Answer so You lost a life! \n Question: " + question + "\n Correct Answer: " + ans)
                questionSelect()
                ravens.forEach(object => {
                    if (object.rans == ans)object.markedForDeletion = true;
                });
                real = false;
            }
        }
    }
    draw(){
        collisionCtx.fillStyle = this.color;
        collisionCtx.fillRect(this.x, this.y, this.width, this.height);  
        ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height); 
    }
}
let answers = [];
class Answers {
    constructor(x, y, size, rans, color){
        this.size = size;
        this.x = x + this.size/2+10;
        this.y = y + this.size/2-5;
        this.rans = rans
        this.color = color
        this.markedForDeletion = false;
    }
    update(){
        this.markedForDeletion = true;

    }
    draw(){
        ctx.save();
        ctx.font = '50px Verdana';
        ctx.fillStyle = "white";
        ctx.fillText(this.rans, this.x-3, this.y-3, 110, 60);
        ctx.fillStyle = this.color;
        ctx.fillText(this.rans, this.x, this.y, 100, 50);
        ctx.restore(); 
    }
}

/*let bees = [];
class Bee {
    constructor(){
        this.spriteWidth = 275;
        this.spriteHeight = 284;
        this.sizeModifier = Math.random() * 0.6 + 0.4; 
        this.width = this.spriteWidth/2;
        this.height = this.spriteHeight/2;
        this.x = canvas.width;
        this.y = Math.random() * (canvas.height - this.height);
        this.directionX = Math.random() * 5 + 2.5;
        this.directionY = Math.random() * 5 - 2.5;
        this.markedForDeletion = false;
        this.image = new Image();
        this.image.src = "bee.png";
        this.spriteWidth = 275;
        this.spriteHeight = 284;
        this.frame = 0;
        this.maxFrame = 12;
        this.timeSinceFlap = 0;
        this.flapInterval = 100;
        this.flapInterval = Math.random() * 50 + 50;
        this.randomColors = [Math.floor(Math.random() * 255), Math.floor(Math.random() * 255), Math.floor(Math.random() * 255)];
        this.color = 'rgb(' + this.randomColors[0] + ',' + this.randomColors[1] + ',' + this.randomColors[2] + ')';
    };
    update(deltatime){
        if (this.y < 0 || this.y > canvas.height - this.height){
            this.directionY = this.directionY * -1;
        }
        document.onclick = function(e){
            speed += 0.4
        };
        this.x -= this.directionX+speed;
        this.y += this.directionY;
        if (this.x < 0 - this.width) this.markedForDeletion = true;
        this.timeSinceFlap += deltatime;
        if (this.timeSinceFlap > this.flapInterval){
            if (this.frame > this.maxFrame) this.frame = 0;
            else this.frame++;
            this.timeSinceFlap = 0;
        }
        if (this.x < 0 - this.width)gameOver = true;
    }
    draw(){
        collisionCtx.fillStyle = this.color;
        collisionCtx.fillRect(this.x, this.y, this.width, this.height);  
        ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height); 
    }
}*/

let explosions = [];
class Explosions {
    constructor(x, y, size){
        this.image = new Image();
        this.image.src = 'boom.png';
        this.spriteWidth = 200;
        this.spriteHeight = 179;
        this.size = size;
        this.x = x;
        this.y = y;
        this.frame = 0;
        this.sound = new Audio();
        this.sound.src = 'boom.ogg';
        this.timeSinceLastFrame = 0;
        this.frameInterval = 100;
        this.markedForDeletion = false;
    }
    update(deltatime){
        if (this.frame === 0) this.sound.play();
        this.timeSinceLastFrame += deltatime;
        if (this.timeSinceLastFrame > this.frameInterval){
            this.frame++;
            this.timeSinceLastFrame = 0;
            if (this.frame > 4) this.markedForDeletion = true;
        }
    }
    draw(){
        ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y - this.size/4, this.size, this.size);      
    }
}

function drawStartMessage(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    collisionCtx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.textAlign = 'center';
    ctx.fillStyle = "black";
    ctx.fillText("Press START", canvas.width/2-3, canvas.height/2-30);
    ctx.fillText("To Play", + canvas.width/2+5, canvas.height/2+20);
    ctx.textAlign = 'center';
    ctx.fillStyle = "white";
    ctx.fillText("Press START", canvas.width/2, canvas.height/2-27);
    ctx.fillText("To Play", canvas.width/2+8, canvas.height/2+23);
}
function drawTimer(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = "black";
    ctx.fillText("Starting in " + countdown, canvas.width/2-3, canvas.height/2-30);
    ctx.fillStyle = "white";
    ctx.fillText("Starting in " + countdown, canvas.width/2, canvas.height/2-27); 
}
function drawScore(){
    ctx.fillStyle = "black";
    ctx.fillText("Score: " + score, canvas.width/2-303, canvas.height/2-397);
    ctx.fillStyle = "white";
    ctx.fillText("Score: " + score, canvas.width/2-300, canvas.height/2-400);
}
function drawLives(){
    ctx.fillStyle = "black";
    ctx.fillText("Lives: " + lives, canvas.width/2+300, canvas.height/2-397);
    ctx.fillStyle = "white";
    ctx.fillText("Lives: " + lives, canvas.width/2+303, canvas.height/2-400);
}
function drawGameOver(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    collisionCtx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.textAlign = 'center';
    ctx.fillStyle = "black";
    ctx.fillText("Game Over!", canvas.width/2-10, canvas.height/2-30);
    ctx.fillText("Your score is " + score, canvas.width/2+5, canvas.height/2+20);
    ctx.textAlign = 'center';
    ctx.fillStyle = "white";
    ctx.fillText("Game Over!", canvas.width/2-7, canvas.height/2-27);
    ctx.fillText("Your score is " + score, canvas.width/2+8, canvas.height/2+23);
    rnum = Math.floor(Math.random() * 5 + 1)
    if (rnum === 1){
        alert("THE MORE YOU CLICK, THE FASTER IT GETS")
    }
}

window.addEventListener('click', function(e){
    const detectPixelColor = collisionCtx.getImageData(e.x, e.y, 1, 1);
    const pc = detectPixelColor.data;
    ravens.forEach(object => {
        if (object.randomColors[0] === pc[0] && object.randomColors[1] === pc[1] && object.randomColors[2] === pc[2]){
            // collisiondetected
            object.markedForDeletion = true;
            if (object.rans === ans){
                score++;
            }
                else{
                    score-=3;
                    lives--;
                    alert("Incorrect! You lost a life. \n QUESTION: " + question + "\n You answered: " + object.rans + "\n Correct Answer: " + ans)
                }
            questionSelect()
            ravens.forEach(object => {if (object.rans == ans)object.markedForDeletion = true;})
            real = false
            explosions.push(new Explosions(object.x, object.y, object.width));
        }
    });
});

function animate(timestamp){
    document.querySelector('#end').style.visibility = 'visible';
    document.querySelector('#end').onclick = function(){
        gameOver = true
    }
    if (lives==0)gameOver = true;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    collisionCtx.clearRect(0, 0, canvas.width, canvas.height);
    let deltatime = timestamp - lastTime;
    lastTime = timestamp;
    timeToNextRaven +=deltatime;
    if (timeToNextRaven > ravenInterval){
        ravens.push(new Raven());
        timeToNextRaven = 0;
        ravens.sort(function(a,b){
            return a.width - b.width;
        });
    };
    drawQuestion();
    drawScore();
    drawLives();
    [...ravens, ...explosions, ...answers].forEach(object => object.update(deltatime));
    [...ravens, ...explosions, ...answers].forEach(object => object.draw()); 
    ravens = ravens.filter(object => !object.markedForDeletion);
    explosions = explosions.filter(object => !object.markedForDeletion);
    answers = answers.filter(object => !object.markedForDeletion);
    if (!gameOver) requestAnimationFrame(animate);
    else {
        drawGameOver();
        document.querySelector('#playAgain').style.visibility = 'visible';
        document.querySelector('#quit').style.visibility = 'visible';
        document.querySelector('#end').style.visibility = 'hidden';
    }
};

function start(){
    questionSelect()
    drawStartMessage()
    document.querySelector('#start').onclick = function(){
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        document.querySelector('#start').style.visibility = 'hidden';
        drawTimer();
        countdown--;
        setTimeout(function() {drawTimer(); countdown-=1 }, 1000)
        setTimeout(function() {drawTimer(); countdown-=1 }, 2000)
        setTimeout(function() {animate(0); }, 3000)
    }
    document.querySelector('#playAgain').onclick = function(){
        window.location.reload();
    };
    document.querySelector('#quit').onclick = function(){
        window.close();
    };
};
start();