export interface Task {
  id: number;
  name: string;
  status: string;
  description: string;
  employeeId: number;
  estimatedWorkTime: Date;
  estimatedTaskTimeEnd: Date;
  startDate: Date;
  priorityStatus: string;
  typeTask: string;
}
