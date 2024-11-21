export const books = [
  {
    id: 1,
    rank: 1,
    title: '미래의 몰락',
    author: '김태완',
    cover: '/images/slide-1.png',
    rating: 4.5,
    description: '인류의 미래가 걸린 대서사시가 시작된다...',
    publishDate: '2024-01-15',
    pages: [
      {
        title: '프롤로그',
        content: `
          2157년, 인류는 마침내 우주 진출에 성공했다.
          하지만 그들이 발견한 것은 상상을 초월한 새로운 위험이었다.
          이제 인류의 운명이 걸린 대모험이 시작된다...
        `,
      },
      {
        title: '1장: 새로운 발견',
        content: `
          서울 우주연구소의 한 구석에서 특별한 신호가 감지되었다.
          김민준 박사는 그 신호의 정체를 확인하기 위해 밤낮으로 연구를 이어갔다.
          "이건... 혹시 그들의 메시지일까요?"
        `,
      },
      {
        title: '2장: 첫 만남',
        content: `
          신호를 따라 도착한 목성 근처에서 그들은 믿을 수 없는 광경을 목격했다.
          거대한 구조물이 목성의 궤도를 돌고 있었다.
          인류 최초의 외계 문명과의 만남이 시작되는 순간이었다.
        `,
      },
    ],
    chapters: [
      { title: '프롤로그', page: 1 },
      { title: '1장: 새로운 발견', page: 3 },
      { title: '2장: 첫 만남', page: 15 },
      { title: '3장: 진실', page: 27 },
      { title: '4장: 선택', page: 42 },
      { title: '에필로그', page: 56 },
    ],
  },
  {
    id: 2,
    rank: 2,
    title: '바람의 노래',
    author: '이하늘',
    cover: '/images/slide-2.png',
    rating: 4.8,
    description: '한국 판타지 문학의 새로운 지평을 연다',
    publishDate: '2024-02-01',
    pages: [
      {
        title: '서막',
        content: `
          고요한 새벽, 바람이 불어오는 방향에서 이상한 소리가 들려왔다.
          마을 사람들은 그것을 신의 속삭임이라 불렀다.
        `,
      },
      {
        title: '1부: 바람의 시작',
        content: `
          윤하는 어렸을 때부터 바람의 소리를 들을 수 있었다.
          그것은 축복이자 저주였다.
          바람이 전하는 이야기는 때로는 기쁨을, 때로는 슬픔을 담고 있었다.
        `,
      },
    ],
    chapters: [
      { title: '서막', page: 1 },
      { title: '1부: 바람의 시작', page: 5 },
      { title: '2부: 예언', page: 25 },
      { title: '3부: 운명', page: 45 },
    ],
  },
  {
    id: 3,
    rank: 3,
    title: '푸른 달빛',
    author: '박서연',
    cover: '/images/slide-1.png',
    rating: 4.6,
    description: '현대 로맨스의 새로운 걸작',
    publishDate: '2024-02-15',
    pages: [
      {
        title: '프롤로그',
        content: `
          서울의 밤거리는 언제나 화려했다.
          하지만 그날 밤은 달빛이 유독 푸르게 빛났다.
        `,
      },
      {
        title: '1장: 우연한 만남',
        content: `
          커피숍에서 우연히 마주친 그와 나.
          시간이 멈춘 것 같았다.
          그의 눈동자에 비친 푸른 달빛이 아직도 선명하다.
        `,
      },
    ],
    chapters: [
      { title: '프롤로그', page: 1 },
      { title: '1장: 우연한 만남', page: 3 },
      { title: '2장: 설렘', page: 15 },
      { title: '3장: 선택', page: 30 },
    ],
  },
  {
    id: 4,
    rank: 4,
    title: '시간의 미로',
    author: '정태윤',
    cover: '/images/slide-2.png',
    rating: 4.7,
    description: '시간여행 스릴러의 새로운 기준',
    publishDate: '2024-03-01',
    pages: [
      {
        title: '시작',
        content: `
          나는 2024년에서 출발했다.
          하지만 지금은 어느 시간에 있는지 모른다.
        `,
      },
    ],
    chapters: [
      { title: '시작', page: 1 },
      { title: '과거로', page: 10 },
      { title: '미래에서', page: 25 },
    ],
  },
  {
    id: 5,
    rank: 5,
    title: '인공의 꿈',
    author: '김도현',
    cover: '/images/slide-1.png',
    rating: 4.4,
    description: 'AI와 인간의 경계에 대한 이야기',
    publishDate: '2024-03-15',
    pages: [
      {
        title: '프롤로그',
        content: `
          그들은 스스로를 인간이라 불렀다.
          하지만 나는 그들이 진짜 인간인지 의심스러웠다.
        `,
      },
    ],
    chapters: [
      { title: '프롤로그', page: 1 },
      { title: '의심', page: 5 },
      { title: '진실', page: 20 },
    ],
  },
  {
    id: 6,
    rank: 6,
    title: '마지막 여름',
    author: '이수진',
    cover: '/images/slide-2.png',
    rating: 4.3,
    description: '청춘의 마지막 순간을 담다',
    publishDate: '2024-03-30',
    pages: [
      {
        title: '시작하며',
        content: `
          스무 살의 마지막 여름이었다.
          우리는 알고 있었다, 이게 마지막이라는 것을.
        `,
      },
    ],
    chapters: [
      { title: '시작하며', page: 1 },
      { title: '7월의 약속', page: 8 },
      { title: '8월의 진실', page: 18 },
    ],
  },
];
