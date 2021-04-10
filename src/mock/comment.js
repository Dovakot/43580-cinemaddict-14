import {
  MAX_HOURS,
  DAYS_WEEK
} from 'const';

import {
  getRandomArrayElement,
  getRandomInt,
  getRandomDate
} from 'utils';

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

const generateComment = () => ({
  date: getRandomDate(
    getRandomInt(-DAYS_WEEK, DAYS_WEEK),
    getRandomInt(-MAX_HOURS, MAX_HOURS),
  ),
  author: getRandomArrayElement(CommentInfo.AUTHORS),
  text: getRandomArrayElement(CommentInfo.COMMENTS),
  emotion: getRandomArrayElement(CommentInfo.EMOTIONS),
});

export default generateComment;
