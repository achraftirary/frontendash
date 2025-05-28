import { Student } from './student.model';
import { Class } from './class.model';

export interface Registration {
  id: number;
  student: Student;
  class: Class;
  academicYear: string;
  registrationDate: Date;
  status: 'pending' | 'approved' | 'rejected' | 'active' | 'completed';
  approvedBy?: string; // admin ID
  approvalDate?: Date;
  paymentStatus: 'pending' | 'partial' | 'complete';
  documents: string[]; // URLs to required documents
  remarks?: string;
} 