import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();
  const [showDropdown, setShowDropdown] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    await logout();
    window.location.href = '/login';
  };

  return (
    <nav className={`navbar ${isScrolled ? 'scrolled' : ''}`}>
      <div className="navbar-left">
        <a href="/dashboard" className="logo">
          KODFLIX
        </a>
        <ul className="nav-links">
          <li><a href="/dashboard">Home</a></li>
          <li><a href="#">TV Shows</a></li>
          <li><a href="#">Movies</a></li>
          <li><a href="#">New & Popular</a></li>
          <li><a href="#">My List</a></li>
        </ul>
      </div>
      
      <div className="navbar-right">
        <div className="search-box">
          <svg className="search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="8"></circle>
            <path d="m21 21-4.35-4.35"></path>
          </svg>
          <input type="text" placeholder="Titles, people, genres" />
        </div>
        
        <div className="profile-dropdown">
          <button 
            className="profile-btn"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            <div className="avatar">
              {user?.full_name?.charAt(0).toUpperCase() || 'U'}
            </div>
            <svg className="dropdown-arrow" viewBox="0 0 24 24" fill="currentColor">
              <path d="M7 10l5 5 5-5z"/>
            </svg>
          </button>
          
          {showDropdown && (
            <div className="dropdown-menu">
              <div className="dropdown-user">
                <span className="user-name">{user?.full_name}</span>
                <span className="user-email">{user?.email}</span>
              </div>
              <hr />
              <button onClick={handleLogout} className="logout-btn">
                Sign out of KodFlix
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
