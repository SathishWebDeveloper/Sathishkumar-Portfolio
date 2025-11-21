import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ThemeToggle from "./ThemeToggle"; // adjust path if necessary

export default function Navbar({ darkMode, setDarkMode }) {
  const sections = ["home", "about", "experience", "projects", "skills", "contact"];
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState("home");

  // detect scroll to toggle scrolled state
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // mount flag to animate on first render
  useEffect(() => setMounted(true), []);

  // intersection observer to detect active section
  useEffect(() => {
    const observedEls = sections
      .map((id) => document.getElementById(id))
      .filter(Boolean);

    if (!observedEls.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        // choose the entry with the largest intersectionRatio that's intersecting
        const intersecting = entries.filter((e) => e.isIntersecting);
        if (intersecting.length) {
          intersecting.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
          setActiveSection(intersecting[0].target.id);
        } else {
          // fallback: choose the one closest to top
          const byTop = entries
            .map((e) => ({ id: e.target.id, top: e.boundingClientRect.top }))
            .sort((a, b) => Math.abs(a.top) - Math.abs(b.top))[0];
          if (byTop?.id) setActiveSection(byTop.id);
        }
      },
      {
        threshold: [0.65, 0.5, 0.3, 0.15, 0.01],
        rootMargin: "-10% 0px -40% 0px",
      }
    );

    observedEls.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [sections]);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  // animation variants for each nav item (staggered)
  const itemVariants = {
    hidden: { opacity: 0, y: 8 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.25, duration: 0.34, ease: "easeOut" },
    }),
  };

  // show links either on mount or when scrolled
  const showLinks = mounted || isScrolled;

  return (
    <motion.header
      className={`navbar ${isScrolled ? "navbar--scrolled" : "navbar--top"}`}
      initial={false}
      aria-label="Main navigation"
    >
      <div className="nav-inner">
        <div className="nav-left">My Portfolio</div>

        <nav className="nav-center" aria-label="Primary navigation">
          <ul className="nav-links" role="list">
            {sections.map((section, idx) => {
              const label = section.charAt(0).toUpperCase() + section.slice(1);
              const isActive = activeSection === section;
              return (
                <motion.li
                  key={section}
                  className={`nav-link ${isActive ? "active" : ""}`}
                  role="listitem"
                  custom={idx}
                  variants={itemVariants}
                  initial="hidden"
                  animate={showLinks ? "visible" : "hidden"}
                  onClick={() => scrollToSection(section)}
                  whileHover={{ y: -3, scale: 1.02 }}
                >
                  {label}
                </motion.li>
              );
            })}
          </ul>
        </nav>

        <div className="nav-right">
          <div className="theme-toggle">
            <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
          </div>
        </div>
      </div>
    </motion.header>
  );
}
