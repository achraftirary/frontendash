import { Student } from './student.model';
import { Teacher } from './teacher.model';
import { Class } from './class.model';

export interface Absence {
  id: string;
  student: Student;
  class: Class;
  date: Date;
  type: 'excused' | 'unexcused' | 'late';
  duration: number; // in minutes
  recordedBy: Teacher;
  justification?: {
    reason: string;
    document?: {
      name: string;
      url: string;
      type: string;
    };
    submittedAt: Date;
    status: 'pending' | 'approved' | 'rejected';
    approvedBy?: Teacher;
    approvedAt?: Date;
  };
  createdAt: Date;
  updatedAt: Date;
} 