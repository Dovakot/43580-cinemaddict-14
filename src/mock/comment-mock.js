import {
  DateConfig
} from 'const';

import {
  getRandomArrayElement,
  getRandomInt,
  getRandomDate
} from 'utils/common-util';

const CommentInfo = {
  AUTHORS: [
    'Jonathan Joestar',
    'The Doctor',
    'Martin Eden',
    'Hokage',
    'Dovahkiin',
  ],
  COMMENTS: [
    'Interesting setting and a good cast',
    'Booooooooooring',
    'Exterminate!',
    'Almost two hours? Seriously?',
    'Nice!',
    'Omae Wa Mou Shindeiru!',
  ],
  EMOTIONS: [
    'smile',
    'sleeping',
    'puke',
    'angry',
  ],
};

let idCounter = 0;

const generateComment = (id, text, emotion) => ({
  id: id || idCounter++,
  date: getRandomDate(
    getRandomInt(-DateConfig.DAYS_WEEK, DateConfig.DAYS_WEEK),
    getRandomInt(-DateConfig.MAX_HOURS, DateConfig.MAX_HOURS),
  ),
  author: getRandomArrayElement(CommentInfo.AUTHORS),
  text: text || getRandomArrayElement(CommentInfo.COMMENTS),
  emotion: emotion || getRandomArrayElement(CommentInfo.EMOTIONS),
});

export default generateComment;
