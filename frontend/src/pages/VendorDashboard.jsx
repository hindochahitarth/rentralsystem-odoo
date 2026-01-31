import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './VendorDashboard.css';

const VendorDashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [searchQuery, setSearchQuery] = useState('');

    const handleLogout = () => {
        logout();
        navigate('/', { replace: true });
    };

    const products = [
        { id: 1, name: 'Sony A7S III', category: 'Camera', dailyRate: 150, weeklyRate: 900, stock: 5, status: 'available' },
        { id: 2, name: 'Aputure 600D Pro', category: 'Lighting', dailyRate: 120, weeklyRate: 700, stock: 2, status: 'low' },
        { id: 3, name: 'Sennheiser MKH 416', category: 'Audio', dailyRate: 45, weeklyRate: 250, stock: 8, status: 'available' },
        { id: 4, name: 'DJI Ronin 4D', category: 'Stabilizer', dailyRate: 250, weeklyRate: 1500, stock: 0, status: 'out' },
    ];

    const orders = [
        { id: 'ORD-2847', customer: 'John Smith', product: 'Sony A7S III', period: 'Jan 28 - Feb 4, 2026', amount: 1050, status: 'active' },
        { id: 'ORD-2846', customer: 'Sarah Johnson', product: 'Aputure 600D Pro', period: 'Jan 25 - Feb 1, 2026', amount: 840, status: 'active' },
        { id: 'ORD-2845', customer: 'Mike Davis', product: 'Sennheiser MKH 416', period: 'Jan 24 - Jan 31, 2026', amount: 315, status: 'pending' },
        { id: 'ORD-2844', customer: 'Emily Chen', product: 'DJI Ronin 4D', period: 'Jan 15 - Jan 22, 2026', amount: 1750, status: 'completed' },
    ];

    const getStockClass = (status) => {
        if (status === 'available') return 'vendor-stock-available';
        if (status === 'low') return 'vendor-stock-low';
        return 'vendor-stock-out';
    };

    const getStockLabel = (status) => {
        if (status === 'available') return 'Available';
        if (status === 'low') return 'Low Stock';
        return 'Out of Stock';
    };

    const getOrderStatusClass = (status) => {
        if (status === 'active') return 'vendor-status-active';
        if (status === 'pending') return 'vendor-status-pending';
        return 'vendor-status-completed';
    };

    const getOrderStatusLabel = (status) => {
        if (status === 'active') return 'Active';
        if (status === 'pending') return 'Pending Pickup';
        return 'Completed';
    };

    return (
        <div className="vendor-dashboard-page">
            {/* Top Navigation */}
            <nav className="top-nav">
                <div className="nav-container">
                    <div className="nav-left">
                        <Link to="/dashboard" className="logo" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <h1>RentFlow</h1>
                        </Link>
                        <div className="nav-tabs">
                            <Link to="/dashboard" className="nav-tab active" style={{ textDecoration: 'none' }}>Dashboard</Link>
                            <Link to="/orders" className="nav-tab" style={{ textDecoration: 'none' }}>Orders</Link>
                            <button className="nav-tab">Products</button>
                            <button className="nav-tab">Reports</button>
                            <button className="nav-tab">Settings</button>
                        </div>
                    </div>

                    <div className="nav-right">
                        <div className="user-menu" onClick={handleLogout}>
                            <div className="user-avatar">{user?.name ? user.name.substring(0, 2).toUpperCase() : 'VR'}</div>
                            <div>
                                <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{user?.name || 'TechRentals'}</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Logout</div>
                            </div>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="vendor-main-content">
                <div className="vendor-header">
                    <div className="vendor-header-left">
                        <h2 className="page-title">Vendor Dashboard</h2>
                        <p className="vendor-header-subtitle">Manage your rental inventory and orders</p>
                    </div>
                    <div className="vendor-header-right">
                        <button className="btn-new">➕ Add New Product</button>
                    </div>
                </div>

                <div className="vendor-revenue-section">
                    <div className="vendor-revenue-card">
                        <div className="vendor-revenue-label">Total Revenue This Month</div>
                        <div className="vendor-revenue-value">$15,847</div>
                        <div className="vendor-revenue-change">↑ 23% from last month</div>
                    </div>

                    <div className="vendor-stats-mini">
                        <div className="vendor-mini-stat">
                            <div className="vendor-mini-stat-label">Active Rentals</div>
                            <div className="vendor-mini-stat-value">12</div>
                        </div>
                        <div className="vendor-mini-stat">
                            <div className="vendor-mini-stat-label">Products Listed</div>
                            <div className="vendor-mini-stat-value">45</div>
                        </div>
                        <div className="vendor-mini-stat">
                            <div className="vendor-mini-stat-label">Pending Pickups</div>
                            <div className="vendor-mini-stat-value">3</div>
                        </div>
                    </div>
                </div>

                <div className="vendor-products-section">
                    <div className="vendor-section-header">
                        <h3 className="vendor-section-title">Your Products</h3>
                        <div className="vendor-search-box">
                            <input
                                type="text"
                                className="vendor-search-input"
                                placeholder="Search products..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>
                    </div>

                    <table className="vendor-products-table">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Category</th>
                                <th>Daily Rate</th>
                                <th>Weekly Rate</th>
                                <th>Stock</th>
                                <th>Status</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {products.map((p) => (
                                <tr key={p.id}>
                                    <td>
                                        <div className="vendor-product-name">{p.name}</div>
                                        <div className="vendor-product-category">{p.category}</div>
                                    </td>
                                    <td>{p.category}</td>
                                    <td className="vendor-price">${p.dailyRate}</td>
                                    <td className="vendor-price">${p.weeklyRate}</td>
                                    <td>{p.stock} units</td>
                                    <td>
                                        <span className={`vendor-stock-badge ${getStockClass(p.status)}`}>
                                            {getStockLabel(p.status)}
                                        </span>
                                    </td>
                                    <td>
                                        <div className="vendor-action-buttons">
                                            <button className="vendor-icon-btn" title="Edit">✏️</button>
                                            <button className="vendor-icon-btn" title="View">👁️</button>
                                            <button className="vendor-icon-btn" title="Delete">🗑️</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>

                <div className="vendor-orders-section">
                    <h3 className="vendor-section-title">Recent Orders</h3>
                    {orders.map((order) => (
                        <div key={order.id} className="vendor-order-item">
                            <div className="vendor-order-id">#{order.id}</div>
                            <div className="vendor-order-details">
                                <h4>{order.customer}</h4>
                                <p className="vendor-order-meta">{order.product} • {order.period}</p>
                            </div>
                            <div className="vendor-order-amount">${order.amount.toLocaleString()}</div>
                            <span className={`vendor-order-status ${getOrderStatusClass(order.status)}`}>
                                {getOrderStatusLabel(order.status)}
                            </span>
                        </div>
                    ))}
                </div>
            </main>
        </div>
    );
};

export default VendorDashboard;
