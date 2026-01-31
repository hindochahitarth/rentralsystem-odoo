import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import Index from './pages/Index';
import Login from './pages/Login';
import Signup from './pages/Signup';
import ForgotPassword from './pages/ForgotPassword';
import ResetPassword from './pages/ResetPassword';
import Dashboard from './pages/Dashboard';
import VendorDashboard from './pages/VendorDashboard';
import AdminDashboard from './pages/AdminDashboard';
import Cart from './pages/Cart';
import Address from './pages/Address';
import Payment from './pages/Payment';
import OrderSuccess from './pages/OrderSuccess';
import ProductDetail from './pages/ProductDetail';

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
                <div className="w-full min-h-screen bg-gray-50 flex flex-col">
                    <Routes>
                        <Route path="/" element={<Index />} />
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
                        <Route path="*" element={<Navigate to="/" replace />} />
                    </Routes>
                </div>
            </CartProvider>
        </AuthProvider>
    );
}

export default App;
