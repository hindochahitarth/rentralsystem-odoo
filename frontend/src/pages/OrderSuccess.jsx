import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './OrderSuccess.css';

const OrderSuccess = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const displayName = user?.name || 'User';

    const handleLogout = () => {
        logout();
        navigate('/', { replace: true });
    };

    const toggleUserDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    // Auto-redirect after 5 seconds (optional, mimicking HTML behavior)
    // useEffect(() => {
    //     const timer = setTimeout(() => {
    //         if (window.confirm('Order placed successfully! Would you like to continue shopping?')) {
    //             navigate('/dashboard');
    //         }
    //     }, 5000);
    //     return () => clearTimeout(timer);
    // }, [navigate]);

    return (
        <div className="success-page">
            {/* Top Navigation */}
            <nav className="top-nav">
                <div className="nav-container">
                    <div className="logo-box">🏠 Your Logo</div>

                    <div className="search-container">
                        <input type="text" className="search-input" placeholder="Search..." />
                        <button className="search-btn">🔍</button>
                    </div>

                    <div className="nav-actions">
                        <div className="icon-btn">❤️</div>
                        <div className="icon-btn">
                            🛒
                            <span className="cart-badge">0</span>
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

            {/* Main Content */}
            <div className="main-content">
                {/* Success Section */}
                <div className="success-section">
                    <div className="success-header">
                        <h1>Thank you for your order</h1>
                        <div className="order-number">Order SO00010</div>
                    </div>

                    <div className="success-message">
                        Your Payment has been processed.
                    </div>

                    {/* Delivery & Billing Address */}
                    <div className="address-section">
                        <div className="address-header">
                            <div className="address-badge">Delivery & Billing</div>
                        </div>
                        <div className="address-name">{user?.name || 'Customer Name'}</div>
                        <div className="address-text">
                            123 Main Street, Apartment 4B<br />
                            New York, NY 10001<br />
                            United States
                        </div>
                    </div>

                    {/* Backend Note */}
                    <div className="backend-note">
                        📝 Create a sale order and invoice for the customer in the back-end
                    </div>
                </div>

                {/* Summary Sidebar */}
                <div className="summary-sidebar">
                    <button className="print-button" onClick={() => window.print()}>🖨️ Print</button>

                    <div className="summary-box">
                        {/* Product Preview - Placeholder since cart is cleared */}
                        <div className="product-preview">
                            <div className="product-image"></div>
                            <div className="product-info">
                                <h3>Product Name</h3>
                                <div className="product-price">Rxx.xx/ xxx</div>
                            </div>
                        </div>

                        {/* Rental Period */}
                        <div style={{ marginBottom: '1.5rem' }}>
                            <div style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Rental Period</div>
                            <div>Today to Tomorrow</div>
                        </div>

                        {/* Summary */}
                        <div className="summary-row">
                            <span>Delivery Charges</span>
                            <span>-</span>
                        </div>
                        <div className="summary-row">
                            <span>Sub Total</span>
                            <span>Rxx.xx</span>
                        </div>
                        <div className="summary-row total">
                            <span>Total</span>
                            <span>Rxx.xx</span>
                        </div>

                        {/* Social Share */}
                        <div className="social-share">
                            <div className="share-buttons">
                                <div className="social-btn" title="Share on Instagram">📷</div>
                                <div className="social-btn" title="Share on Twitter">🐦</div>
                                <div className="social-btn" title="Share on Telegram">✈️</div>
                            </div>
                        </div>
                        
                        <button className="btn-continue" style={{marginTop: '2rem', width: '100%', padding: '1rem', background: 'var(--accent)', border: 'none', borderRadius: '10px', color: 'white', cursor: 'pointer'}} onClick={() => navigate('/dashboard')}>
                            Continue Shopping
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderSuccess;
