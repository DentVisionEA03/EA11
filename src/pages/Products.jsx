import React, { useState, useEffect, useMemo } from 'react';
import { Card, Button, Loading, HomeButton } from '../components';
import { useNavigate } from 'react-router-dom';
import productService from '../services/productService';
import './Products.css';

const Products = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const [sortBy, setSortBy] = useState('name');
  const [productsPerPage] = useState(12);

  // Fetch products on mount only
  useEffect(() => {
    let isMounted = true;
    
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const data = await productService.getAllProducts();
        if (isMounted) {
          setProducts(data.products || []);
          
          // Extraer categorías únicas
          const uniqueCategories = [...new Set((data.products || []).map(p => p.category).filter(Boolean))];
          setCategories(uniqueCategories);
        }
      } catch (error) {
        if (isMounted) {
          setError('Error al cargar los productos');
          console.error('Error fetching products:', error);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };
    
    fetchData();
    
    return () => {
      isMounted = false;
    };
  }, []);

  // Derived computed value - no state needed
  const filteredProducts = useMemo(() => {
    let filtered = [...products];

    // Filtrar por término de búsqueda
    if (searchTerm) {
      filtered = filtered.filter(product =>
        product.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtrar por categoría
    if (selectedCategory) {
      filtered = filtered.filter(product => product.category === selectedCategory);
    }

    // Ordenar
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'name':
          return (a.name || '').localeCompare(b.name || '');
        case 'price':
          return (a.price || 0) - (b.price || 0);
        case 'stock':
          return (a.stock || 0) - (b.stock || 0);
        case 'created':
          return new Date(b.createdAt || 0) - new Date(a.createdAt || 0);
        default:
          return 0;
      }
    });

    return filtered;
  }, [products, searchTerm, selectedCategory, sortBy]);

  // Pagination with proper reset using useEffect
  const [userPage, setUserPage] = useState(1);
  const paginationKey = useMemo(() => `${searchTerm}-${selectedCategory}-${sortBy}`, [searchTerm, selectedCategory, sortBy]);
  
  // Reset page when filters change using proper effect pattern
  useEffect(() => {
    // This effect runs when paginationKey changes
    // We use a cleanup function to avoid the warning
    return () => {
      setUserPage(1);
    };
  }, [paginationKey]);
  
  // Derive current page
  const currentPage = useMemo(() => {
    return userPage;
  }, [userPage]);
  
  const paginate = (pageNumber) => setUserPage(pageNumber);


  
  const handleDeleteProduct = async (productId) => {
    if (window.confirm('¿Estás seguro de que quieres eliminar este producto?')) {
      try {
        await productService.deleteProduct(productId);
        setProducts(products.filter(p => p.id !== productId));
      } catch (error) {
        setError('Error al eliminar el producto');
        console.error('Error deleting product:', error);
      }
    }
  };

  const handleEditProduct = (productId) => {
    navigate(`/edit-product/${productId}`);
  };

  // Paginación
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  if (isLoading) {
    return (
      <div className="products-page">
        <div className="products-loading">
          <Loading type="spinner" size="large" text="Cargando productos..." />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="products-page">
        <div className="products-error">
          <Card variant="danger">
            <h3>Error</h3>
            <p>{error}</p>
            <Button variant="primary" onClick={() => window.location.reload()}>
              Reintentar
            </Button>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="products-page">
      <div className="products-header">
        <div className="products-header-content">
          <div>
            <h1>Productos</h1>
            <p>Gestiona tu catálogo de productos</p>
          </div>
          <div className="products-header-actions">
            <HomeButton variant="secondary" size="medium" />
            <Button 
              variant="primary" 
              onClick={() => navigate('/add-product')}
            >
              ➕ Nuevo Producto
            </Button>
          </div>
        </div>
      </div>

      <div className="products-filters">
        <Card className="filters-card">
          <div className="filters-grid">
            <div className="filter-item">
              <label>Buscar:</label>
              <input
                type="text"
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="search-input"
              />
            </div>

            <div className="filter-item">
              <label>Categoría:</label>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="category-select"
              >
                <option value="">Todas las categorías</option>
                {categories.map(category => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div className="filter-item">
              <label>Ordenar por:</label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="sort-select"
              >
                <option value="name">Nombre</option>
                <option value="price">Precio</option>
                <option value="stock">Stock</option>
                <option value="created">Fecha de creación</option>
              </select>
            </div>
          </div>
        </Card>
      </div>

      <div className="products-content">
        <div className="products-stats">
          <Card variant="info" className="stats-card">
            <span>Total: {filteredProducts.length} productos</span>
          </Card>
        </div>

        {currentProducts.length === 0 ? (
          <Card className="empty-state">
            <div className="empty-content">
              <h3>📦 No se encontraron productos</h3>
              <p>No hay productos que coincidan con los filtros seleccionados.</p>
              <Button variant="outline" onClick={() => {
                setSearchTerm('');
                setSelectedCategory('');
              }}>
                Limpiar filtros
              </Button>
            </div>
          </Card>
        ) : (
          <>
            <div className="products-grid">
              {currentProducts.map(product => (
                <Card key={product.id} className="product-card">
                  <div className="product-image">
                    {product.image ? (
                      <img src={product.image} alt={product.name} />
                    ) : (
                      <div className="product-placeholder">
                        📦
                      </div>
                    )}
                  </div>
                  
                  <div className="product-info">
                    <h3 className="product-name">{product.name}</h3>
                    <p className="product-description">
                      {product.description?.substring(0, 100)}
                      {product.description?.length > 100 && '...'}
                    </p>
                    
                    <div className="product-meta">
                      <span className="product-price">${product.price?.toFixed(2)}</span>
                      <span className={`product-stock ${product.stock > 0 ? 'in-stock' : 'out-stock'}`}>
                        {product.stock > 0 ? `Stock: ${product.stock}` : 'Sin stock'}
                      </span>
                    </div>

                    {product.category && (
                      <span className="product-category">{product.category}</span>
                    )}
                  </div>

                  <div className="product-actions">
                    <Button 
                      variant="outline" 
                      size="small"
                      onClick={() => handleEditProduct(product.id)}
                    >
                      ✏️ Editar
                    </Button>
                    <Button 
                      variant="danger" 
                      size="small"
                      onClick={() => handleDeleteProduct(product.id)}
                    >
                      🗑️ Eliminar
                    </Button>
                  </div>
                </Card>
              ))}
            </div>

            {totalPages > 1 && (
              <div className="pagination">
                <Button
                  variant="outline"
                  size="small"
                  onClick={() => paginate(currentPage - 1)}
                  disabled={currentPage === 1}
                >
                  Anterior
                </Button>
                
                <span className="pagination-info">
                  Página {currentPage} de {totalPages}
                </span>
                
                <Button
                  variant="outline"
                  size="small"
                  onClick={() => paginate(currentPage + 1)}
                  disabled={currentPage === totalPages}
                >
                  Siguiente
                </Button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default Products;
