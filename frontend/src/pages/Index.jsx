import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Logo from '../components/Logo';

const Index = () => {
    const { user, loading } = useAuth();
    const navigate = useNavigate();

    if (loading) return <div className="min-h-screen bg-slate-900 flex items-center justify-center"><div className="text-slate-400">Loading...</div></div>;
    // if (user) {
    //     navigate('/dashboard', { replace: true });
    //     return null;
    // }

    return (
        <div className="w-full min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 flex flex-col">
            <header className="py-6 px-6 sm:px-10 flex justify-between items-center">
                <Logo className="text-white" size="md" showText={true} />
                <div className="flex gap-3">
                    {user ? (
                         <Link
                            to="/dashboard"
                            className="px-4 py-2 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition"
                        >
                            Go to Dashboard
                        </Link>
                    ) : (
                        <>
                            <Link
                                to="/login"
                                className="px-4 py-2 text-sm font-medium text-slate-200 hover:text-white transition"
                            >
                                Sign in
                            </Link>
                            <Link
                                to="/signup"
                                className="px-4 py-2 text-sm font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition"
                            >
                                Sign up
                            </Link>
                        </>
                    )}
                </div>
            </header>

            <main className="flex-1 flex items-center justify-center px-6 sm:px-10">
                <div className="text-center max-w-2xl">
                    <h1 className="text-4xl sm:text-5xl font-bold text-white tracking-tight">
                        Manage rentals, vendors & customers in one place
                    </h1>
                    <p className="mt-4 text-lg text-slate-400">
                        Create your account to get started. Sign in if you already have one.
                    </p>
                    <div className="mt-10 flex flex-col sm:flex-row gap-4 justify-center">
                        {user ? (
                            <Link
                                to="/dashboard"
                                className="inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition shadow-lg"
                            >
                                Go to Dashboard
                            </Link>
                        ) : (
                            <>
                                <Link
                                    to="/signup"
                                    className="inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-lg bg-blue-600 text-white hover:bg-blue-500 transition shadow-lg"
                                >
                                    Create account
                                </Link>
                                <Link
                                    to="/login"
                                    className="inline-flex items-center justify-center px-6 py-3 text-base font-medium rounded-lg border border-slate-500 text-slate-200 hover:bg-slate-700/50 transition"
                                >
                                    Sign in to your account
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </main>

            <footer className="py-4 text-center text-sm text-slate-500">
                RentFlow — Rental management
            </footer>
        </div>
    );
};

export default Index;
