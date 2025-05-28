import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface CalendarEvent {
  id: number;
  title: string;
  date: Date;
  startTime: string;
  endTime: string;
  type: 'class' | 'exam' | 'assignment' | 'meeting';
  description: string;
  location?: string;
  color: string;
}

@Component({
  selector: 'app-calendar',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="calendar-container">
      <div class="container py-4">
        <div class="row">
          <!-- Calendar Sidebar -->
          <div class="col-lg-3">
            <div class="card mb-4">
              <div class="card-body">
                <div class="d-flex justify-content-between align-items-center mb-4">
                  <h5 class="card-title mb-0">Calendar</h5>
                  <button class="btn btn-primary btn-sm">
                    <i class="fas fa-plus"></i> Add Event
                  </button>
                </div>
                <div class="mini-calendar mb-4">
                  <!-- Mini Calendar Implementation -->
                  <div class="calendar-header">
                    <button class="btn btn-link">
                      <i class="fas fa-chevron-left"></i>
                    </button>
                    <h6 class="mb-0">May 2024</h6>
                    <button class="btn btn-link">
                      <i class="fas fa-chevron-right"></i>
                    </button>
                  </div>
                  <div class="calendar-grid">
                    <div class="calendar-weekdays">
                      <div>Su</div>
                      <div>Mo</div>
                      <div>Tu</div>
                      <div>We</div>
                      <div>Th</div>
                      <div>Fr</div>
                      <div>Sa</div>
                    </div>
                    <div class="calendar-days">
                      <!-- Calendar Days -->
                    </div>
                  </div>
                </div>
                <div class="event-types mb-4">
                  <h6 class="mb-3">Event Types</h6>
                  <div class="form-check mb-2">
                    <input class="form-check-input" type="checkbox" checked>
                    <label class="form-check-label">
                      <span class="event-type class">Classes</span>
                    </label>
                  </div>
                  <div class="form-check mb-2">
                    <input class="form-check-input" type="checkbox" checked>
                    <label class="form-check-label">
                      <span class="event-type exam">Exams</span>
                    </label>
                  </div>
                  <div class="form-check mb-2">
                    <input class="form-check-input" type="checkbox" checked>
                    <label class="form-check-label">
                      <span class="event-type assignment">Assignments</span>
                    </label>
                  </div>
                  <div class="form-check">
                    <input class="form-check-input" type="checkbox" checked>
                    <label class="form-check-label">
                      <span class="event-type meeting">Meetings</span>
                    </label>
                  </div>
                </div>
                <div class="upcoming-events">
                  <h6 class="mb-3">Upcoming Events</h6>
                  <div class="event-list">
                    <div class="event-item" *ngFor="let event of upcomingEvents">
                      <div class="event-dot" [style.background-color]="event.color"></div>
                      <div class="event-details">
                        <h6 class="event-title">{{event.title}}</h6>
                        <p class="event-time">
                          <i class="far fa-clock"></i>
                          {{event.startTime}} - {{event.endTime}}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Main Calendar -->
          <div class="col-lg-9">
            <div class="card">
              <div class="card-body">
                <!-- Calendar Navigation -->
                <div class="calendar-toolbar mb-4">
                  <div class="d-flex align-items-center">
                    <button class="btn btn-outline-primary me-2">Today</button>
                    <div class="btn-group me-3">
                      <button class="btn btn-outline-secondary">
                        <i class="fas fa-chevron-left"></i>
                      </button>
                      <button class="btn btn-outline-secondary">
                        <i class="fas fa-chevron-right"></i>
                      </button>
                    </div>
                    <h4 class="mb-0">May 2024</h4>
                  </div>
                  <div class="btn-group">
                    <button class="btn btn-outline-secondary active">Month</button>
                    <button class="btn btn-outline-secondary">Week</button>
                    <button class="btn btn-outline-secondary">Day</button>
                  </div>
                </div>

                <!-- Calendar Grid -->
                <div class="calendar-main">
                  <div class="calendar-header">
                    <div class="calendar-weekday">Sunday</div>
                    <div class="calendar-weekday">Monday</div>
                    <div class="calendar-weekday">Tuesday</div>
                    <div class="calendar-weekday">Wednesday</div>
                    <div class="calendar-weekday">Thursday</div>
                    <div class="calendar-weekday">Friday</div>
                    <div class="calendar-weekday">Saturday</div>
                  </div>
                  <div class="calendar-body">
                    <div class="calendar-week" *ngFor="let week of [1,2,3,4,5]">
                      <div class="calendar-day" *ngFor="let day of [1,2,3,4,5,6,7]">
                        <div class="day-header">
                          <span class="day-number">{{day}}</span>
                          <button class="btn btn-sm btn-link add-event">
                            <i class="fas fa-plus"></i>
                          </button>
                        </div>
                        <div class="day-events">
                          <div class="calendar-event class">
                            <span class="event-time">09:00</span>
                            <span class="event-title">Mathematics</span>
                          </div>
                          <div class="calendar-event exam">
                            <span class="event-time">14:00</span>
                            <span class="event-title">Physics Exam</span>
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
    .calendar-container {
      background-color: #f8f9fa;
      min-height: 100vh;
      padding-top: 2rem;
    }

    /* Mini Calendar */
    .mini-calendar {
      border: 1px solid #eee;
      border-radius: 8px;
      overflow: hidden;
    }

    .calendar-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 0.5rem;
      background-color: #fff;
      border-bottom: 1px solid #eee;
    }

    .calendar-weekdays {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      text-align: center;
      font-size: 0.75rem;
      font-weight: 600;
      color: #666;
      background-color: #f8f9fa;
      border-bottom: 1px solid #eee;
    }

    .calendar-weekdays div {
      padding: 0.5rem;
    }

    .calendar-days {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      text-align: center;
      font-size: 0.875rem;
    }

    .calendar-days div {
      padding: 0.5rem;
      border: 1px solid #eee;
    }

    /* Event Types */
    .event-type {
      display: inline-block;
      padding: 0.25rem 0.75rem;
      border-radius: 15px;
      font-size: 0.875rem;
    }

    .event-type.class {
      background-color: rgba(46, 125, 50, 0.1);
      color: #2e7d32;
    }

    .event-type.exam {
      background-color: rgba(244, 67, 54, 0.1);
      color: #f44336;
    }

    .event-type.assignment {
      background-color: rgba(33, 150, 243, 0.1);
      color: #2196f3;
    }

    .event-type.meeting {
      background-color: rgba(156, 39, 176, 0.1);
      color: #9c27b0;
    }

    /* Upcoming Events */
    .event-list {
      max-height: 300px;
      overflow-y: auto;
    }

    .event-item {
      display: flex;
      align-items: center;
      padding: 0.75rem;
      border-radius: 8px;
      margin-bottom: 0.5rem;
      background-color: #fff;
      transition: all 0.3s ease;
    }

    .event-item:hover {
      transform: translateY(-2px);
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    .event-dot {
      width: 10px;
      height: 10px;
      border-radius: 50%;
      margin-right: 0.75rem;
    }

    .event-details {
      flex: 1;
    }

    .event-title {
      margin: 0;
      font-size: 0.875rem;
      font-weight: 600;
    }

    .event-time {
      font-size: 0.75rem;
      color: #666;
    }

    .event-time i {
      margin-right: 0.25rem;
    }

    /* Main Calendar */
    .calendar-toolbar {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .calendar-main {
      border: 1px solid #eee;
      border-radius: 8px;
      overflow: hidden;
    }

    .calendar-weekday {
      padding: 1rem;
      text-align: center;
      font-weight: 600;
      color: #333;
      background-color: #f8f9fa;
      border-bottom: 1px solid #eee;
    }

    .calendar-body {
      background-color: #fff;
    }

    .calendar-week {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
    }

    .calendar-day {
      min-height: 150px;
      padding: 0.5rem;
      border: 1px solid #eee;
    }

    .day-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 0.5rem;
    }

    .day-number {
      font-weight: 600;
      color: #333;
    }

    .add-event {
      padding: 0;
      color: #666;
      opacity: 0;
      transition: opacity 0.3s ease;
    }

    .calendar-day:hover .add-event {
      opacity: 1;
    }

    .day-events {
      display: flex;
      flex-direction: column;
      gap: 0.25rem;
    }

    .calendar-event {
      padding: 0.25rem 0.5rem;
      border-radius: 4px;
      font-size: 0.75rem;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .calendar-event:hover {
      transform: translateY(-1px);
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }

    .calendar-event.class {
      background-color: rgba(46, 125, 50, 0.1);
      color: #2e7d32;
    }

    .calendar-event.exam {
      background-color: rgba(244, 67, 54, 0.1);
      color: #f44336;
    }

    .calendar-event.assignment {
      background-color: rgba(33, 150, 243, 0.1);
      color: #2196f3;
    }

    .calendar-event.meeting {
      background-color: rgba(156, 39, 176, 0.1);
      color: #9c27b0;
    }

    .event-time {
      font-weight: 600;
      margin-right: 0.25rem;
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
      .calendar-toolbar {
        flex-direction: column;
        gap: 1rem;
      }

      .calendar-weekday {
        padding: 0.5rem;
        font-size: 0.875rem;
      }

      .calendar-day {
        min-height: 100px;
      }
    }
  `]
})
export class CalendarComponent implements OnInit {
  upcomingEvents: CalendarEvent[] = [
    {
      id: 1,
      title: 'Mathematics Lecture',
      date: new Date(),
      startTime: '09:00',
      endTime: '10:30',
      type: 'class',
      description: 'Advanced Calculus - Chapter 5',
      location: 'Room 101',
      color: '#2e7d32'
    },
    {
      id: 2,
      title: 'Physics Exam',
      date: new Date(),
      startTime: '14:00',
      endTime: '16:00',
      type: 'exam',
      description: 'Final examination covering all chapters',
      location: 'Examination Hall',
      color: '#f44336'
    },
    {
      id: 3,
      title: 'Project Meeting',
      date: new Date(),
      startTime: '11:00',
      endTime: '12:00',
      type: 'meeting',
      description: 'Group project discussion',
      location: 'Study Room 3',
      color: '#9c27b0'
    }
  ];

  constructor() {}

  ngOnInit() {}
}
