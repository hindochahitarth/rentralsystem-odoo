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
            <div className="vendor-dashboard-layout">
                <aside className="vendor-sidebar">
                    <div className="vendor-logo">
                        <h1>RentFlow</h1>
                        <div className="vendor-badge">VENDOR</div>
                    </div>

                    <nav>
                        <div className="vendor-nav-section">
                            <div className="vendor-nav-title">Main</div>
                            <Link to="/dashboard" className="vendor-nav-item active">
                                <span>📊</span>
                                <span>Dashboard</span>
                            </Link>
                            <Link to="/dashboard" className="vendor-nav-item">
                                <span>📦</span>
                                <span>Products</span>
                            </Link>
                            <Link to="/dashboard" className="vendor-nav-item">
                                <span>🛒</span>
                                <span>Orders</span>
                            </Link>
                            <Link to="/dashboard" className="vendor-nav-item">
                                <span>💰</span>
                                <span>Earnings</span>
                            </Link>
                        </div>

                        <div className="vendor-nav-section">
                            <div className="vendor-nav-title">Management</div>
                            <Link to="/dashboard" className="vendor-nav-item">
                                <span>📋</span>
                                <span>Inventory</span>
                            </Link>
                            <Link to="/dashboard" className="vendor-nav-item">
                                <span>📈</span>
                                <span>Analytics</span>
                            </Link>
                            <Link to="/dashboard" className="vendor-nav-item">
                                <span>⚙️</span>
                                <span>Settings</span>
                            </Link>
                        </div>

                        <div className="vendor-nav-section">
                            <button type="button" onClick={handleLogout} className="vendor-nav-item">
                                <span>🚪</span>
                                <span>Logout</span>
                            </button>
                        </div>
                    </nav>
                </aside>

                <main className="vendor-main">
                    <div className="vendor-header">
                        <div className="vendor-header-left">
                            <h2>Vendor Dashboard</h2>
                            <p className="vendor-header-subtitle">Manage your rental inventory and orders</p>
                        </div>
                        <div className="vendor-header-right">
                            <Link to="/dashboard" className="vendor-btn vendor-btn-primary">
                                <span>➕</span>
                                Add New Product
                            </Link>
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
                                        <td>{p.category === 'Camera' ? 'Cameras' : p.category === 'Lighting' ? 'Lighting' : p.category === 'Audio' ? 'Audio' : 'Stabilizers'}</td>
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
                                                <button type="button" className="vendor-icon-btn" title="Edit">✏️</button>
                                                <button type="button" className="vendor-icon-btn" title="View">👁️</button>
                                                <button type="button" className="vendor-icon-btn" title="Delete">🗑️</button>
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
        </div>
    );
};

export default VendorDashboard;
