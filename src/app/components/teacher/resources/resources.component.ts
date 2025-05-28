import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-teacher-resources',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container">
      <h2 class="page-title">Course Resources</h2>
      <div class="card mb-4">
        <div class="card-body">
          <div class="mb-4">
            <button class="btn btn-primary">Upload New Resource</button>
          </div>
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th>Title</th>
                  <th>Subject</th>
                  <th>Type</th>
                  <th>Upload Date</th>
                  <th>Size</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <!-- Placeholder for resources data -->
                <tr>
                  <td colspan="6" class="text-center">No resources available</td>
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
export class TeacherResourcesComponent {} 