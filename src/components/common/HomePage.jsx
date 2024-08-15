import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import UserService from "../service/UserService";

const HomePage = () => {
  const containerVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  const textVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  const [isAuthenticated, setIsAuthenticated] = useState(
    UserService.isAuthenticated()
  );

  useEffect(() => {
    const checkAuth = () => {
      const authStatus = UserService.isAuthenticated();
      if (authStatus !== isAuthenticated) {
        setIsAuthenticated(authStatus);
        if (authStatus) {
          window.location.reload();
        }
      }
    };

    checkAuth();
    const interval = setInterval(checkAuth, 1000); // چک کردن وضعیت احراز هویت هر ثانیه

    return () => clearInterval(interval); // پاک کردن اینتروال هنگام خروج از کامپوننت
  }, [isAuthenticated]);

  console.log("isAuthenticated: " + isAuthenticated);

  return (
    <motion.div
      className="relative min-h-screen bg-gradient-to-r from-black via-gray-800 to-sky-500 flex items-center justify-center rounded-md"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden">
        {/* ماه */}
        {/* <div className="absolute top-10 left-10 w-32 h-32 bg-yellow-300 rounded-full filter blur-sm"></div> */}
        {/* زمین */}
        <div className="absolute bottom-0 w-full h-1/3 bg-sky-300/10 rounded-tl-full"></div>
      </div>
      <motion.div
        className="relative z-10 text-center text-white"
        initial="hidden"
        animate="visible"
        variants={textVariants}
      >
        <motion.h1 className="text-5xl font-bold mb-4" variants={textVariants}>
          Journey To Infinity
        </motion.h1>
        <motion.p className="text-xl mb-8" variants={textVariants}>
          This is a beautifully designed homepage using Tailwind CSS.
        </motion.p>
        {isAuthenticated && (
          <motion.div whileHover="hover">
            <motion.h1
              className="text-5xl text-green-500 font-bold mb-4"
              variants={textVariants}
            >
              Hello Bro You Are Authenticated JAJA
            </motion.h1>
          </motion.div>
        )}
      </motion.div>
    </motion.div>
  );
};

export default HomePage;
