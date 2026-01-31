import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Dashboard.css';

const Dashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();

    const displayName = user?.name || 'User';
    const initials = displayName
        .split(/\s+/)
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
    const roleLabel = user?.role ? String(user.role).charAt(0) + String(user.role).slice(1).toLowerCase() : 'Customer';

    const handleLogout = () => {
        logout();
        navigate('/', { replace: true });
    };

    return (
        <div className="dashboard-page">
            <div className="dashboard-layout">
                <aside className="dashboard-sidebar">
                    <div className="dashboard-logo">
                        <h1>RentFlow</h1>
                    </div>

                    <nav>
                        <div className="dashboard-nav-section">
                            <div className="dashboard-nav-title">Main</div>
                            <Link to="/dashboard" className="dashboard-nav-item active">
                                <span className="dashboard-nav-icon">📊</span>
                                <span>Dashboard</span>
                            </Link>
                            <Link to="/dashboard" className="dashboard-nav-item">
                                <span className="dashboard-nav-icon">🔍</span>
                                <span>Browse Products</span>
                            </Link>
                            <Link to="/dashboard" className="dashboard-nav-item">
                                <span className="dashboard-nav-icon">📦</span>
                                <span>My Rentals</span>
                            </Link>
                            <Link to="/dashboard" className="dashboard-nav-item">
                                <span className="dashboard-nav-icon">📋</span>
                                <span>Quotations</span>
                            </Link>
                        </div>

                        <div className="dashboard-nav-section">
                            <div className="dashboard-nav-title">Account</div>
                            <Link to="/dashboard" className="dashboard-nav-item">
                                <span className="dashboard-nav-icon">💳</span>
                                <span>Invoices</span>
                            </Link>
                            <Link to="/dashboard" className="dashboard-nav-item">
                                <span className="dashboard-nav-icon">👤</span>
                                <span>Profile</span>
                            </Link>
                            <Link to="/dashboard" className="dashboard-nav-item">
                                <span className="dashboard-nav-icon">⚙️</span>
                                <span>Settings</span>
                            </Link>
                        </div>

                        <div className="dashboard-nav-section">
                            <button
                                type="button"
                                onClick={handleLogout}
                                className="dashboard-nav-item"
                            >
                                <span className="dashboard-nav-icon">🚪</span>
                                <span>Logout</span>
                            </button>
                        </div>
                    </nav>
                </aside>

                <main className="dashboard-main">
                    <div className="dashboard-header">
                        <div className="dashboard-header-left">
                            <h2>Welcome back, {displayName}!</h2>
                            <p className="dashboard-header-subtitle">Here&apos;s your rental activity overview</p>
                        </div>
                        <div className="dashboard-header-right">
                            <div className="dashboard-notification-btn">
                                <span>🔔</span>
                                <span className="dashboard-notification-badge">3</span>
                            </div>
                            <div className="dashboard-user-menu">
                                <div className="dashboard-user-avatar">{initials}</div>
                                <div>
                                    <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{displayName}</div>
                                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{roleLabel}</div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="dashboard-stats-grid">
                        <div className="dashboard-stat-card">
                            <div className="dashboard-stat-header">
                                <div>
                                    <div className="dashboard-stat-label">Active Rentals</div>
                                    <div className="dashboard-stat-value">3</div>
                                    <div className="dashboard-stat-change">↑ 2 this month</div>
                                </div>
                                <div className="dashboard-stat-icon">📦</div>
                            </div>
                        </div>

                        <div className="dashboard-stat-card">
                            <div className="dashboard-stat-header">
                                <div>
                                    <div className="dashboard-stat-label">Total Spent</div>
                                    <div className="dashboard-stat-value">$2.4k</div>
                                    <div className="dashboard-stat-change">↑ 12% from last month</div>
                                </div>
                                <div className="dashboard-stat-icon">💰</div>
                            </div>
                        </div>

                        <div className="dashboard-stat-card">
                            <div className="dashboard-stat-header">
                                <div>
                                    <div className="dashboard-stat-label">Upcoming Returns</div>
                                    <div className="dashboard-stat-value">2</div>
                                    <div className="dashboard-stat-change">Due in 3 days</div>
                                </div>
                                <div className="dashboard-stat-icon">🔄</div>
                            </div>
                        </div>

                        <div className="dashboard-stat-card">
                            <div className="dashboard-stat-header">
                                <div>
                                    <div className="dashboard-stat-label">Saved Items</div>
                                    <div className="dashboard-stat-value">7</div>
                                    <div className="dashboard-stat-change">View wishlist →</div>
                                </div>
                                <div className="dashboard-stat-icon">❤️</div>
                            </div>
                        </div>
                    </div>

                    <div className="dashboard-quick-actions">
                        <h3 className="dashboard-section-title">Quick Actions</h3>
                        <div className="dashboard-action-grid">
                            <Link to="/dashboard" className="dashboard-action-btn">
                                <div className="dashboard-action-icon">🔍</div>
                                <div className="dashboard-action-label">Browse Equipment</div>
                            </Link>
                            <Link to="/dashboard" className="dashboard-action-btn">
                                <div className="dashboard-action-icon">📋</div>
                                <div className="dashboard-action-label">Create Quotation</div>
                            </Link>
                            <Link to="/dashboard" className="dashboard-action-btn">
                                <div className="dashboard-action-icon">📦</div>
                                <div className="dashboard-action-label">View Rentals</div>
                            </Link>
                            <Link to="/dashboard" className="dashboard-action-btn">
                                <div className="dashboard-action-icon">💳</div>
                                <div className="dashboard-action-label">Pay Invoice</div>
                            </Link>
                        </div>
                    </div>

                    <div className="dashboard-recent-rentals">
                        <h3 className="dashboard-section-title">Recent Rentals</h3>

                        <div className="dashboard-rental-item">
                            <div className="dashboard-rental-icon">📷</div>
                            <div className="dashboard-rental-details">
                                <h4>Sony A7S III Camera</h4>
                                <p className="dashboard-rental-meta">
                                    Rental Period: Jan 28 - Feb 4, 2026 • Daily Rate: $150
                                </p>
                            </div>
                            <span className="dashboard-rental-status dashboard-status-active">Active</span>
                        </div>

                        <div className="dashboard-rental-item">
                            <div className="dashboard-rental-icon">💡</div>
                            <div className="dashboard-rental-details">
                                <h4>Aputure 600D Pro Light</h4>
                                <p className="dashboard-rental-meta">
                                    Rental Period: Jan 25 - Feb 1, 2026 • Daily Rate: $120
                                </p>
                            </div>
                            <span className="dashboard-rental-status dashboard-status-active">Active</span>
                        </div>

                        <div className="dashboard-rental-item">
                            <div className="dashboard-rental-icon">🎤</div>
                            <div className="dashboard-rental-details">
                                <h4>Sennheiser MKH 416</h4>
                                <p className="dashboard-rental-meta">
                                    Rental Period: Jan 20 - Jan 27, 2026 • Daily Rate: $45
                                </p>
                            </div>
                            <span className="dashboard-rental-status dashboard-status-pending">Pending Return</span>
                        </div>

                        <div className="dashboard-rental-item">
                            <div className="dashboard-rental-icon">🎬</div>
                            <div className="dashboard-rental-details">
                                <h4>DJI Ronin 4D</h4>
                                <p className="dashboard-rental-meta">
                                    Rental Period: Jan 10 - Jan 17, 2026 • Daily Rate: $250
                                </p>
                            </div>
                            <span className="dashboard-rental-status dashboard-status-returned">Returned</span>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default Dashboard;
