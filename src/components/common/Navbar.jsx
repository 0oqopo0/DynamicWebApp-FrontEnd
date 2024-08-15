
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import moment from "moment-jalaali";
import UserService from "../service/UserService";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-confirm-alert/src/react-confirm-alert.css"; // استایلهای پیشفرض
import { confirmAlert } from "react-confirm-alert";
import "../../App.css"; // مسیر صحیح فایل CSS

moment.loadPersian({ dialect: 'persian-modern' }); // تنظیم زبان به فارسی

function Navbar() {
const [currentTime, setCurrentTime] = useState(moment().format("HH:mm:ss"));
const [currentDate, setCurrentDate] = useState(moment().format("jYYYY/jM/jD"));
const [isAuthenticated, setIsAuthenticated] = useState(UserService.isAuthenticated());
const [isAdmin, setIsAdmin] = useState(UserService.isAdmin());

useEffect(() => {
const timer = setInterval(() => {
setCurrentTime(moment().format("HH:mm:ss"));
setCurrentDate(moment().format("jYYYY/jM/jD"));
}, 1000);

return () => clearInterval(timer);
}, []);

useEffect(() => {
const checkAuth = () => {
const authStatus = UserService.isAuthenticated();
const adminStatus = UserService.isAdmin();
if (authStatus !== isAuthenticated || adminStatus !== isAdmin) {
setIsAuthenticated(authStatus);
setIsAdmin(adminStatus);
console.log("isAuthenticated: " + authStatus + " isAdmin: " + adminStatus);
}
};

checkAuth();
const interval = setInterval(checkAuth, 1000); // چک کردن وضعیت احراز هویت هر ثانیه

return () => clearInterval(interval); // پاک کردن اینتروال هنگام خروج از کامپوننت
}, [isAuthenticated, isAdmin]);

const handleLogout = () => {
confirmAlert({
customUI: ({ onClose }) => {
return (
<motion.div
className="custom-ui bg-red-400/40 p-4 rounded shadow-md"
initial={{ opacity: 0, scale: 0.9 }}
animate={{ opacity: 1, scale: 1 }}
transition={{ duration: 0.3 }}
>
<h1 className="text-xl font-bold mb-4">تأیید خروج</h1>
<p className="mb-4">
آیا مطمئن هستید که میخواهید از حساب کاربری خود خارج شوید؟
</p>
<div className="flex justify-end space-x-4">
<button
className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition duration-300"
onClick={onClose}
>
خیر
</button>
<button
className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
onClick={() => {
UserService.logout();
toast.success("شما با موفقیت از حساب کاربری خود خارج شدید!");
onClose();
}}
>
بله، خروج
</button>
</div>
</motion.div>
);
},
});
};

const linkVariants = {
hover: {
scale: 1.1,
transition: {
type: "spring",
stiffness: 300,
},
},
};

const charVariants = {
hover: {
scale: 1.5,
rotate: 360,
transition: {
duration: 0.5,
},
},
};

//   ////////////////////////////////
const [profileInfo, setProfileInfo] = useState({});

useEffect(() => {
fetchProfileInfo();
}, []);

const fetchProfileInfo = async () => {
try {
const token = localStorage.getItem("token"); // Retrieve the token from localStorage
const response = await UserService.getYourProfile(token);
setProfileInfo(response.ourUsers);
} catch (error) {
console.error("Error fetching profile information:", error);
}
};
//   ////////////////////////////////
return (
<nav className="bg-gray-800 text-white p-4 shadow-md">
<div className="container mx-auto flex justify-between items-center">
<div className="text-white navbar-item navbar-date text-lg">
امروز {moment().format("dddd")} ({currentDate}) - {currentTime}
</div>
<div className="flex items-center space-x-4">
<ul className="flex space-x-4">
{isAuthenticated && (
<motion.li
className="navbar-item-en text-white text-lg"
initial={{ opacity: 0, x: -50 }}
animate={{ opacity: 1, x: 0 }}
transition={{ duration: 0.5 }}
>
<motion.div variants={linkVariants} whileHover="hover">
<Link to="/" onClick={handleLogout} className="hover:text-yellow-400">
Logout
</Link>
</motion.div>
</motion.li>
)}
{!isAuthenticated && (
<motion.li
className="navbar-item-en text-white text-lg"
initial={{ opacity: 0, x: -50 }}
animate={{ opacity: 1, x: 0 }}
transition={{ duration: 0.5 }}
>
<motion.div variants={linkVariants} whileHover="hover">
<Link to="/" className="hover:text-yellow-400">
Home
</Link>
</motion.div>
</motion.li>
)}
{isAuthenticated && (
<motion.li
className="navbar-item-en text-white text-lg"
initial={{ opacity: 0, x: -50 }}
animate={{ opacity: 1, x: 0 }}
transition={{ duration: 0.5 }}
>
<motion.div variants={linkVariants} whileHover="hover">
<Link to="/profile" className="hover:text-yellow-400">
Profile
</Link>
</motion.div>
</motion.li>
)}
{isAdmin && (
<motion.li
className="navbar-item-en text-white text-lg"
initial={{ opacity: 0, x: -50 }}
animate={{ opacity: 1, x: 0 }}
transition={{ duration: 0.5 }}
>
<motion.div variants={linkVariants} whileHover="hover">
<Link to="/admin/user-management" className="hover:text-yellow-400">
User Management
</Link>
</motion.div>
</motion.li>
)}
</ul>
</div>
<div className="flex space-x-4">
{!isAuthenticated && (
<>
<motion.div variants={linkVariants} whileHover="hover">
<button className="border border-yellow-400 rounded px-4 py-2 hover:bg-yellow-400 hover:text-gray-800 navbar-item text-lg">
<Link to="/register">Sign Up</Link>
</button>
</motion.div>
<motion.div variants={linkVariants} whileHover="hover">
<button className="border border-yellow-400 rounded px-4 py-2 hover:bg-yellow-400 hover:text-gray-800 navbar-item text-lg">
<Link to="/login">Sign In</Link>
</button>
</motion.div>
</>
)}
</div>
<div className="flex space-x-4">
{isAuthenticated && (
<>
<motion.div variants={linkVariants} whileHover="hover">
<motion.p className="text-white text-lg mb-4">
<strong>WellCome Dear:</strong> {profileInfo.name}
</motion.p>
</motion.div>
</>
)}
</div>
</div>
<ToastContainer />
</nav>
);
}

export default Navbar;
