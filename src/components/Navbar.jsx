import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import './Navbar.css';
import {
  Home,
  Film,
  List,
  LogIn,
  UserPlus,
  Sun,
  Moon,
  LogOut
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [theme, setTheme] = useState('dark');
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.documentElement.setAttribute('data-theme', savedTheme);
    setTheme(savedTheme);
  }, []);

  const toggleTheme = () => {
    const newTheme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    setTheme(newTheme);
  };

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <NavLink to="/" className="logo">
          FlixWatch
        </NavLink>
      </div>

      <div className="navbar-right">
        <NavLink to="/" className="nav-link" end>
          <Home size={16} /> <span>Home</span>
        </NavLink>

        <NavLink to="/browse" className="nav-link">
          <Film size={16} /> <span>Browse</span>
        </NavLink>

        {user && (
          <NavLink to="/mylist" className="nav-link">
            <List size={16} /> <span>My List</span>
          </NavLink>
        )}

        {user ? (
          <button className="nav-link logout-btn" onClick={handleLogout}>
            <LogOut size={16} /> <span>Logout</span>
          </button>
        ) : (
          <>
            <NavLink to="/login" className="nav-link login-btn">
              <LogIn size={16} /> <span>Login</span>
            </NavLink>
            <NavLink to="/signup" className="nav-link signup-btn">
              <UserPlus size={16} /> <span>Sign Up</span>
            </NavLink>
          </>
        )}

        <button
          className="theme-toggle"
          onClick={toggleTheme}
          title="Toggle theme"
        >
          {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
