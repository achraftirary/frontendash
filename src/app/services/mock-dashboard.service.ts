import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';

export interface QuickStat {
  id: string;
  title: string;
  value: string | number;
  icon: string;
  color: string;
}

export interface Activity {
  id: string;
  title: string;
  description: string;
  type: 'course' | 'assignment' | 'comment' | 'grade';
  timestamp: Date;
  icon: string;
  color: string;
}

export interface Event {
  id: string;
  title: string;
  date: Date;
  time: string;
  type: 'exam' | 'assignment' | 'workshop' | 'meeting';
}

@Injectable({
  providedIn: 'root'
})
export class MockDashboardService {
  private quickStats: QuickStat[] = [
    {
      id: '1',
      title: 'Active Courses',
      value: 12,
      icon: 'fas fa-book',
      color: 'primary'
    },
    {
      id: '2',
      title: 'Attendance Rate',
      value: '85%',
      icon: 'fas fa-tasks',
      color: 'success'
    },
    {
      id: '3',
      title: 'Upcoming Events',
      value: 3,
      icon: 'fas fa-clock',
      color: 'info'
    },
    {
      id: '4',
      title: 'Pending Tasks',
      value: 5,
      icon: 'fas fa-file-alt',
      color: 'warning'
    }
  ];

  private recentActivities: Activity[] = [
    {
      id: '1',
      title: 'New course material available',
      description: 'Mathematics II - Chapter 5 notes uploaded',
      type: 'course',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000), // 2 hours ago
      icon: 'fas fa-book',
      color: 'primary'
    },
    {
      id: '2',
      title: 'Assignment submitted',
      description: 'Data Structures - Assignment 3',
      type: 'assignment',
      timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000), // 5 hours ago
      icon: 'fas fa-check',
      color: 'success'
    },
    {
      id: '3',
      title: 'New comment on your post',
      description: 'Prof. Ahmed commented on your question',
      type: 'comment',
      timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000), // 1 day ago
      icon: 'fas fa-comment',
      color: 'info'
    }
  ];

  private upcomingEvents: Event[] = [
    {
      id: '1',
      title: 'Mathematics Exam',
      date: new Date('2024-05-15'),
      time: '09:00 AM',
      type: 'exam'
    },
    {
      id: '2',
      title: 'Project Presentation',
      date: new Date('2024-05-18'),
      time: '02:00 PM',
      type: 'assignment'
    },
    {
      id: '3',
      title: 'Workshop: Data Science',
      date: new Date('2024-05-20'),
      time: '10:00 AM',
      type: 'workshop'
    }
  ];

  constructor() {}

  getQuickStats(): Observable<QuickStat[]> {
    return of(this.quickStats).pipe(delay(500));
  }

  getRecentActivities(): Observable<Activity[]> {
    return of(this.recentActivities).pipe(delay(500));
  }

  getUpcomingEvents(): Observable<Event[]> {
    return of(this.upcomingEvents).pipe(delay(500));
  }
} 