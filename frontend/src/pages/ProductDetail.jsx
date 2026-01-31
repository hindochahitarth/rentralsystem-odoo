import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import './ProductDetail.css';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const { addToCart, getCartCount } = useCart();
    
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [quantity, setQuantity] = useState(1);
    const [showModal, setShowModal] = useState(false);
    
    // Mock product data (in a real app, fetch this based on id)
    const product = {
        id: id || 1,
        name: 'Desktop Computer',
        price: 'R00/xx',
        subtitle: '(Price for the product/per hour /per day/per night/per week)',
        image: "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='600' height='450'%3E%3Crect fill='%23252b4a' width='600' height='450'/%3E%3Ctext x='50%25' y='40%25' font-size='80' fill='%239ca3af' text-anchor='middle' dy='.3em'%3E🖥️%3C/text%3E%3Ctext x='50%25' y='60%25' font-size='24' fill='%239ca3af' text-anchor='middle'%3EDesktop Computer%3C/text%3E%3C/svg%3E",
        variants: [
            { id: 1, name: 'Option 1' },
            { id: 2, name: 'Option 2' },
            { id: 3, name: 'Option 3' }
        ]
    };

    const [selectedVariants, setSelectedVariants] = useState({
        group1: 1, // Default selected option id for group 1
        group2: 1  // Default selected option id for group 2
    });

    const displayName = user?.name || 'User';
    const initials = displayName
        .split(/\s+/)
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);

    const handleLogout = () => {
        logout();
        navigate('/', { replace: true });
    };

    const toggleUserDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const incrementQty = () => setQuantity(prev => prev + 1);
    const decrementQty = () => setQuantity(prev => prev > 1 ? prev - 1 : 1);

    const handleAddToCart = () => {
        // If product has variants, show modal (simulated logic)
        if (product.variants && product.variants.length > 0) {
            setShowModal(true);
        } else {
            addToCart({ ...product, quantity });
            alert('Added to cart!');
        }
    };

    const confirmConfiguration = () => {
        addToCart({ 
            ...product, 
            quantity, 
            selectedVariants 
        });
        setShowModal(false);
        // Optional: Navigate to cart or show success message
        if (window.confirm('Item added to cart. Go to cart?')) {
            navigate('/cart');
        }
    };

    return (
        <div className="product-detail-page">
            {/* Top Navigation */}
            <nav className="top-nav">
                <div className="nav-container">
                    <div className="logo-section">
                        <div className="logo-box">🏠 Your Logo</div>
                    </div>

                    <div className="nav-links">
                        <Link to="/dashboard" className="nav-link">Products</Link>
                        <Link to="#" className="nav-link">Terms & Condition</Link>
                        <Link to="#" className="nav-link">About us</Link>
                        <Link to="#" className="nav-link">Contact Us</Link>
                    </div>

                    <div className="search-container">
                        <input type="text" className="search-input" placeholder="Search for products..." />
                        <button className="search-btn">🔍</button>
                    </div>

                    <div className="nav-actions">
                        <div className="icon-btn">❤️</div>
                        <Link to="/cart" className="icon-btn" style={{ textDecoration: 'none', color: 'inherit' }}>
                            🛒
                            <span className="cart-badge">{getCartCount()}</span>
                        </Link>
                        <div className="user-profile-btn" onClick={toggleUserDropdown} style={{ position: 'relative' }}>
                            <div>👤</div>
                            {/* User Dropdown Menu */}
                            {isDropdownOpen && (
                                <div style={{
                                    position: 'absolute',
                                    top: '100%',
                                    right: 0,
                                    marginTop: '0.5rem',
                                    background: 'var(--surface)',
                                    border: '1px solid var(--border)',
                                    borderRadius: '12px',
                                    padding: '0.5rem',
                                    width: '200px',
                                    zIndex: 1000,
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.5)'
                                }}>
                                    <div style={{ padding: '0.75rem', borderBottom: '1px solid var(--border)' }}>
                                        <div style={{ fontWeight: 600 }}>{displayName}</div>
                                        <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{user?.email}</div>
                                    </div>
                                    <button onClick={handleLogout} style={{
                                        width: '100%',
                                        textAlign: 'left',
                                        padding: '0.75rem',
                                        background: 'transparent',
                                        border: 'none',
                                        color: 'var(--text)',
                                        cursor: 'pointer',
                                        display: 'flex',
                                        alignItems: 'center',
                                        gap: '0.5rem'
                                    }}>
                                        <span>🚪</span> Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            {/* Breadcrumb */}
            <div className="breadcrumb">
                <Link to="/dashboard">All Product</Link> / <span>{product.name}</span>
            </div>

            {/* Page Header */}
            <div className="page-header">
                <h1>Product Page</h1>
            </div>

            {/* Main Content */}
            <div className="main-content">
                {/* Product Gallery */}
                <div className="product-gallery">
                    <div className="main-image">
                        <img src={product.image} alt={product.name} />
                    </div>
                </div>

                {/* Product Info */}
                <div className="product-info">
                    <div>
                        <h1 className="product-title">{product.name}</h1>
                        <div className="product-price">{product.price}</div>
                        <p className="price-subtitle">{product.subtitle}</p>
                    </div>

                    {/* Rental Period */}
                    <div className="rental-period">
                        <label className="period-label">Rental Period [UTC + 01:00]</label>
                        <div className="date-inputs">
                            <div className="date-input-group">
                                <input type="date" defaultValue="2026-01-12" />
                                <input type="time" defaultValue="07:00:00" />
                            </div>
                            <div className="arrow-icon">→</div>
                            <div className="date-input-group">
                                <input type="date" defaultValue="2026-01-12" />
                                <input type="time" defaultValue="10:00:00" />
                            </div>
                        </div>

                        {/* Action Buttons */}
                        <div className="action-buttons">
                            <div className="quantity-control">
                                <button className="qty-btn" onClick={decrementQty}>-</button>
                                <span className="qty-value">{quantity}</span>
                                <button className="qty-btn" onClick={incrementQty}>+</button>
                            </div>
                            <button className="btn btn-add-cart" onClick={handleAddToCart}>🛒 Add to cart</button>
                            <button className="btn-icon">❤️</button>
                            <button className="btn-icon">≡</button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Configure Modal */}
            {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h2>Configure</h2>
                            <button className="close-btn" onClick={() => setShowModal(false)}>✕</button>
                        </div>
                        <div className="modal-body">
                            <p style={{ color: 'var(--text-muted)', marginBottom: '2rem' }}>
                                If a product has multiple variants then clicking on Add to cart must open a dialog to allow the users to choose from variants as well
                            </p>

                            {/* Variant Group 1 */}
                            <div className="variant-group">
                                <div className="variant-display">
                                    <div className="variant-image"></div>
                                    <div className="variant-options">
                                        {[1, 2, 3].map(opt => (
                                            <div key={opt} className="option-item" onClick={() => setSelectedVariants({...selectedVariants, group1: opt})}>
                                                <div className={`option-radio ${selectedVariants.group1 === opt ? 'checked' : ''}`}></div>
                                                <span>Option {opt}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>

                            {/* Variant Group 2 */}
                            <div className="variant-group">
                                <div className="variant-display">
                                    <div className="variant-image"></div>
                                    <div className="variant-options">
                                        {[1, 2, 3].map(opt => (
                                            <div key={opt} className="option-item" onClick={() => setSelectedVariants({...selectedVariants, group2: opt})}>
                                                <div className={`option-radio ${selectedVariants.group2 === opt ? 'checked' : ''}`}></div>
                                                <span>Option {opt}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button className="btn-configure" onClick={confirmConfiguration}>Configure</button>
                            <button className="btn-cancel" onClick={() => setShowModal(false)}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProductDetail;
