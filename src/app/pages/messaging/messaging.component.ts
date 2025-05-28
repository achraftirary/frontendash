import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Message {
  id: number;
  senderId: number;
  receiverId: number;
  content: string;
  timestamp: Date;
  status: 'sent' | 'delivered' | 'read';
}

interface Contact {
  id: number;
  name: string;
  avatar: string;
  status: 'online' | 'offline';
  lastMessage?: string;
  unreadCount?: number;
  lastActive?: Date;
}

@Component({
  selector: 'app-messaging',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="messaging-container">
      <div class="container-fluid py-4">
        <div class="card messaging-card">
          <div class="row g-0">
            <!-- Contacts Sidebar -->
            <div class="col-md-4 col-lg-3 border-end">
              <div class="contacts-header">
                <h5 class="mb-0">Messages</h5>
                <button class="btn btn-icon">
                  <i class="fas fa-edit"></i>
                </button>
              </div>
              <div class="search-box">
                <i class="fas fa-search"></i>
                <input 
                  type="text" 
                  class="form-control" 
                  placeholder="Search contacts..."
                  [(ngModel)]="searchTerm"
                >
              </div>
              <div class="contacts-list">
                <div 
                  *ngFor="let contact of filteredContacts" 
                  class="contact-item"
                  [class.active]="selectedContact?.id === contact.id"
                  (click)="selectContact(contact)"
                >
                  <div class="contact-avatar">
                    <img [src]="contact.avatar" [alt]="contact.name">
                    <span class="status-indicator" [class.online]="contact.status === 'online'"></span>
                  </div>
                  <div class="contact-info">
                    <h6 class="contact-name">{{contact.name}}</h6>
                    <p class="contact-last-message">{{contact.lastMessage}}</p>
                  </div>
                  <div class="contact-meta">
                    <span class="last-active">{{contact.lastActive | date:'shortTime'}}</span>
                    <span *ngIf="contact.unreadCount" class="unread-count">{{contact.unreadCount}}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Chat Area -->
            <div class="col-md-8 col-lg-9">
              <ng-container *ngIf="selectedContact; else noChat">
                <div class="chat-header">
                  <div class="d-flex align-items-center">
                    <div class="chat-avatar">
                      <img [src]="selectedContact.avatar" [alt]="selectedContact.name">
                      <span class="status-indicator" [class.online]="selectedContact.status === 'online'"></span>
                    </div>
                    <div class="chat-user-info">
                      <h6 class="mb-0">{{selectedContact.name}}</h6>
                      <small class="text-muted">
                        {{selectedContact.status === 'online' ? 'Online' : 'Last seen ' + (selectedContact.lastActive | date:'shortTime')}}
                      </small>
                    </div>
                  </div>
                  <div class="chat-actions">
                    <button class="btn btn-icon">
                      <i class="fas fa-phone"></i>
                    </button>
                    <button class="btn btn-icon">
                      <i class="fas fa-video"></i>
                    </button>
                    <button class="btn btn-icon">
                      <i class="fas fa-ellipsis-v"></i>
                    </button>
                  </div>
                </div>
                <div class="chat-messages" #messageContainer>
                  <div 
                    *ngFor="let message of currentMessages" 
                    class="message"
                    [class.outgoing]="message.senderId === currentUserId"
                  >
                    <div class="message-content">
                      {{message.content}}
                      <div class="message-meta">
                        <span class="message-time">{{message.timestamp | date:'shortTime'}}</span>
                        <span *ngIf="message.senderId === currentUserId" class="message-status">
                          <i class="fas" [class.fa-check]="message.status === 'sent'"
                             [class.fa-check-double]="message.status === 'delivered'"
                             [class.text-primary]="message.status === 'read'"></i>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="chat-input">
                  <button class="btn btn-icon">
                    <i class="fas fa-paperclip"></i>
                  </button>
                  <input 
                    type="text" 
                    class="form-control" 
                    placeholder="Type a message..."
                    [(ngModel)]="newMessage"
                    (keyup.enter)="sendMessage()"
                  >
                  <button class="btn btn-icon">
                    <i class="fas fa-microphone"></i>
                  </button>
                  <button class="btn btn-icon send-btn" (click)="sendMessage()">
                    <i class="fas fa-paper-plane"></i>
                  </button>
                </div>
              </ng-container>
              <ng-template #noChat>
                <div class="no-chat-selected">
                  <i class="fas fa-comments fa-3x"></i>
                  <h4>Select a conversation</h4>
                  <p>Choose a contact to start messaging</p>
                </div>
              </ng-template>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  styles: [`
    .messaging-container {
      background-color: #f8f9fa;
      min-height: 100vh;
      padding-top: 2rem;
    }

    .messaging-card {
      height: calc(100vh - 6rem);
      margin: 0 auto;
      display: flex;
      flex-direction: column;
      border: none;
      border-radius: 12px;
      overflow: hidden;
      box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }

    /* Contacts Sidebar */
    .contacts-header {
      padding: 1.25rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #eee;
    }

    .search-box {
      position: relative;
      padding: 1rem;
      border-bottom: 1px solid #eee;
    }

    .search-box i {
      position: absolute;
      left: 2rem;
      top: 50%;
      transform: translateY(-50%);
      color: #666;
    }

    .search-box input {
      padding-left: 2.5rem;
      border-radius: 20px;
    }

    .contacts-list {
      overflow-y: auto;
      height: calc(100vh - 13rem);
    }

    .contact-item {
      display: flex;
      align-items: center;
      padding: 1rem;
      cursor: pointer;
      transition: all 0.3s ease;
    }

    .contact-item:hover {
      background-color: rgba(46, 125, 50, 0.05);
    }

    .contact-item.active {
      background-color: rgba(46, 125, 50, 0.1);
    }

    .contact-avatar {
      position: relative;
      margin-right: 1rem;
    }

    .contact-avatar img {
      width: 48px;
      height: 48px;
      border-radius: 50%;
      object-fit: cover;
    }

    .status-indicator {
      position: absolute;
      bottom: 2px;
      right: 2px;
      width: 10px;
      height: 10px;
      border-radius: 50%;
      background-color: #ccc;
      border: 2px solid white;
    }

    .status-indicator.online {
      background-color: #4caf50;
    }

    .contact-info {
      flex: 1;
      min-width: 0;
    }

    .contact-name {
      margin: 0;
      font-weight: 600;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .contact-last-message {
      margin: 0;
      font-size: 0.875rem;
      color: #666;
      white-space: nowrap;
      overflow: hidden;
      text-overflow: ellipsis;
    }

    .contact-meta {
      text-align: right;
      margin-left: 1rem;
    }

    .last-active {
      display: block;
      font-size: 0.75rem;
      color: #666;
    }

    .unread-count {
      display: inline-block;
      min-width: 20px;
      height: 20px;
      padding: 0 6px;
      background-color: #2e7d32;
      color: white;
      border-radius: 10px;
      font-size: 0.75rem;
      text-align: center;
      line-height: 20px;
    }

    /* Chat Area */
    .chat-header {
      padding: 1rem;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #eee;
      background-color: white;
    }

    .chat-avatar {
      position: relative;
      margin-right: 1rem;
    }

    .chat-avatar img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      object-fit: cover;
    }

    .chat-actions {
      display: flex;
      gap: 0.5rem;
    }

    .btn-icon {
      width: 40px;
      height: 40px;
      padding: 0;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: #666;
      transition: all 0.3s ease;
    }

    .btn-icon:hover {
      background-color: rgba(46, 125, 50, 0.1);
      color: #2e7d32;
    }

    .chat-messages {
      flex: 1;
      padding: 1rem;
      overflow-y: auto;
      height: calc(100vh - 15rem);
      background-color: #f8f9fa;
    }

    .message {
      display: flex;
      margin-bottom: 1rem;
    }

    .message.outgoing {
      justify-content: flex-end;
    }

    .message-content {
      max-width: 70%;
      padding: 0.75rem 1rem;
      border-radius: 12px;
      background-color: white;
      box-shadow: 0 1px 2px rgba(0, 0, 0, 0.1);
    }

    .message.outgoing .message-content {
      background-color: #e8f5e9;
      color: #2e7d32;
    }

    .message-meta {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      margin-top: 0.25rem;
      font-size: 0.75rem;
      color: #666;
    }

    .message-status i {
      font-size: 0.875rem;
    }

    .chat-input {
      padding: 1rem;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      background-color: white;
      border-top: 1px solid #eee;
    }

    .chat-input .form-control {
      border-radius: 20px;
    }

    .send-btn {
      color: #2e7d32;
    }

    .send-btn:hover {
      background-color: #2e7d32;
      color: white;
    }

    /* No Chat Selected State */
    .no-chat-selected {
      height: 100%;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      color: #666;
      padding: 2rem;
      text-align: center;
    }

    .no-chat-selected i {
      color: #2e7d32;
      opacity: 0.5;
      margin-bottom: 1rem;
    }

    .no-chat-selected h4 {
      margin-bottom: 0.5rem;
      font-weight: 600;
    }

    .no-chat-selected p {
      margin: 0;
      color: #999;
    }

    /* Responsive */
    @media (max-width: 768px) {
      .messaging-container {
        padding-top: 1rem;
      }

      .messaging-card {
        height: calc(100vh - 2rem);
        border-radius: 0;
      }

      .contacts-list {
        height: calc(100vh - 9rem);
      }

      .chat-messages {
        height: calc(100vh - 11rem);
      }
    }
  `]
})
export class MessagingComponent implements OnInit {
  currentUserId = 1; // Current user's ID
  searchTerm = '';
  newMessage = '';
  selectedContact: Contact | null = null;

