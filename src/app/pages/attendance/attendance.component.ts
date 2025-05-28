import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatProgressBarModule } from '@angular/material/progress-bar';

interface AttendanceRecord {
  course: string;
  date: string;
  status: 'present' | 'absent' | 'excused';
  professor: string;
  duration: string;
}

@Component({
  selector: 'app-attendance',
  standalone: true,
  imports: [
    CommonModule,
    MatCardModule,
    MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatChipsModule,
    MatProgressBarModule
  ],
  template: `
    <div class="attendance-container">
      <h1>Gestion des présences</h1>
      <!-- Contenu des présences -->
    </div>
  `,
  styles: [`
    .attendance-container {
      padding: 20px;
    }
  `]
})
export class AttendanceComponent {
  displayedColumns: string[] = ['date', 'course', 'professor', 'duration', 'status'];

  attendanceRecords: AttendanceRecord[] = [
    {
      date: '15 Mai 2024',
      course: 'Mathématiques II',
      professor: 'Prof. Mohammed Hassan',
      duration: '2h',
      status: 'present'
    },
    {
      date: '14 Mai 2024',
      course: 'Structures de Données',
      professor: 'Prof. Sarah Ahmed',
      duration: '1h30',
      status: 'absent'
    },
    {
      date: '13 Mai 2024',
      course: 'Statistiques',
      professor: 'Prof. Karim Bensouda',
      duration: '2h',
      status: 'excused'
    }
  ];

  getStatusColor(status: string): string {
    switch (status) {
      case 'present': return 'primary';
      case 'absent': return 'warn';
      case 'excused': return 'accent';
      default: return '';
    }
  }

  getStatusLabel(status: string): string {
    switch (status) {
      case 'present': return 'Présent';
      case 'absent': return 'Absent';
      case 'excused': return 'Justifié';
      default: return status;
    }
  }
} 