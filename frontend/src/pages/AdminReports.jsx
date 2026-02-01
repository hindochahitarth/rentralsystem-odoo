import React from 'react';
import { Link } from 'react-router-dom';
import './AdminStyles.css';

const AdminReports = () => {
    return (
        <div className="admin-dashboard-page">
            <nav className="top-nav">
                <div className="nav-container">
                    <div className="nav-left">
                        <Link to="/admin/dashboard" className="logo" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <h1>RentFlow <span style={{ fontSize: '0.8rem', opacity: 0.7 }}>ADMIN</span></h1>
                        </Link>
                        <div className="nav-tabs">
                            <Link to="/admin/dashboard" className="nav-tab">Dashboard</Link>
                            <Link to="/admin/users" className="nav-tab">Users</Link>
                            <Link to="/admin/products" className="nav-tab">Products</Link>
                            <Link to="/admin/orders" className="nav-tab">Orders</Link>
                            <Link to="/admin/reports" className="nav-tab active">Reports</Link>
                            <Link to="/admin/settings" className="nav-tab">Settings</Link>
                        </div>
                    </div>
                </div>
            </nav>
            <main className="admin-main" style={{ padding: '2rem' }}>
                <h2>Admin Reports</h2>
                <p>Coming Soon...</p>
            </main>
        </div>
    );
};

export default AdminReports;
