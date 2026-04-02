import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import Auth from './pages/Auth';
import Chat from './pages/Chat';
import Explore from './pages/Explore';
import Dashboard from './pages/Dashboard';
import StoryTracker from './pages/StoryTracker';
import Account from './pages/Account';
import Article from './pages/Article';
import { useAuth } from './context/AuthContext';

// Protected Route — redirects to /auth if not logged in
const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();
  if (loading) return null; // or a spinner
  return user ? children : <Navigate to="/auth" replace />;
};

function App() {
  return (
    <Router>
      <Routes>
        {/* Public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/auth" element={<Auth />} />

        {/* Protected routes */}
        <Route path="/chat" element={<ProtectedRoute><Chat /></ProtectedRoute>} />
        <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
        <Route path="/tracker" element={<ProtectedRoute><StoryTracker /></ProtectedRoute>} />
        <Route path="/account" element={<ProtectedRoute><Account /></ProtectedRoute>} />
        <Route path="/article" element={<ProtectedRoute><Article /></ProtectedRoute>} />
      </Routes>
    </Router>
  );
}

export default App;