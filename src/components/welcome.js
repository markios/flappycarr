
import Events from '../lib/events';

class Welcome {
  constructor() {
    const el = document.querySelector('.welcome_view');
    this.el = el;
    this.UI = {
      playButton: el.querySelector('.js_play'),
      welcome: el.querySelector('.js_message'),
    }
    this.handleEvents();
  }

  handleEvents() {
    this.UI.playButton.addEventListener('click', this.onPlay.bind(this));
  }

  onPlay() {
    this.render();
    Events.trigger('game/start');
  }

  render() {
    this.el.style.display = 'none';
  }

}


export default new Welcome();