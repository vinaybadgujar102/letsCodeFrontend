import { User } from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";

import { auth } from "../config/firebase";
import { connectSocket, disconnectSocket } from "../services/socket.service";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  setUser: (user: User | null) => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  loading: true,
  setUser: () => {},
});

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem("user");
    return storedUser ? JSON.parse(storedUser) : null;
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((firebaseUser) => {
      if (firebaseUser) {
        const userToStore = {
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          displayName: firebaseUser.displayName,
          photoURL: firebaseUser.photoURL,
          emailVerified: firebaseUser.emailVerified,
        };
        localStorage.setItem("user", JSON.stringify(userToStore));
        setUser(firebaseUser);
        connectSocket(firebaseUser.uid);
      } else {
        localStorage.removeItem("user");
        setUser(null);
        disconnectSocket();
      }
      setLoading(false);
    });

    return () => {
      unsubscribe();
      disconnectSocket();
    };
  }, []);

  useEffect(() => {
    if (user) {
      const userToStore = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        emailVerified: user.emailVerified,
      };
      localStorage.setItem("user", JSON.stringify(userToStore));
    } else {
      localStorage.removeItem("user");
    }
  }, [user]);

  const contextValue = {
    user,
    loading,
    setUser,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {!loading && children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
