import { Comments } from '../types/comments';

const mockComments: Comments = [
  {
    'id': 1,
    'user': {
      'id': 10,
      'isPro': true,
      'name': 'Max',
      'avatarUrl': 'https://12.react.pages.academy/static/avatar/1.jpg'
    },
    'rating': 2,
    'comment': 'Beautiful space, fantastic location and atmosphere, really a wonderful place to spend a few days. Will be back.',
    'date': '2023-03-04T07:31:24.950Z'
  },
  {
    'id': 2,
    'user': {
      'id': 11,
      'isPro': false,
      'name': 'Jack',
      'avatarUrl': 'https://12.react.pages.academy/static/avatar/2.jpg'
    },
    'rating': 4,
    'comment': 'We loved it so much, the house, the veiw, the location just great.. Highly reccomend :)',
    'date': '2023-03-04T07:31:24.950Z'
  }
];

export { mockComments };
