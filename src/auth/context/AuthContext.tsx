import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { auth } from "../../firebase/firebase";
import { User } from "../model/user";

const AuthContext = createContext<{
  user: User | null;
  login: (email: string, password: string) => void;
  logout: () => void;
  passwordReset: (email: string) => void;
  signup: (email: string, password: string) => void;
}>({
  user: null,
  login: () => {},
  logout: () => {},
  passwordReset: () => {},
  signup: () => {},
});

export const useAuth = () => useContext(AuthContext);

// Good Tutorial for AuthContextProvider: https://www.youtube.com/watch?v=ZmpO65DhRN0&ab_channel=SairajChouhan

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({
          uid: user.uid,
          email: user.email ?? "",
        });
      } else {
        setUser(null);
      }
      setLoading(false);
    });
    return unsubscribe;
  }, []);

  async function login(email: string, password: string) {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error: any) {
      switch (error.code) {
        case "auth/wrong-password":
          toast.error("Wrong Credentials");
          break;
        case "auth/user-not-found":
          toast.error("Wrong Credentials");
          break;
        case "auth/invalid-email":
          toast.error("Not an Email");
          break;
        default:
          toast.error("Login was not successful");
      }
    }
  }

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
    } catch (error) {
      toast.error("Logout was not successful");
      console.error(error);
    }
  };

  const passwordReset = async (email: string) => {
    try {
      await sendPasswordResetEmail(auth, email);
      toast.success("Password Reset Email was sent");
    } catch (error) {
      toast.error("Password Reset Email was not sent");
      console.error(error);
    }
  };

  const signup = async (email: string, password: string) => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      toast.success("Signup was successful");
    } catch (e: any) {
      console.error(e);
      const errorMessage = e.message ? ` (${e.message})` : "";
      toast.error(`Error while signup${errorMessage}`);
    }
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, passwordReset, signup }}
    >
      {loading ? null : children}
    </AuthContext.Provider>
  );
};
