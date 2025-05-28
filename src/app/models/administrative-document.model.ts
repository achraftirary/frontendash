import { User } from './user.model';

export interface AdministrativeDocument {
  id: number;
  type: 'certificate' | 'transcript' | 'attestation' | 'other';
  title: string;
  description: string;
  requestedBy: User;
  requestDate: Date;
  status: 'pending' | 'approved' | 'rejected' | 'processed';
  processedBy?: string; // admin ID
  processedDate?: Date;
  documentUrl?: string;
  remarks?: string;
} 