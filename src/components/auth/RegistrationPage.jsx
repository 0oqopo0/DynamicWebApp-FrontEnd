
import React, { useState } from "react";
import { motion } from "framer-motion";
import UserService from "../service/UserService";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function RegistrationPage() {
const navigate = useNavigate();

const [formData, setFormData] = useState({
name: "",
email: "",
password: "",
role: "",
city: "",
});

const handleInputChange = (e) => {
const { name, value } = e.target;
setFormData({ ...formData, [name]: value });
};

const handleSubmit = async (e) => {
e.preventDefault();
try {
const token = localStorage.getItem("token");
await UserService.register(formData, token);

setFormData({
name: "",
email: "",
password: "",
role: "",
city: "",
});

toast.success("User registered successfully", {
position: "top-center",
autoClose: 3000,
hideProgressBar: true,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
transition: motion.div,
});

navigate("/user-management");
} catch (error) {
console.error("Error registering user:", error);
toast.error("An error occurred while registering user", {
position: "top-center",
autoClose: 3000,
hideProgressBar: true,
closeOnClick: true,
pauseOnHover: true,
draggable: true,
progress: undefined,
transition: motion.div,
});
}
};

const containerVariants = {
hidden: { opacity: 0, y: 50 },
visible: { opacity: 1, y: 0, transition: { duration: 1 } },
};

const itemVariants = {
hidden: { opacity: 0, x: -50 },
visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
};

return (
<motion.div
className="flex items-center justify-center min-h-screen"
initial="hidden"
animate="visible"
variants={containerVariants}
>
<ToastContainer />
<motion.div
className="bg-green-400 bg-opacity-30 backdrop-filter backdrop-blur-lg p-8 rounded shadow-md w-full max-w-md"
initial="hidden"
animate="visible"
variants={containerVariants}
>
<motion.h2
className="text-2xl font-bold mb-6 text-center"
variants={itemVariants}
>
Registration
</motion.h2>
<motion.form onSubmit={handleSubmit} variants={itemVariants}>
<motion.div className="mb-4" variants={itemVariants}>
<label className="block text-gray-700">Name:</label>
<input
type="text"
name="name"
value={formData.name}
onChange={handleInputChange}
required
className="w-full px-3 py-2 border rounded"
/>
</motion.div>
<motion.div className="mb-4" variants={itemVariants}>
<label className="block text-gray-700">Email:</label>
<input
type="email"
name="email"
value={formData.email}
onChange={handleInputChange}
required
className="w-full px-3 py-2 border rounded"
/>
</motion.div>
<motion.div className="mb-4" variants={itemVariants}>
<label className="block text-gray-700">Password:</label>
<input
type="password"
name="password"
value={formData.password}
onChange={handleInputChange}
required
className="w-full px-3 py-2 border rounded"
/>
</motion.div>
<motion.div className="mb-4" variants={itemVariants}>
<label className="block text-gray-700">Role:</label>
<input
type="text"
name="role"
value={formData.role}
onChange={handleInputChange}
placeholder="Enter your role"
required
className="w-full px-3 py-2 border rounded"
/>
</motion.div>
<motion.div className="mb-4" variants={itemVariants}>
<label className="block text-gray-700">City:</label>
<input
type="text"
name="city"
value={formData.city}
onChange={handleInputChange}
placeholder="Enter your city"
required
className="w-full px-3 py-2 border rounded"
/>
</motion.div>
<motion.button
type="submit"
className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
variants={itemVariants}
>
Register
</motion.button>
</motion.form>
</motion.div>
</motion.div>
);
}

export default RegistrationPage;

