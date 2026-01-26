import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './AIUseCaseIcon.css';

interface UseCaseLink {
  id: string;
  title: string;
  description?: string;
  url?: string;
}

interface AIUseCaseIconProps {
  useCase: UseCaseLink;
  position?: {
    bottom?: string;
    top?: string;
    left?: string;
    right?: string;
  };
  className?: string;
}

export default function AIUseCaseIcon({ 
  useCase, 
  position = { bottom: '20px', left: '20px' },
  className = ''
}: AIUseCaseIconProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isFavorited, setIsFavorited] = useState(false);
  const [hideTimeout, setHideTimeout] = useState<number | null>(null);

  // Load favorite status from localStorage
  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favoriteUseCases') || '[]');
    setIsFavorited(favorites.includes(useCase.id));
  }, [useCase.id]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (hideTimeout) {
        clearTimeout(hideTimeout);
      }
    };
  }, [hideTimeout]);

  const handleMouseEnter = () => {
    if (hideTimeout) {
      clearTimeout(hideTimeout);
      setHideTimeout(null);
    }
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    const timeout = window.setTimeout(() => {
      setIsHovered(false);
    }, 500); // 500ms delay before hiding - plenty of time to move mouse
    setHideTimeout(timeout);
  };

  // Toggle favorite
  const toggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const favorites = JSON.parse(localStorage.getItem('favoriteUseCases') || '[]');
    const newFavorites = isFavorited
      ? favorites.filter((id: string) => id !== useCase.id)
      : [...favorites, useCase.id];
    
    localStorage.setItem('favoriteUseCases', JSON.stringify(newFavorites));
    setIsFavorited(!isFavorited);
  };

  const positionStyle = {
    ...position
  };

  return (
    <div 
      className={`ai-use-case-icon ${className}`}
      style={positionStyle}
    >
      {/* AI Icon with subtle flash animation */}
      <div 
        className="ai-icon-wrapper"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        <svg 
          className="ai-icon" 
          viewBox="0 0 24 24" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* AI Brain/Sparkle Icon */}
          <path 
            d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z" 
            fill="currentColor"
            className="ai-icon-star"
          />
          <circle cx="12" cy="12" r="3" fill="currentColor" className="ai-icon-core" />
        </svg>
        <div className="ai-icon-pulse"></div>
      </div>

      {/* Hover Popup */}
      {isHovered && (
        <div 
          className="ai-use-case-popup"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className="popup-header">
            <h3>{useCase.title}</h3>
            <button 
              className={`favorite-btn ${isFavorited ? 'favorited' : ''}`}
              onClick={toggleFavorite}
              aria-label={isFavorited ? 'Remove from favorites' : 'Add to favorites'}
            >
              <svg 
                viewBox="0 0 24 24" 
                fill={isFavorited ? 'currentColor' : 'none'}
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
              </svg>
            </button>
          </div>
          {useCase.description && (
            <p className="popup-description">{useCase.description}</p>
          )}
          <div className="popup-actions">
            {useCase.url ? (
              <Link to={useCase.url} className="view-use-case-btn">
                View Use Case →
              </Link>
            ) : (
              <Link to={`/use-cases?id=${useCase.id}`} className="view-use-case-btn">
                View Use Case →
              </Link>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
