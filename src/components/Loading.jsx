import React from 'react';
import './Loading.css';

const Loading = ({
  type = 'spinner',
  size = 'medium',
  text,
  overlay = false,
  className = '',
  ...props
}) => {
  const loadingClass = `loading loading--${type} loading--${size} ${overlay ? 'loading--overlay' : ''} ${className}`.trim();
  
  if (overlay) {
    return (
      <div className="loading-overlay">
        <div className={loadingClass} {...props}>
          {type === 'spinner' && <div className="spinner"></div>}
          {type === 'dots' && (
            <div className="dots">
              <div className="dot"></div>
              <div className="dot"></div>
              <div className="dot"></div>
            </div>
          )}
          {type === 'pulse' && <div className="pulse"></div>}
          {text && <span className="loading-text">{text}</span>}
        </div>
      </div>
    );
  }
  
  return (
    <div className={loadingClass} {...props}>
      {type === 'spinner' && <div className="spinner"></div>}
      {type === 'dots' && (
        <div className="dots">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </div>
      )}
      {type === 'pulse' && <div className="pulse"></div>}
      {text && <span className="loading-text">{text}</span>}
    </div>
  );
};

export default Loading;
