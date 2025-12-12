import { configureStore } from '@reduxjs/toolkit';
import authReducer from './AuthSlice'
import { decodeToken } from '../utils/jwtUtils';
const userloadState = () => {
  try {
    const token = localStorage.getItem("token");
    if (!token) return null;

    const decoded = decodeToken(token);
    const isExpired = decoded.exp && Date.now() >= decoded.exp * 1000;
    if(isExpired){
      localStorage.removeItem("token");
      return null;
    }
    return decoded;
  } catch (e) {
    console.error("Invalid token:", e);
    return null;
  }
};

const store = configureStore({
  reducer: {
    auth: authReducer
  },
  preloadedState: {
    auth: {
      isAuthenticated: !!userloadState(),
      user: userloadState(),
      role: userloadState()?.role || '',
    }
  },
});

// persist `auth` instead of `user`
store.subscribe(() => {
  const state = store.getState();
  const { user } = state.auth;


  // Store only the user object
  localStorage.setItem('authUser', JSON.stringify(user));
});

export default store;