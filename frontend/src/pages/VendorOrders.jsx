import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './VendorOrders.css';

const VendorOrders = () => {
    const { user } = useAuth();
    const [viewMode, setViewMode] = useState('kanban'); // 'kanban' or 'list'
    const [activeFilter, setActiveFilter] = useState('Total');
    const [checkedItems, setCheckedItems] = useState({});

    const filters = [
        { name: 'Total', count: 7 },
        { name: 'Sale order', count: 2 },
        { name: 'Quotation', count: 1 },
        { name: 'Invoiced', count: 1 },
        { name: 'Confirmed', count: 1 },
        { name: 'Cancelled', count: 2 },
    ];

    const toggleCheckbox = (id) => {
        setCheckedItems(prev => ({
            ...prev,
            [id]: !prev[id]
        }));
    };

    return (
        <div className="vendor-orders-page">
            {/* Top Navigation */}
            <nav className="top-nav">
                <div className="nav-container">
                    <div className="nav-left">
                        <Link to="/dashboard" className="logo" style={{ textDecoration: 'none', color: 'inherit' }}>
                            <h1>RentFlow</h1>
                        </Link>
                        <div className="nav-tabs">
                            <button className="nav-tab active">Orders</button>
                            <button className="nav-tab">Products</button>
                            <button className="nav-tab">Reports</button>
                            <button className="nav-tab">Settings</button>
                        </div>
                    </div>

                    <div className="user-menu">
                        <div className="user-avatar">{user?.name ? user.name.substring(0, 2).toUpperCase() : 'VR'}</div>
                        <div>
                            <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{user?.name || 'TechRentals'}</div>
                            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{user?.role === 'VENDOR' ? 'Vendor' : 'Vendor'}</div>
                        </div>
                    </div>
                </div>
            </nav>

            {/* Main Header */}
            <div className="main-header">
                <div className="header-left">
                    <h1 className="page-title">Vendor Orders</h1>
                    <button className="settings-btn">⚙️</button>
                    <button className="btn-new">New</button>
                </div>

                <div className="header-actions">
                    <div className="search-box">
                        <input type="text" className="search-input" placeholder="Search orders..." />
                        <button className="search-btn">🔍</button>
                    </div>

                    <div className="action-btns">
                        <button className="action-btn">Pickup</button>
                        <button className="action-btn">Return</button>
                    </div>

                    <div className="view-controls">
                        <button 
                            className={`view-btn ${viewMode === 'kanban' ? 'active' : ''}`} 
                            onClick={() => setViewMode('kanban')}
                        >
                            ▦
                        </button>
                        <button 
                            className={`view-btn ${viewMode === 'list' ? 'active' : ''}`} 
                            onClick={() => setViewMode('list')}
                        >
                            ☰
                        </button>
                    </div>
                </div>
            </div>

            {/* Content Wrapper */}
            <div className="content-wrapper">
                {/* Sidebar Filter */}
                <aside className="sidebar">
                    <div className="filter-section">
                        <div className="filter-title">
                            <span>Rental Status</span>
                            <span className="filter-count">7</span>
                        </div>

                        {filters.map((filter) => (
                            <div 
                                key={filter.name}
                                className={`filter-item ${activeFilter === filter.name ? 'active' : ''}`}
                                onClick={() => setActiveFilter(filter.name)}
                            >
                                <span>{filter.name}</span>
                                <span className="filter-item-count">{filter.count}</span>
                            </div>
                        ))}
                    </div>
                </aside>

                {/* Main Content */}
                <div className="main-content">
                    {/* Kanban View */}
                    <div className={`kanban-view ${viewMode === 'kanban' ? 'active' : ''}`}>
                        <div className="kanban-grid">
                            {/* Card 1 */}
                            <div className="kanban-card">
                                <div className="card-header">
                                    <div>
                                        <div className="card-customer">Smith</div>
                                        <div className="card-order">SO0001</div>
                                    </div>
                                </div>
                                <div className="card-product">TV</div>
                                <div className="card-price">$1450</div>
                                <div className="card-duration">Rental Duration</div>
                                <div className="status-badge status-sale-order">Sale order</div>
                            </div>

                            {/* Card 2 */}
                            <div className="kanban-card">
                                <div className="card-header">
                                    <div>
                                        <div className="card-customer">Mark wood</div>
                                        <div className="card-order">SO0010</div>
                                    </div>
                                </div>
                                <div className="card-product">Printer</div>
                                <div className="card-price">$50</div>
                                <div className="card-duration">Rental Duration</div>
                                <div className="status-badge status-confirmed">Confirmed</div>
                                <div style={{ marginTop: '0.5rem', padding: '0.5rem', background: 'rgba(59, 130, 246, 0.1)', borderRadius: '6px', color: '#3b82f6', fontSize: '0.85rem' }}>
                                    Dependable Finch
                                </div>
                            </div>

                            {/* Card 3 */}
                            <div className="kanban-card">
                                <div className="card-header">
                                    <div>
                                        <div className="card-customer">Alex</div>
                                        <div className="card-order">SO0008</div>
                                    </div>
                                </div>
                                <div className="card-product">Car</div>
                                <div className="card-price">$775</div>
                                <div className="card-duration">Rental Duration</div>
                                <div className="status-badge status-invoiced">Invoiced</div>
                            </div>

                            {/* Card 4 */}
                            <div className="kanban-card">
                                <div className="card-header">
                                    <div>
                                        <div className="card-customer">Smith</div>
                                        <div className="card-order">SO0012</div>
                                    </div>
                                </div>
                                <div className="card-product">TV</div>
                                <div className="card-price">$1450</div>
                                <div className="card-duration">Rental Duration</div>
                                <div className="status-badge status-cancelled">Cancelled</div>
                            </div>

                            {/* Card 5 */}
                            <div className="kanban-card">
                                <div className="card-header">
                                    <div>
                                        <div className="card-customer">John</div>
                                        <div className="card-order">SO0005</div>
                                    </div>
                                </div>
                                <div className="card-product">Projecter</div>
                                <div className="card-price">$14.50</div>
                                <div className="card-duration">Rental Duration</div>
                                <div className="status-badge status-quotation">Quotation</div>
                            </div>

                            {/* Card 6 */}
                            <div className="kanban-card">
                                <div className="card-header">
                                    <div>
                                        <div className="card-customer">Mark wood</div>
                                        <div className="card-order">SO0011</div>
                                    </div>
                                </div>
                                <div className="card-product">Printer</div>
                                <div className="card-price">$150</div>
                                <div className="card-duration">Rental Duration</div>
                                <div className="status-badge status-sale-order">Sale order</div>
                            </div>

                            {/* Card 7 */}
                            <div className="kanban-card">
                                <div className="card-header">
                                    <div>
                                        <div className="card-customer">Smith</div>
                                        <div className="card-order">SO0013</div>
                                    </div>
                                </div>
                                <div className="card-product">Games</div>
                                <div className="card-price">$50</div>
                                <div className="card-duration">Rental Duration</div>
                                <div className="status-badge status-cancelled">Cancelled</div>
                            </div>
                        </div>
                    </div>

                    {/* List View */}
                    <div className={`list-view ${viewMode === 'list' ? 'active' : ''}`}>
                        <div className="rental-status-label">Rental Status</div>
                        
                        <div className="list-table">
                            <table>
                                <thead>
                                    <tr>
                                        <th className="checkbox-cell">
                                            <div 
                                                className={`custom-checkbox ${checkedItems['all'] ? 'checked' : ''}`}
                                                onClick={() => toggleCheckbox('all')}
                                            >
                                                {checkedItems['all'] && '✓'}
                                            </div>
                                        </th>
                                        <th>Order Reference</th>
                                        <th>Order Date</th>
                                        <th>Customer Name</th>
                                        <th>Product</th>
                                        <th>Total</th>
                                        <th>Rental Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {[
                                        { id: 'SO0001', date: 'Jan 22', customer: 'Smith', product: 'TV', total: '$1450', status: 'Sale Order', statusClass: 'status-sale-order' },
                                        { id: 'SO0006', date: 'Jan 22', customer: 'John', product: 'Projector', total: '$14.50', status: 'Quotation', statusClass: 'status-quotation' },
                                        { id: 'SO0010', date: 'Jan 22', customer: 'Mark wood', product: 'Printer', total: '$50', status: 'Confirmed', statusClass: 'status-confirmed' },
                                        { id: 'SO0008', date: 'Jan 22', customer: 'Alex', product: 'Car', total: '$775', status: 'Invoiced', statusClass: 'status-invoiced' },
                                        { id: 'SO0011', date: 'Jan 22', customer: 'Mark wood', product: 'Printer', total: '$150', status: 'Saleorder', statusClass: 'status-sale-order' }
                                    ].map((row) => (
                                        <tr key={row.id}>
                                            <td className="checkbox-cell">
                                                <div 
                                                    className={`custom-checkbox ${checkedItems[row.id] ? 'checked' : ''}`}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        toggleCheckbox(row.id);
                                                    }}
                                                >
                                                    {checkedItems[row.id] && '✓'}
                                                </div>
                                            </td>
                                            <td>{row.id}</td>
                                            <td>{row.date}</td>
                                            <td>{row.customer}</td>
                                            <td>{row.product}</td>
                                            <td>{row.total}</td>
                                            <td><span className={`status-badge ${row.statusClass}`}>{row.status}</span></td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default VendorOrders;
