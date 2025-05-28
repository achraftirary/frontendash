import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-admin-user-management',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="container">
      <h2 class="page-title">User Management</h2>
      <div class="card mb-4">
        <div class="card-body">
          <div class="mb-4">
            <button class="btn btn-primary me-2">Add New User</button>
            <button class="btn btn-outline-primary">Import Users</button>
          </div>
          <div class="table-responsive">
            <table class="table">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Last Login</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                <!-- Placeholder for user data -->
                <tr>
                  <td colspan="6" class="text-center">No users available</td>
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
export class AdminUserManagementComponent {} 