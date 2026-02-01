import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './VendorReports.css';

const VendorReports = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isDropdownOpen, setIsDropdownOpen] = React.useState(false);

    const handleLogout = () => {
        logout();
        navigate('/', { replace: true });
    };

    return (
        <div className="vendor-reports-page">
            {/* Top Navigation */}
            <nav className="top-nav">
                <div className="nav-container">
                    <div className="nav-left">
                        <Link to="/dashboard" className="logo" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <h1>RentFlow</h1>
                        </Link>
                        <div className="nav-tabs">
                            <Link to="/dashboard" className="nav-tab" style={{ textDecoration: 'none' }}>Dashboard</Link>
                            <Link to="/vendor/orders" className="nav-tab" style={{ textDecoration: 'none' }}>Orders</Link>
                            <Link to="/vendor/products" className="nav-tab" style={{ textDecoration: 'none' }}>Products</Link>
                            <Link to="/vendor/reports" className="nav-tab active" style={{ textDecoration: 'none' }}>Reports</Link>
                            <Link to="/vendor/settings" className="nav-tab" style={{ textDecoration: 'none' }}>Settings</Link>
                        </div>
                    </div>

                    <div className="nav-right">
                        <div className="user-menu" onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                            <div className="user-avatar">{user?.name ? user.name.substring(0, 2).toUpperCase() : 'VR'}</div>
                            <div>
                                <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{user?.name || 'TechRentals'}</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Vendor</div>
                            </div>
                            {isDropdownOpen && (
                                <div className="user-dropdown-menu">
                                    <Link to="/vendor/settings" className="dropdown-item">
                                        <span>⚙️</span> Settings
                                    </Link>
                                    <button onClick={handleLogout} className="dropdown-item">
                                        <span>🚪</span> Logout
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </nav>

            <main className="vendor-main-content">
                <div className="vendor-header">
                    <div className="vendor-header-left">
                        <h2 className="page-title">Reports & Analytics</h2>
                        <p className="vendor-header-subtitle">Insights into your rental business</p>
                    </div>
                    <div className="vendor-header-right">
                        <button className="btn-secondary">Export Data</button>
                    </div>
                </div>

                {/* Charts Section Placeholder */}
                <div className="reports-grid">
                    <div className="report-card">
                        <h3>Revenue Overview</h3>
                        <div className="chart-placeholder">
                            <div className="bar" style={{ height: '40%' }}></div>
                            <div className="bar" style={{ height: '60%' }}></div>
                            <div className="bar" style={{ height: '30%' }}></div>
                            <div className="bar" style={{ height: '80%' }}></div>
                            <div className="bar" style={{ height: '50%' }}></div>
                            <div className="bar" style={{ height: '75%' }}></div>
                            <div className="bar" style={{ height: '90%' }}></div>
                        </div>
                        <p className="chart-note">Monthly Revenue (Last 6 Months)</p>
                    </div>

                    <div className="report-card">
                        <h3>Top Renting Products</h3>
                        <ul className="top-products-list">
                            <li>
                                <span>Sony A7S III</span>
                                <span className="highlight">15 rentals</span>
                            </li>
                            <li>
                                <span>Aputure 600D</span>
                                <span className="highlight">12 rentals</span>
                            </li>
                            <li>
                                <span>DJI Ronin 4D</span>
                                <span className="highlight">8 rentals</span>
                            </li>
                            <li>
                                <span>Sennheiser MKH 416</span>
                                <span className="highlight">5 rentals</span>
                            </li>
                        </ul>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default VendorReports;
