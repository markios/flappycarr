    
    const canvas = document.querySelector('#game');
    const ctx = canvas.getContext("2d");

    class Game {
        constructor() {
            this.state = {
                play: false,
                score: 0,
                over: false,
                frames: 1000 / 30,
            };

            this.UI = {
                el: document.querySelector('#start')
            }
        }

        play() {
            this.game = new Game();
            this.bird = new Bird();
            this.obs = new Obsticles(this.bird);
            return this.state.play;
        }

        get score() {
            return this.state.score;
        }

        set score(val) {
            this.state.score = val;
        }

        gameOver() {
            clearInterval(this.frames);
            this.state.score;
        }

        runFrames() {
            this.frames = setInterval(() => {
                if (game.play) this.render();
                ctx.stroke();
            }, this.state.frames);
        }

        reset() {
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

export default Game;

