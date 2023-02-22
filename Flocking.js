const flock = []
// let flock;
let attractors = []
let flock_number = 100
let KeyPressed = false

let alignSlider, cohesionSlider, separationSlider;

function setup() {
  createCanvas(windowWidth, windowHeight)
  // alignSlider = createSlider(0, 5, 4, 1)
  // cohesionSlider = createSlider(0, 5, 3, 1)
  // separationSlider = createSlider(0, 5, 5, 1)
  // createP("--------align-----------------cohesion---------------separation--------")

  // flock = new Flock();
  for (let i = 0; i < flock_number; i++) {
    flock.push(new Boid(random(width), random(height)))
    // flock.push(new Boid(width / 2, height / 2))
    // let b = (new Boid(width / 2, height / 2))
    // let b = (new Boid(random(width), random(height)))
    // flock.addBoid(b)
  }
}

// function mousePressed() {
//   attractors.push(createVector(mouseX, mouseY));
// }

function keyPressed() {
  // if (keyCode === 69) {
  KeyPressed = true
  // for (let boid of flock) {
  //   let c = boid.attracted_colorchange(keyCode, flock)
  //   boid.show(c)
  //   console.log("the keyCode is:" + keyCode)
  //   console.log("the color is :" + c)
  //   console.log("-----------------------")
  // }
  // }
  // boid.attracted_colorchange(keyCode, flock)
}

function keyReleased() {
  KeyPressed = false
}

function mouseDragged() {
  // flock.push(new Boid(mouseX, mouseY))
  if (mouseButton == LEFT) {
    // flock.addBoid(new Boid(mouseX, mouseY))
    flock.push(new Boid(mouseX, mouseY))
  } else if (mouseButton === CENTER) {
    attractors.push(createVector(mouseX, mouseY));
    if (attractors.length > 1) {
      attractors.shift()
    }
  }
}

function mouseReleased() {
  attractors = []
}

function draw() {
  background(0)
  // flock.run()
  let en = 200
  let total_number = 0
  // let NowColor = 0
  for (let boid of flock) {
    boid.run(flock)
    // NowColor = boid.colorchange(flock)
    // NowColor = boid.show()
    // boid.attracted_colorchange(keyCode, flock)
    // boid.edges()
    // boid.flock(flock)
    // boid.update()
    // boid.show()
    // boid.render()
    if (flock.length > flock_number + 100) {
      flock.splice(0, 1);
    }
    for (let j = 0; j < attractors.length; j++) {
      let distance = dist(mouseX, mouseY, boid.position.x, boid.position.y)
      // console.log("the distance is : " + distance)
      if (distance < en) {
        boid.attracted(attractors[j]);
        total_number++

        let c = boid.attracted_colorchange(keyCode, flock)
        boid.show(c)
        boid.Color(c)
      }
    }
  }
  circle(mouseX, mouseY, 10)
  for (let i = 0; i < attractors.length; i++) {
    // stroke(0, 255, 0);
    // point(attractors[i].x, attractors[i].y);
    circle(attractors[i].x, attractors[i].y, 10)
  }
  textSize(95)
  fill(0, 0, 0)
  strokeWeight(3)
  text('INFECTION', 20, 83)
  textSize(16)
  strokeWeight(3)
  text('Pressed left mouse button and drag the mouse to generate new boids.', 30, windowHeight - 90)
  text('Pressed center mouse button and drag the mouse to attract boids.', 30, windowHeight - 70)
  text('Pressed any button to change color when you attracted : ', 30, windowHeight - 50)
  text('R = Red; O = Orange; Y = Yellow; G = Green; B = Blue; P = Purple', 30, windowHeight - 30)

  // fill(NowColor)
  strokeWeight(30)
  rect(0, 0, windowWidth, 1)
  rect(0, windowHeight - 1, windowWidth, 1)
  rect(0, 0, 1, windowHeight)
  rect(windowWidth - 1, 0, 1, windowHeight)


  // console.log("the number is:" + total_number)
  // console.log("the alpha is:" + alpha)
  // console.log("the color is:" + NowColor)
  // console.log("-----------------------")

}

// function Flock() {
//   this.boids = [];
// }

// Flock.prototype.run = function () {

//   let en = 300
//   let total_number = 0
//   let alpha = 0

//   if (this.boids.length > flock_number) {
//     this.boids.splice(0, 1);
//   }
//   // console.log("the lenth is : " + this.boids.length)

//   for (let i = 0; i < this.boids.length; i++) {
//     this.boids[i].run(this.boids);
//     var boid = this.boids[i];

//     for (let j = 0; j < attractors.length; j++) {
//       let distance = dist(mouseX, mouseY, this.boids[i].position.x, this.boids[i].position.y)
//       // console.log("the distance is : " + distance)
//       if (distance < en) {
//         boid.attracted(attractors[j]);
//         total_number++
//         alpha = map(constrain((total_number), 1, 100), 1, 50, 0, 255)
//         let y = color(alpha, 255, 110)
//         let r = color(alpha, 0, 200)
//         let g = color(0, alpha, 110)
//         let b = color(0, alpha, 255)
//         // if (KeyPressed === true) {
//         switch (keyCode) {
//           case 87:
//            this.boids[i].show(r)
//             break;
//           case 69:
//             this.boids[i].show(g)
//             break;
//           case 82:
//             this.boids[i].show(b)
//             break;
//           case 81:
//             this.boids[i].show(y)
//             break;
//           case 84:
//             this.boids[i].show()
//             break;
//           default:
//           //
//         }

//         // }
//       }
//     }
//   }
//   // console.log("the number is:" + total_number)
//   // console.log("the red is:" + Red)

// }

// Flock.prototype.addBoid = function (b) {
//   this.boids.push(b);
// }


