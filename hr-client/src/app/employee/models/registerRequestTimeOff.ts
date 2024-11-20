export interface RegisterRequestTimeOff {
  employeeId: number;
  leaveType: string;
  reason: string;
  startDate: Date;
  endDate: Date;
}
