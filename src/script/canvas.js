import getDistance from './PythagoreanUtil.js';
import getRandomColor from './RandomColor.js';
import getRandomInt from './RandomIntFromRange.js';
import Particle from './Particle.js';

let canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerWidth;
let c = canvas.getContext('2d'),
    particles = [],
    mouse = {
        x: window.innerWidth / 2,
        y: window.innerHeight / 2
    };

window.addEventListener('mousemove', (event) => {
    mouse.x = event.clientX;
    mouse.y = event.clientY;
});

window.addEventListener('resize', (event) => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    init();
});

window.addEventListener('click', (event) => {
    init();
});

function init() {
    particles = [];

    for(let i = 0; i < 200; i += 1) {
        const radius = 15;
        const color = 'blue';
        let x = getRandomInt(radius, canvas.width - radius),
            y = getRandomInt(radius, canvas.height - radius);        
        if( i !== 0 ) {
            for(let j = 0; j < particles.length; j += 1 ) {
                if(getDistance(x,y,particles[j].x,particles[j].y) - radius * 2 < 0) {
                    x = getRandomInt(radius, canvas.width - radius);
                    y = getRandomInt(radius, canvas.height - radius);
                    j = -1;
                }
            }
        }
        particles.push(new Particle(x,y,radius,getRandomColor(),c,mouse,particles));
    }
    
}

export default function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0,0, canvas.width, canvas.height);
    particles.map( p => p.update() );
}

init();