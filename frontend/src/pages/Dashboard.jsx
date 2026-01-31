import React from 'react';
import { useAuth } from '../context/AuthContext';
import { LogOut, User, Building, Shield, Tag } from 'lucide-react';

const Dashboard = () => {
    const { user, logout } = useAuth();

    return (
        <div className="flex-1">
            <nav className="bg-white shadow">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-16">
                        <div className="flex items-center">
                            <h1 className="text-xl font-bold text-gray-900">Rental System</h1>
                        </div>
                        <div className="flex items-center">
                            <span className="mr-4 text-sm text-gray-600">Welcome, {user?.name}</span>
                            <button
                                onClick={logout}
                                className="flex items-center text-sm font-medium text-red-600 hover:text-red-500"
                            >
                                <LogOut className="w-4 h-4 mr-1" />
                                Sign out
                            </button>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto py-10 sm:px-6 lg:px-8">
                <div className="px-4 py-6 sm:px-0">
                    <div className="bg-white overflow-hidden shadow rounded-lg divide-y divide-gray-200">
                        <div className="px-4 py-5 sm:px-6">
                            <h3 className="text-lg leading-6 font-medium text-gray-900">User Profile</h3>
                        </div>
                        <div className="px-4 py-5 sm:p-6 space-y-6">
                            <div className="flex items-start">
                                <div className="flex-shrink-0">
                                    <User className="h-6 w-6 text-gray-400" />
                                </div>
                                <div className="ml-3">
                                    <dt className="text-sm font-medium text-gray-500">Full name</dt>
                                    <dd className="text-sm text-gray-900">{user?.name}</dd>
                                </div>
                            </div>
                            <div className="flex items-start">
                                <div className="flex-shrink-0">
                                    <Shield className="h-6 w-6 text-gray-400" />
                                </div>
                                <div className="ml-3">
                                    <dt className="text-sm font-medium text-gray-500">Role</dt>
                                    <dd className="text-sm text-gray-900">{user?.role}</dd>
                                </div>
                            </div>
                            {user?.companyName && (
                                <div className="flex items-start">
                                    <div className="flex-shrink-0">
                                        <Building className="h-6 w-6 text-gray-400" />
                                    </div>
                                    <div className="ml-3">
                                        <dt className="text-sm font-medium text-gray-500">Company</dt>
                                        <dd className="text-sm text-gray-900">{user?.companyName} (GSTIN: {user?.gstin})</dd>
                                    </div>
                                </div>
                            )}
                            {user?.vendorCategory && (
                                <div className="flex items-start">
                                    <div className="flex-shrink-0">
                                        <Tag className="h-6 w-6 text-gray-400" />
                                    </div>
                                    <div className="ml-3">
                                        <dt className="text-sm font-medium text-gray-500">Category</dt>
                                        <dd className="text-sm text-gray-900">{user?.vendorCategory}</dd>
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
