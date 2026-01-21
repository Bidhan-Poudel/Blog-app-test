export type User = {
  email: string;
};

export type AuthState = {
  user: User | null;
  token: string | null;
  isLoading: boolean;
  error: string | null;
  setAuth: (user: User, token: string) => void;
  logout: () => void;
  setError: (error: string | null) => void;
  clearError: () => void;
};

export type AuthFormValues = { email: string; password: string };

export type AuthFormProps ={
    onSubmit:(values:AuthFormValues) => void | Promise<void>;
    buttonText: string
}