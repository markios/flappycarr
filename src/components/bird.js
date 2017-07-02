
import World from '../data/world';
import ctx from './../lib/context';

class Bird {
    constructor() {
        this.state = {
            velocity: 0,
            lift: 0,
            defaultLift: 25,
            x: 50,
            y: 0,
            height: 20, 
            width: 20,    
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
        if (this.state.y < World.bottom - this.state.height) {
            // inc velocity
            this.state.velocity += World.gravity;
            // add in lift if present
            this.state.velocity -= this.state.lift;
            // add in a resistance (like air)
            this.state.velocity *= World.resistance;

            // update y position
            this.state.y += this.state.velocity;
        }

        this.state.lift = 0;
        ctx.fillStyle = 'hotpink';
        ctx.fillRect(
            this.state.x, 
            this.state.y,
            this.state.height, 
            this.state.width
            );
    }
}

export default Bird;

