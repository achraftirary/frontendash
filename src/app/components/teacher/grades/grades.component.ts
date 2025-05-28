import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-teacher-grades',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container">
      <h2 class="page-title">Grades Management</h2>
      <div class="card mb-4">
        <div class="card-body">
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th>Student Name</th>
                  <th>Subject</th>
                  <th>Assignment</th>
                  <th>Grade</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <!-- Placeholder for grades data -->
                <tr>
                  <td colspan="6" class="text-center">No grades available</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div class="mt-3">
            <button class="btn btn-primary">Add New Grade</button>
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
export class TeacherGradesComponent {} 