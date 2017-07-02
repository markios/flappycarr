    
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

        const notHitBar = bars.every(bar => {
            const prop = bar.state;
            console.log(`${birdPosition.realX} < ${prop.x} && ${birdPosition.y} > ${prop.tbH}`);
            console.log(birdPosition.realX < prop.x && birdPosition.realY < (World.bottom - this.state.bbH));
            return birdPosition.realX < prop.x && (birdPosition.realX >= prop.x && birdPosition.y > prop.tbH)
                && birdPosition.realX < prop.x && birdPosition.realY < (World.bottom - this.state.bbH)
        });

        // detect top
        if (birdPosition.y <= 0) collided = true;

        // detect bottom
        else if (birdPosition.y + birdPosition.height >= World.bottom) collided = true;
        
        // detect bar hit
        else if (! notHitBar) collided = true;

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

