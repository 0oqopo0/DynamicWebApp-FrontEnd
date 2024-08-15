
import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import UserService from "../service/UserService";

function LoginPage() {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [error, setError] = useState("");
const navigate = useNavigate();

const handleSubmit = async (e) => {
e.preventDefault();

try {
const userData = await UserService.login(email, password);
console.log(userData);
if (userData.token) {
localStorage.setItem("token", userData.token);
localStorage.setItem("role", userData.role);
navigate("/");
} else {
setError(userData.message);
}
} catch (error) {
console.log(error);
setError(error.message);
setTimeout(() => {
setError("");
}, 5000);
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
Login
</motion.h2>
{error && (
<motion.p className="text-red-500 mb-4" variants={itemVariants}>
{error}
</motion.p>
)}
<motion.form onSubmit={handleSubmit} variants={itemVariants}>
<motion.div className="mb-4" variants={itemVariants}>
<label className="block text-red-300">Email:</label>
<input
type="email"
value={email}
onChange={(e) => setEmail(e.target.value)}
required
className="w-full px-3 py-2 border rounded"
/>
</motion.div>
<motion.div className="mb-4" variants={itemVariants}>
<label className="block text-red-500">Password:</label>
<input
type="password"
value={password}
onChange={(e) => setPassword(e.target.value)}
required
className="w-full px-3 py-2 border rounded"
/>
</motion.div>
<motion.button
type="submit"
className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
variants={itemVariants}
>
Login
</motion.button>
</motion.form>
</motion.div>
</motion.div>
);
}

export default LoginPage;
