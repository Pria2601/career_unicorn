import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
const SignUp = () => {
const navigate=useNavigate();
    const [formData, setFormData] = useState({
        month: "",
        day: "",
        year: "",
        username: "",
        password: "",
        gender: "",
        contact: "",
        qualification: "",
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Combine the birthday fields into one object
        const birthday = {
            month: formData.month,
            day: formData.day,
            year: formData.year,
        };

        try {
            const response = await axios.post('http://localhost:5000/signup', {
                username: formData.username,
                password: formData.password,
                birthday,
                gender: formData.gender,
                contact: formData.contact,
                qualification: formData.qualification,
            });

            // Handle success
            console.log('User registered:', response.data);
            // alert('Signup successful!');
            navigate("/personalizeform")

            if (response.status === 201) {
                const id = response.data.user;
                localStorage.setItem("userId", id);
            }

        } catch (error) {
            // Handle errors
            console.error('Error during signup:', error.response?.data || error.message);
            alert('Signup failed. Please try again.');
        }
    };


    const months = [
        "January", "February", "March", "April", "May", "June",
        "July", "August", "September", "October", "November", "December"
    ];

    // Generate days dynamically
    const days = Array.from({ length: 31 }, (_, i) => i + 1);

    // Generate years dynamically (e.g., 100 years back)
    const currentYear = new Date().getFullYear();
    const years = Array.from({ length: 100 }, (_, i) => currentYear - i);

    return (
        <div
            className="min-h-screen flex items-center justify-center relative"
            style={{
                backgroundImage:
                    "url('https://images.rbxcdn.com/782b7fc18a24ee997efd9a7f02fa4bf9-bg_08072019.jpg')",
                backgroundSize: "cover",
                backgroundPosition: "center",
            }}
        >
            <Link
                to="/signin"
                className="text-black text-sm absolute right-10 z-10 top-8 bg-white px-5 py-2 rounded-[10px]"
            >
                LogIn
            </Link>

            {/* Overlay to reduce opacity */}
            <div className="absolute inset-0 bg-black opacity-50"></div>

            {/* Signup Form */}
            <form
                onSubmit={handleSubmit}
                className="relative bg-gray-800 bg-opacity-90 p-8 rounded-lg shadow-lg w-[480px]"
            >
                <h1 className="text-white text-2xl font-bold text-center mb-6">
                    SIGN UP AND START HAVING FUN!
                </h1>

                {/* Birthday */}
                <div className="mb-4">
                    <label className="block text-white mb-1">Birthday</label>
                    <div className="flex space-x-2">
                        <select
                            name="month"
                            value={formData.month}
                            onChange={handleChange}
                            className="flex-1 p-3 rounded-md border border-gray-600 bg-gray-700 text-white"
                        >
                            <option value="">Month</option>
                            {months.map((month, index) => (
                                <option key={index} value={month}>
                                    {month}
                                </option>
                            ))}
                        </select>
                        <select
                            name="day"
                            value={formData.day}
                            onChange={handleChange}
                            className="flex-1 p-3 rounded-md border border-gray-600 bg-gray-700 text-white"
                        >
                            <option value="">Day</option>
                            {days.map((day) => (
                                <option key={day} value={day}>
                                    {day}
                                </option>
                            ))}
                        </select>
                        <select
                            name="year"
                            value={formData.year}
                            onChange={handleChange}
                            className="flex-1 p-3 rounded-md border border-gray-600 bg-gray-700 text-white"
                        >
                            <option value="">Year</option>
                            {years.map((year) => (
                                <option key={year} value={year}>
                                    {year}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {/* Other fields */}
                {/* Username */}
                <div className="mb-4">
                    <label className="block text-white mb-1">Username</label>
                    <input
                        type="text"
                        name="username"
                        value={formData.username}
                        onChange={handleChange}
                        placeholder="Username"
                        className="w-full p-3 rounded-md border border-gray-600 bg-gray-700 text-white"
                    />
                </div>

                {/* Password */}
                <div className="mb-4">
                    <label className="block text-white mb-1">Password</label>
                    <input
                        type="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="At least 8 characters"
                        className="w-full p-3 rounded-md border border-gray-600 bg-gray-700 text-white"
                    />
                </div>

                {/* Contact */}
                <div className="mb-4">
                    <label className="block text-white mb-1">Contact</label>
                    <input
                        type="text"
                        name="contact"
                        value={formData.contact}
                        onChange={handleChange}
                        placeholder="Enter your contact number"
                        className="w-full p-3 rounded-md border border-gray-600 bg-gray-700 text-white"
                    />
                </div>

                {/* Education Qualification */}
                <div className="mb-4">
                    <label className="block text-white mb-1">Education Qualification</label>
                    <select
                        name="qualification"
                        value={formData.qualification}
                        onChange={handleChange}
                        className="w-full p-3 rounded-md border border-gray-600 bg-gray-700 text-white"
                    >
                        <option value="">Select your qualification</option>
                        <option value="High School">High School</option>
                        <option value="Diploma">Diploma</option>
                        <option value="Undergraduate">Undergraduate</option>
                        <option value="Postgraduate">Postgraduate</option>
                        <option value="Doctorate">Doctorate</option>
                    </select>
                </div>

                {/* Gender */}
                <div className="mb-4">
                    <label className="block text-white mb-1">Gender (optional)</label>
                    <div className="flex justify-between">
                        <button
                            type="button"
                            onClick={() => setFormData({ ...formData, gender: "Female" })}
                            className={`flex-1 p-3 mx-1 rounded-md border ${formData.gender === "Female"
                                ? "bg-blue-600 text-white"
                                : "bg-gray-700 text-gray-300"
                                }`}
                        >
                            Female
                        </button>
                        <button
                            type="button"
                            onClick={() => setFormData({ ...formData, gender: "Male" })}
                            className={`flex-1 p-3 mx-1 rounded-md border ${formData.gender === "Male"
                                ? "bg-blue-600 text-white"
                                : "bg-gray-700 text-gray-300"
                                }`}
                        >
                            Male
                        </button>
                    </div>
                </div>

                {/* Submit */}
                <button
                    type="submit"
                    className="w-full p-3 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                >
                    Sign Up
                </button>
            </form>
        </div>
    );
};

export default SignUp;
