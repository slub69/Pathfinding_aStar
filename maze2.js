const canvas = document.getElementById('c1');
const c = canvas.getContext('2d');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
class Cell {
  constructor(i, j) {
    this.i = i;
    this.j = j;
    this.walls = [true, true, true, true];
    this.inMaze = false;
    this.walk = false;
  }
  neighbor() {
    //Returns a random neighbor
    let nbrs = [];
    if (this.j > 0) nbrs.push(cells[this.i][this.j-1]);
    if (this.i < cols-1) nbrs.push(cells[this.i+1][this.j]);
    if (this.j < rows-1) nbrs.push(cells[this.i][this.j+1]);
    if (this.i > 0) nbrs.push(cells[this.i-1][this.j]);
    return nbrs[Math.floor(Math.random()*nbrs.length)];
  }
  faces() {
    //Representing algorithm
    if (this.inMaze) c.fillStyle = 'rgb(255, 255, 255)';
    else if (this.walk) c.fillStyle = 'rgb(255, 0, 140)';
    c.fillRect(this.i*inc, this.j*inc, inc, inc);
  }
  edges() {
    //Drawing walls
    c.beginPath();
    if (this.walls[0]) {
      c.moveTo(this.i*inc, this.j*inc);
      c.lineTo(this.i*inc+inc, this.j*inc);
    }
    if (this.walls[1]) {
      c.moveTo(this.i*inc+inc, this.j*inc);
      c.lineTo(this.i*inc+inc, this.j*inc+inc);
    }
    if (this.walls[2]) {
      c.moveTo(this.i*inc+inc, this.j*inc+inc);
      c.lineTo(this.i*inc, this.j*inc+inc);
    }
    if (this.walls[3]) {
      c.moveTo(this.i*inc, this.j*inc+inc);
      c.lineTo(this.i*inc, this.j*inc);
    }
    c.stroke();
  }
}
let inc = 24;
let speed = 50;
let cols = Math.ceil(canvas.width/inc);
let rows = Math.ceil(canvas.height/inc);
let cells = [];
for (let i = 0; i < cols; i++) {
  cells[i] = [];
  for (let j = 0; j < rows; j++) cells[i][j] = new Cell(i, j);
}
let done = false;
let walk = [];
cells[Math.floor(Math.random()*cols)][Math.floor(Math.random()*rows)].inMaze = true;
c.fillStyle = 'rgb(255, 255, 255)';
c.lineWidth = inc/2;
c.lineCap = 'square';
function draw() {
  c.clearRect(0, 0, canvas.width, canvas.height);
  for (let a = 0; a < speed; a++) {
    //Choosing starting point
    if (walk.length == 0) {
      //Finding all available slots
      let available = [];
      for (let i = 0; i < cols; i++) for (let j = 0; j < rows; j++) if (!cells[i][j].inMaze && !cells[i][j].walk) available.push([i, j]);
      if (available.length > 0) {
        //Chooses random spot
        let index = Math.floor(Math.random()*available.length);
        walk.push(cells[available[index][0]][available[index][1]]);
        cells[available[index][0]][available[index][1]].walk = true;
      } else {
        //Algorithm is done when there are no more cells to start at
        done = true;
        break;
      }
    } else {
      //Randomly walking
      let n = walk[walk.length-1].neighbor();
      //If walk has intersected itself
      if (n.walk == true) {
        //Remove cells from walk until at where it was intersected
        for (let i = walk.length-1; i >= 0; i--) {
          if (walk[i].i == n.i && walk[i].j == n.j) break;
          else {
            walk[i].walk = false;
            walk[i].walls = [true, true, true, true];
            walk.splice(i, 1);
          }
        }
      } else {
        n.walk = true;
        walk.push(n);
        //Generate walls of walk
        for (let i = 0; i < walk.length; i++) {
          if (i < walk.length-1) walk[i].walls = [true, true, true, true];
          if (i > 0) {
            let current = walk[i];
            let previous = walk[i-1];
            //Difference among indecies
            let ii = current.i-previous.i;
            let jj = current.j-previous.j;
            //Which walls to remove based on relation of cells
            if (ii == 0) {
              //If cell is above or below
              if (jj == 1) {
                current.walls[0] = false;
                previous.walls[2] = false;
              } else if (jj == -1) {
                current.walls[2] = false;
                previous.walls[0] = false;
              }
            } else if (jj == 0) {
              //If cell is to the right or left
              if (ii == 1) {
                current.walls[3] = false;
                previous.walls[1] = false;
              } else if (ii == -1) {
                current.walls[1] = false;
                previous.walls[3] = false;
              }
            }
          }
        }
        //If walk intersects maze
        if (n.inMaze == true) {
          for (let i = 0; i < walk.length; i++) {
            //Add walk to the maze
            walk[i].walk = false;
            walk[i].inMaze = true;
          }
          walk = [];
        }
      }
    }
  }
  //Showing cells
  for (let i = 0; i < cols; i++) for (let j = 0; j < rows; j++) if (cells[i][j].inMaze || cells[i][j].walk) cells[i][j].faces();
  for (let i = 0; i < cols; i++) for (let j = 0; j < rows; j++) if (cells[i][j].inMaze || cells[i][j].walk) cells[i][j].edges();
  if (!done) requestAnimationFrame(draw);
}
draw();