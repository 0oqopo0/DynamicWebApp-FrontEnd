
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useParams, useNavigate } from "react-router-dom";
import { confirmAlert } from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import UserService from "../service/UserService";

function UpdateUser() {
const navigate = useNavigate();
const { userId } = useParams();

const [userData, setUserData] = useState({
name: "",
email: "",
role: "",
city: "",
});

useEffect(() => {
fetchUserDataById(userId); // Pass the userId to fetchUserDataById
}, [userId]); // Whenever there is a change in userId, run this

const fetchUserDataById = async (userId) => {
try {
const token = localStorage.getItem("token");
const response = await UserService.getUserById(userId, token); // Pass userId to getUserById
const { name, email, role, city } = response.ourUsers;
setUserData({ name, email, role, city });
} catch (error) {
console.error("Error fetching user data:", error);
}
};

const handleInputChange = (e) => {
const { name, value } = e.target;
setUserData((prevUserData) => ({
...prevUserData,
[name]: value,
}));
};

const handleSubmit = async (e) => {
e.preventDefault();
confirmAlert({
customUI: ({ onClose }) => {
return (
<motion.div
className="custom-ui bg-sky-400/40 p-4 rounded shadow-md"
initial={{ opacity: 0, scale: 0.9 }}
animate={{ opacity: 1, scale: 1 }}
transition={{ duration: 0.3 }}
>
<h1 className="text-xl font-bold mb-4">Confirm Update</h1>
<p className="mb-4">Are you sure you want to update this user?</p>
<div className="flex justify-end space-x-4">
<button
className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition duration-300"
onClick={onClose}
>
No
</button>
<button
className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
onClick={async () => {
try {
const token = localStorage.getItem("token");
const res = await UserService.updateUser(userId, userData, token);
console.log(res);
navigate("/admin/user-management");
onClose();
} catch (error) {
console.error("Error updating user profile:", error);
alert(error);
}
}}
>
Yes, Update
</button>
</div>
</motion.div>
);
}
});
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
Update User
</motion.h2>
<motion.form onSubmit={handleSubmit} variants={itemVariants}>
<motion.div className="mb-4" variants={itemVariants}>
<label className="block text-gray-700">Name:</label>
<input
type="text"
name="name"
value={userData.name}
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
value={userData.email}
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
value={userData.role}
onChange={handleInputChange}
required
className="w-full px-3 py-2 border rounded"
/>
</motion.div>
<motion.div className="mb-4" variants={itemVariants}>
<label className="block text-gray-700">City:</label>
<input
type="text"
name="city"
value={userData.city}
onChange={handleInputChange}
required
className="w-full px-3 py-2 border rounded"
/>
</motion.div>
<motion.button
type="submit"
className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300"
variants={itemVariants}
>
Update
</motion.button>
</motion.form>
</motion.div>
</motion.div>
);
}

export default UpdateUser;
