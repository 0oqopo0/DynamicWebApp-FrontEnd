import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import UserService from "../service/UserService";

function UserManagementPage() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Fetch users data when the component mounts
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const token = localStorage.getItem("token"); // Retrieve the token from localStorage
      const response = await UserService.getAllUsers(token);
      setUsers(response.ourUsersList); // Assuming the list of users is under the key 'ourUsersList'
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const deleteUser = async (userId, userName) => {
    confirmAlert({
      customUI: ({ onClose }) => {
        return (
          <motion.div
            className="custom-ui bg-red-400/40 p-4 rounded shadow-md"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h1 className="text-xl font-bold mb-4">Confirm Deletion</h1>
            <p className="mb-4">
              Are you sure you want to delete user <strong>{userName}</strong>?
            </p>
            <div className="flex justify-end space-x-4">
              <button
                className="bg-gray-300 px-4 py-2 rounded hover:bg-gray-400 transition duration-300"
                onClick={onClose}
              >
                No
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
                onClick={async () => {
                  try {
                    const token = localStorage.getItem("token");
                    await UserService.deleteUser(userId, token);
                    fetchUsers();
                    onClose();
                  } catch (error) {
                    console.error("Error deleting user:", error);
                  }
                }}
              >
                Yes, Delete
              </button>
            </div>
          </motion.div>
        );
      },
    });
  };


  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  const rowVariants = {
    hidden: { opacity: 0, x: -10 },
    visible: (i) => ({
      opacity: 1,
      x: 0,
      transition: { delay: i * 0.2, duration: 0.25 },
    }),
  };

  const cellVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: .5 } },
  };

  const buttonVariants = {
    hover: {
      scale: 1.1,
      transition: {
        type: "spring",
        stiffness: 300,
      },
    },
  };

  return (
    <motion.div
      className="flex items-center justify-center min-h-screen bg-navy-900"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <ToastContainer />
      <motion.div
        className="bg-green-400 bg-opacity-30 backdrop-filter backdrop-blur-lg p-8 rounded shadow-md w-full max-w-4xl border border-black"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <h2 className="text-2xl font-bold mb-6 text-center">
          Users Management Page
        </h2>
        <div className="mb-4 text-right">
          <motion.button
            className="bg-blue-500 bg-opacity-90 backdrop-filter backdrop-blur-lg text-sky-800 px-4 py-2 rounded hover:bg-blue-600 transition duration-300"
            variants={buttonVariants}
            whileHover="hover"
          >
            <Link to="/register">Add User</Link>
          </motion.button>
        </div>
        <motion.table
          className="min-w-full bg-black/50 bg-opacity-20 backdrop-filter backdrop-blur-lg"
          initial="hidden"
          animate="visible"
          variants={containerVariants}
        >
          <thead>
            <tr>
              <th className="py-2 px-4 border-b text-left">Row</th>
              <th className="py-2 px-4 border-b text-left">ID</th>
              <th className="py-2 px-4 border-b text-left">Name</th>
              <th className="py-2 px-4 border-b text-left">Email</th>
              <th className="py-2 px-4 border-b text-left">Role</th>
              <th className="py-2 px-4 border-b text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <motion.tr
                key={user.id}
                className={index % 2 === 0 ? "bg-green-100" : "bg-green-200"}
                custom={index}
                initial="hidden"
                animate="visible"
                variants={rowVariants}
              >
                <motion.td
                  className="py-2 px-4 border-b border-gray-300"
                  variants={cellVariants}
                >
                  {index + 1}
                </motion.td>
                <motion.td
                  className="py-2 px-4 border-b border-gray-300"
                  variants={cellVariants}
                >
                  {user.id}
                </motion.td>

                <motion.td
                  className="py-2 px-4 border-b border-gray-300"
                  variants={cellVariants}
                >
                  {user.name}
                </motion.td>
                <motion.td
                  className="py-2 px-4 border-b border-gray-300"
                  variants={cellVariants}
                >
                  {user.email}
                </motion.td>
                <motion.td
                  className="py-2 px-4 border-b border-gray-300"
                  variants={cellVariants}
                >
                  {user.role}
                </motion.td>

                <motion.td
                  className="py-2 px-4 border-b border-gray-300 flex justify-end space-x-2"
                  variants={cellVariants}
                >
                  <motion.button
                    className="bg-red-500 bg-opacity-80 backdrop-filter backdrop-blur-lg text-white px-4 py-2 rounded hover:bg-red-600 transition duration-300"
                    onClick={() => deleteUser(user.id, user.name)}
                    variants={buttonVariants}
                    whileHover="hover"
                  >
                    Delete
                  </motion.button>
                  <motion.button
                    className="bg-sky-700 bg-opacity-80 backdrop-filter backdrop-blur-lg text-white px-4 py-2 rounded hover:bg-yellow-600 transition duration-300"
                    variants={buttonVariants}
                    whileHover="hover"
                    // onClick={() => handleUpdateClick(user.id)}
                  >
                    <Link to={`/update-user/${user.id}`}>Update</Link>
                  </motion.button>
                </motion.td>
              </motion.tr>
            ))}
          </tbody>
        </motion.table>
      </motion.div>
    </motion.div>
  );
}

export default UserManagementPage;
