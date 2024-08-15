
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import UserService from '../service/UserService';
import { Link } from 'react-router-dom';

function ProfilePage() {
const [profileInfo, setProfileInfo] = useState({});

useEffect(() => {
fetchProfileInfo();
}, []);

const fetchProfileInfo = async () => {
try {
const token = localStorage.getItem('token'); // Retrieve the token from localStorage
const response = await UserService.getYourProfile(token);
setProfileInfo(response.ourUsers);
} catch (error) {
console.error('Error fetching profile information:', error);
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
Profile Information
</motion.h2>
<motion.p className="text-yellow-400 mb-4" variants={itemVariants}>
<strong>Name:</strong> {profileInfo.name}
</motion.p>
<motion.p className="text-yellow-400 mb-4" variants={itemVariants}>
<strong>Email:</strong> {profileInfo.email}
</motion.p>
<motion.p className="text-yellow-400 mb-4" variants={itemVariants}>
<strong>City:</strong> {profileInfo.city}
</motion.p>
{profileInfo.role === "ADMIN" && (
<motion.button
className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition duration-300"
variants={itemVariants}
>
<Link to={`/update-user/${profileInfo.id}`}>Update This Profile</Link>
</motion.button>
)}
</motion.div>
</motion.div>
);
}

export default ProfilePage;
