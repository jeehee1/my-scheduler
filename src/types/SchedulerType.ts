export type Schedule = {
  id: number;
  startTime: number;
  endTime: number;
  schedule: string;
  color: string;
};
export type Todo = { id: number; todo: string; checked: boolean };
export type Diet = {
  breakfast: string;
  lunch: string;
  dinner: string;
  snacks: string;
};
export type Goal = string;

export type Plan = {
  schedules: Schedule[];
  todos: Todo[];
  diet: Diet;
  goal: Goal;
};
