import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import { useWishlist } from '../context/WishlistContext';
import api from '../api/client';
import './Payment.css';

const Payment = () => {
    const navigate = useNavigate();
    const { user, logout } = useAuth();
    const { cartItems, getCartTotal, getCartCount, clearCart, rentalPeriod } = useCart();
    const { wishlist } = useWishlist();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [saveDetails, setSaveDetails] = useState(false);

    const displayName = user?.name || 'User';

    const handleLogout = () => {
        logout();
        navigate('/', { replace: true });
    };

    const toggleUserDropdown = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handlePayment = async (e) => {
        e.preventDefault();

        try {
            // Create Order in Backend
            const response = await api.post('/orders', {
                items: cartItems,
                total: getCartTotal()
            });

            if (response.data.success) {
                // Simulate payment processing delay if needed, or just proceed
                setTimeout(() => {
                    clearCart();
                    // Pass the created order details to the success page if needed, or just the ID
                    navigate('/order-success', { state: { order: response.data.data } });
                }, 1500);
            } else {
                alert('Order creation failed: ' + response.data.message);
            }
        } catch (error) {
            console.error('Payment Error:', error);
            alert('Payment failed. Please try again.');
        }
    };

    return (
        <div className="payment-page">
            {/* Top Navigation */}
            <nav className="top-nav">
                <div className="nav-container">
                    <div className="logo-box">🏠 Your Logo</div>

                    <div className="nav-links">
                        <Link to="/dashboard" className="nav-link">Products</Link>
                        <Link to="/terms" className="nav-link">Terms & Condition</Link>
                        <Link to="/about" className="nav-link">About us</Link>
                        <Link to="/contact" className="nav-link">Contact Us</Link>
                    </div>

                    <div className="search-container">
                        <input type="text" className="search-input" placeholder="Search..." />
                        <button className="search-btn">🔍</button>
                    </div>

                    <div className="nav-actions">
                        <div className="icon-btn" title="Wishlist">❤️ <span className="cart-badge" style={{ background: 'var(--accent)' }}>{wishlist.length}</span></div>
                        <Link to="/cart" className="icon-btn" style={{ textDecoration: 'none', color: 'inherit' }}>
                            🛒 <span className="cart-badge">{getCartCount()}</span>
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
                <Link to="/cart" className="breadcrumb-item">Order</Link>
                <Link to="/address" className="breadcrumb-item"> › Address</Link>
                <span className="breadcrumb-item active"> › Payment</span>
            </div>

            {/* Main Content */}
            <div className="main-content">
                {/* Payment Section - Express Checkout Form */}
                <div className="payment-section">
                    <h2>Express Checkout</h2>

                    <form onSubmit={handlePayment} className="checkout-form">
                        <div className="form-group">
                            <h3>Card Details</h3>
                            <input type="text" className="form-input" placeholder="xxxx xxxx xxxx xxxx" required />
                            <div className="checkbox-group" onClick={() => setSaveDetails(!saveDetails)}>
                                <div className={`checkbox ${saveDetails ? 'checked' : ''}`}></div>
                                <label>Save my payment details</label>
                            </div>
                        </div>

                        <div className="form-group">
                            <h3>Personal Details</h3>
                            <div className="form-row-2">
                                <div className="input-group">
                                    <label className="form-label">Name</label>
                                    <input type="text" className="form-input" defaultValue={user?.name} required />
                                </div>
                                <div className="input-group">
                                    <label className="form-label">Email</label>
                                    <input type="email" className="form-input" defaultValue={user?.email} required />
                                </div>
                            </div>
                        </div>

                        <div className="form-group">
                            <h3>Shipping Address</h3>
                            <div className="form-row-2">
                                <div className="input-group">
                                    <label className="form-label">Address</label>
                                    <input type="text" className="form-input" placeholder="Street Address" required />
                                </div>
                                <div className="input-group">
                                    <label className="form-label">City</label>
                                    <input type="text" className="form-input" required />
                                </div>
                            </div>
                            <div className="form-row-3">
                                <div className="input-group">
                                    <label className="form-label">Zip Code</label>
                                    <input type="text" className="form-input" required />
                                </div>
                                <div className="input-group">
                                    <label className="form-label">State</label>
                                    <input type="text" className="form-input" required />
                                </div>
                                <div className="input-group">
                                    <label className="form-label">Country</label>
                                    <input type="text" className="form-input" required />
                                </div>
                            </div>
                        </div>

                        <button type="submit" className="btn btn-pay-now" style={{ width: '100%', marginTop: '1rem' }}>
                            Pay R{getCartTotal().toFixed(2)}
                        </button>
                    </form>
                </div>

                {/* Summary Sidebar */}
                <div className="summary-sidebar">
                    <div className="summary-box">
                        {/* Product Preview - Showing top items */}
                        {cartItems.slice(0, 3).map((item) => (
                            <div key={item.id} className="product-preview">
                                <div className="product-image">
                                    {item.imageUrl && !item.imageUrl.startsWith('data') ? (
                                        <img src={item.imageUrl} alt={item.name} />
                                    ) : (
                                        '📦'
                                    )}
                                </div>
                                <div className="product-info">
                                    <h3>{item.name}</h3>
                                    <div className="product-price">R{item.price} x {item.quantity}</div>
                                </div>
                            </div>
                        ))}
                        {cartItems.length > 3 && (
                            <div style={{ textAlign: 'center', color: 'var(--text-muted)', marginBottom: '1rem' }}>
                                + {cartItems.length - 3} more items
                            </div>
                        )}

                        {/* Rental Period */}
                        <div style={{ marginBottom: '1.5rem', marginTop: '1rem' }}>
                            <div style={{ color: 'var(--text-muted)', marginBottom: '0.5rem' }}>Rental Period</div>
                            <div>
                                {rentalPeriod?.startDate ? `${rentalPeriod.startDate} ${rentalPeriod.startTime}` : 'Not selected'}
                                {' to '}
                                {rentalPeriod?.endDate ? `${rentalPeriod.endDate} ${rentalPeriod.endTime}` : 'Not selected'}
                            </div>
                        </div>

                        {/* Summary */}
                        <div className="summary-row">
                            <span>Delivery Charges</span>
                            <span>Free</span>
                        </div>
                        <div className="summary-row">
                            <span>Sub Total</span>
                            <span>R{getCartTotal().toFixed(2)}</span>
                        </div>
                        <div className="summary-row total">
                            <span>Total</span>
                            <span>R{getCartTotal().toFixed(2)}</span>
                        </div>

                        {/* Back Button */}
                        <button className="btn btn-back" style={{ marginTop: '1rem', width: '100%' }} onClick={() => navigate('/cart')}>‹ Back to Cart</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Payment;
