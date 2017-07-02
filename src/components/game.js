    
import Events from './../lib/events';
import ctx from './../lib/context';
import Bird from './bird';
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
        Events.on('game/end', this.onGameEnd.bind(this));
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

    onGameStart() {
        setTimeout(this.play.bind(this), this.state.delay);
    }

    onGameEnd() {
        clearInterval(this.frames);
        Events.trigger('game/over');
    }

    runFrames() {
        this.frames = setInterval(function() {
            if (this.state.play) this.render();
            ctx.stroke();
        }.bind(this), this.state.framesSpeed);
    }

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

