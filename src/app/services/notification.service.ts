import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { io, Socket } from 'socket.io-client';
import { environment } from '../../environments/environment';
import { AuthService } from './auth.service';

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: Date;
  read: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private socket: Socket | null = null;
  private notifications = new BehaviorSubject<Notification[]>([]);
  private unreadCount = new BehaviorSubject<number>(0);

  notifications$ = this.notifications.asObservable();
  unreadCount$ = this.unreadCount.asObservable();

  constructor(private authService: AuthService) {
    if (this.authService.isLoggedIn()) {
      this.initializeSocket();
      this.loadStoredNotifications();
    }

    // Mock notifications
    this.notifications.next([
      {
        id: '1',
        title: 'Nouveau cours disponible',
        message: 'Le cours de Statistiques avancées est maintenant disponible',
        type: 'info',
        timestamp: new Date(),
        read: false
      },
      {
        id: '2',
        title: 'Rappel devoir',
        message: 'N\'oubliez pas de rendre le devoir d\'Analyse de données avant demain',
        type: 'warning',
        timestamp: new Date(Date.now() - 86400000),
        read: true
      }
    ]);
  }

  private initializeSocket() {
    if (!this.authService.isLoggedIn()) {
      return;
    }

    if (environment.mockEnabled) {
      this.setupMockNotifications();
      return;
    }

    try {
      this.socket = io(environment.apiUrl);

      this.socket.on('notification', (notification: Notification) => {
        this.addNotification(notification);
      });

      this.socket.on('connect_error', (error) => {
        console.error('Socket connection error:', error);
      });
    } catch (error) {
      console.error('Failed to initialize socket:', error);
    }
  }

  private setupMockNotifications() {
    if (!this.authService.isLoggedIn()) {
      return;
    }

    // Simulate receiving notifications periodically
    const interval = setInterval(() => {
      if (!this.authService.isLoggedIn()) {
        clearInterval(interval);
        return;
      }

      const types: Notification['type'][] = ['info', 'success', 'warning', 'error'];
      const type = types[Math.floor(Math.random() * types.length)];
      
      this.addNotification({
        title: this.getMockTitle(type),
        message: this.getMockMessage(type),
        type
      });
    }, 30000); // Every 30 seconds
  }

  private getMockTitle(type: Notification['type']): string {
    switch (type) {
      case 'info':
        return 'Nouveau cours disponible';
      case 'success':
        return 'Devoir rendu';
      case 'warning':
        return 'Rappel devoir';
      case 'error':
        return 'Erreur';
      default:
        return 'Notification';
    }
  }

  private getMockMessage(type: Notification['type']): string {
    switch (type) {
      case 'info':
        return 'Le cours de Statistiques avancées est maintenant disponible';
      case 'success':
        return 'Votre devoir d\'Analyse de données a été rendu avec succès';
      case 'warning':
        return 'N\'oubliez pas de rendre le devoir d\'Analyse de données avant demain';
      case 'error':
        return 'Erreur lors de la connexion au serveur';
      default:
        return 'Nouvelle notification';
    }
  }

  private loadStoredNotifications() {
    if (!this.authService.isLoggedIn()) {
      return;
    }

    try {
      const stored = localStorage.getItem('notifications');
      if (stored) {
        const notifications = JSON.parse(stored);
        this.notifications.next(notifications);
        this.updateUnreadCount();
      }
    } catch (error) {
      console.error('Failed to load stored notifications:', error);
      this.notifications.next([]);
      this.updateUnreadCount();
    }
  }

  private saveNotifications(notifications: Notification[]) {
    if (!this.authService.isLoggedIn()) {
      return;
    }

    try {
      localStorage.setItem('notifications', JSON.stringify(notifications));
    } catch (error) {
      console.error('Failed to save notifications:', error);
    }
  }

  private updateUnreadCount() {
    const count = this.notifications.value.filter(n => !n.read).length;
    this.unreadCount.next(count);
  }

  markAsRead(id: string): void {
    const currentNotifications = this.notifications.value;
    const updatedNotifications = currentNotifications.map(notification => 
      notification.id === id ? { ...notification, read: true } : notification
    );
    this.notifications.next(updatedNotifications);
    this.updateUnreadCount();
    this.saveNotifications(updatedNotifications);
  }

  markAllAsRead() {
    if (!this.authService.isLoggedIn()) {
      return;
    }

    const updated = this.notifications.value.map(n => ({ ...n, read: true }));
    this.notifications.next(updated);
    this.updateUnreadCount();
    this.saveNotifications(updated);
  }

  clearAll(): void {
    if (!this.authService.isLoggedIn()) {
      return;
    }

    this.notifications.next([]);
    this.updateUnreadCount();
    this.saveNotifications([]);
  }

  disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
    }
    this.notifications.next([]);
    this.unreadCount.next(0);
  }

  getNotifications(): Observable<Notification[]> {
    return this.notifications.asObservable();
  }

  addNotification(notification: Omit<Notification, 'id' | 'timestamp' | 'read'>): void {
    if (!this.authService.isLoggedIn()) {
      return;
    }

    const newNotification: Notification = {
      ...notification,
      id: Date.now().toString(),
      timestamp: new Date(),
      read: false
    };
    
    const currentNotifications = this.notifications.value;
    const updated = [newNotification, ...currentNotifications];
    this.notifications.next(updated);
    this.updateUnreadCount();
    this.saveNotifications(updated);
  }
} 