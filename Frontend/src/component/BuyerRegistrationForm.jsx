import React, { useState } from "react";

export default function BuyerRegistration() {
    const [formData, setFormData] = useState({
        name: "",
        company: "",
        businessType: "",
        registrationNumber: "",
        email: "",
        phone: "",
        address: "",
        country: "",
        password: "",
        walletAddress: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        alert("Registration Successful!");
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100 flex flex-col items-center justify-center p-6">
            {/* Title */}
            <h1 className="text-4xl md:text-5xl font-extrabold text-emerald-700 mb-10 text-center">
                Buyer Registration
            </h1>

            {/* Form */}
            <form
                onSubmit={handleSubmit}
                className="w-full max-w-3xl bg-white/70 backdrop-blur-md p-8 rounded-3xl shadow-lg border border-emerald-200 animate-fade-in"
            >
                {/* Row 1 */}
                <div className="flex flex-col md:flex-row md:justify-between md:gap-6 mb-6">
                    <InputField
                        label="Name *"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                    />
                    <InputField
                        label="Company Name *"
                        name="company"
                        value={formData.company}
                        onChange={handleChange}
                    />
                </div>

                {/* Row 2 (Zigzag left-right) */}
                <div className="flex flex-col md:flex-row-reverse md:justify-between md:gap-6 mb-6">
                    <InputField
                        label="Business Type *"
                        name="businessType"
                        value={formData.businessType}
                        onChange={handleChange}
                    />
                    <InputField
                        label="Registration Number *"
                        name="registrationNumber"
                        value={formData.registrationNumber}
                        onChange={handleChange}
                    />
                </div>

                {/* Row 3 */}
                <div className="flex flex-col md:flex-row md:justify-between md:gap-6 mb-6">
                    <InputField
                        label="Email *"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <InputField
                        label="Phone *"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                    />
                </div>

                {/* Row 4 (Zigzag reverse) */}
                <div className="flex flex-col md:flex-row-reverse md:justify-between md:gap-6 mb-6">
                    <InputField
                        label="Address *"
                        name="address"
                        value={formData.address}
                        onChange={handleChange}
                    />
                    <InputField
                        label="Country"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                    />
                </div>

                {/* Row 5 */}
                <div className="flex flex-col md:flex-row md:justify-between md:gap-6 mb-6">
                    <InputField
                        label="Password *"
                        name="password"
                        type="password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <InputField
                        label="Wallet Address"
                        name="walletAddress"
                        value={formData.walletAddress}
                        onChange={handleChange}
                    />
                </div>

                {/* Button */}
                <div className="text-center mt-8">
                    <button
                        type="submit"
                        className="bg-emerald-600 hover:bg-emerald-700 text-white px-10 py-3 rounded-xl font-semibold text-lg shadow-md hover:shadow-emerald-300/40 transform hover:scale-105 transition-all duration-300"
                    >
                        Register
                    </button>
                </div>
            </form>

            {/* Footer */}
            <footer className="mt-10 text-gray-600 text-sm text-center">
                © {new Date().getFullYear()} Carbon Credit Exchange. All rights reserved.
            </footer>
        </div>
    );
}

/* 🧩 Reusable input component */
function InputField({ label, name, type = "text", value, onChange }) {
    return (
        <div className="flex-1 mb-4">
            <label className="block text-emerald-800 font-semibold mb-2">
                {label}
            </label>
            <input
                type={type}
                name={name}
                value={value}
                onChange={onChange}
                className="w-full px-4 py-2 border-2 border-emerald-300 rounded-xl focus:outline-none focus:border-emerald-600 bg-white/60 transition-all"
                placeholder={`Enter your ${label.toLowerCase().replace("*", "")}`}
                required={label.includes("*")}
            />
        </div>
    );
}