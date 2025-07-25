// context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';
import { initializeApp } from 'firebase/app';
import {
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut
} from 'firebase/auth';

// 🔐 Firebase config (yours)
const firebaseConfig = {
  apiKey: "AIzaSyB-BX5ufxIjDPNRn2cBS340xKgcA1uYXio",
  authDomain: "flixwatch-2950b.firebaseapp.com",
  projectId: "flixwatch-2950b",
  storageBucket: "flixwatch-2950b.appspot.com",
  messagingSenderId: "972547251844",
  appId: "1:972547251844:web:2646182880208abfbc6cd1",
  measurementId: "G-83HB08EN47"
};

// 🔧 Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('flixwatch-user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  // ✅ Keep Firebase + LocalStorage in sync
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      if (firebaseUser) {
        const userObj = { email: firebaseUser.email };
        setUser(userObj);
        localStorage.setItem('flixwatch-user', JSON.stringify(userObj));
      } else {
        setUser(null);
        localStorage.removeItem('flixwatch-user');
      }
    });
    return () => unsubscribe();
  }, []);

  // ✅ Signup with Firebase
  const signup = (email, password) => createUserWithEmailAndPassword(auth, email, password);

  // ✅ Login with Firebase
  const login = async (email, password) => {
    // Optional: Restrict to your Gmail only
    // if (email !== 'yourgmail@example.com') throw new Error("Only admin account allowed.");

    await signInWithEmailAndPassword(auth, email, password);
  };

  // ✅ Forgot password
  const resetPassword = (email) => sendPasswordResetEmail(auth, email);

  // ✅ Logout
  const logout = () => {
    signOut(auth);
    setUser(null);
    localStorage.removeItem('flixwatch-user');
  };

  return (
    <AuthContext.Provider value={{ user, signup, login, resetPassword, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
