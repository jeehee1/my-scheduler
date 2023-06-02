export const DUMMY_DATA = {
  date: new Date("2023-05-24"),
  schedules: [
    {
      id: 0,
      startTime: 9.4,
      endTime: 12.0,
      schedule: "Study",
      color: "yellow",
    },
    {
      id: 1,
      startTime: 12.0,
      endTime: 12.4,
      schedule: "Lunch",
      color: "blue",
    },
    {
      id: 2,
      startTime: 13.0,
      endTime: 15.0,
      schedule: "Study",
      color: "yellow",
    },
  ],
  todos: [
    { id: 0, todo: "헬스장가기 - 상체운동", checked: false },
    { id: 1, todo: "Todo 컴포넌트 구현하기", checked: false },
    { id: 2, todo: "고양이 밥주기", checked: false },
  ],
  diet: {
    breakfast: "샌드위치",
    lunch: "짜장면, 탕수육",
    dinner: "닭가슴살 샐러드",
    snacks: "아이스 아메리카노",
  },
  goal: "Do your best",
};
