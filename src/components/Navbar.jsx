import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ThemeToggle from "./ThemeToggle"; // adjust path if necessary
// import "./Navbar.scss";

export default function Navbar({ darkMode, setDarkMode }) {
  const sections = ["home", "about", "projects", "skills", "contact"];
  const [isScrolled, setIsScrolled] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const enterAt = 200; // only go to scrolled when > 100
    const exitAt = 40; // only go back to top when < 20

    const onScroll = () => {
      const y = window.scrollY || window.pageYOffset;
      setIsScrolled((prev) => {
        if (!prev && y > enterAt) return true;
        if (prev && y < exitAt) return false;
        return prev;
      });
    };

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
        const intersecting = entries.filter((e) => e.isIntersecting);
        if (intersecting.length) {
          intersecting.sort((a, b) => b.intersectionRatio - a.intersectionRatio);
          setActiveSection(intersecting[0].target.id);
        } else {
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

  // lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setMenuOpen(false); // auto-close mobile menu on click
    }
  };

  // animation variants for each nav item (staggered)
  const itemVariants = {
    hidden: { opacity: 0, y: 8 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.50, duration: 0.84, ease: "easeOut" },
    }),
  };

  // header variants for top vs scrolled visual animation
  const headerVariants = {
    top: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.85, ease: "easeOut" } },
    scrolled: {
      opacity: 1,
      y: -2,
      scale: 0.995,
      transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] },
    },
    hidden: { opacity: 0, y: -6, transition: { duration: 0.8 } },
  };

  // show links either on mount or when scrolled
  const showLinks = mounted || isScrolled;

  return (
    <>
      <motion.header
        className={`navbar ${isScrolled ? "navbar--scrolled" : "navbar--top"}`}
        initial="top"
        animate={isScrolled ? "scrolled" : "top"}
        variants={headerVariants}
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
                    tabIndex={0}
                    onKeyDown={(e) => { if (e.key === "Enter") scrollToSection(section); }}
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

            {/* Hamburger visible on small screens */}
            {/* <button
              className={`hamburger ${menuOpen ? "open" : ""}`}
              aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen}
              onClick={() => setMenuOpen((v) => !v)}
            >
              <span className="hamburger__bar" />
              <span className="hamburger__bar" />
              <span className="hamburger__bar" />
            </button> */}
            <label className="hamburger"               aria-label={menuOpen ? "Close menu" : "Open menu"}
              aria-expanded={menuOpen} >
  <input type="checkbox" onClick={() => setMenuOpen((v) => !v)} />
  <svg viewBox="0 0 32 32">
    <path class="line line-top-bottom" d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"></path>
    <path class="line" d="M7 16 27 16"></path>
  </svg>
</label>
          </div>
        </div>
      </motion.header>

      {/* Mobile menu overlay / drawer */}
      <AnimatePresence>
        {menuOpen && (
          <motion.aside
            className="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            aria-hidden={!menuOpen}
          >
            <motion.div
              className="mobile-menu__panel"
              initial={{ y: "-8%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "-6%", opacity: 0 }}
              transition={{ type: "spring", stiffness: 280, damping: 30 }}
            >
              <nav aria-label="Mobile navigation">
                <ul className="mobile-links" role="list">
                  {sections.map((section, idx) => {
                    const label = section.charAt(0).toUpperCase() + section.slice(1);
                    const isActive = activeSection === section;
                    return (
                      <li
                        key={section}
                        className={`mobile-link ${isActive ? "active" : ""}`}
                        onClick={() => scrollToSection(section)}
                        tabIndex={0}
                        onKeyDown={(e) => { if (e.key === "Enter") scrollToSection(section); }}
                      >
                        {label}
                      </li>
                    );
                  })}
                </ul>
              </nav>

              {/* <div className="mobile-menu__footer">
                <ThemeToggle darkMode={darkMode} setDarkMode={setDarkMode} />
              </div> */}
            </motion.div>
            <div
              className="mobile-menu__backdrop"
              onClick={() => setMenuOpen(false)}
              aria-hidden="true"
            />
          </motion.aside>
        )}
      </AnimatePresence>
    </>
  );
}
