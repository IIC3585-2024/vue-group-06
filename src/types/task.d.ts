export interface Task {
  id?: number;
  currentTask: boolean;
  title: string;
  description: string;
  type: string;
  startedAt?: Date;
  endedAt?: Date;
  remainingTime: number;
  totalTime: number;
  duration: number;
  durationUnit: string;
  completed: boolean;
}