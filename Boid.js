class Boid {
    constructor(x, y) {
        this.position = createVector(x, y)
        this.velosity = createVector(random(-1, 1), random(-1, 1))
        // this.velosity.setMag(random(2,4))
        this.acceleration = createVector()
        this.r = 1.3;
        this.maxForce = 0.05;
        this.maxSpeed = 3;
        this.Repulsion = -1

        let i = random(255)
        this.Purple = color(random(255), 0, 200)
        this.Green = color(0, random(255), 110)
        this.Blue = color(0, random(255), 255)
        this.Yellow = color(random(255), 255, 120)
        this.Orange = color(random(255), 100, 30)
        this.Red = color(random(255), 0, 50)
        this.colorState = [this.Purple, this.Green, this.Blue, this.Yellow, this.Orange, this.Red]
        this.color = random(this.colorState)
        // this.color = this.colorState[2]
    }
    // render(){
    //   let theta = this.velosity.heading() + radians(90)
    //   fill(127);
    //   stroke(200);

    //   push();

    //   translate(this.position.x, this.position.y);
    //   rotate(theta);

    //   beginShape();
    //   vertex(0, -this.r * 2);
    //   vertex(-this.r, this.r * 2);
    //   vertex(this.r, this.r * 2);
    //   endShape(CLOSE);

    //   pop();
    // }

    edges() {
        if (this.position.x > width) {
            this.position.x = 0
        } else if (this.position.x < 0) {
            this.position.x = width
        }
        if (this.position.y > height) {
            this.position.y = 0
        } else if (this.position.y < 0) {
            this.position.y = height
        }
    }

    align(boids) {
        let en = 25
        let steering = createVector(0, 0)
        let total_number = 0
        let diffrenece_color_number = 0
        for (let other of boids) {
            let distance = dist(this.position.x, this.position.y, other.position.x, other.position.y)

            if (other != this && distance < en) {
                let otherV = other.velosity
                // && blue(other.color) === blue(this.color) 
                steering.add(otherV)
                total_number++
                // if (blue(other.color) != blue(this.color)) {
                //     total_number = total_number + 10
                //     diffrenece_color_number++
                //     // steering.mult(this.Repulsion)
                //     // steering.add(otherV.mult(this.Repulsion))
                //     // steering.mult(diffrenece_color_number)
                // }
                // if (blue(other.color) === blue(this.colorState[1]) && blue(this.color) === blue(this.colorState[0])) {
                //     steering.mult(this.Repulsion)
                // } else if (blue(other.color) === blue(this.colorState[2]) && blue(this.color) === blue(this.colorState[1])) {
                //     steering.mult(this.Repulsion)
                // } else if (blue(other.color) === blue(this.colorState[0]) && blue(this.color) === blue(this.colorState[2])) {
                //     steering.mult(this.Repulsion)
                // }

            }

        }
        if (total_number > 0) {
            let strength = 10 * diffrenece_color_number
            steering.div(total_number)
            // if (diffrenece_color_number > 0) {
            //     steering.div(strength)
            // }
            steering.normalize()
            steering.mult(this.maxSpeed)
            steering.sub(this.velosity)
            steering.limit(this.maxForce)
            //     for(let other of boids){
            //     if (blue(other.color) === blue(this.colorState[1]) && blue(this.color) === blue(this.colorState[0])) {
            //         steering.limit(0.01)
            //     } else if (blue(other.color) === blue(this.colorState[2]) && blue(this.color) === blue(this.colorState[1])) {
            //         steering.limit(0.01)
            //     } else if (blue(other.color) === blue(this.colorState[0]) && blue(this.color) === blue(this.colorState[2])) {
            //         steering.limit(0.01)
            //     }
            // }
            // steering.limit(0.05)
            // console.log("the number is:" + diffrenece_color_number)
            return steering
        } else {
            return createVector(0, 0)
        }


    }

    separation(boids) {
        let en = 25
        let steering = createVector(0, 0)
        let total_number = 0
        let diffrenece_color_number = 0

        for (let other of boids) {
            let distance = dist(this.position.x, this.position.y, other.position.x, other.position.y)

            if (other != this && distance < en) {
                // && blue(other.color) != blue(this.color)
                let diff = p5.Vector.sub(this.position, other.position)
                diff.normalize()
                diff.div(distance)
                steering.add(diff)
                total_number++
                // if (blue(other.color) === blue(this.color)) {
                //     // total_number--
                //     diffrenece_color_number++
                //     // if (diffrenece_color_number > 0) {
                //     //     steering.mult(10)
                //     //     steering.mult(diffrenece_color_number)
                //     //     //     steering.mult(strength)
                //     //     }
                // }

            }
        }
        if (total_number > 0) {
            steering.div(total_number)
        }
        if (steering.mag() > 0) {
            let strength = 10 * diffrenece_color_number
            steering.normalize()
            steering.mult(this.maxSpeed)
            // for (let other of boids) {
            //     if (blue(other.color) != blue(this.color)) {
            //         // let strength = 10 * diffrenece_color_number
            //         let strength = 100
            //         steering.mult(strength)
            //     }
            // }
            steering.sub(this.velosity)
            // if (diffrenece_color_number > 0) {
            //     steering.div(strength)
            //     // steering.limit(this.maxForce * 2)
            // }
            steering.limit(this.maxForce)
            //     for(let other of boids){
            //     if (blue(other.color) === blue(this.colorState[1]) && blue(this.color) === blue(this.colorState[0])) {
            //         steering.limit(0.08)
            //     } else if (blue(other.color) === blue(this.colorState[2]) && blue(this.color) === blue(this.colorState[1])) {
            //         steering.limit(0.08)
            //     } else if (blue(other.color) === blue(this.colorState[0]) && blue(this.color) === blue(this.colorState[2])) {
            //         steering.limit(0.08)
            //     }
            // }
            // console.log("the number is:" + diffrenece_color_number)
            // console.log("the strenth is:" + strength)
            // console.log("the steering is:" + steering)
        }
        return steering
    }

    cohesion(boids) {
        let en = 50
        let steering = createVector()
        let total_number = 0
        let diffrenece_color_number = 0
        for (let other of boids) {
            let distance = dist(this.position.x, this.position.y, other.position.x, other.position.y)

            if (other != this && distance < en && blue(other.color) === blue(this.color)) {
                // && blue(other.color) === blue(this.color)
                steering.add(other.position)
                total_number++
                // if (blue(other.color) != blue(this.color)) {
                //     // total_number++
                //     diffrenece_color_number++
                //     // if (diffrenece_color_number > 0) {
                //     //     // steering.sub(diffrenece_color_number)
                //     // }
                // }
                // if (blue(other.color) === blue(this.colorState[0]) && blue(this.color) === blue(this.colorState[1])) {
                //     steering.add(other.position)
                //     total_number++
                // } else if (blue(other.color) === blue(this.colorState[1]) && blue(this.color) === blue(this.colorState[2])) {
                //     steering.add(other.position)
                //     total_number++
                // } else if (blue(other.color) === blue(this.colorState[2]) && blue(this.color) === blue(this.colorState[0])) {
                //     steering.add(other.position)
                //     total_number++
                // }
            }
        }
        if (total_number > 0) {
            let strength = 100 * diffrenece_color_number
            steering.div(total_number)
            steering.sub(this.position)
            // if (diffrenece_color_number > 0) {
            //     // steering.div(diffrenece_color_number)
            //     steering.div(strength)
            // }
            steering.normalize()

            steering.mult(this.maxSpeed)
            // for (let other of boids) {
            //     if (blue(other.color) === blue(this.color)) {
            //         steering.mult(this.maxSpeed)
            //     }
            // }

            steering.sub(this.velosity)

            steering.limit(this.maxForce)
            //     for(let other of boids){
            //         if(blue(other.color) === blue(this.color) ){
            //             steering.limit(this.maxForce)
            //         }
            //     else if (blue(other.color) === blue(this.colorState[1]) && blue(this.color) === blue(this.colorState[0])) {
            //         steering.limit(0.01)
            //     } else if (blue(other.color) === blue(this.colorState[2]) && blue(this.color) === blue(this.colorState[1])) {
            //         steering.limit(0.01)
            //     } else if (blue(other.color) === blue(this.colorState[0]) && blue(this.color) === blue(this.colorState[2])) {
            //         steering.limit(0.01)
            //     }
            // }
            // steering.limit(0.05)
            // console.log("the number is:" + diffrenece_color_number)
            // console.log("the steering is:" + steering)
            return steering
        } else {
            return createVector(0, 0)
        }

    }

    flock(boids) {
        let alignment = this.align(boids)
        let cohesion = this.cohesion(boids)
        let separation = this.separation(boids)
        // let color = createSlider(0, 255, 0, 0)

        // alignment.mult(alignSlider.value());
        // cohesion.mult(cohesionSlider.value());
        // separation.mult(separationSlider.value());

        alignment.mult(4);
        cohesion.mult(3);
        separation.mult(5);

        this.acceleration.add(alignment)
        this.acceleration.add(cohesion)
        this.acceleration.add(separation)
        // console.log("the accleration is:" + this.acceleration)
        // console.log("the separation is:" + this.separation(boids))
        // console.log("the cohesion is:" + this.cohesion(boids))
        // console.log("the alignment is:" + this.align(boids))
        // console.log("the alignment is:" + alignSlider.value())
        // console.log("the cohesion is:" + cohesionSlider.value())
        // console.log("the separation is:" + separationSlider.value())

        // this.show(221)
        // this.acceleration.mult(color.value())

        // let color = abs(this.velosity.heading() * 100)
        // this.show(color)
        // console.log("the color is:" + color)

    }

    attracted(target) {
        var force = p5.Vector.sub(target, this.position)
        var d = force.mag()
        d = constrain(d, 1, 25)
        var G = 150
        var strength = G / (d * d)
        force.setMag(strength)
        if (d < 20) {
            force.mult(-10)
        }
        this.acceleration.add(force)
        this.velosity * 10
        // if (other != this && blue(other.color) === blue(this.color)){
        //     this.acceleration.add(force)
        //     this.velosity * 2
        // }
    }

    attracted_colorchange(keyCode, boids) {
        let en = 50
        let total_number = 0
        let C = 0
        for (let other of boids) {
            let distance = dist(this.position.x, this.position.y, other.position.x, other.position.y)
            if (other != this && distance < en) {
                total_number++
                if (total_number > 5) {
                    en = en + (20 / 3)
                    en = constrain(en, 50, 150)
                }
            }
        }
        alpha = map(constrain((total_number), 1, 15), 1, 15, 0, 255)
        let y = color(alpha, green(this.Yellow), blue(this.Yellow))
        let p = color(alpha, green(this.Purple), blue(this.Purple))
        let g = color(red(this.Green), alpha, blue(this.Green))
        let b = color(red(this.Blue), alpha, blue(this.Blue))
        let o = color(alpha, green(this.Orange), blue(this.Orange))
        let r = color(alpha, green(this.Red), blue(this.Red))
        // if (KeyPressed === true) {
        switch (keyCode) {
            case 80:
                C = p
                // console.log("the color is red:" + r)
                break;
            case 71:
                C = g
                // console.log("the color is green:" + g)
                break;
            case 66:
                C = b
                // console.log("the color is blue:" + b)
                break;
            case 89:
                C = y
                // console.log("the color is yellow:" + y)
                break;
            case 79:
                C = o
                // console.log("the color is none:")
                break;
            case 82:
                C = r
                // console.log("the color is none:")
                break;
            default:
        }
        // this.show(C)

        // if (C === color(0, 10, 255)) {

        // }
        // console.log("the keyCode is:" + keyCode)
        // console.log("the color is :" + C)
        // console.log("-----------------------")
        return C
    }

    Color(c) {
        this.color = color(c)
    }

    update() {
        // let step = 0.01;
        // let amount = 0;
        // if (amount > 1 || amount < 0) {
        //     step *= -1;
        // }
        // amount += step;
        // this.position.add(this.velosity)
        this.velosity.add(this.acceleration)
        // let steer = p5.Vector.lerp(this.velosity, this.velosity.add(this.acceleration), amount)
        // this.velosity.add(steer)
        this.velosity.limit(this.maxSpeed)
        this.position.add(this.velosity)
        this.acceleration.mult(0)

        // console.log("the amount is :" + amount)
        // // console.log("the steer is :" + steer)
        // console.log("-----------------------")
    }

    run(boids) {
        this.edges()
        this.flock(boids)
        this.update()
        // this.show(this.color)
        // this.show()
        this.colorchange(boids)
        // this.attracted_colorchange(keyCode, boids)
        // this.align(boids)
        // this.separation(boids)
        // this.cohesion(boids)
    }

    colorchange(boids) {
        let en = 50
        let total_number = 0
        let Blue_number = 0
        let Purple_number = 0
        let Green_number = 0
        let Yellow_number = 0
        let Orange_number = 0
        let Red_number = 0
        let desire = 0
        let change = 7
        // let Green = 0
        // let Red = 0
        // let Blue = 0
        let ColorState = 0
        let c = color(0, 0, 30)
        for (let other of boids) {
            let distance = dist(this.position.x, this.position.y, other.position.x, other.position.y)
            if (other != this && distance < en) {
                total_number++
                if (total_number > 5) {
                    en = en + (20 / 3)
                    en = constrain(en, 50, 150)
                }

                if (blue(other.color) === blue(this.colorState[0])) {
                    Purple_number++
                }
                if (blue(other.color) === blue(this.colorState[1])) {
                    Green_number++
                }
                if (blue(other.color) === blue(this.colorState[2])) {
                    Blue_number++
                }
                if (blue(other.color) === blue(this.colorState[3])) {
                    Yellow_number++
                }
                if (blue(other.color) === blue(this.colorState[4])) {
                    Orange_number++
                }
                if (blue(other.color) === blue(this.colorState[5])) {
                    Red_number++
                }
                if (blue(other.color) != blue(this.color)) {
                    desire++
                }

                alpha = map(constrain((total_number), 1, 15), 1, 15, 0, 255)
                let y = color(alpha, green(this.Yellow), blue(this.Yellow))
                let p = color(alpha, green(this.Purple), blue(this.Purple))
                let g = color(red(this.Green), alpha, blue(this.Green))
                let b = color(red(this.Blue), alpha, blue(this.Blue))
                let o = color(alpha, green(this.Orange), blue(this.Orange))
                let r = color(alpha, green(this.Red), blue(this.Red))
                if (total_number - Purple_number < total_number / 2) {
                    // Red = abs(red(this.color) - map(constrain((total_number + 1), 1, 10), 1, 10, 0, 255))
                    // Red = map(constrain((total_number + 1), 1, 10), 1, 10, 0, 255)
                    // Green = green(this.colorState[0])
                    // Blue = blue(this.colorState[0])
                    ColorState = p
                    // for (let i = 0; i < map(abs(200 - blue(this.color)), 0 ,255, 1, 10); i++) {
                    //     let j = 10 -(map(abs(200 - blue(this.color)), 0 ,255, 1, 10))
                    //     if ((200 - blue(this.color)) > 0) {
                    //         Blue + map(j, 1, 10, 0, 255)
                    //     } else {
                    //         Blue - map(j, 1, 10, 0, 255)
                    //     }
                    // }
                    // for (let i = 0; i < map(abs(0 - green(this.color)), 0, 255, 1, 10); i++) {
                    //     let j = 10 - (map(abs(0 - green(this.color)), 0, 255, 1, 10))
                    //     Green - map(j, 1, 10, 0, 255)
                    // }
                    // Green = (green(this.colorState[0]) - green(this.color))
                    // Blue = (blue(this.colorState[0]) - blue(this.color))

                    // Blue = map(constrain((total_number + 3), 1, 10), 1, 10, 0, 255)
                    // Red = 209
                }
                else if (total_number - Green_number < total_number / 2) {
                    // Green = abs(green(this.color) - map(constrain((total_number + 3), 1, 10), 1, 10, 0, 255))
                    // Green = map(constrain((total_number + 3), 1, 10), 1, 10, 0, 255)
                    // Blue = blue(this.colorState[1])
                    // Red = red(this.colorState[1])
                    ColorState = g
                    // for (let i = 0; i < map(abs(150 - blue(this.color)), 0, 255, 1, 10); i++) {
                    //     let j = 10 - (map(abs(150 - blue(this.color)), 0, 255, 1, 10))
                    //     if ((150 - blue(this.color)) > 0) {
                    //         Blue + map(j, 1, 10, 0, 255)
                    //     } else {
                    //         Blue - map(j, 1, 10, 0, 255)
                    //     }
                    // }
                    // for (let i = 0; i < map(abs(15 - red(this.color)), 0 ,255, 1, 10); i++) {
                    //     let j = 10 - (map(abs(15 - red(this.color)), 0 ,255, 1, 10))
                    //     if ((15 - red(this.color)) > 0) {
                    //         Red + map(j, 1, 10, 0, 255)
                    //     } else {
                    //         Red - map(j, 1, 10, 0, 255)
                    //     }
                    // }
                    // Blue = (blue(this.colorState[1]) - blue(this.color))

                    // Red = map(constrain((total_number + 3), 1, 10), 1, 10, 0, 255)
                    // Green = 209
                }
                else if (total_number - Blue_number < total_number / 2) {
                    // Green = abs(green(this.color) - map(constrain((total_number + 3), 1, 10), 1, 10, 0, 255))
                    // Green = map(constrain((total_number + 3), 1, 10), 1, 10, 0, 255)
                    // Blue = blue(this.colorState[2])
                    // Red = red(this.colorState[2])
                    ColorState = b
                    // for (let i = 0; i < map(abs(255 - blue(this.color)), 0, 255, 1, 10); i++) {
                    //     let j = 10 - (map(abs(255 - blue(this.color)), 0, 255, 1, 10))
                    //     Blue + map(j, 1, 10, 0, 255)
                    // }
                    // for (let i = 0; i < map(abs(0 - red(this.color)), 0, 255, 1, 10); i++) {
                    //     let j = 10 - (map(abs(0 - red(this.color)), 0, 255, 1, 10))
                    //     Red - map(j, 1, 10, 0, 255)
                    // }

                    // Green = map(constrain((total_number + 3), 1, 10), 1, 10, 0, 255)
                    // Blue = 209
                }
                else if (total_number - Yellow_number < total_number / 2) {
                    ColorState = y
                }
                else if (total_number - Orange_number < total_number / 2) {
                    ColorState = o
                }
                else if (total_number - Red_number < total_number / 2) {
                    ColorState = r
                }
            }

        }

        if (this.color != ColorState && ColorState != 0 && desire > change) {
            this.color = ColorState
            desire = 0
        }
        this.show(ColorState)
        // console.log("the number is:" + total_number)
        // console.log("the en is:" + en)
        //  console.log("the red is:" + Red_number)
        // console.log("the green is:" + Green_number)
        // console.log("the blue is:" + Blue_number)
        // console.log("the colorstate is:" + ColorState)
        // if (desire > 6) {
        //     console.log("the desire is:" + desire)
        //     console.log("-----------------------")
        // }
        // return [Red, Green, Blue]
        if (ColorState != 0) {
            c = ColorState
        } else {
            c = this.color
        }
        return c
    }



    show(r, g, b) {
        // strokeWeight(6)
        // stroke(255)
        // point(this.position.x,this.position.y)
        let theta = this.velosity.heading() + radians(90)
        let c = color(r, g, b)
        fill(0)
        // let Green = this.color(boids)
        // stroke(0, this.color(boids), 209)
        // stroke(red(this.color) + r, green(this.color) + g, blue(this.color) + b)
        // console.log("the color is:" + this.color)
        // let c = color('rgb(0, this.color(boids)[0], 209)')
        // stroke(c)
        // stroke(this.color)
        stroke(r, g, b)
        strokeWeight(1)


        push();

        translate(this.position.x, this.position.y);
        rotate(theta);

        beginShape();
        vertex(-this.r * 0.1, -this.r * 2)
        vertex(-this.r * 3.5, this.r * 3)
        vertex(0, this.r * 1.5)
        vertex(this.r * 3.5, this.r * 3)
        vertex(this.r * 0.1, -this.r * 2)
        vertex(this.r * 2, -this.r * 5)
        vertex(0, -this.r * 8)
        vertex(-this.r * 2, -this.r * 5)

        // vertex(0, -this.r * 2)
        // vertex(-this.r, this.r * 2)
        // vertex(this.r, this.r * 2)

        // vertex(-this.r , -this.r * 3)

        // circle(this.position.x, this.position.y, r)

        endShape(CLOSE);


        pop();

        return c

    }

}