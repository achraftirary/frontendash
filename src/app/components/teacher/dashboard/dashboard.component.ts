import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-teacher-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container">
      <h2 class="page-title">Teacher Dashboard</h2>
      <div class="row">
        <div class="col-md-4">
          <div class="card mb-4">
            <div class="card-body">
              <h5 class="card-title">Grades Management</h5>
              <p class="card-text">Manage and submit student grades</p>
              <a routerLink="../grades" class="btn btn-primary">Manage Grades</a>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card mb-4">
            <div class="card-body">
              <h5 class="card-title">Resources</h5>
              <p class="card-text">Upload and manage course materials</p>
              <a routerLink="../resources" class="btn btn-primary">Manage Resources</a>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card mb-4">
            <div class="card-body">
              <h5 class="card-title">Attendance</h5>
              <p class="card-text">Track student attendance</p>
              <a routerLink="../attendance" class="btn btn-primary">Manage Attendance</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .page-title {
      margin-bottom: 2rem;
    }
    .card {
      transition: transform 0.2s;
    }
    .card:hover {
      transform: translateY(-5px);
    }
  `]
})
export class TeacherDashboardComponent {} 