import { createAction, props } from '@ngrx/store';
import { User, UserResponse } from '../../models/user.model';

// Login Actions
export const login = createAction(
  '[Auth] Login',
  props<{ email: string; motDePasse: string }>()
);

export const loginSuccess = createAction(
  '[Auth] Login Success',
  props<{ user: UserResponse; token: string }>()
);

export const loginFailure = createAction(
  '[Auth] Login Failure',
  props<{ error: string }>()
);

// Register Actions
export const register = createAction(
  '[Auth] Register',
  props<{ user: User }>()
);

export const registerSuccess = createAction(
  '[Auth] Register Success',
  props<{ message: string }>()
);

export const registerFailure = createAction(
  '[Auth] Register Failure',
  props<{ error: string }>()
);

// Logout Actions
export const logout = createAction('[Auth] Logout');
export const logoutSuccess = createAction('[Auth] Logout Success');

// Load User Actions
export const loadUser = createAction('[Auth] Load User');
export const loadUserSuccess = createAction(
  '[Auth] Load User Success',
  props<{ user: UserResponse }>()
);
export const loadUserFailure = createAction(
  '[Auth] Load User Failure',
  props<{ error: string }>()
); 