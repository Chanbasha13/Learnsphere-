import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  getCurrentUser, 
  setCurrentUser, 
  removeCurrentUser, 
  getAllUsers, 
  saveUser, 
  deleteUser, 
  updateUserRole, 
  initializeStorage 
} from '../utils/storage';
import { soundEngine } from '../utils/sound';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [allUsers, setAllUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initializeStorage();
    const stored = getCurrentUser();
    if (stored) {
      setUser(stored);
    }
    setAllUsers(getAllUsers());
    setLoading(false);
  }, []);

  const refreshUsersList = () => {
    setAllUsers(getAllUsers());
  };

  const login = (email, password) => {
    soundEngine.playClick(700);
    const users = getAllUsers();
    const cleanEmail = email.trim().toLowerCase();
    const found = users.find(u => u.email.toLowerCase() === cleanEmail);

    if (!found) {
      return { success: false, message: 'Account not found. Please verify your email or register.' };
    }
    if (found.password && found.password !== password) {
      return { success: false, message: 'Invalid credentials. Please verify your password.' };
    }

    setCurrentUser(found);
    setUser(found);
    return { success: true, user: found };
  };

  const loginAs = (role) => {
    soundEngine.playClick(800);
    const users = getAllUsers();
    const demo = users.find(u => u.role === role) || users[0];
    setCurrentUser(demo);
    setUser(demo);
    return { success: true, user: demo };
  };

  const signup = (formData) => {
    soundEngine.playClick(650);
    const users = getAllUsers();
    const cleanEmail = formData.email.trim().toLowerCase();

    if (users.some(u => u.email.toLowerCase() === cleanEmail)) {
      return { success: false, message: 'An account with this email address already exists.' };
    }

    let defaultHeadline = 'LearnSphere Undergraduate Scholar';
    let defaultAvatar = 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=200&h=200&fit=crop&crop=face';

    if (formData.role === 'admin') {
      defaultHeadline = 'University Academic Administrator';
      defaultAvatar = 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=200&h=200&fit=crop&crop=face';
    } else if (formData.role === 'instructor') {
      defaultHeadline = 'Adjunct Academic Lecturer';
      defaultAvatar = 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=200&h=200&fit=crop&crop=face';
    }

    const newUser = {
      id: 'user_' + Date.now(),
      name: formData.name.trim(),
      email: cleanEmail,
      password: formData.password,
      role: formData.role || 'student',
      headline: defaultHeadline,
      avatar: defaultAvatar,
      department: formData.department || 'Programming Academy',
      joinedDate: new Date().toISOString().split('T')[0],
      streak: 1,
      studyHours: 0
    };

    saveUser(newUser);
    setCurrentUser(newUser);
    setUser(newUser);
    refreshUsersList();
    return { success: true, user: newUser };
  };

  const logout = () => {
    soundEngine.playClick(500);
    removeCurrentUser();
    setUser(null);
  };

  const updateProfile = (fields) => {
    if (!user) return;
    const updated = { ...user, ...fields };
    saveUser(updated);
    setCurrentUser(updated);
    setUser(updated);
    refreshUsersList();
  };

  const removeUserAccount = (userId) => {
    soundEngine.playClick(400);
    const updated = deleteUser(userId);
    setAllUsers(updated);
  };

  const changeUserRole = (userId, newRole) => {
    soundEngine.playClick(600);
    const updated = updateUserRole(userId, newRole);
    setAllUsers(updated);
    if (user && user.id === userId) {
      setUser({ ...user, role: newRole });
    }
  };

  return (
    <AuthContext.Provider value={{
      user,
      allUsers,
      role: user?.role || 'guest',
      isAuthenticated: !!user,
      loading,
      login,
      loginAs,
      signup,
      logout,
      updateProfile,
      removeUserAccount,
      changeUserRole,
      refreshUsersList
    }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
