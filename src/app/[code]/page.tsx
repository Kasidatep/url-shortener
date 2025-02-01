"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { LockClosedIcon, ExclamationCircleIcon, InformationCircleIcon, FaceFrownIcon, ClockIcon } from "@heroicons/react/24/solid";
import Footer from '@/components/Footer';

export default function Page({ params }: { params: { code: string } }) {
    const [password, setPassword] = useState("");
    const [isNotFound, setIsNotFound] = useState(false);
    const [isExpired, setIsExpired] = useState(false);

    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPasswordInput, setShowPasswordInput] = useState(false);
    const [passwordHint, setPasswordHint] = useState("");
    const router = useRouter();
    const { code } = params;

    useEffect(() => {
        // First call: Check if password is required
        checkPasswordRequirement();
    }, []);

    const checkPasswordRequirement = async () => {
        setLoading(true);
        setError("");

        try {
            const res = await fetch(`/api/shorten?code=${code}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await res.json();

            if (res.ok) {
                router.push(data.redirect);
            } else if ( res.status === 401 || res.status === 403) {
                setShowPasswordInput(true);
                setPasswordHint(data.hint || ""); 
            } else if (res.status === 400) {
                setIsExpired(true);
            }  else if (res.status === 404) {
                setIsNotFound(true);
            } else {
                setError(data.message || "An error occurred. Please try again.");
            }
        } catch (err) {
            setError("Failed to connect to the server. Please check your connection.");
        } finally {
            setLoading(false);
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        try {
            const res = await fetch(`/api/shorten?code=${code}&password=${password}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            const data = await res.json();

            if (res.ok) {
                router.push(data.redirect);
            } else {
                setError(data.message || "Incorrect password. Please try again.");
            }
        } catch (err) {
            setError("Failed to connect to the server. Please check your connection.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-gradient-to-br from-blue-50 to-indigo-100">
            <div className="w-full max-w-md">
                {/* Error Message */}
                {error && (
                    <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center space-x-2">
                        <ExclamationCircleIcon className="h-5 w-5 text-red-500" />
                        <span className="text-red-600 text-sm">{error}</span>
                    </div>
                )}

                 {/* 404 Not Found UI */}
                 {isNotFound && (
                    <div className="p-8 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 text-center">
                        <div className="flex flex-col items-center space-y-4">
                            <FaceFrownIcon className="h-16 w-16 text-gray-400" />
                            <h1 className="text-xl font-semibold text-gray-900">404 - Not Found</h1>
                            <p className="text-gray-600">The URL you are looking for does not exist or may have expired.</p>
                            <button
                                onClick={() => router.push("/")}
                                className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all"
                            >
                                Go Home
                            </button>
                        </div>
                    </div>
                )}

                  {/* 410 Expired UI */}
                  {isExpired && (
                    <div className="p-8 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 text-center">
                        <div className="flex flex-col items-center space-y-4">
                            <ClockIcon className="h-16 w-16 text-gray-400" />
                            <h1 className="text-xl font-semibold text-gray-900">410 - Expired</h1>
                            <p className="text-gray-600">The URL you are trying to access has expired.</p>
                            <button
                                onClick={() => router.push("/")}
                                className="mt-4 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all"
                            >
                                Go Home
                            </button>
                        </div>
                    </div>
                )}

                {/* Password Form */}
                {showPasswordInput && (
                    <>
                    <div className="p-8 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-white/20">
                        <div className="text-center mb-6">
                            <div className="mx-auto h-12 w-12 bg-indigo-50 rounded-full flex items-center justify-center">
                                <LockClosedIcon className="h-6 w-6 text-indigo-600" />
                            </div>
                            <h1 className="mt-4 text-xl font-semibold text-gray-900">
                                Password Required
                            </h1>
                            <p className="mt-2 text-sm text-gray-600">
                                This URL is protected. Please enter the password to continue.
                            </p>
                            {passwordHint && (
                                <div className="mt-2 p-2 bg-blue-50 rounded-lg flex items-center space-x-2">
                                    <InformationCircleIcon className="h-5 w-5 text-blue-500" />
                                    <span className="text-blue-600 text-sm">{passwordHint}</span>
                                </div>
                            )}
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label htmlFor="password" className="sr-only">
                                    Password
                                </label>
                                <input
                                    type="password"
                                    id="password"
                                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
                                    placeholder="Enter password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    disabled={loading}
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all flex items-center justify-center"
                                disabled={loading}
                            >
                                {loading ? (
                                    <>
                                        <svg
                                            className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            ></circle>
                                            <path
                                                className="opacity-75"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                                            ></path>
                                        </svg>
                                        Verifying...
                                    </>
                                ) : (
                                    "Submit"
                                )}
                            </button>
                        </form>
                    </div>
                    <Footer />
                    </>

                )}

                {/* Loading State */}
                {loading && !showPasswordInput && (
                    <div className="p-8 bg-white/90 backdrop-blur-sm rounded-xl shadow-lg border border-white/20 text-center">
                        <svg
                            className="animate-spin mx-auto h-8 w-8 text-indigo-600"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            ></circle>
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                        </svg>
                        <p className="mt-4 text-sm text-gray-600">Checking URL...</p>
                    </div>
                )}

            </div>
        </div>
    );
}