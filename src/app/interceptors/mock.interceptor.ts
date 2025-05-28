import { HttpHandlerFn, HttpRequest, HttpResponse, HttpInterceptorFn, HttpEvent } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { delay } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AuthResponse } from '../models/auth.model';
import { UserRole, User } from '../models/user.model';

const MOCK_DELAY = 100;
const STORAGE_KEY = 'mock_users';
const TOKEN_KEY = 'token';
const CURRENT_USER_KEY = 'currentUser';

// Mock data
const mockCourses = [
  {
    id: '1',
    title: 'Mathematics',
    description: 'Advanced calculus and linear algebra',
    instructor: 'Dr. Smith',
    schedule: 'Mon, Wed 10:00 AM',
    enrollmentCount: 25
  },
  {
    id: '2',
    title: 'Computer Science',
    description: 'Introduction to programming',
    instructor: 'Prof. Johnson',
    schedule: 'Tue, Thu 2:00 PM',
    enrollmentCount: 30
  }
];

const mockDashboardData = {
  upcomingAssignments: [
    {
      id: '1',
      title: 'Math Assignment 1',
      dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      course: 'Mathematics'
    }
  ],
  recentAnnouncements: [
    {
      id: '1',
      title: 'Welcome to the new semester',
      content: 'Welcome everyone! We hope you have a great learning experience.',
      date: new Date()
    }
  ],
  quickStats: {
    coursesEnrolled: 2,
    assignmentsDue: 1,
    upcomingExams: 0,
    averageGrade: 85
  }
};

// Initialize mock users if not exists
const defaultAdmin: User = {
  nom: 'Admin',
  prenom: 'User',
  email: 'admin@insea.ac.ma',
  motDePasse: 'Admin@2024',
  numeroCarteNationale: 'AD123456',
  filiere: 'ADMIN',
  annee: '2024',
  role: UserRole.ADMIN,
  telephone: '0600000000',
  dateNaissance: '1990-01-01',
  genre: 'M'
};

// Initialize mock users in localStorage if not exists
function initializeMockUsers() {
  try {
    const existingUsers = localStorage.getItem(STORAGE_KEY);
    if (!existingUsers) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([defaultAdmin]));
    }
  } catch (error) {
    console.error('Error initializing mock users:', error);
    localStorage.setItem(STORAGE_KEY, JSON.stringify([defaultAdmin]));
  }
}

function getMockUsers(): User[] {
  try {
    const usersStr = localStorage.getItem(STORAGE_KEY);
    return usersStr ? JSON.parse(usersStr) : [];
  } catch (error) {
    console.error('Error getting mock users:', error);
    return [defaultAdmin];
  }
}

function setMockUsers(users: User[]) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(users));
  } catch (error) {
    console.error('Error setting mock users:', error);
  }
}

function handleLogin(credentials: { email: string; motDePasse: string }): Observable<HttpResponse<AuthResponse>> {
  console.log('Handling mock login:', credentials);
  try {
    const mockUsers = getMockUsers();
    if (!Array.isArray(mockUsers)) {
      throw new Error('Mock users is not an array');
    }

    const user = mockUsers.find(u => 
      u.email === credentials.email && u.motDePasse === credentials.motDePasse
    );

    if (!user) {
      // For failed login, we'll create a special response that matches AuthResponse type
      const errorResponse: AuthResponse = {
        token: '',
        user: {
          id: '',
          nom: '',
          prenom: '',
          email: '',
          numeroCarteNationale: '',
          filiere: '',
          annee: '',
          role: UserRole.ETUDIANT,
          telephone: '',
          dateNaissance: '',
          genre: ''
        }
      };
      
      return of(new HttpResponse({
        status: 401,
        body: errorResponse
      })).pipe(delay(MOCK_DELAY));
    }

    // Create response without password
    const { motDePasse, ...userWithoutPassword } = user;
    const response: AuthResponse = {
      token: `mock_token_${Date.now()}`,
      user: { ...userWithoutPassword, id: Date.now().toString() }
    };

    // Store auth data in localStorage
    localStorage.setItem(TOKEN_KEY, response.token);
    localStorage.setItem(CURRENT_USER_KEY, JSON.stringify(response.user));

    return of(new HttpResponse({
      status: 200,
      body: response
    })).pipe(delay(MOCK_DELAY));
  } catch (error) {
    // For error case, we'll create a special response that matches AuthResponse type
    const errorResponse: AuthResponse = {
      token: '',
      user: {
        id: '',
        nom: '',
        prenom: '',
        email: '',
        numeroCarteNationale: '',
        filiere: '',
        annee: '',
        role: UserRole.ETUDIANT,
        telephone: '',
        dateNaissance: '',
        genre: ''
      }
    };
    
    return of(new HttpResponse({
      status: 500,
      body: errorResponse
    })).pipe(delay(MOCK_DELAY));
  }
}

function handleRegister(userData: User): Observable<HttpResponse<any>> {
  console.log('Handling mock registration:', userData);
  try {
    const mockUsers = getMockUsers();
    if (!Array.isArray(mockUsers)) {
      throw new Error('Mock users is not an array');
    }
    
    // Check if user already exists
    if (mockUsers.some(user => user.email === userData.email)) {
      return of(new HttpResponse({
        status: 400,
        body: { message: 'Un utilisateur existe déjà avec cet email' }
      })).pipe(delay(MOCK_DELAY));
    }

    // Add user to mock database
    setMockUsers([...mockUsers, userData]);

    return of(new HttpResponse({
      status: 201,
      body: { message: 'Compte créé avec succès' }
    })).pipe(delay(MOCK_DELAY));
  } catch (error) {
    console.error('Mock registration error:', error);
    return of(new HttpResponse({
      status: 500,
      body: { message: 'Une erreur est survenue lors de la création du compte' }
    })).pipe(delay(MOCK_DELAY));
  }
}

// Initialize mock users when the interceptor is loaded
initializeMockUsers();

export const mockInterceptorFn: HttpInterceptorFn = (
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  if (!environment.mockEnabled) {
    return next(request);
  }

  // Initialize mock users if needed
  initializeMockUsers();

  const { url, method, body } = request;

  // Handle authentication endpoints
  if (url.endsWith('/auth/login')) {
    console.log('Intercepting login request');
    return handleLogin(body as { email: string; motDePasse: string });
  }

  if (url.endsWith('/auth/register')) {
    console.log('Intercepting register request');
    return handleRegister(body as User);
  }

  // Handle other endpoints based on the current user's role
  const currentUser = localStorage.getItem(CURRENT_USER_KEY);
  if (!currentUser) {
    return of(new HttpResponse({
      status: 401,
      body: { message: 'Non autorisé' }
    })).pipe(delay(MOCK_DELAY));
  }

  // Handle dashboard data
  if (url.endsWith('/dashboard')) {
    return of(new HttpResponse({
      status: 200,
      body: mockDashboardData
    })).pipe(delay(MOCK_DELAY));
  }

  // Handle courses
  if (url.endsWith('/courses')) {
    return of(new HttpResponse({
      status: 200,
      body: mockCourses
    })).pipe(delay(MOCK_DELAY));
  }

  // If no mock handler is defined, pass through to the next handler
  console.log('No mock handler for:', url);
  return next(request);
}; 