import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

export type UserRole = "customer" | "delivery_agent" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  vehicleNumber?: string;
  role: UserRole;
  avatar?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (
    userData: Omit<User, "id"> & { password: string },
  ) => Promise<boolean>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check for existing session
    const savedUser = localStorage.getItem("user");
    if (savedUser) {
      setUser(JSON.parse(savedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      setIsLoading(true);

      // Demo users for testing
      const demoUsers: (User & { password: string })[] = [
        {
          id: "1",
          name: "John Customer",
          email: "customer@demo.com",
          password: "demo123",
          role: "customer",
          phone: "+91 98765 43210",
          address: "123 Main Street, Satellite, Ahmedabad, Gujarat 380015",
        },
        {
          id: "2",
          name: "Jane Agent",
          email: "agent@demo.com",
          password: "demo123",
          role: "delivery_agent",
          phone: "+91 98765 43211",
          address: "456 Agent Colony, Vastrapur, Ahmedabad, Gujarat 380058",
          vehicleNumber: "GJ-05-AB-1234",
        },
        {
          id: "3",
          name: "Admin User",
          email: "admin@demo.com",
          password: "demo123",
          role: "admin",
          phone: "+91 98765 43212",
          address: "789 Admin Tower, CG Road, Ahmedabad, Gujarat 380009",
        },
      ];

      const foundUser = demoUsers.find(
        (u) => u.email === email && u.password === password,
      );

      if (foundUser) {
        const { password: _, ...userWithoutPassword } = foundUser;
        setUser(userWithoutPassword);
        localStorage.setItem("user", JSON.stringify(userWithoutPassword));
        return true;
      }

      return false;
    } catch (error) {
      console.error("Login error:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const register = async (
    userData: Omit<User, "id"> & { password: string },
  ): Promise<boolean> => {
    try {
      setIsLoading(true);

      // Generate a simple ID
      const newUser: User = {
        id: Date.now().toString(),
        name: userData.name,
        email: userData.email,
        phone: userData.phone,
        address: userData.address,
        role: userData.role,
        avatar: userData.avatar,
      };

      setUser(newUser);
      localStorage.setItem("user", JSON.stringify(newUser));
      return true;
    } catch (error) {
      console.error("Registration error:", error);
      return false;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
};
