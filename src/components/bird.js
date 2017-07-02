
import World from '../data/world';
import ctx from './../lib/context';

class Bird {
    constructor() {
        
        const car = document.querySelector('#car');
        
        this.UI = {
            car,
        };
        
        const x = 50;
        const width = car.clientWidth;
        const height = car.clientHeight;

        this.state = {
            velocity: 0,
            lift: 0,
            defaultLift: 25,
            realX: x + width, 
            x,
            y: 1,
            width,
            height,
        };
        
        this.handleEvents();
    }

    handleEvents() {
        document.addEventListener('keypress', this.onKeyPress.bind(this));
        document.addEventListener('touchstart', this.onTouch.bind(this))
    }

    onKeyPress(e) {
        if (e.key === " ") {
            this.state.lift = this.state.defaultLift;
        }
    }

    onTouch() {
        this.state.lift = this.state.defaultLift;
    }

    onFrame() {
        this.render();
    }

    render() {
        // inc velocity
        this.state.velocity += World.gravity;
        // add in lift if present
        this.state.velocity -= this.state.lift;
        // add in a resistance (like air)
        this.state.velocity *= World.resistance;

        // update y position
        this.state.y += this.state.velocity;
        this.state.realY = this.state.y + this.state.height;
    

        this.state.lift = 0;
        ctx.drawImage(
            this.UI.car,
            this.state.x, 
            this.state.y,
            this.state.width,
            this.state.height
        );
    }
}

export default Bird;

