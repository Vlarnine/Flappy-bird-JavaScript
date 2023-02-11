let started = false;
let score = 0;

const canvas = document.getElementById("game");
const ctx = canvas.getContext("2d");

ctx.font = "40px Comic Sans MS";
ctx.fillStyle = "green";
ctx.textAlign = "center";
ctx.fillText("Press space to Start", canvas.width / 2, canvas.height / 2);

let frames = 0;

const gravity = 0.5;

const bird = {
x: 50,
y: 150,
size: 20,
velocity: 0,

draw: function() {
ctx.fillStyle = "yellow";
ctx.fillRect(this.x, this.y, this.size, this.size);
},

update: function() {
this.velocity += gravity;
this.y += this.velocity;
}
};

const pipes = [];

for (let i = 0; i < 2; i++) {
pipes[i] = {
x: canvas.width + i * 300,
holeStart: Math.random() * (canvas.height - 200) + 100,
holeSize: 100,
draw: function() {
ctx.fillStyle = "green";
ctx.fillRect(this.x, 0, 50, this.holeStart - 100);
ctx.fillRect(this.x, this.holeStart + 100, 50, canvas.height);
},
update: function() {
this.x -= 2;
if (this.x + 50 < 0) {
this.x = canvas.width;
this.holeStart = Math.random() * (canvas.height - 200) + 100;
}
if (this.x + 50 === bird.x) {
score++;
}
}
};
};

function gameOver() {
ctx.font = "40px Comic Sans MS";
ctx.fillStyle = "red";
ctx.textAlign = "center";
ctx.fillText("GAME OVER!", canvas.width / 2, canvas.height / 2 + 10);
ctx.fillText("Score: " + score, canvas.width / 2, canvas.height / 2 + 70);
pygame.quit()
sys.exit()
}

function update() {
frames++;

ctx.clearRect(0, 0, canvas.width, canvas.height);

bird.update();
bird.draw();

pipes.forEach(pipe => {
pipe.update();
pipe.draw();
if (
bird.x + bird.size >= pipe.x &&
bird.x <= pipe.x + 60 &&
(bird.y <= pipe.holeStart - 100 || bird.y + bird.size >= pipe.holeStart + 100)
) {
gameOver();
}
});

ctx.font = "30px Comic Sans MS";
ctx.fillStyle = "black";
ctx.textAlign = "left";
ctx.fillText("SCORE: " + score, 10, 40);

requestAnimationFrame(update);
}

document.onkeydown = function(e) {
  if(e.code === "Spacebar" || e.keyCode === 32) {
    bird.velocity = -10;
    bird.y -= 40;
    if (!started) {
      update();
      started = true;
    }
  }
};