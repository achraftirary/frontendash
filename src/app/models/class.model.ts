import { Teacher } from './teacher.model';
import { Student } from './student.model';
import { Resource } from './resource.model';
import { Assignment } from './assignment.model';

export interface Class {
  id: string;
  name: string;
  level: string;
  academicYear: string;
  teachers: Teacher[];
  students: Student[];
  resources: Resource[];
  assignments: Assignment[];
  schedule: {
    dayOfWeek: number;
    startTime: string;
    endTime: string;
    room: string;
  }[];
  status: 'active' | 'archived';
  createdAt: Date;
  updatedAt: Date;
} 