export const DUMMY_SCHEDULE = {
  date: new Date("2023-05-24"),
  schedules: [
    {
      startTime: 9.4,
      endTime: 12.0,
      schedule: "Study",
      color: "yellow",
    },
    {
      startTime: 12.0,
      endTime: 12.4,
      schedule: "Lunch",
      color: "blue",
    },
    {
      startTime: 13.0,
      endTime: 15.0,
      schedule: "Study",
      color: "yellow",
    },
  ],
};

export const DUMMY_TODOS = [
  { id: 0, todo: "헬스장가기 - 상체운동", checked: false },
  { id: 1, todo: "Todo 컴포넌트 구현하기", checked: false },
  { id: 2, todo: "고양이 밥주기", checked: false },
];

export const DUMMY_DIET = {
  'breakfast': "샌드위치",
  'lunch': "짜장면, 탕수육",
  'dinner': "닭가슴살 샐러드",
  'snacks': "아이스 아메리카노",
};

export const DUMMY_GOAL = {
  goal: "오늘의 목표는 없습니다."
}