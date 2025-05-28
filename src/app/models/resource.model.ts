import { Teacher } from './teacher.model';
import { Class } from './class.model';

export type ResourceType = 'PDF' | 'VIDEO' | 'PRESENTATION' | 'DOCUMENT' | 'LINK' | 'OTHER';

export interface Resource {
  id: string;
  title: string;
  description: string;
  type: ResourceType;
  url: string;
  fileSize?: number;
  mimeType?: string;
  uploadedBy: Teacher;
  class: Class;
  isPublic: boolean;
  tags: string[];
  uploadDate: Date;
  lastModified: Date;
  status: 'active' | 'archived' | 'deleted';
  metadata?: {
    duration?: number; // For videos
    pageCount?: number; // For documents
    dimensions?: string; // For images
    [key: string]: any;
  };
} 