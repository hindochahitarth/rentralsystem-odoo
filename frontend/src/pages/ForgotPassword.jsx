import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Input from '../components/Input';
import axios from 'axios';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const response = await axios.post('http://localhost:5000/api/auth/forgot-password', { email });
            setMessage(response.data.message);
        } catch (error) {
            setMessage('An error occurred. Please try again.');
        }
        setLoading(false);
    };

    return (
        <div className="flex-1 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-xl shadow-lg">
                <div>
                    <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Reset your password</h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        Enter your email and we'll send you a link to reset your password.
                    </p>
                </div>

                {message ? (
                    <div className="text-center">
                        <div className="p-4 bg-green-100 text-green-700 rounded-md mb-6 whitespace-pre-wrap">
                            {message}
                        </div>
                        <Link to="/login" className="text-blue-600 hover:text-blue-500 font-medium">
                            Back to login
                        </Link>
                    </div>
                ) : (
                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <Input
                            label="Email address"
                            id="email"
                            name="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />

                        <div>
                            <button
                                type="submit"
                                disabled={loading}
                                className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:bg-blue-400 Transition-ALL"
                            >
                                {loading ? 'Sending...' : 'Send reset link'}
                            </button>
                        </div>
                        <div className="text-center">
                            <Link to="/login" className="text-sm text-blue-600 hover:text-blue-500 font-medium">
                                Back to login
                            </Link>
                        </div>
                    </form>
                )}
            </div>
        </div>
    );
};

export default ForgotPassword;
