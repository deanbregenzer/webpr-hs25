import { Ball } from "./ball.js";

const gravity = 0.8;
const friction = 0.9;
const holeSize = 50;

let balls = [];

const canvas  = document.getElementById("canvas");
const context = canvas.getContext("2d");

const holeXStart = (canvas.width / 2) - (holeSize / 2);
const holeXEnd   = holeXStart + holeSize;

document.querySelector(".create-btn").addEventListener("click", () => {
    balls.push(Ball.createRandom());
});

document.querySelector(".clear-btn").addEventListener("click", () => {
    balls = [];
});


document.addEventListener("DOMContentLoaded", () => {
    start();
})

function start(){
    setInterval(() => {
        context.fillStyle = "lightblue";
        context.fillRect(0, 0, canvas.width, canvas.height);

        // Loch zeichnen
        context.fillStyle = "black";
        context.fillRect(0, canvas.height -5 , holeXStart, 5);
        context.fillRect(holeXEnd, canvas.height -5 , canvas.width - holeXEnd, 5);

        // Bälle updaten & zeichnen
        balls.forEach(ball => {
            ball.update(canvas, gravity, friction, holeXStart, holeXEnd, holeSize);
            ball.draw(context);
        });

        // Entfernte Bälle löschen
        balls = balls.filter(ball => !ball.remove);

    }, 1000 / 40);
}