import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Resource {
  id: number;
  title: string;
  type: 'book' | 'article' | 'document' | 'video';
  subject: string;
  author: string;
  thumbnail: string;
  downloadUrl?: string;
  viewUrl?: string;
  description: string;
  uploadDate: Date;
  size?: string;
  format?: string;
  downloads: number;
  rating: number;
}

@Component({
  selector: 'app-library',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="library-container">
      <div class="container py-4">
        <div class="row">
          <!-- Library Sidebar -->
          <div class="col-lg-3">
            <div class="card mb-4">
              <div class="card-body">
                <h5 class="card-title mb-4">Library</h5>
                
                <!-- Search -->
                <div class="search-box mb-4">
                  <i class="fas fa-search"></i>
                  <input 
                    type="text" 
                    class="form-control" 
                    placeholder="Search resources..."
                    [(ngModel)]="searchTerm"
                  >
                </div>

                <!-- Filters -->
                <div class="filters">
                  <h6 class="mb-3">Resource Type</h6>
                  <div class="form-check mb-2">
                    <input class="form-check-input" type="checkbox" checked>
                    <label class="form-check-label">
                      <i class="fas fa-book text-primary"></i>
                      Books
                    </label>
                  </div>
                  <div class="form-check mb-2">
                    <input class="form-check-input" type="checkbox" checked>
                    <label class="form-check-label">
                      <i class="fas fa-file-alt text-success"></i>
                      Articles
                    </label>
                  </div>
                  <div class="form-check mb-2">
                    <input class="form-check-input" type="checkbox" checked>
                    <label class="form-check-label">
                      <i class="fas fa-file-pdf text-danger"></i>
                      Documents
                    </label>
                  </div>
                  <div class="form-check mb-4">
                    <input class="form-check-input" type="checkbox" checked>
                    <label class="form-check-label">
                      <i class="fas fa-video text-info"></i>
                      Videos
                    </label>
                  </div>

                  <h6 class="mb-3">Subjects</h6>
                  <div class="form-check mb-2">
                    <input class="form-check-input" type="checkbox" checked>
                    <label class="form-check-label">Mathematics</label>
                  </div>
                  <div class="form-check mb-2">
                    <input class="form-check-input" type="checkbox" checked>
                    <label class="form-check-label">Computer Science</label>
                  </div>
                  <div class="form-check mb-2">
                    <input class="form-check-input" type="checkbox" checked>
                    <label class="form-check-label">Statistics</label>
                  </div>
                  <div class="form-check mb-4">
                    <input class="form-check-input" type="checkbox" checked>
                    <label class="form-check-label">Economics</label>
                  </div>

                  <button class="btn btn-primary w-100">
                    Apply Filters
                  </button>
                </div>
              </div>
            </div>
          </div>

          <!-- Library Content -->
          <div class="col-lg-9">
            <!-- Quick Access -->
            <div class="quick-access mb-4">
              <h5 class="mb-3">Quick Access</h5>
              <div class="row g-3">
                <div class="col-md-3">
                  <div class="quick-access-card">
                    <i class="fas fa-clock"></i>
                    <span>Recent</span>
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="quick-access-card">
                    <i class="fas fa-star"></i>
                    <span>Favorites</span>
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="quick-access-card">
                    <i class="fas fa-download"></i>
                    <span>Downloads</span>
                  </div>
                </div>
                <div class="col-md-3">
                  <div class="quick-access-card">
                    <i class="fas fa-upload"></i>
                    <span>Upload</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Resources Grid -->
            <div class="card">
              <div class="card-body">
                <div class="d-flex justify-content-between align-items-center mb-4">
                  <h5 class="card-title mb-0">Resources</h5>
                  <div class="btn-group">
                    <button class="btn btn-outline-secondary active">
                      <i class="fas fa-th-large"></i>
                    </button>
                    <button class="btn btn-outline-secondary">
                      <i class="fas fa-list"></i>
                    </button>
                  </div>
                </div>

                <div class="row g-4">
                  <div class="col-md-6 col-lg-4" *ngFor="let resource of resources">
                    <div class="resource-card">
                      <div class="resource-thumbnail">
                        <img [src]="resource.thumbnail" [alt]="resource.title">
                        <div class="resource-type" [class]="resource.type">
                          <i class="fas" 
                             [class.fa-book]="resource.type === 'book'"
                             [class.fa-file-alt]="resource.type === 'article'"
                             [class.fa-file-pdf]="resource.type === 'document'"
                             [class.fa-video]="resource.type === 'video'"></i>
                        </div>
                      </div>
                      <div class="resource-content">
                        <h6 class="resource-title">{{resource.title}}</h6>
                        <p class="resource-author">{{resource.author}}</p>
                        <div class="resource-meta">
                          <span class="subject">{{resource.subject}}</span>
                          <span class="rating">
                            <i class="fas fa-star"></i>
                            {{resource.rating}}
                          </span>
                        </div>
                        <p class="resource-description">{{resource.description}}</p>
                        <div class="resource-footer">
                          <div class="resource-info">
                            <span class="downloads">
                              <i class="fas fa-download"></i>
                              {{resource.downloads}}
                            </span>
                            <span class="format" *ngIf="resource.format">
                              {{resource.format}}
                            </span>
                          </div>
                          <div class="resource-actions">
                            <button class="btn btn-sm btn-outline-primary" *ngIf="resource.viewUrl">
                              <i class="fas fa-eye"></i>
                              View
                            </button>
                            <button class="btn btn-sm btn-primary" *ngIf="resource.downloadUrl">
                              <i class="fas fa-download"></i>
                              Download
                            </button>
                          </div>
                        </div>
                      </div>
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
    .library-container {
      background-color: #f8f9fa;
      min-height: 100vh;
      padding-top: 2rem;
    }

    /* Search Box */
    .search-box {
      position: relative;
    }

    .search-box i {
      position: absolute;
      left: 1rem;
      top: 50%;
      transform: translateY(-50%);
      color: #666;
    }

    .search-box input {
      padding-left: 2.5rem;
      border-radius: 8px;
    }

    /* Filters */
    .filters .form-check-label {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      color: #333;
    }

    /* Quick Access */
    .quick-access-card {
      background: white;
      border-radius: 12px;
      padding: 1.5rem;
      text-align: center;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
      cursor: pointer;
    }

    .quick-access-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 4px 15px rgba(0, 0, 0, 0.1);
    }

    .quick-access-card i {
      font-size: 1.5rem;
      color: #2e7d32;
      margin-bottom: 0.5rem;
      display: block;
    }

    .quick-access-card span {
      color: #666;
      font-size: 0.875rem;
    }

    /* Resource Card */
    .resource-card {
      background: white;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
    }

    .resource-card:hover {
      transform: translateY(-5px);
      box-shadow: 0 8px 15px rgba(0, 0, 0, 0.1);
    }

    .resource-thumbnail {
      position: relative;
      height: 200px;
      overflow: hidden;
    }

    .resource-thumbnail img {
      width: 100%;
      height: 100%;
      object-fit: cover;
    }

    .resource-type {
      position: absolute;
      top: 1rem;
      right: 1rem;
      width: 40px;
      height: 40px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
    }

    .resource-type.book {
      background-color: #2196f3;
    }

    .resource-type.article {
      background-color: #4caf50;
    }

    .resource-type.document {
      background-color: #f44336;
    }

    .resource-type.video {
      background-color: #9c27b0;
    }

    .resource-content {
      padding: 1.5rem;
    }

    .resource-title {
      margin: 0 0 0.5rem;
      font-weight: 600;
      color: #333;
    }

    .resource-author {
      margin: 0 0 1rem;
      color: #666;
      font-size: 0.875rem;
    }

    .resource-meta {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 1rem;
    }

    .subject {
      display: inline-block;
      padding: 0.25rem 0.75rem;
      background-color: rgba(46, 125, 50, 0.1);
      color: #2e7d32;
      border-radius: 15px;
      font-size: 0.875rem;
    }

    .rating {
      color: #ffc107;
      font-weight: 600;
    }

    .rating i {
      margin-right: 0.25rem;
    }

    .resource-description {
      margin: 0 0 1rem;
      color: #666;
      font-size: 0.875rem;
      display: -webkit-box;
      -webkit-line-clamp: 2;
      -webkit-box-orient: vertical;
      overflow: hidden;
    }

    .resource-footer {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding-top: 1rem;
      border-top: 1px solid #eee;
    }

    .resource-info {
      display: flex;
      align-items: center;
      gap: 1rem;
      color: #666;
      font-size: 0.875rem;
    }

    .downloads i {
      margin-right: 0.25rem;
      color: #2e7d32;
    }

    .format {
      text-transform: uppercase;
      font-size: 0.75rem;
      font-weight: 600;
      color: #999;
    }

    .resource-actions {
      display: flex;
      gap: 0.5rem;
    }

    /* Card Styling */
    .card {
      border: none;
      border-radius: 12px;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .card-title {
      color: #2e7d32;
      font-weight: 600;
    }

    /* Responsive */
    @media (max-width: 768px) {
      .quick-access-card {
        margin-bottom: 1rem;
      }

      .resource-card {
        margin-bottom: 1rem;
      }
    }
  `]
})
export class LibraryComponent implements OnInit {
  searchTerm = '';

  resources: Resource[] = [
    {
      id: 1,
      title: 'Advanced Mathematics for Data Science',
      type: 'book',
      subject: 'Mathematics',
      author: 'Prof. Mohammed Hassan',
      thumbnail: 'assets/images/book1.jpg',
      downloadUrl: '#',
      description: 'Comprehensive guide covering advanced mathematical concepts for data science applications.',
      uploadDate: new Date(),
      size: '8.5 MB',
      format: 'PDF',
      downloads: 1250,
      rating: 4.8
    },
    {
      id: 2,
      title: 'Introduction to Machine Learning',
      type: 'video',
      subject: 'Computer Science',
      author: 'Dr. Sarah Ahmed',
      thumbnail: 'assets/images/video1.jpg',
      viewUrl: '#',
      description: 'Video series covering the fundamentals of machine learning algorithms.',
      uploadDate: new Date(),
      format: 'MP4',
      downloads: 850,
      rating: 4.6
    },
    {
      id: 3,
      title: 'Statistical Methods in Research',
      type: 'article',
      subject: 'Statistics',
      author: 'Prof. Karim Bensouda',
      thumbnail: 'assets/images/article1.jpg',
      downloadUrl: '#',
      description: 'Research paper on advanced statistical methods and their applications.',
      uploadDate: new Date(),
      size: '2.1 MB',
      format: 'PDF',
      downloads: 620,
      rating: 4.5
    },
    {
      id: 4,
      title: 'Economic Theory and Practice',
      type: 'document',
      subject: 'Economics',
      author: 'Dr. Fatima El Alaoui',
      thumbnail: 'assets/images/doc1.jpg',
      downloadUrl: '#',
      description: 'Comprehensive course materials for advanced economic theory.',
      uploadDate: new Date(),
      size: '5.3 MB',
      format: 'PDF',
      downloads: 430,
      rating: 4.7
    }
  ];

  constructor() {}

  ngOnInit() {}
}
