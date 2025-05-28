import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatBadgeModule } from '@angular/material/badge';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { NotificationService, Notification } from '../../../services/notification.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-notifications',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    MatBadgeModule,
    MatIconModule,
    MatButtonModule,
    MatMenuModule,
    MatListModule
  ],
  template: `
    <button mat-icon-button [matMenuTriggerFor]="notificationMenu">
      <mat-icon [matBadge]="unreadCount" [matBadgeHidden]="unreadCount === 0" matBadgeColor="warn">
        notifications
      </mat-icon>
    </button>

    <mat-menu #notificationMenu="matMenu" class="notification-menu">
      <div class="notification-header">
        <h3>Notifications</h3>
        <button mat-button (click)="markAllAsRead()" *ngIf="unreadCount > 0">
          Tout marquer comme lu
        </button>
      </div>

      <mat-list class="notification-list">
        <ng-container *ngIf="notifications.length > 0; else noNotifications">
          <mat-list-item *ngFor="let notification of notifications" 
                        [class.unread]="!notification.read"
                        [routerLink]="notification.link"
                        (click)="markAsRead(notification.id)">
            <mat-icon matListItemIcon [class]="notification.type">
              {{ getIconForType(notification.type) }}
            </mat-icon>
            <div matListItemTitle>{{ notification.title }}</div>
            <div matListItemLine>{{ notification.message }}</div>
            <div matListItemMeta>
              {{ notification.timestamp | date:'short' }}
            </div>
          </mat-list-item>
        </ng-container>

        <ng-template #noNotifications>
          <div class="no-notifications">
            <mat-icon>notifications_off</mat-icon>
            <p>Aucune notification</p>
          </div>
        </ng-template>
      </mat-list>

      <div class="notification-footer" *ngIf="notifications.length > 0">
        <button mat-button color="warn" (click)="clearAll()">
          Effacer tout
        </button>
      </div>
    </mat-menu>
  `,
  styles: [`
    .notification-menu {
      max-width: 350px;
      max-height: 400px;
      overflow-y: auto;
    }

    .notification-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 8px 16px;
      border-bottom: 1px solid #eee;
    }

    .notification-header h3 {
      margin: 0;
    }

    .notification-list {
      padding: 0;
    }

    .notification-list mat-list-item {
      cursor: pointer;
      transition: background-color 0.2s;
    }

    .notification-list mat-list-item:hover {
      background-color: #f5f5f5;
    }

    .notification-list .unread {
      background-color: #e3f2fd;
    }

    .no-notifications {
      display: flex;
      flex-direction: column;
      align-items: center;
      padding: 24px;
      color: #666;
    }

    .no-notifications mat-icon {
      font-size: 48px;
      width: 48px;
      height: 48px;
      margin-bottom: 8px;
    }

    .notification-footer {
      display: flex;
      justify-content: center;
      padding: 8px;
      border-top: 1px solid #eee;
    }

    mat-icon.assignment { color: #2196F3; }
    mat-icon.grade { color: #4CAF50; }
    mat-icon.announcement { color: #FF9800; }
    mat-icon.absence { color: #F44336; }
  `]
})
export class NotificationsComponent implements OnInit, OnDestroy {
  notifications: Notification[] = [];
  unreadCount = 0;
  private subscriptions: Subscription[] = [];

  constructor(private notificationService: NotificationService) {}

  ngOnInit() {
    this.subscriptions.push(
      this.notificationService.notifications$.subscribe(notifications => {
        this.notifications = notifications;
      }),
      this.notificationService.unreadCount$.subscribe(count => {
        this.unreadCount = count;
      })
    );
  }

  ngOnDestroy() {
    this.subscriptions.forEach(sub => sub.unsubscribe());
  }

  getIconForType(type: Notification['type']): string {
    switch (type) {
      case 'assignment':
        return 'assignment';
      case 'grade':
        return 'grade';
      case 'announcement':
        return 'campaign';
      case 'absence':
        return 'event_busy';
      default:
        return 'notifications';
    }
  }

  markAsRead(id: string) {
    this.notificationService.markAsRead(id);
  }

  markAllAsRead() {
    this.notificationService.markAllAsRead();
  }

  clearAll() {
    this.notificationService.clearAll();
  }
} 