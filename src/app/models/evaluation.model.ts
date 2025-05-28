import { Student } from './student.model';
import { Teacher } from './teacher.model';
import { Class } from './class.model';
import { Assignment } from './assignment.model';

export type EvaluationType = 'EXAM' | 'QUIZ' | 'ASSIGNMENT' | 'PROJECT' | 'PARTICIPATION';

export interface Evaluation {
  id: string;
  student: Student;
  class: Class;
  type: EvaluationType;
  title: string;
  description?: string;
  date: Date;
  score: number;
  maxScore: number;
  weight: number;
  gradedBy: Teacher;
  assignment?: Assignment;
  feedback?: string;
  status: 'draft' | 'published' | 'archived';
  metadata?: {
    duration?: number;
    attempts?: number;
    difficulty?: 'easy' | 'medium' | 'hard';
    [key: string]: any;
  };
  createdAt: Date;
  updatedAt: Date;
} 