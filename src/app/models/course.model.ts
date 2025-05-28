import { Teacher } from './teacher.model';
import { Student } from './student.model';
import { Assignment } from './assignment.model';

export interface Course {
  id: number;
  name: string;
  code: string;
  description: string;
  teacher: Teacher;
  students: Student[];
  assignments: Assignment[];
  schedule: {
    dayOfWeek: string;
    startTime: string;
    endTime: string;
    room: string;
  }[];
  semester: string;
  academicYear: string;
  maxCapacity: number;
  currentEnrollment: number;
} 