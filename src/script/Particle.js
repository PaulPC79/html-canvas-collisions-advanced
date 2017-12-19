import getDistance from './PythagoreanUtil.js';
import {rotate,resolveCollision} from './UtilElasticCollision.js';

export default class Particle {
    constructor(x,y,radius,color,context,mouse,particles) {
        this._x = x;
        this._y = y;
        this._velocity = {
            x: (Math.random() - 0.5) * 5,
            y: (Math.random() - 0.5) * 5
        };
        this._radius = radius;
        this._color = color;
        this._mass = 1;
        this._context = context;
        this._mouse = mouse;
        this._particles = particles;
        this._opacity = 0.0;
    }

    draw() {
        this._context.beginPath();
        this._context.arc(this._x,this._y,this._radius,0,Math.PI * 2, false);
        this._context.save();
        this._context.globalAlpha = this._opacity;
        this._context.fillStyle = this._color;
        this._context.fill();
        this._context.restore();
        this._context.strokeStyle = this._color;
        this._context.stroke();        
        this._context.closePath();
    }

    update() {
        this.draw();
        // detect collisions with other particles
        this._particles.map( p => {
            if(this !== p) {
                if(getDistance(this._x,this._y,p.x,p.y) - this._radius * 2 < 0) {
                    resolveCollision(this,p);
                }            
            }
        });
        
        if(this._x - this._radius <= 0 || this._x + this._radius >= window.innerWidth) {
            this._velocity.x = -this._velocity.x;
        }

        if(this._y - this._radius <= 0 || this._y + this._radius >= window.innerHeight) {
            this._velocity.y = -this._velocity.y;
        }

        // mouse collision detection
        if(getDistance(this._mouse.x,this._mouse.y, this._x, this._y) < 120 && this._opacity < 0.2) {
            this._opacity += 0.02;
        } else if( this._opacity > 0 ) {
            this._opacity = this._opacity.toFixed(2) - (0.02).toFixed(2);
        }
        this._x += this._velocity.x;
        this._y += this._velocity.y;
    }

    get x() {
        return this._x;
    }

    set x(value) {
        this._x = value;
    }

    get y() {
        return this._y;
    }

    set y(value) {
        this._y = value;
    }

    get velocityX() {
        return this._velocity.x;
    }

    get velocityY() {
        return this._velocity.y;
    }

    get radius() {
        return this._radius;
    }

    set radius(value) {
        this._radius = value;
    }

    get context() {
        return this._context;
    }
    
    set context(value) {
        this._context = value;
    }
    
    get color() {
        return this._color;
    }

    set color(value) {
        this._color = value;
    }

    get opacity() {
        return this._opacity;
    }

    get mass() {
        return this._mass;
    }

    get velocity() {
        return this._velocity;
    }

    get mouse() {
        return this._mouse;
    }

    set mouse(value) {
        this._mouse = value;
    }

    get particles() {
        return this.particles;
    }

    set particles(value) {
        this.particles = value;
    }
}