// types/auth.ts
export interface SignUpForm {
    email: string;
    prenom: string;
    last_name: string;
    password: string;
  }
  
  export interface SignInForm {
    email: string;
    password: string;
  }
  
  export interface User {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    avatar_url?: string;
  }