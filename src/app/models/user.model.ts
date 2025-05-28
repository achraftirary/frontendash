export enum UserRole {
  ADMIN = 'ADMIN',
  PROFESSEUR = 'PROFESSEUR',
  ETUDIANT = 'ETUDIANT'
}

export interface User {
  nom: string;
  prenom: string;
  email: string;
  motDePasse: string;
  numeroCarteNationale: string;
  filiere: string;
  annee: string;
  role: UserRole;
  telephone: string;
  dateNaissance: string;
  genre: string;
}

export interface UserResponse extends Omit<User, 'motDePasse'> {
  id: string;
}