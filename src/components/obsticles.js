
import Bar from './bar';
import World from '../data/world';
import ctx from './../lib/context';

class Obsticles {
  constructor(bird){
      this.state = {
          bars: [],
          maxBars: 3,
          barSpacer: 300,
          barVelocity: 5,
      };

      this.bird = bird;

      while(this.state.bars.length < this.state.maxBars) {
          this.addBar();
      }
  }

  addBar() {
      const bars = this.state.bars; 
      const posX = bars.length ? 
          (bars[bars.length - 1].state.x + this.state.barSpacer)
          : World.width;

      bars.push(new Bar(posX, this.state.barVelocity, this.bird.state.height));
  }

  manageBars() {
      this.state.bars.forEach(bar => { 
          if (bar.state.x <= (0 - bar.state.bW)) {
              this.state.bars.splice(0, 1);
              this.addBar();
          }
      });
  }

  onFrame() {
      this.render();
      this.manageBars();
  }

  render() {
      this.state.bars.forEach(bar => { 
          bar.render();
      });
  }
}

export default Obsticles;