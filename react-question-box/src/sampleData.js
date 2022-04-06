const sampleData = [
  {
    question: 'Why did the chicken cross the road?',
    author: 'TestUser1',
    answers: [
      {
        answer: 'to solve the meaning of life',
        author: 'TestUser1',
        isBest: false,
      },
      { answer: 'To get to the other side', author: 'TestUser2', isBest: true },
      {
        answer: 'To cross the river sticks',
        author: 'TestUser3',
        isBest: false,
      },
    ],
  },
  {
    question: 'What is the meaning of life?',
    author: 'TestUser2',
    answers: [
      {
        answer:
          'There is not meaning to life. Life is an abundance of emptiness and a solidification of our inherent uselessness in all aspects',
        author: 'TestUser3',
        isBest: false,
      },
      {
        answer:
          'To serve God and partake in his wonderous creation, coming closer to Him in all things through His son Jesus Christ',
        author: 'TestUser1',
        isBest: false,
      },
      {
        answer: '42',
        author: 'TestUser2',
        isBest: true,
      },
    ],
  },
  {
    question: 'Who is the best Avenger?',
    author: 'TestUser3',
    answers: [
      {
        answer:
          'Tony Stark. Even through all his shortcomings and selfishness, finally in the end, he sacrificed himself for all of humanity, even at the cost of losing his life, the thing he clung to so fervently in the past.',
        author: 'TestUser2',
        isBest: true,
      },
      {
        answer: 'Loki. Duh. Tom Hiddleston is smexy.',
        author: 'TestUser3',
        isBest: false,
      },
      {
        answer: 'I AM GROOT!',
        author: 'TestUser1',
        isBest: false,
      },
    ],
  },
];

export default sampleData;
