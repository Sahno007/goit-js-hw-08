import Player from '@vimeo/player';
import { throttle } from 'lodash';

const THROTTLE_DELAY = 1000; // максимум один раз на секунду
const currentTimeStorageKey = 'videoplayer-current-time';

const vimeoPlayerElement = document.getElementById('vimeo-player');
const vimeoPlayer = new Player(vimeoPlayerElement);

vimeoPlayer.on('timeupdate', throttle(function(data) {
    const currentTime = data.seconds;
    localStorage.setItem(currentTimeStorageKey, currentTime);
}, THROTTLE_DELAY));

// Відновлення відтворення з позиції відео, збереженої в сховищі
const storedTime = localStorage.getItem(currentTimeStorageKey);
vimeoPlayer.setCurrentTime(parseFloat(storedTime || 0));

// if (storedTime) {
//     vimeoPlayer.setCurrentTime(parseFloat(storedTime));
// }



