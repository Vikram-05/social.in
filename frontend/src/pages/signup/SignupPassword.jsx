import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSignup } from "../../context/SignupProvider";

function SignupPassword() {
    const navigate = useNavigate();
    const [password, setPassword] = React.useState("");
    const { signupData, setSignupData } = useSignup();

    return (
        <div className="min-h-screen w-full flex items-center justify-center bg-[var(--bg-color)] md:py-8">
            <div className="w-full h-screen max-w-md  md:rounded-xl shadow-2xl md:mx-4 sm:mx-auto my-auto p-6 sm:p-8 flex flex-col">
                {/* Header */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-[var(--text-color)] mb-2">Create account</h1>
                    <p className="text-[var(--text-color)]">Sign up to get started with social.in</p>
                </div>

                {/* Form */}
                <form className="w-full flex flex-col gap-5">

                    <div>
                        <label htmlFor="password" className="block text-sm font-medium text-[var(--semi-text-color)] mb-2">
                            Password
                        </label>
                        <input
                            autoFocus
                            id="password"
                            type="password"
                            required
                            placeholder="Enter your password"
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 rounded-lg border border-gray-600 bg-[var(--semi-text-light-color)] text-[var(--text-color)] placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                            autoComplete='new-password'
                        />
                    </div>


                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            setSignupData({ ...signupData, password });
                            navigate('/signup/username');
                        }}
                        type="submit"
                        className="w-full bg-[var(--button-color)] text-white font-semibold py-3 rounded-lg shadow-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-gray-800 transition-all duration-200 mt-2"
                    >
                        Next
                    </button>
                </form>

                {/* Divider */}
                <div className="mt-8 flex items-center w-full">
                    <div className="flex-grow h-px bg-gray-700"></div>
                    <span className="mx-4 text-gray-500 text-sm font-medium">Or continue with</span>
                    <div className="flex-grow h-px bg-gray-700"></div>
                </div>

                {/* Social Login */}
                <button className="mt-6 flex items-center justify-center gap-3 w-full border border-gray-600 bg-[var(--semi-text-light-color)] rounded-lg py-3 hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-200">
                    <img
                        src="https://cdn.jsdelivr.net/gh/devicons/devicon/icons/google/google-original.svg"
                        alt="Google"
                        className="w-5 h-5"
                    />
                    <span className="text-[var(--text-color)] font-medium">Continue with Google</span>
                </button>

                {/* Login link */}
                <div className="mt-8 text-center">
                    <p
                        onClick={() => navigate("/login")}
                        className="text-gray-400">
                        Already have an account?{' '}
                        <a href="#" className="text-blue-400 hover:text-blue-300 font-medium transition-colors">
                            Sign in
                        </a>
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SignupPassword