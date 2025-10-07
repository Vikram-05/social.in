import React from 'react'
import { useNavigate } from 'react-router-dom'

function Login() {
    const navigate = useNavigate();
    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-[var(--bg-color)]">
            <div className="w-full h-screen sm:h-auto sm:max-w-md  sm:rounded-xl shadow-2xl p-6 sm:p-8 flex flex-col items-center justify-center sm:my-8">
                {/* Header */}
                <div className="text-center mb-8">

                    <h1 className="text-3xl font-bold text-[var(--text-color)] mb-2">Welcome back</h1>
                    <p className="text-[var(--semi-text-light-color)]">Sign in to your account to continue</p>
                </div>

                {/* Form */}
                <form className="w-full flex flex-col gap-5">
                    <div>
                        <label htmlFor="username" className="block text-sm font-medium text-[var(--semi-text-color)] mb-2">
                            Username or Email
                        </label>
                        <input
                            id="username"
                            type="text"
                            placeholder="Enter your username or email"
                            className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        />
                    </div>

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-[var(--semi-text-color)] mb-2">
                            Password
                        </label>
                        <input
                            id="password"
                            type="password"
                            placeholder="Enter your password"
                            className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                        />
                    </div>

                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center">
                        </label>
                        <a href="#" className="text-blue-400 hover:text-blue-300 transition-colors">
                            Forgot password?
                        </a>
                    </div>

                    <button
                        type="submit"
                        className="w-full bg-[var(--button-color)] text-[var(--text-color)] font-semibold py-3 rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 mt-2"
                    >
                        Sign In
                    </button>
                </form>

                {/* Divider */}
                <div className="mt-8 flex items-center w-full">
                    <div className="flex-grow h-px bg-gray-700"></div>
                    <span className="mx-4 text-gray-500 text-sm font-medium">Or continue with</span>
                    <div className="flex-grow h-px bg-gray-700"></div>
                </div>

                {/* Social Login */}
                <button className="mt-6 flex items-center justify-center gap-3 w-full border border-gray-600 bg-gray-700 rounded-lg py-3 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-200">
                    <img
                        src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
                        alt="Google"
                        className="w-5 h-5"
                    />
                    <span className="text-gray-200 font-medium">Continue with Google</span>
                </button>

                {/* Sign up link */}
                <div className="mt-8 text-center">
                    <p className="text-gray-400">
                        Don't have an account?{' '}
                        <a
                            onClick={() => navigate("/signup")}
                            href="#" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
                            Sign up
                        </a>
                    </p>
                </div>

                {/* Footer */}
                <p className="mt-8 text-right w-full text-gray-500 text-xs">
                    @vikram-05
                </p>
            </div>
        </div>
    )
}

export default Login