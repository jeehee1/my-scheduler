export type typeSchedule = {
  id: string;
  startTime: string;
  endTime: string;
  schedule: string;
  color: string;
};
export type typeTodo = { todo: string; checked: boolean };
export type typeDiet = {
  breakfast: string;
  lunch: string;
  dinner: string;
  snacks: string;
};
export type typeGoal = { id: string; goal: string };

export type typePlan = {
  schedules: typeSchedule[];
  todos: typeTodo[];
  diet: typeDiet;
  goal: typeGoal;
};

export type monthlySchedule = {
  date: string;
  schedule: string;
  location: string;
  members: string[];
};