  contacts: Contact[] = [
    {
      id: 2,
      name: 'Prof. Mohammed Hassan',
      avatar: 'assets/images/avatar1.jpg',
      status: 'online',
      lastMessage: 'The next assignment deadline is approaching...',
      unreadCount: 2,
      lastActive: new Date()
    },
    {
      id: 3,
      name: 'Sarah Ahmed',
      avatar: 'assets/images/avatar2.jpg',
      status: 'offline',
      lastMessage: 'Thanks for your help with the project!',
      lastActive: new Date(Date.now() - 3600000)
    },
    {
      id: 4,
      name: 'Study Group - Data Structures',
      avatar: 'assets/images/group1.jpg',
      status: 'online',
      lastMessage: 'When is our next meeting?',
      unreadCount: 5,
      lastActive: new Date()
    }
  ];

  currentMessages: Message[] = [
    {
      id: 1,
      senderId: 2,
      receiverId: 1,
      content: 'Hello! How is your progress with the assignment?',
      timestamp: new Date(Date.now() - 3600000),
      status: 'read'
    },
    {
      id: 2,
      senderId: 1,
      receiverId: 2,
      content: 'Hi Professor! I\'m almost done, just reviewing the final section.',
      timestamp: new Date(Date.now() - 3000000),
      status: 'read'
    },
    {
      id: 3,
      senderId: 2,
      receiverId: 1,
      content: 'Great! Let me know if you need any clarification.',
      timestamp: new Date(Date.now() - 2400000),
      status: 'read'
    },
    {
      id: 4,
      senderId: 1,
      receiverId: 2,
      content: 'Thank you, I will submit it by tomorrow.',
      timestamp: new Date(Date.now() - 1800000),
      status: 'delivered'
    }
  ];

  get filteredContacts() {
    return this.contacts.filter(contact =>
      contact.name.toLowerCase().includes(this.searchTerm.toLowerCase())
    );
  }

  constructor() {}

  ngOnInit() {}

  selectContact(contact: Contact) {
    this.selectedContact = contact;
    if (contact.unreadCount) {
      contact.unreadCount = 0;
    }
  }

  sendMessage() {
    if (!this.newMessage.trim() || !this.selectedContact) return;

    const message: Message = {
      id: this.currentMessages.length + 1,
      senderId: this.currentUserId,
      receiverId: this.selectedContact.id,
      content: this.newMessage,
      timestamp: new Date(),
      status: 'sent'
    };

    this.currentMessages.push(message);
    this.newMessage = '';

    // Simulate message being delivered
    setTimeout(() => {
      message.status = 'delivered';
    }, 1000);

    // Simulate message being read
    setTimeout(() => {
      message.status = 'read';
    }, 2000);
  }
}
