// 포함 내용 : 시작날짜, 종료날짜, 스케쥴, 장소, 멤버;

type MonthlySchedules = {
  id: string;
  date: string;
  schedule: string;
  location: string;
  members: string[];
};

export const DUMMY_MONTHLY_DATA: MonthlySchedules[] = [
  {
    id: "01",
    date: "2023-09-28",
    schedule: "중간고사",
    location: "학교",
    members: ["친구1", "친구2"],
  },
  {
    id: "02",
    date: "2023-10-03",
    schedule: "단기 아르바이트",
    location: "",
    members: [],
  },
  
  {
    id: "03",
    date: "2023-10-05",
    schedule: "과제",
    location: "학교",
    members: ["조원1", "조원2", "조원3"],
  },
  {
    id: "03",
    date: "2023-10-05",
    schedule: "과제",
    location: "학교",
    members: ["조원1", "조원2", "조원3"],
  },
  {
    id: "03",
    date: "2023-10-05",
    schedule: "과제",
    location: "학교",
    members: ["조원1", "조원2", "조원3"],
  },
  {
    id: "03",
    date: "2023-10-05",
    schedule: "과제",
    location: "학교",
    members: ["조원1", "조원2", "조원3"],
  },
  {
    id: "03",
    date: "2023-10-05",
    schedule: "과제",
    location: "학교",
    members: ["조원1", "조원2", "조원3"],
  },
  {
    id: "04",
    date: "2023-10-05",
    schedule: "중간고사",
    location: "학교",
    members: ["친구1", "친구2"],
  },
];
