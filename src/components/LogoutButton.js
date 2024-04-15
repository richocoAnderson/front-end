import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import { logout } from '../services/authService';
import IconButton from '@mui/material/IconButton';
import LogoutButtonSay from '@mui/icons-material/LogoutRounded';

function LogoutButton() {
  const { handleLogout } = useAuth();
  const navigate = useNavigate();

  const handleLogoutClick = () => {
    logout();
    handleLogout();
    navigate('/login');
  };

  return (
    <IconButton color="error" aria-label="add an alarm" onClick={handleLogoutClick}>
      <LogoutButtonSay/>
    </IconButton>
  );
}

export default LogoutButton;
