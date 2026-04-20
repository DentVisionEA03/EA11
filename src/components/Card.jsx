import React from 'react';
import './Card.css';

const Card = ({
  children,
  title,
  subtitle,
  footer,
  headerExtra,
  variant = 'default',
  padding = 'medium',
  shadow = 'medium',
  className = '',
  onClick,
  ...props
}) => {
  const cardClass = `card card--${variant} card--padding-${padding} card--shadow-${shadow} ${className}`.trim();
  
  return (
    <div 
      className={cardClass}
      onClick={onClick}
      {...props}
    >
      {(title || subtitle || headerExtra) && (
        <div className="card-header">
          <div className="card-header-content">
            {title && <h3 className="card-title">{title}</h3>}
            {subtitle && <p className="card-subtitle">{subtitle}</p>}
          </div>
          {headerExtra && <div className="card-header-extra">{headerExtra}</div>}
        </div>
      )}
      
      <div className="card-body">
        {children}
      </div>
      
      {footer && (
        <div className="card-footer">
          {footer}
        </div>
      )}
    </div>
  );
};

export default Card;
