export const environment = {
  production: false,
  mockEnabled: true,
  apiUrl: 'http://localhost:3000/api',
  auth: {
    tokenKey: 'auth_token',
    userKey: 'current_user',
    mockUsersKey: 'mock_users'
  },
  defaultAdmin: {
    username: 'admin',
    password: 'admin123',
    email: 'admin@example.com'
  }
}; 