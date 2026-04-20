import React from 'react';
import { Card, Button } from './index';
import './ProductCard.css';

const ProductCard = ({ 
  product, 
  onEdit, 
  onDelete, 
  onView,
  showActions = true,
  compact = false 
}) => {
  const handleEdit = () => {
    if (onEdit) onEdit(product.id);
  };

  const handleDelete = () => {
    if (onDelete) onDelete(product.id);
  };

  const handleView = () => {
    if (onView) onView(product);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    }).format(price || 0);
  };

  const getStockStatus = (stock) => {
    if (stock > 10) return { text: `Stock: ${stock}`, class: 'in-stock' };
    if (stock > 0) return { text: `Stock: ${stock}`, class: 'low-stock' };
    return { text: 'Sin stock', class: 'out-stock' };
  };

  const stockStatus = getStockStatus(product.stock);

  return (
    <Card className={`product-card ${compact ? 'compact' : ''}`}>
      <div className="product-image" onClick={handleView}>
        {product.image ? (
          <img 
            src={product.image} 
            alt={product.name}
            onError={(e) => {
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
        ) : null}
        <div className="product-placeholder" style={{ display: product.image ? 'none' : 'flex' }}>
          📦
        </div>
        {product.discount && (
          <div className="product-discount">
            -{product.discount}%
          </div>
        )}
      </div>
      
      <div className="product-info">
        <h3 className="product-name" onClick={handleView}>
          {product.name}
        </h3>
        
        {product.description && (
          <p className="product-description">
            {compact 
              ? product.description.substring(0, 60)
              : product.description.substring(0, 100)
            }
            {product.description.length > (compact ? 60 : 100) && '...'}
          </p>
        )}
        
        <div className="product-meta">
          <div className="product-price-container">
            <span className="product-price">
              {formatPrice(product.price)}
            </span>
            {product.originalPrice && product.originalPrice > product.price && (
              <span className="product-original-price">
                {formatPrice(product.originalPrice)}
              </span>
            )}
          </div>
          
          <span className={`product-stock ${stockStatus.class}`}>
            {stockStatus.text}
          </span>
        </div>

        <div className="product-details">
          {product.category && (
            <span className="product-category">{product.category}</span>
          )}
          
          {product.rating && (
            <div className="product-rating">
              <span className="rating-stars">
                {'★'.repeat(Math.floor(product.rating))}
                {'☆'.repeat(5 - Math.floor(product.rating))}
              </span>
              <span className="rating-value">({product.rating})</span>
            </div>
          )}
        </div>

        {product.tags && product.tags.length > 0 && (
          <div className="product-tags">
            {product.tags.slice(0, 2).map((tag, index) => (
              <span key={index} className="product-tag">
                {tag}
              </span>
            ))}
          </div>
        )}
      </div>

      {showActions && (
        <div className="product-actions">
          <Button 
            variant="outline" 
            size="small"
            onClick={handleView}
            className="action-btn view-btn"
          >
            👁️ Ver
          </Button>
          <Button 
            variant="outline" 
            size="small"
            onClick={handleEdit}
            className="action-btn edit-btn"
          >
            ✏️ Editar
          </Button>
          <Button 
            variant="danger" 
            size="small"
            onClick={handleDelete}
            className="action-btn delete-btn"
          >
            🗑️
          </Button>
        </div>
      )}
    </Card>
  );
};

export default ProductCard;
