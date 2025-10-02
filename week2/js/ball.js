import { getRandomRGB } from "./utils.js";

export class Ball {
    constructor(x, y, dx, dy, radius = 10, color = getRandomRGB()) {
        this.x = x;
        this.y = y;
        this.dx = dx;
        this.dy = dy;
        this.radius = radius;
        this.color = color;
        this.remove = false;
        this.falling = false;
    }

    update(canvas, gravity, friction, holeXStart, holeXEnd, holeSize) {
        this.dy += gravity;
        this.x += this.dx;
        this.y += this.dy;

        // Wand-Kollisionen
        if (this.x + this.radius > canvas.width) {
            this.x = canvas.width - this.radius;
            this.dx *= -friction;
        }
        if (this.x - this.radius < 0) {
            this.x = this.radius;
            this.dx *= -friction;
        }

        // Boden-Kollision / Loch
        if (this.y > canvas.height - this.radius) {
            if (this.x > holeXStart + this.radius &&
                this.x < holeXEnd - this.radius) {
                this.falling = true;
            } else {
                this.y = canvas.height - this.radius;
                this.dy *= -friction;
            }
        }

        // Decke
        if (this.y - this.radius < 0) {
            this.y = this.radius;
            this.dy *= -friction;
        }

        // Loch-Animation
        if (this.falling) {
            this.dy += gravity * 0.5;
            this.y += this.dy;
            this.radius *= 0.97;
            if (this.radius < 1 || this.y > canvas.height + 50) {
                this.remove = true;
            }
        }
    }

    draw(context) {
        context.fillStyle = this.color;
        context.beginPath();
        context.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        context.fill();
        context.closePath();
    }

    static createRandom(maxX = 300, maxY = 300) {
        let x = Math.random() * maxX;
        let y = Math.random() * maxY;
        let dx = Math.random() * 10;
        let dy = Math.random() * 10;
        return new Ball(x, y, dx, dy);
    }
}
