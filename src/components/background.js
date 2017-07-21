
import ctx from './../lib/context';

class Background {
    constructor() {
        state = {
            starDefinitions: [{
              name: 'small',
              radius: 3,
              velocity: 7,
              color: rgba(255,255,255,0.8)
            },
            {
              name: 'medium',
              radius: 3,
              velocity: 5,
              color: rgba(255,255,255,0.6)
            },
            {
              name: 'large',
              radius: 3,
              velocity: 1,
              color: rgba(255,255,255,0.3)
            }],
            maxStars: 100,
            stars: [],
        };
        this.createStars();
    }

    generateNewStar() {
        const {  } = this.state;
    }

    createStars() {
        const { stars, maxStars } = this.state;
        while (stars.length < maxStars) {
          const newStar = Math.random()
          this.state.stars.push()
        }
    }

    onFrame() {
        this.render();
    }

    render() {
        const { stars } = this.props;
        
        stars.forEach(s => {
          const { x, y, radius } = s.state;
          ctx.fillStyle = s.color;
          ctx.beginPath();
          ctx.arc(x, y, radius, 0, 2 * Math.PI);
          ctx.fill();
        });
    }
}

export default Background;