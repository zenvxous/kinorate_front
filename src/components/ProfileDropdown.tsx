import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const ProfileIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
    <circle cx="12" cy="7" r="4"></circle>
  </svg>
);

const ProfileDropdown: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  if (!user) return null;

  return (
    <div className="profile-dropdown" ref={dropdownRef}>
      <button onClick={() => setIsOpen(!isOpen)} className="profile-button">
        <ProfileIcon />
        <span>{user.nickname}</span>
      </button>

      {isOpen && (
        <div className="dropdown-menu">
          <Link to="/profile" onClick={() => setIsOpen(false)}>My Profile</Link>
          <Link to="/my-movies" onClick={() => setIsOpen(false)}>My Movies</Link>
          <Link to="/profile/edit" onClick={() => setIsOpen(false)}>Edit Profile</Link>
          <button onClick={logout} className="logout-button">Logout</button>
        </div>
      )}
    </div>
  );
};

export default ProfileDropdown;