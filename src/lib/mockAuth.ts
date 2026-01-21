type User = {
  email: string;
  password: string;
};

// In-memory user store (resets on refresh — OK for demo)
const users: User[] = [];

export const mockRegister = async (email: string, password: string) => {
  const existingUser = users.find((u) => u.email === email);

  if (existingUser) {
    throw new Error("User already exists");
  }

  users.push({ email, password });

  return { message: "Registration successful" };
};

export const mockLogin = async (email: string, password: string) => {
  const user = users.find(
    (u) => u.email === email && u.password === password
  );

  if (!user) {
    throw new Error("Invalid email or password");
  }

  const token = `mock-token-${Math.random().toString(36).slice(2)}`;

  return {
    token,
    user: { email: user.email },
  };
};
