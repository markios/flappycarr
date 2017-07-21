    
import Events from './../lib/events';
import ctx from './../lib/context';
import Bird from './bird';
import World from '../data/world';
import Obsticles from './obsticles';

const canvas = document.querySelector('#game');
    
class Game {
    constructor() {
        this.state = {
            play: false,
            delay: 1000,
            score: 0,
            over: false,
            framesSpeed: 1000 / 30,
        };

        this.renderReset();
        this.handleEvents();
    }

    handleEvents() {
        Events.on('game/start', this.onGameStart.bind(this));
    }

    play() {
        this.state.play = true;
        this.bird = new Bird();
        this.obs = new Obsticles(this.bird);
        // start the frame loop
        this.runFrames();
    }

    get score() {
        return this.state.score;
    }

    set score(val) {
        this.state.score = val;
    }

    // Evevnts

    onGameStart() {
        setTimeout(this.play.bind(this), this.state.delay);
    }

    gameEnd() {
        clearInterval(this.frames);
        this.state.play = false;
        Events.trigger('game/over');
    }

    detectCollision() {
        const birdPosition = this.bird.state;
        const bars = this.obs.state.bars;
        let collided = false;

        const barsCollided = () => {
            return !bars.every(bar => {
                const barPosition = bar.state;
                // if the bird is before or after the bar its all good
                const awayFromBar = (birdPosition.realX < barPosition.x || birdPosition.x > barPosition.realX);
                // if the bird is in the bar, is it in the gap?
                const inSafeZone = birdPosition.y > barPosition.safeZone.y && birdPosition.realY < barPosition.safeZone.realY;
                return awayFromBar || inSafeZone;
            });
        }

        // detect top
        if (birdPosition.y <= 0) collided = true;

        // detect bottom
        else if (birdPosition.realY >= World.bottom) collided = true;
        
        else if (barsCollided()) collided = true;

        if (collided) this.gameEnd();
    }

    runFrames() {
        this.frames = setInterval(function() {
            if (this.state.play) {
                this.render();
                this.detectCollision();
            }
            ctx.stroke();
        }.bind(this), this.state.framesSpeed);
    }

    // render

    renderReset() {
        ctx.beginPath();
        ctx.fillStyle = '#000';
        ctx.fillRect(0, 0, canvas.clientWidth, canvas.clientHeight);
    }

    render() {
        this.renderReset();
        this.bird.onFrame();
        this.obs.onFrame();
    }

}

export default new Game();

