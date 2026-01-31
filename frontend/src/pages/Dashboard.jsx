import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Dashboard.css';

const Dashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const displayName = user?.name || 'User';
    const email = user?.email || 'user@example.com';
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

    return (
        <div className="dashboard-page">
            {/* Top Navigation */}
            <nav className="top-nav">
                <div className="nav-container">
                    <div className="logo-section">
                        <div className="logo-icon">🏠</div>
                        <span style={{ fontWeight: 700, fontSize: '1.1rem' }}>RentFlow</span>
                    </div>

                    <div className="nav-links">
                        <Link to="#" className="nav-link">Products</Link>
                        <Link to="#" className="nav-link">Terms & Condition</Link>
                        <Link to="#" className="nav-link">About us</Link>
                        <Link to="#" className="nav-link">Contact Us</Link>
                    </div>

                    <div className="search-container">
                        <input type="text" className="search-input" placeholder="Search for products..." />
                        <button className="search-btn">🔍</button>
                    </div>

                    <div className="nav-actions">
                        <div className="icon-btn" title="Wishlist">
                            ❤️
                        </div>
                        <div className="icon-btn" title="Cart">
                            🛒
                            <span className="cart-badge">0</span>
                        </div>
                        <div className="user-profile-btn" onClick={toggleUserDropdown}>
                            <div className="user-avatar">{initials}</div>
                            <span className="dropdown-arrow">▼</span>

                            {/* User Dropdown Menu */}
                            <div className={`user-dropdown ${isDropdownOpen ? 'active' : ''}`} id="userDropdown">
                                <div className="dropdown-header">
                                    <div className="dropdown-user-name">{displayName}</div>
                                    <div className="dropdown-user-email">{email}</div>
                                </div>
                                <Link to="#" className="dropdown-item">
                                    <span>👤</span>
                                    <span>My account/ My Profile</span>
                                </Link>
                                <Link to="#" className="dropdown-item">
                                    <span>📦</span>
                                    <span>My Orders</span>
                                </Link>
                                <Link to="#" className="dropdown-item">
                                    <span>⚙️</span>
                                    <span>Settings</span>
                                </Link>
                                <div className="dropdown-divider"></div>
                                <button onClick={handleLogout} className="dropdown-item">
                                    <span>🚪</span>
                                    <span>Logout</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Customer Login Notice */}
            <div style={{ background: 'var(--surface)', borderBottom: '1px solid var(--border)', padding: '0.75rem 2rem', textAlign: 'center' }}>
                <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Customer Login</span>
                <span style={{ color: 'var(--accent)', marginLeft: '2rem', fontWeight: 600 }}>Home Page up on Sign In</span>
            </div>

            {/* Main Layout */}
            <div className="main-layout">
                {/* Left Sidebar - Filters */}
                <aside className="filter-sidebar">
                    {/* Brand Filter */}
                    <div className="filter-section">
                        <div className="filter-title">
                            <span>Brand</span>
                            <span className="filter-toggle">▼</span>
                        </div>
                        <div className="filter-options">
                            <label className="filter-option">
                                <input type="checkbox" />
                                <div className="filter-checkbox"></div>
                                <span className="filter-label">xxxxxxx</span>
                            </label>
                            <label className="filter-option">
                                <input type="checkbox" />
                                <div className="filter-checkbox"></div>
                                <span className="filter-label">xxxxxxx</span>
                            </label>
                            <label className="filter-option">
                                <input type="checkbox" />
                                <div className="filter-checkbox"></div>
                                <span className="filter-label">xxxxxxxx</span>
                            </label>
                        </div>
                    </div>

                    {/* Color Filter */}
                    <div className="filter-section">
                        <div className="filter-title">
                            <span>Color</span>
                            <span className="filter-toggle">▼</span>
                        </div>
                        <div className="color-options">
                            <div className="color-swatch" style={{ background: '#4a90e2' }}></div>
                            <div className="color-swatch" style={{ background: '#9b59b6' }}></div>
                            <div className="color-swatch active" style={{ background: '#f39c12' }}></div>
                            <div className="color-swatch" style={{ background: '#e74c3c' }}></div>
                        </div>
                    </div>

                    {/* Duration Filter */}
                    <div className="filter-section">
                        <div className="filter-title">
                            <span>Duration</span>
                            <span className="filter-toggle">▼</span>
                        </div>
                        <div className="filter-options">
                            <label className="filter-option">
                                <input type="checkbox" />
                                <div className="filter-checkbox"></div>
                                <span className="filter-label">All Durations</span>
                            </label>
                            <label className="filter-option">
                                <input type="checkbox" />
                                <div className="filter-checkbox"></div>
                                <span className="filter-label">1 Month</span>
                            </label>
                            <label className="filter-option">
                                <input type="checkbox" />
                                <div className="filter-checkbox"></div>
                                <span className="filter-label">6 Month</span>
                            </label>
                            <label className="filter-option">
                                <input type="checkbox" />
                                <div className="filter-checkbox"></div>
                                <span className="filter-label">1 Year</span>
                            </label>
                            <label className="filter-option">
                                <input type="checkbox" />
                                <div className="filter-checkbox"></div>
                                <span className="filter-label">2 Years</span>
                            </label>
                            <label className="filter-option">
                                <input type="checkbox" />
                                <div className="filter-checkbox"></div>
                                <span className="filter-label">3 Years</span>
                            </label>
                        </div>
                    </div>

                    {/* Price Range Filter */}
                    <div className="filter-section">
                        <div className="filter-title">
                            <span>Price Range</span>
                            <span className="filter-toggle">▼</span>
                        </div>
                        <div className="price-range">
                            <div className="range-slider">
                                <div className="range-progress"></div>
                            </div>
                            <div className="price-labels">
                                <span>$10</span>
                                <span>$10000</span>
                            </div>
                        </div>
                    </div>
                </aside>

                {/* Products Section */}
                <div className="products-section">
                    <div className="section-header">
                        <h2>Available Products</h2>
                    </div>

                    <div className="products-grid">
                        {/* Product 1 */}
                        <div className="product-card">
                            <div className="product-image">
                                <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200'%3E%3Crect fill='%23252b4a' width='300' height='200'/%3E%3Ctext x='50%25' y='50%25' font-size='48' fill='%239ca3af' text-anchor='middle' dy='.3em'%3E🛋️%3C/text%3E%3C/svg%3E" alt="Sofa" />
                            </div>
                            <div className="product-info">
                                <div className="product-name">Modern Sofa</div>
                                <div className="product-price">
                                    <span className="price-label">Rxx / per Month</span>
                                </div>
                                <div className="product-actions">
                                    <button className="btn btn-primary" onClick={() => navigate('/product/1')}>Rent Now</button>
                                    <button className="btn btn-secondary" onClick={() => navigate('/product/1')}>Details</button>
                                </div>
                            </div>
                        </div>

                         {/* Product 2 */}
                         <div className="product-card">
                            <div className="product-image">
                                <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200'%3E%3Crect fill='%23252b4a' width='300' height='200'/%3E%3Ctext x='50%25' y='50%25' font-size='48' fill='%239ca3af' text-anchor='middle' dy='.3em'%3E📺%3C/text%3E%3C/svg%3E" alt="TV" />
                            </div>
                            <div className="product-info">
                                <div className="product-name">Smart TV 55"</div>
                                <div className="product-price">
                                    <span className="price-label">Rxx / per Month</span>
                                </div>
                                <div className="product-actions">
                                    <button className="btn btn-primary" onClick={() => navigate('/product/2')}>Rent Now</button>
                                    <button className="btn btn-secondary" onClick={() => navigate('/product/2')}>Details</button>
                                </div>
                            </div>
                        </div>

                         {/* Product 3 */}
                         <div className="product-card">
                            <div className="product-image">
                                <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200'%3E%3Crect fill='%23252b4a' width='300' height='200'/%3E%3Ctext x='50%25' y='50%25' font-size='48' fill='%239ca3af' text-anchor='middle' dy='.3em'%3E💻%3C/text%3E%3C/svg%3E" alt="Laptop" />
                            </div>
                            <div className="product-info">
                                <div className="product-name">Gaming Laptop</div>
                                <div className="product-price">
                                    <span className="price-label">Rxx / per Month</span>
                                </div>
                                <div className="product-actions">
                                    <button className="btn btn-primary" onClick={() => navigate('/product/3')}>Rent Now</button>
                                    <button className="btn btn-secondary" onClick={() => navigate('/product/3')}>Details</button>
                                </div>
                            </div>
                        </div>

                         {/* Product 4 - Out of Stock */}
                         <div className="product-card">
                            <div className="product-image">
                                <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200'%3E%3Crect fill='%23252b4a' width='300' height='200'/%3E%3Ctext x='50%25' y='50%25' font-size='48' fill='%239ca3af' text-anchor='middle' dy='.3em'%3E📷%3C/text%3E%3C/svg%3E" alt="Camera" />
                                <div className="out-of-stock-overlay">
                                    OUT OF STOCK
                                </div>
                            </div>
                            <div className="product-info">
                                <div className="product-name">DSLR Camera</div>
                                <div className="product-price">
                                    <span className="price-label">Rxx / per Month</span>
                                </div>
                                <div className="product-actions">
                                    <button className="btn btn-primary" disabled style={{opacity: 0.5, cursor: 'not-allowed'}}>Rent Now</button>
                                    <button className="btn btn-secondary">Details</button>
                                </div>
                            </div>
                        </div>

                        {/* Product 5 */}
                        <div className="product-card">
                            <div className="product-image">
                                <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200'%3E%3Crect fill='%23252b4a' width='300' height='200'/%3E%3Ctext x='50%25' y='50%25' font-size='48' fill='%239ca3af' text-anchor='middle' dy='.3em'%3E🎮%3C/text%3E%3C/svg%3E" alt="Console" />
                            </div>
                            <div className="product-info">
                                <div className="product-name">Game Console</div>
                                <div className="product-price">
                                    <span className="price-label">Rxx / per Month</span>
                                </div>
                                <div className="product-actions">
                                    <button className="btn btn-primary">Rent Now</button>
                                    <button className="btn btn-secondary">Details</button>
                                </div>
                            </div>
                        </div>

                         {/* Product 6 */}
                         <div className="product-card">
                            <div className="product-image">
                                <img src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='200'%3E%3Crect fill='%23252b4a' width='300' height='200'/%3E%3Ctext x='50%25' y='50%25' font-size='48' fill='%239ca3af' text-anchor='middle' dy='.3em'%3E🔊%3C/text%3E%3C/svg%3E" alt="Speaker" />
                            </div>
                            <div className="product-info">
                                <div className="product-name">Sound System</div>
                                <div className="product-price">
                                    <span className="price-label">Rxx / per Month</span>
                                </div>
                                <div className="product-actions">
                                    <button className="btn btn-primary">Rent Now</button>
                                    <button className="btn btn-secondary">Details</button>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Pagination */}
                    <div className="pagination">
                        <button className="page-btn" disabled>&lt;</button>
                        <button className="page-btn active">1</button>
                        <button className="page-btn">2</button>
                        <button className="page-btn">3</button>
                        <button className="page-btn">...</button>
                        <button className="page-btn">12</button>
                        <button className="page-btn">&gt;</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
