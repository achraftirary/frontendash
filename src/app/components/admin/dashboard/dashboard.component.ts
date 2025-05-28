import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="dashboard-container">
      <div class="container py-4">
        <h2 class="page-title">Admin Dashboard</h2>
        
        <!-- Quick Stats -->
        <div class="row g-4 mb-4">
          <div class="col-md-3">
            <div class="stats-card bg-gradient-primary text-white">
              <div class="stats-icon">
                <i class="fas fa-users"></i>
              </div>
              <div class="stats-info">
                <h3>1,250</h3>
                <p>Total Users</p>
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="stats-card bg-success text-white">
              <div class="stats-icon">
                <i class="fas fa-graduation-cap"></i>
              </div>
              <div class="stats-info">
                <h3>45</h3>
                <p>Active Courses</p>
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="stats-card bg-gradient-primary text-white">
              <div class="stats-icon">
                <i class="fas fa-chalkboard-teacher"></i>
              </div>
              <div class="stats-info">
                <h3>68</h3>
                <p>Teachers</p>
              </div>
            </div>
          </div>
          <div class="col-md-3">
            <div class="stats-card bg-success text-white">
              <div class="stats-icon">
                <i class="fas fa-user-graduate"></i>
              </div>
              <div class="stats-info">
                <h3>1,182</h3>
                <p>Students</p>
              </div>
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="row g-4">
          <div class="col-md-4">
            <div class="card action-card">
              <div class="card-body text-center">
                <div class="action-icon">
                  <i class="fas fa-users-cog"></i>
                </div>
                <h5 class="card-title">User Management</h5>
                <p class="card-text">Manage students, teachers, and staff accounts</p>
                <a routerLink="../users" class="btn btn-primary">Manage Users</a>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card action-card">
              <div class="card-body text-center">
                <div class="action-icon">
                  <i class="fas fa-file-alt"></i>
                </div>
                <h5 class="card-title">Document Management</h5>
                <p class="card-text">Manage system-wide documents and forms</p>
                <a routerLink="../documents" class="btn btn-primary">Manage Documents</a>
              </div>
            </div>
          </div>
          <div class="col-md-4">
            <div class="card action-card">
              <div class="card-body text-center">
                <div class="action-icon">
                  <i class="fas fa-cogs"></i>
                </div>
                <h5 class="card-title">System Settings</h5>
                <p class="card-text">Configure system settings and preferences</p>
                <button class="btn btn-primary">Manage Settings</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .dashboard-container {
      background-color: var(--neutral-50);
      min-height: 100vh;
      padding-top: 1rem;
    }

    .page-title {
      color: var(--theme-primary);
      font-weight: 600;
      margin-bottom: 2rem;
    }

    /* Stats Cards */
    .stats-card {
      padding: 1.5rem;
      border-radius: 12px;
      display: flex;
      align-items: center;
      gap: 1rem;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
    }

    .stats-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
    }

    .stats-icon {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      background: rgba(255, 255, 255, 0.2);
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .stats-icon i {
      font-size: 1.5rem;
    }

    .stats-info h3 {
      font-size: 1.8rem;
      margin: 0;
      font-weight: 600;
    }

    .stats-info p {
      margin: 0;
      opacity: 0.9;
    }

    /* Action Cards */
    .action-card {
      height: 100%;
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      border: none;
      border-radius: 12px;
      overflow: hidden;
    }

    .action-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
    }

    .action-icon {
      width: 64px;
      height: 64px;
      border-radius: 50%;
      background: var(--theme-primary);
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 auto 1.5rem;
      transition: transform 0.3s ease;
    }

    .action-card:hover .action-icon {
      transform: scale(1.1);
    }

    .action-icon i {
      font-size: 1.75rem;
    }

    .card-title {
      color: var(--theme-primary);
      font-weight: 600;
      margin-bottom: 0.75rem;
    }

    .card-text {
      color: var(--neutral-600);
      margin-bottom: 1.5rem;
    }

    /* Responsive Adjustments */
    @media (max-width: 768px) {
      .stats-card {
        margin-bottom: 1rem;
      }

      .action-card {
        margin-bottom: 1rem;
      }
    }
  `]
})
export class AdminDashboardComponent {} 