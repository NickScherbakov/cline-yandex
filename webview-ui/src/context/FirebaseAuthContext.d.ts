import { User } from "firebase/auth";
import React from "react";
interface FirebaseAuthContextType {
    user: User | null;
    isInitialized: boolean;
    signInWithToken: (token: string) => Promise<void>;
    handleSignOut: () => Promise<void>;
}
export declare const FirebaseAuthProvider: React.FC<{
    children: React.ReactNode;
}>;
export declare const useFirebaseAuth: () => FirebaseAuthContextType;
export {};
