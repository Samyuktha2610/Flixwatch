import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Browse from './pages/Browse';
import Watch from './pages/Watch';
import Login from './pages/Login';
import Signup from './pages/Signup';
import MyList from './pages/MyList';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { AuthProvider } from './context/AuthContext';
import { WatchlistProvider } from './context/WatchlistContext';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.css';

const App = () => {
  return (
    <AuthProvider>
      <WatchlistProvider>
        <div className="app-background">
          <div className="overlay-wrapper">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/browse" element={<Browse />} />
              <Route path="/watch/:id" element={<Watch />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/mylist" element={<MyList />} />
            </Routes>
            <Footer />
            <ToastContainer position="top-right" autoClose={3000} />
          </div>
        </div>
      </WatchlistProvider>
    </AuthProvider>
  );
};

export default App;
