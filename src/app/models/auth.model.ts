import { User, UserResponse } from './user.model';

export interface AuthResponse {
  token: string;
  user: UserResponse;
}

export interface LoginRequest {
  email: string;
  motDePasse: string;
}

export interface RegisterData extends Omit<User, 'id'> {
  // Tous les champs sont hérités de User
}

export interface AuthError {
  message: string;
  code?: string;
  details?: Record<string, any>;
} 