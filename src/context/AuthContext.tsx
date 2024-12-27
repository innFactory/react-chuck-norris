"use client";

import {
    createUserWithEmailAndPassword,
    onAuthStateChanged,
    sendPasswordResetEmail,
    signInWithEmailAndPassword,
    signOut,
} from "firebase/auth";
import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {toast} from "sonner";
import {auth} from "@/firebase/firebase";
import {User} from "@/models/user";
import {FirebaseError} from "firebase/app";

interface AuthContextType {
    user: User | null;
    login: (email: string, password: string) => Promise<void>;
    logout: () => Promise<void>;
    passwordReset: (email: string) => Promise<void>;
    signup: (email: string, password: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    login: async () => {
    },
    logout: async () => {
    },
    passwordReset: async () => {
    },
    signup: async () => {
    },
});

export const useAuth = () => useContext(AuthContext);

export const AuthContextProvider = ({children}: { children: ReactNode }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
            if (firebaseUser) {
                setUser({
                    uid: firebaseUser.uid,
                    email: firebaseUser.email ?? "",
                });
            } else {
                setUser(null);
            }
            setLoading(false);
        });
        return unsubscribe;
    }, []);

    const login = async (email: string, password: string) => {
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            if (error instanceof FirebaseError) {
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
            } else {
                toast.error("An unexpected error occurred");
            }
        }
    };

    const logout = async () => {
        try {
            await signOut(auth);
            setUser(null);
        } catch (error) {
            if (error instanceof FirebaseError) {
                toast.error("Logout was not successful");
            } else {
                toast.error("An unexpected error occurred");
            }
            console.error(error);
        }
    };

    const passwordReset = async (email: string) => {
        try {
            await sendPasswordResetEmail(auth, email);
            toast.success("Password Reset Email was sent");
        } catch (error) {
            if (error instanceof FirebaseError) {
                toast.error("Password Reset Email was not sent");
            } else {
                toast.error("An unexpected error occurred");
            }
            console.error(error);
        }
    };

    const signup = async (email: string, password: string) => {
        try {
            await createUserWithEmailAndPassword(auth, email, password);
            toast.success("Signup was successful");
        } catch (error) {
            if (error instanceof FirebaseError) {
                const errorMessage = error.message ? ` (${error.message})` : "";
                toast.error(`Error while signup${errorMessage}`);
            } else {
                toast.error("An unexpected error occurred");
            }
            console.error(error);
        }
    };

    return (
        <AuthContext.Provider value={{user, login, logout, passwordReset, signup}}>
            {loading ? null : children}
        </AuthContext.Provider>
    );
};
