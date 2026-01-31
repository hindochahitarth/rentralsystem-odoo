import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../api/client';
import './VendorOrders.css';

const VendorOrders = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [viewMode, setViewMode] = useState('kanban'); // 'kanban' or 'list'
    const [activeFilter, setActiveFilter] = useState('Total');
    const [checkedItems, setCheckedItems] = useState({});
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/', { replace: true });
    };

    const [isSettingsOpen, setIsSettingsOpen] = useState(false);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);
    const fileInputRef = React.useRef(null);

    React.useEffect(() => {
        const fetchOrders = async () => {
            try {
                const res = await api.get('/orders');
                if (res.data.success) {
                    setOrders(res.data.data);
                }
            } catch (error) {
                console.error("Failed to fetch orders", error);
            } finally {
                setLoading(false);
            }
        };
        fetchOrders();
    }, []);

    const toggleSettings = () => {
        setIsSettingsOpen(!isSettingsOpen);
    };

    const handleExport = async () => {
        setIsSettingsOpen(false);
        try {
            const response = await api.get('/orders/export', { responseType: 'blob' });
            const url = window.URL.createObjectURL(new Blob([response.data]));
            const link = document.createElement('a');
            link.href = url;
            link.setAttribute('download', `orders_export_${Date.now()}.csv`);
            document.body.appendChild(link);
            link.click();
            link.remove();
        } catch (error) {
            console.error('Export failed', error);
            alert("Failed to export. ensure you have orders.");
        }
    };

    const handleImportClick = () => {
        setIsSettingsOpen(false);
        fileInputRef.current.click();
    };

    const handleFileChange = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const formData = new FormData();
        formData.append('file', file);

        try {
            // await api.post('/orders/import', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
            alert(`Selected file: ${file.name}. Import logic to be connected.`);
        } catch (error) {
            alert("Import failed.");
        }
    };

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

    const handleConfirmOrder = async (orderId) => {
        if (!window.confirm("Confirm this order? This will reserve the stock.")) return;
        try {
            const res = await api.post(`/orders/${orderId}/confirm`);
            if (res.data.success) {
                alert("Order confirmed!");
                setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: 'SALES_ORDER' } : o));
            }
        } catch (error) {
            console.error("Confirmation Error", error);
            alert(error.response?.data?.message || "Failed to confirm order.");
        }
    };

    const handlePayOrder = async (orderId) => {
        if (!window.confirm("Proceed to payment for this order?")) return;
        try {
            const res = await api.post(`/orders/${orderId}/pay`);
            if (res.data.success) {
                alert("Payment Successful! Invoice generated.");
                setOrders(prev => prev.map(o => o.id === orderId ? { ...o, status: 'PAID' } : o));
            }
        } catch (error) {
            console.error("Payment Error", error);
            alert(error.response?.data?.message || "Payment failed.");
        }
    };

    const handlePrintInvoice = (orderId) => {
        alert(`Printing Invoice for Order #${orderId}... (Mock Feature)`);
        // window.open(`/api/invoices/${orderId}`, '_blank');
    };

    const isVendor = user?.role === 'VENDOR';

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
                            <Link to="/dashboard" className="nav-tab" style={{ textDecoration: 'none' }}>Dashboard</Link>
                            <Link to="/vendor/orders" className="nav-tab active" style={{ textDecoration: 'none' }}>Orders</Link>
                            <Link to="/vendor/products" className="nav-tab" style={{ textDecoration: 'none' }}>Products</Link>
                            <Link to="/vendor/reports" className="nav-tab" style={{ textDecoration: 'none' }}>Reports</Link>
                            <Link to="/vendor/settings" className="nav-tab" style={{ textDecoration: 'none' }}>Settings</Link>
                        </div>
                    </div>

                    <div className="nav-right">
                        <div className="user-menu" onClick={() => setIsDropdownOpen(!isDropdownOpen)} style={{ cursor: 'pointer', position: 'relative' }}>
                            <div className="user-avatar">{user?.name ? user.name.substring(0, 2).toUpperCase() : 'VR'}</div>
                            <div>
                                <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{user?.name || 'User'}</div>
                                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{isVendor ? 'Vendor' : 'Customer'}</div>
                            </div>

                            {isDropdownOpen && (
                                <div className="user-dropdown-menu">
                                    <Link to="/vendor/profile" className="dropdown-item">
                                        <span>👤</span> Profile
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

            {/* Main Header */}
            <div className="main-header">
                <div className="header-left">
                    <h1 className="page-title">{isVendor ? 'Vendor Orders' : 'My Orders'}</h1>
                    <div style={{ position: 'relative' }}>
                        <button className="settings-btn" onClick={toggleSettings}>⚙️</button>
                        {isSettingsOpen && (
                            <div className="settings-dropdown">
                                <button className="settings-option" onClick={handleExport}><span className="option-icon">↑</span><span>Export Records</span></button>
                                <div style={{ borderBottom: '1px solid rgba(255,255,255,0.1)', margin: '0.2rem 0' }}></div>
                                <button className="settings-option" onClick={handleImportClick}><span className="option-icon">↓</span><span>Import Records</span></button>
                            </div>
                        )}
                        <input type="file" ref={fileInputRef} style={{ display: 'none' }} accept=".csv, .xlsx" onChange={handleFileChange} />
                    </div>
                    <Link to="/vendor/orders/new" className="btn-new" style={{ textDecoration: 'none' }}>New</Link>
                </div>

                <div className="header-actions">
                    <div className="search-box">
                        <input type="text" className="search-input" placeholder="Search orders..." />
                        <button className="search-btn">🔍</button>
                    </div>

                    {isVendor && (
                        <div className="action-btns">
                            <button className="action-btn">Pickup</button>
                            <button className="action-btn">Return</button>
                        </div>
                    )}

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
                            <span className="filter-count">{orders.length}</span>
                        </div>

                        {filters.map((filter) => (
                            <div
                                key={filter.name}
                                className={`filter-item ${filter.name === activeFilter ? 'active' : ''}`}
                                onClick={() => setActiveFilter(filter.name)}
                            >
                                <span>{filter.name}</span>
                                {/* Mock counts would need real logic */}
                            </div>
                        ))}
                    </div>
                </aside>

                {/* Main Content */}
                <div className="main-content">
                    {/* Kanban View */}
                    <div className={`kanban-view ${viewMode === 'kanban' ? 'active' : ''}`}>
                        <div className="kanban-grid">
                            {orders.map((order) => (
                                <div key={order.id} className="kanban-card">
                                    <div className="card-header">
                                        <div>
                                            <div className="card-customer">{order.user?.name || 'Guest'}</div>
                                            <div className="card-order">{order.orderNumber}</div>
                                        </div>
                                    </div>
                                    <div className="card-product">
                                        {order.items?.[0]?.product?.name || 'Item'}
                                        {order.items?.length > 1 && ` (+${order.items.length - 1})`}
                                    </div>
                                    <div className="card-price">R{Number(order.totalAmount).toFixed(2)}</div>
                                    <div className="card-duration">
                                        {order.items?.[0]?.startDate ?
                                            `${new Date(order.items[0].startDate).toLocaleDateString()} - ${new Date(order.items[0].endDate).toLocaleDateString()}`
                                            : 'No dates'}
                                    </div>

                                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem' }}>
                                        <div className={`status-badge status-${order.status.toLowerCase().replace('_', '-')}`}>
                                            {order.status.replace('_', ' ')}
                                        </div>

                                        {/* Vendor Actions */}
                                        {isVendor && order.status === 'QUOTATION' && (
                                            <button className="btn-confirm" onClick={() => handleConfirmOrder(order.id)} style={{ padding: '4px 8px', fontSize: '0.75rem', background: 'var(--success)', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                                                Confirm
                                            </button>
                                        )}

                                        {/* Customer Actions */}
                                        {!isVendor && (order.status === 'SALES_ORDER' || order.status === 'CONFIRMED') && (
                                            <button className="btn-pay" onClick={() => handlePayOrder(order.id)} style={{ padding: '4px 8px', fontSize: '0.75rem', background: 'var(--accent)', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                                                Pay Now
                                            </button>
                                        )}

                                        {/* Invoice Action */}
                                        {order.status === 'PAID' && (
                                            <button className="btn-invoice" onClick={() => handlePrintInvoice(order.id)} style={{ padding: '4px 8px', fontSize: '0.75rem', background: 'var(--surface-light)', color: 'var(--text)', border: '1px solid var(--border)', borderRadius: '4px', cursor: 'pointer' }}>
                                                Invoice 📄
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                            {orders.length === 0 && !loading && <div style={{ color: '#fff' }}>No orders found.</div>}
                        </div>
                    </div>

                    {/* List View */}
                    <div className={`list-view ${viewMode === 'list' ? 'active' : ''}`}>
                        {/* Simplified list view rendering for brevity, matching Kanban logic in columns */}
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
                                        <th>Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {orders.map((order) => (
                                        <tr key={order.id}>
                                            <td className="checkbox-cell">
                                                <div
                                                    className={`custom-checkbox ${checkedItems[order.id] ? 'checked' : ''}`}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        toggleCheckbox(order.id);
                                                    }}
                                                >
                                                    {checkedItems[order.id] && '✓'}
                                                </div>
                                            </td>
                                            <td>{order.orderNumber}</td>
                                            <td>{new Date(order.createdAt).toLocaleDateString()}</td>
                                            <td>{order.user?.name || 'Unknown'}</td>
                                            <td>{order.items?.[0]?.product?.name || 'Multiple Items'} {order.items?.length > 1 ? `+${order.items.length - 1} more` : ''}</td>
                                            <td>R{Number(order.totalAmount).toFixed(2)}</td>
                                            <td>
                                                <span className={`status-badge status-${order.status.toLowerCase().replace('_', '-')}`}>
                                                    {order.status.replace('_', ' ')}
                                                </span>
                                            </td>
                                            <td>
                                                {isVendor && order.status === 'QUOTATION' && (
                                                    <button onClick={() => handleConfirmOrder(order.id)} style={{ fontSize: '0.8rem', cursor: 'pointer' }}>Confirm</button>
                                                )}
                                                {!isVendor && (order.status === 'SALES_ORDER' || order.status === 'CONFIRMED') && (
                                                    <button onClick={() => handlePayOrder(order.id)} style={{ fontSize: '0.8rem', cursor: 'pointer', color: 'var(--accent)' }}>Pay Now</button>
                                                )}
                                                {order.status === 'PAID' && (
                                                    <button onClick={() => handlePrintInvoice(order.id)} style={{ fontSize: '0.8rem', cursor: 'pointer' }}>Invoice</button>
                                                )}
                                            </td>
                                        </tr>
                                    ))}
                                    {orders.length === 0 && !loading && (
                                        <tr><td colSpan="8" style={{ textAlign: 'center', padding: '2rem' }}>No orders found</td></tr>
                                    )}
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
