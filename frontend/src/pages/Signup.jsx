import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import Input from '../components/Input';

const Signup = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        companyName: '',
        gstin: '',
        password: '',
        confirmPassword: '',
        role: 'CUSTOMER',
        vendorCategory: '',
    });

    const [errors, setErrors] = useState({});
    const [loading, setLoading] = useState(false);
    const { signup } = useAuth();
    const navigate = useNavigate();

    const validate = () => {
        const newErrors = {};

        if (!formData.name) newErrors.name = 'Name is required';
        if (!formData.email) newErrors.email = 'Email is required';
        else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Enter a valid email address';

        // GSTIN is optional in DB; required only for invoicing later

        const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[@$!%*?&_])[A-Za-z\d@$!%*?&_]{6,12}$/;
        if (!formData.password) newErrors.password = 'Password is required';
        else if (!passwordRegex.test(formData.password)) {
            newErrors.password = 'Password must be 6-12 chars, include uppercase, lowercase, and special character (@, $, &, _)';
        }

        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }

        if (formData.role === 'VENDOR' && !formData.vendorCategory) {
            newErrors.vendorCategory = 'Vendor category is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validate()) return;

        setLoading(true);
        const result = await signup(formData);
        setLoading(false);

        if (result.success) {
            navigate('/login', { state: { message: 'Account created. Please sign in.' } });
        } else {
            setErrors({ server: result.message });
        }
    };

    return (
        <div className="w-full flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
                <div className="text-center">
                    <Link to="/" className="text-sm text-gray-500 hover:text-gray-700">← Back to home</Link>
                </div>
                <div>
                    <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900">Create your account</h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Or{' '}
                        <Link to="/login" className="font-medium text-blue-600 hover:text-blue-500">
                            sign in to your account
                        </Link>
                    </p>
                </div>
                <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
                    {errors.server && (
                        <div className="p-3 bg-red-50 border border-red-200 text-red-700 rounded-md text-sm" role="alert">
                            {errors.server}
                        </div>
                    )}

                    <Input label="Name" id="name" name="name" value={formData.name} onChange={handleChange} error={errors.name} />
                    <Input label="Email address" id="email" name="email" type="email" value={formData.email} onChange={handleChange} error={errors.email} />

                    <div className="grid grid-cols-2 gap-4">
                        <Input label="Company Name" id="companyName" name="companyName" value={formData.companyName} onChange={handleChange} placeholder="Optional" />
                        <Input label="GSTIN (optional)" id="gstin" name="gstin" value={formData.gstin} onChange={handleChange} placeholder="For invoicing" />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">Role</label>
                        <select
                            id="role"
                            name="role"
                            value={formData.role}
                            onChange={handleChange}
                            className="input-select w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none cursor-pointer"
                        >
                            <option value="CUSTOMER">Customer</option>
                            <option value="VENDOR">Vendor</option>
                            <option value="ADMIN">Admin</option>
                        </select>
                    </div>

                    {formData.role === 'VENDOR' && (
                        <div className="mb-4">
                            <label htmlFor="vendorCategory" className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                            <select
                                id="vendorCategory"
                                name="vendorCategory"
                                value={formData.vendorCategory}
                                onChange={handleChange}
                                className="input-select w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none cursor-pointer"
                            >
                                <option value="">Select Category</option>
                                <option value="Electronics">Electronics</option>
                                <option value="Furniture">Furniture</option>
                                <option value="Vehicles">Vehicles</option>
                                <option value="Appliances">Appliances</option>
                            </select>
                            {errors.vendorCategory && <p className="mt-1 text-xs text-red-500">{errors.vendorCategory}</p>}
                        </div>
                    )}

                    <div className="grid grid-cols-2 gap-4">
                        <Input label="Password" id="password" name="password" type="password" value={formData.password} onChange={handleChange} error={errors.password} />
                        <Input label="Confirm Password" id="confirmPassword" name="confirmPassword" type="password" value={formData.confirmPassword} onChange={handleChange} error={errors.confirmPassword} />
                    </div>

                    <div>
                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400 transition-all"
                        >
                            {loading ? 'Creating account...' : 'Sign up'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Signup;
