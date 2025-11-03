import React from "react";
import mangrove from '../assets/mangrove.jpeg'
import { Link } from "react-router-dom";
import AuthPanel from "./AuthPanel";
import CreditsPanel from "./CreditsPanel";


// Reusable Button component (pure JS)
function Button({ children, onClick, className = "", type = "button" }) {
    return (
        <button
            type={type}
            onClick={onClick}
            className={
                "transition duration-300 ease-in-out font-medium rounded-xl shadow-md focus:outline-none focus:ring-2 focus:ring-offset-2 " +
                className
            }
        >
            {children}
        </button>
    );
}

// Main Home Page component
export default function HomePage() {
    return (
        <div
            className="min-h-screen bg-cover bg-center bg-no-repeat flex flex-col items-center justify-center p-6 relative"
            style={{
                backgroundImage: `url(${mangrove})`,
            }}

        >

            
            {/* Overlay for readability */}
            <div className="absolute inset-0 bg-black opacity-40"></div>

            {/* Hero content */}
            <div className="relative text-center max-w-3xl text-white z-10">
                <h1 className="text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
                    Carbon Credit Exchange
                </h1>

                <p className="text-lg md:text-xl mb-8 drop-shadow-md">
                    Empowering sustainability through transparent carbon credit transactions.
                    <br />
                    Join as a <span className="font-semibold">Buyer</span> or{" "}
                    <span className="font-semibold">Seller</span> today.
                </p>

                {/* Buttons */}
                <div className="flex flex-col md:flex-row gap-4 justify-center">
                    <Link
                        className="bg-emerald-700 hover:bg-emerald-800 text-white px-6 py-3 rounded-xl text-lg"
                        to='/seller/login'
                    >
                        Register as Seller
                    </Link>
                    <Link
                        className="bg-emerald-500 hover:bg-emerald-600 text-white px-6 py-3 rounded-xl text-lg"
                        to='/buyer/login'
                    >
                        Register as Buyer
                    </Link>
                </div>
            </div>

			{/* Working model panels */}
			<div className="relative z-10 w-full max-w-5xl">
				<AuthPanel />
				<CreditsPanel />
			</div>


            {/* Footer */}
            <footer className="absolute bottom-6 text-gray-200 text-sm z-10">
                © {new Date().getFullYear()} Carbon Credit Exchange. All rights reserved.
            </footer>
        </div>
    );
}