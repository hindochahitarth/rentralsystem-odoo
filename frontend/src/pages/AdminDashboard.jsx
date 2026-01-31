import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './AdminDashboard.css';

const AdminDashboard = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [chartFilter, setChartFilter] = useState('30D');

    const handleLogout = () => {
        logout();
        navigate('/', { replace: true });
    };

    const topVendors = [
        { rank: 1, name: 'TechRent Pro', products: 45, rentals: 87, revenue: 28450 },
        { rank: 2, name: 'Camera Works', products: 32, rentals: 64, revenue: 21340 },
        { rank: 3, name: 'Audio Solutions', products: 28, rentals: 52, revenue: 18920 },
        { rank: 4, name: 'Lighting Masters', products: 38, rentals: 48, revenue: 16780 },
        { rank: 5, name: 'ProGear Rentals', products: 25, rentals: 41, revenue: 14560 },
    ];

    const activities = [
        { icon: '👤', title: 'New vendor registered', meta: 'FilmGear Studio joined the platform', time: '5 min ago' },
        { icon: '📦', title: 'New product listed', meta: 'Canon EOS R5 added by TechRent Pro', time: '12 min ago' },
        { icon: '💰', title: 'Large order completed', meta: '$2,450 rental order #ORD-5847', time: '23 min ago' },
        { icon: '⚠️', title: 'Late return reported', meta: 'Order #ORD-5823 overdue by 2 days', time: '1 hour ago' },
        { icon: '✅', title: 'Vendor verification completed', meta: 'Audio Masters verified successfully', time: '2 hours ago' },
        { icon: '👥', title: 'Multiple new customers', meta: '15 new customers registered today', time: '3 hours ago' },
    ];

    return (
        <div className="admin-dashboard-page">
            <div className="admin-dashboard-layout">
                <aside className="admin-sidebar">
                    <div className="admin-logo">
                        <h1>RentFlow</h1>
                        <div className="admin-badge">ADMIN</div>
                    </div>

                    <nav>
                        <div className="admin-nav-section">
                            <div className="admin-nav-title">Overview</div>
                            <Link to="/dashboard" className="admin-nav-item active">
                                <span>📊</span>
                                <span>Dashboard</span>
                            </Link>
                            <Link to="/dashboard" className="admin-nav-item">
                                <span>📈</span>
                                <span>Analytics</span>
                            </Link>
                            <Link to="/dashboard" className="admin-nav-item">
                                <span>📋</span>
                                <span>Reports</span>
                            </Link>
                        </div>

                        <div className="admin-nav-section">
                            <div className="admin-nav-title">Management</div>
                            <Link to="/dashboard" className="admin-nav-item">
                                <span>👥</span>
                                <span>Users</span>
                            </Link>
                            <Link to="/dashboard" className="admin-nav-item">
                                <span>🏪</span>
                                <span>Vendors</span>
                            </Link>
                            <Link to="/dashboard" className="admin-nav-item">
                                <span>📦</span>
                                <span>Products</span>
                            </Link>
                            <Link to="/dashboard" className="admin-nav-item">
                                <span>🛒</span>
                                <span>Orders</span>
                            </Link>
                        </div>

                        <div className="admin-nav-section">
                            <div className="admin-nav-title">System</div>
                            <Link to="/dashboard" className="admin-nav-item">
                                <span>⚙️</span>
                                <span>Settings</span>
                            </Link>
                            <Link to="/dashboard" className="admin-nav-item">
                                <span>🔧</span>
                                <span>Configuration</span>
                            </Link>
                            <Link to="/dashboard" className="admin-nav-item">
                                <span>🔒</span>
                                <span>Security</span>
                            </Link>
                        </div>

                        <div className="admin-nav-section">
                            <button type="button" onClick={handleLogout} className="admin-nav-item">
                                <span>🚪</span>
                                <span>Logout</span>
                            </button>
                        </div>
                    </nav>
                </aside>

                <main className="admin-main">
                    <div className="admin-header">
                        <h2>Admin Dashboard</h2>
                        <p className="admin-header-subtitle">System overview and platform analytics</p>
                    </div>

                    <div className="admin-metrics-grid">
                        <div className="admin-metric-card">
                            <div className="admin-metric-header">
                                <div>
                                    <div className="admin-metric-label">Total Revenue</div>
                                    <div className="admin-metric-value">$124.5k</div>
                                    <div className="admin-metric-change admin-change-positive">↑ 18.2% vs last month</div>
                                </div>
                                <div className="admin-metric-icon">💰</div>
                            </div>
                        </div>

                        <div className="admin-metric-card">
                            <div className="admin-metric-header">
                                <div>
                                    <div className="admin-metric-label">Active Rentals</div>
                                    <div className="admin-metric-value">387</div>
                                    <div className="admin-metric-change admin-change-positive">↑ 12.5% vs last month</div>
                                </div>
                                <div className="admin-metric-icon">📦</div>
                            </div>
                        </div>

                        <div className="admin-metric-card">
                            <div className="admin-metric-header">
                                <div>
                                    <div className="admin-metric-label">Total Users</div>
                                    <div className="admin-metric-value">2,847</div>
                                    <div className="admin-metric-change admin-change-positive">↑ 234 new this month</div>
                                </div>
                                <div className="admin-metric-icon">👥</div>
                            </div>
                        </div>

                        <div className="admin-metric-card">
                            <div className="admin-metric-header">
                                <div>
                                    <div className="admin-metric-label">Platform Fee</div>
                                    <div className="admin-metric-value">$8.7k</div>
                                    <div className="admin-metric-change admin-change-positive">↑ 15.3% vs last month</div>
                                </div>
                                <div className="admin-metric-icon">💳</div>
                            </div>
                        </div>
                    </div>

                    <div className="admin-system-stats">
                        <div className="admin-stat-box">
                            <div className="admin-stat-box-value">156</div>
                            <div className="admin-stat-box-label">Active Vendors</div>
                        </div>
                        <div className="admin-stat-box">
                            <div className="admin-stat-box-value">1,847</div>
                            <div className="admin-stat-box-label">Total Products</div>
                        </div>
                        <div className="admin-stat-box">
                            <div className="admin-stat-box-value">98.5%</div>
                            <div className="admin-stat-box-label">Platform Uptime</div>
                        </div>
                    </div>

                    <div className="admin-chart-section">
                        <div className="admin-chart-card">
                            <div className="admin-chart-header">
                                <h3 className="admin-chart-title">Revenue Overview</h3>
                                <div className="admin-chart-filters">
                                    {['7D', '30D', '90D', '1Y'].map((f) => (
                                        <button
                                            key={f}
                                            type="button"
                                            className={`admin-filter-btn ${chartFilter === f ? 'active' : ''}`}
                                            onClick={() => setChartFilter(f)}
                                        >
                                            {f}
                                        </button>
                                    ))}
                                </div>
                            </div>
                            <div className="admin-chart-placeholder">📊 Revenue Chart (Would use Chart.js or similar)</div>
                        </div>

                        <div className="admin-chart-card">
                            <div className="admin-chart-header">
                                <h3 className="admin-chart-title">Category Distribution</h3>
                            </div>
                            <div className="admin-chart-placeholder">🥧 Pie Chart</div>
                        </div>
                    </div>

                    <div className="admin-top-vendors">
                        <h3 className="admin-chart-title" style={{ marginBottom: '1.5rem' }}>Top Performing Vendors</h3>

                        {topVendors.map((v) => (
                            <div key={v.rank} className="admin-vendor-item">
                                <div className="admin-vendor-rank">{v.rank}</div>
                                <div className="admin-vendor-info">
                                    <div className="admin-vendor-name">{v.name}</div>
                                    <div className="admin-vendor-stats">{v.products} products • {v.rentals} active rentals</div>
                                </div>
                                <div className="admin-vendor-revenue">${v.revenue.toLocaleString()}</div>
                            </div>
                        ))}
                    </div>

                    <div className="admin-activity-section">
                        <h3 className="admin-chart-title" style={{ marginBottom: '1.5rem' }}>Recent Platform Activity</h3>

                        {activities.map((a, i) => (
                            <div key={i} className="admin-activity-item">
                                <div className="admin-activity-icon">{a.icon}</div>
                                <div className="admin-activity-content">
                                    <div className="admin-activity-title">{a.title}</div>
                                    <div className="admin-activity-meta">{a.meta}</div>
                                </div>
                                <div className="admin-activity-time">{a.time}</div>
                            </div>
                        ))}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;
