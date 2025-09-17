const north = {dx:  0, dy: -1};
const east  = {dx:  1, dy:  0};
const south = {dx:  0, dy:  1};
const west  = {dx: -1, dy:  0};




const canvas = document.getElementById("canvas");
const context = canvas.getContext("2d"); // 2D-Kontext für Zeichnungen

const FIELD_WIDTH = 400;
const FIELD_HEIGHT = 400;

const PLAYER = {
    position : {x:7,y:7}, //Object in Object
    height: 18,
    width: 18,
}

let tail = [
    {
    position : {x:7,y:8}
    },
    {position : {x:7,y:9}
    },
    {position : {x:7,y:10}
    },];

const FOOD = {x: 18, y : 10};

function playerEquals(){
    return PLAYER.position.x === FOOD.x && PLAYER.position.y === FOOD.y;
}
display(context);

function start() {
    let started = false;
    document.addEventListener("keydown", (e) => {
        if (!started) {
            console.log("Starting game...");
            started = true;
            startGame();
            
            
        }
    });
}

    function startGame() {

        let lastDirection = north;
        display(context);
        document.addEventListener("keydown", (e) => {
            if (e.key === "d" || e.key === "ArrowRight") {
                lastDirection = east;
            } else if (e.key === "w" || e.key === "ArrowUp") {
                lastDirection = north;
            } else if (e.key === "a" || e.key === "ArrowLeft") {
                lastDirection = west;
            } else if (e.key === "s" || e.key === "ArrowDown") {
                lastDirection = south;
            }
        });

        setInterval(() => {
            movePlayer(lastDirection.dx, lastDirection.dy);
            display(context);
        }, 100)
        
}

function outOfBound(x, y){
    if (x < 0 || y < 0 || x > 19 || y > 19){
        resetGame();
        return false;
        
    }
    return true;
}


function movePlayer(dx,dy) {

    let oldPosition = {...PLAYER.position};

    if (outOfBound(PLAYER.position.x + dx, PLAYER.position.y + dy)) {
        PLAYER.position.x += dx;
        PLAYER.position.y += dy;


        if (checkMovement()) {

            console.log("player: " + PLAYER.position.x + " " + PLAYER.position.y);
            console.log("food: " + FOOD.x + " " + FOOD.y);

            if (playerEquals()) {
                moveFood();
                tail.push({position: {x: 0, y: 0}});
            }


            for (let i = tail.length - 1; i > 0; i--) {
                tail[i].position = {...tail[i - 1].position};
            }

            tail[0].position = oldPosition;


        }
    }
}

function moveFood() {
    let valid = false;
    while(!valid){
        FOOD.x = Math.floor(Math.random()* 20);
        FOOD.y = Math.floor(Math.random() * 20);
        valid = true;
    }
    for (let seg of tail){
        if (seg.position.x === FOOD.x && seg.position.y === FOOD.y){
            valid = false;
            break;
        }
    }
}

function checkMovement(){
    let valid;
    for (let seg of tail){
        if (PLAYER.position.x === seg.position.x && PLAYER.position.y === seg.position.y){
            valid = false;
            resetGame();
            return false;
        }
    }
    return true;
}



function display(context){
    context.fillStyle = "black";
    context.fillRect(0,0,FIELD_WIDTH,FIELD_HEIGHT);
    
    context.fillStyle = "blue";
    context.fillRect(PLAYER.position.x * 20,PLAYER.position.y  * 20 ,PLAYER.width,PLAYER.height);

    context.fillStyle = "red";
    context.fillRect(FOOD.x * 20,FOOD.y * 20,18,18);
    
    context.fillStyle = "grey";
    tail.forEach(e => {
        fillBody(e)
    });

}

function fillBody(element){
    context.fillRect(element.position.x * 20, element.position.y * 20, 18,18);
    
}

function resetGame(){
    tail.length = 0;

    tail = [
        {position : {x:7,y:8}
        },
        {position : {x:7,y:9}
        },
        {position : {x:7,y:10}
        },];
    
    PLAYER.position.x = 7;
    PLAYER.position.y = 7;
    
    FOOD.x = 16;
    FOOD.y = 10;

    display(context);
}

