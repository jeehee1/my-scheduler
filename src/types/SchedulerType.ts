export type typeSchedule = {
  id: number;
  startTime: number;
  endTime: number;
  schedule: string;
  color: string;
};
export type typeTodo = { id: number; todo: string; checked: boolean };
export type typeDiet = {
  breakfast: string;
  lunch: string;
  dinner: string;
  snacks: string;
};
export type typeGoal = {id: string, goal:string};

export type typePlan = {
  schedules: typeSchedule[];
  todos: typeTodo[];
  diet: typeDiet;
  goal: typeGoal;
};
