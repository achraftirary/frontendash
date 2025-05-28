import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-student-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container">
      <h2 class="page-title">Student Dashboard</h2>
      <div class="row">
        <div class="col-md-4">
          <div class="card mb-4">
            <div class="card-body">
              <h5 class="card-title">Assignments</h5>
              <p class="card-text">View and submit your assignments</p>
              <a routerLink="../assignments" class="btn btn-primary">Go to Assignments</a>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card mb-4">
            <div class="card-body">
              <h5 class="card-title">Resources</h5>
              <p class="card-text">Access learning materials</p>
              <a routerLink="../resources" class="btn btn-primary">View Resources</a>
            </div>
          </div>
        </div>
        <div class="col-md-4">
          <div class="card mb-4">
            <div class="card-body">
              <h5 class="card-title">Absences</h5>
              <p class="card-text">Check your attendance record</p>
              <a routerLink="../absences" class="btn btn-primary">View Absences</a>
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
export class StudentDashboardComponent {} 