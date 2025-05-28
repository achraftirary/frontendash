import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-teacher-attendance',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container">
      <h2 class="page-title">Attendance Management</h2>
      <div class="card mb-4">
        <div class="card-body">
          <div class="mb-4">
            <button class="btn btn-primary">Take Attendance</button>
          </div>
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Date</th>
                  <th>Subject</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <!-- Placeholder for attendance data -->
                <tr>
                  <td colspan="5" class="text-center">No attendance records available</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page-title {
      color: var(--secondary-color);
      margin-bottom: 1.5rem;
    }
  `]
})
export class TeacherAttendanceComponent {} 