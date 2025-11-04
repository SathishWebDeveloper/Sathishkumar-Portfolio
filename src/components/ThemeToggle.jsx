import React from "react";
import { motion } from "framer-motion";

export default function ThemeToggle({ darkMode, setDarkMode }) {
  return (
    <motion.button
      className="theme-toggle"
      onClick={() => setDarkMode(!darkMode)}
      whileTap={{ scale: 0.9 }}
      initial={{ opacity: 0, rotate: -90 }}
      animate={{ opacity: 1, rotate: 0 }}
      transition={{ duration: 0.5 }}
    >
      {darkMode ? "☀️" : "🌙"}
    </motion.button>
  );
}
