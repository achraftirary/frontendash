import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-student-resources',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container">
      <h2 class="page-title">Learning Resources</h2>
      <div class="row">
        <div class="col-md-4 mb-4" *ngFor="let subject of ['Mathematics', 'Physics', 'Computer Science']">
          <div class="card h-100">
            <div class="card-body">
              <h5 class="card-title">{{subject}}</h5>
              <p class="card-text">Access learning materials for {{subject}}</p>
              <button class="btn btn-primary">View Resources</button>
            </div>
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
    .card {
      transition: transform 0.2s;
    }
    .card:hover {
      transform: translateY(-5px);
    }
  `]
})
export class StudentResourcesComponent {} 