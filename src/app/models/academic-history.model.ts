import { Student } from './student.model';
import { Class } from './class.model';
import { Evaluation } from './evaluation.model';
import { Absence } from './absence.model';

export interface AcademicHistory {
  id: string;
  student: Student;
  enrollmentHistory: {
    class: Class;
    startDate: Date;
    endDate?: Date;
    status: 'active' | 'completed' | 'withdrawn' | 'failed';
    finalGrade?: number;
  }[];
  evaluations: Evaluation[];
  absences: Absence[];
  gpa?: number;
  academicStanding: 'good' | 'warning' | 'probation';
  achievements: {
    type: string;
    title: string;
    date: Date;
    description?: string;
  }[];
  notes: {
    date: Date;
    content: string;
    author: string;
    type: 'academic' | 'behavioral' | 'administrative';
  }[];
  createdAt: Date;
  updatedAt: Date;
} 