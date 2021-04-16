import {
  DateConfig
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
    getRandomInt(-DateConfig.DAYS_WEEK, DateConfig.DAYS_WEEK),
    getRandomInt(-DateConfig.MAX_HOURS, DateConfig.MAX_HOURS),
  ),
  author: getRandomArrayElement(CommentInfo.AUTHORS),
  text: getRandomArrayElement(CommentInfo.COMMENTS),
  emotion: getRandomArrayElement(CommentInfo.EMOTIONS),
});

export default generateComment;
