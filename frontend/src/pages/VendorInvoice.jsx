import React, { useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './VendorInvoice.css';

const VendorInvoice = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const { id } = useParams();
    const [status, setStatus] = useState('Posted');

    const handleLogout = () => {
        logout();
        navigate('/', { replace: true });
    };

    return (
        <div className="vendor-invoice-page">
            {/* RentFlow Top Navigation */}
            <nav className="top-nav">
                <div className="nav-container">
                    <div className="nav-left">
                        <Link to="/dashboard" className="logo" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <h1>RentFlow</h1>
                        </Link>
                        <div className="nav-tabs">
                            <Link to="/dashboard" className="nav-tab" style={{ textDecoration: 'none' }}>Dashboard</Link>
                            <Link to="/orders" className="nav-tab active" style={{ textDecoration: 'none' }}>Orders</Link>
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

            {/* Page Header Area */}
            <div className="invoice-header-box">
                <div className="invoice-header-top">
                    <div className="header-left-flex">
                        <div className="page-title-italic">Invoice Page</div>
                        <div className="order-badges">
                            <div className="badge-item badge-gradient">New</div>
                            <div className="toggle-indicators">
                                <div className="toggle-box green">✓</div>
                                <div className="toggle-box red">✕</div>
                            </div>
                        </div>
                    </div>
                    <div className="header-actions-flex">
                        <button className="btn-gradient">Send</button>
                        <button className="btn-outline-header">Confirm</button>
                        <button className="btn-outline-header">Print</button>
                    </div>
                </div>

                <div className="invoice-status-pill">
                    <div className={`status-label ${status === 'Draft' ? 'active' : ''}`}>Draft</div>
                    <div className={`status-label ${status === 'Posted' ? 'active' : ''}`}>Posted</div>
                </div>
            </div>

            {/* Main Content */}
            <main className="invoice-main">
                <h1 className="invoice-ref-number">{id || 'INV/2026/0001'}</h1>

                <div className="invoice-form-grid">
                    <div className="input-group-flex">
                        <label className="label-muted">Customer</label>
                        <input type="text" className="input-field-dark" value="Smith" readOnly />
                    </div>
                    <div className="input-group-flex">
                        <label className="label-muted">Invoice Address</label>
                        <input type="text" className="input-field-dark" value="123 Rental Ave, Tech City" readOnly />
                    </div>
                    <div className="input-group-flex">
                        <label className="label-muted">Delivery Address</label>
                        <input type="text" className="input-field-dark" value="123 Rental Ave, Tech City" readOnly />
                    </div>
                    <div className="input-group-flex">
                        <label className="label-muted">Invoice date</label>
                        <input type="date" className="input-field-dark" defaultValue="2026-01-31" readOnly />
                    </div>
                </div>

                <div className="invoice-rental-period">
                    <label className="label-muted" style={{ display: 'block', marginBottom: '1rem' }}>Rental Period</label>
                    <div className="invoice-date-grid">
                        <input type="text" className="input-field-dark" value="2026-02-01" readOnly />
                        <div className="arrow-divider">→</div>
                        <input type="text" className="input-field-dark" value="2026-02-28" readOnly />
                    </div>
                </div>

                <div className="input-group-flex" style={{ maxWidth: '300px', marginBottom: '3rem' }}>
                    <label className="label-muted">Due Date</label>
                    <input type="text" className="input-field-dark" value="2026-03-15" readOnly />
                </div>

                <div className="invoice-lines-card">
                    <h2 className="items-title">Invoice Lines</h2>
                    <table className="lines-table-dark">
                        <thead>
                            <tr>
                                <th>Product</th>
                                <th>Quantity</th>
                                <th>Unit</th>
                                <th>Unit Price</th>
                                <th>Taxes</th>
                                <th>Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>
                                    <div className="product-info-wrap">
                                        <div className="name">Computers</div>
                                        <div className="period">[2026-02-01 → 2026-02-28]</div>
                                        <div className="note">Downpayment: Rs 20,000</div>
                                    </div>
                                </td>
                                <td>20</td>
                                <td>Units</td>
                                <td>Rs 20,000</td>
                                <td>—</td>
                                <td>Rs 4,00,000</td>
                            </tr>
                            <tr>
                                <td>
                                    <div className="product-info-wrap">
                                        <div className="name">Downpayment</div>
                                    </div>
                                </td>
                                <td>20</td>
                                <td>Units</td>
                                <td>—</td>
                                <td>—</td>
                                <td>—</td>
                            </tr>
                        </tbody>
                    </table>
                </div>

                <div className="invoice-bottom">
                    <div className="terms-box">
                        <label className="label-muted" style={{ display: 'block', marginBottom: '0.5rem' }}>Terms & Conditions:</label>
                        <a href="#" className="terms-link-accent">https://rentflow.com/terms-of-service</a>
                    </div>

                    <div className="invoice-totals-box">
                        <div className="invoice-total-row">
                            <span>Untaxed Amount:</span>
                            <span>Rs 4,00,000</span>
                        </div>
                        <div className="invoice-total-row big">
                            <span>Total:</span>
                            <span>Rs 4,00,000</span>
                        </div>

                        <div className="final-action-btns">
                            <button className="btn-sub-action">Register Sale</button>
                            <button className="btn-sub-action">Discount</button>
                            <button className="btn-sub-action">Add Shipping</button>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default VendorInvoice;
