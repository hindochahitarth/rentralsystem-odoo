import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { SearchProvider } from './context/SearchContext';
import { WishlistProvider } from './context/WishlistContext';
import Index from './pages/Index';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Dashboard from './pages/Dashboard';
import VendorDashboard from './pages/VendorDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Cart from './pages/Cart';
import ProductDetail from './pages/ProductDetail';
import Address from './pages/Address';
import Payment from './pages/Payment';
import OrderSuccess from './pages/OrderSuccess';
import Terms from './pages/Terms';
import About from './pages/About';
import Contact from './pages/Contact';
import VendorOrders from './pages/VendorOrders';

const ProtectedRoute = ({ children }) => {
    const { user, loading } = useAuth();

    if (loading) return <div className="min-h-screen flex items-center justify-center bg-gray-50">Loading...</div>;
    if (!user) return <Navigate to="/" replace />;

    return children;
};

const DashboardRouter = () => {
    const { user } = useAuth();
    if (user?.role === 'ADMIN') return <AdminDashboard />;
    if (user?.role === 'VENDOR') return <VendorDashboard />;
    return <Dashboard />;
};

function App() {
    return (
        <AuthProvider>
            <CartProvider>
                <SearchProvider>
                    <WishlistProvider>
                        <div className="w-full min-h-screen bg-gray-50 flex flex-col">
                            <Routes>
                                <Route path="/" element={<Login />} />
                                <Route path="/login" element={<Login />} />
                                <Route path="/signup" element={<Signup />} />
                                <Route path="/forgot-password" element={<ForgotPassword />} />
                                <Route path="/reset-password" element={<ResetPassword />} />
                                <Route
                                    path="/cart"
                                    element={
                                        <ProtectedRoute>
                                            <Cart />
                                        </ProtectedRoute>
                                    }
                                />
                                <Route
                                    path="/address"
                                    element={
                                        <ProtectedRoute>
                                            <Address />
                                        </ProtectedRoute>
                                    }
                                />
                                <Route
                                    path="/payment"
                                    element={
                                        <ProtectedRoute>
                                            <Payment />
                                        </ProtectedRoute>
                                    }
                                />
                                <Route
                                    path="/order-success"
                                    element={
                                        <ProtectedRoute>
                                            <OrderSuccess />
                                        </ProtectedRoute>
                                    }
                                />
                                <Route
                                    path="/terms"
                                    element={
                                        <ProtectedRoute>
                                            <Terms />
                                        </ProtectedRoute>
                                    }
                                />
                                <Route
                                    path="/about"
                                    element={
                                        <ProtectedRoute>
                                            <About />
                                        </ProtectedRoute>
                                    }
                                />
                                <Route
                                    path="/contact"
                                    element={
                                        <ProtectedRoute>
                                            <Contact />
                                        </ProtectedRoute>
                                    }
                                />
                                <Route
                                    path="/product/:id"
                                    element={
                                        <ProtectedRoute>
                                            <ProductDetail />
                                        </ProtectedRoute>
                                    }
                                />
                                <Route
                                    path="/dashboard"
                                    element={
                                        <ProtectedRoute>
                                            <DashboardRouter />
                                        </ProtectedRoute>
                                    }
                                />
                                <Route
                                    path="/orders"
                                    element={
                                        <ProtectedRoute>
                                            <VendorOrders />
                                        </ProtectedRoute>
                                    }
                                />
                                <Route path="*" element={<Navigate to="/" replace />} />
                            </Routes>
                        </div>
                    </WishlistProvider>
                </SearchProvider>
            </CartProvider>
        </AuthProvider>
    );
}

export default App;
