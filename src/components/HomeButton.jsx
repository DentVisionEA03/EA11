import React from 'react';
import { useNavigate } from 'react-router-dom';
import './HomeButton.css';

const HomeButton = ({ 
  variant = 'primary', 
  size = 'medium', 
  showText = true, 
  className = '',
  onClick,
  ...props 
}) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/');
    if (onClick) {
      onClick();
    }
  };

  const buttonClass = `home-button home-button--${variant} home-button--${size} ${className}`.trim();

  return (
    <button 
      className={buttonClass}
      onClick={handleClick}
      {...props}
    >
      <span className="home-button__icon">{'\ud83c\udfe0'}</span>
      {showText && <span className="home-button__text">Inicio</span>}
    </button>
  );
};

export default HomeButton;
