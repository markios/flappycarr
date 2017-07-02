
import World from './../data/world';
import ctx from './../lib/context';

class Bar {
  constructor(posX, vel, birdHeight) {
    
    this.state = {
        x: posX,
        y: 0,
        bW: 30,
        tbH: 0,
        bbH: 0,
        boundary: 20,
        color: 'yellowgreen',
        velocity: vel,
        delta: 3 * birdHeight, // min space between
    };

    this.calcDimensions();
  }

  calcDimensions() {
    // top bar
    const topP = Math.random();
    this.state.tbH = topP * (World.bottom - (this.state.boundary * 2) - this.state.delta);

    const botP = Math.random();
    this.state.bbH = botP * ((World.bottom - this.state.tbH) - this.state.delta);
  }

  render() {
    this.state.x -= this.state.velocity;
    ctx.fillStyle = this.state.color;
    ctx.fillRect(
      this.state.x,
      this.state.y,
      this.state.bW,
      this.state.tbH
    );

    ctx.fillRect(
      this.state.x, 
      World.bottom - this.state.bbH,
      this.state.bW,
      this.state.bbH
    );
  }
}

export default Bar;