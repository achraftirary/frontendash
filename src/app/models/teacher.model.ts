import { User } from './user.model';
import { Course } from './course.model';

export interface Teacher extends User {
  department: string;
  subjects: string[];
  courses: Course[];
  officeHours?: string;
  contactInfo: {
    email: string;
    phone?: string;
    office?: string;
  };
} 