import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './VendorNewOrder.css';

const VendorNewOrder = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [status, setStatus] = useState('Quotation Sent');

    const handleLogout = () => {
        logout();
        navigate('/', { replace: true });
    };

    return (
        <div className="vendor-new-order-page">
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
            <div className="page-header-container">
                <div className="header-top">
                    <div className="header-left-flex">
                        <div className="page-title-italic">Rental order</div>
                        <div className="order-badges">
                            <div className="badge-item badge-gradient">New</div>
                            <div className="badge-item badge-outline">Rental order</div>
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
                        <button className="btn-gradient" onClick={() => navigate('/invoice/INV-2026-001')}>Create Invoice</button>
                    </div>
                </div>

                <div className="status-steps">
                    <button className={`status-step-btn ${status === 'Quotation' ? 'active' : ''}`} onClick={() => setStatus('Quotation')}>Quotation</button>
                    <button className={`status-step-btn ${status === 'Quotation Sent' ? 'active' : ''}`} onClick={() => setStatus('Quotation Sent')}>Quotation Sent</button>
                    <button className={`status-step-btn ${status === 'Sale Order' ? 'active' : ''}`} onClick={() => setStatus('Sale Order')}>Sale Order</button>
                </div>
            </div>

            {/* Main Form Content */}
            <main className="new-order-main">
                <h1 className="order-ref">SO0075</h1>

                <div className="form-row-grid">
                    <div className="input-group-flex">
                        <label className="label-muted">Customer</label>
                        <input type="text" className="input-field-dark" placeholder="Select customer..." />
                    </div>
                    <div className="input-group-flex">
                        <label className="label-muted">Invoice Address</label>
                        <input type="text" className="input-field-dark" placeholder="Invoice address" />
                    </div>
                    <div className="input-group-flex">
                        <label className="label-muted">Delivery Address</label>
                        <input type="text" className="input-field-dark" placeholder="Delivery address" />
                    </div>
                </div>

                <div className="rental-period-grid">
                    <div className="date-input-wrap">
                        <label className="label-muted">Rental Period - Start date</label>
                        <input type="date" className="input-field-dark" />
                    </div>
                    <div className="arrow-divider">→</div>
                    <div className="date-input-wrap">
                        <label className="label-muted">End date</label>
                        <input type="date" className="input-field-dark" />
                    </div>
                </div>

                <div className="input-group-flex" style={{ maxWidth: '350px', marginBottom: '3rem' }}>
                    <label className="label-muted">Order date</label>
                    <input type="date" className="input-field-dark" defaultValue="2026-01-31" />
                </div>

                <div className="order-items-container">
                    <h2 className="items-title">Order Lines</h2>
                    <table className="items-table-dark">
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
                                    <div className="item-name-bold">Computers</div>
                                    <div className="item-period-hint">[2026-02-01 → 2026-02-28]</div>
                                    <div className="item-note-blue">Downpayment: Rs 20,000</div>
                                </td>
                                <td>20</td>
                                <td>Units</td>
                                <td>Rs 20,000</td>
                                <td>—</td>
                                <td>Rs 4,00,000</td>
                            </tr>
                            <tr>
                                <td>
                                    <div className="item-name-bold">Downpayment</div>
                                </td>
                                <td>20</td>
                                <td>Units</td>
                                <td>—</td>
                                <td>—</td>
                                <td>—</td>
                            </tr>
                        </tbody>
                    </table>
                    <div className="add-item-actions">
                        <button className="btn-add-line">Add a Product</button>
                        <button className="btn-add-line">Add a note</button>
                    </div>
                </div>

                <div className="bottom-summary">
                    <div className="terms-box">
                        <label className="label-muted" style={{ display: 'block', marginBottom: '0.5rem' }}>Terms & Conditions:</label>
                        <a href="#" className="terms-link-accent">https://rentflow.com/terms-of-service</a>
                    </div>

                    <div className="totals-group-box">
                        <div className="sum-row">
                            <span>Untaxed Amount:</span>
                            <span>Rs 4,00,000</span>
                        </div>
                        <div className="sum-row grand-total">
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

export default VendorNewOrder;
