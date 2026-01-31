import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import './Cart.css';

const Cart = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const { cartItems, updateQuantity, removeFromCart, getCartCount, getCartTotal } = useCart();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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

    const handleRemoveItem = (id) => {
        if (window.confirm('Remove this item from cart?')) {
            removeFromCart(id);
        }
    };

    return (
        <div className="cart-page">
            {/* Top Navigation */}
            <nav className="top-nav">
                <div className="nav-container">
                    <div className="logo-box">🏠 Your Logo</div>

                    <div className="nav-links">
                        <Link to="/dashboard" className="nav-link">Products</Link>
                        <Link to="#" className="nav-link">Terms & Condition</Link>
                        <Link to="#" className="nav-link">About us</Link>
                        <Link to="#" className="nav-link">Contact Us</Link>
                    </div>

                    <div className="search-container">
                        <input type="text" className="search-input" placeholder="Search..." />
                        <button className="search-btn">🔍</button>
                    </div>

                    <div className="nav-actions">
                        <div className="icon-btn">❤️</div>
                        <div className="icon-btn">
                            🛒
                            <span className="cart-badge">{getCartCount()}</span>
                        </div>
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
                <Link to="/cart" className="breadcrumb-item">Add to Cart</Link>
                <span className="breadcrumb-item active">› Address › Payment</span>
            </div>

            {/* Main Content */}
            <div className="main-content">
                {/* Cart Items */}
                <div className="cart-section">
                    <h2>Order Summary</h2>

                    {cartItems.length === 0 ? (
                        <div style={{ textAlign: 'center', padding: '2rem', color: 'var(--text-muted)' }}>
                            <p>Your cart is empty.</p>
                            <Link to="/dashboard" className="continue-shopping" style={{ marginTop: '1rem' }}>Browse Products</Link>
                        </div>
                    ) : (
                        <>
                            {cartItems.map(item => (
                                <div key={item.id} className="cart-item">
                                    <div className="item-header">
                                        <div className="item-image">
                                            {item.image && !item.image.startsWith('data') ? '📦' : <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />}
                                        </div>
                                        <div className="item-details">
                                            <h3>{item.name}</h3>
                                            <div className="item-price">{item.price}</div>
                                            <div className="item-meta">{item.subtitle || item.meta}</div>
                                            {item.selectedVariants && (
                                                <div className="item-meta">
                                                    Variants: {Object.values(item.selectedVariants).join(', ')}
                                                </div>
                                            )}
                                        </div>
                                        <div className="item-quantity">
                                            <button 
                                                className="qty-btn" 
                                                onClick={() => updateQuantity(item.id, -1)}
                                            >-</button>
                                            <span className="qty-value">{item.quantity}</span>
                                            <button 
                                                className="qty-btn" 
                                                onClick={() => updateQuantity(item.id, 1)}
                                            >+</button>
                                        </div>
                                    </div>
                                    <div className="item-actions">
                                        <button 
                                            className="btn-text" 
                                            onClick={() => handleRemoveItem(item.id)}
                                        >Remove</button>
                                        <button className="btn-text">Save For Later</button>
                                    </div>
                                </div>
                            ))}
                            <Link to="/dashboard" className="continue-shopping">Continue Shopping ›</Link>
                        </>
                    )}
                </div>

                {/* Summary Sidebar */}
                <div className="summary-sidebar">
                    <div className="summary-box">
                        {/* Rental Period */}
                        <div className="rental-period-box">
                            <h3>Rental Period</h3>
                            <div className="date-time-group">
                                <input type="text" className="date-time-input" placeholder="Start Date" defaultValue="xx/xx/xxxx" />
                                <input type="text" className="date-time-input" placeholder="Start Time" defaultValue="00:00:00 am" />
                                <button className="icon-btn" style={{ width: '36px', height: '36px' }}>📅</button>
                            </div>
                            <div className="date-time-group">
                                <input type="text" className="date-time-input" placeholder="End Date" defaultValue="xx/xx/xxxx" />
                                <input type="text" className="date-time-input" placeholder="End Time" defaultValue="00:00:00 am" />
                                <button className="icon-btn" style={{ width: '36px', height: '36px' }}>📅</button>
                            </div>
                        </div>

                        {/* Summary */}
                        <div className="summary-row">
                            <span>Delivery Charges</span>
                            <span className="amount">-</span>
                        </div>
                        <div className="summary-row">
                            <span>Sub Total</span>
                            <span className="amount">R{getCartTotal().toFixed(2)}</span>
                        </div>
                        <div className="summary-row total">
                            <span>Total</span>
                            <span className="amount">R{getCartTotal().toFixed(2)}</span>
                        </div>

                        {/* Action Buttons */}
                        <div className="action-buttons">
                            <button className="btn btn-primary">Apply Coupon</button>
                            <button className="btn btn-secondary">Pay with Save Card</button>
                            <button className="btn btn-checkout" onClick={() => navigate('/address')}>Checkout</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Cart;
