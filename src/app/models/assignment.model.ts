import { Teacher } from './teacher.model';
import { Class } from './class.model';
import { Student } from './student.model';

export interface Assignment {
  id: string;
  title: string;
  description: string;
  class: Class;
  assignedBy: Teacher;
  dueDate: Date;
  points: number;
  status: 'draft' | 'published' | 'closed';
  submissions: AssignmentSubmission[];
  attachments: {
    name: string;
    url: string;
    type: string;
    size: number;
  }[];
  createdAt: Date;
  updatedAt: Date;
}

export interface AssignmentSubmission {
  id: string;
  assignment: Assignment;
  student: Student;
  submittedAt: Date;
  grade?: number;
  feedback?: string;
  status: 'submitted' | 'late' | 'graded' | 'returned';
  attachments: {
    name: string;
    url: string;
    type: string;
    size: number;
  }[];
}