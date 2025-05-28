import { User } from './user.model';
import { Absence } from './absence.model';
import { Assignment } from './assignment.model';
import { Class } from './class.model';
import { Evaluation } from './evaluation.model';
import { Resource } from './resource.model';
import { AcademicHistory } from './academic-history.model';
import { Registration } from './registration.model';

export interface Student extends User {
  studentId: string;
  currentClass: Class;
  academicHistory: AcademicHistory;
  absences: Absence[];
  assignments: Assignment[];
  evaluations: Evaluation[];
  resources: Resource[];
  registrations: Registration[];
  personalInfo: {
    dateOfBirth: Date;
    address: string;
    phone?: string;
    emergencyContact: {
      name: string;
      relationship: string;
      phone: string;
    };
  };
}