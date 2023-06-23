const canvas = document.querySelector("#screen");
const ctx = canvas.getContext("2d");

const WIDTH = 10;
const HEIGHT = 25;
const SCALE = 20;

canvas.width = WIDTH * SCALE;
canvas.height = HEIGHT * SCALE;
canvas.style.border = "1px solid black";
ctx.scale(SCALE, SCALE);


let now = 0;
let timer = 0;

const shapes = ['STRAIGHT', 'SQUARE', 'T', 'L', 'SKEW'];
const colors = {
  [shapes[0]]: 'red',
  [shapes[1]]: 'purple',
  [shapes[2]]: 'orange',
  [shapes[3]]: 'green',
  [shapes[4]]: 'pink',
}

function getRandomShape() {
  return shapes[Math.trunc(Math.random() * shapes.length)];
}

const shapeStraight = [
  [1, 1, 1, 1],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];

const shapeSquare = [
  [1, 1],
  [1, 1],
];

const shapeT = [
  [1, 1, 1],
  [0, 1, 0],
  [0, 0, 0],
];

//  [0, 0, 1],
//  [0, 1, 1],
//  [0, 0, 1],

const shapeL = [
  [1, 0, 0],
  [1, 0, 0],
  [1, 1, 0],
];

const shapeSkew = [
  [1, 1, 0, 0],
  [0, 1, 1, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];

function rotateShape(a) {
  var n = a.length;
  var result = new Array(n).fill().map(() => Array(n).fill('')); // Create empty array with correct dimensions

  for (var i = 0; i < n; i++) {
    for (var j = 0; j < n; j++) {
      result[j][n - 1 - i] = a[i][j];
    }
  }
  console.log(result);
  return result;
}

function getShape() {
  const type = getRandomShape();
  console.log("type", type);
  let data = null;
  switch (type) {
    case "STRAIGHT":
      data = shapeStraight;
      break;
    case "SQUARE":
      data = shapeSquare;
      break;
    case "T":
      data = shapeT;
      break;
    case "L":
      data = shapeL;
      break;
    case "SKEW":
      data = shapeSkew
      break;

  }

  return {
    x: 0,
    y: 0,
    velX: 0,
    velY: 1,
    type,
    color: colors[type],
    data
  }
}
const state = {
  shape: null,
  lines: 0
}


const table = [
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0],
]

console.table(table);

const keys = {}

function keydownHandler(e) {
  keys[e.code] = true;
}
function keyupHandler(e) {
  keys[e.code] = false;
  console.log(keys);
}

document.addEventListener("keydown", keydownHandler);
document.addEventListener("keyup", keyupHandler);

function update(dt) {
  if (state.shape === null) {
    state.shape = getShape();
  }
  timer += dt;

  if (keys["Space"]) {
    state.shape.data = rotateShape(state.shape.data);
  }
  if (keys["KeyW"]) {
    state.shape.velY = 10;
  }
  if (keys["KeyA"]) {
    state.shape.velX = -1;
  }
  if (keys["KeyD"]) {
    state.shape.velX = 1;
  }


  if (timer > 1000) {
    state.shape.y += state.shape.velY;
    timer = 0;
  }

  state.shape.x += state.shape.velX * dt;
}

function render(ctx) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = state.shape.color;

  if (state.shape.data) {
    for (let y = 0; y < state.shape.data.length; y++) {
      for (let x = 0; x < state.shape.data[y].length; x++) {
        if (state.shape.data[y][x]) {
          ctx.fillRect(state.shape.x + x, state.shape.y + y, 1, 1);
        }
      }
    }
  }
}

function loop(ts) {
  const dt = ts - now;
  now = ts;

  update(dt);
  render(ctx);

  requestAnimationFrame(loop);
}

loop(0);

console.log(state);
