import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from '../../models/user.model';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-profile',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="profile-container">
      <div class="container py-4">
        <h1 class="page-title mb-4">Profile</h1>
        
        <div class="row">
          <!-- Profile Sidebar -->
          <div class="col-lg-4 mb-4">
            <div class="card profile-card">
              <div class="profile-cover"></div>
              <div class="profile-avatar">
                <img [src]="user.avatar || 'assets/images/default-avatar.jpg'" [alt]="user.name">
                <button class="btn btn-light btn-sm edit-avatar">
                  <i class="fas fa-camera"></i>
                </button>
              </div>
              <div class="profile-info text-center">
                <h3 class="mb-0">{{user.name}}</h3>
                <p class="text-muted">{{user.role}}</p>
                <div class="profile-stats">
                  <div class="stat-item">
                    <h4>12</h4>
                    <span>Courses</span>
                  </div>
                  <div class="stat-item">
                    <h4>85%</h4>
                    <span>Progress</span>
                  </div>
                  <div class="stat-item">
                    <h4>4.8</h4>
                    <span>Rating</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Quick Links -->
            <div class="card mt-4">
              <div class="card-body">
                <h5 class="card-title">Quick Links</h5>
                <div class="quick-links">
                  <a href="#" class="quick-link">
                    <i class="fas fa-graduation-cap"></i>
                    My Courses
                  </a>
                  <a href="#" class="quick-link">
                    <i class="fas fa-calendar-alt"></i>
                    Schedule
                  </a>
                  <a href="#" class="quick-link">
                    <i class="fas fa-certificate"></i>
                    Certificates
                  </a>
                  <a href="#" class="quick-link">
                    <i class="fas fa-cog"></i>
                    Settings
                  </a>
                </div>
              </div>
            </div>
          </div>

          <!-- Profile Content -->
          <div class="col-lg-8">
            <!-- Personal Information -->
            <div class="card mb-4">
              <div class="card-header">
                <h5 class="card-title mb-0">Personal Information</h5>
              </div>
              <div class="card-body">
                <form>
                  <div class="row mb-3">
                    <div class="col-md-6">
                      <label class="form-label">Full Name</label>
                      <input type="text" class="form-control" [(ngModel)]="user.name" name="name">
                    </div>
                    <div class="col-md-6">
                      <label class="form-label">Email</label>
                      <input type="email" class="form-control" [(ngModel)]="user.email" name="email">
                    </div>
                  </div>
                  <div class="row mb-3">
                    <div class="col-md-6">
                      <label class="form-label">Phone</label>
                      <input type="tel" class="form-control" [(ngModel)]="user.phone" name="phone">
                    </div>
                    <div class="col-md-6">
                      <label class="form-label">Student ID</label>
                      <input type="text" class="form-control" [(ngModel)]="user.studentId" name="studentId" readonly>
                    </div>
                  </div>
                  <div class="row mb-3">
                    <div class="col-12">
                      <label class="form-label">Bio</label>
                      <textarea class="form-control" rows="3" [(ngModel)]="user.bio" name="bio"></textarea>
                    </div>
                  </div>
                  <button type="submit" class="btn btn-primary">Save Changes</button>
                </form>
              </div>
            </div>

            <!-- Academic Information -->
            <div class="card mb-4">
              <div class="card-header">
                <h5 class="card-title mb-0">Academic Information</h5>
              </div>
              <div class="card-body">
                <div class="academic-info">
                  <div class="info-item">
                    <span class="info-label">Department</span>
                    <span class="info-value">Computer Science</span>
                  </div>
                  <div class="info-item">
                    <span class="info-label">Year</span>
                    <span class="info-value">3rd Year</span>
                  </div>
                  <div class="info-item">
                    <span class="info-label">GPA</span>
                    <span class="info-value">3.8/4.0</span>
                  </div>
                  <div class="info-item">
                    <span class="info-label">Credits Completed</span>
                    <span class="info-value">90/120</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Recent Activity -->
            <div class="card">
              <div class="card-header">
                <h5 class="card-title mb-0">Recent Activity</h5>
              </div>
              <div class="card-body">
                <div class="timeline">
                  <div class="timeline-item">
                    <div class="timeline-icon bg-primary">
                      <i class="fas fa-book"></i>
                    </div>
                    <div class="timeline-content">
                      <h6>Completed Assignment</h6>
                      <p>Data Structures - Assignment 3</p>
                      <span class="timeline-date">2 hours ago</span>
                    </div>
                  </div>
                  <div class="timeline-item">
                    <div class="timeline-icon bg-success">
                      <i class="fas fa-certificate"></i>
                    </div>
                    <div class="timeline-content">
                      <h6>Earned Certificate</h6>
                      <p>Introduction to Python Programming</p>
                      <span class="timeline-date">2 days ago</span>
                    </div>
                  </div>
                  <div class="timeline-item">
                    <div class="timeline-icon bg-info">
                      <i class="fas fa-graduation-cap"></i>
                    </div>
                    <div class="timeline-content">
                      <h6>Enrolled in New Course</h6>
                      <p>Advanced Database Systems</p>
                      <span class="timeline-date">1 week ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .profile-container {
      background-color: #f8f9fa;
      min-height: 100vh;
      padding-top: 2rem;
    }

    .page-title {
      font-size: 2rem;
      font-weight: 600;
      color: #2e7d32;
    }

    /* Profile Card */
    .profile-card {
      border: none;
      border-radius: 12px;
      overflow: hidden;
    }

    .profile-cover {
      height: 120px;
      background: linear-gradient(135deg, #2e7d32 0%, #1b5e20 100%);
    }

    .profile-avatar {
      position: relative;
      margin-top: -60px;
      padding: 0 1.5rem;
    }

    .profile-avatar img {
      width: 120px;
      height: 120px;
      border-radius: 50%;
      border: 4px solid white;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .edit-avatar {
      position: absolute;
      bottom: 0;
      right: 1.5rem;
      width: 32px;
      height: 32px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0;
    }

    .profile-info {
      padding: 1.5rem;
    }

    .profile-info h3 {
      font-weight: 600;
    }

    .profile-stats {
      display: flex;
      justify-content: space-around;
      margin-top: 1.5rem;
      padding-top: 1.5rem;
      border-top: 1px solid #eee;
    }

    .stat-item {
      text-align: center;
    }

    .stat-item h4 {
      font-weight: 600;
      margin: 0;
      color: #2e7d32;
    }

    .stat-item span {
      font-size: 0.875rem;
      color: #666;
    }

    /* Quick Links */
    .quick-links {
      display: flex;
      flex-direction: column;
      gap: 0.5rem;
    }

    .quick-link {
      display: flex;
      align-items: center;
      gap: 0.75rem;
      padding: 0.75rem;
      color: #333;
      text-decoration: none;
      border-radius: 8px;
      transition: all 0.3s ease;
    }

    .quick-link:hover {
      background-color: rgba(46, 125, 50, 0.1);
      color: #2e7d32;
    }

    .quick-link i {
      width: 24px;
      color: #2e7d32;
    }

    /* Form Styling */
    .form-label {
      font-weight: 500;
      color: #333;
    }

    .form-control {
      border: 2px solid #e0e0e0;
      border-radius: 8px;
      padding: 0.6rem 1rem;
      transition: all 0.3s ease;
    }

    .form-control:focus {
      border-color: #2e7d32;
      box-shadow: 0 0 0 0.2rem rgba(46, 125, 50, 0.15);
    }

    /* Academic Info */
    .academic-info {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 1rem;
    }

    .info-item {
      padding: 1rem;
      background-color: #f8f9fa;
      border-radius: 8px;
    }

    .info-label {
      display: block;
      font-size: 0.875rem;
      color: #666;
      margin-bottom: 0.25rem;
    }

    .info-value {
      font-weight: 600;
      color: #333;
    }

    /* Timeline */
    .timeline {
      position: relative;
      padding-left: 3rem;
    }

    .timeline::before {
      content: '';
      position: absolute;
      left: 1rem;
      top: 0;
      height: 100%;
      width: 2px;
      background-color: #e0e0e0;
    }

    .timeline-item {
      position: relative;
      padding-bottom: 1.5rem;
    }

    .timeline-icon {
      position: absolute;
      left: -3rem;
      width: 2rem;
      height: 2rem;
      border-radius: 50%;
      background-color: #2e7d32;
      color: white;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    .timeline-content {
      background-color: white;
      padding: 1rem;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
    }

    .timeline-content h6 {
      margin: 0;
      font-weight: 600;
    }

    .timeline-content p {
      margin: 0.25rem 0;
      color: #666;
    }

    .timeline-date {
      font-size: 0.875rem;
      color: #999;
    }

    /* Card Styling */
    .card {
      border: none;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .card-header {
      background-color: transparent;
      border-bottom: 1px solid #eee;
      padding: 1.25rem;
    }

    .card-title {
      color: #2e7d32;
      font-weight: 600;
    }

    .card-body {
      padding: 1.25rem;
    }

    /* Responsive */
    @media (max-width: 768px) {
      .profile-stats {
        flex-wrap: wrap;
      }

      .stat-item {
        width: 50%;
        margin-bottom: 1rem;
      }

      .academic-info {
        grid-template-columns: 1fr;
      }
    }
  `]
})
export class ProfileComponent implements OnInit {
  user = {
    name: 'Mohammed Amine',
    email: 'mohammed.amine@insea.ac.ma',
    phone: '+212 6XX-XXXXXX',
    studentId: '20230001',
    role: 'Student',
    bio: 'Third-year computer science student at INSEA, passionate about data science and artificial intelligence.',
    avatar: 'assets/images/default-avatar.jpg'
  };

  constructor(private authService: AuthService) {}

  ngOnInit() {
    // TODO: Load user data from AuthService
  }
}
