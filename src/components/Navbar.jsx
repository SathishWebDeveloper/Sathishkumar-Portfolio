import React from "react";
import { motion } from "framer-motion";
import ThemeToggle from "./ThemeToggle";

export default function Navbar({ darkMode, setDarkMode }) {
  const sections = ["home", "about", "experience", "projects", "skills", "contact"];

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <motion.nav
      className="navbar"
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="nav-left">My Portfolio</div>

      <ul className="nav-links">
        {sections.map((section) => (
          <li key={section} onClick={() => scrollToSection(section)}>
            {section.charAt(0).toUpperCase() + section.slice(1)}
          </li>
        ))}
      </ul>

      <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
    </motion.nav>
  );
}
