
import ctx from './../lib/context';
import world from './../data/world';

const random = (max, min) => Math.ceil(Math.random() * (max - min) + min);

class Background {
    constructor() {
        this.state = {
            starDefinitions: [{
              name: 'small',
              radius: 1,
              velocity: 4,
              color: 'rgba(255,255,255,1)',
            },
            {
              name: 'medium',
              radius: 1,
              velocity: 2,
              color: 'rgba(255,255,255,0.6)',
            },
            {
              name: 'large',
              radius: 1.5,
              velocity: 1,
              color: 'rgba(255,255,255,0.4)',
            }],
            maxStars: 100,
            stars: [],
        };
        this.createStars();
    }

    generateNewStar() {
        const { starDefinitions } = this.state;
        return { 
          ...starDefinitions[random(0, starDefinitions.length)],
          x: random(0, world.width),
          y: random(0, world.bottom),
        };
    }

    createStars() {
        const { stars, maxStars } = this.state;
        while (stars.length < maxStars) {
          this.state.stars.push(this.generateNewStar());
        }
    }

    onFrame() {
        this.render();
    }

    render() {
        const { stars } = this.state;
        
        stars.forEach((s, i) => {
          const { y, radius, velocity } = s;
          let x = s.x - velocity;
          ctx.fillStyle = s.color;
          ctx.beginPath();
          ctx.arc(x, y, radius, 0, 2 * Math.PI);
          ctx.save()
          ctx.shadowBlur = 5;
	        ctx.shadowColor = '#ffff33';
          ctx.fill();
          ctx.restore();
          stars[i].x = x;
        });
    }
}

export default Background;